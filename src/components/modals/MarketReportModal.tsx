
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, BarChart3, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface MarketReportModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const MarketReportModal = ({ open, onOpenChange }: MarketReportModalProps) => {
  const { toast } = useToast();

  const marketData = [
    { name: "Wheat", current: "₹2,150", week: "+2.3%", month: "+8.1%", trend: "up" },
    { name: "Rice (Basmati)", current: "₹4,800", week: "-1.2%", month: "+5.4%", trend: "down" },
    { name: "Sugarcane", current: "₹320", week: "+0.8%", month: "+3.2%", trend: "up" },
    { name: "Cotton", current: "₹5,600", week: "+3.1%", month: "+12.7%", trend: "up" },
    { name: "Corn", current: "₹1,850", week: "-0.5%", month: "+2.8%", trend: "down" },
    { name: "Soybeans", current: "₹4,200", week: "+1.8%", month: "+7.3%", trend: "up" },
  ];

  const handleDownloadReport = () => {
    toast({
      title: "Report Downloaded",
      description: "Full market analysis report has been saved to your downloads.",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <BarChart3 className="h-5 w-5" />
            <span>Full Market Report</span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Market Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">
                Current market analysis shows mixed trends across agricultural commodities. 
                Strong demand for export crops continues to drive prices upward, while 
                seasonal factors affect domestic staples.
              </p>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium">Market Sentiment:</span>
                  <span className="text-green-600 ml-2">Bullish</span>
                </div>
                <div>
                  <span className="font-medium">Weather Impact:</span>
                  <span className="text-yellow-600 ml-2">Moderate</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Commodity Prices</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {marketData.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <div className="font-medium">{item.name}</div>
                      <div className="text-lg font-bold text-gray-900">{item.current}</div>
                    </div>
                    <div className="text-right space-y-1">
                      <div className="flex items-center space-x-1">
                        <span className="text-xs text-gray-500">Week:</span>
                        <span className={`text-sm font-medium ${item.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                          {item.week}
                        </span>
                        {item.trend === "up" ? (
                          <TrendingUp className="h-3 w-3 text-green-600" />
                        ) : (
                          <TrendingDown className="h-3 w-3 text-red-600" />
                        )}
                      </div>
                      <div className="flex items-center space-x-1">
                        <span className="text-xs text-gray-500">Month:</span>
                        <span className="text-sm font-medium text-green-600">{item.month}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Key Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start space-x-2">
                  <span className="text-green-600">•</span>
                  <span>Cotton prices showing strong upward momentum due to export demand</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-blue-600">•</span>
                  <span>Wheat markets stabilizing after recent volatility</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-yellow-600">•</span>
                  <span>Monsoon forecasts suggest favorable conditions for next season</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-purple-600">•</span>
                  <span>Government procurement policies supporting farmer incomes</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <div className="flex gap-2 pt-4">
            <Button variant="outline" onClick={() => onOpenChange(false)} className="flex-1">
              Close
            </Button>
            <Button onClick={handleDownloadReport} className="flex-1">
              <Download className="mr-2 h-4 w-4" />
              Download Full Report
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
