import { useParams } from "react-router-dom";
import { useEffect, useReducer, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
const apiUrl = import.meta.env.VITE_API_URL;

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
  navigation(`/PayProduct/${cartid}`)
}




  return (
    <>
      {isViewMode ? (
        <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
          <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden mt-8 mb-8 border border-amber-100">
            {/* Vibrant Header matching FoodieZone theme */}
            <div className="bg-gradient-to-r from-amber-500 to-amber-600 p-6">
              <h1 className="text-2xl font-bold text-white">Order Summary</h1>
            </div>

            <div className="p-6">
              <div className="flex flex-col md:flex-row items-start gap-6 pb-6 mb-6 border-b border-amber-100">
                <div className="relative">
                  <img
                     src={cartid !== "0" ? `http://127.0.0.1:8000${product?.item_photo || ""}` : ""}
                    alt={product?.productname || "No Product"}
                     className="w-32 h-32 object-cover rounded-xl border-2 border-white shadow-lg"
                    />

                  <div className="absolute -top-2 -right-2 bg-amber-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold shadow-md">
                    1
                  </div>
                </div>

                <div className="flex-1">
                  <h2 className="text-xl font-bold text-gray-800">
                   {cartid !== "0" ? product?.productname : "No product selected"}
                  </h2>
                  <p className="text-sm text-amber-600 mb-3">
                    {product?.category || "N/A"}
                  </p>
                  
                  <div className="flex items-center gap-4 mt-2">
                    <span className="text-sm font-medium text-gray-600">Quantity:</span>
                    <div className="flex items-center border border-amber-200 rounded-lg bg-amber-50">
                      <button className="px-3 py-1 text-lg font-semibold text-amber-600 hover:bg-amber-100">−</button>
                      <span className="px-4 py-1 text-base font-medium text-gray-800">1</span>
                      <button className="px-3 py-1 text-lg font-semibold text-amber-600 hover:bg-amber-100">+</button>
                    </div>
                  </div>

                  <div className="mt-4">
                    <p className="text-xl font-bold text-green-600">
                       ₹{cartid !== "0" ? (product?.offer_price || product?.price || "0") : "0"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Address View with amber theme */}
              <div className="bg-amber-50 p-6 rounded-xl border border-amber-100 mb-8">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold text-amber-800">Delivery Address</h2>
                  <button 
                    onClick={handleToggle}
                    className="bg-gradient-to-r from-amber-500 to-amber-600 text-white px-4 py-2 rounded-lg hover:from-amber-600 hover:to-amber-700 transition-all shadow-md"
                  >
                    Update Address
                  </button>
                </div>
                
                <div className="space-y-3 text-gray-700">
                  <p className="flex items-center gap-2">
                    <span className="font-semibold text-amber-700">Name:</span> 
                    <span>{address?.nameofuser || "N/A"}</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="font-semibold text-amber-700">Phone:</span> 
                    <span>{address?.phonenumber || "N/A"}</span>
                  </p>
                  <p className="flex items-start gap-2">
                    <span className="font-semibold text-amber-700 mt-1">Address:</span> 
                    <span>
                      {address?.houseno_buildingname}, {address?.Roadname}<br/>
                      {address?.city}, {address?.state} - {address?.pincode}
                    </span>
                  </p>
                </div>
              </div>

              {/* Payment Summary */}
              <div className="bg-white p-6 rounded-xl border border-amber-100 shadow-sm">
                <h2 className="text-xl font-bold text-amber-800 mb-4">Payment Summary</h2>
                
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Product Price</span>
                    <span className="font-medium">₹{product?.offer_price || product?.price || "0"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Delivery</span>
                    <span className="font-medium text-green-500">FREE</span>
                  </div>
                </div>

                <div className="border-t border-amber-100 pt-4 mb-6">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total Amount</span>
                    <span className="text-green-600">₹{product?.offer_price || product?.price || "0"}</span>
                  </div>
                </div>

                <button onClick={paymentbutton} className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-white py-3 rounded-lg font-bold hover:from-amber-600 hover:to-amber-700 transition-all shadow-lg">
                  Proceed to Pay
                </button>
              </div>
            </div>
          </div>
          <Toaster position="bottom-right" />
        </div>
      ) : (
        <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white flex items-center justify-center p-6">
          <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl overflow-hidden border border-amber-100">
            {/* Vibrant Header */}
            <div className="bg-gradient-to-r from-amber-500 to-amber-600 p-6">
              <h2 className="text-xl font-bold text-white">Update Delivery Address</h2>
            </div>

            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-amber-700 mb-1">Name</label>
                  <input
                    type="text"
                    onChange={(e) => setUpaddress({ name: 'nameofuser', value: e.target.value })}
                    className="w-full p-3 border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-transparent bg-white"
                    placeholder="Your Name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-amber-700 mb-1">Phone Number</label>
                  <input
                    type="number"
                    onChange={(e) => setUpaddress({ name: 'phonenumber', value: e.target.value })}
                    className="w-full p-3 border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-transparent bg-white"
                    placeholder="Phone Number"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-amber-700 mb-1">Pincode</label>
                  <input
                    type="number"
                    onChange={(e) => setUpaddress({ name: 'pincode', value: e.target.value })}
                    className="w-full p-3 border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-transparent bg-white"
                    placeholder="Pincode"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-amber-700 mb-1">State</label>
                  <input
                    type="text"
                    onChange={(e) => setUpaddress({ name: 'state', value: e.target.value })}
                    className="w-full p-3 border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-transparent bg-white"
                    placeholder="State"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-amber-700 mb-1">City</label>
                  <input
                    type="text"
                    onChange={(e) => setUpaddress({ name: 'city', value: e.target.value })}
                    className="w-full p-3 border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-transparent bg-white"
                    placeholder="City"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-amber-700 mb-1">House/Building</label>
                <input
                  type="text"
                  onChange={(e) => setUpaddress({ name: 'houseno_buildingname', value: e.target.value })}
                  className="w-full p-3 border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-transparent bg-white"
                  placeholder="House No/Building Name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-amber-700 mb-1">Road/Area</label>
                <input
                  type="text"
                  onChange={(e) => setUpaddress({ name: 'Roadname', value: e.target.value })}
                  className="w-full p-3 border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-transparent bg-white"
                  placeholder="Road Name/Area"
                  required
                />
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  onClick={updatetheaddress}
                  className="flex-1 bg-gradient-to-r from-amber-500 to-amber-600 text-white py-3 rounded-lg font-bold hover:from-amber-600 hover:to-amber-700 transition-all shadow-md"
                >
                  Save Address
                </button>
                <button
                  onClick={handleToggle}
                  className="flex-1 bg-gradient-to-r from-gray-500 to-gray-600 text-white py-3 rounded-lg font-bold hover:from-gray-600 hover:to-gray-700 transition-all shadow-md"
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