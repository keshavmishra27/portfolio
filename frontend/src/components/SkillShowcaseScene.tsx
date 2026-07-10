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
    <group ref={group}>
      <primitive object={scene} scale={scale} />
    </group>
  );
}

function AnimatedSceneContent({
  modelPath,
  scale,
  positionX,
  positionY,
  rotation
}: {
  modelPath: string;
  scale: number;
  positionX: number;
  positionY: number;
  rotation: [number, number, number];
}) {
  const group = useRef<THREE.Group>(null);
  const controlsTarget = useRef(new THREE.Vector3(positionX, positionY + 1, 0));

  useFrame((state, delta) => {
    if (group.current) {
      group.current.position.x = THREE.MathUtils.lerp(group.current.position.x, positionX, 4 * delta);
      group.current.position.y = THREE.MathUtils.lerp(group.current.position.y, positionY, 4 * delta);
      
      const currentRotation = new THREE.Vector3(group.current.rotation.x, group.current.rotation.y, group.current.rotation.z);
      const targetRotation = new THREE.Vector3(...rotation);
      currentRotation.lerp(targetRotation, 4 * delta);
      group.current.rotation.set(currentRotation.x, currentRotation.y, currentRotation.z);
    }

    const targetVector = new THREE.Vector3(positionX, positionY + 1, 0);
    controlsTarget.current.lerp(targetVector, 4 * delta);
  });

  return (
    <>
      <group ref={group}>
        <Center>
          <ShowcaseModel key={modelPath} modelPath={modelPath} scale={scale} />
        </Center>
      </group>
      <OrbitControls 
        enableZoom={false} 
        autoRotate 
        autoRotateSpeed={0.8} 
        target={controlsTarget.current} 
      />
    </>
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
          <AnimatedSceneContent 
            modelPath={modelPath}
            scale={scale}
            positionX={positionX}
            positionY={positionY}
            rotation={rotation}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
