import { ChefHat, Utensils } from 'lucide-react';
import { useRef, useLayoutEffect, useState } from 'react';
import { motion } from 'framer-motion';
import '../assets/fonts/fonts.css';
import RotatingText from './ui/rotating_text';
import { ThreeDMarquee, type MarqueeImage } from './ui/3d-marqee';
import img1 from '../assets/marquee_images/img1.jpg';
import img2 from '../assets/marquee_images/img2.jpg';
import img3 from '../assets/marquee_images/img3.jpg';
import img4 from '../assets/marquee_images/img4.jpg';
import img5 from '../assets/marquee_images/img5.jpg';
import img6 from '../assets/marquee_images/img6.jpg';

const Hero = () => {
    const rotatingRef = useRef<HTMLSpanElement>(null);
    const [width, setWidth] = useState(0);

    useLayoutEffect(() => {
        if (rotatingRef.current) {
            setWidth(rotatingRef.current.offsetWidth);
        }
    }, []);

    const images: MarqueeImage[] = [
        {
            src: img1,
            alt: "Mealify Food Image 1"
        },
        {
            src: img2,
            alt: "Mealify Food Image 2"
        },
        {
            src: img3,
            alt: "Mealify Food Image 3"
        },
        {
            src: img4,
            alt: "Mealify Food Image 4"
        },
        {
            src: img5,
            alt: "Mealify Food Image 5"
        },
        {
            src: img6,
            alt: "Mealify Food Image 6"
        }
    ];

    return (
        <section className="mt-48 relative w-full flex items-center justify-center px-6">
            <div className="max-w-5xl w-full text-center">
                {/* Logo + Brand Name */}
                <div className="flex flex-col items-center mb-10">
                    {/* Icon and Text */}
                    <div className="flex items-center">
                        <div className="h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24 mr-2 flex items-center justify-center rounded-full bg-gradient-to-r from-[#5b32ffc9] to-[#5833ffcb]">
                            <Utensils className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 text-white" />
                        </div>

                        <div className="flex flex-col items-start">
                            {/* Text */}
                            <p
                                className="text-5xl sm:text-6xl md:text-8xl text-gray-300 tracking-wider"
                                style={{ fontFamily: 'JapaneseStyle' }}
                            >
                                Mealify
                            </p>

                            {/* Line only as wide as text */}
                            <div className="mt-1 sm:mt-1.5 md:mt-2 h-0.5 sm:h-0.5 md:h-1 w-full bg-white/40 rounded-full" />
                        </div>
                    </div>
                </div>



                <div className="flex flex-col md:flex-row items-center justify-center mt-24 mb-8 gap-10">
                    {/* Left: Rotating Text Block */}
                    <div className="w-full md:w-1/2 flex flex-col items-start justify-center text-left">
                        <div className="flex flex-wrap h-[80px] mb-10 items-center gap-3">
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-200">Delivering</h2>
                            <motion.div layout animate={{ width }} className="overflow-hidden">
                                <span ref={rotatingRef}>
                                    <RotatingText
                                        texts={[
                                            "Fresh & Hot",
                                            "Fast Service",
                                            "Quick Orders",
                                            "Doorstep Delights"
                                        ]}
                                        mainClassName="px-2 sm:px-2 md:px-3 bg-gradient-to-r from-[#5b32ffc9] to-[#5833ffcb] text-white overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center rounded-lg font-semibold text-lg sm:text-xl"
                                        staggerFrom="last"
                                        initial={{ y: '100%' }}
                                        animate={{ y: 0 }}
                                        exit={{ y: '-120%' }}
                                        staggerDuration={0.025}
                                        splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
                                        transition={{ type: 'spring', damping: 30, stiffness: 400 }}
                                        rotationInterval={2500}
                                    />
                                </span>
                            </motion.div>

                        </div>
                        <p className="text-lg md:text-xl text-white mb-8 max-w-2xl mx-auto">
                            Explore a wide range of dishes from top-rated restaurants. Get your meal delivered hot & fresh — straight to your doorstep.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <button className="bg-[#5833ffc7] hover:bg-[#5b32ffe5] text-white text-lg font-semibold px-6 py-3 rounded-full transition-colors duration-400">
                                Order Now
                            </button>
                            <button className="bg-[#ffffffa9] hover:bg-[#ffffffc4] text-gray-900 border text-lg font-medium px-6 py-3 rounded-full transition-colors duration-400">
                                Browse Menu
                            </button>
                        </div>
                    </div>

                    {/* Right: 3D Marquee Block */}
                    <div className="w-full md:w-1/2 flex items-center justify-center">
                        <ThreeDMarquee images={images} />
                    </div>
                </div>




            </div>
        </section>
    );
};

export default Hero;
