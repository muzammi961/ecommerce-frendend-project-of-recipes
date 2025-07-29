import axios from "axios";
import { useEffect,useState } from "react";
import bgimage from '../../assets/backgroundImage.jpg' 
import { useNavigate } from "react-router-dom";
import toast,{ Toaster } from "react-hot-toast";
function Ordersection(){
let navigation=useNavigate()  
let [orderproduct,setProduct]=useState([])
useEffect(()=>{
let OrderProductfunc=async()=>{
let token=localStorage.getItem('access')
try{
let value=await axios.get('http://127.0.0.1:8000/orders/OrderDetile/',{
  headers:{
    Authorization:`Bearer ${token}`
  }
})
setProduct(value.data)
}catch(e){
  console.log('error...')
}
}
OrderProductfunc()
},[])

console.log('OrderProductfunc',orderproduct)

// let OrderformCheck=()=>{
// navigation('/Userformaddress')
// }




const OrderformCheck = async () => {
  try {
    let token=localStorage.getItem('access')
    let urldata = await axios.get('http://127.0.0.1:8000/orders/UseraddressGet',{ headers:{Authorization:`Bearer ${token}`}});
    if (!urldata.data[0]?.nameofuser) {
       console.log('urls data sss.',urldata.data)
      toast.error('User address not received.');
      toast.success('address section..')
      console.log('addressss')
      navigation(`/Userformaddress/${0}`)
    } else {
      toast.success('order section...')
      console.log('you clikedd')
      navigation('/Ordersection')
    }
  } catch (e) {
    toast.error('Cart is empty!');
    console.log('Error:', e);
  }
};






let totalprice=orderproduct.reduce((acc,item)=>acc + item.product.offer_price*item.quantity,0 )
console.log('count is ,,,',totalprice)



    return(<div style={{backgroundImage:`url(${bgimage})`}} className="bg-fixed  bg-center bg-cover bg-no-repeat">
<div  class="shadow rounded-lg p-4 mb-6">
<h2 class="text-xl font-semibold mb-4">Your Cart</h2>
{orderproduct.map((element,index)=>(<div class="w-full max-w-4xl mx-auto p-4">
    <div class="space-y-3">
      <img className="w-2xs" src={`http://127.0.0.1:8000${element.product.item_photo}`} alt={element.product.productname} />
      <div class="flex justify-between items-center border-b-4 border-amber-50 pb-2">
        <div>
          <h3 class="font-medium text-white">{element.product.productname}</h3>
          <p class="text-sm text-white">{element.quantity} x {element.product.offer_price}</p>
        </div>
        <span class="text-white font-semibold"> ₹	: {element.quantity*element.product.offer_price}</span>
      </div>
    </div>
  </div>
  ))}
  <div class=" text-amber-50 p-6 rounded-lg shadow-md backdrop-blur-2xl border-amber-50 border-2  sticky bottom-0">
    <h2 class="text-lg font-bold mb-4">Order Summary</h2>

    <div class="space-y-2">
      <div class="flex justify-between">
        <span>Subtotal</span>
        <span class="font-medium">₹310</span>
      </div>
      <div class="flex justify-between">
        <span>Delivery Charges</span>
        <span class="font-medium">₹40</span>
      </div>
      <div class="flex justify-between text-green-600 font-semibold">
        <span>Total</span>
        <span>₹	 :{totalprice}</span>
      </div>
    </div>

    <button onClick={OrderformCheck} class="mt-6 w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition">Place Order</button>
   
  </div>
  
</div>
<Toaster position="bottom-right"/>

</div>)
}
export default Ordersection;