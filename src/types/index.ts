export interface Project {
  name: string;
  description: string;
  image: string[];
  tools: string[];
  links: string[];
  featured?: boolean;
}

export interface TimelineEntry {
  header: string;
  subHeader: string;
  text: string;
  date: string;
  type: "work" | "school" | "military";
  technologies?: string[];
  link?: string;
  image?: string;
  finalProjectScore?: string;
}

export interface Skill {
  name: string;
  color: string;
  link: string;
  img: string;
}

export interface SkillSet {
  frontend: Skill[];
  backend: Skill[];
  crm: Skill[];
  misc: Skill[];
}

export interface NavLink {
  label: string;
  to: string;
  offset?: number;
  duration?: number;
}
