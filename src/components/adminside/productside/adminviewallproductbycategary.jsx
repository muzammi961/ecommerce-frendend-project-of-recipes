import axios from "axios";
import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function ViewallProductByCategory() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
let navigation=useNavigate()
  useEffect(() => {
    fetchCategories();
    fetchProducts()
  }, []);

let deletproduct=async(id)=>{
  let token=localStorage.getItem('access')
  console.log(id)
  try{
  await axios.delete(`http://127.0.0.1:8000/adminside/DeleteaProduct/${id}/`,{
   headers: {Authorization: `Bearer ${token}`,},})
   toast.success('delete successfully....')
   setProducts((prevProducts) => prevProducts.filter((item) => item.id !== id));
  }catch(e){
    toast.error('somthing went error....',e)
  }
};


  const fetchCategories = async () => {
    try {
      const token = localStorage.getItem("access");
      const categories= await axios.get("http://127.0.0.1:8000/adminside/GetallCategory/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCategories(categories.data);
    } catch (e) {
      console.error("Error fetching categories:", e);
    }
  };

  const fetchProducts = async (categoryname) => {
    try {
      const token = localStorage.getItem("access");
      const products = await axios.get(
        `http://127.0.0.1:8000/adminside/ViewAllProductbyCategory/${categoryname}/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setProducts(products.data);
      console.log(products.data)
    } catch (e) {
      console.error("Error fetching products:", e);
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

let updatefunc=(update_id)=>{
  console.log('id is ',update_id)
  navigation(`/AdminUpdateProducts/${update_id}`)
}


  return (
    <div className="p-6 bg-amber-300 min-h-screen">
      <h1 className="text-3xl font-bold text-amber-50 text-center  mb-8">View Products by Category</h1>

      {/* Category Select Section */}
      <div className="max-w-md mx-auto mb-10">
        <label htmlFor="category" className="block text-lg font-medium text- mb-2">
          Select Category:
        </label>
        <select
          id="category"
          onChange={handleCategoryChange}
          className="w-full px-4 py-2 border-none rounded shadow focus:outline-none focus:ring-2 "
        >
          <option className="bg-black" value="">Choose a Category</option>
          {categories.map((category) => (
            <option className="bg-black text-amber-50" key={category.id} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      {/* Category Products Display Section */}
      <div className="mb-10">
        <h2 className="text-2xl  text-black mb-4  border-blue-400 ">
          {selectedCategory ? `Products in "${selectedCategory}"` : "No Category Selected"}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.length === 0 ? (
            <p className="col-span-full text-gray-600">No products found.</p>
          ) : (
            products.map((product) => (
              <div key={product.id} className="bg-white shadow-lg rounded-lg p-4">
                <img src={`http://127.0.0.1:8000${product.item_photo}`} alt={product.productname}className="w-full h-40 object-cover rounded-md mb-3"/>
                <h3 className="text-lg font-semibold mb-1">{product.productname}</h3>
                <p className="text-gray-600">
                  Price:
                  <span className="line-through mx-2">₹{product.price}</span>
                  <span className="text-green-600 font-bold">₹{product.offer_price}</span>
                </p>
                <div className="flex justify-between gap-3">
                   <button className=" w-full mt-3 px-4 py-2 bg-black text-amber-50 hover:bg-amber-300" onClick={(e)=>deletproduct(product.id)}>delete</button>
                <button onClick={()=>updatefunc(product.id)} className="mt-3 w-full bg-black text-white px-4 py-2 rounded hover:bg-amber-500 transition">
                  Edit Product
                </button>
                 
                </div>
               
              </div>
            ))
          )}
        </div>
      </div>
      <Toaster position="bottom-right"/>
    </div>
  );
}

export default ViewallProductByCategory;
