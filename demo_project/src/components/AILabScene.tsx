import { Link } from 'react-router-dom';



export function AILabScene() {
  return (
    <>
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 0, background: '#050505' }}>
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
