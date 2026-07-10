import { useState } from 'react';
import { motion } from 'framer-motion';
import { FolderGit2, ChevronDown, ChevronUp, Code2, BrainCircuit, Layout, Server, Cpu, Blocks } from 'lucide-react';

export interface SkillProject {
  name: string;
  how_used: string;
}

const skillsHierarchyData = [
  {
    "domain": "AI",
    "subdomains": [
      {
        "name": "Agentic AI",
        "skills": [
          {
            "skill": "LangChain & CrewAI",
            "experience": "Intermediate",
            "used_in": [
              {
                "name": "BlueprintAI",
                "how_used": "Used for orchestrating multi-agent systems and connecting LLMs to tools."
              }
            ]
          },
          {
            "skill": "Large Language Models",
            "experience": "Advanced",
            "used_in": [
              {
                "name": "BlueprintAI",
                "how_used": "Integrated OpenAI, Google GenAI, and Ollama for generative tasks."
              },
              {
                "name": "job-hunter",
                "how_used": "Used for parsing job descriptions and matching."
              }
            ]
          },
          {
            "skill": "RAG & Sentence Transformers",
            "experience": "Advanced",
            "used_in": [
              {
                "name": "job-hunter",
                "how_used": "Used for retrieving and comparing documents."
              }
            ]
          },
          {
            "skill": "Vector Databases (FAISS)",
            "experience": "Intermediate",
            "used_in": [
              {
                "name": "job-hunter",
                "how_used": "Used FAISS for efficient similarity search of embeddings."
              }
            ]
          },
          {
            "skill": "Scraping Agents",
            "experience": "Advanced",
            "used_in": [
              {
                "name": "job-hunter",
                "how_used": "Used Playwright and Apify for intelligent, agentic web scraping."
              }
            ]
          }
        ]
      },
      {
        "name": "Machine Learning",
        "skills": [
          {
            "skill": "Python",
            "experience": "Expert",
            "used_in": [
              {
                "name": "-Cat-vs.-Dog-Image-Classifier",
                "how_used": "Used Python for data processing, model training, and building the core inference logic in -Cat-vs.-Dog-Image-Classifier."
              },
              {
                "name": "area_predictor",
                "how_used": "Used Python for data processing, model training, and building the core inference logic in area_predictor."
              },
              {
                "name": "Automated-Lead-Management-Email-Tracking-System",
                "how_used": "Developed the backend architecture and API endpoints using Python in Automated-Lead-Management-Email-Tracking-System."
              },
              {
                "name": "BlueprintAI",
                "how_used": "Applied Python in BlueprintAI to implement core features, optimize performance, and deliver robust functionality."
              },
              {
                "name": "Camera_model",
                "how_used": "Used Python for data processing, model training, and building the core inference logic in Camera_model."
              },
              {
                "name": "email-automation",
                "how_used": "Leveraged Python's scripting capabilities to automate workflows, scrape data, and build efficient pipelines in email-automation."
              },
              {
                "name": "fruit-classifier",
                "how_used": "Used Python for data processing, model training, and building the core inference logic in fruit-classifier."
              },
              {
                "name": "house_pipeline",
                "how_used": "Applied Python in house_pipeline to implement core features, optimize performance, and deliver robust functionality."
              },
              {
                "name": "illitatre_helper",
                "how_used": "Applied Python in illitatre_helper to implement core features, optimize performance, and deliver robust functionality."
              },
              {
                "name": "InsightForge",
                "how_used": "Applied Python in InsightForge to implement core features, optimize performance, and deliver robust functionality."
              },
              {
                "name": "job-hunter",
                "how_used": "Applied Python in job-hunter to implement core features, optimize performance, and deliver robust functionality."
              },
              {
                "name": "LIVEX",
                "how_used": "Applied Python in LIVEX to implement core features, optimize performance, and deliver robust functionality."
              },
              {
                "name": "Market_website",
                "how_used": "Applied Python in Market_website to implement core features, optimize performance, and deliver robust functionality."
              },
              {
                "name": "mediq",
                "how_used": "Applied Python in mediq to implement core features, optimize performance, and deliver robust functionality."
              },
              {
                "name": "movie-classification-system",
                "how_used": "Developed the backend architecture and API endpoints using Python in movie-classification-system."
              },
              {
                "name": "Offroad_Autonomy_Segmentation_Model",
                "how_used": "Used Python for data processing, model training, and building the core inference logic in Offroad_Autonomy_Segmentation_Model."
              },
              {
                "name": "scrappers",
                "how_used": "Leveraged Python's scripting capabilities to automate workflows, scrape data, and build efficient pipelines in scrappers."
              },
              {
                "name": "skills-getting-started-with-github-copilot",
                "how_used": "Applied Python in skills-getting-started-with-github-copilot to implement core features, optimize performance, and deliver robust functionality."
              },
              {
                "name": "skills-test-with-actions",
                "how_used": "Applied Python in skills-test-with-actions to implement core features, optimize performance, and deliver robust functionality."
              },
              {
                "name": "Social_media_application",
                "how_used": "Applied Python in Social_media_application to implement core features, optimize performance, and deliver robust functionality."
              },
              {
                "name": "stock_agent",
                "how_used": "Applied Python in stock_agent to implement core features, optimize performance, and deliver robust functionality."
              },
              {
                "name": "water-quality-predicter",
                "how_used": "Applied Python in water-quality-predicter to implement core features, optimize performance, and deliver robust functionality."
              }
            ]
          },
          {
            "skill": "Pandas",
            "experience": "Advanced",
            "used_in": [
              {
                "name": "-Cat-vs.-Dog-Image-Classifier",
                "how_used": "Utilized Pandas for data cleaning, transformation, and complex numerical analysis in -Cat-vs.-Dog-Image-Classifier."
              },
              {
                "name": "house_pipeline",
                "how_used": "Utilized Pandas for data cleaning, transformation, and complex numerical analysis in house_pipeline."
              },
              {
                "name": "movie-classification-system",
                "how_used": "Utilized Pandas for data cleaning, transformation, and complex numerical analysis in movie-classification-system."
              }
            ]
          },
          {
            "skill": "Seaborn",
            "experience": "Advanced",
            "used_in": [
              {
                "name": "-Cat-vs.-Dog-Image-Classifier",
                "how_used": "Created insightful data visualizations and analytical plots using Seaborn to communicate findings in -Cat-vs.-Dog-Image-Classifier."
              },
              {
                "name": "house_pipeline",
                "how_used": "Created insightful data visualizations and analytical plots using Seaborn to communicate findings in house_pipeline."
              }
            ]
          },
          {
            "skill": "Matplotlib",
            "experience": "Advanced",
            "used_in": [
              {
                "name": "-Cat-vs.-Dog-Image-Classifier",
                "how_used": "Created insightful data visualizations and analytical plots using Matplotlib to communicate findings in -Cat-vs.-Dog-Image-Classifier."
              },
              {
                "name": "house_pipeline",
                "how_used": "Created insightful data visualizations and analytical plots using Matplotlib to communicate findings in house_pipeline."
              },
              {
                "name": "movie-classification-system",
                "how_used": "Created insightful data visualizations and analytical plots using Matplotlib to communicate findings in movie-classification-system."
              }
            ]
          },
          {
            "skill": "Scikit-learn",
            "experience": "Advanced",
            "used_in": [
              {
                "name": "house_pipeline",
                "how_used": "Employed Scikit-learn to design, train, and evaluate machine learning models for predictive accuracy in house_pipeline."
              },
              {
                "name": "movie-classification-system",
                "how_used": "Employed Scikit-learn to design, train, and evaluate machine learning models for predictive accuracy in movie-classification-system."
              }
            ]
          },
          {
            "skill": "XGBoost",
            "experience": "Advanced",
            "used_in": [
              {
                "name": "movie-classification-system",
                "how_used": "Employed XGBoost to design, train, and evaluate machine learning models for predictive accuracy in movie-classification-system."
              }
            ]
          },
          {
            "skill": "GridSearchCV",
            "experience": "Advanced",
            "used_in": [
              {
                "name": "house_pipeline",
                "how_used": "Applied GridSearchCV in house_pipeline to implement core features, optimize performance, and deliver robust functionality."
              },
              {
                "name": "movie-classification-system",
                "how_used": "Applied GridSearchCV in movie-classification-system to implement core features, optimize performance, and deliver robust functionality."
              }
            ]
          },
          {
            "skill": "NumPy",
            "experience": "Advanced",
            "used_in": [
              {
                "name": "house_pipeline",
                "how_used": "Utilized NumPy for data cleaning, transformation, and complex numerical analysis in house_pipeline."
              },
              {
                "name": "movie-classification-system",
                "how_used": "Utilized NumPy for data cleaning, transformation, and complex numerical analysis in movie-classification-system."
              }
            ]
          },
          {
            "skill": "OLS",
            "experience": "Advanced",
            "used_in": [
              {
                "name": "house_pipeline",
                "how_used": "Applied OLS in house_pipeline to implement core features, optimize performance, and deliver robust functionality."
              }
            ]
          },
          {
            "skill": "Ridge",
            "experience": "Advanced",
            "used_in": [
              {
                "name": "house_pipeline",
                "how_used": "Applied Ridge in house_pipeline to implement core features, optimize performance, and deliver robust functionality."
              }
            ]
          },
          {
            "skill": "Logistic",
            "experience": "Advanced",
            "used_in": [
              {
                "name": "house_pipeline",
                "how_used": "Applied Logistic in house_pipeline to implement core features, optimize performance, and deliver robust functionality."
              }
            ]
          },
          {
            "skill": "KNN",
            "experience": "Advanced",
            "used_in": [
              {
                "name": "house_pipeline",
                "how_used": "Applied KNN in house_pipeline to implement core features, optimize performance, and deliver robust functionality."
              }
            ]
          }
        ]
      },
      {
        "name": "Deep Learning",
        "skills": [
          {
            "skill": "TensorFlow",
            "experience": "Advanced",
            "used_in": [
              {
                "name": "-Cat-vs.-Dog-Image-Classifier",
                "how_used": "Employed TensorFlow to design, train, and evaluate machine learning models for predictive accuracy in -Cat-vs.-Dog-Image-Classifier."
              }
            ]
          },
          {
            "skill": "Keras",
            "experience": "Advanced",
            "used_in": [
              {
                "name": "-Cat-vs.-Dog-Image-Classifier",
                "how_used": "Employed Keras to design, train, and evaluate machine learning models for predictive accuracy in -Cat-vs.-Dog-Image-Classifier."
              }
            ]
          }
        ]
      },
      {
        "name": "Reinforcement Learning",
        "skills": [
          {
            "skill": "PyTorch",
            "experience": "Advanced",
            "used_in": [
              {
                "name": "stock_agent",
                "how_used": "Used PyTorch to define, train, and optimize deep neural networks."
              }
            ]
          },
          {
            "skill": "Deep Q-Networks (DQN)",
            "experience": "Advanced",
            "used_in": [
              {
                "name": "stock_agent",
                "how_used": "Implemented Dueling DQN with multi-step targets for stock trading."
              }
            ]
          },
          {
            "skill": "Custom RL Environments",
            "experience": "Advanced",
            "used_in": [
              {
                "name": "stock_agent",
                "how_used": "Built a custom trading environment handling historical data and actions."
              }
            ]
          },
          {
            "skill": "Replay Buffers",
            "experience": "Advanced",
            "used_in": [
              {
                "name": "stock_agent",
                "how_used": "Implemented n-step replay buffers for off-policy training stability."
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "domain": "Full-Stack",
    "subdomains": [
      {
        "name": "Frontend",
        "skills": [
          {
            "skill": "JavaScript",
            "experience": "Intermediate",
            "used_in": [
              {
                "name": "Automated-Lead-Management-Email-Tracking-System",
                "how_used": "Utilized JavaScript to build interactive UI components, manage application state, and integrate with backend APIs in Automated-Lead-Management-Email-Tracking-System."
              },
              {
                "name": "BlueprintAI",
                "how_used": "Utilized JavaScript to build interactive UI components, manage application state, and integrate with backend APIs in BlueprintAI."
              },
              {
                "name": "health_automater",
                "how_used": "Utilized JavaScript to build interactive UI components, manage application state, and integrate with backend APIs in health_automater."
              },
              {
                "name": "InsightForge",
                "how_used": "Utilized JavaScript to build interactive UI components, manage application state, and integrate with backend APIs in InsightForge."
              },
              {
                "name": "job-hunter",
                "how_used": "Utilized JavaScript to build interactive UI components, manage application state, and integrate with backend APIs in job-hunter."
              },
              {
                "name": "LIVEX",
                "how_used": "Utilized JavaScript to build interactive UI components, manage application state, and integrate with backend APIs in LIVEX."
              },
              {
                "name": "mediq",
                "how_used": "Utilized JavaScript to build interactive UI components, manage application state, and integrate with backend APIs in mediq."
              },
              {
                "name": "skills-getting-started-with-github-copilot",
                "how_used": "Utilized JavaScript to build interactive UI components, manage application state, and integrate with backend APIs in skills-getting-started-with-github-copilot."
              },
              {
                "name": "tic-tac-toe-game",
                "how_used": "Utilized JavaScript to build interactive UI components, manage application state, and integrate with backend APIs in tic-tac-toe-game."
              }
            ]
          },
          {
            "skill": "TypeScript",
            "experience": "Intermediate",
            "used_in": [
              {
                "name": "Automated-Lead-Management-Email-Tracking-System",
                "how_used": "Utilized TypeScript to build interactive UI components, manage application state, and integrate with backend APIs in Automated-Lead-Management-Email-Tracking-System."
              },
              {
                "name": "BlueprintAI",
                "how_used": "Utilized TypeScript to build interactive UI components, manage application state, and integrate with backend APIs in BlueprintAI."
              },
              {
                "name": "health_automater",
                "how_used": "Utilized TypeScript to build interactive UI components, manage application state, and integrate with backend APIs in health_automater."
              },
              {
                "name": "job-hunter",
                "how_used": "Utilized TypeScript to build interactive UI components, manage application state, and integrate with backend APIs in job-hunter."
              },
              {
                "name": "LIVEX",
                "how_used": "Utilized TypeScript to build interactive UI components, manage application state, and integrate with backend APIs in LIVEX."
              },
              {
                "name": "mediq",
                "how_used": "Utilized TypeScript to build interactive UI components, manage application state, and integrate with backend APIs in mediq."
              }
            ]
          },
          {
            "skill": "CSS",
            "experience": "Intermediate",
            "used_in": [
              {
                "name": "Automated-Lead-Management-Email-Tracking-System",
                "how_used": "Designed and implemented responsive, accessible, and visually appealing user interfaces using CSS in Automated-Lead-Management-Email-Tracking-System."
              },
              {
                "name": "BlueprintAI",
                "how_used": "Designed and implemented responsive, accessible, and visually appealing user interfaces using CSS in BlueprintAI."
              },
              {
                "name": "health_automater",
                "how_used": "Designed and implemented responsive, accessible, and visually appealing user interfaces using CSS in health_automater."
              },
              {
                "name": "InsightForge",
                "how_used": "Designed and implemented responsive, accessible, and visually appealing user interfaces using CSS in InsightForge."
              },
              {
                "name": "job-hunter",
                "how_used": "Designed and implemented responsive, accessible, and visually appealing user interfaces using CSS in job-hunter."
              },
              {
                "name": "LIVEX",
                "how_used": "Designed and implemented responsive, accessible, and visually appealing user interfaces using CSS in LIVEX."
              },
              {
                "name": "mediq",
                "how_used": "Designed and implemented responsive, accessible, and visually appealing user interfaces using CSS in mediq."
              },
              {
                "name": "Market_website",
                "how_used": "Designed and implemented responsive, accessible, and visually appealing user interfaces using CSS in Market_website."
              },
              {
                "name": "resort",
                "how_used": "Designed and implemented responsive, accessible, and visually appealing user interfaces using CSS in resort."
              },
              {
                "name": "skills-getting-started-with-github-copilot",
                "how_used": "Designed and implemented responsive, accessible, and visually appealing user interfaces using CSS in skills-getting-started-with-github-copilot."
              },
              {
                "name": "tic-tac-toe-game",
                "how_used": "Designed and implemented responsive, accessible, and visually appealing user interfaces using CSS in tic-tac-toe-game."
              }
            ]
          },
          {
            "skill": "HTML",
            "experience": "Intermediate",
            "used_in": [
              {
                "name": "Automated-Lead-Management-Email-Tracking-System",
                "how_used": "Designed and implemented responsive, accessible, and visually appealing user interfaces using HTML in Automated-Lead-Management-Email-Tracking-System."
              },
              {
                "name": "BlueprintAI",
                "how_used": "Designed and implemented responsive, accessible, and visually appealing user interfaces using HTML in BlueprintAI."
              },
              {
                "name": "health_automater",
                "how_used": "Designed and implemented responsive, accessible, and visually appealing user interfaces using HTML in health_automater."
              },
              {
                "name": "InsightForge",
                "how_used": "Designed and implemented responsive, accessible, and visually appealing user interfaces using HTML in InsightForge."
              },
              {
                "name": "job-hunter",
                "how_used": "Designed and implemented responsive, accessible, and visually appealing user interfaces using HTML in job-hunter."
              },
              {
                "name": "LIVEX",
                "how_used": "Designed and implemented responsive, accessible, and visually appealing user interfaces using HTML in LIVEX."
              },
              {
                "name": "mediq",
                "how_used": "Designed and implemented responsive, accessible, and visually appealing user interfaces using HTML in mediq."
              },
              {
                "name": "Market_website",
                "how_used": "Designed and implemented responsive, accessible, and visually appealing user interfaces using HTML in Market_website."
              },
              {
                "name": "resort",
                "how_used": "Designed and implemented responsive, accessible, and visually appealing user interfaces using HTML in resort."
              },
              {
                "name": "skills-getting-started-with-github-copilot",
                "how_used": "Designed and implemented responsive, accessible, and visually appealing user interfaces using HTML in skills-getting-started-with-github-copilot."
              },
              {
                "name": "tic-tac-toe-game",
                "how_used": "Designed and implemented responsive, accessible, and visually appealing user interfaces using HTML in tic-tac-toe-game."
              },
              {
                "name": "localrepo",
                "how_used": "Designed and implemented responsive, accessible, and visually appealing user interfaces using HTML in localrepo."
              }
            ]
          },
          {
            "skill": "MDX",
            "experience": "Intermediate",
            "used_in": [
              {
                "name": "docs",
                "how_used": "Applied MDX in docs to implement core features, optimize performance, and deliver robust functionality."
              }
            ]
          }
        ]
      },
      {
        "name": "Backend",
        "skills": [
          {
            "skill": "Mako",
            "experience": "Intermediate",
            "used_in": [
              {
                "name": "mediq",
                "how_used": "Applied Mako in mediq to implement core features, optimize performance, and deliver robust functionality."
              }
            ]
          }
        ]
      }
    ]
  }
];

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
  
  const toggleProject = (skillName: string, projectIndex: number) => {
    setExpandedProjects(prev => ({
      ...prev,
      [skillName]: prev[skillName] === projectIndex ? null : projectIndex
    }));
  };

  let globalSkillIndex = 0;

  return (
    <div style={{ position: 'relative', width: '100%', minHeight: '100vh', padding: '2rem', overflowX: 'hidden' }}>


      {}
      <div className="tour-skillset-list" style={{ position: 'relative', zIndex: 1, maxWidth: '1400px', margin: '0 auto', paddingBottom: '20vh' }}>
        <section style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '2rem', marginBottom: '4rem' }}>
          <h1 className="display-md tour-skillset-header" style={{ textAlign: 'center', background: 'var(--bg-glass)', padding: '1rem 2rem', borderRadius: '12px', backdropFilter: 'blur(10px)' }}>
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
                                  <div
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
                                  >
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                                      <div style={{ fontSize: '1.1rem', fontWeight: 600 }}>{repo.name}</div>
                                      <div style={{ color: 'var(--text-secondary)' }}>
                                        {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                                      </div>
                                    </div>

                                      {isExpanded && (
                                        <div
                                          style={{ overflow: 'hidden' }}
                                        >
                                          <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--border-color)', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                                            <strong>How I used {data.skill}:</strong><br />
                                            {repo.how_used}
                                          </div>
                                        </div>
                                      )}
                                  </div>
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
