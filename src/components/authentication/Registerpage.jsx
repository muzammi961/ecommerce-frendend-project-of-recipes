import './style/registerpage.css'
import  toast,{Toaster} from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import hotellogo from '../../assets/hotellogo.jpg'
import { useRef } from 'react';
import { useState } from 'react';
import { useReducer } from 'react';
function Auth(){
let navigation=useNavigate()
const reducer = (state, action) => {
  return { ...state, [action.name]: action.value};
}
let subfunc = async (e) => {
  e.preventDefault();
  let isValid = true;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/;

  if (!state.username || state.username.trim() === '') {
    toast.error('Username is required');
   return
  }

  if (!state.email || !emailRegex.test(state.email)) {
    toast.error('Enter a valid email address');
    return
  }

  if (!state.password || !strongPasswordRegex.test(state.password)) {
    toast.error('Password must be 6+ characters, include upper/lowercase, number, and special character');
    return
  }

  if (state.password !== state.password_two) {
    toast.error('Passwords do not match');
    return
  }

  try {
    let valuedata = await axios.post(
      'http://127.0.0.1:8000/authentication/userregisteration/', state
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
   <div className="w-full h-auto md:h-screen overflow-hidden bgimage bg-cover bg-center bg-no-repeat">
      <div className="m-4 w-full flex items-center justify-between px-6 py-3">
          <img src={hotellogo} alt="Logo"  className=" rounded-lg  border-6 w-15 h-15"/>
         <Link className="m-4 text-white px-4 py-2 rounded bg-white/10 backdrop-blur-3xl hover:bg-black/40 transition" to={'loginpage/'}>Login</Link>
      </div>   
          
      <div className="flex flex-col md:flex-row w-full h-auto md:h-[calc(100vh-60px)]">
        <div className=" m-6 rounded-lg md:m-12 w-full md:w-1/2 md:h-full backdrop-blur-md bg-white/20 flex justify-center items-center p-6 md:p-12">
         
          <div className="text-white text-center w-full">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Register</h1>
            <p className="text-lg">Discover quality products and great deals every day!</p>
            <img className='rounded-lg w-full h-auto max-w-sm mx-auto mt-4'src={hotellogo} alt="hotel logo"/>
          </div>
        </div>
        <div className="w-full md:w-1/2 flex items-center justify-center p-6">
          <form onSubmit={subfunc} className="flex flex-col p-8 rounded-lg gap-4 w-full bg-white/30 border border-white">
               <h1 className='justify-center flex text-white text-bold sm:text-4xl'>Registration page</h1>

            <input name='name' onChange={(e) => dispatch({ name:'username', value: e.target.value })}  type="text" placeholder="Enter your name :" className="placeholder-white placeholder:font-bold outline-none px-3 py-2 rounded text-black backdrop-blur"/>
            <input  name='number'  onChange={(e) => dispatch({ name:'email', value: e.target.value })} type="text" placeholder="Enter your phone email :" className="placeholder-white placeholder:font-bold outline-none px-3 py-2 rounded text-black backdrop-blur"/>
            <input  name='password' onChange={(e) => dispatch({ name:'password', value: e.target.value })} type="password" placeholder="Enter your password :" className="placeholder-white placeholder:font-bold outline-none px-3 py-2 rounded text-black backdrop-blur"/>
            <input  name='confirmpassword' onChange={(e) => dispatch({ name:'password_two', value: e.target.value })} type="password" placeholder="Confirm your password :" className="placeholder-white placeholder:font-bold outline-none px-3 py-2 rounded text-black backdrop-blur"/>

            <div  className="text-white flex justify-around ">
              <button className='rounded px-4 py-2 backdrop-blur-3xl  hover:bg-black/40' type="submit">Submit</button>
            </div>
          </form>
        </div>
      </div>
     <Toaster position='bottom-right' reverseOrder={false}/>
    </div>
  );
}
export default Auth;