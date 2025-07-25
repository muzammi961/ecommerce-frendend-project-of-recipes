import axios from "axios"
import { useState,useEffect } from "react"
function ViewallProudctByCategary(){
useEffect(()=>{
// fetchthedata() 
fetchthecategary()   
},[])
let [categares,setCategares]=useState([])


let fetchthecategary=async()=>{
    let token=localStorage.getItem('access')
    let categary=await axios.get('http://127.0.0.1:8000/adminside/GetallCategory/',{
        headers:{
            Authorization:`Bearer ${token}` 
        }
    })
    setCategares(categary.data)
    console.log('categares   ',categary.data[0].name)
}



// let fetchthedata=async()=>{
// let products=await axios.get('http://127.0.0.1:8000/adminside/ViewAllProductbyCategory/Breakfast/')
// }



    return(<>
       <div class="p-6 bg-gray-100 min-h-screen">
  <h1 class="text-3xl font-bold text-center mb-8">View Products by Category</h1>

  {/* <!-- Category Select Section --> */}
  <div class="max-w-md mx-auto mb-10">
    <label for="category" class="block text-lg font-medium text-gray-700 mb-2">Select Category:</label>
    {/* <select id="category" class="w-full px-4 py-2 border border-gray-300 rounded shadow focus:outline-none focus:ring-2 focus:ring-blue-500">
      <option value="">Choose a Category </option>
      {categares.map((categare,index)=>(
       <option key={index.id} value={index.id}>{categare.name}</option>
      ))}
    </select> */}


     <select id="category" className="w-full px-4 py-2 border border-gray-300 rounded shadow focus:outline-none focus:ring-2 focus:ring-blue-500">
      <option value="">Choose a Category</option>
      {categares.map((element ,index) => (
        <option key={index.id} value={index.id}>{element.name}</option>))}
      </select>




    
    <button class="mt-4 w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
      Show Products
    </button>
  </div>

  {/* <!-- Category Products Display Section --> */}
  <div class="mb-10">
    <h2 class="text-2xl font-semibold text-blue-700 mb-4 border-b-2 border-blue-400 inline-block">
      Selected Category Name
    </h2>

    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      
      {/* <!-- Product Card (Repeat this for each product) --> */}
      <div class="bg-white shadow-lg rounded-lg p-4">
        <img
          src="/path/to/product/image.jpg"
          alt="Product Name"
          class="w-full h-40 object-cover rounded-md mb-3"
        />
        <h3 class="text-lg font-semibold mb-1">Product Name</h3>
        <p class="text-gray-600">
          Price: 
          <span class="line-through">₹200</span> 
          <span class="text-green-600 font-bold">₹180</span>
        </p>
        <button class="mt-3 w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
          Edit Product
        </button>
      </div>
      {/* <!-- End Product Card --> */}

    </div>
  </div>
</div>

    
    </>)
}

export default ViewallProudctByCategary