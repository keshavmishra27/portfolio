import React, { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';

mermaid.initialize({
  startOnLoad: false,
  theme: 'default',
  securityLevel: 'loose',
});

interface MermaidProps {
  chart: string;
}

export const Mermaid: React.FC<MermaidProps> = ({ chart }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [svg, setSvg] = useState('');

  useEffect(() => {
    if (ref.current && chart) {
      mermaid.render('mermaid-svg-' + Math.random().toString(36).substr(2, 9), chart)
        .then((result) => setSvg(result.svg))
        .catch(console.error);
    }
  }, [chart]);

  return (
    <div ref={ref} className="mermaid-container" dangerouslySetInnerHTML={{ __html: svg }} />
  );
};
