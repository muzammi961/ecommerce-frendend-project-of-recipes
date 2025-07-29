import React from 'react';
import { Toaster } from 'react-hot-toast';
import AdminSidebar from '../ad/sidebar';

function AdminHomeside() {
  const stats = [
    { title: "Total Sales", value: "$12,345", change: "+12%", icon: "🛒", color: "from-purple-500 to-indigo-500" },
    { title: "Revenue", value: "$8,642", change: "+8%", icon: "💰", color: "from-green-500 to-teal-500" },
    { title: "Active Users", value: "1,234", change: "+5%", icon: "👥", color: "from-blue-500 to-cyan-500" },
    { title: "Growth", value: "32%", change: "+2%", icon: "📈", color: "from-amber-500 to-orange-500" }
  ];

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <AdminSidebar />
      
      <div className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          {/* Shining Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl shadow-xl p-6 mb-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full transform translate-x-16 -translate-y-16"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-white opacity-10 rounded-full transform -translate-x-16 translate-y-16"></div>
            <h1 className="text-3xl font-bold text-white relative z-10">Dashboard Overview</h1>
            <p className="text-indigo-100 mt-2 relative z-10">Your store performance at a glance</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className={`bg-gradient-to-r ${stat.color} rounded-xl shadow-lg p-6 text-white transform hover:scale-[1.02] transition-all duration-300 hover:shadow-xl`}
              >
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-white bg-opacity-20 mr-4 text-xl backdrop-blur-sm">
                    {stat.icon}
                  </div>
                  <div>
                    <p className="text-sm text-white text-opacity-80">{stat.title}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-sm mt-1 text-white text-opacity-90">{stat.change}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-100">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-800">Recent Activity</h2>
              <button className="text-indigo-600 hover:text-indigo-800 font-medium flex items-center">
                View All <span className="ml-1">→</span>
              </button>
            </div>
            <div className="space-y-4">
              {[1, 2, 3, 4].map((item) => (
                <div 
                  key={item} 
                  className="flex items-center p-4 hover:bg-indigo-50 rounded-lg transition-all duration-200 border border-gray-100 hover:border-indigo-200"
                >
                  <div className="bg-indigo-100 p-3 rounded-full mr-4 text-indigo-600">
                    📦
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-800">New order #{1000 + item}</p>
                    <p className="text-sm text-gray-500">2 hours ago</p>
                  </div>
                  <span className="bg-green-100 text-green-800 text-xs px-3 py-1 rounded-full font-medium">Completed</span>
                </div>
              ))}
            </div>
          </div>

          {/* Charts and Top Products */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Sales Overview */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800">Sales Overview</h2>
                <select className="text-sm border border-gray-200 rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-indigo-100">
                  <option>Last 7 Days</option>
                  <option>Last 30 Days</option>
                  <option>Last Year</option>
                </select>
              </div>
              <div className="h-64 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <div className="text-4xl text-indigo-200 mb-2">📊</div>
                  <p className="text-gray-400">Sales chart visualization</p>
                </div>
              </div>
            </div>

            {/* Top Products */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Top Products</h2>
              <div className="space-y-4">
                {['Wireless Earbuds', 'Smart Watch', 'Yoga Mat', 'Blender'].map((product, index) => (
                  <div 
                    key={index} 
                    className="flex items-center p-3 hover:bg-indigo-50 rounded-lg transition-all duration-200"
                  >
                    <div className="w-10 h-10 bg-indigo-100 rounded-lg mr-4 flex items-center justify-center text-indigo-600 font-medium">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-800">{product}</p>
                      <p className="text-sm text-gray-500">{(index + 1) * 15} sold today</p>
                    </div>
                    <span className="text-green-500 font-medium bg-green-50 px-2 py-1 rounded-full text-sm">
                      +{(index + 1) * 5}%
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