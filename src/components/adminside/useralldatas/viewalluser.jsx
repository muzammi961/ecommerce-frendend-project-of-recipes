import axios from 'axios';
import { useState, useEffect } from 'react';
import AdminSidebar from '../../ad/sidebar'
import { useNavigate } from 'react-router-dom';
import toast,{ Toaster } from 'react-hot-toast';

const ViewallUser = () => {
  let navigation=useNavigate()
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
 
  useEffect(() => {
    const fetchUsers = async () => { 
      let token = localStorage.getItem('access')  
      try {
        const response = await axios.get('http://127.0.0.1:8000/adminside/AdminViewallUser/', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUsers(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <strong className="font-bold">Error: </strong>
        <span className="block sm:inline">{error}</span>
      </div>
    );
  }





  
let userdetailfunc=(id)=>{
 console.log(' view all          order section ......................................................  ')
}








let updateuserdatafunc=(userid)=>{
 navigation(`/UpdateUserData/${userid}`)
}


let userdatadestroyfunc=async(id)=>{
  let token=localStorage.getItem('access')
  try{
   await axios.delete(`http://127.0.0.1:8000/adminside/Deleteuserdata/${id}/`,{
    headers:{
      Authorization:`Bearer ${token}`
    }
   })

   setUsers(prevProducts => prevProducts.filter(item => item.id !== id));
    toast.success('could destroy the user data succssfully')
  }catch(e){
    toast.error('could not destroy the user data ')
  }
}


  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <AdminSidebar />
      
      <div className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          {/* Shining Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl shadow-xl p-6 mb-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full transform translate-x-16 -translate-y-16"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-white opacity-10 rounded-full transform -translate-x-16 translate-y-16"></div>
            <h1 className="text-3xl font-bold text-white relative z-10">User Management</h1>
            <p className="text-indigo-100 mt-2 relative z-10">Manage all registered users</p>
          </div>

          {/* Users Table */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
            <div className="overflow-x-auto">
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      ID
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Role
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-nowrap">{user.id}</p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-medium">
                            {user.username.charAt(0).toUpperCase()}
                          </div>
                          <div className="ml-3">
                            <p className="text-gray-900 whitespace-nowrap font-medium">
                              {user.username}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-nowrap">{user.email}</p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <button onClick={(e)=>userdetailfunc(user.id)} className="text-blue-600 hover:text-blue-800 mr-3 transition-colors border p-2 rounded-lg" >details</button>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          user.active 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {user.active ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <button onClick={()=>updateuserdatafunc(user.id)} className="text-blue-600 hover:text-blue-800 mr-3 transition-colors border p-2 rounded-lg">Edit</button>
                        <button onClick={()=>userdatadestroyfunc(user.id)} className="text-red-600 hover:text-red-800 transition-colors border p-2 rounded-lg">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Empty State */}
            {users.length === 0 && (
              <div className="p-8 text-center">
                <div className="text-gray-400 mb-4 text-6xl">👥</div>
                <h3 className="text-xl font-medium text-gray-600">No users found</h3>
                <p className="text-gray-500 mt-2">There are currently no registered users</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <Toaster position='bottom-right'/>
    </div>
  );
};

export default ViewallUser;