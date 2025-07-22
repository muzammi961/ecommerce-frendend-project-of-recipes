import { useEffect, useState,useContext } from "react";
import axios from "axios";
import MyContext from './createcontext'
import bgimage from '../../assets/backgroundImage.jpg'
import { useNavigate } from "react-router-dom";
function ProductData() {
let navigation=useNavigate()


  const [products, setProducts] = useState([]);
  let [serched,setSerch]=useState('')
  let [nameofcetagary,setProductCetagary]=useState('')
  let [quality,setQuality]=useState('')

  const token = localStorage.getItem("access");
  console.log(token)
  useEffect(() => {
    fetchData('main dish');
  }, []);

const fetchData = async (cetagary) => {
      setProductCetagary(cetagary)
      try {
        let response = await axios.get(`http://127.0.0.1:8000/products/ViewProductsByCategory/${cetagary}/`,{
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log('datass.',response)
        setProducts(response.data);
      } catch (error) {
        console.log("error fetching data", error);
      }
    };  

// console.log('this is products ...',products)
// let {setValue}=useContext(MyContext)


const CartSection=() => {
   navigation('/cartsection')
  };
const Wishlistsection=()=>{
  navigation('/wishlistsection')
}  
let filterdata=products.filter((index)=>{
  return index.productname.toLowerCase().includes(serched.toLowerCase())
});

let addtocart=async(productid)=>{
try{
  let postvalue={
    product:productid,
    quantity:1

  }
  let addcartvalue=await axios.post('http://127.0.0.1:8000/cart/AddProductCart/',postvalue,{
    headers:{
      Authorization:`Bearer ${token}`
    }
  })
  console.log('seccessfully......',addcartvalue)
}catch(e){
console.log(`you got the error ....${addcartvalue}`,e.message)
}finally{
  console.log('fulllll')
}
}
let addtowishlist=async(productid)=>{
try{
let url=await axios.post('http://127.0.0.1:8000/cart/AddProductWishlist/',{product:productid},{
    headers:{
      Authorization:`Bearer ${token}`
    }
})
}catch(e){
  console.log('you got errror',e.message)
}  
}
  return (
    <div >
    
      <nav className=" bg-amber-400 w-full flex flex-col md:flex-row items-center justify-between px-4 py-3 shadow sticky top-0 z-50 gap-3" >
        <div className="flex items-center gap-2 text-xl font-bold text-orange-500-600">🍽️ FoodieZone</div>

         <div className="overflow-x-auto   rounded-2xl backdrop-blur-lg	 w-full md:w-auto  flex gap-4 text-sm font-semibold whitespace-nowrap ">
          <button onClick={()=>fetchData('main dish')} className="rounded-2xl border-2 text-cyan-50  relative group  font-semibold px-3 py-2">Main Dish<span className="rounded-2xl absolute bottom-0 left-0 h-full w-0 bg-blue-500 transition-all duration-300 group-hover:w-full"></span></button>
          <button onClick={()=>fetchData('rice dishes')} className="rounded-2xl border-2 text-cyan-50 relative group  font-semibold px-3 py-2">Rice Dishes<span className="absolute bottom-0 left-0 h-[2px] w-0 bg-red-500 transition-all duration-300 group-hover:w-full"></span></button>
          <button onClick={()=>fetchData('Street Food')} className="rounded-2xl border-2 relative group text-cyan-50 font-semibold px-3 py-2">Street Food<span className="absolute bottom-0 left-0 h-[2px] w-0 bg-red-500 transition-all duration-300 group-hover:w-full"></span></button>
          <button onClick={()=>fetchData('Noodles')} className="rounded-2xl border-2 relative group text-cyan-50 font-semibold px-3 py-2">Noodles<span className="absolute bottom-0 left-0 h-[2px] w-0 bg-red-500 transition-all duration-300 group-hover:w-full"></span></button>
          <button onClick={()=>fetchData('Pasta')} className="rounded-2xl border-2 relative group text-cyan-50 font-semibold px-3 py-2">Pasta<span className="absolute bottom-0 left-0 h-[2px] w-0 bg-red-500 transition-all duration-300 group-hover:w-full"></span></button>
          <button onClick={()=>fetchData('Desserts')} className="rounded-2xl border-2 relative group text-cyan-50 font-semibold px-3 py-2">Desserts<span className="absolute bottom-0 left-0 h-[2px] w-0 bg-red-500 transition-all duration-300 group-hover:w-full"></span></button>
          <button onClick={()=>fetchData('Breakfast')} className="rounded-2xl border-2 relative group text-cyan-50 font-semibold px-3 py-2">Breakfast<span className="absolute bottom-0 left-0 h-[2px] w-0 bg-red-500 transition-all duration-300 group-hover:w-full"></span></button>

        </div>

           <div className="w-full md:w-auto flex items-center gap-2 mt-2 md:mt-0">
          {/* <form onSubmit={serchProdect} action="" className="w-full md:w-auto flex items-center gap-2 mt-2 md:mt-0"> */}
          <input onChange={(e)=>setSerch(e.target.value)}  type="text" placeholder="Search food..." className="px-3 py-1 w-full md:w-auto border rounded-md text-sm border-white "/>
          {/* <button onClick={serchProdect}>submit</button> */}
          <button onClick={Wishlistsection} className="relative text-red-600 border-2 rounded-2xl p-2 ">wishlist</button>
          <button onClick={CartSection}  className="relative text-green-600 border-2 rounded-2xl p-2"> addcard</button>
        
          {/* </form>  */}
        </div>
      </nav>

       {filterdata.length > 0 ? (
      <div style={{backgroundImage:`url(${bgimage})`}} className="bg-center bg-cover h-full bg-no-repeat p-6 bg-gray-100 min-h-screen">
        <h2 className="text-2xl font-bold mb-4 text-white">{nameofcetagary}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filterdata.map((element, index) => (
            <div key={index} className="bg-white border border-gray-200 rounded-2xl p-4 shadow hover:scale-105 transition-transform duration-300">
              <img  src={`http://127.0.0.1:8000${element.item_photo}`} alt={element.productname} className="w-full h-48 object-cover rounded-xl mb-4 cursor-pointer"/>
              <h2 className="text-black text-xl font-bold mb-2">{element.productname}</h2>
              <div className="flex items-center justify-between mb-4">
                <div className="text-gray-800">
                  <p className="line-through text-sm text-red-400">₹{element.price}</p>
                  <p className="text-lg font-bold text-green-600">₹{element.offer_price} </p>
                </div>
                <button onClick={()=>addtocart(element.id)} className="px-4 py-2 rounded-lg bg-yellow-400 text-black hover:bg-yellow-300 transition-colors font-semibold"> Add to Cart</button>
                <button onClick={()=>addtowishlist(element.id)} className="px-4 py-2 rounded-lg bg-yellow-400 text-black hover:bg-yellow-300 transition-colors font-semibold"> Wishlist</button>

                {/* onClick={() => AddToCart(element)}  */}
            </div>
            </div>
          ))}
        </div>
      </div>
    ):(<div style={{backgroundImage:`url(${bgimage})`}} className="bg-center bg-cover h-full bg-no-repeat p-6 bg-gray-100 min-h-screen">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">All Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((element, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-2xl p-4 shadow hover:scale-105 transition-transform duration-300"
            >
              <img src={`http://127.0.0.1:8000${element.item_photo}`}alt={element.productname}className="w-full h-48 object-cover rounded-xl mb-4 cursor-pointer"/>
              <h2 className="text-black text-xl font-bold mb-2">{element.productname}</h2>
              <div className="flex items-center justify-between mb-4">
                <div className="text-gray-800">
                  <p className="line-through text-sm text-red-400">₹{element.price}</p>
                  <p className="text-lg font-bold text-green-600"> ₹{element.offer_price}</p>
                </div>
                <button  onClick={()=>addtocart(element.id)}  className="px-4 py-2 rounded-lg bg-yellow-400 text-black hover:bg-yellow-300 transition-colors font-semibold">Add to Cart</button>
                 <button onClick={()=>addtowishlist(element.id)} className="px-4 py-2 rounded-lg bg-yellow-400 text-black hover:bg-yellow-300 transition-colors font-semibold"> Wishlist</button>
                {/* onClick={() => AddToCart(element)}  */}
              </div>
            </div>
          ))}
        </div>
      </div>
      )}
    </div>
  );
}

export default ProductData;
