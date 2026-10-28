export type ProjectTab = 'description' | 'details' | 'preview';

export interface ProjectVersion {
  label: string;
  url: string;
  active?: boolean;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  documentation: string;
  sourceCodes: string[];
  versions: ProjectVersion[];
}
