import { Link } from 'react-router-dom';
import { Terminal, FolderGit2, Code2, Cpu } from 'lucide-react';
import { PortfolioScene } from '../components/PortfolioScene';

export const CommandCenter = () => {
  return (
    <div style={{ position: 'relative', width: '100%', minHeight: '80vh', display: 'flex', flexDirection: 'column' }}>
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 0 }}>
        <PortfolioScene />
      </div>

      <div className="tour-hub-overview" style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1, padding: '2rem' }}>
        <h1 className="display-xl" style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Terminal size={48} /> Command Center
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', marginBottom: '4rem', textAlign: 'center' }}>
          Navigate through my portfolio sections
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', width: '100%', maxWidth: '900px' }}>
          <Link to="/projects" className="card tour-projects-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', padding: '2.5rem', textDecoration: 'none', color: 'var(--text-primary)' }}>
            <FolderGit2 size={48} style={{ color: 'var(--primary-color)' }} />
            <h2 style={{ margin: 0 }}>Projects</h2>
            <span style={{ color: 'var(--text-secondary)', textAlign: 'center' }}>Explore my featured work</span>
          </Link>

          <Link to="/skillset" className="card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', padding: '2.5rem', textDecoration: 'none', color: 'var(--text-primary)' }}>
            <Code2 size={48} style={{ color: 'var(--primary-color)' }} />
            <h2 style={{ margin: 0 }}>Skillset</h2>
            <span style={{ color: 'var(--text-secondary)', textAlign: 'center' }}>View my technical expertise</span>
          </Link>

          <Link to="/architecture" className="card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', padding: '2.5rem', textDecoration: 'none', color: 'var(--text-primary)' }}>
            <Cpu size={48} style={{ color: 'var(--primary-color)' }} />
            <h2 style={{ margin: 0 }}>Architecture</h2>
            <span style={{ color: 'var(--text-secondary)', textAlign: 'center' }}>System design overview</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
