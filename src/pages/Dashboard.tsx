
import { BarChart3, Users, Calendar, TrendingUp, Bell, MessageSquare, FileText, Settings } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Navigation } from "@/components/Navigation";
import { DashboardStats } from "@/components/dashboard/DashboardStats";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { UpcomingEvents } from "@/components/dashboard/UpcomingEvents";
import { WeatherWidget } from "@/components/dashboard/WeatherWidget";
import { MarketPrices } from "@/components/dashboard/MarketPrices";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      <Navigation />
      
      <div className="pt-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Welcome back, John!</h1>
            <p className="text-gray-600 mt-2">Here's what's happening with your AgriBusiness today.</p>
          </div>

          {/* Stats Grid */}
          <DashboardStats />

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-6">
              <RecentActivity />
              <UpcomingEvents />
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              <QuickActions />
              <WeatherWidget />
              <MarketPrices />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
