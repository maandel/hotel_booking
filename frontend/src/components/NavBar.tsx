"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { Moon, Sun, Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { MotionDiv } from "./MotionWrapper";

export default function NavBar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <nav className="fixed top-0 w-full z-50 bg-background/80 dark:bg-card/80 backdrop-blur-md shadow-sm dark:shadow-none transition-all duration-500 ease-in-out">
      <div className="flex justify-between items-center w-full px-5 md:px-16 py-4 max-w-7xl mx-auto">
        <Link href="/" className="font-serif text-2xl text-primary tracking-wide">
          Lumina Spa & Resort
        </Link>
        <div className="hidden md:flex items-center space-x-8">
          <Link href="#rooms" className="text-xs font-semibold uppercase tracking-[0.1em] text-secondary hover:text-primary transition-colors duration-300">The Retreat</Link>
          <Link href="#amenities" className="text-xs font-semibold uppercase tracking-[0.1em] text-secondary hover:text-primary transition-colors duration-300">Treatments</Link>
          <a href="#dining" className="text-xs font-semibold uppercase tracking-[0.1em] text-secondary hover:text-primary transition-colors duration-300">Dining</a>
          <a href="#gallery" className="text-xs font-semibold uppercase tracking-[0.1em] text-secondary hover:text-primary transition-colors duration-300">Gallery</a>
          <a href="#contact" className="text-xs font-semibold uppercase tracking-[0.1em] text-secondary hover:text-primary transition-colors duration-300">Contact</a>
        </div>
        
        <div className="flex items-center gap-4">
          {mounted && (
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-full hover:bg-muted transition-colors text-foreground"
              aria-label="Toggle Dark Mode"
            >
              {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          )}
          <Link href="/book" className="hidden md:inline-flex items-center justify-center px-6 py-3 bg-foreground text-background text-xs font-semibold uppercase tracking-[0.1em] rounded hover:opacity-90 transition-opacity">
            Book Now
          </Link>
          <button 
            className="md:hidden p-2 text-primary hover:bg-muted rounded-full transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-background border-b border-border shadow-lg py-4 px-5 flex flex-col space-y-4 animate-in slide-in-from-top-2">
          <Link href="#rooms" onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-semibold uppercase tracking-[0.1em] text-secondary hover:text-primary transition-colors duration-300 py-2 border-b border-border/50">The Retreat</Link>
          <Link href="#amenities" onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-semibold uppercase tracking-[0.1em] text-secondary hover:text-primary transition-colors duration-300 py-2 border-b border-border/50">Treatments</Link>
          <a href="#dining" onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-semibold uppercase tracking-[0.1em] text-secondary hover:text-primary transition-colors duration-300 py-2 border-b border-border/50">Dining</a>
          <a href="#gallery" onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-semibold uppercase tracking-[0.1em] text-secondary hover:text-primary transition-colors duration-300 py-2 border-b border-border/50">Gallery</a>
          <a href="#contact" onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-semibold uppercase tracking-[0.1em] text-secondary hover:text-primary transition-colors duration-300 py-2 border-b border-border/50">Contact</a>
          <Link href="/book" onClick={() => setIsMobileMenuOpen(false)} className="inline-flex items-center justify-center px-6 py-3 mt-4 bg-foreground text-background text-xs font-semibold uppercase tracking-[0.1em] rounded hover:opacity-90 transition-opacity w-full">
            Book Now
          </Link>
        </div>
      )}
    </nav>
  );
}
