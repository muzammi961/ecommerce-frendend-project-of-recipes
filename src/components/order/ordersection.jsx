import axios from "axios";
import { useEffect,useState } from "react";
// import bgimage from '../../assets/backgroundImage.jpg' 
import { useNavigate } from "react-router-dom";
import toast,{ Toaster } from "react-hot-toast";
const apiUrl = import.meta.env.VITE_API_URL;
import  DecodeImageUrl  from "../../utils/decordeurl";


function Ordersection(){
let navigation=useNavigate()  
let [orderproduct,setProduct]=useState([])
useEffect(()=>{
let OrderProductfunc=async()=>{
let token=localStorage.getItem('access')
try{
// let value=await axios.get('http://127.0.0.1:8000/orders/OrderDetile/',{
let value=await axios.get(`${apiUrl}/cart/CartViewByUser/`,{
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
    let urldata = await axios.get(`${apiUrl}/orders/UseraddressGet`,{ headers:{Authorization:`Bearer ${token}`}});
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



    return (
  <div className="min-h-screen bg-gradient-to-br from-amber-50 to-white p-4 sm:p-6">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <div className="mb-4 sm:mb-6">
          <button
            onClick={() => window.history.back()}
            className="flex items-center text-amber-600 hover:text-amber-800 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back to Shopping
          </button>
        </div>

        {/* Cart Container */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Cart Header */}
          <div className="p-4 sm:p-6 bg-gradient-to-r from-amber-100 to-amber-50 border-b border-amber-200">
            <h2 className="text-xl sm:text-2xl font-bold text-amber-800 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              Your Shopping Cart
            </h2>
            <p className="text-amber-700/80 text-sm sm:text-base">
              {orderproduct.length} {orderproduct.length === 1 ? 'item' : 'items'} in cart
            </p>
          </div>

          {/* Cart Items - Scrollable Area */}
          <div className="divide-y divide-amber-100 max-h-[50vh] overflow-y-auto scrollbar-hide">
  {orderproduct.length > 0 ? (
    orderproduct.map((element, index) => (
      <div 
        key={index} 
        className="p-3 sm:p-4 hover:bg-amber-50/50 transition-all duration-300 group"
      >
        <div className="flex items-center space-x-3 sm:space-x-4">
          {/* Product Image */}
          <div className="relative flex-shrink-0">
            <div className="absolute inset-0 bg-amber-200/20 rounded-lg group-hover:opacity-30 transition-opacity duration-300"></div>
            <img 
              className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-cover rounded-lg border border-amber-200 shadow-sm"
              src={DecodeImageUrl(element.product.item_photo)} 
              alt={element.product.productname} 
            />
          </div>
          
          {/* Product Details */}
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-amber-900 group-hover:text-amber-800 transition-colors truncate text-sm sm:text-base">
              {element.product.productname}
            </h3>
            <p className="text-xs sm:text-sm text-amber-700/70">
              Qty: {element.quantity} × ₹{element.product.offer_price.toFixed(2)}
            </p>
          </div>
          
          {/* Product Price */}
          <div className="flex-shrink-0">
            <span className="text-base sm:text-lg font-bold text-amber-800">
              ₹{(element.quantity * element.product.offer_price).toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    ))
  ) : (
    <div className="p-6 sm:p-8 text-center">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 sm:h-12 sm:w-12 mx-auto text-amber-300/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
      <p className="mt-3 sm:mt-4 text-amber-700/70 text-sm sm:text-base">Your cart is empty</p>
    </div>
  )}
</div>

          {/* Order Summary - Fixed at Bottom */}
          {orderproduct.length > 0 && (
            <div className="bg-gradient-to-br from-amber-100 to-amber-50 border-t border-amber-200 p-4 sm:p-6 sticky bottom-0">
              <h2 className="text-lg sm:text-xl font-bold text-amber-800 mb-3 sm:mb-4 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                  <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                </svg>
                Order Summary
              </h2>

              <div className="space-y-2 sm:space-y-3 mb-3 sm:mb-4">
                <div className="flex justify-between text-amber-700 text-sm sm:text-base">
                  <span>Subtotal</span>
                  <span className="font-medium">₹{totalprice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-amber-700 text-sm sm:text-base">
                  <span>Delivery</span>
                  <span className="font-medium">₹0.00</span>
                </div>
                <div className="flex justify-between text-amber-800 text-base sm:text-lg font-bold pt-2 border-t border-amber-200">
                  <span>Total Amount</span>
                  <span className="text-amber-600">₹{totalprice.toFixed(2)}</span>
                </div>
              </div>

              <button 
                onClick={OrderformCheck}
                className="w-full py-2 sm:py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-bold rounded-lg shadow-md hover:from-amber-600 hover:to-amber-700 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg active:scale-95 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                disabled={orderproduct.length === 0}
              >
                Place Order
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
      
      <Toaster position="bottom-right" />
    </div>
)
}
export default Ordersection;