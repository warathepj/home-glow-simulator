
import { useHome, HomeProvider } from "@/context/HomeContext";
import RoomCard from "@/components/RoomCard";
import ConnectionStatus from "@/components/ConnectionStatus";
import LogsPanel from "@/components/LogsPanel";

const HomeContent = () => {
  const { lights, isConnected, logs } = useHome();

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl md:text-3xl font-bold">Home Glow Simulator</h1>
          <ConnectionStatus isConnected={isConnected} />
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <RoomCard 
            name="Living Room" 
            isLightOn={lights.livingRoom.isOn} 
            lastChanged={lights.livingRoom.lastChanged} 
          />
          <RoomCard 
            name="Bedroom" 
            isLightOn={lights.bedroom.isOn} 
            lastChanged={lights.bedroom.lastChanged} 
          />
          <RoomCard 
            name="Kitchen" 
            isLightOn={lights.kitchen.isOn} 
            lastChanged={lights.kitchen.lastChanged} 
          />
        </div>
        
        <LogsPanel logs={logs} />
      </div>
    </div>
  );
};

// Wrap the component with the HomeProvider
const Index = () => (
  <HomeProvider>
    <HomeContent />
  </HomeProvider>
);

export default Index;
