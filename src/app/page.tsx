'use client'

import gsap from "gsap"
import { useEffect, useRef } from "react";

const navItems = ['ART', 'ABOUT', 'VISIT', 'SHOP', 'SEARCH'];

export default function Home() {

  const navRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const items = navRef.current?.querySelectorAll('li'); //selecting all the list property

    items?.forEach((item) => {
      const span = item.querySelector('span'); //selecting the span inside the list

      item.addEventListener('mousemove', (e) => {   //adding the mousemove event
        const rect = item.getBoundingClientRect();  //creating a rectangle property
        const x = e.clientX - rect.left;          
        const y = e.clientY - rect.top;


        gsap.to(span, {               //direction of item when mousemoves
          x: x- rect.width / 2,
          y: y - rect.height / 2,
          duration: 0.3,
          ease: 'power2.out'
        })
      });


      item.addEventListener('mouseleave', (e) => {
        gsap.to(span,     //direction of item when mouse leaves
          {
            x: 0,
            y: 0,
            duration: 0.1,
            ease: 'power2.out'
          })
      });
    })
  });

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
              <li key={index} className="overflow-hidden relative mx-10">
                <span className="block">{text}</span>
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
