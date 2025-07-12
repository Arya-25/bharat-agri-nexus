
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart3, Download, TrendingUp, TrendingDown, DollarSign, Users, Package, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ReportViewModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ReportViewModal = ({ open, onOpenChange }: ReportViewModalProps) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("overview");

  const handleDownload = () => {
    toast({
      title: "Report Downloaded",
      description: "Your business report has been downloaded successfully.",
    });
  };

  const salesData = [
    { month: "Jan", sales: 45000, growth: "+12%" },
    { month: "Feb", sales: 52000, growth: "+15%" },
    { month: "Mar", sales: 48000, growth: "-8%" },
    { month: "Apr", sales: 61000, growth: "+27%" },
    { month: "May", sales: 55000, growth: "-10%" },
    { month: "Jun", sales: 67000, growth: "+22%" },
  ];

  const insights = [
    "Sales increased by 22% compared to last quarter",
    "Top performing product: Organic Wheat (45% of revenue)",
    "Customer retention rate improved to 85%",
    "New market expansion showing 35% growth potential",
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <BarChart3 className="h-5 w-5" />
            <span>Business Report Dashboard</span>
          </DialogTitle>
        </DialogHeader>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="sales">Sales</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="insights">Insights</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <DollarSign className="h-4 w-4 text-green-600" />
                    <span className="text-sm font-medium">Revenue</span>
                  </div>
                  <div className="text-2xl font-bold">₹3,28,000</div>
                  <p className="text-xs text-green-600">+15% from last month</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4 text-blue-600" />
                    <span className="text-sm font-medium">Customers</span>
                  </div>
                  <div className="text-2xl font-bold">1,245</div>
                  <p className="text-xs text-blue-600">+8% new customers</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <Package className="h-4 w-4 text-purple-600" />
                    <span className="text-sm font-medium">Products</span>
                  </div>
                  <div className="text-2xl font-bold">156</div>
                  <p className="text-xs text-purple-600">12 new this month</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-orange-600" />
                    <span className="text-sm font-medium">Orders</span>
                  </div>
                  <div className="text-2xl font-bold">892</div>
                  <p className="text-xs text-orange-600">+22% this month</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="sales" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Sales Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {salesData.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <span className="font-medium">{item.month}</span>
                        <div className="text-sm text-gray-600">₹{item.sales.toLocaleString()}</div>
                      </div>
                      <div className={`flex items-center space-x-1 ${item.growth.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                        {item.growth.startsWith('+') ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                        <span className="font-medium">{item.growth}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="products" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Top Performing Products</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { name: "Organic Wheat", sales: "₹1,45,000", percentage: "45%" },
                    { name: "Basmati Rice", sales: "₹98,000", percentage: "30%" },
                    { name: "Cotton", sales: "₹52,000", percentage: "16%" },
                    { name: "Sugarcane", sales: "₹33,000", percentage: "9%" },
                  ].map((product, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <div className="font-medium">{product.name}</div>
                        <div className="text-sm text-gray-600">{product.sales}</div>
                      </div>
                      <div className="text-green-600 font-medium">{product.percentage}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="insights" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Key Business Insights</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {insights.map((insight, index) => (
                    <div key={index} className="flex items-start space-x-2 p-3 bg-blue-50 rounded-lg">
                      <TrendingUp className="h-4 w-4 text-blue-600 mt-0.5" />
                      <span className="text-sm">{insight}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        <div className="flex gap-2 pt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)} className="flex-1">
            Close
          </Button>
          <Button onClick={handleDownload} className="flex-1">
            <Download className="mr-2 h-4 w-4" />
            Download Report
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
