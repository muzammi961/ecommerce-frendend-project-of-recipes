import axios from "axios";

function RazorpayButton() {
  // const handlePayment = async () => {
  //   const res = await axios.post("http://localhost:8000/create-order/", { amount },);

  //   const options = {
  //     key: res.data.key,
  //     amount: res.data.amount,
  //     currency: res.data.currency,
  //     name: "Your Store Name",
  //     description: "Test Transaction",
  //     order_id: res.data.id,
  //     handler: function (response) {
  //       alert("Payment ID: " + response.razorpay_payment_id);
  //       alert("Order ID: " + response.razorpay_order_id);
  //       alert("Signature: " + response.razorpay_signature);
  //       // You can verify payment via backend here
  //     },
  //     prefill: {
  //       name: "Your Name",
  //       email: "user@example.com",
  //       contact: "9999999999"
  //     },
  //     theme: {
  //       color: "#3399cc"
  //     }
  //   };

  //   const razorpay = new window.Razorpay(options);
  //   razorpay.open();
  // };

  return (
    <button  className="bg-blue-500 text-white px-4 py-2 rounded">
      Pay ₹
    </button>
  );
}

export default RazorpayButton;
