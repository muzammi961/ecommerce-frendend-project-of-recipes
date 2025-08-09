import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// import bgimage from '../../assets/backgroundImage.jpg';
import toast, { Toaster } from 'react-hot-toast';
// import Ordersection from '../order/ordersection';
const apiUrl = import.meta.env.VITE_API_URL;
import  DecodeImageUrl  from "../../utils/decordeurl";

function Cartsection() {
  let navigation=useNavigate()
  const [cartItems, setCartItems] = useState([]);
  const token = localStorage.getItem('access');
  useEffect(() => {
    getCartData();
  }, []);
  const getCartData = async () => {
    try {
      const response = await axios.get(`${apiUrl}/cart/CartViewByUser/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // console.log(response.data[30].product.qu)
      setCartItems(response.data);
    } catch (error) {
      console.error('Failed to fetch cart data:', error);
      toast.error('Failed to load cart');
    }
  };
  const func = async (value, quantity, id) => {
    console.log('id is ......',id)
    try {
      const res = await axios.patch(`${apiUrl}/cart/UpdatetheQuantity/${id}/`,{quantity,value},{headers:{Authorization:`Bearer ${token}`}});
      const updatedQuantity = res.data.new_quantity;
       setCartItems(prevItems => prevItems.map(item => item.product.id === id ? { ...item, quantity: updatedQuantity } : item));
      if (value==='increase'){ 
        toast.success("Quantity increase");
    }else if(value==='decrease'){
        toast.success('Quantity  decrease')
    } 
    }catch(e) {
      console.error("Quantity update error:", e.message);
      toast.error("Failed to update quantity");
    }
  };





                                                                    // orderonebyone
const oneByoneOrderFunc = async (cartid,itemquantitybull) => {

  sessionStorage.setItem("itemquantitybull", itemquantitybull); 
  sessionStorage.setItem("cartitembull", "true");
  // alert(`this is the cateid form cart section ${cartid}`)
  console.log('this is the carteid from cart section ',cartid)
  const token = localStorage.getItem('access');
try {
    let urldata = await axios.get(`${apiUrl}/orders/UseraddressGet`,{ headers:{Authorization:`Bearer ${token}`}});
    if (!urldata.data[0]?.nameofuser) {
      toast.error('User address not received.');
      toast.success('address section..')
      navigation(`/Userformaddress/${cartid}`)
    } else {
      toast.success('order section...')
      console.log('cart id  is .....',cartid)
      navigation(`/OrderOneProduct/${cartid}`)
    }
  } catch (e) {
    toast.error('Cart is empty!');
    console.log('Error:', e);
  }
};












                                                        //  alllorderfunction
const allOrderFunc = async () => {
  try {
    let token=localStorage.getItem('access')
    let urldata = await axios.get(`${apiUrl}/orders/UseraddressGet`,{ headers:{Authorization:`Bearer ${token}`}});
    if (!urldata.data[0]?.nameofuser) {
       console.log('urls data sss.',urldata.data)
      toast.error('User address not received.');
      toast.success('address section..')
      console.log('addressss')
      navigation(`/Userformaddress/${0}`)
    } else {
      toast.success('order section...')
      
      navigation('/Ordersection')
    }
  } catch (e) {
    toast.error('Cart is empty!');
    console.log('Error:', e);
  }
};






const [selectedProduct, setSelectedProduct] = useState(null);

  const totalCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const offerPrice = cartItems.reduce((acc, item) => acc + item.product.offer_price * item.quantity, 0);
  const discount = totalPrice - offerPrice;

  return (
  <>
  {selectedProduct ? (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-white p-6">
      <div className="max-w-6xl mx-auto">
        <button 
          onClick={() => setSelectedProduct(null)}
          className="flex items-center text-amber-600 mb-6 hover:text-amber-800 transition"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Back to Cart
        </button>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/2 p-8">
              <img 
                src={DecodeImageUrl(selectedProduct.item_photo)} 
                alt={selectedProduct.productname} 
                className="w-full h-96 object-contain rounded-lg"
              />
            </div>
            <div className="md:w-1/2 p-8">
              <h1 className="text-3xl font-bold text-gray-800 mb-4">{selectedProduct.productname}</h1>
              
              <div className="flex items-center gap-4 mb-6">
                <p className="text-2xl font-bold text-amber-600">₹{selectedProduct.offer_price}</p>
                {selectedProduct.price > selectedProduct.offer_price && (
                  <>
                    <p className="line-through text-lg text-gray-400">₹{selectedProduct.price}</p>
                    <span className="bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full">
                      {Math.round((1 - selectedProduct.offer_price/selectedProduct.price) * 100)}% OFF
                    </span>
                  </>
                )}
              </div>

              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Description</h3>
                <p className="text-gray-600">
                  {selectedProduct.description || "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam."}
                </p>
              </div>

              <div className="flex items-center gap-4 mb-8">
                <div className="flex items-center bg-amber-50 rounded-full">
                  <button 
                    onClick={() => func('decrease', selectedProduct.quantity, selectedProduct.id)}
                    className="w-10 h-10 flex items-center justify-center text-amber-700 hover:bg-amber-100 rounded-l-full transition"
                  >
                    -
                  </button>
                  <span className="px-4 text-gray-800 font-medium">{selectedProduct.quantity}</span>
                  <button 
                    onClick={() => func('increase', selectedProduct.quantity, selectedProduct.id)}
                    className="w-10 h-10 flex items-center justify-center text-amber-700 hover:bg-amber-100 rounded-r-full transition"
                  >
                    +
                  </button>
                </div>
                <button 
                  onClick={() => oneByoneOrderFunc(selectedProduct.id,selectedProduct.quantity)}
                  className="flex-1 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-full font-bold hover:from-amber-600 hover:to-amber-700 transition shadow-md"
                >
                  Order Now
                </button>
              </div>

              {/* <div className="border-t border-gray-200 pt-6">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-700">Total</span>
                  <span className="font-bold text-amber-600 text-xl">
                    ₹{selectedProduct.offer_price * selectedProduct.quantity}
                  </span>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : cartItems.length > 0 ? (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-white p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
           <button
        onClick={() => window.history.back()}
        className="group relative overflow-hidden bg-gradient-to-r from-amber-100 to-amber-50 hover:from-amber-200 hover:to-amber-100 px-5 py-2.5 rounded-full shadow-sm hover:shadow-md transition-all duration-300 flex items-center border border-amber-200"
      >
        <span className="absolute inset-0 w-2 bg-amber-400 transition-all duration-300 ease-out group-hover:w-full"></span>
        <span className="relative flex items-center text-amber-700 group-hover:text-amber-800 font-medium text-sm">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5 transition-transform group-hover:-translate-x-0.5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Back
        </span>
      </button>
          <h2 className="text-3xl font-bold text-amber-900">Your Shopping Cart</h2>
          <span className="text-amber-700 font-medium">{cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {cartItems.map((item, index) => (
              <div 
                key={index} 
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow flex flex-col sm:flex-row gap-6 cursor-pointer"
                onClick={() => setSelectedProduct(item.product)}
              >
                <img 
                  src={DecodeImageUrl(item.product.item_photo)} 
                  alt={item.product.productname} 
                  className="w-full sm:w-48 h-48 object-contain rounded-lg"
                />
                
                <div className="flex-1 flex flex-col">
                  <div className="flex-1">
                    <h2 className="text-xl font-bold text-gray-800 mb-2">{item.product.productname}</h2>
                    <div className="flex items-center gap-3 mb-4">
                      <p className="text-lg font-bold text-amber-600">₹{item.product.offer_price}</p>
                      <p className="line-through text-sm text-gray-400">₹{item.product.price}</p>
                      {item.product.price > item.product.offer_price && (
                        <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                          {Math.round((1 - item.product.offer_price/item.product.price) * 100)}% OFF
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center bg-amber-50 rounded-full">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          func('decrease', item.quantity, item.product.id);
                        }}
                        className="w-10 h-10 flex items-center justify-center text-amber-700 hover:bg-amber-100 rounded-l-full transition"
                      >
                        -
                      </button>
                      <span className="px-4 text-gray-800 font-medium">{item.quantity}</span>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          func('increase', item.quantity, item.product.id);
                        }}
                        className="w-10 h-10 flex items-center justify-center text-amber-700 hover:bg-amber-100 rounded-r-full transition"
                      >
                        +
                      </button>
                    </div>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        oneByoneOrderFunc(item.product.id,item.quantity);
                      }}
                      className="px-6 py-2 bg-amber-500 text-white rounded-full font-medium hover:bg-amber-600 transition"
                    >
                      Order Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl p-6 shadow-lg sticky top-6">
              <h3 className="text-xl font-bold text-gray-800 mb-6">Order Summary</h3>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal ({totalCount} items)</span>
                  <span className="font-medium">₹{totalPrice}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Discount</span>
                  <span className="text-green-600 font-medium">-₹{discount}</span>
                </div>
                <div className="border-t border-gray-200 pt-4 flex justify-between">
                  <span className="font-bold text-gray-800">Total</span>
                  <span className="font-bold text-amber-600 text-xl">₹{offerPrice}</span>
                </div>
              </div>

              <button 
                onClick={allOrderFunc}
                className="w-full py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-full font-bold hover:from-amber-600 hover:to-amber-700 transition shadow-md"
              >
                Checkout Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-amber-100 to-amber-200 p-6 text-center">
      <div className="bg-white p-10 rounded-xl shadow-xl max-w-md">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 mx-auto text-amber-400 mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Your Cart is Empty</h1>
        <p className="text-gray-600 mb-6">Looks like you haven't added anything to your cart yet</p>
        <button 
          onClick={()=>navigation('/prodectdata')}
          className="px-8 py-3 bg-amber-500 text-white rounded-full font-medium hover:bg-amber-600 transition shadow"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  )}
  <Toaster position="bottom-right" />
</>
  );
}

export default Cartsection;
