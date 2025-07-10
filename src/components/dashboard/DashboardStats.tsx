
import { TrendingUp, Users, Calendar, FileText } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const DashboardStats = () => {
  const stats = [
    {
      title: "Total Revenue",
      value: "₹2,45,000",
      change: "+12%",
      icon: TrendingUp,
      positive: true,
    },
    {
      title: "Active Connections",
      value: "1,234",
      change: "+5%",
      icon: Users,
      positive: true,
    },
    {
      title: "Upcoming Events",
      value: "8",
      change: "+2",
      icon: Calendar,
      positive: true,
    },
    {
      title: "Pending Orders",
      value: "23",
      change: "-3",
      icon: FileText,
      positive: false,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <Card key={index} className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              {stat.title}
            </CardTitle>
            <stat.icon className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
            <p className={`text-xs ${stat.positive ? 'text-green-600' : 'text-red-600'}`}>
              {stat.change} from last month
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
