const API_BASE = 'http://localhost:8000/api';

export interface Project {
  id: string;
  name: string;
  description: string;
  tech_stack: string[];
  problem: string;
  solution: string;
  challenges: string;
  results: string;
  github_url: string;
  demo_url: string;
  timeline: string;
  roomPosition?: [number, number, number];
  video_url?: string;
}

export const fetchProjects = async (): Promise<Project[]> => {
  try {
    const res = await fetch(`${API_BASE}/projects`);
    if (!res.ok) throw new Error('Failed to fetch projects');
    return await res.json();
  } catch (err) {
    console.error(err);
    return [];
  }
};
