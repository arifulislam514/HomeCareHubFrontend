import React from 'react';
import { User, MapPin, CreditCard, Lock, Tag, ArrowRight } from 'lucide-react';

// Reusable Input Field Component for consistency
const InputField = ({ label, type = 'text', placeholder, icon }) => (
  <div>
    <label className="block text-sm font-bold text-gray-700 mb-2">{label}</label>
    <div className="relative">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400">
        {icon}
      </div>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-200 bg-gray-50 focus:ring-2 focus:ring-green-300 focus:border-green-500 transition"
      />
    </div>
  </div>
);

const CheckoutPage = () => {
  const cartItems = [
    {
      id: 1,
      name: 'Premium Cleaning Kit',
      price: 39.99,
      quantity: 1,
      image: 'https://placehold.co/100x100/083d41/ffffff?text=Kit',
    },
    {
      id: 2,
      name: 'Microfiber Cloths (3-pack)',
      price: 12.50,
      quantity: 2,
      image: 'https://placehold.co/100x100/22c55e/ffffff?text=Cloths',
    },
  ];

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = 5.00;
  const total = subtotal + shipping;

  return (
    <div className="font-sans bg-gray-50 min-h-screen p-4 sm:p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-10">
          <h1 className="text-4xl font-bold text-[#083d41]">Secure Checkout</h1>
          <p className="text-gray-500 mt-2">You're just a few steps away from your purchase.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-start">
          {/* Left/Main Column: Shipping & Payment */}
          <div className="lg:col-span-2 space-y-8">
            {/* Shipping Information Card */}
            <div className="bg-white rounded-2xl shadow-sm">
                <div className="p-6 border-b border-gray-200">
                    <h3 className="text-lg font-bold text-[#083d41]">Shipping Information</h3>
                </div>
                <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputField label="Full Name" placeholder="John Doe" icon={<User size={16} />} />
                    <InputField label="Email Address" type="email" placeholder="john.doe@example.com" icon={<User size={16} />} />
                    <InputField label="Street Address" placeholder="123 Main St" icon={<MapPin size={16} />} />
                    <InputField label="Apartment, suite, etc." placeholder="Apt #4B" icon={<MapPin size={16} />} />
                    <InputField label="City" placeholder="New York" icon={<MapPin size={16} />} />
                    <div className="grid grid-cols-2 gap-4">
                        <InputField label="State" placeholder="NY" icon={<MapPin size={16} />} />
                        <InputField label="ZIP Code" placeholder="10001" icon={<MapPin size={16} />} />
                    </div>
                </div>
            </div>

            {/* Payment Details Card */}
             <div className="bg-white rounded-2xl shadow-sm">
                <div className="p-6 border-b border-gray-200">
                    <h3 className="text-lg font-bold text-[#083d41]">Payment Details</h3>
                </div>
                <div className="p-6 space-y-6">
                     <InputField label="Card Number" placeholder="**** **** **** 1234" icon={<CreditCard size={16} />} />
                     <div className="grid grid-cols-2 gap-6">
                        <InputField label="Expiration Date" placeholder="MM / YY" icon={<CreditCard size={16} />} />
                        <InputField label="CVC" placeholder="123" icon={<Lock size={16} />} />
                     </div>
                </div>
            </div>
          </div>

          {/* Right Column: Order Summary */}
          <div className="lg:col-span-1 bg-white rounded-2xl shadow-sm p-6 space-y-6">
            <h3 className="text-lg font-bold text-[#083d41] border-b pb-4">Order Summary</h3>
            
            <div className="space-y-4">
              {cartItems.map(item => (
                <div key={item.id} className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gray-100 rounded-lg p-1">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded-md" />
                  </div>
                  <div className="flex-grow">
                    <p className="font-semibold text-gray-800">{item.name}</p>
                    <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                  </div>
                  <p className="font-semibold text-gray-800">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>

            <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>
                 <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span className="font-medium">${shipping.toFixed(2)}</span>
                </div>
                 <div className="flex justify-between font-bold text-lg text-[#083d41]">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                </div>
            </div>
             <div className="border-t pt-4">
                <div className="flex gap-2">
                    <input type="text" placeholder="Discount code" className="w-full px-4 py-2 rounded-lg border border-gray-200 bg-gray-50 focus:ring-2 focus:ring-green-300 focus:border-green-500 transition" />
                    <button className="bg-gray-200 text-gray-700 font-semibold px-4 rounded-lg hover:bg-gray-300 transition">Apply</button>
                </div>
             </div>

             <button className="w-full flex items-center justify-center gap-3 bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-xl transition-transform transform hover:scale-[1.02] shadow-lg hover:shadow-green-500/30">
                <span>Place Order</span>
                <ArrowRight size={20} />
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
