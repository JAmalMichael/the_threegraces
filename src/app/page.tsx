'use client'

import gsap from "gsap"
import { useEffect, useRef } from "react";

const navItems = ['ART', 'ABOUT', 'VISIT', 'SHOP', 'SEARCH'];

export default function Home() {

  const navRef = useRef<HTMLUListElement>(null);

 useEffect(() => {
      const items = navRef.current?.querySelectorAll('li');

      items?.forEach((item) => {
        const text = item.querySelector('span');

        item.addEventListener('mousemove', (e) => {
          const bounds = item.getBoundingClientRect();
          const x = e.clientX - bounds.left - bounds.width / 2;
          const y = e.clientY - bounds.top - bounds.height / 2;

          gsap.to(text, {
            x,
            y,
            duration: 0.3,
            ease: 'power2.out'
          });
        });

        item.addEventListener('mouseleave', (e) => {
          gsap.to(text, {
            x: 0,
            y: 0,
            duration: 0.3,
            ease:  'power3.out'
          });
        });
      });

 }, [])

  return (
    <>
        <nav className="homepage-nav w-full h-fit bg-black flex 
        justify-center items-center py-5 text-[10px]">
          <ul
           className="flex flex-row gap-6 sm:gap-10 
        text-white md:text-[12px] font-semibold cursor-pointer text-center"
            ref={navRef}
          >
            {navItems.map((text, index) => (
              <li key={index} className="relative w-24 h-10 flex justify-center items-center group ">
                <span className="block transition-transform ">{text}</span>
              </li>
            ))
              }   
          </ul>
        </nav>
        <main>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </main>
        <footer></footer>
    </>
    
  )
}
