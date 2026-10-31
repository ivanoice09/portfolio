import { Documentation } from "./Documentation";
import { TechStack } from "./TechStack";

export interface Project {
    id: number,
    name: string,
    descriptionKey?: string,
    demoUrlKey?: string,
    techStackKey?: TechStack[],
    docs: Documentation[],
}