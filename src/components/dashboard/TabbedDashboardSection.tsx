
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, TrendingUp, BarChart3, Users, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { EventsCalendar } from "@/components/EventsCalendar";

export const TabbedDashboardSection = () => {
  const { toast } = useToast();

  const upcomingEvents = [
    {
      id: 1,
      title: "Agricultural Trade Fair",
      date: "2024-01-20",
      time: "10:00 AM",
      location: "Mumbai Exhibition Center",
      type: "trade-fair",
    },
    {
      id: 2,
      title: "Organic Farming Workshop",
      date: "2024-01-25",
      time: "2:00 PM",
      location: "Online Webinar",
      type: "workshop",
    },
    {
      id: 3,
      title: "Crop Insurance Seminar",
      date: "2024-02-01",
      time: "11:00 AM",
      location: "Delhi Convention Center",
      type: "seminar",
    },
  ];

  const marketAnalysis = {
    wheat: {
      currentPrice: "₹2,150 per quintal",
      change: "+2.3%",
      trend: "Bullish",
      forecast: "Strong performance expected with favorable monsoon predictions",
      keyFactors: [
        "Government procurement at MSP rates",
        "Export demand increasing",
        "Storage facilities improved",
        "Quality standards met consistently"
      ],
      tradingVolume: "15,000 quintals",
      lastUpdated: "2 hours ago"
    }
  };

  const handleJoinEvent = (eventId: number, eventTitle: string) => {
    toast({
      title: "Event Registration",
      description: `Registered for "${eventTitle}" successfully!`,
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <Card className="col-span-full">
      <CardHeader>
        <CardTitle>Dashboard Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="events" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="events" className="flex items-center space-x-2">
              <Calendar className="h-4 w-4" />
              <span>All Events</span>
            </TabsTrigger>
            <TabsTrigger value="analysis" className="flex items-center space-x-2">
              <TrendingUp className="h-4 w-4" />
              <span>Wheat Analysis</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="events" className="mt-6">
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Upcoming Events List</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {upcomingEvents.map((event) => (
                        <div
                          key={event.id}
                          className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                        >
                          <div className="flex justify-between items-start mb-3">
                            <h4 className="font-semibold text-gray-900">{event.title}</h4>
                            <Button
                              size="sm"
                              onClick={() => handleJoinEvent(event.id, event.title)}
                              className="bg-green-600 hover:bg-green-700"
                            >
                              Register
                            </Button>
                          </div>
                          
                          <div className="space-y-2 text-sm text-gray-600">
                            <div className="flex items-center space-x-2">
                              <Calendar className="h-4 w-4" />
                              <span>{formatDate(event.date)}</span>
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
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Calendar View</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <EventsCalendar />
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="analysis" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <BarChart3 className="h-5 w-5 text-green-600" />
                    <span>Wheat Market Analysis</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-green-50 p-4 rounded-lg">
                      <div className="text-sm text-gray-600">Current Price</div>
                      <div className="text-2xl font-bold text-green-700">
                        {marketAnalysis.wheat.currentPrice}
                      </div>
                      <div className="text-sm text-green-600 font-medium">
                        {marketAnalysis.wheat.change}
                      </div>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <div className="text-sm text-gray-600">Market Trend</div>
                      <div className="text-xl font-bold text-blue-700">
                        {marketAnalysis.wheat.trend}
                      </div>
                      <div className="text-sm text-blue-600">
                        Volume: {marketAnalysis.wheat.tradingVolume}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-900">Market Forecast</h4>
                    <p className="text-gray-700">{marketAnalysis.wheat.forecast}</p>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-900">Key Factors</h4>
                    <ul className="space-y-2">
                      {marketAnalysis.wheat.keyFactors.map((factor, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-gray-700">{factor}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-4 border-t text-sm text-gray-500">
                    Last updated: {marketAnalysis.wheat.lastUpdated}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button 
                    className="w-full justify-start"
                    variant="outline"
                    onClick={() => toast({ title: "Price Alert", description: "Price alert set for wheat at ₹2,200 per quintal" })}
                  >
                    <TrendingUp className="h-4 w-4 mr-2" />
                    Set Price Alert
                  </Button>
                  <Button 
                    className="w-full justify-start"
                    variant="outline"
                    onClick={() => toast({ title: "Market Report", description: "Downloading detailed wheat market report..." })}
                  >
                    <BarChart3 className="h-4 w-4 mr-2" />
                    Download Report
                  </Button>
                  <Button 
                    className="w-full justify-start"
                    variant="outline"
                    onClick={() => toast({ title: "Expert Consultation", description: "Booking consultation with market expert..." })}
                  >
                    <Users className="h-4 w-4 mr-2" />
                    Consult Expert
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
