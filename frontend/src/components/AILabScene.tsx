import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import * as THREE from 'three';
import { Link } from 'react-router-dom';

function NeuralNodes() {
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  
  const { positions, colors, linePositions, lineColors } = useMemo(() => {
    const count = 600;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const points: THREE.Vector3[] = [];
    
    const color = new THREE.Color();
    for (let i = 0; i < count; i++) {
      const r = 3.5 * Math.cbrt(Math.random());
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(2 * Math.random() - 1);
      
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);
      
      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
      
      points.push(new THREE.Vector3(x, y, z));
      
      const mixedColor = Math.random() > 0.5 ? '#00f0ff' : '#7000ff';
      color.set(mixedColor);
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }
    
    const linePositionsList: number[] = [];
    const lineColorsList: number[] = [];
    
    for (let i = 0; i < points.length; i++) {
      for (let j = i + 1; j < points.length; j++) {
        const dist = points[i].distanceTo(points[j]);
        if (dist < 0.6) {
          linePositionsList.push(
            points[i].x, points[i].y, points[i].z,
            points[j].x, points[j].y, points[j].z
          );
          
          lineColorsList.push(
            0, 0.94, 1,
            0.44, 0, 1
          );
        }
      }
    }
    
    return { 
      positions, 
      colors, 
      linePositions: new Float32Array(linePositionsList),
      lineColors: new Float32Array(lineColorsList)
    };
  }, []);

  useFrame((state) => {
    if (pointsRef.current && linesRef.current) {
      const rotationSpeed = 0.05;
      pointsRef.current.rotation.y = state.clock.elapsedTime * rotationSpeed;
      pointsRef.current.rotation.x = state.clock.elapsedTime * rotationSpeed * 0.5;
      
      linesRef.current.rotation.y = state.clock.elapsedTime * rotationSpeed;
      linesRef.current.rotation.x = state.clock.elapsedTime * rotationSpeed * 0.5;
    }
  });

  return (
    <group>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={positions.length / 3}
            array={positions}
            itemSize={3}
            args={[positions, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            count={colors.length / 3}
            array={colors}
            itemSize={3}
            args={[colors, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.06}
          vertexColors
          transparent
          opacity={0.9}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
        />
      </points>
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={linePositions.length / 3}
            array={linePositions}
            itemSize={3}
            args={[linePositions, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            count={lineColors.length / 3}
            array={lineColors}
            itemSize={3}
            args={[lineColors, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial
          vertexColors
          transparent
          opacity={0.15}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>
    </group>
  );
}

export function AILabScene() {
  return (
    <>
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 0, background: '#050505' }}>
        <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
          <color attach="background" args={['#050505']} />
          <ambientLight intensity={0.5} />
          <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
          <NeuralNodes />
          <OrbitControls autoRotate autoRotateSpeed={0.5} enableZoom={true} enablePan={false} />
        </Canvas>
      </div>
      
      <div className="slide-up" style={{
        position: 'relative',
        zIndex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        textAlign: 'center',
        pointerEvents: 'none'
      }}>
        <h1 style={{ 
          fontSize: '4rem', 
          margin: 0, 
          marginBottom: '1rem',
          fontWeight: 800, 
          letterSpacing: '2px', 
          background: 'linear-gradient(to right, #00f0ff, #7000ff)', 
          WebkitBackgroundClip: 'text', 
          WebkitTextFillColor: 'transparent',
          filter: 'drop-shadow(0px 2px 10px rgba(0,240,255,0.3))'
        }}>
          Three.js AI Lab
        </h1>
        <p style={{ 
          fontSize: '1.2rem', 
          color: '#e0e0e0', 
          marginBottom: '3rem', 
          letterSpacing: '1px',
          maxWidth: '600px',
          background: 'rgba(0,0,0,0.4)',
          padding: '1rem 2rem',
          borderRadius: '12px',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,0.1)'
        }}>
          Immersive 3D Experience is currently under construction (Phase 2).
        </p>
        <div style={{ pointerEvents: 'auto' }}>
          <Link to="/portfolio" className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.1rem', boxShadow: '0 4px 15px rgba(0, 240, 255, 0.3)' }}>
            Return to Command Center
          </Link>
        </div>
      </div>
    </>
  );
}
