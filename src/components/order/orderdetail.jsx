import{ useEffect, useState } from 'react';
import axios from 'axios';
import toast,{Toaster} from 'react-hot-toast';
import React from 'react';
import { useNavigate } from 'react-router-dom';
const apiUrl = import.meta.env.VITE_API_URL;
import  DecodeImageUrl  from "../../utils/decordeurl";


const OrderDetail = () => {
let navigation=useNavigate()
let [statedata,setData]=useState([])
useEffect(()=>{
gettheorderdatas()
},[])



let gettheorderdatas=async()=>{
    let token=localStorage.getItem('access')
    try{
    let orderdata=await axios.get(`${apiUrl}/orders/OrderDetile/`,{
        headers:{
            Authorization:`Bearer ${token}` 
        }
    })
    setData(orderdata.data)
    console.log('orderdata....',orderdata.data[0].product)
    toast.success('got order datas....')
    }catch(e){
    toast.error('did not get order datas.....')
    }
}


let backbuttonfunc=()=>{
 navigation("/prodectdata")
}




  return (
   <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white p-4 sm:p-6">
      {/* Header with back button */}
      <div className="max-w-6xl mx-auto mb-6 sm:mb-8 flex items-center">
        <button 
          onClick={backbuttonfunc} 
          className="flex items-center text-amber-600 hover:text-amber-800 transition text-sm sm:text-base"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 sm:h-5 w-4 sm:w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Back to Menu
        </button>
      </div>

      {/* Main Order Card */}
      <div className="relative max-w-6xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Shiny header */}
        <div className="relative bg-gradient-to-r from-amber-400 to-amber-500 p-4 sm:p-6 shadow-md overflow-hidden">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white text-center">YOUR ORDER HISTORY</h1>
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-[linear-gradient(to_bottom_right,rgba(255,255,255,0)_0%,rgba(255,255,255,0)_45%,rgba(255,255,255,0.5)_48%,rgba(255,255,255,0)_50%,rgba(255,255,255,0)_100%)] rotate-[30deg] animate-[shine_3s_infinite_linear]"></div>
          </div>
        </div>
        
        <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
          {statedata.map((element, index) => (
            <div 
              key={index} 
              className="bg-gradient-to-r from-amber-50 to-white rounded-xl p-4 sm:p-5 shadow-md border border-amber-100 hover:shadow-lg transition-shadow"
            >
              <div className="flex flex-col md:flex-row gap-4 sm:gap-6">
                {/* Product Image */}
                <div className="w-full md:w-24 h-24 rounded-lg bg-gradient-to-br from-amber-100 to-amber-200 flex items-center justify-center shadow-inner overflow-hidden">
                  <img 
                    className="w-full h-full object-cover"
                    src={DecodeImageUrl(element.product.item_photo)} 
                    alt={element.product.productname}
                  />
                </div>
                
                {/* Product details */}
                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 sm:gap-4">
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-gray-800">{element.product.productname}</h3>
                      <div className="flex flex-wrap gap-2 mt-1">
                        <p className="text-sm sm:text-base text-gray-600">
                          <span className="font-medium">Price:</span> ₹{element.product.price}
                        </p>
                        {element.product.offer_price && (
                          <p className="text-sm sm:text-base text-gray-600">
                            <span className="font-medium">Offer Price:</span> ₹{element.product.offer_price}
                          </p>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex flex-col items-start md:items-end">
                      <p className="text-xs sm:text-sm text-gray-500">{element.ordered_at}</p>
                    </div>
                  </div>
                  
                  <div className="mt-3 sm:mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4">
                    <div>
                      <p className="text-sm sm:text-base text-gray-600">
                        <span className="font-medium">Qty:</span> {element.quantity}
                      </p>
                    </div>
                    
                    <div className="text-right">
                      {element.product.offer_price ? (
                        <>
                          <p className="text-sm sm:text-base text-gray-600">
                            <span className="font-medium">Total:</span> ₹{element.product.offer_price * element.quantity}
                          </p>
                          <p className="text-xs text-gray-400 line-through">
                            ₹{element.product.price * element.quantity}
                          </p>
                        </>
                      ) : (
                        <p className="text-sm sm:text-base text-gray-600">
                          <span className="font-medium">Total:</span> ₹{element.product.price * element.quantity}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <Toaster position='bottom-right'/>
    </div>
  );
};

export default OrderDetail;