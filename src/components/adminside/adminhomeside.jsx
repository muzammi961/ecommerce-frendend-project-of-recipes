import React from 'react';
import { Toaster } from 'react-hot-toast';
import AdminSidebar from '../ad/sidebar';

function AdminHomeside() {
  // Sample data for stats cards
  const stats = [
    { 
      title: "Total Recipes", 
      value: "1,248", 
      change: "+42", 
      icon: "📜", 
      color: "from-purple-500 to-indigo-500",
      description: "In your collection" 
    },
    { 
      title: "Monthly Views", 
      value: "24,568", 
      change: "+18%", 
      icon: "👀", 
      color: "from-green-500 to-teal-500",
      description: "Recipe page visits" 
    },
    { 
      title: "Active Cooks", 
      value: "2,843", 
      change: "+8%", 
      icon: "👨‍🍳", 
      color: "from-blue-500 to-cyan-500",
      description: "Using your recipes" 
    },
    { 
      title: "Rating", 
      value: "4.8★", 
      change: "+0.2", 
      icon: "⭐", 
      color: "from-amber-500 to-orange-500",
      description: "Average recipe rating" 
    }
  ];

  // Sample recent activities
  const recentActivities = [
    {
      id: 1042,
      type: "New Recipe",
      user: "Chef Marco",
      recipe: "Spicy Thai Noodles",
      time: "10 minutes ago",
      status: "Pending Review",
      icon: "🍜"
    },
    {
      id: 1041,
      type: "Recipe Approved",
      user: "Admin",
      recipe: "Vegan Chocolate Cake",
      time: "25 minutes ago",
      status: "Published",
      icon: "✅"
    },
    {
      id: 1040,
      type: "New Comment",
      user: "Foodie123",
      recipe: "Classic Beef Bourguignon",
      time: "1 hour ago",
      status: "Unread",
      icon: "💬"
    },
    {
      id: 1039,
      type: "Recipe Edited",
      user: "Chef Elena",
      recipe: "Mediterranean Salad",
      time: "2 hours ago",
      status: "Updated",
      icon: "✏️"
    }
  ];

  // Sample top recipes
  const topRecipes = [
    {
      name: "Creamy Garlic Pasta",
      views: 12780,
      saves: 3421,
      rating: "4.9★",
      cookTime: "25 min"
    },
    {
      name: "Authentic Tacos al Pastor",
      views: 8820,
      saves: 2543,
      rating: "4.8★",
      cookTime: "45 min"
    },
    {
      name: "Fluffy Japanese Pancakes",
      views: 7654,
      saves: 1876,
      rating: "4.7★",
      cookTime: "30 min"
    },
    {
      name: "Homemade Sourdough Bread",
      views: 6543,
      saves: 1234,
      rating: "4.6★",
      cookTime: "3 hrs"
    }
  ];

  // Sample engagement data for chart
  const engagementData = [
    { day: "Mon", engagement: 12 },
    { day: "Tue", engagement: 19 },
    { day: "Wed", engagement: 8 },
    { day: "Thu", engagement: 15 },
    { day: "Fri", engagement: 22 },
    { day: "Sat", engagement: 18 },
    { day: "Sun", engagement: 14 }
  ];

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
      <AdminSidebar />
      
      <div className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="bg-gradient-to-r from-orange-600 to-amber-600 rounded-xl shadow-xl p-6 mb-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full transform translate-x-16 -translate-y-16"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-white opacity-10 rounded-full transform -translate-x-16 translate-y-16"></div>
            <h1 className="text-3xl font-bold text-white relative z-10">Recipe Dashboard</h1>
            <p className="text-amber-100 mt-2 relative z-10">What's cooking in your community today</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className={`bg-gradient-to-r ${stat.color} rounded-xl shadow-lg p-6 text-white transform hover:scale-[1.02] transition-all duration-300 hover:shadow-xl`}
              >
                <div className="flex items-start">
                  <div className="p-3 rounded-full bg-white bg-opacity-20 mr-4 text-xl backdrop-blur-sm">
                    {stat.icon}
                  </div>
                  <div>
                    <p className="text-sm text-white text-opacity-80">{stat.title}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-sm mt-1 text-white text-opacity-90 flex items-center">
                      <span className="mr-1">{stat.change}</span> 
                      <span className="text-xs opacity-80">{stat.description}</span>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-100">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-800">Recent Kitchen Activity</h2>
              <button className="text-orange-600 hover:text-orange-800 font-medium flex items-center">
                View All <span className="ml-1">→</span>
              </button>
            </div>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div 
                  key={activity.id} 
                  className="flex items-center p-4 hover:bg-amber-50 rounded-lg transition-all duration-200 border border-gray-100 hover:border-amber-200"
                >
                  <div className={`p-3 rounded-full mr-4 ${
                    activity.status === "Published" ? "bg-green-100 text-green-600" :
                    activity.status === "Pending Review" ? "bg-blue-100 text-blue-600" :
                    activity.status === "Updated" ? "bg-purple-100 text-purple-600" :
                    "bg-amber-100 text-amber-600"
                  }`}>
                    {activity.icon}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-800">
                      {activity.type}: {activity.recipe}
                      {activity.user && <span className="text-gray-500 ml-2">• by {activity.user}</span>}
                    </p>
                    <p className="text-sm text-gray-500">{activity.time}</p>
                  </div>
                  <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                    activity.status === "Published" ? "bg-green-100 text-green-800" :
                    activity.status === "Pending Review" ? "bg-blue-100 text-blue-800" :
                    activity.status === "Updated" ? "bg-purple-100 text-purple-800" :
                    "bg-amber-100 text-amber-800"
                  }`}>
                    {activity.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Charts and Top Recipes */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Engagement Overview */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800">Weekly Engagement</h2>
                <select className="text-sm border border-gray-200 rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-amber-100">
                  <option>Last 7 Days</option>
                  <option>Last 30 Days</option>
                  <option>Last Year</option>
                </select>
              </div>
              <div className="h-64">
                {/* Simple bar chart visualization */}
                <div className="h-full flex flex-col">
                  <div className="flex-1 flex items-end space-x-2">
                    {engagementData.map((day, index) => (
                      <div key={index} className="flex-1 flex flex-col items-center">
                        <div 
                          className="w-full bg-gradient-to-t from-amber-400 to-orange-600 rounded-t-sm hover:from-amber-500 hover:to-orange-700 transition-all duration-200"
                          style={{ height: `${(day.engagement / 25) * 100}%` }}
                        ></div>
                        <span className="text-xs text-gray-500 mt-1">{day.day}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between items-center mt-4 pt-2 border-t border-gray-100">
                    <div className="text-sm text-gray-500">
                      <span className="font-medium text-orange-600">18%</span> increase from last week
                    </div>
                    <div className="text-sm font-medium text-gray-700">
                      Total: <span className="text-orange-600">24,568</span> interactions
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Top Recipes */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800">Top Performing Recipes</h2>
                <button className="text-orange-600 hover:text-orange-800 text-sm font-medium">
                  View Report
                </button>
              </div>
              <div className="space-y-4">
                {topRecipes.map((recipe, index) => (
                  <div 
                    key={index} 
                    className="flex items-center p-3 hover:bg-amber-50 rounded-lg transition-all duration-200"
                  >
                    <div className="w-10 h-10 bg-amber-100 rounded-lg mr-4 flex items-center justify-center text-amber-600 font-medium">
                      {index + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-800 truncate">{recipe.name}</p>
                      <div className="flex text-xs text-gray-500 mt-1 space-x-3">
                        <span>{recipe.views.toLocaleString()} views</span>
                        <span>{recipe.saves.toLocaleString()} saves</span>
                        <span>{recipe.cookTime}</span>
                      </div>
                    </div>
                    <span className={`text-sm font-medium px-2 py-1 rounded-full ${
                      parseFloat(recipe.rating) > 4.8 ? "bg-green-100 text-green-800" :
                      parseFloat(recipe.rating) > 4.5 ? "bg-blue-100 text-blue-800" :
                      "bg-amber-100 text-amber-800"
                    }`}>
                      {recipe.rating}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <Toaster position="bottom-right" />
      </div>
    </div>
  );
}

export default AdminHomeside;