import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, LineChart, Line, ResponsiveContainer } from "recharts";

const marketDistribution = [
  { name: "Wheat", value: 35, fill: "hsl(var(--chart-1))" },
  { name: "Rice", value: 25, fill: "hsl(var(--chart-2))" },
  { name: "Corn", value: 20, fill: "hsl(var(--chart-3))" },
  { name: "Soybeans", value: 15, fill: "hsl(var(--chart-4))" },
  { name: "Others", value: 5, fill: "hsl(var(--chart-5))" }
];

const monthlyRevenue = [
  { month: "Jan", revenue: 12000, expenses: 8000 },
  { month: "Feb", revenue: 15000, expenses: 9000 },
  { month: "Mar", revenue: 18000, expenses: 11000 },
  { month: "Apr", revenue: 22000, expenses: 12000 },
  { month: "May", revenue: 25000, expenses: 14000 },
  { month: "Jun", revenue: 28000, expenses: 15000 }
];

const pricesTrend = [
  { date: "Jan", wheat: 2200, rice: 3000, corn: 1800 },
  { date: "Feb", wheat: 2250, rice: 3100, corn: 1850 },
  { date: "Mar", wheat: 2300, rice: 3050, corn: 1900 },
  { date: "Apr", wheat: 2340, rice: 3120, corn: 1890 },
];

const chartConfig = {
  wheat: { label: "Wheat", color: "hsl(var(--chart-1))" },
  rice: { label: "Rice", color: "hsl(var(--chart-2))" },
  corn: { label: "Corn", color: "hsl(var(--chart-3))" },
  revenue: { label: "Revenue", color: "hsl(var(--chart-1))" },
  expenses: { label: "Expenses", color: "hsl(var(--chart-2))" }
};

export const OverviewCharts = () => {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {/* Market Distribution Pie Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Market Distribution</CardTitle>
          <CardDescription>Portfolio allocation by commodity</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={marketDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  dataKey="value"
                >
                  {marketDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <ChartTooltip content={<ChartTooltipContent />} />
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Revenue vs Expenses Bar Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Monthly Performance</CardTitle>
          <CardDescription>Revenue vs Expenses (₹)</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyRevenue}>
                <XAxis dataKey="month" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="revenue" fill="hsl(var(--chart-1))" radius={4} />
                <Bar dataKey="expenses" fill="hsl(var(--chart-2))" radius={4} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Price Trends Line Chart */}
      <Card className="lg:col-span-1">
        <CardHeader>
          <CardTitle>Price Trends</CardTitle>
          <CardDescription>Commodity prices over time</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={pricesTrend}>
                <XAxis dataKey="date" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line type="monotone" dataKey="wheat" stroke="hsl(var(--chart-1))" strokeWidth={2} />
                <Line type="monotone" dataKey="rice" stroke="hsl(var(--chart-2))" strokeWidth={2} />
                <Line type="monotone" dataKey="corn" stroke="hsl(var(--chart-3))" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
};