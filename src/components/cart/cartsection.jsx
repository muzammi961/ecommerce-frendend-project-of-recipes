import Mycontext from '../prodectside/createcontext'
import { useState,useContext } from 'react';
function Cartsection(){
const [quantity,setQuantity]=useState(1)
let {values}=useContext(Mycontext)
    return(<div>

   <h1>fa{values.id}</h1>

    </div>)
}
export default Cartsection;