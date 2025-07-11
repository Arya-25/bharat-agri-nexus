
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export const MarketPrices = () => {
  const { toast } = useToast();

  const commodities = [
    {
      name: "Wheat",
      price: "₹2,150",
      unit: "per quintal",
      change: "+2.3%",
      trend: "up" as const,
    },
    {
      name: "Rice (Basmati)",
      price: "₹4,800",
      unit: "per quintal",
      change: "-1.2%",
      trend: "down" as const,
    },
    {
      name: "Sugarcane",
      price: "₹320",
      unit: "per quintal",
      change: "+0.8%",
      trend: "up" as const,
    },
    {
      name: "Cotton",
      price: "₹5,600",
      unit: "per quintal",
      change: "+3.1%",
      trend: "up" as const,
    },
  ];

  const handleViewDetails = (commodity: string) => {
    toast({
      title: "Market Details",
      description: `Viewing detailed market analysis for ${commodity}`,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <DollarSign className="h-5 w-5" />
          <span>Market Prices</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {commodities.map((commodity, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
              onClick={() => handleViewDetails(commodity.name)}
            >
              <div>
                <div className="font-medium text-gray-900">{commodity.name}</div>
                <div className="text-sm text-gray-600">
                  {commodity.price} {commodity.unit}
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span
                  className={`text-sm font-medium ${
                    commodity.trend === "up" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {commodity.change}
                </span>
                {commodity.trend === "up" ? (
                  <TrendingUp className="h-4 w-4 text-green-600" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-red-600" />
                )}
              </div>
            </div>
          ))}
        </div>
        
        <Button
          variant="outline"
          className="w-full mt-4"
          onClick={() => toast({
            title: "Full Market Report",
            description: "Loading comprehensive market analysis...",
          })}
        >
          View Full Market Report
        </Button>
      </CardContent>
    </Card>
  );
};
