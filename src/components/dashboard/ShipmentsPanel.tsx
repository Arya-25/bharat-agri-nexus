import { useState } from "react";
import { Truck, Package, MapPin, Calendar, Eye, Download, CheckCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { SuccessModal } from "@/components/ui/success-modal";
import { LoadingModal } from "@/components/ui/loading-modal";

interface Shipment {
  id: string;
  trackingNumber: string;
  commodity: string;
  quantity: string;
  destination: string;
  status: 'pending' | 'in-transit' | 'delivered' | 'delayed';
  estimatedDelivery: string;
  progress: number;
  carrier: string;
  cost: number;
}

const mockShipments: Shipment[] = [
  {
    id: '1',
    trackingNumber: 'AGR001234',
    commodity: 'Wheat (Premium)',
    quantity: '50 tons',
    destination: 'Mumbai Port',
    status: 'in-transit',
    estimatedDelivery: '2024-02-20',
    progress: 65,
    carrier: 'AgriTrans Logistics',
    cost: 125000
  },
  {
    id: '2',
    trackingNumber: 'AGR001235',
    commodity: 'Rice (Basmati)',
    quantity: '30 tons',
    destination: 'Delhi Market',
    status: 'delivered',
    estimatedDelivery: '2024-02-15',
    progress: 100,
    carrier: 'FarmFresh Express',
    cost: 180000
  },
  {
    id: '3',
    trackingNumber: 'AGR001236',
    commodity: 'Corn (Sweet)',
    quantity: '25 tons',
    destination: 'Bangalore Hub',
    status: 'pending',
    estimatedDelivery: '2024-02-25',
    progress: 0,
    carrier: 'Green Valley Transport',
    cost: 95000
  }
];

export const ShipmentsPanel = () => {
  const [selectedShipment, setSelectedShipment] = useState<Shipment | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showLoadingModal, setShowLoadingModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState({ title: '', message: '' });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'in-transit': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'delayed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleDownloadDocument = (type: string, shipmentId: string) => {
    setShowLoadingModal(true);
    
    setTimeout(() => {
      setShowLoadingModal(false);
      setSuccessMessage({
        title: 'Download Complete',
        message: `${type} for shipment ${shipmentId} has been downloaded successfully.`
      });
      setShowSuccessModal(true);
    }, 2000);
  };

  const getShipmentsByStatus = (status: string) => {
    return mockShipments.filter(shipment => shipment.status === status);
  };

  const ShipmentCard = ({ shipment }: { shipment: Shipment }) => (
    <div className="border rounded-lg p-4 space-y-3">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-semibold text-sm">{shipment.commodity}</h3>
          <p className="text-xs text-muted-foreground">{shipment.trackingNumber}</p>
        </div>
        <Badge className={getStatusColor(shipment.status)}>
          {shipment.status}
        </Badge>
      </div>

      <div className="space-y-2 text-xs">
        <div className="flex items-center gap-2">
          <Package className="h-3 w-3" />
          <span>{shipment.quantity}</span>
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="h-3 w-3" />
          <span>{shipment.destination}</span>
        </div>
        <div className="flex items-center gap-2">
          <Calendar className="h-3 w-3" />
          <span>ETA: {new Date(shipment.estimatedDelivery).toLocaleDateString()}</span>
        </div>
      </div>

      {shipment.status === 'in-transit' && (
        <div className="space-y-1">
          <div className="flex justify-between text-xs">
            <span>Progress</span>
            <span>{shipment.progress}%</span>
          </div>
          <Progress value={shipment.progress} className="h-2" />
        </div>
      )}

      <div className="flex gap-2">
        <Dialog>
          <DialogTrigger asChild>
            <Button size="sm" variant="outline" onClick={() => setSelectedShipment(shipment)}>
              <Eye className="h-3 w-3 mr-1" />
              View
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Shipment Details</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium">Tracking Number:</span>
                  <p className="text-muted-foreground">{shipment.trackingNumber}</p>
                </div>
                <div>
                  <span className="font-medium">Status:</span>
                  <Badge className={`${getStatusColor(shipment.status)} ml-2`}>
                    {shipment.status}
                  </Badge>
                </div>
                <div>
                  <span className="font-medium">Commodity:</span>
                  <p className="text-muted-foreground">{shipment.commodity}</p>
                </div>
                <div>
                  <span className="font-medium">Quantity:</span>
                  <p className="text-muted-foreground">{shipment.quantity}</p>
                </div>
                <div>
                  <span className="font-medium">Destination:</span>
                  <p className="text-muted-foreground">{shipment.destination}</p>
                </div>
                <div>
                  <span className="font-medium">Carrier:</span>
                  <p className="text-muted-foreground">{shipment.carrier}</p>
                </div>
                <div>
                  <span className="font-medium">Cost:</span>
                  <p className="text-muted-foreground">₹{shipment.cost.toLocaleString()}</p>
                </div>
                <div>
                  <span className="font-medium">ETA:</span>
                  <p className="text-muted-foreground">{new Date(shipment.estimatedDelivery).toLocaleDateString()}</p>
                </div>
              </div>
              
              {shipment.status === 'in-transit' && (
                <div className="space-y-2">
                  <span className="font-medium text-sm">Delivery Progress:</span>
                  <Progress value={shipment.progress} className="h-3" />
                  <p className="text-xs text-muted-foreground">{shipment.progress}% complete</p>
                </div>
              )}

              <div className="space-y-2">
                <h4 className="font-medium text-sm">Documents</h4>
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDownloadDocument('Shipping Label', shipment.trackingNumber)}
                  >
                    <Download className="h-3 w-3 mr-1" />
                    Label
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDownloadDocument('Invoice', shipment.trackingNumber)}
                  >
                    <Download className="h-3 w-3 mr-1" />
                    Invoice
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDownloadDocument('Certificate', shipment.trackingNumber)}
                  >
                    <Download className="h-3 w-3 mr-1" />
                    Certificate
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDownloadDocument('Receipt', shipment.trackingNumber)}
                  >
                    <Download className="h-3 w-3 mr-1" />
                    Receipt
                  </Button>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        <Button
          size="sm"
          onClick={() => handleDownloadDocument('Shipping Document', shipment.trackingNumber)}
        >
          <Download className="h-3 w-3 mr-1" />
          Docs
        </Button>
      </div>
    </div>
  );

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Truck className="h-5 w-5" />
            Shipments Management
          </CardTitle>
          <CardDescription>Track and manage your commodity shipments</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="in-transit">In Transit</TabsTrigger>
              <TabsTrigger value="delivered">Delivered</TabsTrigger>
              <TabsTrigger value="delayed">Delayed</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-4">
              <div className="space-y-3 max-h-[400px] overflow-y-auto">
                {mockShipments.map((shipment) => (
                  <ShipmentCard key={shipment.id} shipment={shipment} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="pending" className="mt-4">
              <div className="space-y-3 max-h-[400px] overflow-y-auto">
                {getShipmentsByStatus('pending').map((shipment) => (
                  <ShipmentCard key={shipment.id} shipment={shipment} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="in-transit" className="mt-4">
              <div className="space-y-3 max-h-[400px] overflow-y-auto">
                {getShipmentsByStatus('in-transit').map((shipment) => (
                  <ShipmentCard key={shipment.id} shipment={shipment} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="delivered" className="mt-4">
              <div className="space-y-3 max-h-[400px] overflow-y-auto">
                {getShipmentsByStatus('delivered').map((shipment) => (
                  <ShipmentCard key={shipment.id} shipment={shipment} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="delayed" className="mt-4">
              <div className="space-y-3 max-h-[400px] overflow-y-auto">
                {getShipmentsByStatus('delayed').length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <CheckCircle className="h-12 w-12 mx-auto mb-4 text-green-500" />
                    <p>No delayed shipments!</p>
                    <p className="text-xs">All shipments are on schedule.</p>
                  </div>
                ) : (
                  getShipmentsByStatus('delayed').map((shipment) => (
                    <ShipmentCard key={shipment.id} shipment={shipment} />
                  ))
                )}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        title={successMessage.title}
        message={successMessage.message}
      />

      <LoadingModal
        isOpen={showLoadingModal}
        title="Downloading Document"
        message="Please wait while we prepare your document..."
      />
    </>
  );
};