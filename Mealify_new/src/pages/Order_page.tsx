import React, { useState } from 'react';
import Menu from '../components/Menu';
import Cart from '../components/Cart';
import type { MenuItem, CartItem } from '../types';
import DotGrid from '../components/ui/dot_bg';
import { Utensils } from 'lucide-react';
import { Link } from 'react-router-dom';

const OrderPage: React.FC = () => {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [isCartOpen, setIsCartOpen] = useState(false);

    // Add item to cart
    const handleAddToCart = (item: MenuItem) => {
        setCart(prev => {
            const existing = prev.find(ci => ci.id === item.id);
            if (existing) {
                return prev.map(ci =>
                    ci.id === item.id ? { ...ci, quantity: ci.quantity + 1 } : ci
                );
            } else {
                return [...prev, { ...item, quantity: 1 }];
            }
        });
        setIsCartOpen(true);
    };

    // Update item quantity
    const handleUpdateQuantity = (id: number, quantity: number) => {
        if (quantity <= 0) {
            handleRemoveFromCart(id);
        } else {
            setCart(prev =>
                prev.map(item => (item.id === id ? { ...item, quantity } : item))
            );
        }
    };

    // Remove item from cart
    const handleRemoveFromCart = (id: number) => {
        setCart(prev => prev.filter(item => item.id !== id));
    };

    // Close cart modal
    const handleCloseCart = () => {
        setIsCartOpen(false);
    };

    return (
        <div>
            <div className="fixed top-0 left-0 w-full h-full z-1">
                <DotGrid
                    dotSize={5}
                    gap={15}
                    baseColor="#271E37"
                    activeColor="#5227FF"
                    proximity={120}
                    shockRadius={250}
                    shockStrength={5}
                    resistance={750}
                    returnDuration={1.5}
                    className='bg-black'
                />
            </div>
            <main className="relative z-10 space-y-12">
                <Menu addToCart={handleAddToCart} cart={cart} />

                {/* Toggle Cart Button */}
                <div className="fixed bottom-6 right-6 z-[40]">
                    <button
                        onClick={() => setIsCartOpen(true)}
                        className="bg-gradient-to-r from-[#5b32ffc9] to-[#5833ffcb] text-white p-4 rounded-full shadow-lg hover:scale-105 transition-all duration-300 ease-out hover:shadow-xl active:scale-95"
                    >
                        Open Cart ({cart.reduce((sum, item) => sum + item.quantity, 0)})
                    </button>
                </div>

                <Cart
                    isOpen={isCartOpen}
                    cart={cart}
                    updateQuantity={handleUpdateQuantity}
                    removeFromCart={handleRemoveFromCart}
                    closeCart={handleCloseCart}
                />
            </main>
            <footer className="text-white py-12 relative z-[5]">
                <hr className="text-white/40" />
                <div className="container pt-4 mx-auto px-6">
                    <div className="grid md:grid-cols-4 gap-8">
                        <div className="col-span-2">
                            <div className="flex flex-col mb-10">
                                {/* Icon and Text */}
                                <div className="flex items-center">
                                    <div className="h-14 w-14 mr-2 flex items-center justify-center rounded-full bg-gradient-to-r from-[#5b32ffc9] to-[#5833ffcb]">
                                        <Utensils className="h-8 w-8 text-white" />
                                    </div>

                                    <div className="flex flex-col items-start">
                                        {/* Text */}
                                        <p
                                            className="text-5xl text-gray-300 tracking-wider"
                                            style={{ fontFamily: 'JapaneseStyle' }}
                                        >
                                            Mealify
                                        </p>

                                        {/* Line only as wide as text */}
                                        <div className="mt-2 h-1 w-full bg-white/40 rounded-full" />
                                    </div>
                                </div>
                            </div>
                            <p className="text-gray-300 mb-4 leading-relaxed">
                                Delivering exceptional culinary experiences right to your doorstep.
                                Every meal is crafted with passion, using the freshest ingredients, time-tested recipes, and expert preparation techniques.
                                From our kitchen to your table, enjoy bold flavors, unmatched quality, and the comfort of restaurant-style dining in your own home.
                            </p>
                        </div>

                        <div>
                            <h3 className="text-xl text-[#5833ffcb] font-semibold mb-4">Quick Links</h3>
                            <div className="space-y-2">
                                <Link to="/" className="block text-lg text-gray-300 hover:text-indigo-500 transition-colors duration-300">Home</Link>
                                <Link to="/order" className="block text-lg text-gray-300 hover:text-indigo-500 transition-colors duration-300">Menu</Link>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-xl text-[#5833ffcb] font-semibold mb-4">Hours</h3>
                            <div className="text-lg space-y-4 text-gray-300">
                                <p>
                                    Monday - Friday:<br />
                                    9AM - 11PM
                                </p>
                                <p>
                                    Saturday - Sunday:<br />
                                    10AM - 12AM
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="border-t border-gray-800 mt-8 pt-8 text-center">
                        <p className="text-gray-300">
                            © 2025 Mealify. All rights reserved. Made with ❤️ for food lovers.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default OrderPage;
