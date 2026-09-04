import { useRef } from 'react';
import { useInView } from 'framer-motion';

const SERVICES = [
  {
    num: "01",
    title: "Spatial Architecture",
    desc: "Reimagining volumes and structural flows to maximize natural light and geometric harmony.",
    img: "https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=800&auto=format&fit=crop"
  },
  {
    num: "02",
    title: "Bespoke Furnishings",
    desc: "Custom-crafted pieces in rare materials, designed specifically for your unique space and lifestyle.",
    img: "https://images.unsplash.com/photo-1600121848594-d8644e57abab?q=80&w=800&auto=format&fit=crop"
  },
  {
    num: "03",
    title: "Artistic Curation",
    desc: "Sourcing museum-quality art and rare antiquities that elevate the home into a private gallery.",
    img: "https://images.unsplash.com/photo-1600210491369-e753d80a41f3?q=80&w=800&auto=format&fit=crop"
  }
];

export default function Services() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-32 px-6 md:px-24 bg-brand-ms-obsidian">
      
      <div className="mb-20 text-center">
        <h3 className="text-xs tracking-[0.3em] text-brand-ms-bronze uppercase font-ms-body mb-6">03 &mdash; Anatomy of Luxury</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 max-w-7xl mx-auto">
        {SERVICES.map((srv, idx) => (
          <div key={idx} className="flex flex-col">
            <div className={`overflow-hidden mb-8 h-[60vh] mask-up ${isInView ? 'in-view' : ''}`} style={{ transitionDelay: `${idx * 0.2}s` }}>
              <img 
                src={srv.img} 
                alt={srv.title} 
                className="w-full h-full object-cover transition-transform duration-1000 hover:scale-110"
              />
            </div>
            
            <div className="flex items-start gap-4">
              <span className="font-ms-heading text-brand-ms-bronze text-3xl italic">{srv.num}</span>
              <div>
                <h4 className="font-ms-heading text-2xl text-brand-ms-alabaster mb-4 uppercase tracking-widest">{srv.title}</h4>
                <p className="font-ms-body text-brand-ms-linen text-sm leading-relaxed max-w-sm">
                  {srv.desc}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
