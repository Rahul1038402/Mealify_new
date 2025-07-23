import React, { useState } from 'react';
import { ArrowLeft, Plus, Star } from 'lucide-react';
import type { MenuItem, CartItem } from '../types';
import Coupons from './ui/Coupons';
import img1 from '../assets/marquee_images/img1.jpg';
import img2 from '../assets/marquee_images/img2.jpg';
import img3 from '../assets/marquee_images/img3.jpg';
import img4 from '../assets/marquee_images/img4.jpg';
import img5 from '../assets/marquee_images/img5.jpg';
import img6 from '../assets/marquee_images/img6.jpg';
import img7 from '../assets/marquee_images/img7.jpg';
import img8 from '../assets/marquee_images/img8.jpg';
import img9 from '../assets/marquee_images/img9.jpg';
import { Link } from 'react-router-dom';

interface MenuProps {
  addToCart: (item: MenuItem) => void;
  cart: CartItem[];
}

const Menu: React.FC<MenuProps> = ({ addToCart, cart }) => {
  const [activeCategory, setActiveCategory] = useState('all');

  const menuItems: MenuItem[] = [
  {
    id: 1,
    name: "Pasta",
    description: "Ingredients: Penne pasta, creamy Alfredo sauce, garlic, herbs, and parmesan cheese",
    price: 149,
    image: img1,
    category: "mains",
    rating: 4.7,
    prepTime: "18 min",
    isVeg: true
  },
  {
    id: 2,
    name: "Fried Chicken",
    description: "Ingredients: Tender chicken leg pieces, herbs, garlic butter, and fried to perfect crunch",
    price: 179,
    image: img2,
    category: "mains",
    rating: 4.8,
    prepTime: "20 min",
    isVeg: false
  },
  {
    id: 3,
    name: "Noodles",
    description: "Ingredients: Stir-fried noodles with veggies, soy sauce, and mild spices",
    price: 99,
    image: img3,
    category: "mains",
    rating: 4.5,
    prepTime: "10 min",
    isVeg: true
  },
  {
    id: 4,
    name: "Margherita Pizza",
    description: "Ingredients: Classic tomato sauce, fresh mozzarella, and basil leaves",
    price: 159,
    image: img4,
    category: "mains",
    rating: 4.9,
    prepTime: "15 min",
    isVeg: true
  },
  {
    id: 5,
    name: "Chicken Roll",
    description: "Ingredients: Spiced grilled chicken, onions, mint chutney, and rolled in paratha",
    price: 129,
    image: img5,
    category: "mains",
    rating: 4.6,
    prepTime: "12 min",
    isVeg: false
  },
  {
    id: 6,
    name: "Veg Soup",
    description: "Ingredients: Mixed vegetables, pepper, garlic, and light vegetable broth",
    price: 79,
    image: img6,
    category: "starters",
    rating: 4.4,
    prepTime: "8 min",
    isVeg: true
  },
  {
    id: 7,
    name: "Veg Burger",
    description: "Ingredients: Fresh vegetables, paneer patty, lettuce, tomato, and special sauce",
    price: 120,
    image: img7,
    category: "mains",
    rating: 4.9,
    prepTime: "15 min",
    isVeg: true
  },
  {
    id: 8,
    name: "Fruit Smoothie",
    description: "Ingredients: Fresh mixed berries, banana, yogurt, and honey",
    price: 99,
    image: img8,
    category: "drinks",
    rating: 4.6,
    prepTime: "5 min",
    isVeg: true
  },
  {
    id: 9,
    name: "Chocolate Cake",
    description: "Ingredients: Cocoa powder, chocolate ganache, flour, butter, and sugar",
    price: 129,
    image: img9,
    category: "desserts",
    rating: 4.9,
    prepTime: "5 min",
    isVeg: true
  }
]


  const categories = [
    { id: 'all', name: 'All Items' },
    { id: 'veg', name: 'Vegetarian' },
    { id: 'nonveg', name: 'Non-Vegetarian' },
    { id: 'mains', name: 'Main Dishes' },
    { id: 'desserts', name: 'Desserts' },
    { id: 'drinks', name: 'Drinks' }
  ];

  const filteredItems = activeCategory === 'all'
    ? menuItems
    : activeCategory === 'veg'
      ? menuItems.filter(item => item.isVeg)
      : activeCategory === 'nonveg'
        ? menuItems.filter(item => !item.isVeg)
        : menuItems.filter(item => item.category === activeCategory);

  const getCartQuantity = (itemId: number) => {
    const cartItem = cart.find(item => item.id === itemId);
    return cartItem ? cartItem.quantity : 0;
  };

  return (
    <section id="menu" className="py-20">
      {/* Back Button */}
      <div className="fixed top-6 sm:top-6 left-6">
        <button

          className="bg-gradient-to-r from-[#5b32ffc9] to-[#5833ffcb] text-white p-4 rounded-full shadow-lg hover:scale-105 transition-all duration-300 ease-out hover:shadow-xl active:scale-95"
        >
          <div className="flex space-x-2">
            <ArrowLeft className="h-6 w-6" />
            <Link to="/">Back</Link>
          </div>
        </button>
      </div>
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-[#5b32ffc9] to-[#613efbcb] bg-clip-text text-transparent">
            Our Menu
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Discover our carefully crafted dishes made with the finest ingredients
          </p>
        </div>

        {/* Coupons Section */}
        <Coupons />

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${activeCategory === category.id
                ? 'bg-gradient-to-r from-[#5b32ffc9] to-[#613efbcb] text-white shadow-lg scale-105'
                : 'bg-[#1e293bcc] text-gray-200 hover:bg-[#475569cc]'
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
              className="group bg-gradient-to-r from-[#475569cc] to-[#1e293bcc] rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-orange-200"
            >
              <div className="relative overflow-hidden h-72">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center space-x-1">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="text-sm font-medium">{item.rating}</span>
                </div>
                <div className="absolute top-4 left-4 bg-indigo-600 text-white rounded-full px-3 py-1 text-sm font-medium">
                  {item.prepTime}
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-3xl font-bold text-gray-300">{item.name}</h3>
                  <div
                    className={`w-4 h-4 rounded-sm border bg-gray-200 ${item.isVeg ? 'border-green-700' : 'border-red-500'
                      } flex items-center justify-center`}
                  >
                    <div
                      className={`w-2 h-2 rounded-full ${item.isVeg ? 'bg-green-700' : 'bg-red-500'
                        }`}
                    />
                  </div>

                </div>
                <p className="text-gray-300 mb-4 text-sm leading-relaxed">{item.description}</p>

                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-orange-500">₹{item.price}</span>

                  <div className="flex items-center space-x-2">
                    {getCartQuantity(item.id) > 0 ? (
                      <div className="flex items-center space-x-2 bg-orange-50 rounded-full px-3 py-1">
                        <span className="text-indigo-700 font-medium">
                          {getCartQuantity(item.id)} in cart
                        </span>
                      </div>
                    ) : null}

                    <button
                      onClick={() => addToCart(item)}
                      className="bg-gradient-to-r from-[#5b32ffc9] to-[#613efbcb] text-white p-3 rounded-full hover:scale-110 transition-transform duration-200 shadow-lg"
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
