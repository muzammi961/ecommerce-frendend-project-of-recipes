import React from 'react';
import { useEffect,useState } from 'react';
import AdminSidebar from '../../ad/sidebar';
import { useParams } from 'react-router-dom';
import toast,{ Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
function UpdateCategory() {
  // Sample category data - replace with your actual data

let navigaions=useNavigate()
let {catid}=useParams()  
let [state,setCate]=useState('')
// useEffect(()=>{
// let {catid}=useParams()    
// updatecategary(catid)
// },[])  

  const category = {
    id: 1,
    name: 'Electronics',
    icon: '📱',
    description: 'All electronic gadgets and devices',
    isActive: true,
    image: '/path/to/image.jpg'
  };



let updatecategary=async(e)=>{
   e.preventDefault();
  let token=localStorage.getItem('access')
  console.log('hiii for up',catid,state)
  try{
    await axios.put(`http://127.0.0.1:8000/adminside/UpdateCategory/${catid}/`,{name:state},{
      headers:{
        Authorization:`Bearer ${token}`
      }
    })
    // setCategories((prev) => prev.filter((cat) => cat.id !== id));
    toast.success('you could change the category.....!')
    navigaions('/AdminViewallCategary')
  }catch(e){
    toast.error('you could not change the category....!')
  }
}





  return (
   <div className="flex min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <AdminSidebar />
      
      <div className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-2xl mx-auto">
          {/* Shining Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl shadow-xl p-6 mb-8 relative overflow-hidden">
            <h1 className="text-3xl font-bold text-white relative z-10">Update </h1>
            <p className="text-indigo-100 mt-2 relative z-10">Edit this category's details</p>
          </div>

          {/* Shining Form */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
            <form className="p-6 space-y-6">
              {/* Current Category Display */}
              <div className="flex items-center space-x-4 p-4 bg-blue-50 rounded-lg">
                <div className="text-4xl p-3 bg-white rounded-full shadow-sm">📱</div>
                <div>
                  <p className="text-sm text-gray-600">ID :   {catid}</p>
                </div>
              </div>

              {/* Category Name */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">New Category Name</label>
                <input onChange={(e)=>setCate(e.target.value)} type="text" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 shadow-sm" placeholder="Enter new category name"/>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
                <button onClick={updatecategary} type="submit"className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 flex-1">Save Changes</button>
                <button  type="button"className="px-6 py-3 bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 flex-1">Discard Changes</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Toaster position='bottom-right'/>
    </div>
  );
}

export default UpdateCategory;