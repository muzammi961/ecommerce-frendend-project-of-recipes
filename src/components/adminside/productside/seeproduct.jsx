import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import bgimage from '../../../assets/backgroundImage.jpg';
import toast, { Toaster } from 'react-hot-toast';
// import Ordersection from '../order/ordersection';

function Seeproducts() {
  let navigation=useNavigate()
  const [cartItems, setCartItems] = useState([]);
  const token = localStorage.getItem('access');


  useEffect(() => {
    getCartData();
  }, []);






  const getCartData = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/adminside/GetallProducts/', {
        headers: { Authorization: `Bearer ${token}` },
      });
 
      // console.log(response.data)
      console.log('..............',response.data[0].productname)
      setCartItems(response.data);
    } catch (error) {
      console.error('Failed to fetch cart data:', error);
    //   toast.error('Failed to load cart');
    }
  };

let updatefunc=(update_id)=>{
  console.log('id is ',update_id)
  navigation(`/AdminUpdateProducts/${update_id}`)
}

let deletproduct=async(id)=>{
  let token=localStorage.getItem('access')
  console.log(id)
  try{
  await axios.delete(`http://127.0.0.1:8000/adminside/DeleteaProduct/${id}/`,{
   headers: {Authorization: `Bearer ${token}`,},})
   toast.success('delete successfully....')
   setCartItems((prevProducts) => prevProducts.filter((item) => item.id !== id));
  }catch(e){
    toast.error('somthing went error....',e)
  }
};


  return (
    <>
        <div style={{ backgroundImage: `url(${bgimage})` }}className="bg-center bg-cover min-h-screen bg-no-repeat p-6">
          <h2 className="text-2xl font-bold mb-6 text-white">All Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-40">
            {cartItems.map((item, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-2xl p-4 shadow hover:scale-105 transition-transform duration-300">
                <img src={`http://127.0.0.1:8000${item.item_photo}`} alt={item.productname} className="w-full h-48 object-cover rounded-xl mb-4"/>
                <h2 className="text-xl font-bold text-black mb-2">{item.productname}</h2>
                <div className="text-gray-800 mb-3">
                  <p className="line-through text-sm text-red-400">₹{item.price}</p>
                  <p className="text-lg font-bold text-green-600">₹{item.offer_price}</p>

                  <div className="flex justify-between gap-3">
                   <button className=" w-full mt-3 px-4 py-2 bg-black text-amber-50 hover:bg-amber-300" onClick={(e)=>deletproduct(item.id)}>delete</button>
                <button onClick={()=>updatefunc(item.id)} className="mt-3 w-full bg-black text-white px-4 py-2 rounded hover:bg-amber-500 transition">Edit Product</button>
                 
                </div>

                </div>  

                
              </div>))}
              <Toaster position='bottom-right'/>
          </div>
        </div>
    </>
  );
}

export default Seeproducts;
