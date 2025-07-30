import { useParams } from "react-router-dom"
import { useEffect,useState } from "react"
import axios from "axios";
import toast,{Toaster} from "react-hot-toast";
import AdminSidebar from '../../ad/sidebar'
import { useNavigate } from "react-router-dom";
function UpdateUserData(){
  let {userid}=useParams()
  let navigation=useNavigate()
  const [user, setUser] =useState({username: '',email: ''});

let savebuttonforupdatedata=async(e)=>{
 e.preventDefault();
   if (!user.username || !user.email) {
    toast.error('Username and Email are required!');
    return;
   }
   let token=localStorage.getItem('access')
  try{
    await axios.put(`http://127.0.0.1:8000/adminside/Updateuserdata/${userid}/`,{username:user.username,email:user.email},{
    headers:{
        Authorization:`Bearer ${token}`
    }
  })
toast.success('you could update the user data....!')
navigation('/AdminsideViewallUser')
}catch(e){
toast.error('you could not update the user data.....!')  
  }
}


  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <AdminSidebar />
      
      <div className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-md mx-auto">
          {/* Shining Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl shadow-xl p-6 mb-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full transform translate-x-16 -translate-y-16"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-white opacity-10 rounded-full transform -translate-x-16 translate-y-16"></div>
            <h1 className="text-2xl font-bold text-white relative z-10">Update User</h1>
            <p className="text-indigo-100 mt-1 relative z-10">Edit basic user details</p>
          </div>

          {/* Update Form */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 p-6">
            <form className="space-y-6">
              {/* Username Field */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 flex items-center">
                  <span className="bg-blue-100 p-2 rounded-full mr-3 text-blue-600">👤</span>
                  Username <span>  ::       {userid}</span>
                </label>
                <input
                  required
                  type="text"
                  onChange={(e) => setUser({...user, username: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 shadow-sm"
                  placeholder="Enter username"
                />
              </div>
              
     
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 flex items-center">
                  <span className="bg-indigo-100 p-2 rounded-full mr-3 text-indigo-600">✉️</span>
                  Email
                </label>
                <input
                  required
                  type="email"
                  onChange={(e) => setUser({...user, email: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 shadow-sm"
                  placeholder="Enter email"
                />
              </div>

              <div className="flex space-x-4 pt-4">
                <button onClick={savebuttonforupdatedata} type="submit" className="flex-1 py-3 px-6 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-200">Save Changes</button>
                <button
                  type="button"
                  className="flex-1 py-3 px-6 bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Toaster position="bottom-right"/>
    </div>
  );
}
export default UpdateUserData