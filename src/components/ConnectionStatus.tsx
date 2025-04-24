
import { Circle } from "lucide-react";
import { cn } from "@/lib/utils";

interface ConnectionStatusProps {
  isConnected: boolean;
}

const ConnectionStatus = ({ isConnected }: ConnectionStatusProps) => {
  return (
    <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow">
      <Circle 
        size={10} 
        fill={isConnected ? "#22c55e" : "#ef4444"} 
        className={cn(
          isConnected ? "text-green-500" : "text-red-500",
          isConnected ? "animate-pulse" : ""
        )}
      />
      <span className="text-sm font-medium">
        {isConnected ? "Connected" : "Disconnected"}
      </span>
    </div>
  );
};

export default ConnectionStatus;
