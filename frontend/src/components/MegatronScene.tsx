import { Suspense, useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Environment, OrbitControls, Center, useAnimations } from '@react-three/drei';
import * as THREE from 'three';

function MegatronModel({ scale = 1, rotation = [0, 0, 0] }: { scale?: number, rotation?: [number, number, number] }) {
  const group = useRef<THREE.Group>(null);
  const { scene, animations } = useGLTF(`${import.meta.env.BASE_URL}models/balthazar_rigged__animated.glb`);
  const { actions, names } = useAnimations(animations, group);

  useEffect(() => {

    if (names.length > 0 && actions[names[0]]) {
      actions[names[0]]?.reset().fadeIn(0.5).play();
    }
  }, [names, actions]);

  useFrame((state) => {
    if (group.current && names.length === 0) {

      group.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1;
    }
  });

  return (
    <group ref={group} rotation={rotation}>
      <primitive object={scene} scale={scale} />
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
            { }
            <MegatronModel scale={1.5} rotation={[0, Math.PI / 6, 0]} />
          </Center>
        </Suspense>
        <OrbitControls enableZoom={false} />
      </Canvas>
    </div>
  );
}
