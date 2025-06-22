'use client'

import { PerspectiveCamera } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import gsap from "gsap"
import { Suspense, useEffect, useRef } from "react";
import ThreeGraces from "@/components/ThreeGraces";
import CanvasLoader from "@/components/CanvasLoader";
import { Leva, useControls } from "leva";
import ToogleCamera from "@/components/ToogleCamera";
import { useMediaQuery } from "react-responsive";

const navItems = ['ART', 'ABOUT', 'VISIT', 'SHOP', 'SEARCH'];

export default function Home() {

  const isMobile: boolean = useMediaQuery({ query: '(max-width: 768px)' })

  //adding the Leva property
  // const {positionX, positionY, positionZ } : {
  //   positionX : number
  //   positionY : number
  //   positionZ : number
  // } = useControls('ThreeGraces', {
  //     positionX: {value: 2.5, min: -10, max: 10},
  //     positionY: {value: 2.5, min: -10, max: 10},
  //     positionZ: {value: 2.5, min: -10, max: 10}
  // })

  //   const {rotationX, rotationY, rotationZ } : {
  //   rotationX : number
  //   rotationY : number
  //   rotationZ : number
  // } = useControls('ThreeGraces', {
  //     rotationX: {value: 2.5, min: -10, max: 10},
  //     rotationY: {value: 2.5, min: -10, max: 10},
  //     rotationZ: {value: 2.5, min: -10, max: 10}
  // })

  //   const {scale} : {
  //   scale : number
  // } = useControls('ThreeGraces', {
  //     scale: {value: 2.5, min: -10, max: 10},
  // })

  const navRef = useRef<HTMLUListElement>(null);
  const navRef2 = useRef(null);

 useEffect(() => {


      //navbar slide down animation logic
      gsap.to(navRef2.current, {
        y: 0,
        duration: 1,
        delay: 5,
        ease: 'power3.out'
      });

      //list element animation
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


      //cursor-ball logic
      const ball = document.getElementById('cursor-ball');

      if(!ball) return;

      //handles mouse on entering screen
        const handleMouseEnter = () => {
          ball.style.top = '0px';
        }
        window.addEventListener('mouseenter', handleMouseEnter);
      
        //controls ball movement with cursor
      const handleMouseMove = (e: MouseEvent) => {
          const x = e.clientX - ball.offsetWidth / 2;
          const y = e.clientY - ball.offsetHeight / 2;

          ball.style.transform = `translate(${x}px, ${y}px)`;
      };

      window.addEventListener('mousemove', handleMouseMove);

      //sends ball back to top of screen
      const handleMouseLeave = () => {
        ball.style.top = '-50px'
      };

      window.addEventListener('mouseleave', handleMouseLeave);
    
      return () => {
        window.removeEventListener('mouseenter', handleMouseEnter);
        window.removeEventListener('mouseleave', handleMouseLeave);
        window.removeEventListener('mousemove', handleMouseMove);
      }

 }, [])

  return (
    <>
        <nav className="homepage-nav w-full h-fit bg-black flex
        justify-center items-center py-5 text-[10px] transform -translate-y-full"
          ref={navRef2}
        >
          <ul
           className="flex flex-nowrap md:flex-wrap lg:flex-nowrap justify-center items-center 
               gap-x-6 md:gap-y-4 sm:gap-x-10 
               text-white text-[10px] md:text-[12px] font-semibold text-center max-w-[90%]"
            ref={navRef}
          >
            {navItems.map((text, index) => (
              <li key={index} className="relative w-24 h-10 flex justify-center items-center group cursor-pointer">
                <span className="block transition-transform ">{text}</span>
              </li>
            ))
              }   
          </ul>
        </nav>
        <main className="w-full h-screen flex flex-col relative">
          <div id="cursor-ball"
          className=" w-4 h-4 rounded-full z-50 transition-transform duration-300 pointer-events-none bg-white fixed top-0">
          </div>
          <div className="w-full h-full inset-0">
                  {/* <Leva /> */}
                <Canvas>
                  <Suspense fallback={<CanvasLoader />}>
                  <PerspectiveCamera makeDefault position={[1.9,11.7,2.7]} fov={60}/>
                    <ToogleCamera isMobile={isMobile}>    
                  <ThreeGraces 
                 // scale={0.09} 
                  position={[-2.1, -9.7, -7.7]} 
                  rotation={[-2.9, 2.9, -3.1]} 
                  scale={[0.2, 0.2, 0.2]}
                  />
                    </ToogleCamera>
                  <ambientLight intensity={1}/>
                  <directionalLight color={0x435c72} position={[-100,0,-100]} intensity={0.08}/>
                  <pointLight color={0x88b2d9} position={[30,3,1.8]} intensity={2.7} distance={4} decay={3} />
                  </Suspense>
                </Canvas>
          </div>
          <div></div>
          <div></div>
          <div></div>
        </main>
        {/* <footer>
          <p 
            className="text-[#faebd7] bg-[rgb(5,5,3)] flex justify-center items-center text-[7px] py-2 md:py-4">
            Created By Igbanesi Michael Based on
             <a href="https://dribbble.com/shots/6767548-The-Three-Graces-Concept" target="_blank"> Tom Bogner Design </a>
            Design.</p>  
        </footer> */}
    </>
    
  )
}
