import { useProgress, Html } from '@react-three/drei';
import { useState, useEffect } from 'react';

export function ScenePlaceholder({ imageUrl }: { imageUrl: string }) {
  const { progress } = useProgress();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (progress === 100) {
      const timer = setTimeout(() => setLoaded(true), 800);
      return () => clearTimeout(timer);
    }
  }, [progress]);

  if (loaded) return null;

  return (
    <Html fullscreen zIndexRange={[100, 0]} style={{ pointerEvents: 'none' }}>
      <div className={`scene-placeholder-container ${progress === 100 ? 'fade-out' : ''}`}>
        <div 
          className="scene-placeholder-image"
          style={{ backgroundImage: `url(${imageUrl})` }}
        />
        <div className="scene-placeholder-content">
          <div className="loader-spinner"></div>
          <p style={{ marginTop: '1rem', color: '#fff', fontSize: '0.9rem', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
            Initializing Environment ({Math.round(progress)}%)
          </p>
        </div>
      </div>
    </Html>
  );
}
