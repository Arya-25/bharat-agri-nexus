
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, MessageSquare, Calendar, FileText, Users, Settings } from "lucide-react";

export const QuickActions = () => {
  const actions = [
    { icon: Plus, label: "New Order", color: "bg-green-600 hover:bg-green-700" },
    { icon: MessageSquare, label: "Send Message", color: "bg-blue-600 hover:bg-blue-700" },
    { icon: Calendar, label: "Schedule Event", color: "bg-purple-600 hover:bg-purple-700" },
    { icon: FileText, label: "Create Report", color: "bg-orange-600 hover:bg-orange-700" },
    { icon: Users, label: "Add Contact", color: "bg-teal-600 hover:bg-teal-700" },
    { icon: Settings, label: "Settings", color: "bg-gray-600 hover:bg-gray-700" },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          {actions.map((action, index) => (
            <Button
              key={index}
              variant="outline"
              className={`flex flex-col items-center space-y-2 h-20 ${action.color} text-white border-none hover:text-white`}
            >
              <action.icon className="h-5 w-5" />
              <span className="text-xs">{action.label}</span>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
