import { Link } from "react-router-dom";
import toast,{Toaster} from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const AdminSidebar = () => {
let navigation=useNavigate()
  const categories = [
    { id: 1, name: 'AdminViewallCategary'},
    { id: 2, name: 'AdminAddcategary'},
  ];

  const recentProducts = [
    { id: 1, name: 'AdminsideAddProduct'},
    { id: 2, name: 'AdminsideSeeproducts'},
    { id: 3, name: 'ViewallProudctByCategary' },
  ];

   const userside = [
    { id: 1, name: 'AdminsideViewallUser'},
    { id: 4, name: 'OrderDetailsAdmin'}
   
  ];
 

let logoutfun=async()=>{
  try{
  let accesstoken=localStorage.getItem('access')
  let refreshtoken=localStorage.getItem('refresh')
  console.log(accesstoken,'             ',refreshtoken)
  await axios.post('http://127.0.0.1:8000/authentication/UserLogout/',{refresh:refreshtoken},{
    headers:{
    Authorization:`Bearer ${accesstoken}`}})
  localStorage.removeItem('access')
  localStorage.removeItem('refresh')
  console.log('access token .....',accesstoken)
  navigation('/loginpage')
  toast.success('you could logout ....!')
  }catch(e){
   toast.error("you could not logout ....!")
  }
}



  return (
    <div className="bg-gradient-to-b from-indigo-900 to-purple-800 text-white w-64 min-h-screen p-6 flex flex-col">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Admin Panel</h1>
        <p className="text-indigo-200 text-sm">Dashboard Overview</p>
      </div>

      <nav className="flex-1">
        <div className="mb-8">
          <h2 className="text-xs uppercase tracking-wider text-indigo-300 mb-4">Categories</h2>
          <ul className="space-y-2">
            {categories.map(category => (
              <li key={category.id}>
                <div  className="flex items-center justify-between p-2 rounded-lg hover:bg-indigo-700 transition">
                  <Link  to={`/${category.name}`}><span>{category.name}</span></Link>
                  <span className="bg-indigo-600 text-xs px-2 py-1 rounded-full">{category.count}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-xs uppercase tracking-wider text-indigo-300 mb-4"> Products</h2>
          <ul className="space-y-3">
           {recentProducts.map(product => (
              <li key={product.id}>
                <div className="flex items-center justify-between p-2 rounded-lg hover:bg-indigo-700 transition">
                  <Link  to={`/${product.name}`}  ><span>{product.name}</span></Link>
                  {/* <span className="bg-indigo-600 text-xs px-2 py-1 rounded-full">{category.count}</span> */}
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="mb-8">
          <h2 className="text-xs uppercase tracking-wider text-indigo-300 mb-4">User </h2>
          <ul className="space-y-2">
            {userside.map(us => (
              <li key={us.id}>
                <div  className="flex items-center justify-between p-2 rounded-lg hover:bg-indigo-700 transition">
                  <Link  to={`/${us.name}`}><span>{us.name}</span></Link>
                  {/* <span className="bg-indigo-600 text-xs px-2 py-1 rounded-full">{category.count}</span> */}
                </div>
              </li>
            ))}
          </ul>
        </div>
         

      </nav>

      <div className="pt-4 border-t border-indigo-700">
        <a href="#" className="flex items-center p-2 rounded-lg hover:bg-indigo-700 transition">
          ⚙️ <span className="ml-2">Settings</span>
        </a>
        <div  className="flex items-center p-2 rounded-lg text-red-200 hover:text-red-100 hover:bg-indigo-700 transition">
          🚪 < button onClick={logoutfun} className="ml-2">Logout</button>
        </div>
      </div>
      <Toaster position="bottom-right"/>
    </div>
  );
};

export default AdminSidebar;
