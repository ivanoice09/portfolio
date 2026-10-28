export type ProjectTab = 'description' | 'details' | 'tech-stack';

export interface ProjectVersion {
  label: string;
  url: string;
  active?: boolean;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  details: string; // or a structured object/array
  techStack: string[]; // or structured data
  versions: ProjectVersion[];
}
