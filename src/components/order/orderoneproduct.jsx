import { useParams } from "react-router-dom";
import { useEffect, useReducer, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
const apiUrl = import.meta.env.VITE_API_URL;
import  DecodeImageUrl  from "../../utils/decordeurl";

function OrderOneProduct() {
  let navigation = useNavigate();
  const [address, setAddress] = useState({});
  const [product, setProduct] = useState({});
  const [isViewMode, setIsViewMode] = useState(true);
  const [cartItems, setCartItems] = useState();

  const { cartid } = useParams();
  const token = localStorage.getItem("access");
  const handleToggle = () => setIsViewMode(!isViewMode);

useEffect(() => {
  console.log("Cart ID from URL:", cartid);
  if (cartid !== "0") {
    getAddress();
    getProductDetails(cartid);
  }
}, [cartid]);







  const getAddress = async () => {
    try {
      const response = await axios.get(`${apiUrl}/orders/UseraddressGet`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAddress(response.data[0]);
    } catch (e) {
      console.error("Failed to fetch address", e);
    }
  };

  const getProductDetails = async (id) => {
    try {
        const response = await axios.get(`${apiUrl}/products/ViewSpecificProduct/${id}/`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setProduct(response.data);
    } catch (e) {
      console.error("Failed to fetch product", e);
    }
  };

  let useReducerfunc = (state, action) => {
    return { ...state, [action.name]: action.value };
  };

  let [upaddres, setUpaddress] = useReducer(useReducerfunc, {
    nameofuser: '',
    phonenumber: '',
    pincode: '',
    state: '',
    city: '',
    houseno_buildingname: '',
    Roadname: ''
  });

  let updatetheaddress = async () => {
    try {
      await axios.put(`${apiUrl}/orders/UpdateUserAddress/`, upaddres, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success('Address updated successfully!');
      setIsViewMode(true);
    } catch (e) {
      toast.error('Failed to update address');
    }
  };

let paymentbutton=()=>{
  console.log('cart id is  ',cartid)
  navigation(`/PayProduct/${cartid}`)
}


// sessionStorage.setItem("itemquantity",itemquantity);
const itemquantitybull = sessionStorage.getItem("itemquantitybull"); 
const cartitembull = sessionStorage.getItem("cartitembull");
console.log('cart item ',cartitembull,'itemquantity',itemquantitybull)
const quantitybull = itemquantitybull !== null ? Number(itemquantitybull) : 1;
const isCartItembull = cartitembull === "true";

  return (
 <>
      {isViewMode ? (
        <div className="min-h-screen bg-gradient-to-br from-amber-50 to-amber-100 p-4 sm:p-6">
          {/* Back Button inside the form */}
          <button
            onClick={() => window.history.back()}
            className="mb-4 sm:mb-6 flex items-center space-x-2 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full shadow-lg border border-amber-200 hover:shadow-xl transition-all text-sm sm:text-base"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5 text-amber-600" 
              viewBox="0 0 20 20" 
              fill="currentColor"
            >
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            <span className="font-medium text-amber-800">Back to Cart</span>
          </button>

          <div className="max-w-4xl mx-auto">
            {/* Glowing Header */}
            <div className="relative bg-gradient-to-r from-amber-400 to-amber-500 p-6 sm:p-8 rounded-t-2xl shadow-lg overflow-hidden">
              <div className="absolute inset-0 bg-[url('https://assets.website-files.com/5e51b3b0337309d672efd94c/5e51cc5933d36821a19c9d8f_Group%2015.svg')] opacity-20"></div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white relative z-10">Order Summary</h1>
              <div className="absolute -right-8 -top-8 w-24 h-24 sm:w-32 sm:h-32 bg-white/20 rounded-full"></div>
              <div className="absolute -bottom-8 -left-8 w-32 h-32 sm:w-40 sm:h-40 bg-amber-300/20 rounded-full"></div>
            </div>

            {/* Shining Content Card */}
            <div className="bg-white/90 backdrop-blur-sm rounded-b-2xl shadow-xl border border-white/50 overflow-hidden">
              <div className="p-4 sm:p-6 md:p-8">
                {/* Product Card */}
                <div className="flex flex-col md:flex-row items-center gap-6 pb-6 sm:pb-8 mb-6 sm:mb-8 border-b border-amber-100/50">
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-br from-amber-200/30 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <img
                      src={cartid !== "0" ? DecodeImageUrl(product?.item_photo || "") : ""}
                      alt={product?.productname || "No Product"}
                      className="w-32 h-32 sm:w-40 sm:h-40 object-cover rounded-xl border-2 border-white shadow-lg transform group-hover:scale-105 transition-transform"
                    />
                  </div>

                  <div className="flex-1">
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
                      {cartid !== "0" ? product?.productname : "No product selected"}
                    </h2>
                    <p className="text-base sm:text-lg text-gray-600 mt-1 sm:mt-2">Quantity: {!!isCartItembull ? quantitybull : 1}</p>
                    
                    <div className="mt-4 sm:mt-6">
                      <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                        <span className="text-lg sm:text-xl line-through text-gray-400">₹{product?.price}</span>
                        <span className="text-xl sm:text-2xl font-bold text-amber-600">
                          ₹{product?.offer_price || product?.price || "0"}
                        </span>
                        <span className="px-2 sm:px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-xs sm:text-sm font-bold">
                          {Math.round((1 - (product?.offer_price/product?.price)) * 100)}% OFF
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Address Card with Shine Effect */}
                <div className="relative bg-gradient-to-br from-amber-50 to-white p-6 sm:p-8 rounded-xl border border-amber-100/50 mb-6 sm:mb-8 shadow-sm overflow-hidden">
                  <div className="absolute inset-0 bg-[url('https://assets.website-files.com/5e51b3b0337309d672efd94c/5e51cc5933d36821a19c9d8f_Group%2015.svg')] opacity-10"></div>
                  <div className="relative z-10">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 gap-3 sm:gap-0">
                      <h2 className="text-xl sm:text-2xl font-bold text-amber-800 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 sm:h-6 w-5 sm:w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        Delivery Address
                      </h2>
                      <button 
                        onClick={handleToggle}
                        className="bg-gradient-to-r from-amber-500 to-amber-600 text-white px-4 sm:px-6 py-1 sm:py-2 rounded-lg hover:from-amber-600 hover:to-amber-700 transition-all shadow-md hover:shadow-lg flex items-center text-sm sm:text-base"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 sm:h-4 w-3 sm:w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        Update
                      </button>
                    </div>
                    
                    <div className="space-y-3 sm:space-y-4 text-gray-700 text-base sm:text-lg">
                      <p className="flex flex-col sm:flex-row items-start sm:items-center gap-1 sm:gap-3">
                        <span className="font-semibold text-amber-700 min-w-[60px] sm:min-w-[80px]">Name:</span> 
                        <span>{address?.nameofuser || "N/A"}</span>
                      </p>
                      <p className="flex flex-col sm:flex-row items-start sm:items-center gap-1 sm:gap-3">
                        <span className="font-semibold text-amber-700 min-w-[60px] sm:min-w-[80px]">Phone:</span> 
                        <span>{address?.phonenumber || "N/A"}</span>
                      </p>
                      <p className="flex flex-col sm:flex-row items-start gap-1 sm:gap-3">
                        <span className="font-semibold text-amber-700 min-w-[60px] sm:min-w-[80px]">Address:</span> 
                        <span>
                          {address?.houseno_buildingname}, {address?.Roadname}<br/>
                          {address?.city}, {address?.state} - {address?.pincode}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Payment Summary with Glow */}
                <div className="bg-white p-6 sm:p-8 rounded-xl border border-amber-100/50 shadow-sm relative overflow-hidden">
                  <div className="absolute -right-8 -top-8 w-24 h-24 sm:w-32 sm:h-32 bg-amber-200/10 rounded-full"></div>
                  <h2 className="text-xl sm:text-2xl font-bold text-amber-800 mb-4 sm:mb-6 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 sm:h-6 w-5 sm:w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Payment Summary
                  </h2>
                  
                  <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6 text-base sm:text-lg">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Product Price</span>
                      <span className="font-medium">₹{product?.offer_price || product?.price || "0"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Delivery</span>
                      <span className="font-medium text-green-500">FREE</span>
                    </div>
                  </div>

                  <div className="border-t border-amber-100/50 pt-4 sm:pt-6 mb-6 sm:mb-8">
                    <div className="flex justify-between text-lg sm:text-xl font-bold">
                      <span>Total Amount</span>
                      <span className="text-amber-600">₹ {isCartItembull ? (product?.offer_price ?? 0) * (quantitybull ?? 0) : product?.offer_price ?? 0}</span>
                    </div>
                  </div>

                  <button 
                    onClick={paymentbutton} 
                    className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-white py-3 sm:py-4 rounded-lg font-bold hover:from-amber-600 hover:to-amber-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-95 flex items-center justify-center text-sm sm:text-base"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 sm:h-5 w-4 sm:w-5 mr-1 sm:mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                    Proceed to Pay
                  </button>
                </div>
              </div>
            </div>
          </div>
          <Toaster position="bottom-right" />
        </div>
      ) : (
        <div className="min-h-screen bg-gradient-to-br from-amber-50 to-amber-100 flex items-center justify-center p-4 sm:p-6">
          <div className="w-full max-w-2xl bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden border border-white/50">
            {/* Shining Header with Back Button */}
            <div className="relative bg-gradient-to-r from-amber-400 to-amber-500 p-6 sm:p-8 overflow-hidden">
              <button
                onClick={handleToggle}
                className="absolute left-6 top-6 z-10 flex items-center space-x-2 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full shadow-lg border border-white/30 hover:shadow-xl transition-all"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-5 w-5 text-white" 
                  viewBox="0 0 20 20" 
                  fill="currentColor"
                >
                  <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                </svg>
              </button>
              
              <div className="relative z-10 text-center">
                <h2 className="text-xl sm:text-2xl font-bold text-white">Update Delivery Address</h2>
              </div>
              <div className="absolute -right-8 -top-8 w-24 h-24 sm:w-32 sm:h-32 bg-white/20 rounded-full"></div>
            </div>

            <div className="p-4 sm:p-6 md:p-8 space-y-4 sm:space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="block text-base sm:text-lg font-medium text-amber-700 mb-1 sm:mb-2">Name</label>
                  <input
                    type="text"
                    onChange={(e) => setUpaddress({ name: 'nameofuser', value: e.target.value })}
                    className="w-full p-3 sm:p-4 border border-amber-200/50 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-transparent bg-white/50 backdrop-blur-sm text-base sm:text-lg shadow-sm"
                    placeholder="Your Name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-base sm:text-lg font-medium text-amber-700 mb-1 sm:mb-2">Phone Number</label>
                  <input
                    type="number"
                    onChange={(e) => setUpaddress({ name: 'phonenumber', value: e.target.value })}
                    className="w-full p-3 sm:p-4 border border-amber-200/50 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-transparent bg-white/50 backdrop-blur-sm text-base sm:text-lg shadow-sm"
                    placeholder="Phone Number"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                <div>
                  <label className="block text-base sm:text-lg font-medium text-amber-700 mb-1 sm:mb-2">Pincode</label>
                  <input
                    type="number"
                    onChange={(e) => setUpaddress({ name: 'pincode', value: e.target.value })}
                    className="w-full p-3 sm:p-4 border border-amber-200/50 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-transparent bg-white/50 backdrop-blur-sm text-base sm:text-lg shadow-sm"
                    placeholder="Pincode"
                    required
                  />
                </div>
                <div>
                  <label className="block text-base sm:text-lg font-medium text-amber-700 mb-1 sm:mb-2">State</label>
                  <input
                    type="text"
                    onChange={(e) => setUpaddress({ name: 'state', value: e.target.value })}
                    className="w-full p-3 sm:p-4 border border-amber-200/50 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-transparent bg-white/50 backdrop-blur-sm text-base sm:text-lg shadow-sm"
                    placeholder="State"
                    required
                  />
                </div>
                <div>
                  <label className="block text-base sm:text-lg font-medium text-amber-700 mb-1 sm:mb-2">City</label>
                  <input
                    type="text"
                    onChange={(e) => setUpaddress({ name: 'city', value: e.target.value })}
                    className="w-full p-3 sm:p-4 border border-amber-200/50 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-transparent bg-white/50 backdrop-blur-sm text-base sm:text-lg shadow-sm"
                    placeholder="City"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-base sm:text-lg font-medium text-amber-700 mb-1 sm:mb-2">House/Building</label>
                <input
                  type="text"
                  onChange={(e) => setUpaddress({ name: 'houseno_buildingname', value: e.target.value })}
                  className="w-full p-3 sm:p-4 border border-amber-200/50 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-transparent bg-white/50 backdrop-blur-sm text-base sm:text-lg shadow-sm"
                  placeholder="House No/Building Name"
                  required
                />
              </div>

              <div>
                <label className="block text-base sm:text-lg font-medium text-amber-700 mb-1 sm:mb-2">Road/Area</label>
                <input
                  type="text"
                  onChange={(e) => setUpaddress({ name: 'Roadname', value: e.target.value })}
                  className="w-full p-3 sm:p-4 border border-amber-200/50 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-transparent bg-white/50 backdrop-blur-sm text-base sm:text-lg shadow-sm"
                  placeholder="Road Name/Area"
                  required
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 pt-4 sm:pt-6">
                <button
                  onClick={updatetheaddress}
                  className="flex-1 bg-gradient-to-r from-amber-500 to-amber-600 text-white py-3 sm:py-4 rounded-lg font-bold hover:from-amber-600 hover:to-amber-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-95 text-sm sm:text-base"
                >
                  Save Address
                </button>
                <button
                  onClick={handleToggle}
                  className="flex-1 bg-gradient-to-r from-gray-500 to-gray-600 text-white py-3 sm:py-4 rounded-lg font-bold hover:from-gray-600 hover:to-gray-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-95 text-sm sm:text-base"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
          <Toaster position="bottom-right" />
        </div>
      )}
    </>
   
  );
}

export default OrderOneProduct;