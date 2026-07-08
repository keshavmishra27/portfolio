

import projectsData from '../data/projects.json';

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
  return projectsData as Project[];
};
