import { Suspense, useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Environment, OrbitControls, useAnimations, Center } from '@react-three/drei';
import * as THREE from 'three';

export interface SkillProject {
  name: string;
  how_used: string;
}

export interface Skill {
  skill: string;
  experience: string;
  used_in: SkillProject[];
}

function ShowcaseModel({ modelPath, scale = 1 }: { modelPath: string, scale?: number }) {
  const group = useRef<THREE.Group>(null);
  const { scene, animations } = useGLTF(modelPath);
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
      <primitive object={scene} scale={scale} />
    </group>
  );
}

export function SkillShowcaseScene({ 
  modelPath, 
  scale = 2.5, 
  positionY = 0,
  positionX = 0,
  rotation = [0, 0, 0]
}: { 
  modelPath: string, 
  scale?: number, 
  positionY?: number,
  positionX?: number,
  rotation?: [number, number, number]
}) {
  return (
    <div style={{ width: '100%', height: '100%', minHeight: '400px' }}>
      <Canvas camera={{ position: [0, 1, 60], fov: 15 }}>
        <ambientLight intensity={1.5} />
        <directionalLight position={[10, 10, 5]} intensity={2} castShadow />
        <directionalLight position={[-10, -10, -5]} intensity={1} color="#296ef9" />
        <directionalLight position={[0, 5, -10]} intensity={1} color="#ff0000" />
        
        <Suspense fallback={null}>
          <Environment preset="city" />
          <group position={[positionX, positionY, 0]} rotation={rotation}>
            <Center>
              <ShowcaseModel key={modelPath} modelPath={modelPath} scale={scale} />
            </Center>
          </group>
        </Suspense>
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.8} target={[positionX, positionY + 1, 0]} />
      </Canvas>
    </div>
  );
}
