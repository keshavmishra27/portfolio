import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SkillShowcaseScene, type Skill, type SkillProject } from '../components/SkillShowcaseScene';
import { FolderGit2, ChevronDown, ChevronUp } from 'lucide-react';

import skillsData from '../data/skills.json';

const FEATURED_SKILLS = [
  { name: 'Python', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg', modelPath: '/models/sci_hud_collection.glb', scale: 1.0, positionY: -0.5, rotation: [Math.PI / 2.5, 0, 0] as [number, number, number] },
  { name: 'TypeScript', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg', modelPath: '/models/sci_hud_collection.glb', scale: 1.0, positionY: -0.5, rotation: [Math.PI / 2.5, 0, 0] as [number, number, number] },
  { name: 'TensorFlow', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tensorflow/tensorflow-original.svg', modelPath: '/models/sci_hud_collection.glb', scale: 1.0, positionY: -0.5, rotation: [Math.PI / 2.5, 0, 0] as [number, number, number] },
  { name: 'Scikit-learn', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/scikitlearn/scikitlearn-original.svg', modelPath: '/models/sci_hud_collection.glb', scale: 1.0, positionY: -0.5, rotation: [Math.PI / 2.5, 0, 0] as [number, number, number] },
  { name: 'Pandas', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pandas/pandas-original.svg', modelPath: '/models/sci_hud_collection.glb', scale: 1.0, positionY: -0.5, rotation: [Math.PI / 2.5, 0, 0] as [number, number, number] }
];

export const Skillset = () => {
  const [skills, setSkills] = useState<Skill[]>([]);

  
  const [expandedProjects, setExpandedProjects] = useState<Record<string, number | null>>({});

  
  const [activeModel, setActiveModel] = useState<string>(FEATURED_SKILLS[0].modelPath);
  const [activeLogo, setActiveLogo] = useState<string>(FEATURED_SKILLS[0].logo);
  const [activeScale, setActiveScale] = useState<number>(FEATURED_SKILLS[0].scale);
  const [activePositionY, setActivePositionY] = useState<number>(FEATURED_SKILLS[0].positionY);
  const [activeRotation, setActiveRotation] = useState<[number, number, number]>(FEATURED_SKILLS[0].rotation);
  const [activeAlign, setActiveAlign] = useState<'left' | 'right'>('right');

  useEffect(() => {
    setSkills(skillsData || []);
  }, []);

  const getExperienceColor = (level: string) => {
    switch (level?.toLowerCase()) {
      case 'expert': return 'var(--primary-color)';
      case 'advanced': return '#3b82f6';
      case 'intermediate': return '#10b981';
      default: return '#8b5cf6';
    }
  };

  const featuredSkillData = FEATURED_SKILLS.map(fs => {
    const data = skills.find(s => s.skill === fs.name);
    return { ...fs, data };
  }).filter(fs => fs.data); 

  const toggleProject = (skillName: string, projectIndex: number) => {
    setExpandedProjects(prev => ({
      ...prev,
      [skillName]: prev[skillName] === projectIndex ? null : projectIndex
    }));
  };

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
            modelPath={activeModel}
            scale={activeScale}
            positionY={activePositionY}
            positionX={activeAlign === 'right' ? -6 : 6}
            rotation={activeRotation}
          />
        </div>

        {}
        <AnimatePresence mode="wait">
          <motion.img
            key={activeLogo}
            src={activeLogo}
            initial={{ opacity: 0, scale: 0.2, y: 50 }}
            animate={{ opacity: 0.9, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.2, y: -50 }}
            transition={{ duration: 0.6, type: 'spring' }}
            style={{
              position: 'absolute',
              width: '15vw',
              maxWidth: '180px',
              filter: 'drop-shadow(0 0 30px rgba(255,255,255,0.2))',
              zIndex: 1,
              marginTop: '-5vh' 
            }}
          />
        </AnimatePresence>
      </div>

      {}
      <div style={{ position: 'relative', zIndex: 1 }}>
        {}
        <section style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '2rem', marginBottom: '8rem' }}>
          <h1 className="display-md" style={{ textAlign: 'center', background: 'var(--bg-glass)', padding: '1rem 2rem', borderRadius: '12px', backdropFilter: 'blur(10px)' }}>
            My Best Skills
          </h1>
          <p style={{ color: 'var(--text-secondary)', background: 'var(--bg-glass)', padding: '0.5rem 1rem', borderRadius: '8px', backdropFilter: 'blur(8px)', marginTop: '1rem' }}>
            Scroll down to see the skills in action. Click on projects to learn more.
          </p>
        </section>

        {}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '40vh', maxWidth: '1400px', margin: '0 auto', paddingBottom: '20vh' }}>
          {featuredSkillData.map((skillItem, index) => {
            const { data, modelPath, scale } = skillItem;
            if (!data) return null;

            return (
              <motion.div
                key={skillItem.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                onViewportEnter={() => {
                  setActiveModel(modelPath);
                  setActiveLogo(skillItem.logo);
                  setActiveScale(scale);
                  setActivePositionY(skillItem.positionY ?? 0);
                  setActiveRotation(skillItem.rotation ?? [0, 0, 0]);
                  setActiveAlign(index % 2 === 0 ? 'right' : 'left');
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
                  
                  marginLeft: index % 2 === 0 ? '0' : 'auto',
                  marginRight: index % 2 === 0 ? 'auto' : '0'
                }}
              >
                {}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                    <h2 className="display-lg" style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <img src={skillItem.logo} alt={data.skill} style={{ width: '40px', height: '40px', objectFit: 'contain' }} />
                      {data.skill}
                    </h2>
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
                    <h3 style={{ fontSize: '1.5rem', color: 'var(--text-secondary)', margin: '0 0 1rem 0', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <FolderGit2 size={24} /> Applied In ({data.used_in.length} Projects):
                    </h3>

                    {}
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
    </div>
  );
};
