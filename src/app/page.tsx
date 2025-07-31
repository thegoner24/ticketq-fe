'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function Home() {
  // Refs for animations
  const heroRef = useRef<HTMLDivElement>(null);
  const heroTitleRef = useRef<HTMLHeadingElement>(null);
  const heroButtonRef = useRef<HTMLDivElement>(null);
  const featuredArtistsRef = useRef<HTMLDivElement>(null);
  const cultureRef = useRef<HTMLDivElement>(null);
  const lineupRef = useRef<HTMLDivElement>(null);
  const artistCardsRef = useRef<HTMLDivElement>(null);
  const eventDetailsRef = useRef<HTMLDivElement>(null);
  const scheduleRef = useRef<HTMLDivElement>(null);
  const scheduleItemsRef = useRef<HTMLDivElement>(null);
  const artistFeatureRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  // Register ScrollTrigger plugin
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    // Initial animations when page loads
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    
    // Hero section animations
    tl.fromTo(heroTitleRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1 }
    );
    
    tl.fromTo(heroButtonRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6 },
      '-=0.4'
    );
    
    // Featured artists animation
    if (featuredArtistsRef.current) {
      tl.fromTo(featuredArtistsRef.current.children,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, duration: 0.4 },
        '-=0.2'
      );
    }
    
    // Setup scroll animations
    setupScrollAnimations();
    
    return () => {
      // Clean up ScrollTrigger on component unmount
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);
  
  // Function to set up scroll-based animations
  const setupScrollAnimations = () => {
    // Culture section animation
    if (cultureRef.current) {
      gsap.fromTo(cultureRef.current,
        { y: 50, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.8,
          scrollTrigger: {
            trigger: cultureRef.current,
            start: 'top 80%',
            end: 'bottom 70%',
            toggleActions: 'play none none reverse'
          }
      }
    );
    
    // Lineup section animation
    if (lineupRef.current) {
      const lineupTitle = lineupRef.current.querySelector('h2');
      if (lineupTitle) {
        gsap.fromTo(lineupTitle,
          { y: 30, opacity: 0 },
          { 
            y: 0, 
            opacity: 1, 
            duration: 0.6,
            scrollTrigger: {
              trigger: lineupRef.current,
              start: 'top 75%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      }
    }
    
    // Artist cards staggered animation
    if (artistCardsRef.current) {
      gsap.fromTo(artistCardsRef.current.children,
        { y: 50, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          stagger: 0.2,
          duration: 0.6,
          scrollTrigger: {
            trigger: artistCardsRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }
    }
    
    // Event details animation
    if (eventDetailsRef.current) {
      gsap.fromTo(eventDetailsRef.current,
        { scale: 0.9, opacity: 0 },
        { 
          scale: 1, 
          opacity: 1, 
          duration: 0.7,
          scrollTrigger: {
            trigger: eventDetailsRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }
    
    // Schedule title animation
    if (scheduleRef.current) {
      const scheduleTitle = scheduleRef.current.querySelector('h2');
      if (scheduleTitle) {
        gsap.fromTo(scheduleTitle,
          { y: 30, opacity: 0 },
          { 
            y: 0, 
            opacity: 1, 
            duration: 0.6,
            scrollTrigger: {
              trigger: scheduleRef.current,
              start: 'top 75%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      }
    }
    
    // Schedule items staggered animation
    if (scheduleItemsRef.current) {
      gsap.fromTo(scheduleItemsRef.current.children,
        { x: -30, opacity: 0 },
        { 
          x: 0, 
          opacity: 1, 
          stagger: 0.15,
          duration: 0.5,
          scrollTrigger: {
            trigger: scheduleItemsRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }
    
    // Artist feature animation
    if (artistFeatureRef.current) {
      gsap.fromTo(artistFeatureRef.current,
        { y: 40, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.8,
          scrollTrigger: {
            trigger: artistFeatureRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }
    
    // CTA section animation
    if (ctaRef.current) {
      gsap.fromTo(ctaRef.current,
        { y: 30, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.7,
          scrollTrigger: {
            trigger: ctaRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }
    
    // Animate the stars in the lineup title
    if (lineupRef.current) {
      const stars = lineupRef.current.querySelectorAll('.text-red-500');
      stars.forEach((star: Element) => {
        gsap.to(star, {
          rotation: 360,
          repeat: -1,
          duration: 8,
          ease: 'linear'
        });
      });
    }
    
    // Animate the star in the schedule title
    if (scheduleRef.current) {
      const scheduleStar = scheduleRef.current.querySelector('.text-red-500');
      if (scheduleStar) {
        gsap.to(scheduleStar, {
          scale: 1.2,
          repeat: -1,
          yoyo: true,
          duration: 0.8,
          ease: 'power1.inOut'
        });
      }
    }
  };
  
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <div ref={heroRef} className="relative overflow-hidden bg-black">
        <div className="absolute inset-0 z-0 opacity-20 bg-gradient-to-b from-purple-900 to-black"></div>
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8 relative z-10">
          <div className="mx-auto max-w-3xl text-center">
            <h1 ref={heroTitleRef} className="text-5xl font-bold tracking-tight text-white sm:text-7xl" style={{ fontFamily: 'Impact, fantasy', letterSpacing: '1px' }}>
              THE BIGGEST<br />CONCERT ON EARTH<br />
              <span className="text-red-500">LIVE NOW</span>
            </h1>
            <div ref={heroButtonRef} className="mt-10 flex items-center justify-center gap-x-6">
              <Link 
                href="/tickets" 
                className="rounded-md bg-red-600 px-5 py-3 text-lg font-semibold text-white shadow-sm hover:bg-red-500 transition-all duration-300"
              >
                Get Tickets
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Artists */}
      <div className="bg-black py-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div ref={featuredArtistsRef} className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-xl md:text-2xl font-bold">
            <div className="flex items-center">
              <span>WIZ KHALIFA</span>
              <span className="text-red-500 mx-2">★</span>
            </div>
            <div className="flex items-center">
              <span>EMINEM</span>
              <span className="text-red-500 mx-2">★★★</span>
            </div>
            <div className="flex items-center">
              <span>KENDRICK LAMAR</span>
              <span className="text-red-500 mx-2">★★</span>
            </div>
            <div className="flex items-center">
              <span>LIL WAYNE</span>
              <span className="text-red-500 mx-2">★</span>
            </div>
          </div>
        </div>
      </div>

      {/* Culture Section */}
      <div ref={cultureRef} className="bg-black py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:max-w-4xl">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl mb-8">
              EMBRACING RAP'S<br />CULTURE, TALENT,<br />AND ARTISTRY
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              Experience the raw energy and authentic expression of hip-hop's greatest artists. 
              Our concert celebrates the cultural impact, lyrical genius, and artistic innovation 
              that has defined generations. From classic anthems to groundbreaking new tracks, 
              immerse yourself in the evolution of rap music.
            </p>
          </div>
        </div>
      </div>

      {/* Guest Lineup */}
      <div ref={lineupRef} id="lineup" className="bg-black py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl mb-12 text-center">
            MEET OUR<br />
            <span className="text-red-500">★</span> GUEST LINEUP <span className="text-red-500">★</span>
          </h2>
          <div ref={artistCardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="relative w-full aspect-square mb-4 overflow-hidden rounded-lg bg-gray-800">
                <Image 
                  src="https://cdn-images.dzcdn.net/images/artist/19cc38f9d69b352f718782e7a22f9c32/1900x1900-000000-80-0-0.jpg" 
                  alt="Eminem" 
                  fill 
                  className="object-cover"
                  style={{ objectPosition: 'center top' }}
                />
              </div>
              <h3 className="text-xl font-bold">EMINEM</h3>
              <p className="text-gray-400">SPECIAL GUEST</p>
            </div>
            <div className="text-center">
              <div className="relative w-full aspect-square mb-4 overflow-hidden rounded-lg bg-gray-800">
                <Image 
                  src="https://deathrowrecords.com/cms/f8f90b2e120f83f10ab8041a85c23bc4ae8ad4d5012a278f87ca5f55320af827.jpg"
                  alt="Snoop Dogg" 
                  fill 
                  className="object-cover"
                  style={{ objectPosition: 'center top' }}
                />
              </div>
              <h3 className="text-xl font-bold">SNOOP DOGG</h3>
              <p className="text-gray-400">SPECIAL GUEST</p>
            </div>
            <div className="text-center">
              <div className="relative w-full aspect-square mb-4 overflow-hidden rounded-lg bg-gray-800">
                <Image 
                  src="https://www.aljazeera.com/wp-content/uploads/2021/11/AP21310133188103.jpg?resize=1800%2C1800" 
                  alt="Travis Scott" 
                  fill 
                  className="object-cover"
                  style={{ objectPosition: 'center top' }}
                />
              </div>
              <h3 className="text-xl font-bold">TRAVIS SCOTT</h3>
              <p className="text-gray-400">SPECIAL GUEST</p>
            </div>
          </div>
        </div>
      </div>

      {/* Event Details */}
      <div ref={eventDetailsRef} className="bg-black py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div>
              <div className="text-6xl font-bold text-red-500">19</div>
              <div className="text-xl">DECEMBER 2025</div>
            </div>
            <div className="text-center md:text-right">
              <h2 className="text-3xl font-bold mb-2">WE ARE LIVE<br />AT WEMBLEY<br /><span className="text-red-500">STADIUM</span></h2>
            </div>
          </div>
        </div>
      </div>

      {/* Schedule */}
      <div ref={scheduleRef} id="schedule" className="bg-black py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl mb-12 text-center">
            STAR<br />RUNDOWN <span className="text-red-500">★</span>
          </h2>
          <div ref={scheduleItemsRef} className="space-y-6 max-w-3xl mx-auto">
            <div className="flex justify-between items-center border-b border-gray-800 pb-4">
              <div className="text-gray-400">07:00pm</div>
              <div className="text-xl font-bold">OPEN GATE</div>
              <div className="text-gray-400">→</div>
            </div>
            <div className="flex justify-between items-center border-b border-gray-800 pb-4">
              <div className="text-gray-400">08:00pm</div>
              <div className="text-xl font-bold">KENDRICK LAMAR</div>
              <div className="text-gray-400">→</div>
            </div>
            <div className="flex justify-between items-center border-b border-gray-800 pb-4">
              <div className="text-gray-400">09:00pm</div>
              <div className="text-xl font-bold">SNOOP DOGG</div>
              <div className="text-gray-400">→</div>
            </div>
            <div className="flex justify-between items-center border-b border-gray-800 pb-4">
              <div className="text-gray-400">10:00pm</div>
              <div className="text-xl font-bold">TRAVIS SCOTT</div>
              <div className="text-gray-400">→</div>
            </div>
            <div className="flex justify-between items-center border-b border-gray-800 pb-4">
              <div className="text-gray-400">11:00pm</div>
              <div className="text-xl font-bold">EMINEM</div>
              <div className="text-gray-400">→</div>
            </div>
          </div>

          {/* Artist Feature */}
          <div ref={artistFeatureRef} className="mt-16 bg-black rounded-lg p-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="relative w-full md:w-1/3 aspect-square overflow-hidden rounded-lg bg-gray-800">
                <Image 
                  src="https://www.nbc.com/sites/nbcblog/files/styles/scale_862/public/2024/09/snoop-dogg.jpg" 
                  alt="Snoop Dogg" 
                  fill 
                  className="object-cover"
                  style={{ objectPosition: 'center top' }}
                />
              </div>
              <div className="md:w-2/3">
                <h3 className="text-2xl font-bold mb-4">SNOOP DOGG</h3>
                <p className="text-gray-300 mb-4">
                  Calvin Cordozar Broadus Jr., known professionally as Snoop Dogg, is an American rapper, songwriter, media personality, actor, and entrepreneur. His music career began in 1992 when he was discovered by Dr. Dre, and he has since sold over 35 million albums worldwide.
                </p>
                <h4 className="text-lg font-bold mb-2">TOP HITS:</h4>
                <ul className="list-disc list-inside space-y-1 text-gray-300">
                  <li>Gin and Juice</li>
                  <li>Drop It Like It's Hot</li>
                  <li>Beautiful</li>
                  <li>Who Am I? - Nothin' but a 'G' Thang</li>
                  <li>Lay Low</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div ref={ctaRef} className="bg-black py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl mb-6">
            GET THE TICKET NOW
          </h2>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            Don't miss this once-in-a-lifetime concert experience featuring the biggest names in hip-hop. 
            Secure your tickets now before they're gone!
          </p>
          <Link 
            href="/tickets" 
            className="inline-block rounded-md bg-red-600 px-5 py-3 text-lg font-semibold text-white shadow-sm hover:bg-red-500 transition-all duration-300"
          >
            Get Tickets
          </Link>
        </div>
      </div>
    </div>
  );
}
