import React, { useState } from 'react';
import Hero from './components/Hero';
import Menu from './components/Menu';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Cart from './components/Cart';
import useLenis from './hooks/useLenis';
import type { MenuItem, CartItem } from './types';
import { Home, ShoppingCart, Info, Phone, ShoppingBag, HelpCircle, User, Briefcase, Mail } from "lucide-react";
import MorphingNavigation from './components/ui/morphing-navigation';
import { useNavigate } from 'react-router-dom';
import AutomatedCarousel from './components/ui/3d-carousel';
import DotGrid from './components/ui/dot_bg';
import './assets/fonts/fonts.css'


const links = [
  { id: 'home', label: 'Home', href: '#', icon: <Home /> },
  { id: 'shop', label: 'Shop', href: '#', icon: <ShoppingCart /> },
  { id: 'about', label: 'About', href: '#', icon: <Info /> },
  { id: 'contact', label: 'Contact', href: '#', icon: <Phone /> }
];


const App: React.FC = () => {
  const links = [
    { id: "Home", label: "Home", href: "#home" },
    { id: "About", label: "About", href: "#about" },
    { id: "Menu", label: "Menu", href: "#menu" },
    { id: "Contact", label: "Contact", href: "#contact" },
  ];

  useLenis(); // Smooth scrolling initialization

  return (
    <div data-lenis-scroll>
      <div className="fixed top-0 left-0 w-full h-full -z-10">
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

      <main className="relative z-10 space-y-16">
                <MorphingNavigation
          links={links}
          theme="glass"
          scrollThreshold={100}
          enablePageBlur
          initialTop={50} // Reduced for better mobile experience
          compactTop={15}
          textColor="text-white"
          backgroundColor="bg-black/50"
          borderColor="border-white/20"
          className="md:px-8 px-4 md:mt-6 mt-2" // Added responsive padding and margin
          enableSmoothTransitions={true}
          animationDuration={0.7} // Slightly faster animation for better mobile experience
        />
        <Hero />
        <AutomatedCarousel />
        <Contact />
        <About />
        <Footer />
      </main>
    </div>
  );

};

export default App;
