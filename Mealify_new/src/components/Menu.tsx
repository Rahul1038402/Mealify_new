import React, { useState } from 'react';
import { Plus, Star } from 'lucide-react';
import type { MenuItem, CartItem } from '../types';

interface MenuProps {
  addToCart: (item: MenuItem) => void;
  cart: CartItem[];
}

const Menu: React.FC<MenuProps> = ({ addToCart, cart }) => {
  const [activeCategory, setActiveCategory] = useState('all');

   const menuItems: MenuItem[] = [
    {
      id: 1,
      name: "Gourmet Burger",
      description: "Premium beef patty with fresh vegetables and special sauce",
      price: 12.99,
      image: "/api/placeholder/300/200",
      category: "mains",
      rating: 4.8,
      prepTime: "15 min"
    },
    {
      id: 2,
      name: "Margherita Pizza",
      description: "Classic Italian pizza with fresh mozzarella and basil",
      price: 14.99,
      image: "/api/placeholder/300/200",
      category: "mains",
      rating: 4.9,
      prepTime: "20 min"
    },
    {
      id: 3,
      name: "Caesar Salad",
      description: "Crisp romaine lettuce with parmesan and croutons",
      price: 8.99,
      image: "/api/placeholder/300/200",
      category: "salads",
      rating: 4.7,
      prepTime: "10 min"
    },
    {
      id: 4,
      name: "Chocolate Cake",
      description: "Rich chocolate cake with cream frosting",
      price: 6.99,
      image: "/api/placeholder/300/200",
      category: "desserts",
      rating: 4.9,
      prepTime: "5 min"
    },
    {
      id: 5,
      name: "Grilled Salmon",
      description: "Fresh Atlantic salmon with herbs and lemon",
      price: 18.99,
      image: "/api/placeholder/300/200",
      category: "mains",
      rating: 4.8,
      prepTime: "25 min"
    },
    {
      id: 6,
      name: "Fruit Smoothie",
      description: "Fresh mixed berries with yogurt and honey",
      price: 5.99,
      image: "/api/placeholder/300/200",
      category: "drinks",
      rating: 4.6,
      prepTime: "5 min"
    }
  ];

  const categories = [
    { id: 'all', name: 'All Items' },
    { id: 'mains', name: 'Main Dishes' },
    { id: 'salads', name: 'Salads' },
    { id: 'desserts', name: 'Desserts' },
    { id: 'drinks', name: 'Drinks' }
  ];

  const filteredItems = activeCategory === 'all' 
    ? menuItems 
    : menuItems.filter(item => item.category === activeCategory);

  const getCartQuantity = (itemId: number) => {
    const cartItem = cart.find(item => item.id === itemId);
    return cartItem ? cartItem.quantity : 0;
  };

  return (
    <section id="menu" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
            Our Menu
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover our carefully crafted dishes made with the finest ingredients
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                activeCategory === category.id
                  ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg scale-105'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Menu Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map(item => (
            <div 
              key={item.id}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-orange-200"
            >
              <div className="relative overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center space-x-1">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="text-sm font-medium">{item.rating}</span>
                </div>
                <div className="absolute top-4 left-4 bg-orange-500 text-white rounded-full px-3 py-1 text-sm font-medium">
                  {item.prepTime}
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-gray-800">{item.name}</h3>
                <p className="text-gray-600 mb-4 text-sm leading-relaxed">{item.description}</p>
                
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-orange-500">${item.price}</span>
                  
                  <div className="flex items-center space-x-2">
                    {getCartQuantity(item.id) > 0 ? (
                      <div className="flex items-center space-x-2 bg-orange-50 rounded-full px-3 py-1">
                        <span className="text-orange-500 font-medium">
                          {getCartQuantity(item.id)} in cart
                        </span>
                      </div>
                    ) : null}
                    
                    <button
                      onClick={() => addToCart(item)}
                      className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-3 rounded-full hover:scale-110 transition-transform duration-200 shadow-lg"
                    >
                      <Plus className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Menu;
