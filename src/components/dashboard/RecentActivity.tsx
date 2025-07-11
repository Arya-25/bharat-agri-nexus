
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export const RecentActivity = () => {
  const { toast } = useToast();

  const activities = [
    {
      id: 1,
      type: "order",
      title: "New order received",
      description: "Order #12345 for Organic Wheat (50kg)",
      time: "2 hours ago",
      status: "pending",
    },
    {
      id: 2,
      type: "payment",
      title: "Payment received",
      description: "₹15,000 from ABC Traders",
      time: "4 hours ago",
      status: "completed",
    },
    {
      id: 3,
      type: "inquiry",
      title: "Product inquiry",
      description: "Inquiry about Basmati Rice pricing",
      time: "6 hours ago",
      status: "new",
    },
    {
      id: 4,
      type: "shipment",
      title: "Shipment dispatched",
      description: "Order #12340 shipped via truck",
      time: "1 day ago",
      status: "completed",
    },
  ];

  const handleViewActivity = (activityId: number) => {
    toast({
      title: "Activity Details",
      description: `Viewing details for activity #${activityId}`,
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "new":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="flex-1">
                <div className="flex items-center space-x-3">
                  <h4 className="font-medium text-gray-900">{activity.title}</h4>
                  <Badge className={getStatusColor(activity.status)}>
                    {activity.status}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 mt-1">{activity.description}</p>
                <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleViewActivity(activity.id)}
              >
                View
              </Button>
            </div>
          ))}
        </div>
        <Button
          variant="outline"
          className="w-full mt-4"
          onClick={() => toast({
            title: "All Activities",
            description: "Loading complete activity history...",
          })}
        >
          View All Activities
        </Button>
      </CardContent>
    </Card>
  );
};
