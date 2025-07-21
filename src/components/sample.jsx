import axios from "axios"
import { useEffect } from "react"
function Sample(){

let func=async()=>{
    let value=await axios.get('http://127.0.0.1:8000/adminside/AdminViewallUser/')
     console.log(value.data)
}
useEffect(()=>{
func()
return(<h1>s</h1>)
})

    return(<>
    
    </>)
}

export default Sample;