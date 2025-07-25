import Hero from '../components/Hero';
import About from '../components/About';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import useLenis from '../hooks/useLenis';
import MorphingNavigation from '../components/ui/morphing-navigation';
import AutomatedCarousel from '../components/ui/3d-carousel';
import DotGrid from '../components/ui/dot_bg';
import '../assets/fonts/fonts.css'


const Home: React.FC = () => {
  const links = [
    { id: "Home", label: "Home", href: "#home" },
    { id: "About", label: "About", href: "#about" },
    { id: "Contact", label: "Contact", href: "#contact" },
  ];

  useLenis(); // Smooth scrolling initialization

  return (
    <div data-lenis-scroll>
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
        <MorphingNavigation
          links={links}
          theme="glass"
          scrollThreshold={100}
          enablePageBlur
          initialTop={50}
          compactTop={15}
          textColor="text-white"
          backgroundColor="bg-black/50"
          borderColor="border-white/20"
          className="md:px-8 px-4 md:mt-6 mt-2"
          enableSmoothTransitions={true}
          animationDuration={0.7}
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

export default Home;
