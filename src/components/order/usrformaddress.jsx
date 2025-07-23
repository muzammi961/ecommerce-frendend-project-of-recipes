import bgimage from '../../assets/backgroundImage.jpg';
import { useReducer,useEffect } from 'react';
import toast,{Toaster} from 'react-hot-toast';
import axios from 'axios';
function Userformaddress() {
let token=localStorage.getItem('access')  
let useReducefunc=(state,action)=>{
  return {...state,[action.name]:action.value}
}
useEffect(()=>{

},[])

let [state,dispatch]=useReducer(useReducefunc,{nameofuser:'',phonenumber:'',pincode:'',state:'',city:'',houseno_buildingname:'',Roadname:''})

let submitButton=async(e)=>{
  e.preventDefault()
  console.log('state   ',state)
  try{
   let postaddress=await axios.post('http://127.0.0.1:8000/orders/UserformAddress',state,{
          headers:{
            Authorization:`Bearer ${token}`
          }
  });
  toast.success('address posted sucsssfully...')
  }catch(e){
  toast.error('you got the error from the add the address')
  }

  
}

  return (
    <div className="min-h-screen bg-fixed bg-cover bg-center flex items-center justify-center"style={{ backgroundImage: `url(${bgimage})` }}>
      <div className="w-full max-w-2xl bg-white bg-opacity-90 shadow-lg rounded-lg p-8">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Order Address Form</h2>

        <form className="space-y-4" onSubmit={submitButton}>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Name</label> 
            <input onChange={(e)=>dispatch({name:'nameofuser',value:e.target.value})} type="text" name="nameofuser" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400" />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Phone Number</label>
            <input onChange={(e)=>dispatch({name:'phonenumber',value:e.target.value})} type="tel" name="phonenumber" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400" />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Pincode</label>
            <input onChange={(e)=>dispatch({name:'pincode',value:e.target.value})} type="number" name="pincode" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400" />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">State</label>
            <input onChange={(e)=>dispatch({name:'state',value:e.target.value})} type="text" name="state" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400" />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">City</label>
            <input onChange={(e)=>dispatch({name:'city',value:e.target.value})} type="text" name="city" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"/>
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">House No / Building Name</label>
            <input onChange={(e)=>dispatch({name:'houseno_buildingname',value:e.target.value})} type="text" name="houseno_buildingname" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"  />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Road Name / Area</label>
            <input onChange={(e)=>dispatch({name:'Roadname',value:e.target.value})} type="text" name="Roadname" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"/>
          </div>

          <div className="text-center">
            <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg">Submit Order</button></div>
        </form>
      </div>
      <Toaster position='bottom-right'/>
    </div>
    
  );

}
export default Userformaddress;  