
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface LogEntry {
  time: Date;
  message: string;
}

interface LogsPanelProps {
  logs: LogEntry[];
}

const LogsPanel = ({ logs }: LogsPanelProps) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Activity Logs</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-60">
          <div className="space-y-3">
            {logs.map((log, index) => (
              <div key={index} className="text-sm flex gap-2">
                <span className="text-gray-400">
                  {log.time.toLocaleTimeString([], { 
                    hour: '2-digit', 
                    minute: '2-digit',
                    second: '2-digit' 
                  })}
                </span>
                <span>{log.message}</span>
              </div>
            ))}
            {logs.length === 0 && (
              <div className="text-center text-sm text-gray-400 py-4">
                No activity recorded yet
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default LogsPanel;
