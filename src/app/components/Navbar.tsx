'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import gsap from 'gsap';

export default function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  // Refs for animations
  const navbarRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const navLinksRef = useRef<HTMLDivElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  const isActive = (path: string) => {
    if (path === '/' && pathname === '/') return true;
    if (path !== '/' && pathname.startsWith(path)) return true;
    return false;
  };
  
  // Initial animation on page load
  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    
    // Animate navbar from top
    tl.fromTo(navbarRef.current, 
      { y: -100, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 0.8 }
    );
    
    // Animate logo with a slight bounce
    tl.fromTo(logoRef.current,
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.6, ease: 'back.out(1.7)' },
      '-=0.4'
    );
    
    // Animate nav links staggered
    tl.fromTo(
      navLinksRef.current?.children || [],
      { y: -20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.4, stagger: 0.1 },
      '-=0.3'
    );
    
    // Animate action buttons
    tl.fromTo(
      actionsRef.current?.children || [],
      { x: 20, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.4, stagger: 0.1 },
      '-=0.6'
    );
  }, []);
  
  // Animation for mobile menu toggle
  useEffect(() => {
    if (!mobileMenuRef.current) return;
    
    if (isMobileMenuOpen) {
      gsap.fromTo(
        mobileMenuRef.current,
        { height: 0, opacity: 0 },
        { height: 'auto', opacity: 1, duration: 0.3, ease: 'power2.out' }
      );
      
      // Animate menu items
      gsap.fromTo(
        mobileMenuRef.current.querySelectorAll('a, button'),
        { x: -20, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.3, stagger: 0.05, delay: 0.1 }
      );
    } else {
      gsap.to(mobileMenuRef.current, {
        height: 0,
        opacity: 0,
        duration: 0.2,
        ease: 'power2.in'
      });
    }
  }, [isMobileMenuOpen]);
  
  // Scroll animation effect
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 50) {
        setScrolled(true);
        if (navbarRef.current) {
          gsap.to(navbarRef.current, {
            backgroundColor: '#000000',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
            top: 0,
            height: '68px', // Increased to accommodate the padding
            duration: 0.3,
            ease: 'power2.out'
          });
          
          // Animate logo when scrolled
          const logoLink = logoRef.current?.querySelector('a');
          if (logoLink) {
            gsap.to(logoLink, {
              scale: 0.9,
              y: -2,
              duration: 0.3,
              ease: 'power2.out'
            });
            
            // Make the star pulse
            const star = logoLink.querySelector('span');
            if (star) {
              gsap.to(star, {
                scale: 1.2,
                color: '#ff3333',
                repeat: -1,
                yoyo: true,
                duration: 1,
                ease: 'power1.inOut'
              });
            }
          }
        }
      } else {
        setScrolled(false);
        if (navbarRef.current) {
          gsap.to(navbarRef.current, {
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            backdropFilter: 'blur(4px)',
            boxShadow: 'none',
            top: '24px', // 6 * 4 = 24px (for top-6)
            height: '68px', // Increased to accommodate the padding
            duration: 0.3,
            ease: 'power2.out'
          });
          
          // Reset logo animation when back to top
          const logoLink = logoRef.current?.querySelector('a');
          if (logoLink) {
            gsap.to(logoLink, {
              scale: 1,
              y: 0,
              duration: 0.3,
              ease: 'power2.out'
            });
            
            // Stop the star pulsing
            const star = logoLink.querySelector('span');
            if (star) {
              gsap.killTweensOf(star);
              gsap.to(star, {
                scale: 1,
                color: '#dc2626',
                duration: 0.3,
                ease: 'power2.out'
              });
            }
          }
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    // Clean up the event listener
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  // Hover animations for nav links and buttons
  useEffect(() => {
    // Setup hover animations for nav links
    const navLinks = navLinksRef.current?.querySelectorAll('a') || [];
    navLinks.forEach(link => {
      link.addEventListener('mouseenter', () => {
        gsap.to(link, {
          y: -3,
          color: '#ffffff',
          duration: 0.2,
          ease: 'power1.out'
        });
      });
      
      link.addEventListener('mouseleave', () => {
        if (!link.classList.contains('text-white')) {
          gsap.to(link, {
            y: 0,
            color: '#9ca3af', // text-gray-400
            duration: 0.2,
            ease: 'power1.in'
          });
        } else {
          gsap.to(link, {
            y: 0,
            duration: 0.2,
            ease: 'power1.in'
          });
        }
      });
    });
    
    // Setup hover animations for buttons
    const buttons = actionsRef.current?.querySelectorAll('button') || [];
    buttons.forEach(button => {
      button.addEventListener('mouseenter', () => {
        gsap.to(button, {
          scale: 1.05,
          duration: 0.2,
          ease: 'power1.out'
        });
      });
      
      button.addEventListener('mouseleave', () => {
        gsap.to(button, {
          scale: 1,
          duration: 0.2,
          ease: 'power1.in'
        });
      });
    });
    
    // Logo animation on hover
    const logo = logoRef.current?.querySelector('a');
    if (logo) {
      logo.addEventListener('mouseenter', () => {
        gsap.to(logo.querySelector('span'), {
          rotation: 360,
          scale: 1.2,
          color: '#ff0000',
          duration: 0.6,
          ease: 'back.out(1.7)'
        });
      });
      
      logo.addEventListener('mouseleave', () => {
        gsap.to(logo.querySelector('span'), {
          rotation: 0,
          scale: 1,
          color: '#dc2626', // text-red-600
          duration: 0.6,
          ease: 'back.out(1.7)'
        });
      });
    }
    
    // Cleanup event listeners on unmount
    return () => {
      navLinks.forEach(link => {
        link.removeEventListener('mouseenter', () => {});
        link.removeEventListener('mouseleave', () => {});
      });
      
      buttons.forEach(button => {
        button.removeEventListener('mouseenter', () => {});
        button.removeEventListener('mouseleave', () => {});
      });
      
      if (logo) {
        logo.removeEventListener('mouseenter', () => {});
        logo.removeEventListener('mouseleave', () => {});
      }
    };
  }, []);

  return (
    <nav 
      ref={navbarRef} 
      className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-black shadow-md h-[68px] top-0 backdrop-blur-sm' : 'bg-black/30 backdrop-blur-sm shadow-none h-[68px] top-6'}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-1">
        <div className={`flex justify-between items-center h-full`}>
          <div ref={navLinksRef} className="flex items-center space-x-8 pt-1">
            <Link
              href="/"
              className={`inline-flex items-center px-1 pt-2 text-sm font-medium ${isActive('/') ? 'text-white' : 'text-gray-400 hover:text-white'}`}
            >
              ABOUT
            </Link>
            <Link
              href="/#lineup"
              className={`inline-flex items-center px-1 pt-2 text-sm font-medium ${isActive('/#lineup') ? 'text-white' : 'text-gray-400 hover:text-white'}`}
            >
              GUEST STAR
            </Link>
            <Link
              href="/#schedule"
              className={`inline-flex items-center px-1 pt-2 text-sm font-medium ${isActive('/#schedule') ? 'text-white' : 'text-gray-400 hover:text-white'}`}
            >
              EVENT
            </Link>
            <Link
              href="/tickets"
              className={`inline-flex items-center px-1 pt-2 text-sm font-medium ${isActive('/tickets') ? 'text-white' : 'text-gray-400 hover:text-white'}`}
            >
              TICKET
            </Link>
          </div>
          
          <div ref={logoRef} className="flex-shrink-0 flex items-center absolute left-1/2 transform -translate-x-1/2 pt-4">
            <Link href="/" className="text-xl font-bold text-white" style={{ fontFamily: 'Impact, fantasy', letterSpacing: '1px' }}>
              FEST<span className="text-red-600">★</span>LAND
            </Link>
          </div>
          
          <div ref={actionsRef} className="flex items-center space-x-4 pt-4">
            <button className="text-gray-400 hover:text-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
            </button>
            <button className="text-gray-400 hover:text-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
              </svg>
            </button>
            <button className="bg-white text-black text-xs px-3 pt-2 py-1.5 rounded-sm font-medium">
              Login
            </button>
          </div>
          <div className="-mr-2 flex items-center md:hidden">
            <button
              onClick={() => {
                setIsMobileMenuOpen(!isMobileMenuOpen);
                
                // Animate the button when clicked
                const button = document.activeElement;
                gsap.to(button, {
                  rotate: isMobileMenuOpen ? 0 : 180,
                  scale: 1.1,
                  duration: 0.3,
                  ease: 'back.out(1.7)',
                  onComplete: () => {
                    gsap.to(button, {
                      scale: 1,
                      duration: 0.2
                    });
                  }
                });
              }}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-red-500"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {/* Icon when menu is closed */}
              <svg
                className={`${isMobileMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              {/* Icon when menu is open */}
              <svg
                className={`${isMobileMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      <div ref={mobileMenuRef} className={`${isMobileMenuOpen ? 'block' : 'hidden'} md:hidden`}>
        <div className="pt-2 pb-3 space-y-1 bg-black border-t border-gray-800">
          <Link
            href="/"
            className={`block pl-3 pr-4 py-2 text-base font-medium ${isActive('/') ? 'text-white' : 'text-gray-400 hover:text-white'}`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            ABOUT
          </Link>
          <Link
            href="/#lineup"
            className={`block pl-3 pr-4 py-2 text-base font-medium ${isActive('/#lineup') ? 'text-white' : 'text-gray-400 hover:text-white'}`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            GUEST STAR
          </Link>
          <Link
            href="/#schedule"
            className={`block pl-3 pr-4 py-2 text-base font-medium ${isActive('/#schedule') ? 'text-white' : 'text-gray-400 hover:text-white'}`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            EVENT
          </Link>
          <Link
            href="/tickets"
            className={`block pl-3 pr-4 py-2 text-base font-medium ${isActive('/tickets') ? 'text-white' : 'text-gray-400 hover:text-white'}`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            TICKET
          </Link>
          <div className="pt-3 pb-3 border-t border-gray-800 px-3 flex space-x-3">
            <button className="bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium">
              LOGIN
            </button>
            <button className="border border-gray-700 text-white px-4 py-2 rounded-md text-sm font-medium">
              CART
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}