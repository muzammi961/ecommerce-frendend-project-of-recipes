import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import  DecodeImageUrl  from "../../utils/decordeurl";

const apiUrl = import.meta.env.VITE_API_URL;

// Local fallback image
const fallbackImage = "https://cdn.pixabay.com/photo/2017/12/09/08/18/food-3007395_1280.jpg";

function ProductData() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [searched, setSearch] = useState("");
  const [categoryName, setCategoryName] = useState("Main dish");
  const [isLoading, setIsLoading] = useState(false);
  const [categorydata, setCategorydata] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showActions, setShowActions] = useState(false);
  
  const token = localStorage.getItem("access");

  // Memoized fetch functions
  const fetchData = useCallback(async (category) => {
    setCategoryName(category);
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${apiUrl}/products/ViewProductsByCategory/${category}/`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setProducts(response.data);
      console.log("mage is s  s ",DecodeImageUrl(response.data[4].item_photo))
    } catch (error) {
      console.error("Error fetching data", error);
      // toast.error("Failed to load products");
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  const getcategoryfunc = useCallback(async () => {
    try {
      const token = localStorage.getItem('access');
      const getcat = await axios.get(`${apiUrl}/products/GetallCategory/`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCategorydata(getcat.data);
    } catch (e) {
      console.log('Could not fetch categories');
    }
  }, []);

  useEffect(() => {
    // sessionStorage.setItem("cartitembull",false)
     sessionStorage.setItem("itemquantitybull",1); 
     sessionStorage.setItem("cartitembull", "false");
    fetchData(categoryName);
    getcategoryfunc();
  }, [fetchData, getcategoryfunc, categoryName]);

  // Navigation handlers
  const CartSection = () => {
    toast.success("Redirecting to cart");
    navigate("/cartsection");
  };

  const WishlistSection = () => {
    toast.success("Redirecting to wishlist");
    navigate("/wishlistsection");
  };

  const logoutfunc = () => navigate('/LogoutSide');
  const changpasswordfunc = () => navigate('/changepassword');
  const orderdetailsfunc = () => navigate('/OrderDetail');

  // Data filtering
  const filteredData = products.filter((item) =>
    item.productname.toLowerCase().includes(searched.toLowerCase())
  );

  // Cart and wishlist operations
  const addToCart = async (productId) => {
    try {
      const postValue = { product: productId, quantity: 1 };
      await axios.post(`${apiUrl}/cart/AddProductCart/`, postValue, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success("Added to cart!");
    } catch (e) {
      console.error("Error adding to cart:", e.message);
      toast.error("Failed to add to cart");
    }
  };

  const addToWishlist = async (productId) => {
    try {
      await axios.post(
        `${apiUrl}/cart/AddProductWishlist/`,
        { product: productId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Added to wishlist!");
    } catch (e) {
      console.error("Error adding to wishlist:", e.message);
      toast.error("Failed to add to wishlist");
    }
  };

  const addOrder = async (productId) => {
    try {
      const response = await axios.get(`${apiUrl}/orders/UseraddressGet`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (!response.data[0]?.nameofuser) {
        // toast.error("Please add your address first");
        console.log('add your address first')

        try {
          await addToCart(productId); // Reuse addToCart function
          toast.error("address section");
          navigate(`/Userformaddress/${productId}`);
        } catch (e) {
          console.error("Error:", e);
        }
      } else {
        await addToCart(productId);
        navigate(`/OrderOneProduct/${productId}`);
      }
    } catch (e) {
      toast.error("Error processing your order");
      console.error("Error in ordering:", e);
    }
  };

  // Image handler with proper fallback
  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = fallbackImage;
  };

  if (selectedProduct) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-white p-4 sm:p-6">
      <div className="max-w-6xl mx-auto">
        <button 
          onClick={() => setSelectedProduct(null)}
          className="flex items-center text-amber-600 mb-4 sm:mb-6 hover:text-amber-800 transition"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Back to Menu
        </button>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="md:flex">
            {/* Product Image */}
            <div className="md:w-1/2 p-4 sm:p-6 md:p-8">
              <img 
                src={DecodeImageUrl(selectedProduct.item_photo)}
                alt={selectedProduct.productname} 
                className="w-full h-64 sm:h-80 md:h-96 object-contain rounded-lg"
                onError={handleImageError}
              />
            </div>

            {/* Product Details */}
            <div className="md:w-1/2 p-4 sm:p-6 md:p-8">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-3 sm:mb-4">
                {selectedProduct.productname}
              </h1>
              
              <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                {selectedProduct.offer_price ? (
                  <>
                    <p className="text-xl sm:text-2xl font-bold text-amber-600">
                      ₹{selectedProduct.offer_price}
                    </p>
                    <p className="line-through text-base sm:text-lg text-gray-400">
                      ₹{selectedProduct.price}
                    </p>
                    <span className="bg-green-100 text-green-800 text-xs sm:text-sm px-2 sm:px-3 py-1 rounded-full">
                      {Math.round((1 - selectedProduct.offer_price/selectedProduct.price) * 100)}% OFF
                    </span>
                  </>
                ) : (
                  <p className="text-xl sm:text-2xl font-bold text-amber-600">
                    ₹{selectedProduct.price}
                  </p>
                )}
              </div>

              <div className="mb-6 sm:mb-8">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2 sm:mb-3">
                  Description
                </h3>
                <p className="text-gray-600 text-sm sm:text-base">
                  {selectedProduct.description || "This delicious dish is prepared with the finest ingredients to give you an authentic taste experience."}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
                <button 
                  onClick={() => addToCart(selectedProduct.id)}
                  className="w-full sm:flex-1 py-2 sm:py-3 bg-amber-100 text-amber-800 rounded-full font-bold hover:bg-amber-200 transition shadow-md flex items-center justify-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  Add to Cart
                </button>
                <button 
                  onClick={() => addOrder(selectedProduct.id)}
                  className="w-full sm:flex-1 py-2 sm:py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-full font-bold hover:from-amber-600 hover:to-amber-700 transition shadow-md flex items-center justify-center gap-2"
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
      <Toaster position="bottom-right" />
    </div>
    );
  }

  return (
     <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      {/* Navigation Bar */}
      <nav className="bg-gradient-to-r from-amber-400 to-amber-500 w-full sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Logo */}
          <div 
            className="flex items-center gap-2 text-2xl font-bold text-white cursor-pointer"
            onClick={() => navigate('/prodecthomeside')}
          >
            <span className="bg-white text-amber-500 p-2 rounded-full">🍽️</span>
            <span>FoodieZone</span>
          </div>

          {/* Category Tabs - Scrollable on mobile */}
          <div className="flex-1 w-full overflow-x-auto whitespace-nowrap no-scrollbar">
            <div className="flex space-x-2 md:space-x-4">
              {categorydata.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => fetchData(cat.name)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-300 ${
                    categoryName === cat.name
                      ? "bg-white text-amber-600 shadow-md"
                      : "text-white hover:bg-amber-300 hover:text-white"
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          {/* Search and Actions - Stack on mobile */}
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <input 
                onChange={(e) => setSearch(e.target.value)} 
                type="text" 
                placeholder="Search food..." 
                className="w-full pl-10 pr-4 py-2 rounded-full border-none bg-white/90 focus:outline-none focus:ring-2 focus:ring-amber-400 text-gray-700"
              />
              <svg
                className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"  
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            <div className="flex items-center gap-2">
              <button onClick={WishlistSection} className="p-2 rounded-full bg-white text-red-500 hover:bg-red-50 transition-colors shadow-md" aria-label="Wishlist">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                </svg>
              </button>

              <button onClick={CartSection} className="p-2 rounded-full bg-white text-green-600 hover:bg-green-50 transition-colors shadow-md relative" aria-label="Cart">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/>
                </svg>
              </button>

              <div className="relative">
                <button 
                  className="py-1 px-3 bg-gradient-to-r from-[#6e8efb] to-[#a777e3] text-white border-none rounded-md text-xs font-semibold cursor-pointer shadow-sm transition-all duration-200 relative overflow-hidden hover:shadow-md active:translate-y-0"
                  onClick={() => setShowActions(!showActions)}
                >
                  {showActions ? 'Hide Menu' : 'Account Menu'}
                  <span className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-[linear-gradient(to_bottom_right,rgba(255,255,255,0)_0%,rgba(255,255,255,0)_45%,rgba(255,255,255,0.3)_48%,rgba(255,255,255,0)_50%,rgba(255,255,255,0)_100%)] rotate-[30deg] animate-[shine_3s_infinite_linear]"></span>
                </button>
                
                {showActions && (
                  <div className="absolute right-0 z-20 w-[160px] flex flex-col gap-1 mt-1 animate-[fadeIn_0.2s_ease-out]">
                    <button onClick={changpasswordfunc} className="w-full py-1.5 px-3 bg-[#f5f5f5] border border-solid border-[#ddd] rounded text-xs text-left cursor-pointer transition-all duration-150 hover:bg-[#e9e9e9] hover:translate-x-0.5 text-[#d35400]">
                      Change Password
                    </button>
                    <button onClick={logoutfunc} className="w-full py-1.5 px-3 bg-[#f5f5f5] border border-solid border-[#ddd] rounded text-xs text-left cursor-pointer transition-all duration-150 hover:bg-[#e9e9e9] hover:translate-x-0.5 text-[#c0392b]">
                      Logout
                    </button>
                    <button onClick={orderdetailsfunc} className="w-full py-1.5 px-3 bg-[#f5f5f5] border border-solid border-[#ddd] rounded text-xs text-left cursor-pointer transition-all duration-150 hover:bg-[#e9e9e9] hover:translate-x-0.5 text-[#16a085]">
                      Order Details
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-amber-800 capitalize">{categoryName || "All Products"}</h2>
          <p className="text-amber-600">Showing {filteredData.length > 0 ? filteredData.length : products.length} items</p>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
          </div>
        )}

        {/* Products Grid */}
        {!isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {(filteredData.length > 0 ? filteredData : products).map((item) => (
              <div key={item.id} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div onClick={() => setSelectedProduct(item)} className="relative h-48 overflow-hidden group cursor-pointer">
                  <img 
                    src={DecodeImageUrl(item.item_photo)}
                    alt={item.productname} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {item.offer_price && (
                    <div className="absolute top-3 right-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold shadow-md">
                      {Math.round(((item.price - item.offer_price) / item.price) * 100)}% OFF
                    </div>
                  )}
                </div>

                <div className="p-5">
                  <h3 className="text-lg font-bold text-gray-800 mb-2">{item.productname}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{item.description}</p>

                  <div className="flex items-center justify-between mb-4">
                    <div>
                      {item.offer_price ? (
                        <>
                          <span className="text-sm text-gray-400 line-through">₹{item.price}</span>
                          <span className="ml-2 text-lg font-bold text-green-600">₹{item.offer_price}</span>
                        </>
                      ) : (
                        <span className="text-lg font-bold text-green-600">₹{item.price}</span>
                      )}
                    </div>
                    <div className="flex items-center">
                      <svg className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="text-sm text-gray-600 ml-1">4.5</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <button 
                      onClick={() => addOrder(item.id)} 
                      className="px-2 py-1 sm:px-3 sm:py-2 bg-gradient-to-r from-amber-400 to-amber-500 text-white rounded-lg hover:from-amber-500 hover:to-amber-600 transition-all duration-300 text-xs sm:text-sm font-medium flex items-center justify-center"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
                      </svg>
                      Order
                    </button>
                    <button 
                      onClick={() => addToCart(item.id)}
                      className="px-2 py-1 sm:px-3 sm:py-2 bg-amber-100 text-amber-800 rounded-lg hover:bg-amber-200 transition-all duration-300 text-xs sm:text-sm font-medium flex items-center justify-center"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/>
                      </svg>
                      Cart
                    </button>
                    <button 
                      onClick={() => addToWishlist(item.id)} 
                      className="px-2 py-1 sm:px-3 sm:py-2 bg-amber-100 text-amber-800 rounded-lg hover:bg-amber-200 transition-all duration-300 text-xs sm:text-sm font-medium flex items-center justify-center"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                      </svg>
                      Save
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {/* Empty State */}
        {!isLoading && products.length === 0 && (
          <div className="text-center py-20">
            <div className="text-amber-500 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <h3 className="text-xl font-medium text-gray-700 mb-2">No products found</h3>
            <p className="text-gray-500">We couldn't find any products in this category</p>
          </div>
        )}
      </div>
      <Toaster position="bottom-right" />
    </div>
  );
}

export default ProductData;