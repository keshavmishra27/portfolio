import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SkillShowcaseScene, type SkillProject } from '../components/SkillShowcaseScene';
import { FolderGit2, ChevronDown, ChevronUp, Code2, BrainCircuit, Layout, Server, Cpu, Blocks } from 'lucide-react';

import skillsHierarchyData from '../data/skills_hierarchy.json';

const getSkillLogo = (skillName: string) => {
  const mapping: Record<string, string> = {
    'Python': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg',
    'TypeScript': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg',
    'JavaScript': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg',
    'HTML': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg',
    'CSS': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg',
    'TensorFlow': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tensorflow/tensorflow-original.svg',
    'Scikit-learn': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/scikitlearn/scikitlearn-original.svg',
    'Pandas': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pandas/pandas-original.svg',
    'NumPy': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/numpy/numpy-original.svg',
    'Keras': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/keras/keras-original.svg',
    'PyTorch': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pytorch/pytorch-original.svg',
  };
  return mapping[skillName] || null;
};

const getExperienceColor = (level: string) => {
  switch (level?.toLowerCase()) {
    case 'expert': return 'var(--primary-color)';
    case 'advanced': return '#3b82f6';
    case 'intermediate': return '#10b981';
    default: return '#8b5cf6';
  }
};

const getDomainIcon = (domain: string) => {
  if (domain === 'AI') return <BrainCircuit size={40} className="text-primary" />;
  if (domain === 'Full-Stack') return <Layout size={40} className="text-primary" />;
  return <Blocks size={40} />;
};

const getSubdomainIcon = (subdomain: string) => {
  if (subdomain.includes('Agentic')) return <Cpu size={24} />;
  if (subdomain.includes('Frontend')) return <Layout size={24} />;
  if (subdomain.includes('Backend')) return <Server size={24} />;
  return <Code2 size={24} />;
};

