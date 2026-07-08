import { Suspense, useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Environment, OrbitControls, Center, useAnimations } from '@react-three/drei';
import * as THREE from 'three';

function EnergyModel({ scale = 1, rotation = [0, 0, 0] }: { scale?: number, rotation?: [number, number, number] }) {
  const group = useRef<THREE.Group>(null);
  const { scene, animations } = useGLTF(`${import.meta.env.BASE_URL}models/energy.glb`);
  const { actions, names } = useAnimations(animations, group);

  useEffect(() => {
    
    if (names.length > 0 && actions[names[0]]) {
      const action = actions[names[0]];
      if (action) {
        action.reset().fadeIn(0.5).setEffectiveTimeScale(2.5).play();
      }
    }
  }, [names, actions]);

  useFrame((state) => {
    if (group.current) {
      if (names.length === 0) {
        
        group.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1;
      }
      group.current.rotation.y += 0.02; 
    }
  });

  return (
    <group ref={group} rotation={rotation}>
      <primitive object={scene} scale={scale} />
    </group>
  );
}

export function EnergyScene() {
  return (
    <div style={{ width: '100%', height: '100%', minHeight: '500px' }}>
      <Canvas camera={{ position: [0, 1, 6], fov: 45 }}>
        <ambientLight intensity={1.5} />
        <directionalLight position={[10, 10, 5]} intensity={2} />
        <directionalLight position={[-10, -10, -5]} intensity={1} color="#00ffcc" />
        
        <Suspense fallback={null}>
          <Environment preset="city" />
          <Center>
            <EnergyModel scale={2} rotation={[0, 0, 0]} />
          </Center>
        </Suspense>
        <OrbitControls enableZoom={false} autoRotate={false} />
      </Canvas>
    </div>
  );
}
