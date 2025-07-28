import React, { useState } from 'react';
import axios from 'axios';
import toast,{Toaster} from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function AdminHomeside() {
  const [showCategory, setShowCategory] = useState(false);
  const [showOrders, setShowOrders] = useState(false);
  const categories = ['AdminViewallCategary', 'Apparel', 'Books'];
  const products = ['addproduct', 'seeproduct', 'ViewallUser','viewallproductbycategory'];
let navigation=useNavigate()




  const handleCategoryClick = async(category) => {
    if (category === 'AdminViewallCategary') {
     navigation('/AdminViewallCategary')
    }
  };
  const handleProdectClick=(product)=>{
    console.log('product clicked',product)
    if(product==='addproduct'){
      navigation('/AdminsideAddProduct')
      toast.success('addproduct side')
    }else if(product==='seeproduct'){
      navigation('/AdminsideSeeproducts')
    }else if(product==='ViewallUser'){
      navigation('/AdminsideViewallUser')
    }else if(product==='viewallproductbycategory'){
      navigation('/ViewallProudctByCategary')
    }
  }

  return (
    <div className="flex h-screen bg-gray-50 font-sans">
  {/* Sidebar - Enhanced with glass morphism */}
  <aside className="w-64 bg-gradient-to-b from-gray-800 to-gray-900 text-white flex flex-col fixed h-full shadow-xl z-10">
    {/* Logo Section */}
    <div className="flex items-center justify-center p-6 bg-gradient-to-r from-blue-600 to-blue-500">
      <h2 className="text-xl font-bold tracking-wider">Admin Panel</h2>
    </div>

    {/* Navigation - Enhanced with icons and animations */}
    <nav className="flex flex-col space-y-1 p-4 mt-4">
      <button 
        onClick={() => {setShowCategory(!showCategory);setShowOrders(false);}}
        className="flex items-center py-3 px-4 rounded-lg hover:bg-blue-600/30 transition-all duration-300 group"
      >
        <svg className="w-5 h-5 mr-3 text-blue-300 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
        </svg>
        <span className="font-medium">Category</span>
      </button>
      
      {showCategory && (
        <ul className="ml-12 mt-1 space-y-2 text-sm">
          {categories.map((category, index) => (
            <li 
              key={index} 
              onClick={() => handleCategoryClick(category)}
              className="flex items-center py-2 px-3 rounded-lg hover:bg-blue-500/20 cursor-pointer transition-all duration-200"
            >
              <span className="w-2 h-2 rounded-full bg-amber-400 mr-3"></span>
              {category}
            </li>
          ))}
        </ul>
      )}

      <button 
        onClick={() => {setShowOrders(!showOrders);setShowCategory(false);}}
        className="flex items-center py-3 px-4 rounded-lg hover:bg-blue-600/30 transition-all duration-300 group mt-2"
      >
        <svg className="w-5 h-5 mr-3 text-blue-300 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
        </svg>
        <span className="font-medium">Product</span>
      </button>
      
      {showOrders && (
        <ul className="ml-12 mt-1 space-y-2 text-sm">
          {products.map((product, idx) => (
            <li 
              key={idx} 
              onClick={() => handleProdectClick(product)}
              className="flex items-center py-2 px-3 rounded-lg hover:bg-blue-500/20 cursor-pointer transition-all duration-200 border-l-2 border-blue-400/50"
            >
              <span className="w-2 h-2 rounded-full bg-green-400 mr-3"></span>
              {product}
            </li>
          ))}
        </ul>
      )}
    </nav>

    {/* Profile Section - Enhanced */}
    <div className="mt-auto p-6">
      <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-full h-12 w-12 mx-auto flex items-center justify-center font-bold text-white shadow-lg">
        <span className="text-sm">AD</span>
      </div>
      <div className="text-center mt-3">
        <p className="font-medium">Admin User</p>
        <p className="text-xs text-gray-400 mt-1">Super Admin</p>
      </div>
    </div>
  </aside>

  {/* Main Section - Modern Dashboard */}
  <div className="ml-64 flex-1 flex flex-col overflow-hidden">
    {/* Header - Enhanced with search and notifications */}
    <header className="bg-white shadow-sm p-4 flex justify-between items-center sticky top-0 z-10">
      <h1 className="text-2xl font-bold text-gray-800">Dashboard Overview</h1>
      <div className="flex items-center space-x-4">
        <div className="relative">
          <input
            type="search"
            placeholder="Search…"
            className="pl-10 pr-4 py-2 rounded-full border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-64 transition-all duration-300"
          />
          <svg className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
        </div>
        <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 relative">
          <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
          </svg>
          <span className="absolute top-0 right-0 h-3 w-3 rounded-full bg-red-500"></span>
        </button>
      </div>
    </header>

    {/* Main Content - Enhanced Dashboard Cards */}
    <main className="flex-1 overflow-y-auto p-6 bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { title: "Total Products", value: "1,248", change: "+12%", icon: "📦", color: "bg-blue-100 text-blue-600" },
          { title: "Categories", value: "24", change: "+3", icon: "🏷️", color: "bg-green-100 text-green-600" },
          { title: "Active Orders", value: "56", change: "+8", icon: "🛒", color: "bg-amber-100 text-amber-600" },
          { title: "Revenue", value: "$8,420", change: "+24%", icon: "💰", color: "bg-purple-100 text-purple-600" }
        ].map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow duration-300">
            <div className="flex justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                <p className="text-2xl font-bold mt-1">{stat.value}</p>
                <p className="text-xs mt-1 text-green-500 font-medium">{stat.change}</p>
              </div>
              <div className={`h-12 w-12 rounded-full ${stat.color} flex items-center justify-center text-xl`}>
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-gray-800">Recent Activity</h2>
          <button className="text-sm text-blue-600 hover:text-blue-800">View All</button>
        </div>
        <div className="space-y-4">
          {[
            { action: "Added new product", time: "2 mins ago", user: "You" },
            { action: "Updated category", time: "15 mins ago", user: "John D." },
            { action: "Deleted product", time: "1 hour ago", user: "Sarah M." },
            { action: "Processed order", time: "3 hours ago", user: "You" }
          ].map((activity, index) => (
            <div key={index} className="flex items-start pb-4 border-b border-gray-100 last:border-0">
              <div className="bg-blue-100 rounded-full h-8 w-8 flex items-center justify-center mr-3 mt-1">
                <span className="text-blue-600 text-sm">{(activity.user === "You") ? "AD" : activity.user.charAt(0)}</span>
              </div>
              <div className="flex-1">
                <p className="font-medium">{activity.action}</p>
                <p className="text-sm text-gray-500">{activity.time} • by {activity.user}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl shadow-md p-6 text-white">
          <h3 className="font-bold text-lg mb-3">Add New Product</h3>
          <p className="text-blue-100 mb-4">Quickly add a new product to your inventory</p>
          <button className="bg-white text-blue-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-50 transition">
            Create Product
          </button>
        </div>
        
        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl shadow-md p-6 text-white">
          <h3 className="font-bold text-lg mb-3">Manage Categories</h3>
          <p className="text-green-100 mb-4">Organize your product categories</p>
          <button className="bg-white text-green-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-50 transition">
            View Categories
          </button>
        </div>
        
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl shadow-md p-6 text-white">
          <h3 className="font-bold text-lg mb-3">View Reports</h3>
          <p className="text-purple-100 mb-4">Analyze your store performance</p>
          <button className="bg-white text-purple-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-50 transition">
            Generate Report
          </button>
        </div>
      </div>
    </main>
  </div>
  
  <Toaster position='bottom-right'/>
</div>
  );
}

export default AdminHomeside;