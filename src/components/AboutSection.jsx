import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './AboutSection.css';

gsap.registerPlugin(ScrollTrigger);

const values = [
  {
    title: 'Clinical Expertise',
    description: 'Decades of veterinary insight driving our nutritional criteria and ethical care guidelines.',
    icon: (
      <svg viewBox="0 0 40 40" fill="none">
        <path d="M20 4L24.5 14.5L36 16L27.5 24L30 36L20 30L10 36L12.5 24L4 16L15.5 14.5L20 4Z" stroke="currentColor" strokeWidth="2" fill="none"/>
      </svg>
    ),
  },
  {
    title: 'Uncompromised Quality',
    description: 'Every product rigorously tested, vet-approved, and built to elevate your pet’s daily life.',
    icon: (
      <svg viewBox="0 0 40 40" fill="none">
        <path d="M8 34V18L20 6L32 18V34H24V24H16V34H8Z" stroke="currentColor" strokeWidth="2" fill="none"/>
      </svg>
    ),
  },
  {
    title: 'Compassion at Scale',
    description: 'Rescue, rehabilitation, and rehoming — not an afterthought, but the core reason we exist.',
    icon: (
      <svg viewBox="0 0 40 40" fill="none">
        <path d="M20 36C20 36 4 28 4 16C4 10 8 6 14 6C17 6 20 9 20 9C20 9 23 6 26 6C32 6 36 10 36 16C36 28 20 36 20 36Z" stroke="currentColor" strokeWidth="2" fill="none"/>
      </svg>
    ),
  },
  {
    title: 'Conscious Matching',
    description: 'We don’t just place pets. We harmonize lifestyles to forge harmonious, lifelong bonds.',
    icon: (
      <svg viewBox="0 0 40 40" fill="none">
        <circle cx="20" cy="14" r="8" stroke="currentColor" strokeWidth="2"/>
        <path d="M8 36C8 28 13.4 24 20 24C26.6 24 32 28 32 36" stroke="currentColor" strokeWidth="2"/>
        <path d="M28 10L34 4M34 4V10M34 4H28" stroke="currentColor" strokeWidth="2"/>
      </svg>
    ),
  },
  {
    title: 'Enduring Community',
    description: 'An interconnected family of devoted guardians, foster parents, and animal advocates.',
    icon: (
      <svg viewBox="0 0 40 40" fill="none">
        <circle cx="20" cy="12" r="6" stroke="currentColor" strokeWidth="2"/>
        <circle cx="10" cy="22" r="4" stroke="currentColor" strokeWidth="2"/>
        <circle cx="30" cy="22" r="4" stroke="currentColor" strokeWidth="2"/>
        <path d="M14 30C14 26 16.7 24 20 24C23.3 24 26 26 26 30" stroke="currentColor" strokeWidth="2"/>
      </svg>
    ),
  },
];

const AboutSection = () => {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headerRef.current.children, {
        y: 40,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: headerRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });

      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.from(card, {
          rotateY: 20,
          opacity: 0,
          y: 40,
          scale: 0.92,
          duration: 0.9,
          delay: i * 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" className="section about-section" ref={sectionRef}>
      <div className="container">
        <div className="section-header" ref={headerRef}>
          <span className="section-label">The Standard</span>
          <h2 className="section-title">
            Built for Pets.<br />Trusted by Generations.
          </h2>
          <p className="section-subtitle">
            An unwavering commitment to quality, welfare, and the profound beauty of animal companionship.
          </p>
        </div>

        <div className="values-grid">
          {values.map((value, index) => (
            <article
              key={value.title}
              className="value-card glass-card"
              ref={el => (cardsRef.current[index] = el)}
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className="value-card__icon">{value.icon}</div>
              <h3>{value.title}</h3>
              <p>{value.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
