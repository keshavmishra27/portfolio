import { useState } from 'react';

export function AudioPlayer() {
  const [isOpen, setIsOpen] = useState(false);

  
  
  const YOUTUBE_VIDEO_ID = "6HJjhZ-jloI"; 

  return (
    <div style={{
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      zIndex: 9999,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-end',
      gap: '10px'
    }}>
      {}
      <div style={{
          background: 'var(--bg-glass)',
          backdropFilter: 'blur(10px)',
          borderRadius: '12px',
          padding: '8px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
          border: '1px solid var(--border-color)',
          display: isOpen ? 'block' : 'none',
          animation: 'slideUp 0.3s ease-out'
        }}>
          <iframe 
            width="300" 
            height="200" 
            src={`https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?autoplay=1&loop=1&playlist=${YOUTUBE_VIDEO_ID}`} 
            title="YouTube music player" 
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            style={{ borderRadius: '8px' }}
            allowFullScreen>
          </iframe>
      </div>
      
      <button 
        onClick={() => setIsOpen(!isOpen)}
        style={{
          background: 'var(--bg-glass)',
          border: '1px solid var(--border-color)',
          borderRadius: '50%',
          width: '50px',
          height: '50px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
          backdropFilter: 'blur(10px)',
          color: 'var(--text-primary)',
          fontSize: '24px',
          transition: 'all 0.2s ease'
        }}
        title="Toggle Music Player"
        onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
        onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
      >
        🎵
      </button>
    </div>
  );
}
