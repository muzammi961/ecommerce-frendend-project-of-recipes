import './style/registerpage.css'
import hotellogo from '../../assets/hotellogo.jpg'
import  toast,{Toaster} from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import axios  from 'axios';
import { act, useRef } from 'react';
import { useState } from 'react';
import { useReducer } from 'react';
import { redirect } from 'react-router-dom';
function Loginpage(){
let reducer=(state,action)=>{
  return {...state,[action.name]:action.value}
}
let navigation=useNavigate()
let  subfunc= async(e)=>{
  e.preventDefault()
try{
  let validateddata =await axios.post('http://127.0.0.1:8000/authentication/UserLogin/',state)
  localStorage.setItem('access',validateddata.data.access)
  localStorage.setItem('refresh',validateddata.data.refresh)
  let userforcheck=validateddata.data
  if(userforcheck.is_superuser){
    navigation('/AdminsideRout')
    toast.success('admin side')
  }else{
   console.log(state.password)
   navigation("/prodecthomeside")
   toast.success('enter inside the home page')
  }
}catch(error){
   if (error.response && error.response.data && error.response.data.message) {
      toast.error(error.response.data.message);
    } else {
      toast.error("Something went wrong!",{

      });
    }
}
}

function forgetfunc(){
navigation('/ForgetPassword')
}

let[state,dispatch]=useReducer(reducer,{username:'',email:'',password:''})
    return (
   <div className="w-full h-[100vh] flex items-center justify-center md:h-screen overflow-hidden bgimage bg-cover bg-center bg-no-repeat">
      
        <div className="w-[500px] p-6 rounded-lg bg-white/20 border border-white">
          <h1 className='justify-center flex text-white text-bold sm:text-4xl'>Login page</h1>
          <form onSubmit={subfunc} className="flex flex-col p-8 rounded-lg gap-4 w-full ">
            <input  onChange={(e)=>dispatch({name:'username',value:e.target.value})} type="text" placeholder="Enter your name :" className="placeholder-white placeholder:font-bold outline-none px-3 py-2 rounded text-black backdrop-blur"/>
            <input onChange={(e)=>dispatch({name:'email',value:e.target.value})} type="email" placeholder="Enter your email :" className="placeholder-white placeholder:font-bold outline-none px-3 py-2 rounded text-black backdrop-blur"/>
            <input onChange={(e)=>dispatch({name:'password',value:e.target.value})} type="password" placeholder="Confirm your password :" className="placeholder-white placeholder:font-bold outline-none px-3 py-2 rounded text-black backdrop-blur"/>
            <div className='flex justify-between'>
             <button className='rounded px-4 py-2 bg-black hover:bg-blue-600 text-white' type="submit">Login</button>
            <button onClick={forgetfunc} className='rounded px-4 py-2 backdrop-blur-3xl hover:bg-black/40 text-amber-50'>Forget</button>
            </div>
            
          </form>
        </div>

        <Toaster position="bottom-right" reverseOrder={false}/>
      </div>

  );
}
export default Loginpage;