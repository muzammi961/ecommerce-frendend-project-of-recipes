import './style/registerpage.css'
import hotellogo from '../../assets/hotellogo.jpg'
import { useRef } from 'react';
import { useState } from 'react';
function Chengepassword(){
let subfunc=()=>{

}
    return (
   <div className="w-full h-[100vh] flex items-center justify-center md:h-screen overflow-hidden bgimage bg-cover bg-center bg-no-repeat">
      
        <div className="w-[500px] p-6  bg-white/20 rounded-lg">
            <h1 className="justify-center flex text-white text-bold  sm:text-4xl">Change password</h1>
          <form
            className="flex flex-col p-8 rounded-lg gap-4 w-full ">
            <input
              type="email"
              placeholder="Enter your Email :"
              className="border border-white placeholder-white placeholder:font-bold outline-none px-3 py-2 rounded text-black backdrop-blur"/>
        
            <input
              type="password"
              placeholder="Enter your old password :"
              className="border border-white placeholder-white placeholder:font-bold outline-none px-3 py-2 rounded text-black backdrop-blur"/>
             
             <input
              type="password"
              placeholder="enter the new password :"
              className="border border-white placeholder-white placeholder:font-bold outline-none px-3 py-2 rounded text-black backdrop-blur"/> 
            

            <input
              type="password"
              placeholder="Confirm your password :"
              className="border border-white placeholder-white placeholder:font-bold outline-none px-3 py-2 rounded text-black backdrop-blur"/>
            
              <button className='text-bold rounded px-4 py-2 bg-black hover:bg-blue-600 text-white' type="submit">Chenge password</button>
          </form>
        </div>
      </div>

  );
}
export default Chengepassword;