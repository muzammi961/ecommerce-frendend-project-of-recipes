// import { useState,useEffect } from "react"
// import toast,{Toaster} from 'react-hot-toast'
// import axios from "axios"
// import hotellogo from '../../assets/hotellogo.jpg'
// import './prodectstyle/prodectst.css'
// import { Link } from "react-router-dom"
// import { useNavigate } from "react-router-dom"
// function Prodecthomepage(){
// let[serch,setSerch]=useState('')
//   let navigation=useNavigate()
//   const [products, setProducts] = useState([]);
//   let token=localStorage.getItem('access')
//   console.log(token)
//   useEffect(() => {
//     // toast('login seccsses')
//     const fetchData = async () => {
//       try {
//         let response = await axios.get("http://127.0.0.1:8000/products/ViewProductsByCategory/main dish/",{headers:{Authorization:`Bearer ${token}`}});
//         console.log(response.data)
//         setProducts(response.data);
//       } catch (error) {
//         console.log("Error fetching data:", error);
//       }
//     };
//     fetchData();
//   }, []);



// const oneByoneOrderFunc = async (cartid) => {
//   console.log('categary number ...',cartid)
//   // try {
//   //   const response = await axios.post(`http://127.0.0.1:8000/orders/OrderOneProductView/${cartid}/`,{},{headers: {Authorization: `Bearer ${token}`}});
//   // } catch (e) {
//   //   toast.error('Cart did not add to order section');
//   //   console.error('Error:', e.message);
//   // }
// try {
//     let urldata = await axios.get('http://127.0.0.1:8000/orders/UseraddressGet',{ headers:{Authorization:`Bearer ${token}`}});
//     if (!urldata.data[0]?.nameofuser) {
//       toast.error('User address not received.');
//       toast.success('address section..')
//       navigation('/Userformaddress')
//     } else {
//       toast.success('order section...')
//       navigation(`/OrderOneProduct/${cartid}`)
//     }
//   } catch (e) {
//     toast.error('Cart is empty!');
//     console.log('Error:', e);
//   }
// };




//   const addToWishlist = async (productId) => {
//     try {
//       await axios.post(
//         "http://127.0.0.1:8000/cart/AddProductWishlist/",
//         { product: productId },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       toast.success("You have added the product to wishlist");
//     } catch (e) {
//       console.error("Error adding to wishlist:", e.message);
//       toast.error("Failed to add to wishlist");
//     }
//   };



//   const addToCart = async (productId) => {
//     try {
//       const postValue = {
//         product: productId,
//         quantity: 1,
//       };
//       const response = await axios.post(
//         "http://127.0.0.1:8000/cart/AddProductCart/",
//         postValue,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       toast.success("You have added the product to cart");
//     } catch (e) {
//       console.error("Error adding to cart:", e.message);
//       toast.error("Failed to add to cart");
//     }
//   };



