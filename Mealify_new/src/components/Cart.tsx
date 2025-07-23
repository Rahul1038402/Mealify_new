import React from 'react';
import { X, ShoppingCart, Plus, Minus } from 'lucide-react';
import type { CartItem } from '../types';

interface CartProps {
  isOpen: boolean;
  cart: CartItem[];
  updateQuantity: (id: number, quantity: number) => void;
  removeFromCart: (id: number) => void;
  closeCart: () => void;
}

const Cart: React.FC<CartProps> = ({
  isOpen, cart, updateQuantity, removeFromCart, closeCart
}) => {
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div id='cart' className={`fixed inset-0 z-50 overflow-hidden transition-opacity duration-300 ease-in-out ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
      <div 
        className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`} 
        onClick={closeCart}
      ></div>
      
      <div className={`absolute right-0 top-0 h-full w-full max-w-md bg-[#475569cc] shadow-2xl transform transition-all duration-300 ease-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-4xl font-bold text-indigo-300">Your Cart</h2>
            <button onClick={closeCart} className="p-2 hover:bg-gray-800 rounded-full transition-colors duration-300">
              <X className="h-6 w-6 text-gray-300" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {cart.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingCart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-300 text-lg">Your cart is empty</p>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.map(item => (
                <div key={item.id} className="flex items-center space-x-4 bg-[#1e293bcc] rounded-xl p-4">
                  <img src={item.image} alt={item.name} className="h-16 w-16 object-cover rounded-lg" />
                  
                  <div className="flex-1">
                    <h3 className="font-semibold text-xl text-gray-300">{item.name}</h3>
                    <p className="text-orange-500 font-medium">${item.price}</p>
                  </div>

                  <div className="flex items-center space-x-2 text-gray-300">
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-1 hover:bg-gray-900 rounded-full transition-colors duration-300"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="w-8 text-center font-medium">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-1 hover:bg-gray-900 rounded-full transition-colors duration-300"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>

                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="p-2 text-red-500 hover:bg-red-100 rounded-full transition-colors duration-300"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {cart.length > 0 && (
          <div className="p-6 border-t border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xl text-gray-300 font-bold">Total:</span>
              <span className="text-2xl font-bold text-orange-500">${total.toFixed(2)}</span>
            </div>
            <button className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-4 rounded-xl font-semibold text-lg hover:scale-[1.02] transition-transform">
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
