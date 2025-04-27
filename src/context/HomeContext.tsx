
import React, { createContext, useContext, useState, useEffect } from "react";

type Room = "livingRoom" | "bedroom" | "kitchen";

interface LightStatus {
  isOn: boolean;
  lastChanged: Date;
}

interface HomeContextType {
  lights: Record<Room, LightStatus>;
  isConnected: boolean;
  toggleLight: (room: Room) => void;
  logs: Array<{ time: Date; message: string }>;
}

const HomeContext = createContext<HomeContextType | undefined>(undefined);

export const HomeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lights, setLights] = useState<Record<Room, LightStatus>>({
    livingRoom: { isOn: false, lastChanged: new Date() },
    bedroom: { isOn: false, lastChanged: new Date() },
    kitchen: { isOn: false, lastChanged: new Date() }
  });
  
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [logs, setLogs] = useState<Array<{ time: Date; message: string }>>([]);

  const addLog = (message: string) => {
    setLogs(prev => [...prev, { time: new Date(), message }]);
  };

  const toggleLight = (room: Room) => {
    const newStatus = !lights[room].isOn;
    const now = new Date();
    
    setLights(prev => ({
      ...prev,
      [room]: { isOn: newStatus, lastChanged: now }
    }));
    
    addLog(`${room} light turned ${newStatus ? 'ON' : 'OFF'}`);
  };

  // WebSocket connection and message handling
  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8085');

    ws.onopen = () => {
      setIsConnected(true);
      addLog('Connected to WebSocket server');
    };

    ws.onclose = () => {
      setIsConnected(false);
      addLog('Disconnected from WebSocket server');
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        
        console.log('\n=== WebSocket Message Received ===');
        console.log('Time:', new Date().toISOString());
        console.log('Type:', data.type);
        console.log('Room:', data.room);
        console.log('Value:', data.value);
        console.log('Source:', data.source);
        console.log('Timestamp:', data.timestamp);
        console.log('Raw message:', JSON.stringify(data, null, 2));
        console.log('================================\n');
        
        if (data.type === 'TOGGLE_UPDATE') {
          // Convert room name to match our Room type format
          const roomMapping: Record<string, Room> = {
            'Living Room': 'livingRoom',
            'Bedroom': 'bedroom',
            'Kitchen': 'kitchen'
          };
          
          const room = roomMapping[data.room];
          if (room) {
            setLights(prev => ({
              ...prev,
              [room]: {
                isOn: data.value,
                lastChanged: new Date(data.timestamp)
              }
            }));
            
            // Add a log entry for the state change
            addLog(`${data.room} light ${data.value ? 'turned ON' : 'turned OFF'} from ${data.source}`);
          } else {
            console.warn(`Unknown room received: ${data.room}`);
          }
        }
      } catch (error) {
        console.error('\n=== WebSocket Error ===');
        console.error('Time:', new Date().toISOString());
        console.error('Error:', error);
        console.error('Raw message:', event.data);
        console.error('=====================\n');
      }
    };

    return () => {
      ws.close();
    };
  }, []);

  return (
    <HomeContext.Provider value={{ lights, isConnected, toggleLight, logs }}>
      {children}
    </HomeContext.Provider>
  );
};

export const useHome = () => {
  const context = useContext(HomeContext);
  if (context === undefined) {
    throw new Error("useHome must be used within a HomeProvider");
  }
  return context;
};
