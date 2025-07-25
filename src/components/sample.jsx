// import React from 'react';
// import { FaSearch, FaHeart, FaShoppingCart, FaUser, FaStar, FaStarHalfAlt } from 'react-icons/fa';
// import { FiStar } from 'react-icons/fi';
// import { FaFacebookF, FaTwitter, FaInstagram, FaPinterest } from 'react-icons/fa';

// const Sample = () => {
//     // Uncomment and use this when you need to fetch data
//     /*
//     const fetchData = async () => {
//         try {
//             const response = await axios.get('http://127.0.0.1:8000/adminside/AdminViewallUser/');
//             console.log(response.data);
//         } catch (error) {
//             console.error('Error fetching data:', error);
//         }
//     };

//     useEffect(() => {
//         fetchData();
//     }, []);
//     */

//     return (
//         <div className="bg-gray-50">
//             {/* Navigation */}
//             <nav className="bg-white shadow-lg">
//                 <div className="container mx-auto px-4 py-3 flex justify-between items-center">
//                     <a href="#" className="text-2xl font-bold text-blue-600">ShopEase</a>
//                     <div className="hidden md:flex space-x-8">
//                         <a href="#" className="text-gray-800 hover:text-blue-600">Home</a>
//                         <a href="#" className="text-gray-800 hover:text-blue-600">Shop</a>
//                         <a href="#" className="text-gray-800 hover:text-blue-600">Categories</a>
//                         <a href="#" className="text-gray-800 hover:text-blue-600">About</a>
//                         <a href="#" className="text-gray-800 hover:text-blue-600">Contact</a>
//                     </div>
//                     <div className="flex items-center space-x-4">
//                         <div className="relative">
//                             <input 
//                                 type="text" 
//                                 placeholder="Search..." 
//                                 className="px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                             />
//                             <FaSearch className="absolute right-3 top-3 text-gray-400" />
//                         </div>
//                         {/* <a href="#" className="text-gray-800 hover:text-blue-600"><FaHeart className="text-xl" /></a>
//                         <a href="#" className="text-gray-800 hover:text-blue-600"><FaShoppingCart className="text-xl" /></a>
//                         <a href="#" className="text-gray-800 hover:text-blue-600"><FaUser className="text-xl" /></a> */}
//                     </div>
//                 </div>
//             </nav>

//             {/* Hero Section */}
//             <section className="bg-blue-600 text-white py-16">
//                 <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
//                     <div className="md:w-1/2 mb-8 md:mb-0">
//                         <h1 className="text-4xl md:text-5xl font-bold mb-4">Summer Collection 2023</h1>
//                         <p className="text-xl mb-6">Discover our new arrivals with up to 40% discount</p>
//                         <a href="#" className="bg-white text-blue-600 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition duration-300 inline-block">Shop Now</a>
//                     </div>
//                     <div className="md:w-1/2">
//                         <img 
//                             src="https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" 
//                             alt="Fashion Model" 
//                             className="rounded-lg shadow-xl"
//                         />
//                     </div>
//                 </div>
//             </section>

//             {/* Featured Categories */}
//             <section className="py-12 container mx-auto px-4">
//                 <h2 className="text-3xl font-bold text-center mb-12">Shop by Category</h2>
//                 <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
//                     {[
//                         {
//                             img: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
//                             title: "Men's Wear"
//                         },
//                         {
//                             img: "https://images.unsplash.com/photo-1551232864-3f0890e580d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
//                             title: "Women's Wear"
//                         },
//                         {
//                             img: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
//                             title: "Electronics"
//                         },
//                         {
//                             img: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
//                             title: "Home Decor"
//                         }
//                     ].map((category, index) => (
//                         <a key={index} href="#" className="group relative overflow-hidden rounded-lg h-48">
//                             <img 
//                                 src={category.img} 
//                                 alt={category.title} 
//                                 className="w-full h-full object-cover group-hover:scale-105 transition duration-300" 
//                             />
//                             <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
//                                 <h3 className="text-white text-xl font-bold">{category.title}</h3>
//                             </div>
//                         </a>
//                     ))}
//                 </div>
//             </section>

//             {/* Featured Products */}
//             <section className="py-12 bg-gray-100">
//                 <div className="container mx-auto px-4">
//                     <div className="flex justify-between items-center mb-8">
//                         <h2 className="text-3xl font-bold">Featured Products</h2>
//                         <a href="#" className="text-blue-600 hover:text-blue-800 font-semibold">View All →</a>
//                     </div>
                    
