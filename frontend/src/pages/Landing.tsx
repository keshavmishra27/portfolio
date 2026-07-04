import { useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Terminal, Box } from 'lucide-react';
import { ShowroomScene } from '../components/ShowroomScene';
import { MegatronScene } from '../components/MegatronScene';
import '../index.css';

export const Landing = () => {
  const navigate = useNavigate();
  const { scrollYProgress } = useScroll();

  // Title fades out completely in the first 30% of scroll
  const titleOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const titleY = useTransform(scrollYProgress, [0, 0.3], [0, -50]);
  
  // Buttons fade in starting at 60% of scroll (once fully inside showroom)
  const buttonsOpacity = useTransform(scrollYProgress, [0.6, 1], [0, 1]);
  const buttonsY = useTransform(scrollYProgress, [0.6, 1], [50, 0]);
  
  // Disable button clicks when invisible
  const buttonPointerEvents = useTransform(scrollYProgress, v => v > 0.5 ? 'auto' : 'none');
  const scrollIndicatorOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  return (
    <>
    <ShowroomScene>
      <div style={{ 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        width: '100vw', 
        height: '100vh', 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center', 
        pointerEvents: 'none',
        zIndex: 10
      }}>
        
        <motion.div
          style={{ opacity: titleOpacity, y: titleY, position: 'absolute', textAlign: 'center', maxWidth: '600px', padding: '2rem' }}
        >
          <h1 className="display-xl" style={{ marginBottom: '1rem', background: 'linear-gradient(90deg, var(--text-primary), var(--text-secondary))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Keshav AI Lab
          </h1>
          <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)' }}>
            Engineering scalable AI systems & Web applications.
          </p>
        </motion.div>

        <motion.div 
          style={{ 
            opacity: buttonsOpacity, 
            y: buttonsY,
            display: 'flex', 
            gap: '2rem', 
            justifyContent: 'center', 
            flexWrap: 'wrap', 
            position: 'absolute',
            pointerEvents: buttonPointerEvents as any
          }}
        >
          <motion.div
            onClick={() => navigate('/lab')}
            whileHover={{ scale: 1.05, borderColor: 'var(--text-primary)' }}
            whileTap={{ scale: 0.95 }}
            style={{
              border: '1px solid var(--border-color)',
              padding: '2rem',
              borderRadius: '12px',
              background: 'var(--bg-glass)',
              backdropFilter: 'blur(10px)',
              width: '250px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '1rem',
              cursor: 'pointer'
            }}
          >
            <Box size={48} color="var(--text-primary)" />
            <h2 className="display-md" style={{ margin: 0, color: 'var(--text-primary)' }}>Explore AI Lab</h2>
            <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.9rem', textAlign: 'center' }}>Interactive 3D experience</p>
          </motion.div>

          <motion.div
            onClick={() => navigate('/portfolio')}
            whileHover={{ scale: 1.05, borderColor: 'var(--text-primary)' }}
            whileTap={{ scale: 0.95 }}
            style={{
              border: '1px solid var(--text-primary)',
              padding: '2rem',
              borderRadius: '12px',
              background: 'var(--bg-glass)',
              backdropFilter: 'blur(10px)',
              width: '250px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '1rem',
              cursor: 'pointer'
            }}
          >
            <Terminal size={48} color="var(--text-primary)" />
            <h2 className="display-md" style={{ margin: 0, color: 'var(--text-primary)' }}>View Portfolio</h2>
            <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.9rem', textAlign: 'center' }}>Fast, clean Command Center</p>
          </motion.div>
        </motion.div>
      </div>

      <div style={{ position: 'fixed', bottom: '40px', left: '50%', transform: 'translateX(-50%)', pointerEvents: 'none', zIndex: 10 }}>
        <motion.div 
          style={{ opacity: scrollIndicatorOpacity }}
          animate={{ y: [0, 10, 0] }} 
          transition={{ y: { repeat: Infinity, duration: 2 } }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: 'var(--text-secondary)' }}>
            <span style={{ fontSize: '0.9rem', marginBottom: '8px' }}>Scroll to Enter Showroom</span>
            <div style={{ width: '2px', height: '40px', background: 'linear-gradient(to bottom, var(--text-secondary), transparent)' }} />
          </div>
        </motion.div>
      </div>
    </ShowroomScene>
      
      {/* About Me Section */}
      <div style={{ position: 'relative', zIndex: 20, background: 'var(--bg-primary)', padding: '6rem 2rem', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '4rem', alignItems: 'center', width: '100%' }}>
          
          <div className="slide-up">
            <h2 className="display-lg" style={{ marginBottom: '2rem' }}>About Me</h2>
            <div style={{ fontSize: '1.2rem', lineHeight: 1.8, color: 'var(--text-secondary)' }}>
                <p style={{ marginBottom: '1.5rem' }}>
                  Hi, I'm Keshav Mishra, a passionate Full-Stack Engineer and AI enthusiast. 
                  I specialize in building scalable web applications and integrating intelligent 
                  systems into modern platforms.
                </p>
                <p style={{ marginBottom: '1.5rem' }}>
                  My background involves designing algorithmically complex solutions—like AI-driven group 
                  formation systems for educators and high-performance, real-time hubs for 
                  corporate teams. I thrive on translating abstract problems into reliable, 
                  well-architected code.
                </p>
                <p style={{ marginBottom: '2rem' }}>
                  Whether it's deploying machine learning models, constructing 3D data visualizations 
                  with Three.js, or architecting robust backend APIs with FastAPI, my core focus is 
                  always on creating seamless and impactful user experiences.
                </p>
                
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                  <button onClick={() => navigate('/portfolio')} className="btn btn-primary">
                    Command Center
                  </button>
                  <button onClick={() => navigate('/lab')} className="btn btn-outline">
                    Explore AI Lab
                  </button>
                </div>
            </div>
          </div>

          {/* Transformer Animation */}
          <div className="slide-up stagger-delay-1" style={{ height: '700px', width: '100%', borderRadius: '16px', overflow: 'hidden' }}>
            <MegatronScene />
          </div>

        </div>
      </div>
    </>
  );
};
