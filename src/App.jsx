import { useState } from 'react'
import viteLogo from '/vite.svg'
import MYcontext from './components/prodectside/createcontext'
import './App.css'
import Prodecthomepage from './components/prodectside/prodecthomeside'
import {BrowserRouter,Route,Routes,Link} from 'react-router-dom'
import Auth from './components/authentication/Registerpage'
import Loginpage from './components/authentication/Loginpage'
import Chengepassword from './components/authentication/chenge-password'
import Sample from './components/sample'
import Prodectdata from './components/prodectside/prodects'
import Cartsection from './components/cart/cartsection'
import Wishlist from './components/wishlist/wishlistsection'
import Ordersection from './components/order/ordersection'
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

</Routes>
</MYcontext.Provider>
      
   
   </BrowserRouter>





  )
}

export default App
