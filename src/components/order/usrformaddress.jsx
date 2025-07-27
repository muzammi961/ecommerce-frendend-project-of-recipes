// import bgimage from '../../assets/backgroundImage.jpg';
// import { useReducer,useEffect } from 'react';
// import toast,{Toaster} from 'react-hot-toast';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';
// function Userformaddress() {
// let {cartid}=useParams()  
// let navigation=useNavigate()
// let token=localStorage.getItem('access')  
// let useReducefunc=(state,action)=>{
//   return {...state,[action.name]:action.value}
// }
// useEffect(()=>{

// },[])

// let [state,dispatch]=useReducer(useReducefunc,{nameofuser:'',phonenumber:'',pincode:'',state:'',city:'',houseno_buildingname:'',Roadname:''})
// let submitButton=async(e)=>{
//   e.preventDefault()
//   console.log('state   ',state)
//   try{
//    let postaddress=await axios.post('http://127.0.0.1:8000/orders/UserformAddress',state,{headers:{Authorization:`Bearer ${token}`}})
//   toast.success('address posted sucsssfully...')
//   navigation(`/OrderOneProduct/${cartid}`)
//   }catch(e){
//   toast.error('you got the error from the add the address')
//   }
// }







//   return (
//     // <div className="min-h-screen bg-fixed bg-cover bg-center flex items-center justify-center"style={{ backgroundImage: `url(${bgimage})` }}>
//     //   <div className="w-full max-w-2xl bg-white bg-opacity-90 shadow-lg rounded-lg p-8">
//     //     <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Order Address Form</h2>

//     //     <form className="space-y-4" onSubmit={submitButton}>
//     //       <div>
//     //         <label className="block text-gray-700 font-semibold mb-2">Name</label> 
//     //         <input onChange={(e)=>dispatch({name:'nameofuser',value:e.target.value})} type="text" name="nameofuser" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400" />
//     //       </div>

//     //       <div>
//     //         <label className="block text-gray-700 font-semibold mb-2">Phone Number</label>
//     //         <input onChange={(e)=>dispatch({name:'phonenumber',value:e.target.value})} type="tel" name="phonenumber" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400" />
//     //       </div>

//     //       <div>
//     //         <label className="block text-gray-700 font-semibold mb-2">Pincode</label>
//     //         <input onChange={(e)=>dispatch({name:'pincode',value:e.target.value})} type="number" name="pincode" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400" />
//     //       </div>

//     //       <div>
//     //         <label className="block text-gray-700 font-semibold mb-2">State</label>
//     //         <input onChange={(e)=>dispatch({name:'state',value:e.target.value})} type="text" name="state" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400" />
//     //       </div>

//     //       <div>
//     //         <label className="block text-gray-700 font-semibold mb-2">City</label>
//     //         <input onChange={(e)=>dispatch({name:'city',value:e.target.value})} type="text" name="city" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"/>
//     //       </div>

//     //       <div>
//     //         <label className="block text-gray-700 font-semibold mb-2">House No / Building Name</label>
//     //         <input onChange={(e)=>dispatch({name:'houseno_buildingname',value:e.target.value})} type="text" name="houseno_buildingname" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"  />
//     //       </div>

//     //       <div>
//     //         <label className="block text-gray-700 font-semibold mb-2">Road Name / Area</label>
//     //         <input onChange={(e)=>dispatch({name:'Roadname',value:e.target.value})} type="text" name="Roadname" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"/>
//     //       </div>

//     //       <div className="text-center">
//     //         <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg">Submit Order</button></div>
//     //     </form>
//     //   </div>
//     //   <Toaster position='bottom-right'/>
//     // </div>
    


//   <div className="min-h-screen bg-fixed bg-cover bg-center flex items-center justify-center p-4" style={{ 
//   backgroundImage: `url(${bgimage})`,
//   backdropFilter: 'blur(4px)'
// }}>
//   <div className="w-full max-w-2xl bg-white/95 backdrop-blur-sm shadow-xl rounded-2xl overflow-hidden border border-white/20">
//     {/* Glowing header */}
//     <div className="bg-gradient-to-r from-blue-400 to-blue-500 p-6 border-b border-white/20">
//       <h2 className="text-3xl font-bold text-white text-center drop-shadow-md">
//         Shipping Address
//       </h2>
//     </div>

