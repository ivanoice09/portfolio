import { Documentation } from "./Documentation";
import { TechStack } from "./TechStack";

export interface Project {
    id: number,
    name: string,
    description?: string,
    demoUrl?: string,
    techStack?: TechStack[],
    docs: Documentation[],
}