import { useState, useEffect, Suspense, useRef } from 'react';
import { Joyride, STATUS } from 'react-joyride';
import type { Step } from 'react-joyride';
import { useLocation } from 'react-router-dom';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Center, Bounds, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';



function AnimatedAvatarModel() {
  const { scene } = useGLTF(`${import.meta.env.BASE_URL}models/man_in_suit.glb`);
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      const time = state.clock.getElapsedTime();
      
      
      groupRef.current.position.y = Math.sin(time * 2) * 0.05;

      
      const isSpeaking = 'speechSynthesis' in window && window.speechSynthesis.speaking;
      
      if (isSpeaking) {
        
        groupRef.current.rotation.y = Math.sin(time * 8) * 0.15;
        groupRef.current.rotation.z = Math.sin(time * 12) * 0.05;
      } else {
        
        groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, 0, 0.1);
        groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, 0, 0.1);
      }
    }
  });

  return (
    <group ref={groupRef as any}>
      <primitive object={scene} />
    </group>
  );
}


useGLTF.preload(`${import.meta.env.BASE_URL}models/man_in_suit.glb`);

const TooltipContent = ({ title, text }: { title?: string, text: string }) => {
  useEffect(() => {
    const textToSpeak = `${title ? title + '. ' : ''}${text}`;
    
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      
      const timer = setTimeout(() => {
        const utterance = new SpeechSynthesisUtterance(textToSpeak);
        window.speechSynthesis.speak(utterance);
      }, 50);
      return () => {
        clearTimeout(timer);
        window.speechSynthesis.cancel();
      };
    }
  }, [title, text]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <span style={{ fontSize: '15px', lineHeight: '1.4' }}>{text}</span>
      <button 
        onClick={() => {
          if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
            const textToSpeak = `${title ? title + '. ' : ''}${text}`;
            const utterance = new SpeechSynthesisUtterance(textToSpeak);
            window.speechSynthesis.speak(utterance);
          }
        }}
        style={{
          background: 'rgba(0, 255, 245, 0.1)',
          border: '1px solid rgba(0, 255, 245, 0.4)',
          color: '#00fff5',
          padding: '4px 10px',
          borderRadius: '12px',
          cursor: 'pointer',
          alignSelf: 'flex-start',
          fontSize: '12px',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          transition: 'all 0.2s ease'
        }}
        onMouseOver={(e) => e.currentTarget.style.background = 'rgba(0, 255, 245, 0.2)'}
        onMouseOut={(e) => e.currentTarget.style.background = 'rgba(0, 255, 245, 0.1)'}
      >
        <span>🔊</span> Repeat Audio
      </button>
    </div>
  );
};

function VirtualAssistant({ isVisible }: { isVisible: boolean }) {
  if (!isVisible) return null;
  const isMobile = window.innerWidth <= 768;
  return (
    <div style={{
      position: 'fixed',
      bottom: isMobile ? '10px' : '30px',
      right: isMobile ? '10px' : '30px',
      width: isMobile ? '150px' : '350px',
      height: isMobile ? '200px' : '450px',
      zIndex: 9999,
      pointerEvents: 'auto' 
    }}>
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }} style={{ width: '100%', height: '100%' }}>
        <ambientLight intensity={2.0} />
        <directionalLight position={[2, 5, 5]} intensity={2.5} />
        <directionalLight position={[-2, 2, 2]} intensity={1.0} />
        <Suspense fallback={null}>
          <Bounds fit clip observe margin={1.2}>
            <Center>
              <AnimatedAvatarModel />
            </Center>
          </Bounds>
          <OrbitControls enableZoom={true} enablePan={true} enableRotate={true} />
        </Suspense>
      </Canvas>
    </div>
  );
}

