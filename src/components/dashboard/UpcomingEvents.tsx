
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

export const UpcomingEvents = () => {
  const events = [
    {
      title: "AgriTech Summit 2024",
      date: "March 15, 2024",
      time: "10:00 AM",
      location: "New Delhi",
      type: "Conference",
    },
    {
      title: "Organic Farming Workshop",
      date: "March 20, 2024",
      time: "2:00 PM",
      location: "Pune",
      type: "Workshop",
    },
    {
      title: "FPO Networking Event",
      date: "March 25, 2024",
      time: "11:00 AM",
      location: "Mumbai",
      type: "Networking",
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Calendar className="h-5 w-5" />
          <span>Upcoming Events</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {events.map((event, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-gray-900">{event.title}</h3>
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">{event.type}</span>
              </div>
              <div className="space-y-1 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4" />
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4" />
                  <span>{event.location}</span>
                </div>
              </div>
              <Button size="sm" className="mt-3 w-full">
                Register Now
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
