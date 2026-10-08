import { useEffect } from 'react';
import CustomCursor from './components/CustomCursor';
import Hero from './components/Hero';
import Vision from './components/Vision';
import Showcase from './components/Showcase';
import Services from './components/Services';
import Contact from './components/Contact';

function App() {
  useEffect(() => {
    window.scrollTo(0, 0);
    // Update Document Title & Favicon for Maison Stone route
    document.title = 'Maison Stone | Haute Couture Architectural Interior Design';
    const link = document.querySelector("link[rel~='icon']") as HTMLLinkElement;
    if (link) {
      link.href = '/maison_favicon.jpg';
    }
    
    // Cleanup to restore portfolio favicon on unmount
    return () => {
      document.title = 'Website Development Lahore | Premium Web Architecture | Muhammad Mahad Waqar Piracha';
      if (link) link.href = '/favicon.jpg';
    };
  }, []);

  return (
    <main className="bg-brand-ms-obsidian min-h-screen text-brand-ms-alabaster selection:bg-brand-ms-bronze selection:text-brand-ms-obsidian">
      <CustomCursor />
      <Hero />
      <Vision />
      <Showcase />
      <Services />
      <Contact />
    </main>
  );
}

export default App;
