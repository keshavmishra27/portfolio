import { Suspense, useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, useAnimations, Environment, Loader, PerspectiveCamera, Center } from '@react-three/drei';
import * as THREE from 'three';

function Model() {
  const group = useRef<THREE.Group>(null);
  const { scene, animations } = useGLTF(`${import.meta.env.BASE_URL}models/the_steampunk_vault.glb`);
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    
    const actionNames = Object.keys(actions);
    if (actionNames.length > 0) {
      const action = actions[actionNames[0]];
      if (action) {
        action.reset().play();
        action.paused = true;
      }
    }
  }, [actions]);

  useFrame((_, delta) => {
    const actionNames = Object.keys(actions);
    if (actionNames.length > 0) {
      const action = actions[actionNames[0]];
      if (action) {
        
        const scrollY = window.scrollY;
        const progress = Math.min(Math.max(scrollY / window.innerHeight, 0), 1);
        
        
        const duration = action.getClip().duration;
        const targetTime = progress * duration;
        
        
        action.time = THREE.MathUtils.damp(action.time, targetTime, 1.5, delta);
      }
    }
  });

  return (
    <group ref={group}>
      <primitive object={scene} scale={15} position={[0, -1, 0]} rotation={[0, -Math.PI / 2, 0]} />
    </group>
  );
}

function CameraRig() {
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);

  useFrame((_, delta) => {
    if (cameraRef.current) {
      const scrollY = window.scrollY;
      const progress = Math.min(Math.max(scrollY / window.innerHeight, 0), 1);
      
      
      
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
          <ambientLight intensity={0.4} />
          <directionalLight position={[10, 20, 10]} intensity={1.5} castShadow />
          <Suspense fallback={null}>
            <Environment preset="night" />
            <CameraRig />
            <Center>
              <Model />
            </Center>
          </Suspense>
        </Canvas>
      </div>
      
      {}
      <div style={{ position: 'relative', width: '100%', minHeight: '200vh', zIndex: 1 }}>
        {children}
      </div>
      
      <Loader />
    </>
  );
}

