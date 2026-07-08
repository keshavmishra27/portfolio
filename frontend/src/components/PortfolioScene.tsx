import { Suspense, useState, useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Environment, Html, OrbitControls, Center, Loader, useAnimations } from '@react-three/drei';
import { useNavigate } from 'react-router-dom';
import * as THREE from 'three';
import type { Project } from '../api';

function useTheme() {
  const [theme, setTheme] = useState(document.documentElement.getAttribute('data-theme') || 'dark');

  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'data-theme') {
          setTheme(document.documentElement.getAttribute('data-theme') || 'dark');
        }
      });
    });

    observer.observe(document.documentElement, { attributes: true });
    return () => observer.disconnect();
  }, []);

  return theme;
}

export const FALLBACK_POSITIONS: [number, number, number][] = [
  [-2.2, 0.7, 0],   
  [0, 1.6, -1],   
  [2.2, 0.7, 0],    
  [0, 0.2, 1.5],  
  [2, 0.5, 1],
  [0, 0, 1.5],
  [-1, 2, -1],
  [1, 2, -1],
  [-3, 1, 0],
  [3, 1, 0],
];

function Model() {
  const group = useRef<THREE.Group>(null);
  const { scene, animations } = useGLTF('/models/sci-fi_computer_room.glb');
  const { actions, names } = useAnimations(animations, group);

  useEffect(() => {
    names.forEach(name => {
      actions[name]?.reset().fadeIn(0.5).play();
    });
  }, [names, actions]);

  return (
    <group ref={group}>
      <primitive object={scene} scale={25} position={[0, -1.5, 0]} />
    </group>
  );
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
  { name: 'Skillset', path: '/skillset', external: false },
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
    const scrollY = window.scrollY;
    const progress = Math.min(Math.max(scrollY / window.innerHeight, 0), 1);

    if (groupRef.current && annotationsRef.current) {
      
      const scale = 1 + (progress * 0.35);
      const vecScale = new THREE.Vector3(scale, scale, scale);

      
      const vecPos = new THREE.Vector3(0, -progress * 0.5, 0);

      groupRef.current.scale.lerp(vecScale, 0.1);
      groupRef.current.position.lerp(vecPos, 0.1);

      
      annotationsRef.current.scale.lerp(vecScale, 0.1);
      annotationsRef.current.position.lerp(vecPos, 0.1);
    }
  });

  return (
    <group>
      <group ref={groupRef}>
        {}
        <Center>
          <Model />
        </Center>
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
  const theme = useTheme();
  const isLight = theme === 'light';

  return (
    <>
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 0, background: 'var(--bg-primary)', transition: 'background 0.3s ease' }}>
        <Canvas shadows camera={{ position: [0, 1.2, 4], fov: 55 }}>
          <color attach="background" args={[isLight ? '#f8f9fa' : '#020205']} />
          <ambientLight intensity={isLight ? 0.8 : 0.15} />
          <directionalLight position={[0, 5, 5]} intensity={isLight ? 1.5 : 0.6} color={isLight ? "#ffffff" : "#4b83f5"} />
          <directionalLight position={[-5, 5, -5]} intensity={isLight ? 1.0 : 0.3} color={isLight ? "#ffffff" : "#8b5cf6"} />

          <Suspense fallback={null}>
            <Environment preset={isLight ? "city" : "night"} />
            {}
            <SceneContainer />
          </Suspense>

          <OrbitControls
            enableZoom={false}
            enablePan={false}
            minPolarAngle={0}
            maxPolarAngle={Math.PI / 2 + 0.1}
          />
        </Canvas>
      </div>
      <Loader />
    </>
  );
}
