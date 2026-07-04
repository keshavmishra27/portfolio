import { Suspense, useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Environment, OrbitControls, Center, useAnimations } from '@react-three/drei';
import * as THREE from 'three';

function MegatronModel() {
  const group = useRef<THREE.Group>(null);
  const { scene, animations } = useGLTF('/models/megatron.glb');
  const { actions, names } = useAnimations(animations, group);

  useEffect(() => {
    // Play the first animation if it exists in the glb file
    if (names.length > 0 && actions[names[0]]) {
      actions[names[0]]?.reset().fadeIn(0.5).play();
    }
  }, [names, actions]);

  useFrame((state) => {
    if (group.current && names.length === 0) {
      // Fallback: if no built-in animations, add a subtle breathing/floating effect
      group.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1;
    }
  });

  return (
    <group ref={group}>
      <primitive object={scene} scale={2.5} />
    </group>
  );
}

export function MegatronScene() {
  return (
    <div style={{ width: '100%', height: '100%', minHeight: '500px' }}>
      <Canvas camera={{ position: [0, 1, 8], fov: 45 }}>
        <ambientLight intensity={1.5} />
        <directionalLight position={[10, 10, 5]} intensity={2} castShadow />
        <directionalLight position={[-10, -10, -5]} intensity={1} color="#296ef9" />
        <directionalLight position={[0, 5, -10]} intensity={1} color="#ff0000" />
        
        <Suspense fallback={null}>
          <Environment preset="city" />
          <Center>
            <MegatronModel />
          </Center>
        </Suspense>
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={2} />
      </Canvas>
    </div>
  );
}
