import { Suspense, useState, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Environment, Html, OrbitControls, Center, Loader } from '@react-three/drei';
import { useNavigate } from 'react-router-dom';
import * as THREE from 'three';
import type { Project } from '../api';

export const FALLBACK_POSITIONS: [number, number, number][] = [
  [-1.5, 1, 0],
  [0, 1.5, -0.5],
  [1.5, 0.8, 0],
  [-2, 0.5, 1.5],
  [2, 0.5, 1],
  [0, 0, 1.5],
  [-1, 2, -1],
  [1, 2, -1],
  [-3, 1, 0],
  [3, 1, 0],
];

function Model() {
  const { scene } = useGLTF('/models/kronenbourg.glb');
  return <primitive object={scene} />;
}

export function Annotation({ project, position, index }: { project: Project; position: [number, number, number], index: number }) {
  const [hovered, setHovered] = useState(false);
  const navigate = useNavigate();

  return (
    <Html position={position} center zIndexRange={[100, 0]}>
      <div
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
        onClick={() => navigate(`/projects/${project.id}`)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          cursor: 'pointer',
          background: hovered ? 'var(--bg-secondary)' : 'rgba(26, 27, 38, 0.8)',
          border: '1px solid var(--border-color)',
          borderRadius: '24px',
          padding: hovered ? '8px 16px' : '8px',
          transition: 'all 0.3s ease',
          boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
          backdropFilter: 'blur(4px)'
        }}
      >
        <div style={{
          width: '24px',
          height: '24px',
          borderRadius: '50%',
          background: 'var(--text-primary)',
          color: 'var(--bg-primary)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 'bold',
          fontSize: '12px'
        }}>
          {index + 1}
        </div>
        {hovered && (
          <span style={{ color: 'var(--text-primary)', whiteSpace: 'nowrap', fontWeight: '500', pointerEvents: 'none' }}>
            {project.name}
          </span>
        )}
      </div>
    </Html>
  );
}

const FEATURES = [
  { name: 'Projects', path: '/projects', external: false },
  { name: 'Resume', path: '/resume.pdf', external: true },
  { name: 'Architecture', path: '/architecture', external: false },
  { name: 'Portal', path: '/', external: false }
];

function FeatureAnnotation({ feature, position }: { feature: { name: string, path: string, external: boolean }, position: [number, number, number] }) {
  const navigate = useNavigate();
  return (
    <Html position={position} center zIndexRange={[100, 0]}>
      <div
        onClick={() => {
          if (feature.external) window.open(feature.path, '_blank');
          else navigate(feature.path);
        }}
        className="btn btn-outline"
        style={{
          background: 'rgba(26, 27, 38, 0.8)',
          cursor: 'pointer',
          whiteSpace: 'nowrap',
          boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
          backdropFilter: 'blur(4px)'
        }}
      >
        {feature.name}
      </div>
    </Html>
  );
}

function SceneContainer() {
  const groupRef = useRef<THREE.Group>(null);
  const annotationsRef = useRef<THREE.Group>(null);

  useFrame(() => {
    // Calculate scroll progress (0 to 1 based on 100vh of scrollable space)
    const scrollY = window.scrollY;
    // Assume about 1 window height of scroll available, clamp between 0 and 1
    const progress = Math.min(Math.max(scrollY / window.innerHeight, 0), 1);

    if (groupRef.current) {
      // Scale from 1x to 2.5x max
      const scale = 1 + (progress * 1.5);
      groupRef.current.scale.lerp(new THREE.Vector3(scale, scale, scale), 0.1);
      groupRef.current.position.lerp(new THREE.Vector3(0, -progress * 1.2, 0), 0.1);
    }
    
    if (annotationsRef.current) {
      // Buttons start at scale 2 (spread out) and move to 1 (near)
      const buttonSpread = 2 - progress;
      annotationsRef.current.scale.lerp(new THREE.Vector3(buttonSpread, buttonSpread, buttonSpread), 0.1);
    }
  });

  return (
    <group>
      <group ref={groupRef}>
        <Model />
      </group>
      <group ref={annotationsRef}>
        {FEATURES.map((feature, index) => {
          const pos = FALLBACK_POSITIONS[index % FALLBACK_POSITIONS.length];
          return (
            <FeatureAnnotation 
              key={feature.name} 
              feature={feature} 
              position={pos} 
            />
          );
        })}
      </group>
    </group>
  );
}

export function PortfolioScene() {
  return (
    <>
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 0 }}>
        <Canvas shadows camera={{ position: [0, 2, 8], fov: 50 }}>
          <ambientLight intensity={1.5} />
          <directionalLight position={[10, 20, 10]} intensity={2} castShadow />
          
          <Suspense fallback={null}>
            <Environment preset="city" />
            <Center>
              <SceneContainer />
            </Center>
          </Suspense>
          
          <OrbitControls 
            enableZoom={false}
            enablePan={false}
            minPolarAngle={Math.PI / 4}
            maxPolarAngle={Math.PI / 2 + 0.1}
          />
        </Canvas>
      </div>
      <Loader />
    </>
  );
}
