import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';


type HistoryEntry = {
  type: 'input' | 'output' | 'error';
  text: React.ReactNode;
};

const AVAILABLE_PAGES = ['home', 'projects', 'services', 'skillset', 'portfolio', 'architecture'];

export const CmdPrompt = () => {
  const [isOpen] = useState(true); 
  const [history, setHistory] = useState<HistoryEntry[]>([
    { type: 'output', text: 'Welcome to Keshav Mishra OS v3.2.0.' },
    { type: 'output', text: 'Type a command to navigate the portfolio.' },
    { type: 'output', text: (
      <div>
        <div style={{ color: 'var(--accent-color)', marginTop: '16px' }}>Available commands:</div>
        <div style={{ display: 'grid', gridTemplateColumns: '100px 1fr', gap: '8px', marginTop: '4px' }}>
          <div>help</div><div>Show this help message</div>
          <div>clear</div><div>Clear terminal history</div>
          <div>ls</div><div>List all available pages</div>
          <div>cd [page]</div><div>Navigate to a specific page</div>
          <div>[page]</div><div>Quick navigate to a specific page</div>
          <div>tour</div><div>Start the interactive 3D tour guide on the current page</div>
        </div>
      </div>
    )},
    { type: 'output', text: (
      <div style={{ marginTop: '16px' }}>
        <div style={{ color: 'var(--accent-color)' }}>Available Pages:</div>
        <div style={{ display: 'flex', gap: '16px', color: 'var(--accent-color)', marginTop: '4px', flexWrap: 'wrap' }}>
          {AVAILABLE_PAGES.map(p => <span key={p}>{p}/</span>)}
        </div>
      </div>
    )}
  ]);
  const [input, setInput] = useState('');
  const endOfHistoryRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (endOfHistoryRef.current) {
      endOfHistoryRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [history]);

  const handleCommand = (cmdStr: string) => {
    const rawCmd = cmdStr.trim();
    if (!rawCmd) return;
    
    
    setHistory(prev => [...prev, { type: 'input', text: `guest@keshav-portfolio:~$ ${rawCmd}` }]);
    
    const parts = rawCmd.toLowerCase().split(' ');
    const command = parts[0];
    const arg = parts.length > 1 ? parts[1] : null;

    if (command === 'help') {
      setHistory(prev => [...prev, { 
        type: 'output', 
        text: (
          <div>
            <div style={{ color: 'var(--accent-color)' }}>Available commands:</div>
            <div style={{ display: 'grid', gridTemplateColumns: '100px 1fr', gap: '8px', marginTop: '4px' }}>
              <div>help</div><div>Show this help message</div>
              <div>clear</div><div>Clear terminal history</div>
              <div>ls</div><div>List all available pages</div>
              <div>cd [page]</div><div>Navigate to a specific page</div>
              <div>[page]</div><div>Quick navigate to a specific page</div>
              <div>tour</div><div>Start the interactive 3D tour guide on the current page</div>
            </div>
          </div>
        )
      }]);
    } else if (command === 'tour') {
      setHistory(prev => [...prev, { type: 'output', text: 'Starting interactive tour...' }]);
      window.dispatchEvent(new Event('start-tour'));
    } else if (command === 'clear') {
      setHistory([]);
    } else if (command === 'ls') {
      setHistory(prev => [...prev, { 
        type: 'output', 
        text: (
          <div style={{ display: 'flex', gap: '16px', color: 'var(--accent-color)' }}>
            {AVAILABLE_PAGES.map(p => <span key={p}>{p}/</span>)}
          </div>
        )
      }]);
    } else if (command === 'cd' && arg) {
      navigatePage(arg);
    } else if (AVAILABLE_PAGES.includes(command)) {
      navigatePage(command);
    } else {
      setHistory(prev => [...prev, { 
        type: 'error', 
        text: `Command not found: ${command}. Type "help" for a list of commands.` 
      }]);
    }
    
    setInput('');
  };

  const navigatePage = (page: string) => {
    if (AVAILABLE_PAGES.includes(page)) {
      setHistory(prev => [...prev, { type: 'output', text: `Navigating to /${page === 'home' ? '' : page}...` }]);
      setTimeout(() => {
        if (page === 'home') navigate('/');
        else navigate(`/${page}`);
      }, 500);
    } else {
      setHistory(prev => [...prev, { type: 'error', text: `Directory not found: ${page}. Use "ls" to view pages.` }]);
    }
  };

  return (
    <>
      {}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'var(--bg-primary)', 
        zIndex: -1, 
        display: 'flex',
        flexDirection: 'column',
        fontFamily: 'monospace',
        overflow: 'hidden',
        pointerEvents: 'none', 
        opacity: 0.8 
      }}>
        {}
        <div style={{
          flex: 1,
          padding: '24px',
          paddingBottom: '60px', 
          overflowY: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end', 
          gap: '8px',
          fontSize: '15px',
        }}>
          {history.map((entry, idx) => (
            <div key={idx} style={{
              color: entry.type === 'input' ? 'var(--accent-color)' : entry.type === 'error' ? '#ff4a4a' : 'var(--text-secondary)',
              wordBreak: 'break-word',
              lineHeight: '1.5',
            }}>
              {entry.text}
            </div>
          ))}
          <div ref={endOfHistoryRef} />
        </div>
      </div>

      {}
      <div style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        width: '100vw',
        display: 'flex',
        padding: '12px 24px',
        backgroundColor: 'var(--bg-glass)',
        backdropFilter: 'blur(10px)',
        borderTop: '1px solid var(--border-color)',
        alignItems: 'center',
        gap: '12px',
        zIndex: 9999, 
      }}>
        <span style={{ color: 'var(--accent-color)', fontSize: '15px', fontFamily: 'monospace' }}>guest@keshav-portfolio:~$</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleCommand(input);
            }
          }}
          style={{
            flex: 1,
            background: 'transparent',
            border: 'none',
            color: 'var(--text-primary)',
            fontFamily: 'monospace',
            fontSize: '15px',
            outline: 'none'
          }}
          spellCheck="false"
          autoComplete="off"
          placeholder="Type a command (e.g. 'tour', 'projects', 'help')..."
        />
      </div>
    </>
  );
};
