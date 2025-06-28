import { useFrame } from '@react-three/fiber';
import { easing } from 'maath';
import React, { ReactNode, useRef } from 'react'
import * as THREE from 'three';

const ToogleCamera = ({ children, isMobile }: { children: ReactNode, isMobile: boolean }) => {
  const groupRef = useRef<THREE.Group>(null);
  const targetLookAt = useRef(new THREE.Vector3());
  const dampedLookAt = useRef(new THREE.Vector3()); // the actual eased version

  useFrame((state, delta) => {
    const { camera, pointer } = state;

    // Always damp the camera position
    easing.damp3(camera.position, [-4.8, -0.9, 8.7], 0.25, delta);

    if (!isMobile) {
       const targetX = pointer.x * 0.3; // Increase for more left-right effect
        const fixedY = 2.8; // Adjust to match the model's vertical center
        const fixedZ = 0;

      // Set desired lookAt position
      targetLookAt.current.set(targetX, fixedY, fixedZ);

      // Smooth the actual lookAt
      easing.damp3(dampedLookAt.current, targetLookAt.current, 0.15, delta);

      camera.lookAt(dampedLookAt.current);
    }
  });

  return (
    <group ref={groupRef}>
      {children}
    </group>
  )
}

export default ToogleCamera;
