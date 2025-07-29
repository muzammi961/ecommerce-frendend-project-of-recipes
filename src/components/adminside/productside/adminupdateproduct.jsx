import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AdminSidebar from "../../ad/sidebar";
import { Toaster } from "react-hot-toast";

function UpdateProducts() {
  const [categories, setCategories] = useState([]);
  const { update_id } = useParams();
  const [productdatas, setUpdateProduct] = useState({
    productname: '',
    price: '',
    offer_price: '',
    item_photo: null,
    category_id: '',
  });

  useEffect(() => {
    fetchProduct();
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const token = localStorage.getItem("access");
      const res = await axios.get("http://127.0.0.1:8000/adminside/GetallCategory/", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCategories(res.data);
    } catch (e) {
      console.error("Error fetching categories:", e);
    }
  };

  const fetchProduct = async () => {
    try {
      const token = localStorage.getItem("access");
      const res = await axios.get(`http://127.0.0.1:8000/adminside/GetSpecificProduct/${update_id}/`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUpdateProduct({
        productname: res.data.productname,
        price: res.data.price,
        offer_price: res.data.offer_price,
        category_id: res.data.category_id,
        item_photo: null,
      });
    } catch (e) {
      console.log("Product data does not exist.");
    }
  };

  const updateProduct = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("access");
    const formData = new FormData();

    formData.append("productname", productdatas.productname);
    formData.append("price", productdatas.price);
    formData.append("offer_price", productdatas.offer_price);
    formData.append("category_id", productdatas.category_id);

    if (productdatas.item_photo) {
      formData.append("item_photo", productdatas.item_photo);
    }

    try {
      await axios.put(
        `http://127.0.0.1:8000/adminside/UpdateProductView/${update_id}/`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert("Product updated successfully!");
    } catch (e) {
      console.log("Error updating product:", e.response?.data || e);
    }
  };

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      
      <div className="flex-1 p-8 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="max-w-4xl mx-auto">
          {/* Shining Header Card */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8 border border-indigo-100">
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full transform translate-x-16 -translate-y-16"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-white opacity-10 rounded-full transform -translate-x-16 translate-y-16"></div>
              <h1 className="text-3xl font-bold text-white relative z-10">Update Product</h1>
              <p className="text-blue-100 mt-2 relative z-10">Edit the product details below</p>
            </div>

            {/* Shining Form */}
            <form onSubmit={updateProduct} className="p-8 space-y-6 bg-white">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Product Name */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Product Name</label>
                  <input
                    type="text"
                    value={productdatas.productname}
                    onChange={(e) => setUpdateProduct({...productdatas, productname: e.target.value})}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 shadow-sm"
                    placeholder="Enter product name"
                  />
                </div>

                {/* Category */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Category</label>
                  <select
                    value={productdatas.category_id}
                    onChange={(e) => setUpdateProduct({...productdatas, category_id: e.target.value})}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 shadow-sm"
                  >
                    <option value="">Select a category</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                </div>

                {/* Price */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Price ($)</label>
                  <input
                    type="number"
                    value={productdatas.price}
                    onChange={(e) => setUpdateProduct({...productdatas, price: e.target.value})}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 shadow-sm"
                    placeholder="0.00"
                    step="0.01"
                  />
                </div>

                {/* Offer Price */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Offer Price ($)</label>
                  <input
                    type="number"
                    value={productdatas.offer_price}
                    onChange={(e) => setUpdateProduct({...productdatas, offer_price: e.target.value})}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 shadow-sm"
                    placeholder="0.00"
                    step="0.01"
                  />
                </div>
              </div>

              {/* Image Upload */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Product Image</label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-blue-400 transition-colors">
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
                    <div className="flex text-sm text-gray-600 justify-center">
                      <label className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                        <span>Upload a file</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => setUpdateProduct({...productdatas, item_photo: e.target.files[0]})}
                          className="sr-only"
                        />
                      </label>
                    </div>
                    <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                  </div>
                </div>
              </div>

              {/* Shining Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                >
                  Update Product
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

export default UpdateProducts;