import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Cone } from '@react-three/drei';

function Prism() {
  const meshRef = useRef();

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.2;
      meshRef.current.rotation.x += delta * 0.1;
    }
  });

  return (
    <Cone args={[1.4, 2.2, 6]} ref={meshRef}>
      <MeshDistortMaterial
        color="#00ffdd"
        distort={0.45}
        speed={2}
        roughness={0}
        metalness={0.2}
      />
    </Cone>
  );
}

export default Prism;


