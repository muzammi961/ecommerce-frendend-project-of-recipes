import axios from 'axios';
import React, { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';

export default function AddProduct() {
  const [form, setForm] = useState({productname: '',price: '',offer_price: '',item_photo: null,category_id: '',});

  const [allcategary, setCategory] = useState([]);

  useEffect(() => {
    getallcategory();
  }, []);

  const getallcategory = async () => {
    let token = localStorage.getItem('access');
    try {
      let caturl = await axios.get('http://127.0.0.1:8000/adminside/GetallCategory/', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCategory(caturl.data);
    } catch (e) {
      toast.error('Something went wrong... Try again!');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('access');
    const formData = new FormData();
    formData.append('productname', form.productname);
    formData.append('price', form.price);
    formData.append('offer_price', form.offer_price);
    formData.append('item_photo', form.item_photo);
    formData.append('category_id', form.category_id);
    console.log(formData.productname)


    for (let pair of formData.entries()) {
    console.log(pair[0] + ':', pair[1]);
    }

    try {
    
      const res = await axios.post('http://127.0.0.1:8000/adminside/CreateProduct/', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success('Product added successfully!');
      console.log(res.data);
     } catch (error) {
      toast.error('Failed to add product.');
      console.error(error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-xl rounded-lg overflow-hidden">
      <div className="bg-gradient-to-r from-indigo-600 to-blue-500 p-6">
        <h2 className="text-2xl font-semibold text-white">Add New Product</h2>
      </div>

      <form className="p-6 space-y-6" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-gray-700">Product Name</label>
            <input
              type="text"
              name="productname"
              value={form.productname}
              onChange={(e) => setForm({ ...form, productname: e.target.value })}
              required
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-400 focus:border-indigo-400 transition"
              placeholder="e.g. Wireless Headphones"
            />
          </div>
          <div>
            <label className="block text-gray-700">Category</label>
            <select
              name="category_id"
              value={form.category_id}
              onChange={(e) => setForm({ ...form, category_id: e.target.value })}
              required
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-400 focus:border-indigo-400 transition"
            >
              <option value="">Select category</option>
              {allcategary.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-5">
          <div>
            <label className="block text-gray-700">Price</label>
            <input
              type="number"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              required
              step="0.01"
              min="0"
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-400 focus:border-indigo-400 transition"
              placeholder="0.00"
            />
          </div>
          <div>
            <label className="block text-gray-700">Offer Price</label>
            <input
              type="number"
              name="offer_price"
              value={form.offer_price}
              onChange={(e) => setForm({ ...form, offer_price: e.target.value })}
              required
              min="0"
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-400 focus:border-indigo-400 transition"
              placeholder="0"
            />
          </div>
        </div>

        <div>
          <label className="block text-gray-700 mb-1">Product Image</label>
          <input
            required
            type="file"
            name="item_photo"
            accept="image/*"
            onChange={(e) => setForm({ ...form, item_photo: e.target.files[0] })}
            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-400 focus:border-indigo-400 transition"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow hover:bg-indigo-700 transition"
        >
          Add Product
        </button>
      </form>
      <Toaster position="bottom-right" />
    </div>
  );
}
