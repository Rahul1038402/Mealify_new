import React, { useState, useEffect } from 'react';
import { Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Variants } from 'framer-motion';
import type { JSX } from 'react/jsx-runtime';

interface SlideData {
    title: string;
    subtitle: string;
    description: string;
    tags: string[];
    bgGradient: string;
    featured?: boolean;
}

type SlidePosition = 'center' | 'left' | 'right';

interface SlideVariantsType {
    [key: string]: any;
    center: any;
    left: any;
    right: any;
    enter: (direction: number) => any;
    exit: (direction: number) => any;
}

const AutomatedCarousel: React.FC = () => {
    const [currentSlide, setCurrentSlide] = useState<number>(0);
    const [direction, setDirection] = useState<number>(1);
    const [isMobile, setIsMobile] = useState<boolean>(false);

    const slides: SlideData[] = [
        {
            title: "Meals Delivered",
            subtitle: "Get food at your door",
            description: "Enjoy restaurant‑quality dishes delivered straight to your door in record time. Choose from thousands of options and track your order live until it arrives piping hot.",
            tags: ["Food Delivery"],
            bgGradient: "from-[#475569cc] to-[#1e293bcc]",
        },
        {
            title: "Fresh & Hot",
            subtitle: "Get your meal delivered hot & fresh",
            description: "Every order arrives piping hot and made from the freshest ingredients. We partner with local vendors to ensure farm‑to‑table flavor in every bite.",
            tags: ["Freshly Prepared"],
            bgGradient: "from-[#475569cc] to-[#1e293bcc]"
        },

        {
            title: "Awsome Discounts",
            subtitle: "30% off on first order with code MEALIFY30",
            description: "Discover and reorder your go‑to meals with just a tap. Save your favorite dishes and enjoy personalized recommendations every time you crave something delicious.",
            tags: ["Discounts", "Daily Offers"],
            bgGradient: "from-[#475569cc] to-[#1e293bcc]",
            featured: true
        },

        {
            title: "Fast Service",
            subtitle: "30 Minutes delivery guaranteed",
            description: "Lightning‑quick order processing and delivery so you never wait hungry. Our seamless app experience ensures you’re just a tap away from your next meal.",
            tags: ["Food Delivery", "Tagline"],
            bgGradient: "from-[#475569cc] to-[#1e293bcc]",
            featured: true
        },
    ]

    // Check screen size and update mobile state
    useEffect(() => {
        const checkScreenSize = () => {
            setIsMobile(window.innerWidth < 640);
        };

        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);

        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);

    // Auto-advance carousel every 8 seconds (only for desktop)
    useEffect(() => {
        if (isMobile) return;

        const interval: NodeJS.Timeout = setInterval(() => {
            setDirection(1);
            setCurrentSlide((prev: number) => (prev + 1) % slides.length);
        }, 8000);

        return () => clearInterval(interval);
    }, [slides.length, isMobile]);

    const goToSlide = (index: number): void => {
        if (isMobile) return;
        setDirection(index > currentSlide ? 1 : -1);
        setCurrentSlide(index);
    };

    const getSlideIndex = (offset: number): number => {
        return (currentSlide + offset + slides.length) % slides.length;
    };

    const slideVariants: SlideVariantsType = {
        center: {
            x: 0,
            scale: 1,
            opacity: 1,
            zIndex: 20,
            transition: {
                duration: 0.8,
                ease: [0.25, 0.46, 0.45, 0.94]
            }
        },
        left: {
            x: -50,
            scale: 0.85,
            opacity: 0.7,
            zIndex: 10,
            transition: {
                duration: 0.8,
                ease: [0.25, 0.46, 0.45, 0.94]
            }
        },
        right: {
            x: 50,
            scale: 0.85,
            opacity: 0.7,
            zIndex: 10,
            transition: {
                duration: 0.8,
                ease: [0.25, 0.46, 0.45, 0.94]
            }
        },
        enter: (direction: number) => ({
            x: direction > 0 ? 200 : -200,
            scale: 0.8,
            opacity: 0,
            zIndex: 5
        }),
        exit: (direction: number) => ({
            x: direction > 0 ? -200 : 200,
            scale: 0.8,
            opacity: 0,
            zIndex: 5,
            transition: {
                duration: 0.8,
                ease: [0.25, 0.46, 0.45, 0.94]
            }
        })
    };

    const contentVariants: Variants = {
        hidden: {
            opacity: 0,
            y: 20,
            transition: {
                duration: 0.3
            }
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                delay: 0.3,
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    // Mobile card component without animations
    const MobileCard = ({ slideData }: { slideData: SlideData, index: number }): JSX.Element => {
        return (
            <div className="w-full mb-6 last:mb-0">
                <div className={`h-80 bg-gradient-to-br ${slideData.bgGradient} relative rounded-2xl overflow-hidden`}>
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute top-6 left-6 w-16 h-16 border border-white/20 rounded-lg rotate-12"></div>
                        <div className="absolute bottom-12 right-12 w-14 h-14 border border-white/20 rounded-full"></div>
                        <div className="absolute top-1/2 right-6 w-10 h-10 border border-white/20 rounded-lg -rotate-45"></div>
                    </div>

                    {/* Content */}
                    <div className="relative z-10 h-full flex flex-col justify-center px-6">
                        {slideData.featured && (
                            <div className="absolute top-4 left-6">
                                <div className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-r from-amber-400 to-orange-500 text-gray-900 shadow-lg border border-amber-300/50">
                                    <Star className="w-3 h-3 mr-1.5 text-black" />
                                    Featured
                                </div>
                            </div>
                        )}

                        <div className={`max-w-full ${slideData.featured ? 'pt-4' : ''}`}>
                            <h1 className="font-bold text-purple-600 text-2xl sm:text-3xl mb-2">
                                {slideData.title}
                            </h1>

                            <div className="w-12 h-1 bg-white/30 mb-3"></div>

                            <h2 className="text-indigo-500 mb-3 font-semibold tracking-wide">
                                {slideData.subtitle}
                            </h2>

                            <p className="text-white/90 text-sm mb-4 tracking-wider">
                                {slideData.description}
                            </p>

                            {/* Tags
                            <div className="flex flex-wrap gap-2">
                                {slideData.tags.map((tag: string, tagIndex: number) => (
                                    <span
                                        key={tagIndex}
                                        className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-medium border border-white/20"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>*/}
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const renderSlide = (
        slideData: SlideData,
        position: SlidePosition,
        isCenter: boolean = false,
        slideKey: string
    ): JSX.Element => {
        return (
            <motion.div
                key={slideKey}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate={position}
                exit="exit"
                className={`relative rounded-2xl overflow-hidden w-full ${position === 'center' ? 'h-80 sm:h-96' : 'h-72 sm:h-80'
                    }`}
            >
                <div className={`h-full bg-gradient-to-br ${slideData.bgGradient} relative`}>
                    {/* Animated Background Pattern */}
                    <motion.div
                        className="absolute inset-0 opacity-10"
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    >
                        <div className={`absolute top-6 left-6 border border-white/20 rounded-lg rotate-12 ${isCenter ? 'w-20 h-20' : 'w-16 h-16'
                            }`}></div>
                        <div className={`absolute bottom-12 right-12 border border-white/20 rounded-full ${isCenter ? 'w-16 h-16' : 'w-12 h-12'
                            }`}></div>
                        <div className={`absolute top-1/2 right-6 border border-white/20 rounded-lg -rotate-45 ${isCenter ? 'w-10 h-10' : 'w-8 h-8'
                            }`}></div>
                    </motion.div>

                    {/* Content */}
                    <div className="relative z-10 h-full flex flex-col justify-center px-4 sm:px-6 lg:px-8">
                        {slideData.featured && isCenter && (
                            <motion.div
                                className="absolute top-4 sm:top-6 left-4 sm:left-6 lg:left-8"
                                initial={{ scale: 0, rotate: -180 }}
                                animate={{ scale: 1, rotate: 0 }}
                                transition={{ delay: 0.5, duration: 0.6, type: "spring" }}
                            >
                                <div className="inline-flex items-center px-3 py-1.5 rounded-full text-xs sm:text-sm font-semibold bg-gradient-to-r from-amber-800 to-orange-700 text-gray-900 shadow-lg border border-amber-300/50 backdrop-blur-sm">
                                    <Star className="w-3 h-3 mr-1.5 text-black" />
                                    Featured
                                </div>
                            </motion.div>
                        )}

                        <motion.div
                            className={`max-w-full ${isCenter && slideData.featured ? 'pt-12 sm:pt-16' : ''}`}
                            variants={isCenter ? contentVariants : {}}
                            initial={isCenter ? "hidden" : { opacity: 1, y: 0 }}
                            animate={isCenter ? "visible" : { opacity: 1, y: 0 }}
                        >
                            <motion.h1
                                className={`font-bold text-purple-600 mb-2 ${isCenter
                                    ? 'text-2xl sm:text-2xl lg:text-3xl xl:text-4xl'
                                    : 'text-lg sm:text-xl lg:text-2xl'
                                    }`}
                                variants={isCenter ? itemVariants : {}}
                                initial={isCenter ? undefined : { opacity: 1, y: 0 }}
                                animate={isCenter ? undefined : { opacity: 1, y: 0 }}
                            >
                                {slideData.title}
                            </motion.h1>

                            <motion.div
                                className="w-12 h-1 bg-white/30 mb-3"
                                variants={isCenter ? itemVariants : {}}
                                initial={isCenter ? { width: 0 } : { width: 48, opacity: 1 }}
                                animate={isCenter ? { width: 48 } : { width: 48, opacity: 1 }}
                                transition={isCenter ? { delay: 0.4, duration: 0.6 } : { duration: 0 }}
                            ></motion.div>

                            <motion.h2
                                className={`text-indigo-600 mb-6 font-semibold ${isCenter ? 'text-sm sm:text-base lg:text-lg' : 'text-xs sm:text-sm'
                                    }`}
                                variants={isCenter ? itemVariants : {}}
                                initial={isCenter ? undefined : { opacity: 1, y: 0 }}
                                animate={isCenter ? undefined : { opacity: 1, y: 0 }}
                            >
                                {slideData.subtitle}
                            </motion.h2>

                            {isCenter && (
                                <>
                                    <motion.p
                                        className="text-white/90 text-xs sm:text-sm lg:text-base mb-4 lg:mb-6 leading-relaxed"
                                        variants={itemVariants}
                                    >
                                        {slideData.description}
                                    </motion.p>

                                    {/* Tags 
                  <motion.div 
                    className="flex flex-wrap gap-1 sm:gap-2"
                    variants={itemVariants}
                  >
                    {slideData.tags.map((tag: string, tagIndex: number) => (
                      <motion.span
                        key={tagIndex}
                        className="bg-white/20 backdrop-blur-sm text-white px-2 sm:px-3 py-1 rounded-full text-xs font-medium border border-white/20"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.6 + tagIndex * 0.1, type: "spring" }}
                      >
                        {tag}
                      </motion.span>
                    ))}
                  </motion.div>
                  */}
                                </>
                            )}
                        </motion.div>
                    </div>
                </div>
            </motion.div>
        );
    };

    // Mobile layout - stack cards vertically
    if (isMobile) {
        return (
            <div className="w-full max-w-md mx-auto px-4">
                <div className="space-y-0">
                    {slides.map((slide, index) => (
                        <MobileCard key={index} slideData={slide} index={index} />
                    ))}
                </div>
            </div>
        );
    }

    // Desktop layout - carousel with 3 cards
    return (
        <div className="relative w-full max-w-7xl mx-auto">
            {/* Main Carousel Container */}
            <div className="relative flex items-center justify-center gap-2 sm:gap-4 lg:gap-6 min-h-96">
                {/* Left Slide */}
                <div className="flex-1 max-w-xs lg:max-w-sm">
                    <AnimatePresence mode="wait" custom={direction}>
                        {renderSlide(slides[getSlideIndex(-1)], 'left', false, `left-${getSlideIndex(-1)}`)}
                    </AnimatePresence>
                </div>

                {/* Center Slide (Focused) */}
                <div className="flex-1 max-w-md sm:max-w-lg lg:max-w-2xl">
                    <AnimatePresence mode="wait" custom={direction}>
                        {renderSlide(slides[currentSlide], 'center', true, `center-${currentSlide}`)}
                    </AnimatePresence>
                </div>

                {/* Right Slide */}
                <div className="flex-1 max-w-xs lg:max-w-sm">
                    <AnimatePresence mode="wait" custom={direction}>
                        {renderSlide(slides[getSlideIndex(1)], 'right', false, `right-${getSlideIndex(1)}`)}
                    </AnimatePresence>
                </div>
            </div>

            {/* Navigation Dots */}
            <div className="flex justify-center mt-6 sm:mt-8 space-x-3">
                {slides.map((_: SlideData, index: number) => (
                    <motion.div
                        key={index}
                        className={`flex items-center justify-center rounded-full transition-all duration-300
              ${index === currentSlide ? 'ring-2 ring-[#5833ff] p-1' : 'p-1'}
            `}
                    >
                        <motion.button
                            onClick={() => goToSlide(index)}
                            className={`w-3 h-3 rounded-full transition-all duration-300
                ${index === currentSlide ? 'bg-white' : 'bg-purple-400 hover:bg-purple-200'}
              `}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            animate={{
                                backgroundColor: index === currentSlide ? '#ffffff' : '#d8b4fe',
                            }}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default AutomatedCarousel;