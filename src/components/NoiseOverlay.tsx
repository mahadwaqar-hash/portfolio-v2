import React from 'react';

export default function NoiseOverlay() {
  return (
    <div 
      className="liquid-noise pointer-events-none transform-gpu" 
      style={{ backfaceVisibility: 'hidden', transform: 'translate3d(0, 0, 0)' }} 
      aria-hidden="true" 
    />
  );
}
