import { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Environment, Loader, PerspectiveCamera, Center, Text } from '@react-three/drei';
import * as THREE from 'three';

function Model() {
  const { scene } = useGLTF('/models/showroom.glb');
  return (
    <group>
      <primitive object={scene} />
    </group>
  );
}

function CameraRig() {
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);

  useFrame((_, delta) => {
    if (cameraRef.current) {
      const scrollY = window.scrollY;
      const progress = Math.min(Math.max(scrollY / window.innerHeight, 0), 1);
      
      // Reduce the travel distance to prevent clipping out of the room
      // Start at 4, move slightly in to 2.5
      const targetZ = 4 - progress * 1.5; 
      const targetY = 0.5;
      const targetRotationY = progress * Math.PI * 0.1;

      cameraRef.current.position.z = THREE.MathUtils.damp(cameraRef.current.position.z, targetZ, 4, delta);
      cameraRef.current.position.y = THREE.MathUtils.damp(cameraRef.current.position.y, targetY, 4, delta);
      cameraRef.current.rotation.y = THREE.MathUtils.damp(cameraRef.current.rotation.y, targetRotationY, 4, delta);
    }
  });

  return (
    <PerspectiveCamera ref={cameraRef} makeDefault position={[0, 0.5, 4]} fov={60} />
  );
}

export function ShowroomScene({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: -1 }}>
        <Canvas shadows>
          <ambientLight intensity={1.5} />
          <directionalLight position={[10, 20, 10]} intensity={2} castShadow />
          <Suspense fallback={null}>
            <Environment preset="city" />
            <CameraRig />
            <Center>
              <Model />
            </Center>
          </Suspense>
        </Canvas>
      </div>
      
      {/* Scrollable Overlay */}
      <div style={{ position: 'relative', width: '100%', minHeight: '200vh', zIndex: 1 }}>
        {children}
      </div>
      
      <Loader />
    </>
  );
}

