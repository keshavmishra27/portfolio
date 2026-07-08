import { useState, useEffect, useRef } from 'react';

export function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const playerRef = useRef<any>(null);

  const YOUTUBE_VIDEO_ID = "6HJjhZ-jloI"; 

  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let isMounted = true;

    const initPlayer = () => {
      if (!isMounted || !wrapperRef.current) return;
      
      // Create a fresh div for YouTube to replace
      const playerDiv = document.createElement('div');
      wrapperRef.current.appendChild(playerDiv);
      
      playerRef.current = new (window as any).YT.Player(playerDiv, {
        height: '0',
        width: '0',
        videoId: YOUTUBE_VIDEO_ID,
        playerVars: {
          autoplay: 1,
          loop: 1,
          playlist: YOUTUBE_VIDEO_ID,
          controls: 0,
          showinfo: 0,
          modestbranding: 1
        },
        events: {
          onReady: (event: any) => {
            if (isMounted) event.target.playVideo();
          },
          onStateChange: (event: any) => {
            if (!isMounted) return;
            if (event.data === (window as any).YT.PlayerState.PLAYING) {
              setIsPlaying(true);
            } else {
              setIsPlaying(false);
            }
          }
        }
      });
    };

    if (!(window as any).YT || !(window as any).YT.Player) {
      const tag = document.createElement('script');
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName('script')[0];
      if (firstScriptTag && firstScriptTag.parentNode) {
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      } else {
        document.head.appendChild(tag);
      }
      (window as any).onYouTubeIframeAPIReady = initPlayer;
    } else {
      // Delay slightly to ensure DOM is ready if it's a fast remount
      setTimeout(initPlayer, 0);
    }

    const handleInteraction = () => {
      if (playerRef.current && typeof playerRef.current.playVideo === 'function' && !isPlaying) {
        playerRef.current.playVideo();
      }
      document.removeEventListener('click', handleInteraction);
      document.removeEventListener('keydown', handleInteraction);
    };

    document.addEventListener('click', handleInteraction);
    document.addEventListener('keydown', handleInteraction);

    return () => {
      isMounted = false;
      document.removeEventListener('click', handleInteraction);
      document.removeEventListener('keydown', handleInteraction);
      
      if (playerRef.current && typeof playerRef.current.destroy === 'function') {
        playerRef.current.destroy();
      }
      if (wrapperRef.current) {
        wrapperRef.current.innerHTML = '';
      }
    };
  }, []);

  const togglePlay = () => {
    if (playerRef.current && typeof playerRef.current.getPlayerState === 'function') {
      const state = playerRef.current.getPlayerState();
      if (state === 1 || isPlaying) { // PLAYING
        playerRef.current.pauseVideo();
        setIsPlaying(false);
      } else {
        playerRef.current.playVideo();
        setIsPlaying(true);
      }
    }
  };

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
      {/* Invisible YouTube Player Wrapper */}
      <div ref={wrapperRef} style={{ position: 'absolute', width: '0px', height: '0px', opacity: 0, pointerEvents: 'none' }}></div>
      
      <button 
        onClick={togglePlay}
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
          transition: 'all 0.2s ease',
          opacity: isPlaying ? 1 : 0.6
        }}
        title={isPlaying ? "Pause Music" : "Play Music"}
        onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
        onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
      >
        {isPlaying ? '🔊' : '🔇'}
      </button>
    </div>
  );
}
