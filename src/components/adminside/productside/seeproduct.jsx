import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast,{ Toaster } from 'react-hot-toast';
import AdminSidebar from '../../ad/sidebar';

function Seeproducts() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const token = localStorage.getItem('access');

  useEffect(() => {
    getProductsData();
  }, []);

  const getProductsData = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/adminside/GetallProducts/', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(response.data);
    } catch (error) {
      console.error('Failed to fetch products:', error);
    }
  };

  const updateProduct = (productId) => {
    navigate(`/AdminUpdateProducts/${productId}`);
  };

  const deleteProduct = async (productId) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/adminside/DeleteaProduct/${productId}/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success('Product deleted successfully!');
      setProducts(prevProducts => prevProducts.filter(item => item.id !== productId));
    } catch (error) {
      toast.error('Failed to delete product');
      console.error('Error deleting product:', error);
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <AdminSidebar />
      
      <div className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          {/* Shining Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl shadow-xl p-6 mb-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full transform translate-x-16 -translate-y-16"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-white opacity-10 rounded-full transform -translate-x-16 translate-y-16"></div>
            <h1 className="text-3xl font-bold text-white relative z-10">All Products</h1>
            <p className="text-indigo-100 mt-2 relative z-10">Manage your product inventory</p>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <div 
                key={product.id} 
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-blue-200"
              >
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={`http://127.0.0.1:8000${product.item_photo}`} 
                    alt={product.productname}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                    <h3 className="text-lg font-semibold text-white">{product.productname}</h3>
                  </div>
                </div>
                
                <div className="p-4">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-gray-500 line-through">₹{product.price}</span>
                    <span className="text-green-600 font-bold">₹{product.offer_price}</span>
                  </div>
                  
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => updateProduct(product.id)}
                      className="flex-1 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => deleteProduct(product.id)}
                      className="flex-1 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {products.length === 0 && (
            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <div className="text-gray-400 mb-4 text-6xl">📦</div>
              <h3 className="text-xl font-medium text-gray-600">No products found</h3>
              <p className="text-gray-500 mt-2">Add your first product to get started</p>
            </div>
          )}
        </div>
        <Toaster position="bottom-right" />
      </div>
    </div>
  );
}

export default Seeproducts;