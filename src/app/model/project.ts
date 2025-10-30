export interface Project {
  id?: number;
  title: string;
  description: string;
  longDescription?: string;
  techStack: string[];
  githubUrl: string;
  demoUrl?: string;
  imageUrl?: string;
}
