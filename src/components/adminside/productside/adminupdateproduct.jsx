import axios from "axios";
import { useEffect,useState } from "react";
import { useParams } from "react-router-dom";

function UpdateProducts(){
const [categories, setCategories] = useState([]);    
let {update_id}=useParams()
let [productview,setProductview]=useState({})
let [productdatas,setUpdateProduct]=useState({prname:'',prprice:'',profferprice:'',primage:''})

useEffect(()=>{
specficproduct()
fetchCategories()
},[]);


const fetchCategories = async () => {
    try {
      const token = localStorage.getItem("access");
      const categories= await axios.get("http://127.0.0.1:8000/adminside/GetallCategory/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(categories.data)
      setCategories(categories.data);
    } catch (e) {
      console.error("Error fetching categories:", e);
    }
  };


let specficproduct=async()=>{
    try{  
    const token=localStorage.getItem("access")
     let sp_product = await axios.get(`http://127.0.0.1:8000/adminside/GetSpecificProduct/${update_id}/`, {
        headers:{
            Authorization:`Bearer ${token}`,
        }
     });   
     console.log('products ',sp_product.data)
     setProductview(sp_product.data)
    }catch(e){
        console.log('data does not exixted ....')
    }
};


let updateproductsfunc=async()=>{
    let token=localStorage.getItem('access')
    try{
      let product=await axios.put(`http://127.0.0.1:8000/adminside/UpdateProductView/${update_id}/`,{productdatas},{
          headers:{
            Authorization:`Bearer ${token}`,
        },
    })
   }catch(e){
    console.log('the data does not existed ....')
   }
}

console.log('new data .....',productdatas.prname)
// console.log('datass ...',productview.productname)

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    setSelectedCategory(value);
    if (value !== "") {
      fetchProducts(value);
    } else {
      setProducts([]);
    }
  };


console.log('update id ..',update_id)
    return(
   <div className="min-h-screen bg-black from-gray-50 to-gray-200 p-6">
    <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-lg p-8 transition-all duration-300 hover:shadow-2xl">
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-600 animate-pulse">Update Product</h2>
      <form className="space-y-6 animate-fade-in-up">
     
        <div className="transition-all duration-300 hover:scale-[1.01]">
          <label className="block text-gray-700 font-semibold mb-2"> Product Name </label>
          <input type="text"   placeholder={productview.productname} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"/>
        </div>

        <div className="transition-all duration-300 hover:scale-[1.01]">
          <label className="block text-gray-700 font-semibold mb-2">Category</label>
          <select onChange={handleCategoryChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all">
            <option value="">Select a category</option>
           {categories.map((category)=>(<option className="bg-black text-amber-50" key={category.id} value={category.name}>{category.name}</option>))}
          </select>
        </div>

        <div className="transition-all duration-300 hover:scale-[1.01]">
          <label className="block text-gray-700 font-semibold mb-2">Price</label>
          <div className="relative">
            <span className="absolute left-3 top-2 text-gray-500">₹</span>
            <input type="number" className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"placeholder={productview.price} />
          </div>
        </div>
        <div className="transition-all duration-300 hover:scale-[1.01]">
          <label className="block text-gray-700 font-semibold mb-2">Offer Price</label>
          <input type="number" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" placeholder={productview.offer_price}/>
        </div>

        <div className="transition-all duration-300 hover:scale-[1.01]">
          <label className="block text-gray-700 font-semibold mb-2">Product Image </label>
          <div className="flex items-center justify-center w-full">
            <label className="flex flex-col w-full border-2 border-dashed border-blue-300 hover:border-blue-500 rounded-lg cursor-pointer transition-all duration-300 hover:bg-blue-50">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg
                  className="w-8 h-8 mb-4 text-blue-500"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16 16v6M8 16v6m8-6H8m8-4a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
                <p className="mb-2 text-sm text-gray-500">
                  <span className="font-semibold">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-gray-500">
                  PNG, JPG, GIF (MAX. 800x400px)
                </p>
              </div>
              <input type="file" className="hidden" />
            </label>
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button type="submit" className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-0.5">Update Product</button>
        </div>
      </form>
    </div>
</div>

    )
}

export default UpdateProducts;