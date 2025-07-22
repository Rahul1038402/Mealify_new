"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../../lib/utils";
import { ChefHat } from "lucide-react";

export interface MorphingNavigationLink {
  id: string;
  label: string;
  href: string;
  icon?: React.ReactNode;
}

export interface MorphingNavigationProps {
  links: MorphingNavigationLink[];
  scrollThreshold?: number;
  enablePageBlur?: boolean;
  theme?: "dark" | "light" | "glass" | "custom";
  backgroundColor?: string;
  textColor?: string;
  borderColor?: string;
  initialTop?: number;
  compactTop?: number;
  animationDuration?: number;
  className?: string;
  onLinkClick?: (link: MorphingNavigationLink) => void;
  onMenuToggle?: (isOpen: boolean) => void;
  enableSmoothTransitions?: boolean;
  customHamburgerIcon?: React.ReactNode;
  disableAutoMorph?: boolean;
}

export const MorphingNavigation: React.FC<MorphingNavigationProps> = ({
  links,
  scrollThreshold = 100,
  enablePageBlur = true,
  theme = "glass",
  backgroundColor,
  textColor,
  borderColor,
  initialTop = 70,
  compactTop = 20,
  animationDuration = 1,
  className,
  onLinkClick,
  onMenuToggle,
  enableSmoothTransitions = true,
  customHamburgerIcon,
  disableAutoMorph = false,
}) => {
  const [isSticky, setIsSticky] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  const getThemeStyles = useCallback(() => {
    switch (theme) {
      case "dark":
        return {
          nav: "bg-black/80 border-gray-800",
          text: "text-white",
          button: "bg-black/50 border-gray-700",
        };
      case "light":
        return {
          nav: "bg-white/80 border-gray-200",
          text: "text-gray-900",
          button: "bg-white/50 border-gray-300",
        };
      case "custom":
        return {
          nav: backgroundColor ? "" : "bg-white/5 border-white/10",
          text: textColor ? "" : "text-white",
          button: "bg-black/30 border-white/10",
        };
      case "glass":
      default:
        return {
          nav: "bg-white/5 border-white/10",
          text: "text-foreground",
          button: "bg-black/30 border-white/10",
        };
    }
  }, [theme, backgroundColor, textColor]);

  const themeStyles = getThemeStyles();

  useEffect(() => {
    if (disableAutoMorph) return;
    const handleScroll = () => {
      setIsMenuOpen(false);
      // Only update sticky state for screens larger than sm breakpoint
      const isMobile = window.innerWidth < 640;
      setIsSticky(isMobile ? true : window.scrollY >= scrollThreshold);
    };
    
    // Initial check
    handleScroll();
    
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [scrollThreshold, disableAutoMorph]);

  const handleMenuToggle = () => {
    const open = !isMenuOpen;
    setIsMenuOpen(open);
    setIsSticky(false);
    onMenuToggle?.(open);
  };

  const handleLinkClick = (link: MorphingNavigationLink, e: React.MouseEvent) => {
    e.preventDefault();
    setIsMenuOpen(false);
    onLinkClick?.(link);
    if (enableSmoothTransitions) {
      const target = document.querySelector(link.href);
      if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node) && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [isMenuOpen]);

  const customStyles = {
    backgroundColor: theme === "custom" ? backgroundColor : undefined,
    color: theme === "custom" ? textColor : undefined,
    borderColor: theme === "custom" ? borderColor : undefined,
  };

  return (
    <>
      <AnimatePresence>
        {enablePageBlur && isMenuOpen && (
          <motion.div
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        )}
      </AnimatePresence>

      <motion.header
        className={cn("fixed z-50 w-full", className)}
        initial={false}
        animate={{
          top: isSticky ? compactTop : initialTop,
        }}
        transition={{ duration: animationDuration }}
      >
        <motion.nav
          ref={navRef}
          className={cn(
            "mx-auto backdrop-blur-md border fixed left-1/2 -translate-x-1/2",
            "flex items-center justify-center",
            isMenuOpen ? "!flex-col" : "",
            themeStyles.nav,
            themeStyles.text
          )}
          animate={{
            height: isMenuOpen ? "auto" : 90,
            width: isMenuOpen ? "95%" : (isSticky ? 90 : "calc(100% - 2rem)"),
            maxWidth: isMenuOpen ? "95%" : (!isSticky && window.innerWidth >= 640 ? "500px" : "90px"),
            borderRadius: isMenuOpen ? 20 : 9999,
            paddingTop: isMenuOpen ? 20 : 0,
            paddingBottom: isMenuOpen ? 20 : 0
          }}
          transition={{ duration: animationDuration }}
          style={{ top: 0, ...customStyles }}
        >
          {/* Mobile Menu Button */}
          <motion.button
            onClick={handleMenuToggle}
            className={cn(
              "sm:hidden absolute right-4 w-[45px] h-[45px] rounded-full outline-none border text-gray-200 cursor-pointer flex items-center justify-center",
              themeStyles.button
            )}
            initial={false}
            animate={{ 
              scale: 1,
              opacity: 1,
              top: isMenuOpen ? 10 : "50%",
              y: isMenuOpen ? 0 : "-50%"
            }}
          >
            {customHamburgerIcon || (
              <div className="flex flex-col items-center justify-center gap-[6px] w-full">
                <span className={cn(
                  "block w-5 h-[2px] bg-current transition-transform duration-300",
                  isMenuOpen ? "rotate-45 translate-y-[4px]" : ""
                )}></span>
                <span className={cn(
                  "block w-5 h-[2px] bg-current transition-transform duration-300",
                  isMenuOpen ? "-rotate-45 -translate-y-[4px]" : ""
                )}></span>
              </div>
            )}
          </motion.button>

          {/* Desktop Links */}
          <div className={cn(
            "hidden sm:flex items-center justify-center",
            isSticky ? "opacity-0" : "opacity-100"
          )}>
            {links.map((link, i) => (
              <motion.a
                key={link.id}
                href={link.href}
                onClick={(e) => handleLinkClick(link, e)}
                className="px-5 py-2.5 text-lg font-bold text-gray-200 tracking-wide"
              >
                {link.icon && <span className="mr-2 inline-block">{link.icon}</span>}
                {link.label}
              </motion.a>
            ))}
          </div>

          {/* Mobile Links */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                className="sm:hidden flex flex-col items-center w-full gap-4 mt-12"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {links.map((link, i) => (
                  <motion.a
                    key={link.id}
                    href={link.href}
                    onClick={(e) => handleLinkClick(link, e)}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ delay: i * 0.1 }}
                    className="px-5 py-2.5 text-lg font-bold text-gray-200 tracking-wide"
                  >
                    {link.icon && <span className="mr-2 inline-block">{link.icon}</span>}
                    {link.label}
                  </motion.a>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Sticky Menu Button (Desktop) */}
          <motion.button
            onClick={handleMenuToggle}
            className={cn(
              "hidden sm:flex absolute inset-0 m-auto w-[60px] h-[60px] rounded-full outline-none border text-gray-200 cursor-pointer items-center justify-center",
              themeStyles.button
            )}
            animate={{ scale: isSticky ? 1 : 0 }}
            transition={{ delay: isSticky ? 0.2 : 0 }}
          >
            {customHamburgerIcon || (
              <div className="flex flex-col items-center justify-center gap-[6px] w-full">
                <span className="block w-5 h-[2px] bg-current transition-transform duration-300"></span>
                <span className="block w-5 h-[2px] bg-current transition-transform duration-300"></span>
              </div>
            )}
          </motion.button>
        </motion.nav>
      </motion.header>

    </>
  );
};

export default MorphingNavigation;