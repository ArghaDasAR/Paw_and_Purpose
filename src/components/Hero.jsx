import React, { Component, useEffect, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import ParticleField from './three/ParticleField';
import './Hero.css';

class WebGLErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error) {
    console.warn('WebGL ParticleField unavailable or error caught, falling back gracefully:', error);
  }
  render() {
    if (this.state.hasError) return null;
    return this.props.children;
  }
}

const Hero = () => {
  const heroRef = useRef(null);
  const contentRef = useRef(null);
  const [, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!heroRef.current) return;
      const heroHeight = heroRef.current.offsetHeight;
      const progress = Math.min(window.scrollY / heroHeight, 1);
      setScrollProgress(progress);

      if (contentRef.current) {
        const opacity = 1 - progress * 1.5;
        const translateY = window.scrollY * 0.35;
        const scale = 1 - progress * 0.08;
        contentRef.current.style.opacity = Math.max(opacity, 0);
        contentRef.current.style.transform = `translateY(${translateY}px) scale(${Math.max(scale, 0.88)})`;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="home" className="hero" ref={heroRef}>
      {/* Subtle Ambient 3D Particle Field with Mobile & Error Protection */}
      <div className="hero__canvas">
        <WebGLErrorBoundary>
          <Canvas
            camera={{ position: [0, 0, 5], fov: 45 }}
            dpr={[1, 1.5]}
            gl={{ powerPreference: 'low-power', antialias: false }}
            style={{ background: 'transparent' }}
          >
            <ParticleField count={40} color="#E85826" />
          </Canvas>
        </WebGLErrorBoundary>
      </div>

      {/* Soft Ambient Glow Backdrop */}
      <div className="hero__ambient-aura" />
      <div className="hero__gradient--bottom" />

      {/* Hero Typography & CTAs */}
      <div className="hero__content" ref={contentRef}>
        <div className="hero__badge-container">
          <span className="hero__label">Paws & Purpose</span>
        </div>

        <h1 className="hero__headline">
          Love has<br />
          <span className="hero__headline-accent">four paws.</span>
        </h1>

        <p className="hero__subheadline">
          Beautifully cared for. Endlessly loved. The most extraordinary bond begins here.
        </p>

        <div className="hero__buttons">
          <a href="#shop" className="btn btn-primary">
            Explore the Store
          </a>
          <a href="#animals" className="btn btn-secondary">
            Meet Your Match
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
