import { useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ShowroomScene } from '../components/ShowroomScene';
import { MegatronScene } from '../components/MegatronScene';
import { EnergyScene } from '../components/EnergyScene';
import '../index.css';

export const Landing = ({ theme, toggleTheme }: { theme?: string, toggleTheme?: () => void }) => {
  const navigate = useNavigate();
  const { scrollYProgress } = useScroll();

  
  const titleOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const titleY = useTransform(scrollYProgress, [0, 0.3], [0, -50]);

  const scrollIndicatorOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  return (
    <>
      {toggleTheme && (
        <div style={{ position: 'fixed', top: '1.5rem', right: '2rem', zIndex: 100 }}>
          <button
            onClick={toggleTheme}
            style={{
              background: 'var(--bg-glass)',
              backdropFilter: 'blur(10px)',
              border: '1px solid var(--border-color)',
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              cursor: 'pointer',
              color: 'var(--text-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.2rem'
            }}
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
        </div>
      )}
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

      {}
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
            </div>
          </div>

          {}
          <div className="slide-up stagger-delay-1" style={{ height: '700px', width: '100%', borderRadius: '16px', overflow: 'hidden' }}>
            <MegatronScene />
          </div>

        </div>
      </div>

      {}
      <div style={{ position: 'relative', zIndex: 20, background: 'var(--bg-glass)', backdropFilter: 'blur(10px)', padding: '6rem 2rem', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', borderTop: '1px solid var(--border-color)' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '4rem', alignItems: 'center', width: '100%' }}>
          
          {}
          <div className="slide-up" style={{ height: '700px', width: '100%', borderRadius: '16px', overflow: 'hidden' }}>
            <EnergyScene />
          </div>

          <div className="slide-up stagger-delay-1">
            <h2 className="display-lg" style={{ marginBottom: '2rem' }}>Get In Touch</h2>
            <div style={{ fontSize: '1.2rem', lineHeight: 1.8, color: 'var(--text-secondary)' }}>
              <p style={{ marginBottom: '2rem' }}>
                I'm always open to discussing new projects, creative ideas or opportunities to be part of your visions.
              </p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div>
                  <strong style={{ color: 'var(--text-primary)', display: 'block', marginBottom: '0.2rem' }}>Email</strong>
                  <a href="mailto:keshavmishra1729@gmail.com" style={{ color: 'var(--text-secondary)', textDecoration: 'none', transition: 'color 0.2s' }} onMouseOver={(e) => e.currentTarget.style.color='var(--text-primary)'} onMouseOut={(e) => e.currentTarget.style.color='var(--text-secondary)'}>
                    keshavmishra1729@gmail.com
                  </a>
                </div>
                
                <div>
                  <strong style={{ color: 'var(--text-primary)', display: 'block', marginBottom: '0.2rem' }}>LinkedIn</strong>
                  <a href="https://www.linkedin.com/in/keshavmishra27/" target="_blank" rel="noreferrer" style={{ color: 'var(--text-secondary)', textDecoration: 'none', transition: 'color 0.2s' }} onMouseOver={(e) => e.currentTarget.style.color='var(--text-primary)'} onMouseOut={(e) => e.currentTarget.style.color='var(--text-secondary)'}>
                    linkedin.com/in/keshavmishra27
                  </a>
                </div>
                
                <div>
                  <strong style={{ color: 'var(--text-primary)', display: 'block', marginBottom: '0.2rem' }}>GitHub</strong>
                  <a href="https://github.com/keshavmishra27" target="_blank" rel="noreferrer" style={{ color: 'var(--text-secondary)', textDecoration: 'none', transition: 'color 0.2s' }} onMouseOver={(e) => e.currentTarget.style.color='var(--text-primary)'} onMouseOut={(e) => e.currentTarget.style.color='var(--text-secondary)'}>
                    github.com/keshavmishra27
                  </a>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '3rem' }}>
                <button onClick={() => navigate('/portfolio')} className="btn btn-primary">
                  Command Center
                </button>
                <button onClick={() => navigate('/lab')} className="btn btn-outline">
                  Explore AI Lab
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};
