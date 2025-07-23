import { useState,useEffect } from "react"
import toast,{Toaster} from 'react-hot-toast'
import axios from "axios"
import hotellogo from '../../assets/hotellogo.jpg'
import './prodectstyle/prodectst.css'
import { Link } from "react-router-dom"
function Prodecthomepage(){
let[serch,setSerch]=useState('')

  const [products, setProducts] = useState([]);
  let token=localStorage.getItem('access')
  console.log(token)
  useEffect(() => {
    // toast('login seccsses')
    const fetchData = async () => {
      try {
        let response = await axios.get("http://127.0.0.1:8000/products/ViewProductsByCategory/main dish/",{
          headers:{
            Authorization:`Bearer ${token}`
          }
        });

        console.log(response.data)
        setProducts(response.data);
      } catch (error) {
        console.log("Error fetching data:", error);

      }
    };

    fetchData();
  }, []);
    return(
    <div   style={{backgroundImage: products.length > 0 ?`url(http://127.0.0.1:8000${products[0].item_photo})`: 'none'}} className="w-full h-auto bg-cover bg-no-repeat bg-center">
  <div className="w-full h-[30rem] mx-auto shadow-lg bg-cover bg-center bg-no-repeat overflow-hidden animate-mainrecipe menu-mainrecipe ">
    <div className="m-3 px-6 flex items-center justify-between  rounded-3xl">
    <img className="w-16 h-16 object-cover rounded-full" src={hotellogo} alt="Logo" />
      <form className=" flex items-center gap-2  ">
        <input type="text" placeholder="Search" className="placeholder-white placeholder:font-bold outline-none  text-white px-3 py-2 rounded-lg focus:outline-none border border-gray-300 backdrop-blur"/>
        <button className="outline-none border-gray-300 text-white px-4 py-2 rounded-lg  border backdrop-blur">Search</button>
      </form>
      <div className="flex gap-3">
        <Link to={'/'} className="px-4 py-2 border rounded-lg shadow border-gray-300 text-white backdrop-blur">Register</Link>
        <Link to={'/loginpage'} className="px-4 py-2 border rounded-lg border-gray-300 text-white backdrop-blur">Login</Link>
      </div>
    </div>
    <div>
      <div className="text-center py-12 bg-gradient-to-r  rounded-lg shadow-md">
  <h1 className=" text-amber-400 mb-4 text-2xl sm:text-3xl md:text-4xl lg:text-7xl font-bold"> Welcome to Fusion Feast – Where Global Flavors Unite!</h1>
  <p className="text-lg text-amber-200 max-w-3xl mx-auto">Discover bold, unique, and gourmet recipes that blend cultures and creativity into every bite. Whether you're craving comfort or culinary adventure, our curated recipes promise something extraordinary for every foodie.</p>
    <br/>
  <Link to={'/prodectdata'}  className="text-white border py-2 px-4 rounded-md border-gray-300 backdrop-blur-2xl">show recipes</Link>
</div>
    </div>  
  </div>
  {products.map((product,index)=>(
    // <h1 key={index.id}>{element.productname}</h1>
    <div className=" shadow-lg  p-4 w-full  hover:scale-105 transition-transform duration-700 flex flex-col ">
      <img src={`http://127.0.0.1:8000${product.item_photo}`} alt={product.productname} className="h-screen w-screen object-cover rounded-xl"/>
      <div className="mt-4 rounded-2xl w-2/2">
        <h2 className="text-lg font-semibold text-white">{product.productname}</h2>
        <p className="text-sm text-white mt-1">{product.description}</p>
        <div className="flex items-center justify-between mt-3">
          <span className="text-lg font-bold text-green-600">₹{product.price}</span>
          <span className="text-lg font-bold text-green-600">₹{product.offer_price}</span>
          <button className="px-4 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm">Add to Cart</button>
        </div>
      </div>
    </div> 
   ))};
   <Toaster position="bottom-right" />
</div>


    )
}
export default Prodecthomepage;