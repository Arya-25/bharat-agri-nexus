
import { useState } from "react";
import { Plus, Upload, MessageSquare, Calendar, FileText, Settings } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { NewProductModal } from "@/components/modals/NewProductModal";
import { ImageUploadModal } from "@/components/modals/ImageUploadModal";
import { ContactSupportModal } from "@/components/modals/ContactSupportModal";
import { ScheduleMeetingModal } from "@/components/modals/ScheduleMeetingModal";

export const QuickActions = () => {
  const { toast } = useToast();
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const handleGenerateReport = () => {
    toast({
      title: "Generating Report",
      description: "Your business report is being prepared. This may take a few moments...",
    });
    
    // Simulate report generation
    setTimeout(() => {
      toast({
        title: "Report Ready",
        description: "Your business report has been generated and saved to your dashboard.",
      });
    }, 3000);
  };

  const handleAccountSettings = () => {
    toast({
      title: "Account Settings",
      description: "Redirecting to account settings page...",
    });
    // In a real app, this would navigate to settings page
  };

  const actions = [
    {
      icon: Plus,
      label: "New Product",
      description: "Add a new product to your catalog",
      action: () => setActiveModal("newProduct"),
    },
    {
      icon: Upload,
      label: "Upload Images",
      description: "Upload product images",
      action: () => setActiveModal("uploadImages"),
    },
    {
      icon: MessageSquare,
      label: "Contact Support",
      description: "Get help from our team",
      action: () => setActiveModal("contactSupport"),
    },
    {
      icon: Calendar,
      label: "Schedule Meeting",
      description: "Book a consultation",
      action: () => setActiveModal("scheduleMeeting"),
    },
    {
      icon: FileText,
      label: "Generate Report",
      description: "Create business reports",
      action: handleGenerateReport,
    },
    {
      icon: Settings,
      label: "Account Settings",
      description: "Manage your preferences",
      action: handleAccountSettings,
    },
  ];

  return (
    <>
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

      <NewProductModal 
        open={activeModal === "newProduct"} 
        onOpenChange={(open) => !open && setActiveModal(null)} 
      />
      <ImageUploadModal 
        open={activeModal === "uploadImages"} 
        onOpenChange={(open) => !open && setActiveModal(null)} 
      />
      <ContactSupportModal 
        open={activeModal === "contactSupport"} 
        onOpenChange={(open) => !open && setActiveModal(null)} 
      />
      <ScheduleMeetingModal 
        open={activeModal === "scheduleMeeting"} 
        onOpenChange={(open) => !open && setActiveModal(null)} 
      />
    </>
  );
};
