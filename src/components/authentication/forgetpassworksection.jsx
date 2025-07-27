import React, { useState, useRef, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';


export default function ForgetPassword() {
  const [step, setStep] = useState('request'); 
  const [form, setForm] = useState({ email: '', otp: '', password: '' });
  const otpRefs = useRef([]);

  const change = (e) =>setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  useEffect(() => {
    if (step === 'verify') {
      otpRefs.current[0]?.focus();
    }
  }, [step]);

  const handleOtpChange = (idx, val) => {
    const otpArr = form.otp.split('');
    otpArr[idx] = val.slice(-1);
    const combined = otpArr.join('');
    setForm((p) => ({ ...p, otp: combined }));
    if (val && idx < otpRefs.current.length - 1) {
      otpRefs.current[idx + 1].focus();
    }
  };

  const subfunc = (e) => {
    e.preventDefault();
    // Placeholder actions
    if (step === 'request') {
      toast.success('OTP sent to email.');
      setStep('verify');
    } else if (step === 'verify') {
      toast.success('OTP verified!');
      setStep('reset');
    } else {
      toast.success('Password reset successful!');
      setStep('request');
      setForm({ email: '', otp: '', password: '' });
    }
  };


  

  return (
    // <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-200 flex items-center justify-center p-4">
    //   <div className="bg-white/90 backdrop-blur-md max-w-md w-full p-8 rounded-2xl shadow-lg transform transition hover:scale-102">
    //     <h1 className="text-center text-2xl font-semibold text-gray-800 mb-6">
    //       {step === 'request' && 'Forgot Password'}
    //       {step === 'verify' && 'Verify OTP'}
    //       {step === 'reset' && 'Reset Password'}
    //     </h1>

    //     <form onSubmit={subfunc} className="space-y-5">
    //       {step === 'request' && (
    //         <div className="relative">
    //           <input name="email" type="email" value={form.email} onChange={change} required className="peer w-full px-3 py-2 border-b-2 border-gray-300 focus:border-blue-500 outline-none bg-transparent" placeholder=" "/>
    //           <label className="absolute left-3 top-2 text-gray-500 text-sm transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-sm">Email Address </label>
    //         </div>
    //       )}

    //       {step === 'verify' && (
    //         <>
    //           <p className="text-center text-gray-600">Enter the 6‑digit code sent to your email.</p>
    //           <div className="flex justify-between space-x-2">
    //             {Array.from({ length: 6 }).map((_, i) => (
    //               <input key={i} type="text" maxLength="1" ref={(el) => (otpRefs.current[i] = el)} onChange={(e) => handleOtpChange(i, e.target.value)} className="w-12 h-12 text-center text-xl border-2 border-gray-300 rounded-md focus:border-blue-500 transition"/>))}
    //           </div>
    //         </>
    //       )}

    //       {step === 'reset' && (
    //         <div className="relative">
    //           <input
    //             name="password"
    //             type="password"
    //             value={form.password}
    //             onChange={change}
    //             required
    //             className="peer w-full px-3 py-2 border-b-2 border-gray-300 focus:border-green-500 outline-none bg-transparent"
    //             placeholder=" "
    //           />
    //           <label className="absolute left-3 top-2 text-gray-500 text-sm transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-sm">
    //             New Password
    //           </label>
    //         </div>
    //       )}

    //       <button className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
    //         {step === 'request' && 'Send OTP'}
    //         {step === 'verify' && 'Verify OTP'}
    //         {step === 'reset' && 'Reset Password'}
    //       </button>
    //     </form>
    //   </div>

    //   <Toaster position="bottom-right" toastOptions={{ duration: 3000 }} />
    // </div>
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 flex items-center justify-center p-4">
  <div className="bg-white/95 backdrop-blur-lg max-w-md w-full p-8 rounded-3xl shadow-2xl transform transition-all duration-300 hover:shadow-xl hover:scale-[1.01]">
    {/* Animated header with icon */}
    <div className="flex flex-col items-center mb-6">
      <div className="relative mb-4">
        <div className="absolute -inset-2 bg-blue-200 rounded-full blur opacity-75 animate-pulse"></div>
        <div className="relative bg-blue-500 p-4 rounded-full text-white shadow-lg">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>
      </div>
      <h1 className="text-center text-3xl font-bold text-gray-800 bg-gradient-to-r from-blue-500 to-blue-600 bg-clip-text text-transparent">
        {step === 'request' && 'Reset Your Password'}
        {step === 'verify' && 'Verify Your Identity'}
        {step === 'reset' && 'Create New Password'}
      </h1>
      <p className="text-center text-blue-600/80 mt-2">
        {step === 'request' && 'Enter your email to receive a verification code'}
        {step === 'verify' && 'Check your email for the 6-digit code'}
        {step === 'reset' && 'Make it strong and memorable'}
      </p>
    </div>

    <form onSubmit={subfunc} className="space-y-6">
      {step === 'request' && (
        <div className="relative group">
          <div className="absolute -inset-0.5 bg-blue-300/30 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-200"></div>
          <div className="relative bg-white rounded-lg">
            <input 
              name="email" 
              type="email" 
              value={form.email} 
              onChange={change} 
              required 
              className="peer w-full px-4 py-3 border-0 bg-white/50 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition duration-200" 
              placeholder=" "
            />
            <label className="absolute left-4 top-3 text-gray-500 text-sm transition-all duration-200 peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-focus:top-0 peer-focus:text-sm peer-focus:text-blue-600">
              Email Address
            </label>
          </div>
        </div>
      )}

      {step === 'verify' && (
        <div className="space-y-4">
          <p className="text-center text-blue-600/90">We've sent a verification code to your email</p>
          
          <div className="flex justify-center space-x-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="relative group">
                <div className="absolute -inset-0.5 bg-blue-200/50 rounded-md blur opacity-75 group-hover:opacity-100 transition"></div>
                <input 
                  type="text" 
                  maxLength="1" 
                  ref={(el) => (otpRefs.current[i] = el)} 
                  onChange={(e) => handleOtpChange(i, e.target.value)} 
                  className="relative w-12 h-12 text-center text-2xl font-bold border-2 border-blue-200/50 rounded-md focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition bg-white/80"
                />
              </div>
            ))}
          </div>
          
          <div className="flex justify-center pt-2">
            <button type="button" className="text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Resend Code
            </button>
          </div>
        </div>
      )}

      {step === 'reset' && (
        <div className="space-y-4">
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-blue-300/30 rounded-lg blur opacity-75 group-hover:opacity-100 transition"></div>
            <div className="relative bg-white rounded-lg">
              <input
                name="password"
                type="password"
                value={form.password}
                onChange={change}
                required
                className="peer w-full px-4 py-3 border-0 bg-white/50 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition duration-200"
                placeholder=" "
              />
              <label className="absolute left-4 top-3 text-gray-500 text-sm transition-all duration-200 peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-focus:top-0 peer-focus:text-sm peer-focus:text-blue-600">
                New Password
              </label>
            </div>
          </div>
          
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-blue-300/30 rounded-lg blur opacity-75 group-hover:opacity-100 transition"></div>
            <div className="relative bg-white rounded-lg">
              <input
                name="confirmPassword"
                type="password"
                required
                className="peer w-full px-4 py-3 border-0 bg-white/50 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition duration-200"
                placeholder=" "
              />
              <label className="absolute left-4 top-3 text-gray-500 text-sm transition-all duration-200 peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-focus:top-0 peer-focus:text-sm peer-focus:text-blue-600">
                Confirm Password
              </label>
            </div>
          </div>
          
          <div className="bg-blue-50/50 p-3 rounded-lg border border-blue-100">
            <p className="text-sm text-blue-800 font-medium flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Password must be at least 8 characters
            </p>
          </div>
        </div>
      )}

      <button 
        type="submit"
        className="w-full py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-blue-300/50 flex items-center justify-center"
      >
        {step === 'request' && (
          <>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Send Verification Code
          </>
        )}
        {step === 'verify' && 'Verify & Continue'}
        {step === 'reset' && 'Update Password'}
      </button>
      
      <div className="text-center pt-2">
        <button 
          type="button" 
          onClick={() => navigate('/login')}
          className="text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center justify-center w-full"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Login
        </button>
      </div>
    </form>
  </div>

  {/* Enhanced Toaster */}
  <Toaster 
    position="bottom-right" 
    toastOptions={{ 
      duration: 4000,
      style: {
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        borderLeft: '4px solid #3B82F6',
        borderRadius: '12px',
        padding: '16px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
        color: '#1E293B'
      },
      success: {
        iconTheme: {
          primary: '#10B981',
          secondary: 'white',
        },
      },
      error: {
        iconTheme: {
          primary: '#EF4444',
          secondary: 'white',
        },
      },
    }} 
  />
</div>
  );
}
