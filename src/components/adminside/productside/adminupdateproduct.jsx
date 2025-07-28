import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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

  // Always include the photo (even if not changed, send existing one from backend)
  if (productdatas.item_photo) {
    formData.append("item_photo", productdatas.item_photo);
  } else {
    // Optional: if backend expects an image always, you may need to re-fetch it or notify backend
    // Some backends break if file field is missing in PUT
  }

  try {
    await axios.put(
      `http://127.0.0.1:8000/adminside/UpdateProductView/${update_id}/`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data", // Required for FormData + PUT
        },
      }
    );
    alert("Product updated successfully!");
  } catch (e) {
    console.log("Error updating product:", e.response?.data || e);
  }
};


  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-lg p-8">
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">Update Product</h2>
        <form onSubmit={updateProduct} className="space-y-6">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Product Name</label>
            <input
              type="text"
              value={productdatas.productname}
              onChange={(e) => setUpdateProduct({ ...productdatas, productname: e.target.value })}
              required
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Category</label>
            <select
              value={productdatas.category_id}
              onChange={(e) => setUpdateProduct({ ...productdatas, category_id: e.target.value })}
              required
              className="w-full px-4 py-2 border rounded-lg"
            >
              <option value="">Select a category</option>
              {categories.map((cat) => (
                <option required key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Price</label>
            <input
              type="number"
              value={productdatas.price}
              onChange={(e) => setUpdateProduct({ ...productdatas, price: e.target.value })}
              required
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Offer Price</label>
            <input
            required
              type="number"
              value={productdatas.offer_price}
              onChange={(e) => setUpdateProduct({ ...productdatas, offer_price: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Product Image</label>
            <input
            required
              type="file"
              accept="image/*"
              onChange={(e) => setUpdateProduct({ ...productdatas, item_photo: e.target.files[0] })}
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-all"
          >
            Update Product
          </button>
        </form>
      </div>
    </div>
  );
}

export default UpdateProducts;