//                     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
//                         {[
//                             {
//                                 img: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80",
//                                 discount: "20% OFF",
//                                 title: "Wireless Headphones",
//                                 category: "Electronics",
//                                 rating: 4.5,
//                                 reviewCount: 42,
//                                 price: 89.99,
//                                 originalPrice: 112.49
//                             },
//                             {
//                                 img: "https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=725&q=80",
//                                 title: "Leather Wallet",
//                                 category: "Accessories",
//                                 rating: 4,
//                                 reviewCount: 28,
//                                 price: 34.99
//                             },
//                             {
//                                 img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1399&q=80",
//                                 discount: "15% OFF",
//                                 title: "Smart Watch",
//                                 category: "Electronics",
//                                 rating: 5,
//                                 reviewCount: 56,
//                                 price: 199.99,
//                                 originalPrice: 235.29
//                             },
//                             {
//                                 img: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80",
//                                 title: "Sunglasses",
//                                 category: "Accessories",
//                                 rating: 4,
//                                 reviewCount: 31,
//                                 price: 49.99
//                             }
//                         ].map((product, index) => (
//                             <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
//                                 <div className="relative">
//                                     <img 
//                                         src={product.img} 
//                                         alt={product.title} 
//                                         className="w-full h-64 object-cover" 
//                                     />
//                                     {product.discount && (
//                                         <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
//                                             {product.discount}
//                                         </span>
//                                     )}
//                                 </div>
//                                 <div className="p-4">
//                                     <div className="flex justify-between items-start mb-2">
//                                         <h3 className="text-lg font-semibold">{product.title}</h3>
//                                         <span className="text-sm text-gray-500">{product.category}</span>
//                                     </div>
//                                     <div className="flex items-center mb-3">
//                                         <div className="flex text-yellow-400">
//                                             {[1, 2, 3, 4, 5].map((star) => (
//                                                 <span key={star}>
//                                                     {star <= Math.floor(product.rating) ? (
//                                                         <FaStar />
//                                                     ) : star === Math.ceil(product.rating) && !Number.isInteger(product.rating) ? (
//                                                         <FaStarHalfAlt />
//                                                     ) : (
//                                                         <FiStar />
//                                                     )}
//                                                 </span>
//                                             ))}
//                                         </div>
//                                         <span className="text-xs text-gray-500 ml-1">({product.reviewCount})</span>
//                                     </div>
//                                     <div className="flex justify-between items-center">
//                                         <div>
//                                             <span className="text-lg font-bold">${product.price.toFixed(2)}</span>
//                                             {product.originalPrice && (
//                                                 <span className="text-sm text-gray-500 line-through ml-2">${product.originalPrice.toFixed(2)}</span>
//                                             )}
//                                         </div>
//                                         <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-full text-sm transition-colors duration-300">
//                                             <FaShoppingCart className="inline mr-1" /> Add
//                                         </button>
//                                     </div>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             </section>

//             {/* Banner */}
//             <section className="py-12 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
//                 <div className="container mx-auto px-4 text-center">
//                     <h2 className="text-3xl md:text-4xl font-bold mb-4">Summer Sale!</h2>
//                     <p className="text-xl mb-8">Up to 50% off on selected items. Limited time offer.</p>
//                     <a href="#" className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition duration-300 inline-block">Shop the Sale</a>
//                 </div>
//             </section>

