import { HashRouter as Router, Routes, Route, Link, useParams, useLocation, Navigate } from 'react-router-dom';
import { useState, useEffect, Suspense } from 'react';
import { CommandPalette } from './components/CommandPalette';
import { fetchProjects, type Project } from './api';
import { Landing } from './pages/Landing';
import { CommandCenter } from './pages/CommandCenter';
import { Skillset } from './pages/Skillset';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, OrbitControls, Environment, Center } from '@react-three/drei';
import { Annotation, FALLBACK_POSITIONS } from './components/PortfolioScene';
import { useRef } from 'react';
import * as THREE from 'three';
import './index.css';

import { AILabScene } from './components/AILabScene';
import { AudioPlayer } from './components/AudioPlayer';

const LabPlaceholder = () => (
  <AILabScene />
);

function ChunLiScene() {
  const { scene } = useGLTF('/models/chun-li.glb');
  return <primitive object={scene} />;
}

function ChunLiSceneContainer({ projects }: { projects: Project[] }) {
  const groupRef = useRef<THREE.Group>(null);
  const annotationsRef = useRef<THREE.Group>(null);

  useFrame(() => {
    const scrollY = window.scrollY;
    const progress = Math.min(Math.max(scrollY / window.innerHeight, 0), 1);

    if (groupRef.current) {
      const scale = 1 + (progress * 1.5);
      groupRef.current.scale.lerp(new THREE.Vector3(scale, scale, scale), 0.1);
      groupRef.current.position.lerp(new THREE.Vector3(0, -progress * 1.2, 0), 0.1);
    }

    if (annotationsRef.current) {
      const buttonSpread = 2 - progress;
      annotationsRef.current.scale.lerp(new THREE.Vector3(buttonSpread, buttonSpread, buttonSpread), 0.1);
    }
  });

  return (
    <group>
      <group ref={groupRef}>
        <ChunLiScene />
      </group>
      <group ref={annotationsRef}>
        {projects.map((project, index) => {
          const pos = project.roomPosition || FALLBACK_POSITIONS[index % FALLBACK_POSITIONS.length];
          return (
            <Annotation
              key={project.id}
              project={project}
              position={pos}
              index={index}
            />
          );
        })}
      </group>
    </group>
  );
}

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    fetchProjects().then(setProjects);
  }, []);

  return (
    <>
      {}
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 0 }}>
        <Canvas shadows camera={{ position: [0, 1.5, 6], fov: 45 }}>
          <ambientLight intensity={1.5} />
          <directionalLight position={[5, 10, 5]} intensity={2} castShadow />
          <Suspense fallback={null}>
            <Environment preset="city" />
            <Center>
              <ChunLiSceneContainer projects={projects} />
            </Center>
          </Suspense>
          <OrbitControls
            enableZoom={false}
            autoRotate
            enablePan={false}
            minPolarAngle={Math.PI / 4}
            maxPolarAngle={Math.PI / 2 + 0.1}
          />
        </Canvas>
      </div>

      {}
      <div className="slide-up stagger-delay-1" style={{ position: 'relative', width: '100%', minHeight: '200vh', pointerEvents: 'none' }}>
        {}
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0,
          padding: '2rem',
          pointerEvents: 'none',
          display: 'flex',
          justifyContent: 'flex-start',
          zIndex: 10
        }}>
          <h1 className="display-lg" style={{ margin: 0, background: 'var(--bg-glass)', padding: '0.5rem 1.5rem', borderRadius: '12px', backdropFilter: 'blur(10px)', border: '1px solid var(--border-color)', pointerEvents: 'auto', boxShadow: '0 4px 12px rgba(0,0,0,0.3)', color: 'var(--text-primary)' }}>
            Project Showcase
          </h1>
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
    </>
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
        <Canvas camera={{ position: [0, 1, 5], fov: 45 }}>
          <ambientLight intensity={1.5} />
          <directionalLight position={[5, 10, 5]} intensity={2} />
          <Suspense fallback={null}>
            <Environment preset="city" />
            <Center>
              <ChunLiScene />
            </Center>
          </Suspense>
          <OrbitControls autoRotate enableZoom={false} />
        </Canvas>
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
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Landing theme={theme} toggleTheme={toggleTheme} />} />
        <Route path="/*" element={
          <Layout theme={theme} toggleTheme={toggleTheme}>
            <Routes>
              <Route path="/portfolio" element={<CommandCenter />} />
              <Route path="/skillset" element={<Skillset />} />
              <Route path="/lab" element={<LabPlaceholder />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/projects/:id" element={<ProjectShowcase />} />
              <Route path="/services" element={<Services />} />
              <Route path="/architecture" element={<Architecture />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Layout>
        } />
      </Routes>
      <AudioPlayer />
    </Router>
  );
}


function Layout({ children, theme, toggleTheme }: { children: React.ReactNode, theme: string, toggleTheme: () => void }) {


  return (
    <div className="layout">
      <CommandPalette />
      <header style={{ position: 'relative', zIndex: 50, padding: '1rem', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--bg-glass)', backdropFilter: 'blur(10px)' }}>
        <div style={{ fontWeight: 'bold' }}>Keshav Mishra</div>
        <nav style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <Link to="/portfolio">Command Center</Link>
          <Link to="/">Portal</Link>
          <button onClick={toggleTheme} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-primary)' }}>
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
        </nav>
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
