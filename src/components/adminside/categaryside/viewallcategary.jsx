import { useEffect, useState } from "react";
import axios from "axios";
import toast,{Toaster} from "react-hot-toast";
function ViewallCategary(){
useEffect(()=>{
fetchAllCategaryFunc()
},[])
const [categories, setCategories] = useState([]);
let fetchAllCategaryFunc=async()=>{
    try{
    let token=localStorage.getItem('access')    
    let fetchcategories=await axios.get('http://127.0.0.1:8000/adminside/GetallCategory/',{
        headers:{
            Authorization:`Bearer ${token}`
        },
    });
    console.log('data is what fetch   ...',fetchcategories.data)
    setCategories(fetchcategories.data)
}catch(e){
    toast.error('data does not existed')
    console.log('data does not existed')
}
}

    return(<> 
    
     <div className="min-h-screen bg-black p-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-6">📂 Categories</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat, index) => (
            <div key={index} className="bg-white p-4 rounded-2xl shadow hover:shadow-lg transition-all duration-300">
              <h3 className="text-xl font-semibold text-gray-700">{cat.name}</h3>
              <p className="text-sm text-gray-500 mt-2">{cat.description}</p>
              {/* Optional: Add buttons for edit/delete */}
              <div className="flex justify-end gap-2 mt-4">
                <button className="px-3 py-1 text-sm rounded bg-blue-600 text-white hover:bg-blue-700"     >Edit</button> 
                <button className="px-3 py-1 text-sm rounded bg-red-600 text-white hover:bg-red-700"       >Delete</button>
              </div>
            </div>
          ))}
        </div>
        {categories.length === 0 && (
          <p className="text-center text-gray-500 mt-10">No categories available.</p>
        )}
      </div>
    </div>

    <Toaster/>
    </>)
}
export default ViewallCategary;