
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, BarChart3 } from "lucide-react";

export const MarketPrices = () => {
  const prices = [
    { crop: "Wheat", price: "₹2,150", change: "+5.2%", positive: true },
    { crop: "Rice", price: "₹3,200", change: "-2.1%", positive: false },
    { crop: "Cotton", price: "₹5,800", change: "+3.8%", positive: true },
    { crop: "Soybean", price: "₹4,500", change: "+1.5%", positive: true },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <BarChart3 className="h-5 w-5" />
          <span>Market Prices</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {prices.map((item, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">{item.crop}</p>
                <p className="text-sm text-gray-600">per quintal</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-gray-900">{item.price}</p>
                <div className={`flex items-center space-x-1 text-sm ${
                  item.positive ? 'text-green-600' : 'text-red-600'
                }`}>
                  {item.positive ? (
                    <TrendingUp className="h-3 w-3" />
                  ) : (
                    <TrendingDown className="h-3 w-3" />
                  )}
                  <span>{item.change}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
