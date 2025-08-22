import './style/registerpage.css'
import  toast,{Toaster} from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import hotellogo from '../../assets/hotellogo.png'
// import { useRef } from 'react';
// import { useState } from 'react';
import { useReducer } from 'react';
const apiUrl = import.meta.env.VITE_API_URL;
function Auth(){
let navigation=useNavigate()
const reducer = (state, action) => {
  return { ...state, [action.name]: action.value};
}
let subfunc = async (e) => {
  e.preventDefault();
  let isValid = true;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const strongPasswordRegex = /^(?=.*[a-z])(?=.*\d)(?=.*[\W_]).{6,}$/;

  if (!state.username || state.username.trim() === '') {
    toast.error('Username is required');
   return
  }
  const trimmedName=state.username.trim()
  if(/^[.]+$/.test(trimmedName)){
    toast.error('user can not register with only dot......!')
  }

  if (!state.email || !emailRegex.test(state.email)) {
    toast.error('Enter a valid email address');
    return
  }

  if (!state.password || !strongPasswordRegex.test(state.password)) {
   toast.error('Password must be at least 6 characters long and include a lowercase letter, a number, and a special character.');
    return
  }

  if (state.password !== state.password_two) {
    toast.error('Passwords do not match');
    return
  }

  try {
    let valuedata = await axios.post(
      `${apiUrl}/authentication/userregisteration/`, state
    );
    toast.success('Registered successfully!');
    navigation('/loginpage');
  //  console.log(valuedata.data)
  } catch (e) {
    // const errors = e.response.data;

    // if (errors) {
    //   Object.entries(errors).forEach(([field, messages]) => {
    //     // Display each error message
    //     toast.error(`${field}: ${messages[0]}`);
    //   });
    // } else {
      toast.error('Registration failed.');
    
  }

};


let [state,dispatch]=useReducer(reducer,{username:'',email:"",password:null,password_two:null})  
    return (
<div className="bgimage min-h-screen w-full bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 bg-cover bg-center relative overflow-x-hidden overflow-y-auto no-scrollbar">
      {/* Animated Background Elements - Smaller on mobile */}
        <div className="absolute inset-0 ">
        <div className="absolute -top-20 sm:-top-40 -right-20 sm:-right-40 w-40 sm:w-80 h-40 sm:h-80 bg-gradient-to-r from-blue-400/20 to-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-20 sm:-bottom-40 -left-20 sm:-left-40 w-40 sm:w-80 h-40 sm:h-80 bg-gradient-to-r from-pink-400/20 to-red-600/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 sm:w-96 h-48 sm:h-96 bg-gradient-to-r from-cyan-400/10 to-blue-600/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      {/* Header - Better mobile spacing */}
      <header className="relative z-10 flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4">
        <img 
          src={hotellogo} 
          alt="Logo"  
          className="rounded-lg border-2 border-white/30 w-10 h-10 sm:w-12 sm:h-12 lg:w-15 lg:h-15 shadow-lg hover:scale-105 transition-transform duration-300"
        />
        <Link 
          className="text-white px-4 py-2 sm:px-6 sm:py-3 rounded-full bg-white/10 backdrop-blur-xl hover:bg-white/20 transition-all duration-300 text-sm sm:text-base shadow-lg border border-white/20 hover:scale-105" 
          to={'loginpage/'}
        >
          Login
        </Link>
      </header>   
          
      {/* Main Content - Stack on mobile, side by side on desktop */}
      <main className="relative z-10 flex flex-col lg:flex-row min-h-[calc(100vh-80px)] gap-4 lg:gap-0 p-4 sm:p-6 lg:p-0">
        
        {/* Left Panel - Welcome Section - Smaller on mobile */}
        <section className="w-full lg:w-1/2 lg:ml-12 lg:mr-6 backdrop-blur-lg bg-white/15 rounded-2xl flex justify-center items-center p-6 sm:p-8 lg:p-12 shadow-2xl border border-white/20 hover:bg-white/20 transition-all duration-500 min-h-[300px] lg:min-h-0">
          <div className="text-white text-center w-full space-y-3 sm:space-y-4 lg:space-y-6">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent leading-tight">
              Register
            </h1>
            <p className="text-sm sm:text-base lg:text-lg xl:text-xl text-white/90 leading-relaxed">
              Discover quality products and great deals every day!
            </p>
            <div className="mt-3 sm:mt-4 lg:mt-6">
              <img 
                className='rounded-xl w-full h-auto max-w-[200px] sm:max-w-xs lg:max-w-sm mx-auto shadow-2xl border-2 border-white/30 hover:scale-105 transition-transform duration-500' 
                src={hotellogo} 
                alt="hotel logo"
              />
            </div>
          </div>
        </section>
        
        {/* Right Panel - Registration Form - Mobile optimized */}
         <section className="w-full lg:w-1/2 flex items-center justify-center p-2 sm:p-6">
          <div className="w-full max-w-md mx-auto">
             <form onSubmit={subfunc} className="flex flex-col p-8 rounded-lg gap-4 w-full bg-white/30 border border-white">
               <h1 className='justify-center flex text-white text-bold sm:text-4xl'>Registration page</h1>

            <input name='name' onChange={(e) => dispatch({ name:'username', value: e.target.value })}  type="text" placeholder="Name :" className="placeholder-white placeholder:font-bold outline-none px-3 py-2 rounded text-black backdrop-blur"/>
            <input  name='number'  onChange={(e) => dispatch({ name:'email', value: e.target.value })} type="email" placeholder="Email :" className="placeholder-white placeholder:font-bold outline-none px-3 py-2 rounded text-black backdrop-blur"/>
            <input  name='password' onChange={(e) => dispatch({ name:'password', value: e.target.value })} type="password" placeholder="Password :" className="placeholder-white placeholder:font-bold outline-none px-3 py-2 rounded text-black backdrop-blur"/>
            <input  name='confirmpassword' onChange={(e) => dispatch({ name:'password_two', value: e.target.value })} type="password" placeholder="Confirm password :" className="placeholder-white placeholder:font-bold outline-none px-3 py-2 rounded text-black backdrop-blur"/>

            <div  className="text-white flex justify-around ">
              <button className='rounded px-4 py-2 backdrop-blur-3xl  hover:bg-black/40' type="submit">Submit</button>
            </div>
          </form>
          </div>
        </section>
      </main>
      
      <Toaster position='bottom-right' reverseOrder={false}/>

      {/* Enhanced Mobile Styles */}
      <style jsx>{`
    @media (max-width: 640px) {
      .min-h-screen {
        min-height: 100vh;
        min-height: 100dvh;
      }
      .bgimage {
        touch-action: manipulation;
        -webkit-overflow-scrolling: touch;
      }
      input {
        font-size: 16px !important;
        -webkit-appearance: none;
        border-radius: 8px;
      }
 
    }
    @media (max-width: 768px) {
      .backdrop-blur-lg { backdrop-filter: blur(12px); }
    }
    @media (prefers-reduced-motion: reduce) {
      .animate-pulse, .transition-transform {
        animation: none !important;
        transition: none !important;
      }
    }
    @keyframes float {
      0%,100% { transform: translateY(0) rotate(0deg); }
      50% { transform: translateY(-10px) rotate(180deg); }
    }
    .animate-float { animation: float 6s ease-in-out infinite; }
    /* Custom scrollbar styling for other elements if needed */
    ::-webkit-scrollbar {
    }
    ::-webkit-scrollbar-track {
      background: rgba(255,255,255,0.1);
      border-radius: 3px;
    }
    ::-webkit-scrollbar-thumb {
      background: rgba(255,255,255,0.3);
      border-radius: 3px;
    }
    
 
  `}</style>

    </div>
  );
}
export default Auth;