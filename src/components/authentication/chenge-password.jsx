import './style/registerpage.css'
import hotellogo from '../../assets/hotellogo.jpg'
import { useRef } from 'react';
import { useState } from 'react';
function Chengepassword(){
// let subfunc=()=>{

// }
    return (
   <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
  <div className="bg-white/90 backdrop-blur-lg max-w-md w-full rounded-3xl shadow-2xl overflow-hidden transform transition-all duration-500 hover:shadow-xl">
    {/* Shiny Header */}
    <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6 text-center relative overflow-hidden">
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full"></div>
      <div className="absolute -bottom-20 -left-10 w-40 h-40 bg-indigo-400/10 rounded-full"></div>
      <div className="relative z-10">
        <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-white/30">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-white">Change Password</h1>
        <p className="text-blue-100 mt-1">Secure your account with a new password</p>
      </div>
    </div>

    {/* Form Container */}
    <div className="p-8 space-y-6">
      <div className="space-y-4">
        {/* Current Password */}
        <div className="relative group">
          <div className="absolute -inset-0.5 bg-blue-300/30 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
          <div className="relative bg-white rounded-lg">
            <input
              type="password"
              className="peer w-full px-4 py-3 border-0 bg-white/50 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition duration-200"
              placeholder=" "
            />
            <label className="absolute left-4 top-3 text-gray-500 text-sm transition-all duration-200 peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-focus:top-0 peer-focus:text-sm peer-focus:text-blue-600">
              Current Password
            </label>
          </div>
        </div>

        {/* New Password */}
        <div className="relative group">
          <div className="absolute -inset-0.5 bg-blue-300/30 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
          <div className="relative bg-white rounded-lg">
            <input
              type="password"
              className="peer w-full px-4 py-3 border-0 bg-white/50 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition duration-200"
              placeholder=" "
            />
            <label className="absolute left-4 top-3 text-gray-500 text-sm transition-all duration-200 peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-focus:top-0 peer-focus:text-sm peer-focus:text-blue-600">
              New Password
            </label>
          </div>
        </div>

        {/* Confirm Password */}
        <div className="relative group">
          <div className="absolute -inset-0.5 bg-blue-300/30 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
          <div className="relative bg-white rounded-lg">
            <input
              type="password"
              className="peer w-full px-4 py-3 border-0 bg-white/50 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition duration-200"
              placeholder=" "
            />
            <label className="absolute left-4 top-3 text-gray-500 text-sm transition-all duration-200 peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-focus:top-0 peer-focus:text-sm peer-focus:text-blue-600">
              Confirm New Password
            </label>
          </div>
        </div>
      </div>

      {/* Password Requirements */}
      <div className="bg-blue-50/50 p-4 rounded-lg border border-blue-100">
        <h4 className="text-sm font-medium text-blue-800 mb-2 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Password Requirements
        </h4>
        <ul className="text-xs text-blue-600 space-y-1">
          <li className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Minimum 8 characters
          </li>
          <li className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            At least one uppercase letter
          </li>
          <li className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            At least one number or special character
          </li>
        </ul>
      </div>

      {/* Submit Button */}
      <button
        type="button"
        className="w-full py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-blue-300/50 flex items-center justify-center"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
        </svg>
        Update Password
      </button>
    </div>
  </div>
</div>

  );
}
export default Chengepassword;