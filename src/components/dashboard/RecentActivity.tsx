
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, MessageSquare, ShoppingCart, Users } from "lucide-react";

export const RecentActivity = () => {
  const activities = [
    {
      icon: MessageSquare,
      title: "New message from AgriCorp Ltd",
      description: "Interested in your organic wheat supply",
      time: "2 hours ago",
      color: "text-blue-600",
    },
    {
      icon: ShoppingCart,
      title: "Order completed",
      description: "500kg rice delivered to Mumbai FPO",
      time: "4 hours ago",
      color: "text-green-600",
    },
    {
      icon: Users,
      title: "New farmer joined network",
      description: "Rajesh Kumar from Punjab",
      time: "6 hours ago",
      color: "text-purple-600",
    },
    {
      icon: Activity,
      title: "Market price update",
      description: "Wheat prices increased by 5%",
      time: "8 hours ago",
      color: "text-orange-600",
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Activity className="h-5 w-5" />
          <span>Recent Activity</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity, index) => (
            <div key={index} className="flex items-start space-x-3">
              <div className={`p-2 rounded-full bg-gray-100 ${activity.color}`}>
                <activity.icon className="h-4 w-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                <p className="text-sm text-gray-500">{activity.description}</p>
                <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
