import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
function PayProduct() {
  let navigation=useNavigate()
  const [isGlowing, setIsGlowing] = useState(false);
  const [address, setAddress] = useState({});
  const [product, setProduct] = useState({});
  const { cartid } = useParams();

  useEffect(() => {
    getProductDetails(cartid);
    getAddress();
    const interval = setInterval(() => {
      setIsGlowing(prev => !prev);
    }, 1500);
    return () => clearInterval(interval);
  }, [cartid]);

  const getAddress = async () => {
    const token = localStorage.getItem('access');
    try {
      const response = await axios.get("http://127.0.0.1:8000/orders/UseraddressGet", {
        headers: { Authorization: `Bearer ${token}` },  
      });
      setAddress(response.data[0]);
    } catch (e) {
      console.error("Failed to fetch address", e);
    }
  };

  const getProductDetails = async (id) => {
    const token = localStorage.getItem('access');
    try {
      const response = await axios.get(`http://127.0.0.1:8000/products/ViewSpecificProduct/${id}/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProduct(response.data);
    } catch (e) {
      console.error("Failed to fetch product", e);
    }
  };

  const handlePayClick = async () => {
    try {
      const res = await axios.post("http://127.0.0.1:8000/payments/create-order/", {
        amount: product.offer_price,
      });

      const options = {
        key: res.data.key,
        amount: res.data.amount,
        currency: res.data.currency,
        name: "Your Store Name",
        description: "Test Transaction",
        order_id: res.data.id, 
        handler: async function (response) {
          alert("Payment ID: " + response.razorpay_payment_id);
          alert("Order ID: " + response.razorpay_order_id);
          alert("Signature: " + response.razorpay_signature);

          await axios.post("http://127.0.0.1:8000/payments/verify-payment/", response);
          console.log('verify worked ');
 
// order func

          let orderoneproduct=async()=>{
          let token=localStorage.getItem('access')
          console.log('cart id is ',cartid)
          try{
          await axios.post(`http://127.0.0.1:8000/orders/OrderOneProductView/${cartid}/`,{},{headers:{Authorization:`Bearer ${token}`}})
          toast.success('your order completed.....')
          }catch(e){
          toast.error('you got error when order the product....')
         }
         }

          orderoneproduct()
          navigation('/cartsection')
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
    }
  };












  return (
    <div className="max-w-md mx-auto p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl shadow-lg border border-gray-200">
      {/* Product & Address Section */}
      <div className="flex items-center mb-6 p-4 bg-white rounded-lg shadow-sm">
        <img src={`http://127.0.0.1:8000${product?.item_photo || ""}`} alt={product?.productname} className="w-20 h-20 bg-gray-200 rounded-md mr-4" />
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
      </div>

      <div className="mb-6 p-4 bg-white rounded-lg shadow-sm">
        <h3 className="font-medium text-gray-700 mb-2">Shipping Address</h3>
        <div className="text-gray-600">
          <p className="font-medium">{address?.nameofuser}</p>
          <p>
            House: {address?.houseno_buildingname}, Road: {address?.Roadname},<br />
            City: {address?.city}, State: {address?.state} - Pin: {address?.pincode}
          </p>
        </div>
      </div>

      <div className="mb-6 p-4 bg-white rounded-lg shadow-sm">
        <div className="flex justify-between items-center">
          <span className="font-medium text-gray-700">TOTAL</span>
          <span className="font-bold text-lg">₹{product.offer_price}</span>
        </div>
      </div>

      <div className="mb-6 p-4 bg-white rounded-lg shadow-sm">
        <div className="flex space-x-4 mb-4">
          <button className={`px-4 py-2 rounded-lg border-2 ${isGlowing ? 'border-blue-300 bg-blue-50' : 'border-gray-200'} transition-all`}>Card</button>
          <button className={`px-4 py-2 rounded-lg border-2 ${isGlowing ? 'border-purple-300 bg-purple-50' : 'border-gray-200'} transition-all`}>UPI</button>
          <button className={`px-4 py-2 rounded-lg border-2 ${isGlowing ? 'border-green-300 bg-green-50' : 'border-gray-200'} transition-all`}>COD</button>
        </div>
      </div>

      <div className={`p-1 rounded-xl ${isGlowing ? 'bg-gradient-to-r from-blue-100 via-purple-100 to-blue-100' : 'bg-gray-100'} transition-all duration-1000`}>
        <button onClick={handlePayClick} className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-[1.01]">
          ✅ Confirm and Pay ₹{product.offer_price}
        </button>
      </div>

      <div className="mt-3 text-center text-xs text-gray-500 flex items-center justify-center">
        <span className="mr-1">🔒</span> Secure Payment with Razorpay
      </div>
      <Toaster position="bottom-right"/>
    </div>
  );
}

export default PayProduct;
