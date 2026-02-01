/**
 * Portfolio Configuration
 * Edit this file to customize your terminal portfolio
 */

export interface Project {
  name: string;
  description: string;
  tech: string[];
  link: string;
}

export interface Experience {
  role: string;
  company: string;
  period: string;
  description: string;
}

export interface Skills {
  languages: string[];
  frontend: string[];
  backend: string[];
  tools: string[];
}

export interface Social {
  email: string;
  github: string;
  linkedin: string;
  twitter: string;
  website: string;
}

export interface About {
  greeting: string;
  description: string;
  details: string[];
}

export interface Colors {
  primary: string;
  secondary: string;
  accent: string;
  error: string;
  info: string;
  muted: string;
}

export interface Config {
  username: string;
  hostname: string;
  title: string;
  ascii: string[];
  about: About;
  social: Social;
  projects: Project[];
  skills: Skills;
  experience: Experience[];
  commands: Record<string, string>;
  colors: Colors;
}

export const config: Config = {
  // Terminal Settings
  username: "guest",
  hostname: "portfolio.dev",
  title: "Chris's Terminal",
  
  // ASCII Art Banner (customize with your name)
  ascii: [
    " ██████╗██████╗ ██╗███████╗███████╗",
    "██╔════╝██╔══██╗██║██╔════╝██╔════╝",
    "██║     ██████╔╝██║█████╗  ███████╗",
    "██║     ██╔══██╗██║██╔══╝  ╚════██║",
    "╚██████╗██║  ██║██║██║     ███████║",
    " ╚═════╝╚═╝  ╚═╝╚═╝╚═╝     ╚══════╝",
    "                                   ",
    "   Software Developer | Nepal       ",
  ],
  
  // About Section
  about: {
    greeting: "Welcome to my terminal portfolio!",
    description: "I'm a software developer with a background in product management, based in Kathmandu, Nepal.",
    details: [
      "Passionate about building products that solve real problems",
      "Love working with React, Next.js, TypeScript, and modern web technologies",
      "Experienced in both frontend development and product strategy",
      "Always learning and exploring new technologies"
    ]
  },
  
  // Social Links
  social: {
    email: "your.email@example.com",
    github: "https://github.com/your-github-username",
    linkedin: "https://linkedin.com/in/your-linkedin-username",
    twitter: "https://twitter.com/your-twitter-handle",
    website: "https://your-website.com"
  },
  
  // Projects (add your projects here)
  projects: [
    {
      name: "Project One",
      description: "A brief description of your first project",
      tech: ["React", "Next.js", "TypeScript"],
      link: "https://github.com/yourusername/project-one"
    },
    {
      name: "Project Two",
      description: "Description of your second project",
      tech: ["Node.js", "Express", "MongoDB"],
      link: "https://github.com/yourusername/project-two"
    },
    {
      name: "Project Three",
      description: "Another amazing project you've built",
      tech: ["Python", "Django", "PostgreSQL"],
      link: "https://github.com/yourusername/project-three"
    }
  ],
  
  // Skills
  skills: {
    languages: ["TypeScript", "JavaScript", "Python", "SQL"],
    frontend: ["React", "Next.js", "Tailwind CSS", "HTML/CSS"],
    backend: ["Node.js", "Express", "PostgreSQL", "MongoDB"],
    tools: ["Git", "Docker", "Figma", "VS Code"]
  },
  
  // Experience
  experience: [
    {
      role: "Software Developer",
      company: "Current Company",
      period: "2023 - Present",
      description: "Building amazing products and features"
    },
    {
      role: "Product Manager",
      company: "Previous Company",
      period: "2020 - 2023",
      description: "Led product development and strategy"
    }
  ],
  
  // Available Commands
  commands: {
    help: "Show available commands",
    about: "Display information about me",
    projects: "List my projects with links",
    skills: "Show my technical skills",
    experience: "Display work experience",
    social: "Show social media links",
    contact: "Display contact information",
    clear: "Clear the terminal screen",
    banner: "Show the ASCII art banner",
    whoami: "Display current user info",
    date: "Show current date and time",
    echo: "Print a message (usage: echo <message>)",
    history: "Show command history",
    repo: "Open the GitHub repository"
  },
  
  // Colors (matching the terminal theme)
  colors: {
    primary: "#7ee787",    // Green
    secondary: "#79c0ff",  // Blue
    accent: "#e3b341",     // Yellow
    error: "#ff7b72",      // Red
    info: "#56d4dd",       // Cyan
    muted: "#8b949e"       // Gray
  }
};