//     <form className="p-6 space-y-6" onSubmit={submitButton}>
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <div className="space-y-2">
//           <label className="block text-sm font-medium text-gray-600">Full Name</label>
//           <input
//             onChange={(e) => dispatch({ name: 'nameofuser', value: e.target.value })}
//             type="text"
//             className="w-full px-4 py-3 bg-white/80 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-transparent shadow-sm transition-all placeholder-gray-400"
//             placeholder="John Doe"
//             required
//           />
//         </div>

//         <div className="space-y-2">
//           <label className="block text-sm font-medium text-gray-600">Phone Number</label>
//           <input
//             onChange={(e) => dispatch({ name: 'phonenumber', value: e.target.value })}
//             type="tel"
//             className="w-full px-4 py-3 bg-white/80 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-transparent shadow-sm transition-all placeholder-gray-400"
//             placeholder="+1 234 567 890"
//             required
//           />
//         </div>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         <div className="space-y-2">
//           <label className="block text-sm font-medium text-gray-600">Pincode</label>
//           <input
//             onChange={(e) => dispatch({ name: 'pincode', value: e.target.value })}
//             type="number"
//             className="w-full px-4 py-3 bg-white/80 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-transparent shadow-sm transition-all placeholder-gray-400"
//             placeholder="123456"
//             required
//           />
//         </div>

//         <div className="space-y-2">
//           <label className="block text-sm font-medium text-gray-600">State</label>
//           <input
//             onChange={(e) => dispatch({ name: 'state', value: e.target.value })}
//             type="text"
//             className="w-full px-4 py-3 bg-white/80 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-transparent shadow-sm transition-all placeholder-gray-400"
//             placeholder="California"
//             required
//           />
//         </div>

//         <div className="space-y-2">
//           <label className="block text-sm font-medium text-gray-600">City</label>
//           <input
//             onChange={(e) => dispatch({ name: 'city', value: e.target.value })}
//             type="text"
//             className="w-full px-4 py-3 bg-white/80 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-transparent shadow-sm transition-all placeholder-gray-400"
//             placeholder="Los Angeles"
//             required
//           />
//         </div>
//       </div>

//       <div className="space-y-2">
//         <label className="block text-sm font-medium text-gray-600">House No / Building</label>
//         <input
//           onChange={(e) => dispatch({ name: 'houseno_buildingname', value: e.target.value })}
//           type="text"
//           className="w-full px-4 py-3 bg-white/80 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-transparent shadow-sm transition-all placeholder-gray-400"
//           placeholder="Apt 42, Sunshine Towers"
//           required
//         />
//       </div>

//       <div className="space-y-2">
//         <label className="block text-sm font-medium text-gray-600">Street / Area</label>
//         <input
//           onChange={(e) => dispatch({ name: 'Roadname', value: e.target.value })}
//           type="text"
//           className="w-full px-4 py-3 bg-white/80 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-transparent shadow-sm transition-all placeholder-gray-400"
//           placeholder="Main Street"
//           required
//         />
//       </div>

//       <div className="pt-4">
//         <button
//           type="submit"
//           className="w-full bg-gradient-to-r from-blue-400 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.01]"
//         >
//           Continue to Payment
//           <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline ml-2 -mr-1" viewBox="0 0 20 20" fill="currentColor">
//             <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
//           </svg>
//         </button>
//       </div>
//     </form>
//   </div>
  
//   <Toaster 
//     position="bottom-right"
//     toastOptions={{
//       style: {
//         borderRadius: '12px',
//         background: 'rgba(96, 165, 250, 0.9)',
//         backdropFilter: 'blur(4px)',
//         color: '#fff',
//         border: '1px solid rgba(255, 255, 255, 0.2)',
//         boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)'
//       },
//     }}
//   />
// </div>





//   );

// }
// export default Userformaddress;  