export const Skillset = () => {
  const [expandedProjects, setExpandedProjects] = useState<Record<string, number | null>>({});
  
  const [activeAlign, setActiveAlign] = useState<'left' | 'right'>('right');

  const toggleProject = (skillName: string, projectIndex: number) => {
    setExpandedProjects(prev => ({
      ...prev,
      [skillName]: prev[skillName] === projectIndex ? null : projectIndex
    }));
  };

  let globalSkillIndex = 0;

  return (
    <div style={{ position: 'relative', width: '100%', minHeight: '100vh', padding: '2rem' }}>
      {}
      <div style={{
        position: 'fixed', top: 0, left: 0,
        width: '100vw', height: '100vh',
        zIndex: 0, opacity: 1, pointerEvents: 'none',
        display: 'flex', alignItems: 'center', justifyContent: 'center'
      }}>
        <div style={{ position: 'absolute', width: '100%', height: '100%' }}>
          <SkillShowcaseScene
            modelPath={`${import.meta.env.BASE_URL}models/control_room_monitor.glb`}
            scale={4.0}
            positionY={-0.5}
            positionX={activeAlign === 'right' ? -6 : 6}
            rotation={[0, 0, 0]}
          />
        </div>
      </div>

      {}
      <div style={{ position: 'relative', zIndex: 1, maxWidth: '1400px', margin: '0 auto', paddingBottom: '20vh' }}>
        <section style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '2rem', marginBottom: '4rem' }}>
          <h1 className="display-md" style={{ textAlign: 'center', background: 'var(--bg-glass)', padding: '1rem 2rem', borderRadius: '12px', backdropFilter: 'blur(10px)' }}>
            My Expertise
          </h1>
          <p style={{ color: 'var(--text-secondary)', background: 'var(--bg-glass)', padding: '0.5rem 1rem', borderRadius: '8px', backdropFilter: 'blur(8px)', marginTop: '1rem' }}>
            Structured by domain and sub-domain. Scroll to explore.
          </p>
        </section>

        {skillsHierarchyData.map((domainObj) => (
          <div key={domainObj.domain} style={{ marginBottom: '8rem' }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: '1rem', 
              marginBottom: '4rem', padding: '1.5rem', 
              background: 'var(--bg-glass)', borderRadius: '16px',
              backdropFilter: 'blur(10px)', border: '1px solid var(--border-color)',
              position: 'sticky', top: '100px', zIndex: 10
            }}>
              {getDomainIcon(domainObj.domain)}
              <h2 className="display-lg" style={{ margin: 0 }}>{domainObj.domain}</h2>
            </div>

            {domainObj.subdomains.map((subdomainObj) => (
              <div key={subdomainObj.name} style={{ marginBottom: '6rem', paddingLeft: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '3rem' }}>
                  {getSubdomainIcon(subdomainObj.name)}
                  <h3 style={{ fontSize: '2rem', margin: 0, fontWeight: 600, color: 'var(--primary-color)' }}>
                    {subdomainObj.name}
                  </h3>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '20vh' }}>
                  {subdomainObj.skills.map((data) => {
                    const currentIndex = globalSkillIndex++;
                    const logoUrl = getSkillLogo(data.skill);

                    return (
                      <motion.div
                        key={data.skill}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        onViewportEnter={() => {
                          setActiveAlign(currentIndex % 2 === 0 ? 'right' : 'left');
                        }}
                        viewport={{ amount: 0.5, margin: "-100px" }}
                        transition={{ duration: 0.6 }}
                        style={{
                          background: 'var(--bg-glass)',
                          border: '1px solid var(--border-color)',
                          borderRadius: '24px',
                          padding: '2rem',
                          boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
                          backdropFilter: 'blur(16px)',
                          maxWidth: '600px',
                          width: '100%',
                          marginLeft: currentIndex % 2 === 0 ? '0' : 'auto',
                          marginRight: currentIndex % 2 === 0 ? 'auto' : '0'
                        }}
                      >
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                            <h4 style={{ fontSize: '1.8rem', margin: 0, display: 'flex', alignItems: 'center', gap: '1rem', fontWeight: 700 }}>
                              {logoUrl ? (
                                <img src={logoUrl} alt={data.skill} style={{ width: '40px', height: '40px', objectFit: 'contain' }} />
                              ) : (
                                <Code2 size={32} />
                              )}
                              {data.skill}
                            </h4>
                            <span style={{
                              fontSize: '1.2rem',
                              padding: '0.5rem 1.5rem',
                              borderRadius: '99px',
                              background: `${getExperienceColor(data.experience)}20`,
                              color: getExperienceColor(data.experience),
                              fontWeight: 600
                            }}>
                              {data.experience}
                            </span>
                          </div>

                          <div>
                            <h5 style={{ fontSize: '1.3rem', color: 'var(--text-secondary)', margin: '0 0 1rem 0', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                              <FolderGit2 size={24} /> Applied In ({data.used_in.length} Projects):
                            </h5>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxHeight: '400px', overflowY: 'auto', paddingRight: '1rem' }}>
                              {data.used_in.map((repo: SkillProject, i: number) => {
                                const isExpanded = expandedProjects[data.skill] === i;

                                return (
                                  <motion.div
                                    key={i}
                                    onClick={() => toggleProject(data.skill, i)}
                                    style={{
                                      background: isExpanded ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.05)',
                                      border: '1px solid',
                                      borderColor: isExpanded ? getExperienceColor(data.experience) : 'var(--border-color)',
                                      padding: '1.5rem',
                                      borderRadius: '8px',
                                      color: 'var(--text-primary)',
                                      display: 'flex',
                                      flexDirection: 'column',
                                      cursor: 'pointer',
                                      transition: 'all 0.2s ease',
                                    }}
                                    whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
                                  >
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                                      <div style={{ fontSize: '1.1rem', fontWeight: 600 }}>{repo.name}</div>
                                      <div style={{ color: 'var(--text-secondary)' }}>
                                        {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                                      </div>
                                    </div>

                                    <AnimatePresence>
                                      {isExpanded && (
                                        <motion.div
                                          initial={{ height: 0, opacity: 0 }}
                                          animate={{ height: 'auto', opacity: 1 }}
                                          exit={{ height: 0, opacity: 0 }}
                                          transition={{ duration: 0.2 }}
                                          style={{ overflow: 'hidden' }}
                                        >
                                          <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--border-color)', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                                            <strong>How I used {data.skill}:</strong><br />
                                            {repo.how_used}
                                          </div>
                                        </motion.div>
                                      )}
                                    </AnimatePresence>
                                  </motion.div>
                                )
                              })}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
