export default function Contact() {
  return (
    <section className="min-h-[80vh] flex flex-col items-center justify-center bg-brand-ms-graphite px-4 sm:px-6 relative border-t border-brand-ms-bronze/20 py-24 md:py-0">
      
      <div className="absolute top-8 md:top-12 left-6 md:left-24 z-20">
        <h3 className="text-[10px] md:text-xs tracking-[0.3em] text-brand-ms-bronze uppercase font-ms-body">04 &mdash; The Commission</h3>
      </div>

      <div className="z-10 text-center max-w-2xl w-full mt-12 md:mt-24">
        <h2 className="text-4xl md:text-7xl font-ms-heading text-brand-ms-alabaster mb-8 md:mb-12">
          Commission a Masterpiece.
        </h2>
        
        <form className="glass-panel p-6 md:p-12 rounded-xl backdrop-blur-md bg-white/5 border border-white/10 flex flex-col gap-6 text-left">
          
          <div className="flex flex-col gap-2">
            <label className="text-[10px] md:text-xs tracking-widest text-brand-ms-linen uppercase">Full Name</label>
            <input 
              type="text" 
              className="bg-transparent border-b border-brand-ms-linen/30 text-brand-ms-alabaster py-2 outline-none focus:border-brand-ms-bronze transition-colors text-sm md:text-base"
              placeholder="e.g. Eleanor Vance"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[10px] md:text-xs tracking-widest text-brand-ms-linen uppercase">Space Type</label>
            <input 
              type="text" 
              className="bg-transparent border-b border-brand-ms-linen/30 text-brand-ms-alabaster py-2 outline-none focus:border-brand-ms-bronze transition-colors text-sm md:text-base"
              placeholder="e.g. Private Residence, Penthouse, Gallery"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[10px] md:text-xs tracking-widest text-brand-ms-linen uppercase">Budget Tier</label>
            <select className="bg-transparent border-b border-brand-ms-linen/30 text-brand-ms-alabaster py-2 outline-none focus:border-brand-ms-bronze transition-colors appearance-none cursor-pointer text-sm md:text-base">
              <option value="" className="text-brand-ms-obsidian">Select Tier...</option>
              <option value="tier1" className="text-brand-ms-obsidian">$500k - $1M</option>
              <option value="tier2" className="text-brand-ms-obsidian">$1M - $5M</option>
              <option value="tier3" className="text-brand-ms-obsidian">$5M+</option>
            </select>
          </div>

          <button 
            type="submit"
            className="mt-6 md:mt-8 bg-transparent border border-brand-ms-bronze text-brand-ms-bronze hover:bg-brand-ms-bronze hover:text-brand-ms-obsidian transition-colors duration-500 px-8 md:px-12 py-4 uppercase tracking-[0.2em] text-[10px] md:text-xs self-center w-full md:w-auto"
          >
            Submit Inquiry
          </button>
        </form>
      </div>

    </section>
  );
}
