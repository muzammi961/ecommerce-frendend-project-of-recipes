import axios from "axios";
import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import AdminSidebar from '../../ad/sidebar';

function ViewallProductByCategory() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, []);

  const deletproduct = async (id) => {
    let token = localStorage.getItem('access');
    try {
      await axios.delete(`http://127.0.0.1:8000/adminside/DeleteaProduct/${id}/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success('Product deleted successfully!');
      setProducts((prevProducts) => prevProducts.filter((item) => item.id !== id));
    } catch (e) {
      toast.error('Something went wrong...');
    }
  };

  const fetchCategories = async () => {
    try {
      const token = localStorage.getItem("access");
      const response = await axios.get("http://127.0.0.1:8000/adminside/GetallCategory/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCategories(response.data);
    } catch (e) {
      console.error("Error fetching categories:", e);
      toast.error("Failed to load categories");
    }
  };

  const fetchProducts = async (categoryname) => {
    try {
      const token = localStorage.getItem("access");
      const response = await axios.get(
        `http://127.0.0.1:8000/adminside/ViewAllProductbyCategory/${categoryname}/`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setProducts(response.data);
    } catch (e) {
      console.error("Error fetching products:", e);
      toast.error("Failed to load products");
    }
  };

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    setSelectedCategory(value);
    if (value !== "") {
      fetchProducts(value);
    } else {
      setProducts([]);
    }
  };

  const updatefunc = (update_id) => {
    navigate(`/AdminUpdateProducts/${update_id}`);
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
            <h1 className="text-3xl font-bold text-white relative z-10">View Products by Category</h1>
            <p className="text-blue-100 mt-2 relative z-10">Browse and manage products by category</p>
          </div>

          {/* Category Select Section */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <div className="max-w-md mx-auto">
              <label htmlFor="category" className="block text-lg font-medium text-gray-700 mb-2">
                Select Category:
              </label>
              <select
                id="category"
                onChange={handleCategoryChange}
                value={selectedCategory}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 shadow-sm"
              >
                <option value="">Choose a Category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Products Display Section */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">
              {selectedCategory ? `Products in "${selectedCategory}"` : "Select a category to view products"}
            </h2>

            {products.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">
                  {selectedCategory ? "No products found in this category" : "Please select a category"}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.map((product) => (
                  <div key={product.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={`http://127.0.0.1:8000${product.item_photo}`} 
                        alt={product.productname}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2 right-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                        {selectedCategory}
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">{product.productname}</h3>
                      <div className="flex items-center mb-3">
                        <span className="text-gray-500 line-through mr-2">₹{product.price}</span>
                        <span className="text-green-600 font-bold">₹{product.offer_price}</span>
                      </div>
                      <div className="flex space-x-2">
                        <button 
                          onClick={() => updatefunc(product.id)}
                          className="flex-1 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          Edit
                        </button>
                        <button 
                          onClick={() => deletproduct(product.id)}
                          className="flex-1 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <Toaster position="bottom-right" />
      </div>
    </div>
  );
}

export default ViewallProductByCategory;