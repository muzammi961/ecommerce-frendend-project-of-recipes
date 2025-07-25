import { useState } from 'react'
import viteLogo from '/vite.svg'
import MYcontext from './components/prodectside/createcontext'
import './App.css'
import Prodecthomepage from './components/prodectside/prodecthomeside'
import {BrowserRouter,Route,Routes,Link} from 'react-router-dom'
import Auth from './components/authentication/Registerpage'
import Loginpage from './components/authentication/Loginpage'
import Chengepassword from './components/authentication/chenge-password'
// import Sample from './components/sample'
import Prodectdata from './components/prodectside/prodects'
import Cartsection from './components/cart/cartsection'
import Wishlist from './components/wishlist/wishlistsection'
import Ordersection from './components/order/ordersection'
import Userformaddress from './components/order/usrformaddress'
import AdminHomeside from './components/adminside/adminhomeside'
import LogoutSide from './components/authentication/logoutside'
import ForgetPassword from './components/authentication/forgetpassworksection'
import AddProduct from './components/adminside/productside/addproduct'
import Seeproducts from './components/adminside/productside/seeproduct'
import ViewallUser from './components/adminside/userside/viewalluser'
import ViewallProudctByCategary from './components/adminside/productside/viewallproductbycategary'
function App() {
  const [values, setValue] = useState('')

  return (
  
   <BrowserRouter>
<MYcontext.Provider value={{values,setValue}}>
<Routes>
  <Route path='/' element={<Auth/>}/>
  <Route path='loginpage/' element={<Loginpage/>}/>
  <Route path='changepassword/' element={<Chengepassword/>}/>
  <Route path='prodecthomeside/' element={<Prodecthomepage/>}/>
  <Route path='prodectdata/' element={<Prodectdata/>}/>
  <Route path='cartsection/' element={<Cartsection/>}/>
  <Route path='wishlistsection/' element={<Wishlist/>}/>
  <Route path='Ordersection/' element={<Ordersection/>}/>
  <Route path='Userformaddress/' element={<Userformaddress/>}/>
  <Route path='LogoutSide/' element={<LogoutSide/>}/>
  <Route path='ForgetPassword/'element={<ForgetPassword/>}/>
  

{/* <Route path='Sample/' element={<Sample/>}/> */}


  <Route path='AdminsideRout/' element={<AdminHomeside/>}/>
  <Route path='AdminsideAddProduct/' element={<AddProduct/>}/> 
  <Route path='AdminsideSeeproducts/' element={<Seeproducts/>}/>
  <Route path='AdminsideViewallUser/'element={<ViewallUser/>}/>
  <Route path='ViewallProudctByCategary/' element={<ViewallProudctByCategary/>}/>

</Routes>
</MYcontext.Provider>
      
   
   </BrowserRouter>





  )
}

export default App
