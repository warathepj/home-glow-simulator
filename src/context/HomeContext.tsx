
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
  
  const [isConnected, setIsConnected] = useState<boolean>(true);
  const [logs, setLogs] = useState<Array<{ time: Date; message: string }>>([]);

  const toggleLight = (room: Room) => {
    const newStatus = !lights[room].isOn;
    const now = new Date();
    
    setLights(prev => ({
      ...prev,
      [room]: { isOn: newStatus, lastChanged: now }
    }));
    
    addLog(`${room} light turned ${newStatus ? 'ON' : 'OFF'}`);
  };

  const addLog = (message: string) => {
    setLogs(prev => [{ time: new Date(), message }, ...prev].slice(0, 50));
  };

  // Simulate random light changes to mimic IoT behavior
  useEffect(() => {
    const rooms: Room[] = ["livingRoom", "bedroom", "kitchen"];
    
    const interval = setInterval(() => {
      // Randomly decide whether to change a light
      if (Math.random() > 0.7) {
        const randomRoomIndex = Math.floor(Math.random() * rooms.length);
        const room = rooms[randomRoomIndex];
        toggleLight(room);
      }
      
      // Randomly simulate connection changes
      if (Math.random() > 0.95) {
        const newConnectedStatus = !isConnected;
        setIsConnected(newConnectedStatus);
        addLog(`Device ${newConnectedStatus ? 'CONNECTED' : 'DISCONNECTED'}`);
      }
    }, 5000);
    
    return () => clearInterval(interval);
  }, [isConnected]);

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
