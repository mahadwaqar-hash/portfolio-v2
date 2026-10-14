import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView, useScroll, useSpring, useMotionValue } from 'framer-motion';

const metrics = [
  { 
    prefix: '<',
    target: 0.4,
    decimals: 1,
    suffix: 's',
    label: 'First Contentful Paint', 
    fullDescription: 'Sub-0.4s page load speed & First Contentful Paint across all viewports',
    color: '#DEC1FC',
    glowClass: 'hover:shadow-[0_0_35px_rgba(222,193,252,0.22)]'
  },
  { 
    prefix: '',
    target: 100,
    decimals: 0,
    suffix: '',
    label: 'Lighthouse Score', 
    fullDescription: '100/100 Google Lighthouse performance score on all production deployments',
    color: '#00B67A',
    glowClass: 'hover:shadow-[0_0_35px_rgba(0,182,122,0.22)]'
  },
  { 
    prefix: '',
    target: 10,
    decimals: 0,
    suffix: 'km',
    label: 'Geo-Radius Dominance', 
    fullDescription: '10km+ local search radius dominance outranking regional competitors',
    color: '#DEC1FC',
    glowClass: 'hover:shadow-[0_0_35px_rgba(222,193,252,0.22)]'
  },
  { 
    prefix: '',
    target: 14,
    decimals: 0,
    suffix: '',
    label: 'Production Flagships', 
    fullDescription: '14+ production digital flagships deployed worldwide with sub-second FCP',
    color: '#00B67A',
    glowClass: 'hover:shadow-[0_0_35px_rgba(0,182,122,0.22)]'
  },
];

const steps = [
  {
    num: '01',
    title: 'Tear apart the competition',
    desc: 'I look at your top 5 competitors\' sites, their backlink profiles, their schema markup (or lack of it), and their conversion paths. Then I build the blueprint to beat all of them.',
    duration: 'Week 1',
    accent: '#DEC1FC'
  },
  {
    num: '02',
    title: 'Build something unreasonable',
    desc: 'Zero templates. I write every component from scratch in React, wire up Framer Motion physics, obsess over the typography scale, and test on 12+ device viewports before you see a single preview.',
    duration: 'Weeks 2–3',
    accent: '#00B67A'
  },
  {
    num: '03',
    title: 'Launch and hand you the keys',
    desc: 'Deployed to Vercel edge nodes worldwide. I audit every JSON-LD schema, verify GSC indexing, run a final Lighthouse sweep, and hand over a 6-month SEO growth roadmap you can actually follow.',
    duration: 'Week 4',
    accent: '#DEC1FC'
  },
];

// Spring physics number counter component
function MetricCounter({
  target,
  decimals,
  suffix,
  inView,
}: {
  target: number;
  decimals: number;
  suffix: string;
  inView: boolean;
}) {
  const [displayValue, setDisplayValue] = useState(target);
  const motionVal = useMotionValue(0);
  const springVal = useSpring(motionVal, { stiffness: 70, damping: 16, mass: 1 });

  useEffect(() => {
    if (inView) {
      motionVal.set(target);
    }
  }, [inView, target, motionVal]);

  useEffect(() => {
    const unsubscribe = springVal.on('change', (latest) => {
      setDisplayValue(Number(latest.toFixed(decimals)));
    });
    return () => unsubscribe();
  }, [springVal, decimals]);

  return (
    <span>
      {displayValue.toFixed(decimals)}
      {suffix}
    </span>
  );
}

