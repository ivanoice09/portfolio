import { TechStack } from "./TechStack";

export interface Project {
    id: number,
    name: string,
    description?: string,
    url?: string,
    techStack?: TechStack[],
}