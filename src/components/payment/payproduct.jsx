import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
const apiUrl = import.meta.env.VITE_API_URL;
import  DecodeImageUrl  from "../../utils/decordeurl";


function PayProduct() {
  const navigate = useNavigate();
  const [isGlowing, setIsGlowing] = useState(false);
  const [address, setAddress] = useState({});
  const [product, setProduct] = useState({});
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const { cartid } = useParams();

  useEffect(() => {
    getAddress();
    const interval = setInterval(() => {
      setIsGlowing((prev) => !prev);
    }, 1500);
    return () => clearInterval(interval);

  }, []);

  useEffect(() => {



    if (cartid !== "0") {
      getProductDetails(cartid);
    } else {
      getCartItems();
    }
  }, [cartid]);

  const getCartItems = async () => {
    const token = localStorage.getItem("access");
    try {
      const res = await axios.get(`${apiUrl}/cart/CartViewByUser/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCartItems(res.data);

      // ✅ Calculate total
      const totalAmount = res.data.reduce((sum, item) => {
        const offerPrice = item.product.offer_price ?? 0;
        const quantity = item.quantity ?? 1;
        return sum + offerPrice * quantity;
      }, 0);
      setTotal(totalAmount);
    } catch (e) {
      console.error("Error fetching cart data", e);
    }
  };

  const getAddress = async () => {
    const token = localStorage.getItem("access");
    try {
      const res = await axios.get(`${apiUrl}/orders/UseraddressGet`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAddress(res.data[0]);
    } catch (e) {
      console.error("Failed to fetch address", e);
    }
  };

  const getProductDetails = async (id) => {
    const token = localStorage.getItem("access");
    try {
      const res = await axios.get(`${apiUrl}/products/ViewSpecificProduct/${id}/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProduct(res.data);
    } catch (e) {
      console.error("Failed to fetch product", e);
    }
  };

  const handlePayClick = async () => {
    try {
      const amountToSend = cartid === "0" ? total : product.offer_price || 0;
      // const res = await axios.post("http://127.0.0.1:8000/payments/create-order/", {
      const res = await axios.post(`${apiUrl}/payments/create-order/`, {amount: amountToSend});

      const options = {
        key: res.data.key,
        amount: res.data.amount,
        currency: res.data.currency,
        name: "Your Store Name",
        description: "Test Transaction",
        order_id: res.data.id,
        handler: async function (response) {
          
          // await axios.post("http://127.0.0.1:8000/payments/verify-payment/", response);
          await axios.post(`${apiUrl}/payments/verify-payment/`, response);
          console.log("Payment Verified");

          // Order API
          const token = localStorage.getItem("access");

          try {
            if (cartid !== "0") {

              await axios.post(`${apiUrl}/orders/OrderOneProductView/${cartid}/`, {}, {
                headers: { Authorization: `Bearer ${token}` },
              });
              toast.success("Your single product was ordered successfully.");
            } else {
              console.log('you carts orderes ',cartid)
              await axios.post(`${apiUrl}/orders/OrderProduct/`, {}, {
                headers: { Authorization: `Bearer ${token}` },
              });
              toast.success("All cart items were ordered successfully.");
            }

            navigate("/cartsection");
          } catch (e) {
            toast.error("Order failed after payment.");
          }
        },
        prefill: {
          name: address.nameofuser || "Customer",
          email: "user@example.com",
          contact: "9999999999",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error("Payment Error:", error);
      toast.error("Payment failed to initialize.");
    }
  };



const itemquantitybull = sessionStorage.getItem("itemquantitybull"); 
const cartitembull = sessionStorage.getItem("cartitembull");
console.log('cart item ',cartitembull,'itemquantity',itemquantitybull)
const quantitybull = itemquantitybull !== null ? Number(itemquantitybull) : 1;
const isCartItembull = cartitembull === "true";

  return (
  <div className="min-h-screen w-full bg-gradient-to-br from-amber-50 to-amber-100 p-4 flex flex-col items-center">
    {/* Back Button with Improved Styling */}
    <div className="w-full max-w-md mb-4">
      <button
        onClick={() => window.history.back()}
        className="group flex items-center text-amber-700 hover:text-amber-800 transition-colors duration-300"
      >
        <div className="bg-white mr-2 p-2 rounded-full group-hover:bg-amber-100 transition-all duration-300 shadow-sm border border-amber-200/50">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
        </div>
        <span className="font-medium text-sm">Back to Shopping</span>
      </button>
    </div>

    {/* Main Checkout Card */}
    <div className="w-full max-w-md bg-white rounded-xl shadow-lg border border-amber-200/50 overflow-hidden">
      {/* Shimmer Effect Container */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-100/30 to-transparent animate-[shimmer_3s_infinite]"></div>
        
        {/* Content */}
        <div className="p-6 relative">
          {/* Product Summary Section */}
          <div className="mb-6 p-4 bg-amber-50 rounded-lg border border-amber-200/50 transition-all hover:shadow-sm">
            {cartid !== "0" ? (
              <div className="flex items-center">
                <div className="relative h-16 w-16 flex-shrink-0">
                  <img
                    src={DecodeImageUrl(product?.item_photo || "")}
                    alt={product?.productname}
                    className="h-full w-full object-cover rounded-md bg-amber-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-amber-900/10 rounded-md"></div>
                </div>
                <div className="ml-4 flex-1">
                  <h3 className="font-medium text-gray-800">{product.productname}</h3>
                  <div className="flex items-center mt-1">
                    <span className="text-gray-500 text-sm line-through mr-2">₹{product.price}</span>
                    <span className="text-amber-600 font-bold">
                      ₹{product.offer_price}
                      <span className="text-xs bg-amber-100 text-amber-600 px-1.5 py-0.5 rounded-full ml-2">
                        {Math.round((1 - product.offer_price/product.price) * 100)}% OFF
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-2">
                <span className="inline-block bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm font-medium">
                  Ordering All Cart Items
                </span>
              </div>
            )}
          </div>

          {/* Address Section */}
          <div className="mb-6 p-4 bg-amber-50 rounded-lg border border-amber-200/50">
            <h3 className="font-medium text-gray-700 mb-3 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Shipping Address
            </h3>
            <div className="text-gray-600 text-sm">
              <p className="font-medium text-gray-800">{address?.nameofuser || "User"}</p>
              <p className="mt-1">
                {address?.houseno_buildingname || "-"}, {address?.Roadname || "-"},<br />
                {address?.city || "-"}, {address?.state || "-"} - {address?.pincode || "-"}
              </p>
            </div>
          </div>

          {/* Total Section */}
          <div className="mb-6 p-4 bg-amber-50 rounded-lg border border-amber-200/50">
            <div className="flex justify-between items-center">
              <span className="font-medium text-gray-700">Order Total</span>
              <span className="font-bold text-lg text-amber-600">
                ₹{cartid === "0" ? total : product.offer_price*quantitybull || 0}
              </span>
            </div>
          </div>

          {/* Payment Options */}
          <div className="mb-6">
            <h3 className="font-medium text-gray-700 mb-3">Payment Method</h3>
            <div className="grid grid-cols-3 gap-2">
              <button 
                className={`p-2 rounded-lg border-2 ${isGlowing ? 'border-blue-400 bg-blue-50 ring-1 ring-blue-200' : 'border-gray-200 hover:border-blue-300'} transition-all flex flex-col items-center`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mb-1 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
                <span className="text-xs">Card</span>
              </button>
              <button 
                className={`p-2 rounded-lg border-2 ${isGlowing ? 'border-purple-400 bg-purple-50 ring-1 ring-purple-200' : 'border-gray-200 hover:border-purple-300'} transition-all flex flex-col items-center`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mb-1 text-purple-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5 3a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V5a2 2 0 00-2-2H5zm0 2h10v7h-2l-1 2H8l-1-2H5V5z" clipRule="evenodd" />
                </svg>
                <span className="text-xs">UPI</span>
              </button>
              <button 
                className={`p-2 rounded-lg border-2 ${isGlowing ? 'border-green-400 bg-green-50 ring-1 ring-green-200' : 'border-gray-200 hover:border-green-300'} transition-all flex flex-col items-center`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mb-1 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-xs">COD</span>
              </button>
            </div>
          </div>

          {/* Confirm Button */}
          <div className={`p-1 rounded-xl ${isGlowing ? 'bg-gradient-to-r from-amber-100 via-amber-50 to-amber-100' : 'bg-amber-100'} transition-all duration-300 border border-amber-200/50`}>
            <button 
              onClick={handlePayClick} 
              className="w-full py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-bold rounded-lg shadow hover:shadow-md transition-all transform hover:scale-[1.01] flex items-center justify-center relative overflow-hidden"
            >
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-white/50 to-white/20 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative z-10 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Confirm and Pay ₹{cartid === "0" ? total : product.offer_price*quantitybull || 0}
              </span>
            </button>
          </div>

          {/* Security Badge */}
          <div className="mt-4 text-center">
            <div className="inline-flex items-center text-xs text-amber-700 bg-amber-100/50 px-3 py-1 rounded-full border border-amber-200/50">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
              Secure Payment with Razorpay
            </div>
          </div>
        </div>
      </div>
    </div>

    <Toaster position="bottom-center" />
  </div>
);
}

export default PayProduct;