import bgimage from '../../assets/backgroundImage.jpg';
import { useReducer } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function Userformaddress() {
  let { cartid } = useParams();
  let navigation = useNavigate();
  let token = localStorage.getItem('access');

  let useReducefunc = (state, action) => {
    return { ...state, [action.name]: action.value };
  };

  let [state, dispatch] = useReducer(useReducefunc, {
    nameofuser: '',
    phonenumber: '',
    pincode: '',
    state: '',
    city: '',
    houseno_buildingname: '',
    Roadname: ''
  });

  let submitButton = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://127.0.0.1:8000/orders/UserformAddress', state, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('Address saved successfully!');
      navigation(`/OrderOneProduct/${cartid}`);
    } catch (e) {
      toast.error('Error saving address');
    }
  };

  return (
    <div 
      className="min-h-screen bg-fixed bg-cover bg-center flex items-center justify-center p-4"
      style={{ 
        backgroundImage: `url(${bgimage})`,
        backdropFilter: 'blur(4px)'
      }}
    >
      <div className="w-full max-w-2xl bg-white/95 backdrop-blur-sm rounded-2xl overflow-hidden shadow-2xl border border-white/20">
        {/* Vibrant Header */}
        <div className="bg-gradient-to-r from-amber-500 to-amber-600 p-6">
          <h2 className="text-2xl font-bold text-white text-center drop-shadow-md">
            Shipping Address
          </h2>
          <p className="text-center text-amber-100 mt-1">
            Where should we deliver your order?
          </p>
        </div>

        <form className="p-6 space-y-6" onSubmit={submitButton}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-amber-700">Full Name</label>
              <div className="relative">
                <input
                  onChange={(e) => dispatch({ name: 'nameofuser', value: e.target.value })}
                  type="text"
                  className="w-full px-4 py-3 pl-10 border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-transparent bg-white/90 transition-all"
                  placeholder="John Doe"
                  required
                />
                <svg
                  className="absolute left-3 top-3.5 h-5 w-5 text-amber-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-amber-700">Phone Number</label>
              <div className="relative">
                <input
                  onChange={(e) => dispatch({ name: 'phonenumber', value: e.target.value })}
                  type="tel"
                  className="w-full px-4 py-3 pl-10 border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-transparent bg-white/90 transition-all"
                  placeholder="+1 234 567 890"
                  required
                />
                <svg
                  className="absolute left-3 top-3.5 h-5 w-5 text-amber-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-amber-700">Pincode</label>
              <div className="relative">
                <input
                  onChange={(e) => dispatch({ name: 'pincode', value: e.target.value })}
                  type="number"
                  className="w-full px-4 py-3 pl-10 border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-transparent bg-white/90 transition-all"
                  placeholder="123456"
                  required
                />
                <svg
                  className="absolute left-3 top-3.5 h-5 w-5 text-amber-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-amber-700">State</label>
              <div className="relative">
                <input
                  onChange={(e) => dispatch({ name: 'state', value: e.target.value })}
                  type="text"
                  className="w-full px-4 py-3 pl-10 border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-transparent bg-white/90 transition-all"
                  placeholder="California"
                  required
                />
                <svg
                  className="absolute left-3 top-3.5 h-5 w-5 text-amber-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-amber-700">City</label>
              <div className="relative">
                <input
                  onChange={(e) => dispatch({ name: 'city', value: e.target.value })}
                  type="text"
                  className="w-full px-4 py-3 pl-10 border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-transparent bg-white/90 transition-all"
                  placeholder="Los Angeles"
                  required
                />
                <svg
                  className="absolute left-3 top-3.5 h-5 w-5 text-amber-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-amber-700">House No / Building</label>
            <div className="relative">
              <input
                onChange={(e) => dispatch({ name: 'houseno_buildingname', value: e.target.value })}
                type="text"
                className="w-full px-4 py-3 pl-10 border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-transparent bg-white/90 transition-all"
                placeholder="Apt 42, Sunshine Towers"
                required
              />
              <svg
                className="absolute left-3 top-3.5 h-5 w-5 text-amber-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-amber-700">Street / Area</label>
            <div className="relative">
              <input
                onChange={(e) => dispatch({ name: 'Roadname', value: e.target.value })}
                type="text"
                className="w-full px-4 py-3 pl-10 border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-transparent bg-white/90 transition-all"
                placeholder="Main Street"
                required
              />
              <svg
                className="absolute left-3 top-3.5 h-5 w-5 text-amber-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              </svg>
            </div>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-white py-3 rounded-lg font-bold hover:from-amber-600 hover:to-amber-700 transition-all shadow-lg hover:shadow-xl flex items-center justify-center"
            >
              Continue to Payment
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </form>
      </div>
      
      <Toaster 
        position="bottom-right"
        toastOptions={{
          style: {
            borderRadius: '12px',
            background: 'rgba(245, 158, 11, 0.9)',
            backdropFilter: 'blur(4px)',
            color: '#fff',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)'
          },
        }}
      />
    </div>
  );
}

export default Userformaddress;