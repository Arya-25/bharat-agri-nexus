
import { Plus, Upload, MessageSquare, Calendar, FileText, Settings } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export const QuickActions = () => {
  const { toast } = useToast();

  const handleAction = (action: string) => {
    toast({
      title: "Action Triggered",
      description: `${action} functionality will be available soon!`,
    });
  };

  const actions = [
    {
      icon: Plus,
      label: "New Product",
      description: "Add a new product to your catalog",
      action: () => handleAction("New Product"),
    },
    {
      icon: Upload,
      label: "Upload Images",
      description: "Upload product images",
      action: () => handleAction("Upload Images"),
    },
    {
      icon: MessageSquare,
      label: "Contact Support",
      description: "Get help from our team",
      action: () => handleAction("Contact Support"),
    },
    {
      icon: Calendar,
      label: "Schedule Meeting",
      description: "Book a consultation",
      action: () => handleAction("Schedule Meeting"),
    },
    {
      icon: FileText,
      label: "Generate Report",
      description: "Create business reports",
      action: () => handleAction("Generate Report"),
    },
    {
      icon: Settings,
      label: "Account Settings",
      description: "Manage your preferences",
      action: () => handleAction("Account Settings"),
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {actions.map((action, index) => (
          <Button
            key={index}
            variant="outline"
            className="w-full justify-start h-auto p-4"
            onClick={action.action}
          >
            <div className="flex items-center space-x-3">
              <action.icon className="h-5 w-5 text-green-600" />
              <div className="text-left">
                <div className="font-medium">{action.label}</div>
                <div className="text-xs text-gray-500">{action.description}</div>
              </div>
            </div>
          </Button>
        ))}
      </CardContent>
    </Card>
  );
};
