import React from 'react';
import AdminSidebar from '../../ad/sidebar';
import axios from 'axios';
import toast,{Toaster} from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import { useEffect,useState,useReducer } from 'react';
const apiUrl = import.meta.env.VITE_API_URL;
import  DecodeImageUrl  from "../../../utils/decordeurl";

function OrderDetailsAdmin() {
  let [orderdata,setOrderdata]=useState([])
  // let [totalprice,setTotalprice]=useState('')
  let [address,setAddress]=useState([])
  let {userid}=useParams()

  // const order = {
  //   id: 'ORD-789012',
  //   date: '2023-11-15 14:30',
  //   status: 'Delivered',
  //   total: '$149.99',
  //   paymentMethod: 'Credit Card',
  //   items: [
  //     { id: 1, name: 'Wireless Headphones', price: '$99.99', quantity: 1, image: '/path/to/image1.jpg' },
  //     { id: 2, name: 'Phone Case', price: '$25.00', quantity: 2, image: '/path/to/image2.jpg' }
  //   ],
  //   customer: {
  //     name: 'John Doe',
  //     email: 'john@example.com',
  //     phone: '+1 (555) 123-4567'
  //   },
  //   shippingAddress: {
  //     street: '123 Main St',
  //     city: 'New York',
  //     state: 'NY',
  //     zip: '10001',
  //     country: 'United States'
  //   },
  //   billingAddress: {
  //     street: '123 Main St',
  //     city: 'New York',
  //     state: 'NY',
  //     zip: '10001',
  //     country: 'United States'
  //   }
  // };

  useEffect(() => {
    userOrderDetails(userid);
    userAddress(userid)
  },[userid]);
  const userOrderDetails = async (userid) => {
    const token = localStorage.getItem('access');
    console.log(token)
    try {
      const response = await axios.get(`${apiUrl}/adminside/OrderDetailsBYuser/${userid}/`, {headers: {Authorization: `Bearer ${token}`}});
      console.log(response.data[0].product.productname);
      setOrderdata(response.data)
      
    } catch (e) {
      console.log('Data fetch failed', e);
    }
  };


  
let userAddress=async()=>{
    const token=localStorage.getItem('access')
    try{
      let addressdata=await axios.get(`${apiUrl}/adminside/GetAddressBYUser/${userid}/`,{headers:{Authorization :`Bearer ${token}`}})
      setAddress(addressdata.data)
       toast.success('address got')
    }catch(e){
        console.log('error...')
        toast.error('does not have address......')
    }
}


let totalprice=orderdata.reduce((acc,item)=>acc + item.product.offer_price*item.quantity,0 )

  return (
 <div className="flex min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
  <AdminSidebar />
  
  <div className="flex-1 p-4 md:p-8 overflow-y-auto">
    <div className="max-w-6xl mx-auto">
      {/* Back Button */}
      <button 
        onClick={() => window.history.back()} 
        className="flex items-center text-indigo-600 hover:text-indigo-800 mb-4 md:mb-6 transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
        </svg>
        Back
      </button>

      {/* Shining Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl shadow-xl p-4 md:p-6 mb-6 md:mb-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-20 h-20 md:w-32 md:h-32 bg-white opacity-10 rounded-full transform translate-x-10 -translate-y-10 md:translate-x-16 md:-translate-y-16"></div>
        <div className="absolute bottom-0 left-0 w-20 h-20 md:w-32 md:h-32 bg-white opacity-10 rounded-full transform -translate-x-10 translate-y-10 md:-translate-x-16 md:translate-y-16"></div>
        <h1 className="text-2xl md:text-3xl font-bold text-white relative z-10">Order Details</h1>
      </div>

      {orderdata && orderdata.length > 0 ? (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
            {/* Order Items */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 border-b border-gray-200">
                <h3 className="font-semibold text-gray-800">Order Items</h3>
              </div>
              <div className="divide-y divide-gray-100">
                {orderdata.map((item, index) => (
                  <div key={index} className="p-3 md:p-4 flex items-center hover:bg-gray-50 transition-colors">
                    <div className="flex-shrink-0 w-12 h-12 md:w-16 md:h-16 bg-gray-100 rounded-lg overflow-hidden">
                      <img 
                        src={DecodeImageUrl(item.product.item_photo)} 
                        alt={item.name} 
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.onerror = null; 
                          e.target.src = 'https://via.placeholder.com/100';
                        }}
                      />
                    </div>
                    <div className="ml-3 md:ml-4 flex-1 min-w-0">
                      <h4 className="font-medium text-gray-800 truncate">{item.product.productname}</h4>
                      <p className="text-sm md:text-base text-gray-600">Quantity: {item.quantity}</p>
                    </div>
                    <div className="text-right ml-2">
                      <p className="font-medium text-gray-800">₹{item.product.offer_price}</p>
                      <p className="font-medium text-gray-800">₹{(item.product.offer_price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-4 border-t border-gray-200 bg-gray-50">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Subtotal</span>
                  <span className="font-medium">₹{totalprice}</span>
                </div>
              </div>
            </div>

            {/* Customer & Address Info */}
            <div className="space-y-4 md:space-y-6">
              {/* Customer Info */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 border-b border-gray-200">
                  <h3 className="font-semibold text-gray-800">Customer Information</h3>
                </div>
                <div className="p-4 md:p-6 space-y-3 md:space-y-4">
                  {address.map((add, index) => (
                    <div key={index} className="flex items-center">
                      <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-medium">
                        {add.nameofuser.charAt(0).toUpperCase()}
                      </div>
                      <div className="ml-3 md:ml-4 min-w-0">
                        <h4 className="font-medium text-gray-800 truncate">{add.nameofuser}</h4>
                        <p className="text-sm md:text-base text-gray-600 truncate">{add.phonenumber}</p>
                        <p className="text-sm md:text-base text-gray-600 truncate">{add.state}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Shipping Address */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 border-b border-gray-200">
                  <h3 className="font-semibold text-gray-800">Shipping Address</h3>
                </div>
                {address.map((add, index) => (
                  <div key={index} className="p-4 md:p-6 bg-white rounded-md w-full">
                    <div className="space-y-2 md:space-y-3 text-sm md:text-base text-gray-800 leading-relaxed">
                      <p className="truncate"><strong>Name:</strong> {add.nameofuser}</p>
                      <p><strong>Phone:</strong> {add.phonenumber}</p>
                      <p className="truncate"><strong>House/Building:</strong> {add.houseno_buildingname}</p>
                      <p className="truncate"><strong>Road Name:</strong> {add.Roadname}</p>
                      <p><strong>City:</strong> {add.city}</p>
                      <p><strong>State:</strong> {add.state}</p>
                      <p><strong>Pincode:</strong> {add.pincode}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 text-center">
          <div className="text-gray-500 text-lg md:text-xl font-medium mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 md:h-16 md:w-16 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <p className="mt-3 md:mt-4">This user hasn't ordered anything yet</p>
          </div>
        </div>
      )}
    </div>
  </div>
  <Toaster position='bottom-right'/>
</div>
  );
}

export default OrderDetailsAdmin;