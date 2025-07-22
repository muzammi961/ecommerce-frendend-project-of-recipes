import Mycontext from '../prodectside/createcontext'
import { useState,useContext,useEffect } from 'react';
import axios from 'axios';
import bgimage from '../../assets/backgroundImage.jpg'
function Wishlist(){
let [products,setProducts]=useState([])    
let token=localStorage.getItem('access')
useEffect(()=>{
let getthecartdata =async()=>{
let products=await axios.get('http://127.0.0.1:8000/cart/WishListViewByUser/',{
    headers:{
   Authorization:`Bearer ${token}`
    }
})
setProducts(products.data)
}
getthecartdata()
},[]);

console.log(products)
    return( 
  <div style={{backgroundImage:`url(${bgimage})`}} className="bg-center bg-cover h-full bg-no-repeat p-6 bg-gray-100 min-h-screen">
     <h2 className="text-2xl font-bold mb-4 text-white">Wish list</h2>
     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
       {products.map((element, index) => (
         <div
          key={index}
           className="bg-white border border-gray-200 rounded-2xl p-4 shadow hover:scale-105 transition-transform duration-300"
         >
           <img src={`http://127.0.0.1:8000${element.product.item_photo}`}alt={element.productname}className="w-full h-48 object-cover rounded-xl mb-4 cursor-pointer"/>
           <h2 className="text-black text-xl font-bold mb-2">{element.product.productname}</h2>
           <div className="flex items-center justify-between mb-4">
             <div className="text-gray-800">
               <p className="line-through text-sm text-red-400">₹{element.product.price}</p>
               <p className="text-lg font-bold text-green-600"> ₹{element.product.offer_price}</p>
            </div>
          </div>
         </div>
       ))}
     </div>
   </div> 

    )

}
export default Wishlist;