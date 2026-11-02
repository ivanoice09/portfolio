import { Documentation } from "./documentation";
import { TechStack } from "./tech-stack";

export interface Project {
    id: number,
    name: string,
    descriptionKey?: string,
    demoUrlKey?: string,
    techStackKey?: TechStack[],
    docs: Documentation[],
}   