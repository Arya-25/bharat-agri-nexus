
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Clock, DollarSign, User, Truck } from "lucide-react";

interface ActivityDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  activity: {
    id: number;
    type: string;
    title: string;
    description: string;
    time: string;
    status: string;
    amount: string;
  } | null;
}

export const ActivityDetailsModal = ({ isOpen, onClose, activity }: ActivityDetailsModalProps) => {
  if (!activity) return null;

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
        return <User className="h-5 w-5 text-blue-600" />;
      case "payment":
        return <DollarSign className="h-5 w-5 text-green-600" />;
      case "inquiry":
        return <Calendar className="h-5 w-5 text-purple-600" />;
      case "shipment":
        return <Truck className="h-5 w-5 text-orange-600" />;
      default:
        return <Calendar className="h-5 w-5 text-gray-600" />;
    }
  };

  const getDetailedInfo = (activity: any) => {
    switch (activity.type) {
      case "order":
        return {
          customer: "ABC Traders Pvt Ltd",
          deliveryDate: "2024-01-25",
          location: "Mumbai, Maharashtra",
          paymentMethod: "Bank Transfer",
          notes: "Premium quality organic wheat required for export"
        };
      case "payment":
        return {
          transactionId: "TXN123456789",
          paymentMethod: "NEFT Transfer",
          bankRef: "HDFC0001234",
          processingFee: "₹50",
          netAmount: "₹14,950"
        };
      case "inquiry":
        return {
          customerName: "Raj Exports",
          phone: "+91 98765 43210",
          email: "raj@rajexports.com",
          quantity: "100 tons",
          deliveryLocation: "Chennai Port"
        };
      case "shipment":
        return {
          trackingId: "SHP987654321",
          carrier: "BlueDart Express",
          estimatedDelivery: "2024-01-22",
          destination: "Delhi Wholesale Market",
          weight: "50kg"
        };
      default:
        return {};
    }
  };

  const details = getDetailedInfo(activity);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-3">
            {getTypeIcon(activity.type)}
            <span>{activity.title}</span>
            <Badge className={getStatusColor(activity.status)}>
              {activity.status}
            </Badge>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Basic Info */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">Overview</h3>
            <p className="text-gray-700 mb-3">{activity.description}</p>
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-gray-500" />
                <span className="text-gray-600">{activity.time}</span>
              </div>
              <div className="text-lg font-semibold text-green-600">
                {activity.amount}
              </div>
            </div>
          </div>

          {/* Detailed Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(details).map(([key, value]) => (
              <div key={key} className="border-l-4 border-green-500 pl-4">
                <dt className="text-sm font-medium text-gray-500 capitalize">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </dt>
                <dd className="text-sm text-gray-900 font-medium">{value}</dd>
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3 pt-4 border-t">
            {activity.status === "pending" && (
              <>
                <Button className="flex-1 bg-green-600 hover:bg-green-700">
                  Approve
                </Button>
                <Button variant="outline" className="flex-1">
                  Request Changes
                </Button>
              </>
            )}
            {activity.type === "shipment" && (
              <Button variant="outline" className="flex-1">
                Track Shipment
              </Button>
            )}
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
