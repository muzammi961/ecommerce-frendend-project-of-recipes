import React from 'react';
import AdminSidebar from '../../ad/sidebar';

function OrderDetailsAdmin() {
  // Sample order data
  const order = {
    id: 'ORD-789012',
    date: '2023-11-15 14:30',
    status: 'Delivered',
    total: '$149.99',
    paymentMethod: 'Credit Card',
    items: [
      { id: 1, name: 'Wireless Headphones', price: '$99.99', quantity: 1, image: '/path/to/image1.jpg' },
      { id: 2, name: 'Phone Case', price: '$25.00', quantity: 2, image: '/path/to/image2.jpg' }
    ],
    customer: {
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+1 (555) 123-4567'
    },
    shippingAddress: {
      street: '123 Main St',
      city: 'New York',
      state: 'NY',
      zip: '10001',
      country: 'United States'
    },
    billingAddress: {
      street: '123 Main St',
      city: 'New York',
      state: 'NY',
      zip: '10001',
      country: 'United States'
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <AdminSidebar />
      
      <div className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          {/* Shining Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl shadow-xl p-6 mb-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full transform translate-x-16 -translate-y-16"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-white opacity-10 rounded-full transform -translate-x-16 translate-y-16"></div>
            <h1 className="text-3xl font-bold text-white relative z-10">Order Details</h1>
            <p className="text-indigo-100 mt-2 relative z-10">Order #{order.id}</p>
          </div>

          {/* Order Summary Card */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 mb-8">
            <div className="p-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                <div className="space-y-2">
                  <div className="flex items-center">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      order.status === 'Delivered' 
                        ? 'bg-green-100 text-green-800' 
                        : order.status === 'Shipped' 
                          ? 'bg-blue-100 text-blue-800' 
                          : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {order.status}
                    </span>
                    <span className="ml-4 text-gray-500">{order.date}</span>
                  </div>
                  <h2 className="text-xl font-bold text-gray-800">Total: {order.total}</h2>
                  <p className="text-gray-600">Payment Method: {order.paymentMethod}</p>
                </div>
                <button className="mt-4 md:mt-0 px-6 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-medium rounded-lg shadow hover:shadow-lg transition-all duration-200">
                  Update Status
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Order Items */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 border-b border-gray-200">
                <h3 className="font-semibold text-gray-800">Order Items</h3>
              </div>
              <div className="divide-y divide-gray-100">
                {order.items.map(item => (
                  <div key={item.id} className="p-4 flex items-center hover:bg-gray-50 transition-colors">
                    <div className="flex-shrink-0 w-16 h-16 bg-gray-100 rounded-lg overflow-hidden">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="ml-4 flex-1">
                      <h4 className="font-medium text-gray-800">{item.name}</h4>
                      <p className="text-gray-600">Quantity: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-800">{item.price}</p>
                      <p className="text-sm text-gray-500">${(parseFloat(item.price.replace('$', '')) * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-4 border-t border-gray-200 bg-gray-50">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Subtotal</span>
                  <span className="font-medium">{order.total}</span>
                </div>
              </div>
            </div>

            {/* Customer & Address Info */}
            <div className="space-y-6">
              {/* Customer Info */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 border-b border-gray-200">
                  <h3 className="font-semibold text-gray-800">Customer Information</h3>
                </div>
                <div className="p-6 space-y-4">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-medium">
                      {order.customer.name.charAt(0)}
                    </div>
                    <div className="ml-4">
                      <h4 className="font-medium text-gray-800">{order.customer.name}</h4>
                      <p className="text-gray-600">{order.customer.email}</p>
                      <p className="text-gray-600">{order.customer.phone}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 border-b border-gray-200">
                  <h3 className="font-semibold text-gray-800">Shipping Address</h3>
                </div>
                <div className="p-6">
                  <div className="space-y-2">
                    <p className="text-gray-800">{order.shippingAddress.street}</p>
                    <p className="text-gray-800">{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zip}</p>
                    <p className="text-gray-800">{order.shippingAddress.country}</p>
                  </div>
                </div>
              </div>

              {/* Billing Address */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 border-b border-gray-200">
                  <h3 className="font-semibold text-gray-800">Billing Address</h3>
                </div>
                <div className="p-6">
                  <div className="space-y-2">
                    <p className="text-gray-800">{order.billingAddress.street}</p>
                    <p className="text-gray-800">{order.billingAddress.city}, {order.billingAddress.state} {order.billingAddress.zip}</p>
                    <p className="text-gray-800">{order.billingAddress.country}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Back Button */}
          <div className="mt-8">
            <button className="px-6 py-3 bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white font-medium rounded-lg shadow hover:shadow-lg transition-all duration-200">
              Back to Orders
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderDetailsAdmin;