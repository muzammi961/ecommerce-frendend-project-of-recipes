import { useState, useEffect } from 'react';
import axios from 'axios';
// import bgimage from '../../assets/backgroundImage.jpg';

import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
const apiUrl = import.meta.env.VITE_API_URL;
import  DecodeImageUrl  from "../../utils/decordeurl";

function Wishlist() {
  const [products, setProducts] = useState([]);
  const token = localStorage.getItem('access');
  const navigate = useNavigate();

  useEffect(() => {
     sessionStorage.setItem("itemquantitybull",1); 
     sessionStorage.setItem("cartitembull", "false");
    const fetchWishlist = async () => {
      try {
        const response = await axios.get(`${apiUrl}/cart/WishListViewByUser/`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProducts(response.data);
      } catch (error) {
        console.log('Error fetching wishlist:', error);
      }
    };
    fetchWishlist();
  }, []);

  const addToCart = async (productId) => {
    try {
      const postValue = { product: productId, quantity: 1 };
      const response = await axios.post(
        `${apiUrl}/cart/AddProductCart/`,
        postValue,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success('Product added to cart!');
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error('Could not add product to cart');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `${apiUrl}/cart/DeletetheWishListOneByOne/${id}/`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setProducts((prev) => prev.filter((item) => item.id !== id));
      toast.success('Item removed from wishlist');
    } catch (error) {
      console.log('Error deleting product:', error);
      toast.error('Failed to remove item');
    }
  };

  const oneByOneOrderFunc = async (cartId) => {
    try {
      const res = await axios.get(`${apiUrl}/orders/UseraddressGet`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.data[0]?.nameofuser) {
        toast.error('Please complete your address first.');
           try {
         const postValue = {
              product: cartId,
               quantity: 1,
              };
              await axios.post(`${apiUrl}/cart/AddProductCart/`,postValue,{headers: {Authorization: `Bearer ${token}`,},});
              toast.success("Added to cart!");
            } catch (e) {
              console.error("Error adding to cart:", e.message);
              toast.error("Failed to add to cart");
            }
        


        navigate(`/Userformaddress/${cartId}`);
      } else {
        navigate(`/OrderOneProduct/${cartId}`);
      }
    } catch (error) {
      toast.error('Something went wrong. Try again.');
      console.log('Error:', error);
    }
  };

  return (
 <div
      className="min-h-screen bg-fixed bg-cover bg-center p-4 sm:p-6"
      style={{
        backgroundColor: "rgba(255, 255, 0, 0.4)",
        backdropFilter: "blur(4px)",
        WebkitBackdropFilter: "blur(4px)"
      }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header with gradient */}
        <div className="mb-6 sm:mb-8">
          <button
            onClick={() => window.history.back()}
            className="group relative overflow-hidden bg-gradient-to-r from-amber-100 to-amber-50 hover:from-amber-200 hover:to-amber-100 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full shadow-sm hover:shadow-md transition-all duration-300 flex items-center border border-amber-200"
          >
            <span className="absolute inset-0 w-2 bg-amber-400 transition-all duration-300 ease-out group-hover:w-full"></span>
            <span className="relative flex items-center text-amber-700 group-hover:text-amber-800 font-medium text-xs sm:text-sm">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-4 sm:w-4 mr-1 transition-transform group-hover:-translate-x-0.5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Back
            </span>
          </button>
          <h2 className="text-2xl sm:text-3xl font-bold text-white drop-shadow-md mb-1 sm:mb-2">Your Wishlist</h2>
          <p className="text-black font-medium text-sm sm:text-base">
            {products.length} {products.length === 1 ? 'item' : 'items'} saved
          </p>
        </div>

        {products.length === 0 ? (
          <div className="bg-white/90 backdrop-blur-sm rounded-xl sm:rounded-2xl p-6 sm:p-8 text-center shadow-lg sm:shadow-xl">
            <div className="text-amber-500 mb-3 sm:mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 sm:h-16 sm:w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-1 sm:mb-2">Your wishlist is empty</h3>
            <p className="text-gray-600 mb-3 sm:mb-4 text-sm sm:text-base">Save your favorite items to see them here</p>
            <button 
              onClick={() => navigate('/prodectdata')}
              className="px-4 py-1.5 sm:px-6 sm:py-2 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-lg font-semibold hover:from-amber-600 hover:to-amber-700 transition-all shadow-md text-sm sm:text-base"
            >
              Browse Products
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {products.map((element, index) => (
              <div
                key={index}
                className="bg-white/90 backdrop-blur-sm rounded-xl sm:rounded-2xl overflow-hidden shadow-lg sm:shadow-xl hover:shadow-2xl transition-all duration-300 border border-white/20 hover:-translate-y-1"
              >
                {/* Product Image */}
                <div className="relative h-40 sm:h-48 overflow-hidden group">
                  <img
                    src={DecodeImageUrl(element.product.item_photo)}
                    alt={element.product.productname}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {element.product.offer_price && (
                    <div className="absolute top-2 right-2 sm:top-3 sm:right-3 bg-red-500 text-white px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-xs font-bold shadow-md sm:shadow-lg animate-pulse">
                      {Math.round(
                        ((element.product.price - element.product.offer_price) / element.product.price) * 100
                      )}% OFF
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div className="p-3 sm:p-4 md:p-5">
                  <h2 className="text-base sm:text-lg md:text-xl font-bold text-gray-800 mb-1 sm:mb-2 line-clamp-1">
                    {element.product.productname}
                  </h2>
                  
                  <div className="flex items-center justify-between mb-2 sm:mb-3 md:mb-4">
                    <div>
                      {element.product.offer_price ? (
                        <>
                          <span className="text-xs sm:text-sm text-gray-400 line-through">
                            ₹{element.product.price}
                          </span>
                          <span className="ml-1 sm:ml-2 text-base sm:text-lg font-bold text-green-600">
                            ₹{element.product.offer_price}
                          </span>
                        </>
                      ) : (
                        <span className="text-base sm:text-lg font-bold text-green-600">
                          ₹{element.product.price}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center bg-amber-100 px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full">
                      <svg className="w-3 h-3 sm:w-4 sm:h-4 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="text-xs sm:text-sm text-amber-700 ml-0.5 sm:ml-1 font-medium">4.5</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-3 gap-1 sm:gap-2">
                    <button
                      onClick={() => handleDelete(element.id)}
                      className="px-2 py-1 sm:px-3 sm:py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-300 text-xs sm:text-sm font-medium flex items-center justify-center shadow-sm"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-4 sm:w-4 mr-0.5 sm:mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      <span className="hidden xs:inline">Remove</span>
                    </button>
                    <button
                      onClick={() => oneByOneOrderFunc(element.product.id)}
                      className="px-2 py-1 sm:px-3 sm:py-2 bg-gradient-to-r from-amber-400 to-amber-500 text-white rounded-lg hover:from-amber-500 hover:to-amber-600 transition-all duration-300 text-xs sm:text-sm font-medium flex items-center justify-center shadow-sm"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-4 sm:w-4 mr-0.5 sm:mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                      </svg>
                      <span className="hidden xs:inline">Order</span>
                    </button>
                    <button
                      onClick={() => addToCart(element.product.id)}
                      className="px-2 py-1 sm:px-3 sm:py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all duration-300 text-xs sm:text-sm font-medium flex items-center justify-center shadow-sm"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-4 sm:w-4 mr-0.5 sm:mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      <span className="hidden xs:inline">Cart</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      <Toaster 
        position="bottom-right"
        toastOptions={{
          style: {
            borderRadius: '12px',
            background: 'rgba(96, 165, 250, 0.9)',
            backdropFilter: 'blur(4px)',
            color: '#fff',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)'
          },
        }}
      />
    </div>
  );
}

export default Wishlist;