//     return(
//     <div   style={{backgroundImage: products.length > 0 ?`url(http://127.0.0.1:8000${products[0].item_photo})`: 'none'}} className="w-full h-auto bg-cover bg-no-repeat bg-center">
//   <div className="w-full h-[30rem] mx-auto shadow-lg bg-cover bg-center bg-no-repeat overflow-hidden animate-mainrecipe menu-mainrecipe ">
//     <div className="m-3 px-6 flex items-center justify-between  rounded-3xl">
//     <img className="w-16 h-16 object-cover rounded-full" src={hotellogo} alt="Logo" />
//       <form className=" flex items-center gap-2  ">
//         <input type="text" placeholder="Search" className="placeholder-white placeholder:font-bold outline-none  text-white px-3 py-2 rounded-lg focus:outline-none border border-gray-300 backdrop-blur"/>
//         <button className="outline-none border-gray-300 text-white px-4 py-2 rounded-lg  border backdrop-blur">Search</button>
//       </form>
//       <div className="flex gap-3">
//         <Link to={'/'} className="px-4 py-2 border rounded-lg shadow border-gray-300 text-white backdrop-blur">Register</Link>
//         <Link to={'/loginpage'} className="px-4 py-2 border rounded-lg border-gray-300 text-white backdrop-blur">Login</Link>
//       </div>
//     </div>
//     <div>
//       <div className="text-center py-12 bg-gradient-to-r  rounded-lg shadow-md">
//   <h1 className=" text-amber-400 mb-4 text-2xl sm:text-3xl md:text-4xl lg:text-7xl font-bold"> Welcome to Fusion Feast – Where Global Flavors Unite!</h1>
//   <p className="text-lg text-amber-200 max-w-3xl mx-auto">Discover bold, unique, and gourmet recipes that blend cultures and creativity into every bite. Whether you're craving comfort or culinary adventure, our curated recipes promise something extraordinary for every foodie.</p>
//     <br/>
//   <Link to={'/prodectdata'}  className="text-white border py-2 px-4 rounded-md border-gray-300 backdrop-blur-2xl">show recipes</Link>
// </div>
//     </div>  
//   </div>
//   {products.map((product,index)=>(
//     // <h1 key={index.id}>{element.productname}</h1>
//     <div className=" shadow-lg  p-4 w-full  hover:scale-105 transition-transform duration-700 flex flex-col ">
//       <img src={`http://127.0.0.1:8000${product.item_photo}`} alt={product.productname} className="h-screen w-screen object-cover rounded-xl"/>
//       <div className="mt-4 rounded-2xl w-2/2">
//         <h2 className="text-lg font-semibold text-white">{product.productname}</h2>
//         <p className="text-sm text-white mt-1">{product.description}</p>
//         <div className="flex items-center justify-between mt-3">
//           <span className="text-lg font-bold text-green-600">₹{product.price}</span>
//           <span className="text-lg font-bold text-green-600">₹{product.offer_price}</span>
//            <button onClick={() => addToCart(product.id)}className="px-4 py-2 rounded-lg bg-yellow-400 text-black hover:bg-yellow-300 transition-colors font-semibold"> Add Cart</button>
//             <button onClick={() => oneByoneOrderFunc(product.id)}className="px-4 py-2 rounded-lg bg-yellow-400 text-black hover:bg-yellow-300 transition-colors font-semibold">Order</button>
//              <button onClick={() => addToWishlist(product.id)}className="px-4 py-2 rounded-lg bg-yellow-400 text-black hover:bg-yellow-300 transition-colors font-semibold">Wishlist</button>
//         </div>
//       </div>
//     </div> 
//    ))};
//    <Toaster position="bottom-right" />
// </div>


//     )
// }
// export default Prodecthomepage;












import { useState, useEffect } from "react";
import toast, { Toaster } from 'react-hot-toast';
import axios from "axios";
import hotellogo from '../../assets/hotellogo.jpg';
import './prodectstyle/prodectst.css';
import { Link, useNavigate } from "react-router-dom";

