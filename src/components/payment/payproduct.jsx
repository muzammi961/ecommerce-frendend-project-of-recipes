import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

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
      const res = await axios.get("http://127.0.0.1:8000/cart/CartViewByUser/", {
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
      const res = await axios.get("http://127.0.0.1:8000/orders/UseraddressGet", {
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
      const res = await axios.get(`http://127.0.0.1:8000/products/ViewSpecificProduct/${id}/`, {
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

      const res = await axios.post("http://127.0.0.1:8000/payments/create-order/", {
        amount: amountToSend,
      });

      const options = {
        key: res.data.key,
        amount: res.data.amount,
        currency: res.data.currency,
        name: "Your Store Name",
        description: "Test Transaction",
        order_id: res.data.id,
        handler: async function (response) {
          await axios.post("http://127.0.0.1:8000/payments/verify-payment/", response);
          console.log("Payment Verified");

          // Order API
          const token = localStorage.getItem("access");

          try {
            if (cartid !== "0") {
              await axios.post(`http://127.0.0.1:8000/orders/OrderOneProductView/${cartid}/`, {}, {
                headers: { Authorization: `Bearer ${token}` },
              });
              toast.success("Your single product was ordered successfully.");
            } else {
              await axios.post("http://127.0.0.1:8000/orders/OrderProduct/", {}, {
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

  return (
    <div className="max-w-md mx-auto p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl shadow-lg border border-gray-200">
      {/* Product or Cart Summary */}
      <div className="flex items-center mb-6 p-4 bg-white rounded-lg shadow-sm">
        {cartid !== "0" ? (
          <>
            <img
              src={`http://127.0.0.1:8000${product?.item_photo || ""}`}
              alt={product?.productname}
              className="w-20 h-20 bg-gray-200 rounded-md mr-4"
            />
            <div className="flex-1">
              <h3 className="font-medium text-gray-800">{product.productname}</h3>
              <div className="flex items-center mt-1">
                <span className="text-gray-500 line-through mr-2">₹{product.price}</span>
                <span className="text-red-600 font-bold">
                  ₹{product.offer_price}
                  <span className="text-xs bg-red-100 text-red-600 px-1 py-0.5 rounded ml-1">..</span>
                </span>
              </div>
            </div>
          </>
        ) : (
          <div className="text-gray-700 font-semibold">Ordering All Cart Items</div>
        )}
      </div>

      {/* Address */}
      <div className="mb-6 p-4 bg-white rounded-lg shadow-sm">
        <h3 className="font-medium text-gray-700 mb-2">Shipping Address</h3>
        <div className="text-gray-600">
          <p className="font-medium">{address?.nameofuser || "User"}</p>
          <p>
            House: {address?.houseno_buildingname || "-"}, Road: {address?.Roadname || "-"},<br />
            City: {address?.city || "-"}, State: {address?.state || "-"} - Pin: {address?.pincode || "-"}
          </p>
        </div>
      </div>

      {/* Total */}
      <div className="mb-6 p-4 bg-white rounded-lg shadow-sm">
        <div className="flex justify-between items-center">
          <span className="font-medium text-gray-700">TOTAL</span>
          <span className="font-bold text-lg">
            ₹{cartid === "0" ? total : product.offer_price || 0}
          </span>
        </div>
      </div>

      {/* Payment Options */}
      <div className="mb-6 p-4 bg-white rounded-lg shadow-sm">
        <div className="flex space-x-4 mb-4">
          <button className={`px-4 py-2 rounded-lg border-2 ${isGlowing ? 'border-blue-300 bg-blue-50' : 'border-gray-200'} transition-all`}>Card</button>
          <button className={`px-4 py-2 rounded-lg border-2 ${isGlowing ? 'border-purple-300 bg-purple-50' : 'border-gray-200'} transition-all`}>UPI</button>
          <button className={`px-4 py-2 rounded-lg border-2 ${isGlowing ? 'border-green-300 bg-green-50' : 'border-gray-200'} transition-all`}>COD</button>
        </div>
      </div>

      {/* Confirm Button */}
      <div className={`p-1 rounded-xl ${isGlowing ? 'bg-gradient-to-r from-blue-100 via-purple-100 to-blue-100' : 'bg-gray-100'} transition-all duration-1000`}>
        <button onClick={handlePayClick} className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-[1.01]">
          ✅ Confirm and Pay ₹{cartid === "0" ? total : product.offer_price || 0}
        </button>
      </div>

      <div className="mt-3 text-center text-xs text-gray-500 flex items-center justify-center">
        <span className="mr-1">🔒</span> Secure Payment with Razorpay
      </div>

      <Toaster position="bottom-right" />
    </div>
  );
}

export default PayProduct;
