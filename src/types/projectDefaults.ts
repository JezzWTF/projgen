import type { ProjectFormData } from './project';

export const INITIAL_PROJECT_FORM_DATA: ProjectFormData = {
  id: '',
  title: '',
  description: '',
  longDescription: '',
  status: 'Live',
  lastUpdated: '',
  color: 'from-blue-400 to-cyan-500',
  featured: false,
  url: '',
  github: '',
  isOpenSource: true,
  icon: '',
  tech: [],
  features: [],
  challenges: [],
  screenshots: [],
  content: [],
  galleryFolder: '',
  hideVisualSection: false,
  hideProjectInfo: false,
  hideTechStack: false,
  special: false,
};

export const EXAMPLE_PROJECT_FORM_DATA: ProjectFormData = {
  id: "example-project",
  title: "Example Project",
  description: "A comprehensive web application showcasing modern development practices",
  longDescription: "This project demonstrates full-stack development capabilities with React, TypeScript, and modern deployment practices. It serves as a portfolio piece highlighting technical skills and problem-solving abilities.",
  status: "Live",
  lastUpdated: "01-06-2025",
  color: "from-blue-400 to-cyan-500",
  featured: true,
  url: "https://tool.jezz.wtf",
  github: "JezzWTF/example-project",
  isOpenSource: true,
  icon: "Rocket",
  tech: ["React", "TypeScript", "Tailwind CSS", "Vite"],
  features: [
    "Modern responsive design",
    "Real-time data updates",
    "User authentication",
    "Performance optimized"
  ],
  challenges: [
    "Implementing complex state management",
    "Optimizing for mobile performance",
    "Creating reusable component architecture"
  ],
  screenshots: [
    "/img/screens/example-main.png",
    "/img/screens/example-dashboard.png"
  ],
  content: [
    {
      title: "Development Approach",
      text: "This project follows modern development practices with a focus on maintainability and scalability.",
      type: "paragraph"
    },
    {
      title: "Key Learnings",
      text: "Advanced React patterns and hooks\nTypeScript best practices\nModern CSS techniques",
      type: "list"
    }
  ],
  galleryFolder: "example-gallery",
  hideVisualSection: false,
  hideProjectInfo: false,
  hideTechStack: false,
  special: false,
}; 