// Single step component with dynamic activation glow
function TimelineStepItem({
  step,
  isLast,
}: {
  step: typeof steps[0];
  isLast: boolean;
}) {
  const stepRef = useRef<HTMLDivElement>(null);
  const inView = useInView(stepRef, { margin: '-30% 0px -30% 0px', once: false });

  return (
    <div
      ref={stepRef}
      className={`relative flex gap-6 md:gap-10 py-10 ${!isLast ? 'border-b border-white/10' : ''}`}
    >
      {/* Node indicator with spring pop & neon halo */}
      <div className="relative z-10 flex flex-col items-center pt-1">
        <motion.div
          animate={{
            scale: inView ? 1.15 : 1,
            boxShadow: inView
              ? `0 0 20px ${step.accent}80`
              : '0 0 0px rgba(0,0,0,0)',
            borderColor: inView ? step.accent : 'rgba(255,255,255,0.2)',
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className="w-10 h-10 rounded-full bg-[#0E0E14] border flex items-center justify-center font-mono text-xs font-bold transition-colors duration-300"
          style={{ color: inView ? step.accent : '#A1A1AA' }}
        >
          {step.num}
        </motion.div>
      </div>

      {/* Step Content */}
      <div className="flex-1">
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <h3 className="font-tech text-xl md:text-2xl text-white font-bold tracking-tight">
            {step.title}
          </h3>
          <motion.span
            animate={{
              borderColor: inView ? `${step.accent}80` : 'rgba(255,255,255,0.1)',
              backgroundColor: inView ? `${step.accent}15` : 'rgba(255,255,255,0.03)',
              color: inView ? step.accent : '#D4D4D8',
            }}
            transition={{ duration: 0.3 }}
            className="font-mono text-[10px] border rounded-full px-3 py-0.5 uppercase tracking-wider font-semibold transition-colors duration-300 shadow-sm"
          >
            {step.duration}
          </motion.span>
        </div>
        <p className="font-body text-sm text-zinc-200 font-normal leading-relaxed max-w-lg">
          {step.desc}
        </p>
      </div>
    </div>
  );
}

export default function TrustMetricsSection() {
  const metricsRef = useRef<HTMLDivElement>(null);
  const metricsInView = useInView(metricsRef, { once: true, margin: '-100px' });

  const timelineContainerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: timelineContainerRef,
    offset: ['start 80%', 'end 60%'],
  });

  const laserScaleY = useSpring(scrollYProgress, {
    stiffness: 160,
    damping: 26,
  });

  return (
    <section id="process" className="relative w-full py-24 md:py-36 px-6 md:px-12 lg:px-24 bg-[#070709] border-t border-white/5">
      
      <div className="max-w-7xl mx-auto">
        
        {/* Spring Number Tickers Strip */}
        <div 
          ref={metricsRef}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-28 pb-16 border-b border-white/5"
        >
          {metrics.map((m, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -4, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 350, damping: 20 }}
              className={`p-5 rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-sm transition-all duration-300 flex flex-col justify-between ${m.glowClass}`}
            >
              <div className="flex items-baseline gap-1">
                {m.prefix && <span className="font-mono text-lg text-zinc-400 font-medium">{m.prefix}</span>}
                <span 
                  className="font-tech text-5xl sm:text-6xl md:text-7xl font-black tracking-tighter tabular-nums"
                  style={{ color: m.color }}
                >
                  <MetricCounter
                    target={m.target}
                    decimals={m.decimals}
                    suffix={m.suffix}
                    inView={metricsInView}
                  />
                </span>
              </div>
              <span className="font-mono text-xs text-zinc-300 uppercase tracking-widest mt-3 font-medium">
                {m.label}
                <span className="sr-only">: {m.fullDescription}</span>
              </span>
            </motion.div>
          ))}
        </div>

        {/* Methodology with Scroll-Driven Laser Timeline */}
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          
          {/* Left: Sticky Header */}
          <div className="lg:w-[35%] lg:sticky lg:top-32 lg:self-start">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-3 h-3 rounded-full border border-zinc-500" />
              <span className="font-mono text-xs tracking-widest uppercase text-zinc-400 font-semibold">
                04 // How it works
              </span>
              <div className="flex-1 h-[1px] bg-zinc-700" />
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-tech font-bold text-white tracking-tight leading-[1.05] mb-6">
              <span className="sr-only">Process: 4-Week Web Development & SEO Delivery Process — </span>
              Four weeks.<br />
              <span className="text-zinc-400">Zero hand-waving.</span>
            </h2>
            <p className="font-body text-sm sm:text-base text-zinc-300 font-normal leading-relaxed">
              Not "4–6 months" like an agency quotes you. 
              I run a tight, battle-tested pipeline because I've done this enough times 
              to know exactly what's needed and in what order.
            </p>
          </div>

          {/* Right: Timeline with Continuous Laser Beam */}
          <div ref={timelineContainerRef} className="relative lg:w-[65%] flex flex-col">
            
            {/* Background continuous track line */}
            <div className="absolute left-[19px] top-8 bottom-12 w-[2px] bg-white/10 rounded-full" aria-hidden="true">
              {/* Foreground scroll-driven laser progress line */}
              <motion.div
                style={{ scaleY: laserScaleY, transformOrigin: 'top' }}
                className="w-full h-full bg-gradient-to-b from-[#DEC1FC] via-[#00B67A] to-[#00B67A] shadow-[0_0_12px_rgba(0,182,122,0.8)] rounded-full will-change-transform"
              />
            </div>

            {steps.map((step, idx) => (
              <TimelineStepItem
                key={step.num}
                step={step}
                isLast={idx === steps.length - 1}
              />
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
