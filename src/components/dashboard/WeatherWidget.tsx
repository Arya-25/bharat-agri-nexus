
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Cloud, Sun, CloudRain, Wind, Thermometer, Droplets } from "lucide-react";

export const WeatherWidget = () => {
  // Mock weather data - in a real app, this would come from a weather API
  const weatherData = {
    location: "Mumbai, Maharashtra",
    temperature: 28,
    condition: "Partly Cloudy",
    humidity: 65,
    windSpeed: 12,
    forecast: [
      { day: "Today", high: 30, low: 24, condition: "sunny" },
      { day: "Tomorrow", high: 32, low: 26, condition: "cloudy" },
      { day: "Wed", high: 29, low: 23, condition: "rainy" },
    ]
  };

  const getWeatherIcon = (condition: string) => {
    switch (condition) {
      case "sunny":
        return <Sun className="h-8 w-8 text-yellow-500" />;
      case "cloudy":
        return <Cloud className="h-8 w-8 text-gray-500" />;
      case "rainy":
        return <CloudRain className="h-8 w-8 text-blue-500" />;
      default:
        return <Sun className="h-8 w-8 text-yellow-500" />;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Sun className="h-5 w-5" />
          <span>Weather</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center mb-4">
          <div className="flex items-center justify-center mb-2">
            <Cloud className="h-12 w-12 text-gray-400" />
          </div>
          <div className="text-3xl font-bold text-gray-900">{weatherData.temperature}°C</div>
          <div className="text-sm text-gray-600">{weatherData.condition}</div>
          <div className="text-xs text-gray-500 mt-1">{weatherData.location}</div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center space-x-2 text-sm">
            <Droplets className="h-4 w-4 text-blue-500" />
            <span className="text-gray-600">Humidity: {weatherData.humidity}%</span>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <Wind className="h-4 w-4 text-gray-500" />
            <span className="text-gray-600">Wind: {weatherData.windSpeed} km/h</span>
          </div>
        </div>

        <div className="border-t pt-4">
          <h4 className="text-sm font-medium text-gray-900 mb-3">3-Day Forecast</h4>
          <div className="space-y-2">
            {weatherData.forecast.map((day, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {getWeatherIcon(day.condition)}
                  <span className="text-sm font-medium">{day.day}</span>
                </div>
                <div className="text-sm text-gray-600">
                  {day.high}°/{day.low}°
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
