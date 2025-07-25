import React, { useState, useRef, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';


export default function ForgetPassword() {
  const [step, setStep] = useState('request'); // request | verify | reset
  const [form, setForm] = useState({ email: '', otp: '', password: '' });
  const otpRefs = useRef([]);

  const change = (e) =>setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  // Auto-focus next OTP input
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-200 flex items-center justify-center p-4">
      <div className="bg-white/90 backdrop-blur-md max-w-md w-full p-8 rounded-2xl shadow-lg transform transition hover:scale-102">
        <h1 className="text-center text-2xl font-semibold text-gray-800 mb-6">
          {step === 'request' && 'Forgot Password'}
          {step === 'verify' && 'Verify OTP'}
          {step === 'reset' && 'Reset Password'}
        </h1>

        <form onSubmit={subfunc} className="space-y-5">
          {step === 'request' && (
            <div className="relative">
              <input name="email" type="email" value={form.email} onChange={change} required className="peer w-full px-3 py-2 border-b-2 border-gray-300 focus:border-blue-500 outline-none bg-transparent" placeholder=" "/>
              <label className="absolute left-3 top-2 text-gray-500 text-sm transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-sm">Email Address </label>
            </div>
          )}

          {step === 'verify' && (
            <>
              <p className="text-center text-gray-600">Enter the 6‑digit code sent to your email.</p>
              <div className="flex justify-between space-x-2">
                {Array.from({ length: 6 }).map((_, i) => (
                  <input key={i} type="text" maxLength="1" ref={(el) => (otpRefs.current[i] = el)} onChange={(e) => handleOtpChange(i, e.target.value)} className="w-12 h-12 text-center text-xl border-2 border-gray-300 rounded-md focus:border-blue-500 transition"/>))}
              </div>
            </>
          )}

          {step === 'reset' && (
            <div className="relative">
              <input
                name="password"
                type="password"
                value={form.password}
                onChange={change}
                required
                className="peer w-full px-3 py-2 border-b-2 border-gray-300 focus:border-green-500 outline-none bg-transparent"
                placeholder=" "
              />
              <label className="absolute left-3 top-2 text-gray-500 text-sm transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-sm">
                New Password
              </label>
            </div>
          )}

          <button className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
            {step === 'request' && 'Send OTP'}
            {step === 'verify' && 'Verify OTP'}
            {step === 'reset' && 'Reset Password'}
          </button>
        </form>
      </div>

      <Toaster position="bottom-right" toastOptions={{ duration: 3000 }} />
    </div>
  );
}
