import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import bgimage from '../../assets/backgroundImage.jpg';
import toast, { Toaster } from 'react-hot-toast';
import Ordersection from '../order/ordersection';

function Cartsection() {
  let navigation=useNavigate()
  const [cartItems, setCartItems] = useState([]);
  const token = localStorage.getItem('access');
  useEffect(() => {
    getCartData();
  }, []);
  const getCartData = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/cart/CartViewByUser/', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCartItems(response.data);
    } catch (error) {
      console.error('Failed to fetch cart data:', error);
      toast.error('Failed to load cart');
    }
  };
  const func = async (value, quantity, id) => {
    try {
      const res = await axios.patch(`http://127.0.0.1:8000/cart/UpdatetheQuantity/${id}/`,{quantity,value},{headers:{Authorization:`Bearer ${token}`}});
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






const oneByoneOrderFunc = async (cartid) => {
  console.log(cartid);
  try {
    const response = await axios.post(`http://127.0.0.1:8000/orders/OrderOneProductView/${cartid}/`,{},{headers: {Authorization: `Bearer ${token}`}});
    toast.success('Cart added to order section');
    navigation('/Ordersection')
    console.log('Response:', response.data);
  } catch (e) {
    toast.error('Cart did not add to order section');
    console.error('Error:', e.message);
  }
};


// let [url, setUrl] = useState([]);
const allOrderFunc = async () => {
  try {
    let urldata = await axios.get('http://127.0.0.1:8000/orders/UseraddressGet',{ headers:{Authorization:`Bearer ${token}`}});
    // setUrl(urldata.data);

    if (!urldata.data[0]?.nameofuser) {
      toast.error('User address not received.');
      toast.success('address section..')
      navigation('/Userformaddress')
    } else {
      toast.success('order section...')
      navigation('/Ordersection')
    }
  } catch (e) {
    toast.error('Cart is empty!');
    console.log('Error:', e);
  }
};











// let Ordersectionfunc=()=>{
  
//    navigation('/Ordersection')
//    toast.success('order section')
// }
  const totalCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const offerPrice = cartItems.reduce((acc, item) => acc + item.product.offer_price * item.quantity, 0);
  const discount = totalPrice - offerPrice;

  return (
    <>
      {cartItems.length > 0 ? (
        <div style={{ backgroundImage: `url(${bgimage})` }}className="bg-center bg-cover min-h-screen bg-no-repeat p-6">
          <h2 className="text-2xl font-bold mb-6 text-white">All Carts</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-40">
            {cartItems.map((item, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-2xl p-4 shadow hover:scale-105 transition-transform duration-300">
                <img src={`http://127.0.0.1:8000${item.product.item_photo}`} alt={item.product.productname} className="w-full h-48 object-cover rounded-xl mb-4"/>
                <h2 className="text-xl font-bold text-black mb-2">{item.product.productname}</h2>
                <div className="text-gray-800 mb-3">
                  <p className="line-through text-sm text-red-400">₹{item.product.price}</p>
                  <p className="text-lg font-bold text-green-600">₹{item.product.offer_price}</p>
                </div>  

                <div className="flex justify-around items-center">
                  <button onClick={() => oneByoneOrderFunc(item.product.id)}className="px-4 py-2 rounded-lg bg-yellow-400 text-black hover:bg-yellow-300 transition-colors font-semibold">Order</button>
                  <button onClick={() => func('increase', item.quantity, item.product.id)}className="px-3 py-2 rounded-lg bg-yellow-400 text-black hover:bg-yellow-300 font-semibold">Increase</button>
                  <span className="px-2 text-black font-semibold">{item.quantity}</span>
                  <button onClick={() => func('decrease', item.quantity, item.product.id)} className="px-3 py-2 rounded-lg bg-yellow-400 text-black hover:bg-yellow-300 font-semibold">Decrease</button>
                </div>
              </div>))}
          </div>
          <div className="fixed bottom-0 left-0 w-full border-t border-gray-300 shadow-md bg-white z-50">
            <div className="max-w-6xl mx-auto px-4 py-3 flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="w-full md:w-auto flex flex-col md:flex-row md:items-center gap-2 md:gap-6 text-sm md:text-base">
                <span className="font-medium text-gray-700">Items: {totalCount}</span>
                <span className="text-gray-700">Original: ₹{totalPrice}</span>
                <span className="text-red-500">Discount: -₹{discount}</span>
                <span className="font-semibold text-green-600">Total: ₹{offerPrice}</span>
              </div>
              <button onClick={allOrderFunc}className="w-full md:w-auto bg-green-600 text-white py-3 px-6 rounded-lg text-lg font-semibold hover:bg-green-700 transition">Place All Orders</button>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-amber-600 w-full h-screen flex justify-center items-center">
          <h1 className="text-6xl text-amber-50">Your cart is empty</h1>
           <button onClick={allOrderFunc}className="w-full md:w-auto bg-green-600 text-white py-3 px-6 rounded-lg text-lg font-semibold hover:bg-green-700 transition">Orders all</button>
        </div>
      )}
       <Toaster position='bottom-right'  />
    </>
  );
}

export default Cartsection;
