import { HashRouter as Router, Routes, Route, Link, useParams, useLocation, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { CommandPalette } from './components/CommandPalette';
import { CmdPrompt } from './components/CmdPrompt';
import { fetchProjects, type Project } from './api';
import { Landing } from './pages/Landing';
import { CommandCenter } from './pages/CommandCenter';
import { Skillset } from './pages/Skillset';

import './index.css';
import { TourGuide } from './components/TourGuide';

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    fetchProjects().then(setProjects);
  }, []);

  return (
    <div className="slide-up stagger-delay-1" style={{ position: 'relative', width: '100%', minHeight: '80vh', paddingBottom: '4rem' }}>
      <h1 className="display-lg" style={{ marginBottom: '2rem' }}>
        Project Showcase
      </h1>
      
      <div className="tour-projects-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2rem', minHeight: '50vh' }}>
        {projects.map((project) => (
          <Link key={project.id} to={`/projects/${project.id}`} className="card" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', flexDirection: 'column', transition: 'transform 0.2s, box-shadow 0.2s' }}>
            <h2 style={{ margin: '0 0 1rem 0' }}>{project.name}</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', flex: 1, lineHeight: 1.6 }}>
              {project.problem.substring(0, 150)}{project.problem.length > 150 ? '...' : ''}
            </p>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {project.tech_stack.slice(0, 4).map(tech => (
                <span key={tech} className="palette-badge">{tech}</span>
              ))}
              {project.tech_stack.length > 4 && <span className="palette-badge">+{project.tech_stack.length - 4}</span>}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

const Services = () => (
  <div className="slide-up stagger-delay-1">
    <h1>Freelance Services</h1>
    <p>Custom AI solutions, web applications, and backend systems.</p>
  </div>
);

import { Mermaid } from './components/Mermaid';

const Architecture = () => {
  const chart = `
graph TD
    Client[React Frontend] --> API[FastAPI Gateway]
    API --> Content[Content API]
    API --> Analytics[Analytics API]
    API --> Github[GitHub API]
    API --> Chat[AI Chat API]
    
    Content --> YAML[(YAML Files)]
    Analytics --> SQLite[(SQLite DB)]
    Chat --> CrewAI[CrewAI Agents]
    CrewAI --> RAG[Local Vector Store]
    CrewAI --> Groq[Groq API]
    `;

  return (
    <div className="slide-up stagger-delay-1">
      <h1 className="display-xl">System Architecture</h1>
      <p style={{ marginBottom: '2rem', color: 'var(--text-secondary)' }}>Overview of the portfolio engineering platform.</p>
      <div className="card">
        <Mermaid chart={chart} />
      </div>
    </div>
  );
};

const ProjectShowcase = () => {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<Project | null | undefined>(null); 

  useEffect(() => {
    fetchProjects().then(projects => {
      const p = projects.find(p => p.id === id);
      setProject(p); 
    });
  }, [id]);

  if (project === null) return <div className="slide-up" style={{ padding: '4rem', textAlign: 'center' }}><p>Loading project details...</p></div>;
  if (project === undefined) return <div className="slide-up" style={{ padding: '4rem', textAlign: 'center' }}><h2>Project Not Found</h2><p>The project "{id}" could not be found. It may have been renamed or deleted.</p><Link to="/projects" className="btn btn-primary" style={{ marginTop: '1rem' }}>Back to Projects</Link></div>;

  return (
    <>
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 0 }}>
      </div>

      <div className="slide-up stagger-delay-1 card" style={{ maxWidth: '800px', margin: '2rem auto', position: 'relative', zIndex: 1 }}>
        <h1 className="display-lg" style={{ marginBottom: '0.5rem' }}>{project.name}</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', marginBottom: '2rem' }}>{project.timeline}</p>

        {}
        <div style={{ width: '100%', height: '400px', borderRadius: '12px', overflow: 'hidden', background: '#000', border: '1px solid var(--border-color)', marginBottom: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {project.video_url ? (
            <video src={project.video_url} controls autoPlay muted loop style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
          ) : project.demo_url && !project.demo_url.includes('github.com') ? (
            <iframe src={project.demo_url} style={{ width: '100%', height: '100%', border: 'none', background: '#fff' }} title={project.name} />
          ) : (
            <div style={{ padding: '2rem', textAlign: 'center', color: '#fff' }}>
              <h3 style={{ marginBottom: '1rem' }}>No Interactive Demo Available</h3>
              <p style={{ color: '#aaa', marginBottom: '1.5rem' }}>This project does not have a live web demo deployed.</p>
              <a href={project.github_url} target="_blank" rel="noreferrer" className="btn btn-primary">View Source on GitHub</a>
            </div>
          )}
        </div>

        <div style={{ display: 'flex', gap: '1rem', marginBottom: '3rem' }}>
          {project.demo_url && !project.demo_url.includes('github.com') && (
            <a href={project.demo_url} target="_blank" rel="noreferrer" className="btn btn-primary">Try Demo</a>
          )}
          <a href={project.github_url} target="_blank" rel="noreferrer" className="btn btn-outline">GitHub Repository</a>
        </div>

        <section style={{ marginBottom: '2.5rem' }}>
          <h2 className="display-md">The Problem</h2>
          <p style={{ marginTop: '1rem', color: 'var(--text-secondary)' }}>{project.problem}</p>
        </section>

        <section style={{ marginBottom: '2.5rem' }}>
          <h2 className="display-md">The Solution</h2>
          <p style={{ marginTop: '1rem', color: 'var(--text-secondary)' }}>{project.solution}</p>
        </section>

        <section style={{ marginBottom: '2.5rem' }}>
          <h2 className="display-md">Tech Stack</h2>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '1rem' }}>
            {project.tech_stack.map(tech => (
              <span key={tech} className="palette-badge">{tech}</span>
            ))}
          </div>
        </section>

        <section style={{ marginBottom: '2.5rem' }}>
          <h2 className="display-md">Engineering Challenges & Trade-offs</h2>
          <p style={{ marginTop: '1rem', color: 'var(--text-secondary)' }}>{project.challenges}</p>
        </section>

        <section style={{ marginBottom: '2.5rem' }}>
          <h2 className="display-md">Results & Lessons Learned</h2>
          <p style={{ marginTop: '1rem', color: 'var(--text-secondary)' }}>{project.results}</p>
        </section>
      </div>
    </>
  );
};

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <Router>
      <TourGuide />
      <CmdPrompt />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Landing theme={theme} toggleTheme={toggleTheme} />} />
        <Route path="/*" element={
          <Layout theme={theme} toggleTheme={toggleTheme}>
            <Routes>
              <Route path="/portfolio" element={<CommandCenter />} />
              <Route path="/skillset" element={<Skillset />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/projects/:id" element={<ProjectShowcase />} />
              <Route path="/services" element={<Services />} />
              <Route path="/architecture" element={<Architecture />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Layout>
        } />
      </Routes>

    </Router>
  );
}


function Layout({ children, theme, toggleTheme }: { children: React.ReactNode, theme: string, toggleTheme: () => void }) {


  return (
    <div className="layout">
      <CommandPalette />
      <header style={{ position: 'relative', zIndex: 50, padding: '1rem', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--bg-glass)', backdropFilter: 'blur(10px)' }}>
        <div style={{ fontWeight: 'bold' }}>Keshav Mishra</div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
          <span>Type commands in terminal (bottom left) to navigate:</span>
          <div style={{ display: 'flex', gap: '1rem', fontFamily: 'monospace', color: 'var(--accent-color)' }}>
            <span>cd projects</span>
            <span>cd skillset</span>
            <span>cd portfolio</span>
            <span>cd home</span>
            <span>tour</span>
          </div>
        </div>

        <button onClick={toggleTheme} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-primary)' }}>
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
      </header>
      <main className="container" style={{ paddingTop: '2rem', minHeight: '80vh' }}>
        {children}
      </main>
      <footer style={{ padding: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-color)', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
        <p>&copy; {new Date().getFullYear()} Keshav Mishra.</p>
        <div style={{ textAlign: 'right' }}>
          <div>Portfolio v3.2.0</div>
          <div>Updated July 2026</div>
        </div>
      </footer>
    </div>
  );
};

export default App;
