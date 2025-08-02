
import { useState } from "react";
import { BarChart3, Users, Calendar, TrendingUp, Bell, MessageSquare, FileText, Settings, Tag, Award, Globe } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Navigation } from "@/components/Navigation";
import { DashboardStats } from "@/components/dashboard/DashboardStats";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { UpcomingEvents } from "@/components/dashboard/UpcomingEvents";
import { WeatherWidget } from "@/components/dashboard/WeatherWidget";
import { MarketPrices } from "@/components/dashboard/MarketPrices";
import { TabbedDashboardSection } from "@/components/dashboard/TabbedDashboardSection";
import { AnalyticsChart } from "@/components/dashboard/AnalyticsChart";
import { NotificationsPanel } from "@/components/dashboard/NotificationsPanel";
import { MessagesPanel } from "@/components/dashboard/MessagesPanel";
import FarmerMarketplace from "@/components/dashboard/FarmerMarketplace";
import { useUser } from "@/contexts/UserContext";

const Dashboard = () => {
  const { user, isLoggedIn, isEmailVerified, loading } = useUser();
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [messagesOpen, setMessagesOpen] = useState(false);
  
  const userTags = [
    { name: "Verified Farmer", color: "bg-green-100 text-green-800" },
    { name: "Premium Member", color: "bg-purple-100 text-purple-800" },
    { name: "Export Ready", color: "bg-blue-100 text-blue-800" },
    { name: "Organic Certified", color: "bg-emerald-100 text-emerald-800" },
  ];

  const achievements = [
    { name: "First Sale", icon: Award, color: "text-yellow-600" },
    { name: "Top Rated", icon: TrendingUp, color: "text-green-600" },
    { name: "Global Reach", icon: Globe, color: "text-blue-600" },
  ];

  if (!isLoggedIn || !isEmailVerified || !user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
        <Navigation />
        <div className="pt-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-3xl font-bold text-gray-900">
              {!isLoggedIn ? 'Please log in to view your dashboard' : 'Please verify your email to access your dashboard'}
            </h1>
            {!isLoggedIn && (
              <p className="mt-4 text-gray-600">
                You need to be logged in to access this page.
              </p>
            )}
            {isLoggedIn && !isEmailVerified && (
              <p className="mt-4 text-gray-600">
                Please check your email and click the verification link to access your dashboard.
              </p>
            )}
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
          {/* Header with Profile Info */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user.firstName}!</h1>
                <p className="text-gray-600 mt-2">Here's what's happening with your AgriBusiness today.</p>
              </div>
              <div className="flex items-center space-x-3">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setNotificationsOpen(true)}
                  className="hover:bg-blue-50 hover:border-blue-300"
                >
                  <Bell className="h-4 w-4 mr-2" />
                  Notifications
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setMessagesOpen(true)}
                  className="hover:bg-green-50 hover:border-green-300"
                >
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Messages
                </Button>
              </div>
            </div>

            {/* User Tags and Achievements */}
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <div className="flex items-center space-x-2">
                <Tag className="h-4 w-4 text-gray-500" />
                <span className="text-sm font-medium text-gray-700">Your Status:</span>
                {userTags.map((tag, index) => (
                  <Badge key={index} className={tag.color}>
                    {tag.name}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Achievements */}
            <div className="flex items-center space-x-4 mb-6">
              <span className="text-sm font-medium text-gray-700">Recent Achievements:</span>
              {achievements.map((achievement, index) => (
                <div key={index} className="flex items-center space-x-1 bg-white rounded-full px-3 py-1 shadow-sm">
                  <achievement.icon className={`h-4 w-4 ${achievement.color}`} />
                  <span className="text-sm font-medium text-gray-700">{achievement.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Analytics Overview - First Priority */}
          <div className="mb-8">
            <AnalyticsChart />
          </div>

          {/* Stats Grid */}
          <DashboardStats />

          {/* Farmer Marketplace - Show only for farmers */}
          {user.userType === 'farmer' && (
            <div className="mb-8">
              <FarmerMarketplace />
            </div>
          )}

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
            {/* Left Column - Events and Activities */}
            <div className="lg:col-span-2 space-y-6">
              <UpcomingEvents />
              <TabbedDashboardSection />
              <RecentActivity />
            </div>

            {/* Right Column - Quick Actions and Widgets */}
            <div className="space-y-6">
              <QuickActions />
              <WeatherWidget />
              <MarketPrices />
            </div>
          </div>

          {/* Bottom Section - Better alignment and spacing */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <div className="text-3xl font-bold text-green-600 mb-2">₹2.5L</div>
              <div className="text-sm text-gray-600">Monthly Revenue</div>
            </Card>
            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <div className="text-3xl font-bold text-blue-600 mb-2">156</div>
              <div className="text-sm text-gray-600">Active Orders</div>
            </Card>
            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <div className="text-3xl font-bold text-purple-600 mb-2">89%</div>
              <div className="text-sm text-gray-600">Customer Satisfaction</div>
            </Card>
            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <div className="text-3xl font-bold text-orange-600 mb-2">24</div>
              <div className="text-sm text-gray-600">Partnership Deals</div>
            </Card>
          </div>

          {/* Modals */}
          <NotificationsPanel 
            isOpen={notificationsOpen} 
            onClose={() => setNotificationsOpen(false)} 
          />
          <MessagesPanel 
            isOpen={messagesOpen} 
            onClose={() => setMessagesOpen(false)} 
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
