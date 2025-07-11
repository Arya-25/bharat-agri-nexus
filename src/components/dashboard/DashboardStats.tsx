
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Users, ShoppingCart, DollarSign } from "lucide-react";

export const DashboardStats = () => {
  const stats = [
    {
      title: "Total Revenue",
      value: "₹2,45,000",
      change: "+12.5%",
      changeType: "positive" as const,
      icon: DollarSign,
    },
    {
      title: "Active Orders",
      value: "156",
      change: "+8.2%",
      changeType: "positive" as const,
      icon: ShoppingCart,
    },
    {
      title: "Total Customers",
      value: "2,847",
      change: "+15.3%",
      changeType: "positive" as const,
      icon: Users,
    },
    {
      title: "Growth Rate",
      value: "23.1%",
      change: "+2.4%",
      changeType: "positive" as const,
      icon: TrendingUp,
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
            <stat.icon className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
            <p className="text-xs text-green-600 mt-1">
              {stat.change} from last month
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
