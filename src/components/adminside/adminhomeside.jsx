import React, { useState } from 'react';
import axios from 'axios';
import toast,{Toaster} from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function AdminHomeside() {
  const [showCategory, setShowCategory] = useState(false);
  const [showOrders, setShowOrders] = useState(false);
  const categories = ['addthecategories', 'Apparel', 'Books'];
  const products = ['addproduct', 'seeproduct', 'ViewallUser','ViewallProudctByCategary'];
let navigation=useNavigate()




  const handleCategoryClick = async(category) => {
    if (category === 'addthecategories') {
      alert('Loading addthecategories...');
    }

  };




  const handleProdectClick=(product)=>{
    console.log('product clicked',product)
    if(product==='addproduct'){
      navigation('/AdminsideAddProduct')
      toast.success('addproduct side')
    }else if(product==='seeproduct'){
      navigation('/AdminsideSeeproducts')
    }else if(product==='ViewallUser'){
      navigation('/AdminsideViewallUser')
    }else if(product==='ViewallProudctByCategary'){
      navigation('/ViewallProudctByCategary')
    }
  }



  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white flex flex-col fixed h-full">
        <div className="flex items-center justify-center p-6 bg-gray-600">
          <h2 className="text-xl font-bold">Admin Panel</h2>
        </div>





        <nav className="flex flex-col space-y-2 p-4">
          <button onClick={() => {setShowCategory(!showCategory);setShowOrders(false);}}className="py-2 px-4 rounded hover:bg-blue-600 text-left">Category</button>
          {showCategory && (
            <ul className="ml-4 space-y-1 text-sm text-amber-200">{categories.map((categoris, index) => (
                <li key={index} onClick={() => handleCategoryClick(categoris)}className="hover:underline cursor-pointer">{categoris}</li>))}</ul>)}



          <button onClick={() => {setShowOrders(!showOrders);setShowCategory(false);}}className="py-2 px-4 rounded hover:bg-blue-600 text-left"> Product</button>
          {showOrders && (
            <ul className="ml-4 space-y-1 text-sm text-amber-200">{products.map((order,idx ) =>(
            <li key={idx} onClick={()=>handleProdectClick(order)}  className="hover:underline cursor-pointer rounded  border">{order}</li>))}</ul>)}
        </nav>




        <div className="mt-auto p-4 text-center">
          <div className="bg-blue-500 rounded-full h-10 w-10 mx-auto flex items-center justify-center font-bold">
            AD
          </div>
        </div>
      </aside>

      {/* Main Section */}
      <div className="ml-64 flex-1 flex flex-col">
        <header className="bg-white shadow p-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">Admin Dashboard</h1>
          <input
            type="search"
            placeholder="Search…"
            className="pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:ring-2 focus:ring-blue-500"
          />
        </header>

        <main className="p-6">
          <main className="p-6 overflow-y-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white shadow rounded-lg p-4">
                <p className="text-sm text-gray-500">Card {i + 1}</p>
                <h2 className="text-xl font-bold mt-2">Value {i + 1}</h2>
              </div>
            ))}
          </div>
        </main> 
        </main>
      </div>
      
   <Toaster position='bottom-right'/>
    </div>
  );
}

export default AdminHomeside;