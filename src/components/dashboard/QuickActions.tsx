
import { useState } from "react";
import { Plus, Upload, MessageSquare, Calendar, FileText, Settings, Truck } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { NewProductModal } from "@/components/modals/NewProductModal";
import { ImageUploadModal } from "@/components/modals/ImageUploadModal";
import { ContactSupportModal } from "@/components/modals/ContactSupportModal";
import { ScheduleMeetingModal } from "@/components/modals/ScheduleMeetingModal";
import { ReportViewModal } from "@/components/modals/ReportViewModal";
import { AccountSettingsModal } from "@/components/modals/AccountSettingsModal";
import { ShipmentTrackingModal } from "@/components/modals/ShipmentTrackingModal";

export const QuickActions = () => {
  const { toast } = useToast();
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [selectedShipment, setSelectedShipment] = useState<any>(null);

  // Sample shipment data
  const sampleShipment = {
    id: "1",
    orderId: "12340",
    status: "dispatched" as const,
    amount: 18500,
    trackingId: "SHP987654321",
    carrier: "BlueDart Express",
    estimatedDelivery: "2024-01-22",
    destination: "Delhi Wholesale Market",
    weight: "50kg",
    dispatchedDate: "2024-01-21",
    productName: "Organic Tomatoes"
  };

  const handleTrackShipment = () => {
    setSelectedShipment(sampleShipment);
    setActiveModal("trackShipment");
  };

  const handleGenerateReport = () => {
    toast({
      title: "Generating Report",
      description: "Your business report is being prepared...",
    });
    
    setTimeout(() => {
      setActiveModal("reportView");
    }, 1500);
  };

  const handleAccountSettings = () => {
    setActiveModal("accountSettings");
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
      icon: Truck,
      label: "Track Shipment",
      description: "Track your product shipments",
      action: handleTrackShipment,
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
      <ReportViewModal 
        open={activeModal === "reportView"} 
        onOpenChange={(open) => !open && setActiveModal(null)} 
      />
      <AccountSettingsModal 
        open={activeModal === "accountSettings"} 
        onOpenChange={(open) => !open && setActiveModal(null)} 
      />
      <ShipmentTrackingModal 
        isOpen={activeModal === "trackShipment"}
        onClose={() => setActiveModal(null)}
        shipment={selectedShipment}
      />
    </>
  );
};
