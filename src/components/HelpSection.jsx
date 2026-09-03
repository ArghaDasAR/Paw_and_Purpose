import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './HelpSection.css';

gsap.registerPlugin(ScrollTrigger);

const HelpSection = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);
  const statsRef = useRef(null);
  const [statsAnimated, setStatsAnimated] = useState(false);
  const statRefs = useRef([]);

  const stats = [
    { target: 250, label: 'Animals Rehabilitated' },
    { target: 120, label: 'Forever Homes Found' },
    { target: 500, label: 'Nourishing Meals Served' },
  ];

  const animateCounter = (element, target) => {
    const duration = 2000;
    const start = performance.now();
    const step = (timestamp) => {
      const elapsed = timestamp - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      element.textContent = Math.round(eased * target);
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.from(card, {
          y: 60,
          opacity: 0,
          rotateY: -10,
          scale: 0.94,
          duration: 0.9,
          delay: i * 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        });
      });

      if (statsRef.current) {
        ScrollTrigger.create({
          trigger: statsRef.current,
          start: 'top 75%',
          onEnter: () => {
            if (!statsAnimated) {
              setStatsAnimated(true);
              statRefs.current.forEach((el, i) => {
                if (el) animateCounter(el, stats[i].target);
              });
            }
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [statsAnimated]);

  return (
    <section id="help" className="section help-section" ref={sectionRef}>
      <div className="help-section__bg" />

      <div className="container">
        <div className="section-header">
          <span className="section-label">A Movement for Life</span>
          <h2 className="section-title">
            Every soul cherished.<br />Every life transformed.
          </h2>
          <p className="section-subtitle">
            Rescue isn’t simply about shelter. It’s about restoring dignity, healing fragile spirits, and weaving lifelong companionship.
          </p>
        </div>

        {/* Action Cards */}
        <div className="help-cards">
          <article className="help-card glass-card" ref={el => (cardsRef.current[0] = el)}>
            <div className="help-card__icon">
              <svg viewBox="0 0 48 48" fill="none">
                <path d="M24 44C24 44 4 32 4 18C4 10 10 4 18 4C22 4 24 8 24 8C24 8 26 4 30 4C38 4 44 10 44 18C44 32 24 44 24 44Z" stroke="currentColor" strokeWidth="2.5" fill="none"/>
              </svg>
            </div>
            <h3>Adopt</h3>
            <p>Open your heart. Give an extraordinary soul the forever home they dream of.</p>
            <a href="#animals" className="help-card__link">Meet your soulmate →</a>
          </article>

          <article className="help-card glass-card" ref={el => (cardsRef.current[1] = el)}>
            <div className="help-card__icon">
              <svg viewBox="0 0 48 48" fill="none">
                <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="2.5" fill="none"/>
                <path d="M24 12V36M16 20L24 12L32 20" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3>Nourish & Heal</h3>
            <p>Direct medical aid, organic meals, and warm bedding for rescued animals.</p>
            <a href="#contact" className="help-card__link">Support the mission →</a>
          </article>

          <article className="help-card glass-card" ref={el => (cardsRef.current[2] = el)}>
            <div className="help-card__icon">
              <svg viewBox="0 0 48 48" fill="none">
                <path d="M20 20C23.3137 20 26 17.3137 26 14C26 10.6863 23.3137 8 20 8C16.6863 8 14 10.6863 14 14C14 17.3137 16.6863 20 20 20Z" stroke="currentColor" strokeWidth="2.5"/>
                <path d="M6 40V36C6 31.5817 9.58172 28 14 28H26C30.4183 28 34 31.5817 34 36V40" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
                <path d="M36 20L36 32M30 26H42" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
              </svg>
            </div>
            <h3>Volunteer</h3>
            <p>Lend your hands and warmth. Experience the pure joy of healing animals firsthand.</p>
            <a href="#contact" className="help-card__link">Join the sanctuary →</a>
          </article>
        </div>

        {/* Impact Statistics */}
        <div className="impact-stats" ref={statsRef}>
          {stats.map((stat, index) => (
            <div className="impact-stat" key={stat.label}>
              {index > 0 && <div className="impact-divider" />}
              <div className="impact-stat__content">
                <span className="impact-stat__number">
                  <span ref={el => (statRefs.current[index] = el)}>0</span>
                  <span className="impact-stat__suffix">+</span>
                </span>
                <span className="impact-stat__label">{stat.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HelpSection;
