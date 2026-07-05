import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Terminal, Code, User, Briefcase, Mail } from 'lucide-react';
import { fetchProjects } from '../api';
import '../styles/CommandPalette.css';

const STATIC_COMMANDS = [
  { id: 'home', title: 'Go to Home', icon: <Terminal size={16} />, path: '/' },
  { id: 'projects', title: 'View Projects', icon: <Code size={16} />, path: '/projects' },
  { id: 'services', title: 'View Services', icon: <Briefcase size={16} />, path: '/services' },
  { id: 'skillset', title: 'View Skillset', icon: <User size={16} />, path: '/skillset' },
  { id: 'contact', title: 'Contact Me', icon: <Mail size={16} />, path: '/contact' },
  { id: 'architecture', title: 'System Architecture', icon: <Terminal size={16} />, path: '/architecture' },
];

export const CommandPalette = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [dynamicCommands, setDynamicCommands] = useState<typeof STATIC_COMMANDS>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProjects().then(projects => {
      const projectCommands = projects.map(p => ({
        id: `project-${p.id}`,
        title: `Project: ${p.name}`,
        icon: <Code size={16} />,
        path: `/projects/${p.id}`
      }));
      setDynamicCommands(projectCommands);
    });
  }, []);

  const ALL_COMMANDS = [...STATIC_COMMANDS, ...dynamicCommands];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
      setQuery('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  const filteredCommands = ALL_COMMANDS.filter((cmd) =>
    cmd.title.toLowerCase().includes(query.toLowerCase())
  );

  const handleExecute = (path: string) => {
    navigate(path);
    setIsOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % filteredCommands.length);
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredCommands.length) % filteredCommands.length);
    }
    if (e.key === 'Enter' && filteredCommands[selectedIndex]) {
      handleExecute(filteredCommands[selectedIndex].path);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="palette-overlay" onClick={() => setIsOpen(false)}>
      <div className="palette-container" onClick={(e) => e.stopPropagation()}>
        <div className="palette-header">
          <Search size={18} className="palette-icon" />
          <input
            ref={inputRef}
            className="palette-input"
            placeholder="Type a command or search..."
            value={query}
            onChange={(e) => { setQuery(e.target.value); setSelectedIndex(0); }}
            onKeyDown={handleKeyDown}
          />
          <div className="palette-badge">ESC</div>
        </div>
        <div className="palette-list">
          {filteredCommands.length === 0 ? (
            <div className="palette-empty">No results found.</div>
          ) : (
            filteredCommands.map((cmd, idx) => (
              <div
                key={cmd.id}
                className={`palette-item ${idx === selectedIndex ? 'selected' : ''}`}
                onClick={() => handleExecute(cmd.path)}
                onMouseEnter={() => setSelectedIndex(idx)}
              >
                {cmd.icon}
                <span>{cmd.title}</span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
