import axios from "axios"
import { useNavigate } from "react-router-dom"

function LogoutSide(){
let navigation=useNavigate()
let Logoutfunc=async()=>{
    let refresh=localStorage.getItem('refresh')
    let access=localStorage.getItem('access')
    console.log('refresh....',refresh)
    console.log('access......',access)
    await axios.post('http://127.0.0.1:8000/authentication/UserLogout/',{refresh},{
        headers:{ Authorization: `Bearer ${access}`}
    })
    localStorage.removeItem('refresh')
    localStorage.removeItem('access')
    navigation('/loginpage')
    
    }



    return(<>
    <h1>hiiiiiiii</h1>
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center p-4">
  <div className="bg-white/95 backdrop-blur-lg max-w-md w-full p-8 rounded-3xl shadow-2xl transform transition-all duration-300 animate-in fade-in zoom-in-95">
    {/* Header with animated icon */}
    <div className="flex flex-col items-center mb-6">
      <div className="relative mb-4">
        <div className="absolute -inset-2 bg-red-200 rounded-full blur opacity-75 animate-pulse"></div>
        <div className="relative bg-gradient-to-br from-red-500 to-red-600 p-4 rounded-full text-white shadow-lg">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
        </div>
      </div>
      <h1 className="text-center text-3xl font-bold text-gray-800 bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">
        Ready to Leave?
      </h1>
      <p className="text-center text-red-600/80 mt-2">
        Are you sure you want to sign out?
      </p>
    </div>

    {/* Action Buttons */}
    <div className="flex flex-col sm:flex-row gap-3 mt-8">
      <button
        onClick={Logoutfunc}
        className="flex-1 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-300 shadow-lg hover:shadow-red-300/50 flex items-center justify-center"
      >
        <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
        </svg>
        Yes, Sign Out
      </button>
      
      <button
        // onClick={onClose}
        className="flex-1 py-3 bg-white text-gray-700 font-semibold rounded-lg border border-gray-200 hover:bg-gray-50 transition-all duration-300 shadow hover:shadow-gray-200/50 flex items-center justify-center"
      >
        <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
        Cancel
      </button>
    </div>

    {/* Footer note */}
    <p className="text-center text-gray-500 text-sm mt-6">
      You can always sign back in anytime
    </p>
  </div>
</div>
    </>)
}
export default LogoutSide;