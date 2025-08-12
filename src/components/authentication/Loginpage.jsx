import './style/registerpage.css'
// import hotellogo from '../../assets/hotellogo.png'
import  toast,{Toaster} from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import axios  from 'axios';
// import { act, useRef } from 'react';
// import { useState } from 'react';
import { useReducer } from 'react';
// import { redirect } from 'react-router-dom';
const apiUrl = import.meta.env.VITE_API_URL;
function Loginpage(){
let reducer=(state,action)=>{
  return {...state,[action.name]:action.value}
}
let navigation=useNavigate()
let  subfunc= async(e)=>{
  e.preventDefault()
try{
  let validateddata =await axios.post(`${apiUrl}/authentication/UserLogin/`,state)
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
      
   <div className="bgimage w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 bg-cover bg-center bg-no-repeat p-4 sm:p-6 lg:p-8">
      
      <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl p-4 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl bg-white/20 backdrop-blur-xs border border-white/30 shadow-2xl hover:bg-white/25 duration-500">
        
        <h1 className='text-center text-white font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl mb-4 sm:mb-6 bg-gradient-to-r from-white to-blue-200 bg-clip-text'>
          Login Page
        </h1>
        
         <form onSubmit={subfunc} className="flex flex-col p-8 rounded-lg gap-4 w-full ">
            <input  onChange={(e)=>dispatch({name:'username',value:e.target.value})} type="text" placeholder="Name :" className="placeholder-white placeholder:font-bold outline-none px-3 py-2 rounded text-black backdrop-blur"/>
            <input onChange={(e)=>dispatch({name:'email',value:e.target.value})} type="email" placeholder="Email :" className="placeholder-white placeholder:font-bold outline-none px-3 py-2 rounded text-black backdrop-blur"/>
            <input onChange={(e)=>dispatch({name:'password',value:e.target.value})} type="password" placeholder="Password :" className="placeholder-white placeholder:font-bold outline-none px-3 py-2 rounded text-black backdrop-blur"/>
            <div className='flex justify-between'>
             <button className='rounded px-4 py-2 bg-black hover:bg-gray-500 text-white' type="submit">Login</button>
            <button onClick={forgetfunc} className='rounded px-4 py-2 backdrop-blur-3xl hover:bg-black/40 text-amber-50'>Forget</button>
            </div>
            
          </form> 
      </div>

      <Toaster position="bottom-right" reverseOrder={false}/>

      {/* Enhanced Mobile Styles */}
      <style jsx>{`
        /* Mobile-first responsive design */
        @media (max-width: 640px) {
          .min-h-screen {
            min-height: 100vh;
            min-height: 100dvh; /* For mobile browsers */
          }
          
          /* Mobile input optimization */
          input {
            font-size: 16px !important; /* Prevents zoom on iOS */
            -webkit-appearance: none;
       
          }
          
          /* Better mobile button */
          button {
            min-height: 48px; /* Touch target size */
      
          }
        }
        
        @media (max-width: 480px) {
          /* Extra small mobile devices */
          .backdrop-blur-lg {
            backdrop-filter: blur(8px);
          }
        }
        
        /* Animation optimizations for mobile */
        @media (prefers-reduced-motion: reduce) {
          .transition-all {
            transition: none;
          }
          .hover\\:scale-105:hover {
            transform: none;
          }
        }
        
        
     
        
        /* Custom scrollbar for webkit browsers */
        ::-webkit-scrollbar {
          width: 6px;
        }
        
        ::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 3px;
        }
        
        ::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.3);
          border-radius: 3px;
        }
        
   
      `}</style>
    </div>
  );
}
export default Loginpage;