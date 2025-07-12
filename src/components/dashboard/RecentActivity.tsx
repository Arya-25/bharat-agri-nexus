import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";
import { ActivityDetailsModal } from "@/components/modals/ActivityDetailsModal";

export const RecentActivity = () => {
  const { toast } = useToast();
  const [activities, setActivities] = useState([]);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const defaultActivities = [
    {
      id: 1,
      type: "order",
      title: "New order received",
      description: "Order #12345 for Organic Wheat (50kg)",
      time: "2 hours ago",
      status: "pending",
      amount: "₹15,000"
    },
    {
      id: 2,
      type: "payment",
      title: "Payment received",
      description: "₹15,000 from ABC Traders",
      time: "4 hours ago",
      status: "completed",
      amount: "₹15,000"
    },
    {
      id: 3,
      type: "inquiry",
      title: "Product inquiry",
      description: "Inquiry about Basmati Rice pricing",
      time: "6 hours ago",
      status: "new",
      amount: "Potential: ₹25,000"
    },
    {
      id: 4,
      type: "shipment",
      title: "Shipment dispatched",
      description: "Order #12340 shipped via truck",
      time: "1 day ago",
      status: "completed",
      amount: "₹18,500"
    },
  ];

  useEffect(() => {
    const savedActivities = localStorage.getItem("recentActivities");
    if (savedActivities) {
      setActivities(JSON.parse(savedActivities));
    } else {
      setActivities(defaultActivities);
      localStorage.setItem("recentActivities", JSON.stringify(defaultActivities));
    }
  }, []);

  const handleViewActivity = (activity: any) => {
    setSelectedActivity(activity);
    setIsModalOpen(true);
    
    const viewedActivities = JSON.parse(localStorage.getItem("viewedActivities") || "[]");
    const viewedActivity = {
      ...activity,
      viewedAt: new Date().toISOString()
    };
    viewedActivities.push(viewedActivity);
    localStorage.setItem("viewedActivities", JSON.stringify(viewedActivities));
  };

  const handleViewAllActivities = () => {
    toast({
      title: "Loading Complete Activity History",
      description: "Fetching all transactions, orders, and business activities...",
    });
    
    setTimeout(() => {
      const allActivities = JSON.parse(localStorage.getItem("recentActivities") || "[]");
      toast({
        title: "Activity History Loaded",
        description: `Found ${allActivities.length} activities. Advanced filters and analytics available.`,
      });
    }, 1500);
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

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "order":
        return "🛒";
      case "payment":
        return "💰";
      case "inquiry":
        return "❓";
      case "shipment":
        return "🚛";
      default:
        return "📄";
    }
  };

  return (
    <>
      <Card className="hover:shadow-lg transition-shadow duration-300">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              Recent Activity
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {activities.map((activity: any) => (
              <div
                key={activity.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all duration-200 cursor-pointer transform hover:scale-[1.02]"
                onClick={() => handleViewActivity(activity)}
              >
                <div className="flex-1">
                  <div className="flex items-center space-x-3">
                    <span className="text-lg animate-pulse">{getTypeIcon(activity.type)}</span>
                    <h4 className="font-medium text-gray-900">{activity.title}</h4>
                    <Badge className={getStatusColor(activity.status)}>
                      {activity.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{activity.description}</p>
                  <div className="flex items-center justify-between mt-2">
                    <p className="text-xs text-gray-500">{activity.time}</p>
                    <p className="text-sm font-medium text-green-600">{activity.amount}</p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleViewActivity(activity);
                  }}
                  className="hover:bg-green-50 hover:border-green-300 transition-colors"
                >
                  View Details
                </Button>
              </div>
            ))}
          </div>
          <Button
            variant="outline"
            className="w-full mt-4 hover:bg-green-50 hover:border-green-300 transition-colors"
            onClick={handleViewAllActivities}
          >
            View All Activities
          </Button>
        </CardContent>
      </Card>

      <ActivityDetailsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        activity={selectedActivity}
      />
    </>
  );
};
