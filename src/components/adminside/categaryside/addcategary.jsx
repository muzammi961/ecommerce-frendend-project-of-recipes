import React from 'react';
import AdminSidebar from '../../ad/sidebar';
import { useState,useEffect } from 'react';
import toast,{Toaster} from 'react-hot-toast';
import axios from 'axios';



function Addcategary() {
let [newstate,setNewCat]=useState('')    
let [currentcat,setCat]=useState([])    
useEffect(()=>{
getcurrentcategory()
},[])

let getcurrentcategory=async()=>{
    let token=localStorage.getItem('access')
 try{
  let getcategorys=await axios.get('http://127.0.0.1:8000/adminside/GetallCategory/',{
    headers:{
        Authorization:`Bearer ${token}`
    }
  })
  setCat(getcategorys.data)
  console.log('categoryss....',getcategorys.data)
  toast.success('got categoryss what have')
   
 }catch(e){
    toast.error('does not find any category..!')
 }
}


let createCategory=async(e)=>{
    e.preventDefault();
    console.log('newstate',newstate)
    let token=localStorage.getItem('access')
    try{
      await axios.post('http://127.0.0.1:8000/adminside/CreateCategory/',{name:newstate},{
        headers:{
            Authorization:`Bearer ${token}`
        }
      })
    toast.success('category successfully post....!')
    }catch(e){
    toast.error('data does not post....!')
    }
}



  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <AdminSidebar />
      
      <div className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-2xl mx-auto">
          {/* Shining Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl shadow-xl p-6 mb-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full transform translate-x-16 -translate-y-16"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-white opacity-10 rounded-full transform -translate-x-16 translate-y-16"></div>
            <h1 className="text-3xl font-bold text-white relative z-10">Add New Category</h1>
            <p className="text-indigo-100 mt-2 relative z-10">Create a new product category</p>
          </div>

          {/* Shining Form */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
            <form className="p-6 space-y-6">
              {/* Category Name */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Category Name</label>
                <input
                  onChange={(e)=>setNewCat(e.target.value)}
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 shadow-sm"
                  placeholder="e.g. Electronics"
                />
              </div>

              {/* Category Icon */}
              <div className="space-y-2">
             <label className="block text-sm font-medium text-gray-700">Category Names</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {currentcat.map((element, index) => (
            <button    
            key={index}
            type="button"
             className="w-full p-2 flex flex-col items-center justify-center bg-white border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-200 transition-all duration-200 shadow-sm">
            <span className="text-lg mb-1">{element.icon || '📦'}</span>
           <span className="text-xs font-medium text-gray-700 truncate w-full text-center">{element.name}</span>
           </button>
              ))}
             </div>
          </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                onClick={createCategory}   
                  type="submit"
                  className="w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                >
                  Create Category
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Toaster position='bottom-right'/>
    </div>
  );
}

export default Addcategary;