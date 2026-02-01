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

export interface Education {
  degree: string;
  institution: string;
  period: string;
  description: string;
}

export interface Skill {
  name: string;
  level: number; // 1-5
}

export interface Skills {
  languages: Skill[];
  frontend: Skill[];
  backend: Skill[];
  devops: Skill[];
  architecture: Skill[];
  tools: Skill[];
  practices: string[];
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
  education: Education[];
  commands: Record<string, string>;
  colors: Colors;
}

export const config: Config = {
  // Terminal Settings
  username: "visitor",
  hostname: "terminal.chris.dev",
  title: "Terminal",

  // ASCII Art Banner (customize with your name)
  ascii: [
    "  ██████╗██╗  ██╗██████╗ ██╗███████╗    ███╗   ███╗ █████╗ ███████╗██╗  ██╗███████╗██╗   ██╗",
    " ██╔════╝██║  ██║██╔══██╗██║██╔════╝    ████╗ ████║██╔══██╗██╔════╝██║ ██╔╝██╔════╝╚██╗ ██╔╝",
    " ██║     ███████║██████╔╝██║███████╗    ██╔████╔██║███████║███████╗█████╔╝ █████╗   ╚████╔╝ ",
    " ██║     ██╔══██║██╔══██╗██║╚════██║    ██║╚██╔╝██║██╔══██║╚════██║██╔═██╗ ██╔══╝    ╚██╔╝  ",
    " ╚██████╗██║  ██║██║  ██║██║███████║    ██║ ╚═╝ ██║██║  ██║███████║██║  ██╗███████╗   ██║   ",
    "  ╚═════╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝╚══════╝    ╚═╝     ╚═╝╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝╚══════╝   ╚═╝   ",
  ],

  // About Section
  about: {
    greeting: "Welcome to my terminal portfolio!",
    description:
      "I'm a software engineer based in Kathmandu, Nepal, with a passion for building robust products and seamless user experiences.",
    details: [
      "Software Engineer at InvisiRisk, focusing on scalable monorepos and feature management",
      "Specialized in React, Next.js, TypeScript, and modern full-stack development",
      "Experienced in building both web and mobile applications (React Native)",
      "First Class Honours graduate in Computing from Islington College",
    ],
  },

  // Social Links
  social: {
    email: "chrismaskey@example.com", // Assuming a common pattern or maintaining placeholder
    github: "https://github.com/chrismaskey",
    linkedin: "https://linkedin.com/in/chrismaskey",
    twitter: "https://twitter.com/chrismaskey",
    website: "https://chrismaskey.com.np",
  },

  // Projects (add your projects here)
  projects: [
    {
      name: "Korra",
      description:
        "A comprehensive pet community platform featuring social networking, adoption management, and e-commerce.",
      tech: [
        "React",
        "Next.js",
        "TypeScript",
        "Supabase",
        "Tailwind CSS",
        "Stripe",
        "Leaflet",
      ],
      link: "https://github.com/chrismaskey/korra",
    },
    {
      name: "Station Control",
      description:
        "An internal monorepo system for feature flagging, plan-based access control, and billing management.",
      tech: [
        "React",
        "Next.js",
        "TypeScript",
        "Node.js",
        "PostgreSQL",
        "Drizzle",
        "Tailwind CSS",
      ],
      link: "https://github.com/chrismaskey/station-control",
    },
    {
      name: "Kharpan",
      description:
        "A mobile e-commerce application designed for groceries, focusing on a smooth shopping experience.",
      tech: ["React Native", "TypeScript"],
      link: "https://github.com/chrismaskey/kharpan",
    },
  ],

  // Skills with proficiency levels (1-5)
  skills: {
    languages: [
      { name: "TypeScript", level: 5 },
      { name: "JavaScript", level: 5 },
      { name: "Python", level: 4 },
      { name: "SQL", level: 4 },
    ],
    frontend: [
      { name: "React", level: 5 },
      { name: "Next.js", level: 5 },
      { name: "React Native", level: 4 },
      { name: "Tailwind CSS", level: 5 },
      { name: "HTML5", level: 5 },
      { name: "CSS3", level: 4 },
    ],
    backend: [
      { name: "Node.js", level: 4 },
      { name: "FastAPI", level: 3 },
      { name: "PostgreSQL", level: 4 },
      { name: "MySQL", level: 3 },
      { name: "REST APIs", level: 5 },
      { name: "GraphQL", level: 3 },
    ],
    devops: [
      { name: "Docker", level: 4 },
      { name: "AWS", level: 3 },
    ],
    architecture: [
      { name: "Monorepo", level: 4 },
      { name: "Feature Flags", level: 4 },
      { name: "System Design", level: 3 },
    ],
    tools: [
      { name: "Git", level: 5 },
      { name: "Neovim", level: 4 },
      { name: "Jira", level: 4 },
      { name: "Figma", level: 3 },
      { name: "Postman", level: 4 },
    ],
    practices: [
      "Full-Stack Development",
      "Performance Optimization",
      "Code Reviews",
      "Agile / Scrum",
    ],
  },

  // Experience
  experience: [
    {
      role: "Software Engineer",
      company: "InvisiRisk",
      period: "March 2025 - Present",
      description:
        "Developing and maintaining InvisiRisk, contributing across both frontend and backend, while also building internal monorepo systems for feature flagging and billing management.",
    },
    {
      role: "Junior Software Engineer",
      company: "Vertex Special Technology",
      period: "April 2024 - February 2025",
      description:
        "Maintained responsive web and mobile apps; reduced code errors by 25% through active reviews and Jira-based sprint management.",
    },
    {
      role: "Software Engineer (Trainee/Intern)",
      company: "Vertex Special Technology",
      period: "September 2023 - April 2024",
      description:
        "Progressed from intern to trainee, gaining hands-on experience in production-level software development.",
    },
  ],

  // Education
  education: [
    {
      degree: "BSc (Hons) in Computing",
      institution: "Islington College (London Metropolitan University)",
      period: "2020 - 2023",
      description:
        "Graduated with First Class Honours; focused on software engineering and computing principles.",
    },
    {
      degree: "School Leaving Certificate",
      institution: "Ace Higher Secondary School",
      period: "2018 - 2020",
      description: "Major in Computing and Economics; achieved a GPA of 3.27.",
    },
    {
      degree: "Secondary Education Examination",
      institution: "Brihaspati Vidya Sadan",
      period: "Completed 2018",
      description: "Achieved a GPA of 3.63.",
    },
  ],

  // Available Commands
  commands: {
    help: "Show available commands",
    about: "Display information about me",
    projects: "List my projects with links (usage: projects go <number>)",
    skills: "Show my technical skills",
    experience: "Display work experience",
    education: "Display education background",
    social: "Show social media links (usage: social go <number>)",
    contact: "Display contact information",
    gui: "Open my GUI portfolio",
    pwd: "Print working directory",
    themes: "Show available themes (usage: themes set <theme>)",
    clear: "Clear the terminal screen (Ctrl+L)",
    banner: "Show the ASCII art banner",
    whoami: "Display current user info",
    echo: "Print a message (usage: echo <message>)",
    history: "Show command history",
    repo: "Open the GitHub repository",
    welcome: "Display the welcome message",
  },

  // Colors (matching the terminal theme)
  colors: {
    primary: "#7ee787", // Green
    secondary: "#79c0ff", // Blue
    accent: "#e3b341", // Yellow
    error: "#ff7b72", // Red
    info: "#56d4dd", // Cyan
    muted: "#8b949e", // Gray
  },
};
