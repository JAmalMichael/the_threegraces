'use client'
import React, { useEffect, useRef } from 'react'


const Spotlights = () => {

    const lightRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const move = (e: MouseEvent) => {
            if(lightRef.current) {
                lightRef.current.style.left = `${e.clientX}px`
                lightRef.current.style.top = `${e.clientY}px`
            }
        }

        window.addEventListener('mousemove', move);

        return () => window.removeEventListener('mousemove', move);
    }, [])




  return (
    <div className='fixed inset-0 z-50 pointer-events-none '> 
        //dark layer
        <div className='absolute inset-0 bg-black opacity-80'>
        </div>

        <div
            ref={lightRef}
            className='absolute w-72 h-72 pointer-events-none'
            style={{
                transform: `translate(-50%, -50%)`,
                background: `radial-gradient(circle, rgba(255,255,255,0.25) 0%, rgba(0,0,0,0.8) 80%)`,
                mixBlendMode: `screen`
            }}
        />
    </div>
  )
}

export default Spotlights