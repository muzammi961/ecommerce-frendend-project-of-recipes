import React, { useState } from 'react';

export default function AddProduct({ onSubmit }) {
  const [form, setForm] = useState({
    name: '',
    category: '',
    price: '',
    stock: '',
    description: ''
  });
  const categories = ['Electronics', 'Apparel', 'Books'];

  const handleChange = e =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-xl rounded-lg overflow-hidden">
      <div className="bg-gradient-to-r from-indigo-600 to-blue-500 p-6">
        <h2 className="text-2xl font-semibold text-white">Add New Product</h2>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-gray-700">Product Name</label>
            <input type="text" name="name" value={form.name} onChange={handleChange} required className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-400 focus:border-indigo-400 transition"placeholder="e.g. Wireless Headphones"/>
          </div>
          <div>
            <label className="block text-gray-700">Category</label>
            <select name="category" value={form.category} onChange={handleChange} required className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-400 focus:border-indigo-400 transition">
              <option value="">Select category</option>
              {categories.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}</select>


          </div>
        </div>

        
        <div className="grid grid-cols-2 gap-5">
          <div>
            <label className="block text-gray-700">Price</label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">$</span>
              <input type="number" name="price" value={form.price}  onChange={handleChange} required step="0.01" min="0" className="pl-7 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-400 focus:border-indigo-400 transition"  placeholder="0.00"/>
            </div>


          </div>

          <div>
            <label className="block text-gray-700">Stock Quantity</label>
            <input type="number" name="stock"  value={form.stock} onChange={handleChange} required min="0" className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-400 focus:border-indigo-400 transition" placeholder="0"/>
          </div>
        </div>


        <div>
          <label className="block text-gray-700 mb-1">Description</label>
          <textarea name="description" rows="4"value={form.description} onChange={handleChange}className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-400 focus:border-indigo-400 transition" placeholder="Short description of the product"/>
        </div>
        <button type="submit" className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow hover:bg-indigo-700 transition">Add Product</button>
      </form>
    </div>
  );
}
