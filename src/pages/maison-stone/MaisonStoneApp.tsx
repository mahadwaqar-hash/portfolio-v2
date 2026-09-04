import CustomCursor from './components/CustomCursor';
import Hero from './components/Hero';
import Vision from './components/Vision';
import Showcase from './components/Showcase';
import Services from './components/Services';
import Contact from './components/Contact';

function App() {
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
