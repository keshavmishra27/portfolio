
import { Link } from 'react-router-dom';
import { Terminal } from 'lucide-react';
import { PortfolioScene } from '../components/PortfolioScene';
import { motion } from 'framer-motion';

export const CommandCenter = () => {
  return (
    <div style={{ position: 'relative', width: '100%', minHeight: '200vh' }}>
      {/* 3D Scene */}
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 0 }}>
        <PortfolioScene />
      </div>

      {/* Overlay UI */}
      <div style={{ 
        position: 'absolute', 
        top: 0, left: 0, right: 0, 
        padding: '2rem', 
        pointerEvents: 'none',
        display: 'flex',
        justifyContent: 'space-between',
        zIndex: 10
      }}>
        <header style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'flex-start' }}>
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '1rem', pointerEvents: 'auto' }}
          >
            <h1 className="display-sm" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', margin: 0, background: 'var(--bg-glass)', padding: '0.5rem 1rem', borderRadius: '8px', backdropFilter: 'blur(8px)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }}>
              <Terminal /> 3D Portfolio
            </h1>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ pointerEvents: 'auto' }}
          >
            <Link to="/" className="btn btn-primary" style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.3)' }}>Back to Portal</Link>
          </motion.div>
        </header>
      </div>

      <div style={{
        position: 'absolute',
        bottom: '2rem',
        left: '50%',
        transform: 'translateX(-50%)',
        pointerEvents: 'none',
        background: 'var(--bg-glass)',
        backdropFilter: 'blur(8px)',
        padding: '0.5rem 1.5rem',
        borderRadius: '24px',
        border: '1px solid var(--border-color)',
        zIndex: 10
      }}>
        <span style={{ color: 'var(--text-secondary)' }}>Drag to rotate • Scroll to zoom • Hover numbers to view projects</span>
      </div>
    </div>
  );
};
