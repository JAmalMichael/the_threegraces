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
    easing.damp3(camera.position, [1.9,11.7,2.7], 0.25, delta);

    if (!isMobile) {
      const targetX = pointer.x * 0.5;
      const targetY = pointer.y * 0.3;

      // Set desired lookAt position
      targetLookAt.current.set(targetX, targetY, 0);

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
