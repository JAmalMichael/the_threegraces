'use client'

import * as THREE from 'three'
import React, { JSX } from 'react'
import { useGLTF } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    Object_2: THREE.Mesh
    Object_3: THREE.Mesh
    Object_4: THREE.Mesh
    Object_5: THREE.Mesh
    Object_6: THREE.Mesh
    Object_7: THREE.Mesh
    Object_8: THREE.Mesh
    Object_9: THREE.Mesh
    Object_10: THREE.Mesh
  }
  materials: {
    ['Scene_-_Root']: THREE.MeshStandardMaterial
  }
}

const ThreeGraces = (props: JSX.IntrinsicElements['group']) => {
  const { nodes, materials } = useGLTF('/models/3dThreeGraces.glb') as unknown as GLTFResult;
  return (
    <group {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]} >
        <mesh geometry={nodes.Object_2.geometry} material={materials['Scene_-_Root']} castShadow receiveShadow />
        <mesh geometry={nodes.Object_3.geometry} material={materials['Scene_-_Root']} castShadow receiveShadow/>
        <mesh geometry={nodes.Object_4.geometry} material={materials['Scene_-_Root']} castShadow receiveShadow/>
        <mesh geometry={nodes.Object_5.geometry} material={materials['Scene_-_Root']} castShadow receiveShadow/>
        <mesh geometry={nodes.Object_6.geometry} material={materials['Scene_-_Root']} castShadow receiveShadow/>
        <mesh geometry={nodes.Object_7.geometry} material={materials['Scene_-_Root']} castShadow receiveShadow/>
        <mesh geometry={nodes.Object_8.geometry} material={materials['Scene_-_Root']} castShadow receiveShadow/>
        <mesh geometry={nodes.Object_9.geometry} material={materials['Scene_-_Root']} castShadow receiveShadow/>
        <mesh geometry={nodes.Object_10.geometry} material={materials['Scene_-_Root']} castShadow receiveShadow/>
      </group>
    </group>
  )
}

useGLTF.preload('/models/3dThreeGraces.glb');

export default ThreeGraces;
