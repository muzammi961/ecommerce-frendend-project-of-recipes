import axios from 'axios';
import React, { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import AdminSidebar from '../../ad/sidebar';

const apiUrl = import.meta.env.VITE_API_URL;

export default function AddProduct() {
  const [form, setForm] = useState({
    productname: '',
    price: '',
    offer_price: '',
    item_photo: null,
    category_id: '',
  });

  const [categories, setCategories] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fileInputKey, setFileInputKey] = useState(Date.now());

  useEffect(() => {
    const fetchCategories = async () => {
      const token = localStorage.getItem('access');
      try {
        const response = await axios.get(`${apiUrl}/adminside/GetallCategory/`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCategories(response.data);
      } catch (error) {
        toast.error('Failed to load categories. Please try again.');
      }
    };

    fetchCategories();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm(prev => ({
        ...prev,
        item_photo: file
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate required fields
    if (!form.productname || !form.price || !form.category_id) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);

    const formData = new FormData();
    formData.append('productname', form.productname);
    formData.append('price', form.price);
    formData.append('offer_price', form.offer_price);
    formData.append('category_id', form.category_id);
    if (form.item_photo) {
      formData.append('item_photo', form.item_photo);
    }

    try {
      const token = localStorage.getItem('access');
      await axios.post(`${apiUrl}/adminside/CreateProduct/`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      toast.success('Product added successfully!');
      
      // Reset form
      setForm({
        productname: '',
        price: '',
        offer_price: '',
        item_photo: null,
        category_id: '',
      });
      
      // Reset file input by changing its key
      setFileInputKey(Date.now());
      
    } catch (error) {
      console.error('Error adding product:', error);
      toast.error(error.response?.data?.message || 'Failed to add product');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      
      <div className="flex-1 p-8 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8 border border-indigo-100">
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6 relative overflow-hidden">
              <h1 className="text-3xl font-bold text-white">Add New Product</h1>
              <p className="text-blue-100 mt-2">Fill out the form to add a new product to your store</p>
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-6 bg-white">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Product Name */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Product Name *
                  </label>
                  <input
                    type="text"
                    name="productname"
                    value={form.productname}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 shadow-sm"
                    placeholder="Enter product name"
                    required
                  />
                </div>

                {/* Category */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Category *
                  </label>
                  <select
                    name="category_id"
                    value={form.category_id}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 shadow-sm"
                    required
                  >
                    <option value="">Select a category</option>
                    {categories.map(category => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Price */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Price ($) *
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={form.price}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 shadow-sm"
                    placeholder="0.00"
                    step="0.01"
                    min="0"
                    required
                  />
                </div>

                {/* Offer Price */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Offer Price ($)
                  </label>
                  <input
                    type="number"
                    name="offer_price"
                    value={form.offer_price}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 shadow-sm"
                    placeholder="0.00"
                    step="0.01"
                    min="0"
                  />
                </div>
              </div>

              {/* Image Upload */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Product Image
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
                  <div className="space-y-1 text-center">
                    <svg
                      className="mx-auto h-12 w-12 text-gray-400"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                      aria-hidden="true"
                    >
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <div className="flex text-sm text-gray-600">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                      >
                        <span>Upload a file</span>
                        <input
                          id="file-upload"
                          key={fileInputKey}
                          name="item_photo"
                          type="file"
                          className="sr-only"
                          onChange={handleFileChange}
                          accept="image/*"
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">
                      PNG, JPG, GIF up to 10MB
                    </p>
                    {form.item_photo && (
                      <p className="text-sm text-green-600 mt-2">
                        {form.item_photo.name} selected
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-lg shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 ${
                    isSubmitting
                      ? 'opacity-70 cursor-not-allowed'
                      : 'hover:from-blue-600 hover:to-indigo-700 hover:shadow-lg hover:-translate-y-0.5'
                  }`}
                >
                  {isSubmitting ? 'Adding Product...' : 'Add Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
        <Toaster position="bottom-right" />
      </div>
    </div>
  );
}