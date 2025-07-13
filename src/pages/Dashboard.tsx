import React from 'react';
import { Navigation } from '../components/Navigation';
import { DashboardStats } from '../components/dashboard/DashboardStats';
import { TabbedDashboardSection } from '../components/dashboard/TabbedDashboardSection';
import { RecentActivity } from '../components/dashboard/RecentActivity';
import { QuickActions } from '../components/dashboard/QuickActions';
import { WeatherWidget } from '../components/dashboard/WeatherWidget';
import { MarketPrices } from '../components/dashboard/MarketPrices';
import { OverviewCharts } from '../components/dashboard/OverviewCharts';
import { NotificationsPanel } from '../components/dashboard/NotificationsPanel';
import { MessagesPanel } from '../components/dashboard/MessagesPanel';
import { EnhancedCalendar } from '../components/dashboard/EnhancedCalendar';
import { ShipmentsPanel } from '../components/dashboard/ShipmentsPanel';
import { useAuth } from '../hooks/useAuth';
import { Link } from 'react-router-dom';
import { LogIn } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Dashboard = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
        <Navigation />
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <div className="animate-spin rounded-full h-24 w-24 border-b-2 border-green-600 mx-auto mb-6"></div>
            <h1 className="text-2xl font-bold text-gray-900">Loading...</h1>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
        <Navigation />
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <LogIn className="mx-auto h-24 w-24 text-gray-400 mb-6" />
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Please log in to access your dashboard
            </h1>
            <p className="text-gray-600 mb-8">
              You need to be logged in to view your personalized agricultural dashboard.
            </p>
            <Link
              to="/login"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
            >
              <LogIn className="mr-2 h-5 w-5" />
              Go to Login
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      <Navigation />
      
      <div className="pt-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Welcome Section */}
          <div className="mb-8 bg-white rounded-lg shadow-lg p-6 border border-green-100">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  Welcome back, {user.user_metadata?.full_name || user.email?.split('@')[0]}!
                </h1>
                <p className="text-gray-600">
                  Here's what's happening with your agricultural business today.
                </p>
              </div>
              <div className="flex space-x-2">
                <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
                  Premium Member
                </span>
                <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                  Verified Farmer
                </span>
              </div>
            </div>

            {/* Achievement Badges */}
            <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-yellow-600 text-xl">🏆</span>
                </div>
                <p className="text-sm font-medium">Top Trader</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-green-600 text-xl">🌱</span>
                </div>
                <p className="text-sm font-medium">Sustainable Farming</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-blue-600 text-xl">📊</span>
                </div>
                <p className="text-sm font-medium">Data Expert</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-purple-600 text-xl">🤝</span>
                </div>
                <p className="text-sm font-medium">Community Leader</p>
              </div>
            </div>
          </div>

          {/* Main Dashboard Tabs */}
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-6 mb-6 bg-white shadow-sm">
              <TabsTrigger value="overview" className="data-[state=active]:bg-green-500 data-[state=active]:text-white">Overview</TabsTrigger>
              <TabsTrigger value="calendar" className="data-[state=active]:bg-green-500 data-[state=active]:text-white">Calendar</TabsTrigger>
              <TabsTrigger value="shipments" className="data-[state=active]:bg-green-500 data-[state=active]:text-white">Shipments</TabsTrigger>
              <TabsTrigger value="notifications" className="data-[state=active]:bg-green-500 data-[state=active]:text-white">Notifications</TabsTrigger>
              <TabsTrigger value="messages" className="data-[state=active]:bg-green-500 data-[state=active]:text-white">Messages</TabsTrigger>
              <TabsTrigger value="analytics" className="data-[state=active]:bg-green-500 data-[state=active]:text-white">Analytics</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              {/* Stats and Quick Overview */}
              <DashboardStats />
              
              {/* Charts Overview */}
              <OverviewCharts />
              
              {/* Main Content Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <TabbedDashboardSection />
                </div>
                <div>
                  <RecentActivity />
                </div>
              </div>

              {/* Bottom Row */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div>
                  <QuickActions />
                </div>
                <div>
                  <WeatherWidget />
                </div>
                <div>
                  <MarketPrices />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="calendar">
              <EnhancedCalendar />
            </TabsContent>

            <TabsContent value="shipments">
              <ShipmentsPanel />
            </TabsContent>

            <TabsContent value="notifications">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <NotificationsPanel />
                <RecentActivity />
              </div>
            </TabsContent>

            <TabsContent value="messages">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <MessagesPanel />
                <QuickActions />
              </div>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-6">
              <OverviewCharts />
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <MarketPrices />
                <RecentActivity />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;