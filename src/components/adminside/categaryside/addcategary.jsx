import React, { useState, useEffect } from 'react';
import AdminSidebar from '../../ad/sidebar';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
const apiUrl = import.meta.env.VITE_API_URL;

function AddCategory() {
  const [newCategory, setNewCategory] = useState('');    
  const [categories, setCategories] = useState([]);    
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    getCurrentCategories();
  }, []);

  const getCurrentCategories = async () => {
    const token = localStorage.getItem('access');
    try {
      const response = await axios.get(`${apiUrl}/adminside/GetallCategory/`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCategories(response.data);
    } catch (error) {
      toast.error('Failed to load categories');
    }
  };

  const createCategory = async (e) => {
    e.preventDefault();
    
    if (!newCategory.trim()) {
      toast.error('Please enter a category name');
      return;
    }

    setIsSubmitting(true);
    const token = localStorage.getItem('access');
    
    try {
      const response = await axios.post(
        `${apiUrl}/adminside/CreateCategory/`,
        { name: newCategory },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Update local state with the new category
      setCategories(prev => [...prev, { 
        id: response.data.id || Date.now(), // Use response ID or fallback
        name: newCategory,
        icon: '📦' // Default icon
      }]);
      
      setNewCategory(''); // Clear input field
      toast.success('Category created successfully!');
      
      // Optional: Refresh the list from server to ensure consistency
      // getCurrentCategories();
      
    } catch (error) {
      toast.error('Failed to create category');
      console.error('Error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <AdminSidebar />
      
      <div className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl shadow-xl p-6 mb-8 relative overflow-hidden">
            <h1 className="text-3xl font-bold text-white relative z-10">Add New Category</h1>
            <p className="text-indigo-100 mt-2 relative z-10">Create a new product category</p>
          </div>

          {/* Form */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
            <form onSubmit={createCategory} className="p-6 space-y-6">
              {/* Category Name */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Category Name *</label>
                <input
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 shadow-sm"
                  placeholder="e.g. Electronics"
                  required
                />
              </div>

              {/* Existing Categories */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Existing Categories</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                  {categories.map((category) => (
                    <div    
                      key={category.id}
                      className="w-full p-2 flex flex-col items-center justify-center bg-white border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-200 transition-all duration-200 shadow-sm"
                    >
                      <span className="text-lg mb-1">{category.icon || '📦'}</span>
                      <span className="text-xs font-medium text-gray-700 truncate w-full text-center">
                        {category.name || 'Unnamed Category'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 ${
                    isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:from-blue-600 hover:to-indigo-700'
                  }`}
                >
                  {isSubmitting ? 'Creating...' : 'Create Category'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Toaster position='bottom-right'/>
    </div>
  );
}

export default AddCategory;