//             {/* Testimonials */}
//             <section className="py-12 container mx-auto px-4">
//                 <h2 className="text-3xl font-bold text-center mb-12">What Our Customers Say</h2>
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//                     {[
//                         {
//                             img: "https://randomuser.me/api/portraits/women/32.jpg",
//                             name: "Sarah Johnson",
//                             rating: 5,
//                             comment: "The quality of products is amazing! Fast shipping and excellent customer service. Will definitely shop here again."
//                         },
//                         {
//                             img: "https://randomuser.me/api/portraits/men/75.jpg",
//                             name: "Michael Chen",
//                             rating: 4.5,
//                             comment: "Great selection of products at competitive prices. The website is easy to navigate and checkout was a breeze."
//                         },
//                         {
//                             img: "https://randomuser.me/api/portraits/women/68.jpg",
//                             name: "Emily Rodriguez",
//                             rating: 4,
//                             comment: "I love the seasonal collections! Always find something unique. Customer support helped me with sizing questions."
//                         }
//                     ].map((testimonial, index) => (
//                         <div key={index} className="bg-white p-6 rounded-lg shadow-md">
//                             <div className="flex items-center mb-4">
//                                 <img 
//                                     src={testimonial.img} 
//                                     alt={testimonial.name} 
//                                     className="w-12 h-12 rounded-full mr-4"
//                                 />
//                                 <div>
//                                     <h4 className="font-semibold">{testimonial.name}</h4>
//                                     <div className="flex text-yellow-400">
//                                         {[1, 2, 3, 4, 5].map((star) => (
//                                             <span key={star}>
//                                                 {star <= Math.floor(testimonial.rating) ? (
//                                                     <FaStar className="w-4 h-4" />
//                                                 ) : star === Math.ceil(testimonial.rating) && !Number.isInteger(testimonial.rating) ? (
//                                                     <FaStarHalfAlt className="w-4 h-4" />
//                                                 ) : (
//                                                     <FiStar className="w-4 h-4" />
//                                                 )}
//                                             </span>
//                                         ))}
//                                     </div>
//                                 </div>
//                             </div>
//                             <p className="text-gray-600">"{testimonial.comment}"</p>
//                         </div>
//                     ))}
//                 </div>
//             </section>

//             {/* Newsletter */}
//             <section className="py-12 bg-gray-100">
//                 <div className="container mx-auto px-4 text-center">
//                     <h2 className="text-3xl font-bold mb-4">Subscribe to Our Newsletter</h2>
//                     <p className="text-xl mb-8">Get updates on special offers and new products</p>
//                     <div className="max-w-md mx-auto flex">
//                         <input 
//                             type="email" 
//                             placeholder="Your email address" 
//                             className="flex-grow px-4 py-3 rounded-l-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                         />
//                         <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-r-lg font-semibold transition duration-300">
//                             Subscribe
//                         </button>
//                     </div>
//                 </div>
//             </section>

//             {/* Footer */}
//             <footer className="bg-gray-800 text-white py-12">
//                 <div className="container mx-auto px-4">
//                     <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
//                         <div>
//                             <h3 className="text-xl font-bold mb-4">ShopEase</h3>
//                             <p className="text-gray-400">Your one-stop shop for all your needs. Quality products at affordable prices.</p>
//                             <div className="flex space-x-4 mt-4">
//                                 <a href="#" className="text-gray-400 hover:text-white"><FaFacebookF /></a>
//                                 <a href="#" className="text-gray-400 hover:text-white"><FaTwitter /></a>
//                                 <a href="#" className="text-gray-400 hover:text-white"><FaInstagram /></a>
//                                 <a href="#" className="text-gray-400 hover:text-white"><FaPinterest /></a>
//                             </div>
//                         </div>
//                         <div>
//                             <h4 className="font-bold mb-4">Quick Links</h4>
//                             <ul className="space-y-2">
//                                 {['Home', 'Shop', 'About Us', 'Contact', 'Blog'].map((link) => (
//                                     <li key={link}>
//                                         <a href="#" className="text-gray-400 hover:text-white">{link}</a>
//                                     </li>
//                                 ))}
//                             </ul>
//                         </div>
//                         <div>
//                             <h4 className="font-bold mb-4">Customer Service</h4>
//                             <ul className="space-y-2">
//                                 {['FAQs', 'Shipping Policy', 'Return Policy', 'Privacy Policy', 'Terms & Conditions'].map((item) => (
//                                     <li key={item}>
//                                         <a href="#" className="text-gray-400 hover:text-white">{item}</a>
//                                     </li>
//                                 ))}
//                             </ul>
//                         </div>
//                         <div>
//                             <h4 className="font-bold mb-4">Contact Us</h4>
//                             <ul className="space-y-2 text-gray-400">
//                                 <li className="flex items-center">
//                                     <i className="fas fa-map-marker-alt mr-2"></i> 123 Street, City, Country
//                                 </li>
//                                 <li className="flex items-center">
//                                     <i className="fas fa-phone-alt mr-2"></i> +1 234 567 890
//                                 </li>
//                                 <li className="flex items-center">
//                                     <i className="fas fa-envelope mr-2"></i> info@shopease.com
//                                 </li>
//                             </ul>
//                         </div>
//                     </div>
//                     <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
//                         <p>© 2023 ShopEase. All rights reserved.</p>
//                     </div>
//                 </div>
//             </footer>
//         </div>
//     );
// };

// export default Sample;