import axios from "axios";
import { useEffect,useState } from "react";
import bgimage from '../../assets/backgroundImage.jpg' 
import { useNavigate } from "react-router-dom";
import toast,{ Toaster } from "react-hot-toast";
function Ordersection(){
let navigation=useNavigate()  
let [orderproduct,setProduct]=useState([])
useEffect(()=>{
let OrderProductfunc=async()=>{
let token=localStorage.getItem('access')
try{
// let value=await axios.get('http://127.0.0.1:8000/orders/OrderDetile/',{
let value=await axios.get('http://127.0.0.1:8000/cart/CartViewByUser/',{
  headers:{
    Authorization:`Bearer ${token}`
  }
})
setProduct(value.data)
}catch(e){
  console.log('error...')
}
}
OrderProductfunc()
},[])

console.log('OrderProductfunc',orderproduct)



const OrderformCheck = async () => {
  try {
    let token=localStorage.getItem('access')
    let urldata = await axios.get('http://127.0.0.1:8000/orders/UseraddressGet',{ headers:{Authorization:`Bearer ${token}`}});
    console.log('url data....',urldata.data)
    if (!urldata.data[0]?.nameofuser) {
       console.log('urls data sss.',urldata.data)
      toast.error('User address not received.');
      toast.success('address section..')
      console.log('addressss')
      navigation(`/Userformaddress/${0}`)
    } else {
      // navigation(`/OrderOneProduct/${0}`)
      navigation(`/PayProduct/${0}`)

      toast.success('order section...')
      console.log('you clikedd')
      // navigation('/Ordersection')
    }
  } catch (e) {
    toast.error('Cart is empty!');
    console.log('Error:', e);
  }
};






let totalprice=orderproduct.reduce((acc,item)=>acc + item.product.offer_price*item.quantity,0 )
// console.log('count is ,,,',totalprice)



    return(<div 
  style={{backgroundImage:`url(${bgimage})`}} 
  className="bg-fixed bg-center bg-cover bg-no-repeat min-h-screen"
>
  <div className="max-w-4xl mx-auto p-4">
    <div className="backdrop-blur-lg bg-black/30 rounded-xl shadow-2xl overflow-hidden border border-amber-100/20">
      {/* Cart Header with Glass Morphism */}
      <div className="p-6 bg-gradient-to-r from-amber-900/30 to-amber-700/30 border-b border-amber-200/20">
        <h2 className="text-2xl font-bold text-amber-50 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          Your Shopping Cart
        </h2>
        <p className="text-amber-100/80">{orderproduct.length} items in cart</p>
      </div>

      {/* Cart Items with Hover Effects */}
      <div className="divide-y divide-amber-900/30 max-h-[60vh] overflow-y-auto">
        {orderproduct.map((element, index) => (
          <div 
            key={index} 
            className="p-4 hover:bg-amber-900/10 transition-all duration-300 group"
          >
            <div className="flex items-center space-x-4">
              {/* Product Image with Shine Effect */}
              <div className="relative">
                <div className="absolute inset-0 bg-amber-400/10 rounded-lg group-hover:opacity-30 transition-opacity duration-300"></div>
                <img 
                  className="w-24 h-24 object-cover rounded-lg border border-amber-200/20 shadow-md"
                  src={`http://127.0.0.1:8000${element.product.item_photo}`} 
                  alt={element.product.productname} 
                />
              </div>
              
              <div className="flex-1">
                <h3 className="font-semibold text-amber-50 group-hover:text-amber-200 transition-colors">
                  {element.product.productname}
                </h3>
                <p className="text-sm text-amber-100/70">
                  Qty: {element.quantity} × ₹{element.product.offer_price}
                </p>
              </div>
              
              <div className="flex items-center">
                <span className="text-lg font-bold text-amber-50">
                  ₹{element.quantity * element.product.offer_price}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Sticky Order Summary with Glow Effect */}
      <div className="bg-gradient-to-br from-amber-900/40 to-amber-800/40 border-t border-amber-200/20 p-6 sticky bottom-0 backdrop-blur-md">
        <h2 className="text-xl font-bold text-amber-50 mb-4 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
            <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
          </svg>
          Order Summary
        </h2>

        <div className="space-y-3 mb-4">
          <div className="flex justify-between text-amber-100">
            <span>Subtotal</span>
            <span className="font-medium">₹310</span>
          </div>
          <div className="flex justify-between text-amber-100">
            <span>Delivery</span>
            <span className="font-medium">₹40</span>
          </div>
          <div className="flex justify-between text-amber-50 text-lg font-bold pt-2 border-t border-amber-200/20">
            <span>Total Amount</span>
            <span className="text-amber-300">₹{totalprice}</span>
          </div>
        </div>

        <button 
          onClick={OrderformCheck}
          className="w-full py-3 bg-gradient-to-r from-amber-600 to-amber-700 text-white font-bold rounded-lg shadow-lg hover:from-amber-500 hover:to-amber-600 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl active:scale-95 flex items-center justify-center"
        >
          Place Order
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    </div>
  </div>
  
  <Toaster position="bottom-right"/>
</div>)
}
export default Ordersection;