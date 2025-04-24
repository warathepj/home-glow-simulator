
import { LightbulbIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface RoomCardProps {
  name: string;
  isLightOn: boolean;
  lastChanged: Date;
}

const RoomCard = ({ name, isLightOn, lastChanged }: RoomCardProps) => {
  const formattedTime = lastChanged.toLocaleTimeString([], { 
    hour: '2-digit', 
    minute: '2-digit',
    second: '2-digit'
  });
  
  return (
    <Card className="w-full overflow-hidden">
      <CardHeader className={cn(
        "transition-colors duration-300",
        isLightOn ? "bg-light-on" : "bg-light-off"
      )}>
        <CardTitle className="flex items-center justify-between">
          <span>{name}</span>
          <span 
            className={cn(
              "flex items-center gap-2",
              isLightOn ? "text-amber-600" : "text-gray-400"
            )}
          >
            <LightbulbIcon className={isLightOn ? "animate-pulse-light" : ""} />
            {isLightOn ? "ON" : "OFF"}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div 
          className={cn(
            "h-32 md:h-40 rounded-lg flex items-center justify-center transition-all duration-300",
            isLightOn 
              ? "bg-gradient-to-br from-amber-100 to-yellow-200 shadow-lg shadow-amber-100/50" 
              : "bg-gray-100"
          )}
        >
          <div className="text-center">
            <div className={cn(
              "text-5xl mb-2",
              isLightOn ? "opacity-100" : "opacity-20"
            )}>
              {name === "Living Room" && "🛋️"}
              {name === "Bedroom" && "🛏️"}
              {name === "Kitchen" && "🍳"}
            </div>
            <p className="text-sm text-gray-600">Last changed: {formattedTime}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RoomCard;
