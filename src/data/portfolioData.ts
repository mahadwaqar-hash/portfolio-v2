export interface PortfolioProject {
  id: string;
  client: string;
  title: string;
  category: string;
  description: string;
  techStack: string[];
  metrics: string;
  liveUrl: string;
  imagePlaceholder: string;
  accentColor: string;
}

const projectModules = import.meta.glob('../content/projects/*.json', { eager: true });

// Convert the record of modules into an array and sort by ID
export const PORTFOLIO_PROJECTS: PortfolioProject[] = Object.values(projectModules)
  .map((module: any) => module.default || module)
  .sort((a, b) => {
    // Sort by ID to keep the 01, 02 order
    return a.id.localeCompare(b.id);
  });
