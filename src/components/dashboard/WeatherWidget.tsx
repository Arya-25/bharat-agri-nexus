
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Cloud, Sun, Droplets, Wind } from "lucide-react";

export const WeatherWidget = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Sun className="h-5 w-5" />
          <span>Weather</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <Sun className="h-8 w-8 text-yellow-500" />
              <span className="text-3xl font-bold">28°C</span>
            </div>
            <p className="text-gray-600">Sunny</p>
            <p className="text-sm text-gray-500">Mumbai, Maharashtra</p>
          </div>
          
          <div className="grid grid-cols-2 gap-4 pt-4 border-t">
            <div className="flex items-center space-x-2">
              <Droplets className="h-4 w-4 text-blue-500" />
              <div>
                <p className="text-sm font-medium">Humidity</p>
                <p className="text-xs text-gray-500">65%</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Wind className="h-4 w-4 text-gray-500" />
              <div>
                <p className="text-sm font-medium">Wind</p>
                <p className="text-xs text-gray-500">12 km/h</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