export function TourGuide() {
  const [run, setRun] = useState(false);
  const [steps, setSteps] = useState<Step[]>([]);
  const location = useLocation();
  const [tourKey, setTourKey] = useState(0);

  useEffect(() => {
    let newSteps: Step[] = [];
    const path = location.pathname;

    if (path === '/') {
      newSteps = [
        {
          target: 'body',
          placement: 'center' as const,
          title: 'Welcome!',
          content: <TooltipContent title="Welcome!" text="Welcome to Keshav Mishra's interactive portfolio." />},
        {
          target: 'body',
          placement: 'center' as const,
          title: 'About Me',
          content: <TooltipContent title="About Me" text="Scroll down to learn about my background in AI and scalable web systems." />},
        {
          target: 'body',
          placement: 'center' as const,
          title: 'Navigation',
          content: <TooltipContent title="Navigation" text="Use the command terminal at the bottom to navigate. Try typing 'cd projects' or 'cd skillset'!" />}
      ];
    } else if (path === '/portfolio') {
      newSteps = [
        {
          target: 'body',
          placement: 'center' as const,
          title: 'Command Center',
          content: <TooltipContent title="Command Center" text="This is the main hub where you can access all features of my portfolio." />},
        {
          target: 'body',
          placement: 'center' as const,
          title: 'Explore',
          content: <TooltipContent title="Explore" text="Click on any card to dive deeper into projects, skills, or architecture." />}
      ];
    } else if (path === '/projects') {
      newSteps = [
        {
          target: 'body',
          placement: 'center' as const,
          title: 'Project Showcase',
          content: <TooltipContent title="Project Showcase" text="Welcome to my projects! Here you can find all my major AI and Full-Stack developments." />},
        {
          target: 'body',
          placement: 'center' as const,
          title: 'Projects Grid',
          content: <TooltipContent title="Projects Grid" text="Click on any project card to read an in-depth technical breakdown." />}
      ];
    } else if (path === '/skillset') {
      newSteps = [
        {
          target: 'body',
          placement: 'center' as const,
          title: 'Technical Expertise',
          content: <TooltipContent title="Technical Expertise" text="Welcome to my skillset page! This is a complete breakdown of my technical abilities." />},
        {
          target: 'body',
          placement: 'center' as const,
          title: 'Skillset',
          content: <TooltipContent title="Skillset" text="My skills are organized by domain. Scroll down to see how I've applied them in real projects!" />}
      ];
    }

    setSteps(newSteps);
    setRun(false);
    
    const hasSeenTour = localStorage.getItem(`hasSeenTour_${path}`);
    if (!hasSeenTour && newSteps.length > 0) {
      setTourKey(prev => prev + 1);
      setTimeout(() => setRun(true), 600);
    }
  }, [location.pathname]);

  useEffect(() => {
    const handleStartTour = () => {
      if (steps.length > 0) {
        setRun(false);
        setTourKey(prev => prev + 1);
        setTimeout(() => setRun(true), 100);
      }
    };
    window.addEventListener('start-tour', handleStartTour);
    return () => window.removeEventListener('start-tour', handleStartTour);
  }, [steps]);

  const handleJoyrideCallback = (data: any) => {
    const { status } = data;
    const finishedStatuses: string[] = [STATUS.FINISHED, STATUS.SKIPPED];

    if (finishedStatuses.includes(status)) {
      setRun(false);
      localStorage.setItem(`hasSeenTour_${location.pathname}`, 'true');
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    }
  };

  if (steps.length === 0) return null;

  return (
    <>
      <VirtualAssistant isVisible={run && steps.length > 0} />
      <Joyride
        key={`${location.pathname}-${tourKey}`}
        steps={steps}
        run={run}
        continuous={true}
        onEvent={handleJoyrideCallback}
        styles={{
          options: {
            primaryColor: '#00fff5',
            backgroundColor: '#ffffff',
            textColor: '#1a1a2e',
            zIndex: 10000,
          },
          tooltipContainer: {
            textAlign: 'left',
          },
          buttonNext: {
            backgroundColor: '#0f0f1a',
            color: '#00fff5',
            borderRadius: '4px',
            padding: '8px 16px',
          },
          buttonBack: {
            color: '#00fff5',
            marginRight: '8px',
          },
        } as any}
      />
    </>
  );
}
