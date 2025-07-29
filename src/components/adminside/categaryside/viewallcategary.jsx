import { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import AdminSidebar from '../../ad/sidebar'; // Adjust the import path as needed

function ViewallCategary() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchAllCategaryFunc();
  }, []);

  const fetchAllCategaryFunc = async () => {
    try {
      let token = localStorage.getItem('access');    
      let fetchcategories = await axios.get('http://127.0.0.1:8000/adminside/GetallCategory/', {
        headers: {
          Authorization: `Bearer ${token}`
        },
      });
      setCategories(fetchcategories.data);
    } catch (e) {
      toast.error('Failed to fetch categories');
      console.error('Error fetching categories:', e);
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <AdminSidebar />
      
      <div className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          {/* Shining Header */}
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl shadow-xl p-6 mb-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full transform translate-x-16 -translate-y-16"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-white opacity-10 rounded-full transform -translate-x-16 translate-y-16"></div>
            <h1 className="text-3xl font-bold text-white relative z-10">📂 All Categories</h1>
            <p className="text-blue-100 mt-2 relative z-10">Manage your product categories</p>
          </div>

          {/* Categories Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {categories.map((cat, index) => (
              <div 
                key={index} 
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-blue-200"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-100 to-indigo-100 flex items-center justify-center mr-4">
                    <span className="text-xl">📁</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800">{cat.name}</h3>
                </div>
                
                <p className="text-gray-600 mb-6">{cat.description || "No description available"}</p>
                
                <div className="flex justify-end space-x-2">
                  <button 
                    className="px-4 py-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
                    onClick={() => {/* Edit functionality */}}
                  >
                    Edit
                  </button>
                  <button 
                    className="px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                    onClick={() => {/* Delete functionality */}}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          {categories.length === 0 && (
            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <div className="text-gray-400 mb-4 text-6xl">📂</div>
              <h3 className="text-xl font-medium text-gray-600">No categories found</h3>
              <p className="text-gray-500 mt-2">Create your first category to get started</p>
            </div>
          )}
        </div>
        <Toaster position="bottom-right" />
      </div>
    </div>
  );
}

export default ViewallCategary;