function Prodecthomepage() {
  const [search, setSearch] = useState('');
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const token = localStorage.getItem('access');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          "http://127.0.0.1:8000/products/ViewProductsByCategory/main dish/",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setProducts(response.data);
      } catch (error) {
        console.log("Error fetching data:", error);
        toast.error("Failed to load products");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [token]);
                                                          // erro here 
  const oneByoneOrderFunc = async (cartid) => {   
    
    alert(`this is the order id form the homside ${cartid}`)
    console.log('this is the order id form homside .....',cartid)
    try {
      let token=localStorage.getItem('access')
      const urldata = await axios.get('http://127.0.0.1:8000/orders/UseraddressGet', { headers: { Authorization: `Bearer ${token}`}});
      if (!urldata.data[0]?.nameofuser) {
        toast.error('Please add your address first');
         

       try {
         const postValue = {
              product: cartid,
               quantity: 1,
              };
              await axios.post("http://127.0.0.1:8000/cart/AddProductCart/",postValue,{headers: {Authorization: `Bearer ${token}`,},});
              toast.success("Added to cart!");
            } catch (e) {
              console.error("Error adding to cart:", e.message);
              toast.error("Failed to add to cart");
            }





        navigate(`/Userformaddress/${cartid}`);
      } else {
        

        try {
         const postValue = {
              product: cartid,
               quantity: 1,
              };
              await axios.post("http://127.0.0.1:8000/cart/AddProductCart/",postValue,{headers: {Authorization: `Bearer ${token}`,},});
              toast.success("Added to cart!");
            } catch (e) {
              console.error("Error adding to cart:", e.message);
              toast.error("Failed to add to cart");
            }
            navigate(`/OrderOneProduct/${cartid}`)

        // navigate(`/OrderOneProduct/${cartid}`);           this is navigate to order sction
      }
    } catch (e) {
      toast.error('Error processing your order');
      console.log('Error:', e);
    }
  };

  const addToWishlist = async (productId) => {
    try {
      await axios.post(
        "http://127.0.0.1:8000/cart/AddProductWishlist/",
        { product: productId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Added to wishlist!");
    } catch (e) {
      toast.error("Failed to add to wishlist");
      console.error("Error:", e.message);
    }
  };

  const addToCart = async (productId) => {
    try {
      await axios.post(
        "http://127.0.0.1:8000/cart/AddProductCart/",
        { product: productId, quantity: 1 },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Added to cart!");
    } catch (e) {
      toast.error("Failed to add to cart");
      console.error("Error:", e.message);
    }
  };

  const filteredProducts = products.filter(product =>
    product.productname.toLowerCase().includes(search.toLowerCase())
  );


const [selectedProduct, setSelectedProduct] = useState(null);

return (
  <>
    {selectedProduct ? (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-white p-6">
        <div className="max-w-6xl mx-auto">
          <button 
            onClick={() => setSelectedProduct(null)}
            className="flex items-center text-amber-600 mb-6 hover:text-amber-800 transition"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back to Menu
          </button>

          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/2 p-8">
                <img 
                  src={`http://127.0.0.1:8000${selectedProduct.item_photo}`} 
                  alt={selectedProduct.productname} 
                  className="w-full h-96 object-contain rounded-lg"
                  onError={(e) => {
                    e.target.onerror = null; 
                    e.target.src = 'https://via.placeholder.com/400x300?text=Image+Not+Available';
                  }}
                />
              </div>
              <div className="md:w-1/2 p-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-4">{selectedProduct.productname}</h1>
                
                <div className="flex items-center gap-4 mb-6">
                  {selectedProduct.offer_price ? (
                    <>
                      <p className="text-2xl font-bold text-amber-600">₹{selectedProduct.offer_price}</p>
                      <p className="line-through text-lg text-gray-400">₹{selectedProduct.price}</p>
                      <span className="bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full">
                        {Math.round((1 - selectedProduct.offer_price/selectedProduct.price) * 100)}% OFF
                      </span>
                    </>
                  ) : (
                    <p className="text-2xl font-bold text-amber-600">₹{selectedProduct.price}</p>
                  )}
                </div>

                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">Description</h3>
                  <p className="text-gray-600">
                    {selectedProduct.description || "This delicious dish is prepared with the finest ingredients to give you an authentic taste experience."}
                  </p>
                </div>

                <div className="flex items-center gap-4 mb-8">
                  <button 
                    onClick={() => addToCart(selectedProduct.id)}
                    className="flex-1 py-3 bg-amber-100 text-amber-800 rounded-full font-bold hover:bg-amber-200 transition shadow-md flex items-center justify-center gap-2"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    Add to Cart
                  </button>
                  <button 
                    onClick={() => oneByoneOrderFunc(selectedProduct.id)}
                    className="flex-1 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-full font-bold hover:from-amber-600 hover:to-amber-700 transition shadow-md flex items-center justify-center gap-2"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                    Order Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Toaster position="bottom-right"/>
      </div>
    ) : (
      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
         <div className="min-h-screen bg-gradient-to-br from-amber-50 to-white">
      {/* Hero Section */}
      <div className="relative w-full h-screen overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-black/10 to-transparent z-0"></div>
        <div className="menu-mainrecipe absolute inset-0 bg-cover bg-center"></div>
        
        {/* Navigation */}
        <nav className="relative z-10 py-4 px-6 backdrop-blur-sm bg-white/90 shadow-md">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-3 group">
              <img 
                className="w-12 h-12 object-cover rounded-full border-2 border-amber-500 group-hover:border-amber-600 transition-all duration-300" 
                src={hotellogo} 
                alt="Hotel Logo" 
              />
              <span className="text-amber-800 font-bold text-xl hidden md:block font-serif tracking-wide">
                Fusion <span className="text-amber-600">Feast</span>
              </span>
            </Link>

            <div className="flex-1 max-w-md mx-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search dishes..."
                  className="w-full px-5 py-2.5 rounded-full bg-white text-amber-900 placeholder-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-400 border border-amber-200 shadow-sm transition-all duration-300 hover:shadow-md focus:shadow-lg"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-amber-600 hover:text-amber-700 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Link 
                to={'/'} 
                className="px-5 py-2.5 rounded-full text-amber-800 hover:bg-amber-100 transition-all duration-300 border border-amber-300 hover:border-amber-400 shadow-sm hover:shadow-md font-medium"
              >
                Register
              </Link>
              <Link 
                to={'/loginpage'} 
                className="px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 text-white hover:from-amber-600 hover:to-amber-700 transition-all duration-300 shadow-md hover:shadow-lg font-medium"
              >
                Login
              </Link>
            </div>
          </div>
        </nav>

        {/* Hero Content */}
        <div className="relative z-10 h-full flex items-center justify-center text-center px-4">
          <div className="max-w-4xl mx-auto backdrop-blur-sm bg-white/40 p-10 rounded-2xl border border-white/20 shadow-xl">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-amber-800 mb-6 font-serif leading-tight">
              Welcome to <span className="text-amber-600">Fusion Feast</span>
            </h1>
            <p className="text-xl text-amber-800 mb-8 max-w-2xl mx-auto leading-relaxed font-medium">
              Where Global Flavors Unite! Discover bold, unique, and gourmet recipes that blend cultures and creativity into every bite.
            </p>
            <Link 
              to={'/prodectdata'} 
              className="inline-block px-10 py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-full font-semibold hover:from-amber-600 hover:to-amber-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl text-lg"
            >
              Explore Our Recipes →
            </Link>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="flex flex-col items-center">
            <span className="text-white text-sm mb-2 font-medium">Scroll Down</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-amber-800 mb-4 font-serif">
            Our Signature <span className="text-amber-600">Dishes</span>
          </h2>
          <p className="text-lg text-amber-700 max-w-2xl mx-auto">
            Handcrafted culinary masterpieces that will delight your senses
          </p>
          <div className="mt-6 flex justify-center">
            <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full"></div>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-14 w-14 border-t-2 border-b-2 border-amber-500"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredProducts.map((product) => (
              <div 
                key={product.id} 
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group hover:-translate-y-2"
              >
                <div  onClick={() => setSelectedProduct(product)} className="relative h-72 overflow-hidden">
                  <img 
                    src={`http://127.0.0.1:8000${product.item_photo}`} 
                    alt={product.productname} 
                    className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
                    onError={(e) => {
                      e.target.onerror = null; 
                      e.target.src = 'https://via.placeholder.com/400x300?text=Image+Not+Available';
                    }}
                  />
                  {product.offer_price && (
                    <div className="absolute top-4 right-4 bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-1 rounded-full text-sm font-bold shadow-md">
                      {Math.round(((product.price - product.offer_price) / product.price) * 100)}% OFF
                    </div>
                  )}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                    <h3 className="text-xl font-bold text-white">{product.productname}</h3>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <span className={`text-lg font-bold ${product.offer_price ? 'text-gray-400 line-through' : 'text-green-600'}`}>
                        ₹{product.price}
                      </span>
                      {product.offer_price && (
                        <span className="text-lg font-bold text-green-600">
                          ₹{product.offer_price}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center space-x-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-500" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="text-sm text-gray-500">4.8</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <button 
                      onClick={() => addToCart(product.id)}
                      className="px-3 py-2 rounded-lg bg-amber-100 text-amber-800 hover:bg-amber-200 transition-all duration-300 font-medium text-sm flex items-center justify-center space-x-1 shadow-sm hover:shadow-md"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      <span>Cart</span>
                    </button>
                    <button 
                      onClick={() => oneByoneOrderFunc(product.id)}
                      className="px-3 py-2 rounded-lg bg-gradient-to-r from-amber-400 to-amber-500 text-white hover:from-amber-500 hover:to-amber-600 transition-all duration-300 font-medium text-sm flex items-center justify-center space-x-1 shadow-md hover:shadow-lg"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                      </svg>
                      <span>Order</span>
                    </button>
                    <button 
                      onClick={() => addToWishlist(product.id)}
                      className="px-3 py-2 rounded-lg bg-amber-100 text-amber-800 hover:bg-amber-200 transition-all duration-300 font-medium text-sm flex items-center justify-center space-x-1 shadow-sm hover:shadow-md"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                      <span>Save</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer CTA */}
      <div className="bg-gradient-to-r from-amber-500 to-amber-600 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-3xl font-bold text-white mb-4">Ready to experience culinary excellence?</h3>
          <p className="text-xl text-amber-100 mb-8">Join thousands of satisfied food lovers today</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              to={'/loginpage'} 
              className="px-8 py-3 bg-white text-amber-700 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Sign Up Now
            </Link>
            <Link 
              to={'/prodectdata'} 
              className="px-8 py-3 border-2 border-white text-white rounded-full font-semibold hover:bg-white/10 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Browse Menu
            </Link>
          </div>
        </div>
      </div>

      <Toaster position="bottom-right" />
    </div>
      </div>
    )}
  </>
);

}

export default Prodecthomepage;






//   return (
//     <div className="min-h-screen bg-gradient-to-br from-amber-50 to-white">
//       {/* Hero Section */}
//       <div className="relative w-full h-screen overflow-hidden">
//         <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-black/10 to-transparent z-0"></div>
//         <div className="menu-mainrecipe absolute inset-0 bg-cover bg-center"></div>
        
//         {/* Navigation */}
//         <nav className="relative z-10 py-4 px-6 backdrop-blur-sm bg-white/90 shadow-md">
//           <div className="max-w-7xl mx-auto flex items-center justify-between">
//             <Link to="/" className="flex items-center space-x-3 group">
//               <img 
//                 className="w-12 h-12 object-cover rounded-full border-2 border-amber-500 group-hover:border-amber-600 transition-all duration-300" 
//                 src={hotellogo} 
//                 alt="Hotel Logo" 
//               />
//               <span className="text-amber-800 font-bold text-xl hidden md:block font-serif tracking-wide">
//                 Fusion <span className="text-amber-600">Feast</span>
//               </span>
//             </Link>

//             <div className="flex-1 max-w-md mx-4">
//               <div className="relative">
//                 <input
//                   type="text"
//                   placeholder="Search dishes..."
//                   className="w-full px-5 py-2.5 rounded-full bg-white text-amber-900 placeholder-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-400 border border-amber-200 shadow-sm transition-all duration-300 hover:shadow-md focus:shadow-lg"
//                   value={search}
//                   onChange={(e) => setSearch(e.target.value)}
//                 />
//                 <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-amber-600 hover:text-amber-700 transition-colors">
//                   <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//                   </svg>
//                 </button>
//               </div>
//             </div>

//             <div className="flex items-center space-x-4">
//               <Link 
//                 to={'/'} 
//                 className="px-5 py-2.5 rounded-full text-amber-800 hover:bg-amber-100 transition-all duration-300 border border-amber-300 hover:border-amber-400 shadow-sm hover:shadow-md font-medium"
//               >
//                 Register
//               </Link>
//               <Link 
//                 to={'/loginpage'} 
//                 className="px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 text-white hover:from-amber-600 hover:to-amber-700 transition-all duration-300 shadow-md hover:shadow-lg font-medium"
//               >
//                 Login
//               </Link>
//             </div>
//           </div>
//         </nav>

//         {/* Hero Content */}
//         <div className="relative z-10 h-full flex items-center justify-center text-center px-4">
//           <div className="max-w-4xl mx-auto backdrop-blur-sm bg-white/40 p-10 rounded-2xl border border-white/20 shadow-xl">
//             <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-amber-800 mb-6 font-serif leading-tight">
//               Welcome to <span className="text-amber-600">Fusion Feast</span>
//             </h1>
//             <p className="text-xl text-amber-800 mb-8 max-w-2xl mx-auto leading-relaxed font-medium">
//               Where Global Flavors Unite! Discover bold, unique, and gourmet recipes that blend cultures and creativity into every bite.
//             </p>
//             <Link 
//               to={'/prodectdata'} 
//               className="inline-block px-10 py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-full font-semibold hover:from-amber-600 hover:to-amber-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl text-lg"
//             >
//               Explore Our Recipes →
//             </Link>
//           </div>
//         </div>

//         {/* Scroll Indicator */}
//         <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
//           <div className="flex flex-col items-center">
//             <span className="text-white text-sm mb-2 font-medium">Scroll Down</span>
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
//             </svg>
//           </div>
//         </div>
//       </div>

//       {/* Products Section */}
//       <div className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
//         <div className="text-center mb-16">
//           <h2 className="text-4xl font-extrabold text-amber-800 mb-4 font-serif">
//             Our Signature <span className="text-amber-600">Dishes</span>
//           </h2>
//           <p className="text-lg text-amber-700 max-w-2xl mx-auto">
//             Handcrafted culinary masterpieces that will delight your senses
//           </p>
//           <div className="mt-6 flex justify-center">
//             <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full"></div>
//           </div>
//         </div>

//         {isLoading ? (
//           <div className="flex justify-center items-center py-20">
//             <div className="animate-spin rounded-full h-14 w-14 border-t-2 border-b-2 border-amber-500"></div>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
//             {filteredProducts.map((product) => (
//               <div 
//                 key={product.id} 
//                 className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group hover:-translate-y-2"
//               >
//                 <div className="relative h-72 overflow-hidden">
//                   <img 
//                     src={`http://127.0.0.1:8000${product.item_photo}`} 
//                     alt={product.productname} 
//                     className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
//                     onError={(e) => {
//                       e.target.onerror = null; 
//                       e.target.src = 'https://via.placeholder.com/400x300?text=Image+Not+Available';
//                     }}
//                   />
//                   {product.offer_price && (
//                     <div className="absolute top-4 right-4 bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-1 rounded-full text-sm font-bold shadow-md">
//                       {Math.round(((product.price - product.offer_price) / product.price) * 100)}% OFF
//                     </div>
//                   )}
//                   <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
//                     <h3 className="text-xl font-bold text-white">{product.productname}</h3>
//                   </div>
//                 </div>
//                 <div className="p-6">
//                   <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>
//                   <div className="flex items-center justify-between mb-4">
//                     <div className="flex items-center space-x-2">
//                       <span className={`text-lg font-bold ${product.offer_price ? 'text-gray-400 line-through' : 'text-green-600'}`}>
//                         ₹{product.price}
//                       </span>
//                       {product.offer_price && (
//                         <span className="text-lg font-bold text-green-600">
//                           ₹{product.offer_price}
//                         </span>
//                       )}
//                     </div>
//                     <div className="flex items-center space-x-1">
//                       <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-500" viewBox="0 0 20 20" fill="currentColor">
//                         <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                       </svg>
//                       <span className="text-sm text-gray-500">4.8</span>
//                     </div>
//                   </div>
//                   <div className="grid grid-cols-3 gap-3">
//                     <button 
//                       onClick={() => addToCart(product.id)}
//                       className="px-3 py-2 rounded-lg bg-amber-100 text-amber-800 hover:bg-amber-200 transition-all duration-300 font-medium text-sm flex items-center justify-center space-x-1 shadow-sm hover:shadow-md"
//                     >
//                       <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
//                       </svg>
//                       <span>Cart</span>
//                     </button>
//                     <button 
//                       onClick={() => oneByoneOrderFunc(product.id)}
//                       className="px-3 py-2 rounded-lg bg-gradient-to-r from-amber-400 to-amber-500 text-white hover:from-amber-500 hover:to-amber-600 transition-all duration-300 font-medium text-sm flex items-center justify-center space-x-1 shadow-md hover:shadow-lg"
//                     >
//                       <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
//                       </svg>
//                       <span>Order</span>
//                     </button>
//                     <button 
//                       onClick={() => addToWishlist(product.id)}
//                       className="px-3 py-2 rounded-lg bg-amber-100 text-amber-800 hover:bg-amber-200 transition-all duration-300 font-medium text-sm flex items-center justify-center space-x-1 shadow-sm hover:shadow-md"
//                     >
//                       <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
//                       </svg>
//                       <span>Save</span>
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>

//       {/* Footer CTA */}
//       <div className="bg-gradient-to-r from-amber-500 to-amber-600 py-16 px-4 sm:px-6 lg:px-8">
//         <div className="max-w-4xl mx-auto text-center">
//           <h3 className="text-3xl font-bold text-white mb-4">Ready to experience culinary excellence?</h3>
//           <p className="text-xl text-amber-100 mb-8">Join thousands of satisfied food lovers today</p>
//           <div className="flex flex-col sm:flex-row justify-center gap-4">
//             <Link 
//               to={'/loginpage'} 
//               className="px-8 py-3 bg-white text-amber-700 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl"
//             >
//               Sign Up Now
//             </Link>
//             <Link 
//               to={'/prodectdata'} 
//               className="px-8 py-3 border-2 border-white text-white rounded-full font-semibold hover:bg-white/10 transition-all duration-300 shadow-lg hover:shadow-xl"
//             >
//               Browse Menu
//             </Link>
//           </div>
//         </div>
//       </div>

//       <Toaster position="bottom-right" />
//     </div>
//   );
// }

// export default Prodecthomepage;