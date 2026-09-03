import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ShopModal from './ShopModal';
import './ShopSection.css';

gsap.registerPlugin(ScrollTrigger);

const shopItems = [
  {
    title: 'Pet Food',
    description: 'Pure vitality. Scientifically balanced nutrition tailored for every breed, stage, and appetite.',
    image: 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=600&q=80',
    alt: 'Premium pet food collection',
    tagline: 'Pure vitality. Zero compromise.',
    gallery: [
      'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=900&q=85',
      'https://images.unsplash.com/photo-1568640347023-a616a30bc3bd?w=900&q=85',
      'https://images.unsplash.com/photo-1600628421055-4d30de868b8f?w=900&q=85',
    ],
    fullDescription: 'Nutrition engineered with precision. Hand-selected recipes crafted with nutrient-dense, whole-food ingredients that fuel bounding energy, promote radiant coats, and support digestive harmony. Free from artificial fillers, designed strictly for health and longevity.',
    highlights: [
      { icon: '🥩', label: 'Prime Protein', desc: 'Real, ethically sourced meat and whole wholesome grains.' },
      { icon: '🧬', label: 'Targeted Formula', desc: 'Custom micro-nutrients calibrated for distinct life stages.' },
      { icon: '🌿', label: 'Clean & Grain-Free', desc: 'Gentle on digestion, formulated for sensitive stomachs.' },
      { icon: '✨', label: 'Radiant Coat', desc: 'Enriched with Omega-3 & 6 for visible shine and vitality.' },
    ],
    featured: [
      { name: 'Heritage Salmon & Rice', price: '₹2,400', image: 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=300&q=80' },
      { name: 'Grain-Free Field Blend', price: '₹1,800', image: 'https://images.unsplash.com/photo-1568640347023-a616a30bc3bd?w=300&q=80' },
      { name: 'Pure Kitten Starter Recipe', price: '₹1,200', image: 'https://images.unsplash.com/photo-1600628421055-4d30de868b8f?w=300&q=80' },
    ],
  },
  {
    title: 'Toys',
    description: 'Play unleashed. Ingeniously engineered toys that satisfy natural instincts and spark joyful minds.',
    image: 'https://images.unsplash.com/photo-1535294435445-d7249524ef2e?w=600&q=80',
    alt: 'Colorful pet toys collection',
    tagline: 'Joy in motion. Play reimagined.',
    gallery: [
      'https://images.unsplash.com/photo-1535294435445-d7249524ef2e?w=900&q=85',
      'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=900&q=85',
      'https://images.unsplash.com/photo-1591946614720-90a587da4a36?w=900&q=85',
    ],
    fullDescription: 'Play is where bonds deepen and minds ignite. Our toy collection combines durable, eco-friendly materials with thoughtful ergonomics to deliver hours of safe, stimulating engagement — from cerebral puzzle challenges to exhilarating fetch sessions.',
    highlights: [
      { icon: '🦴', label: 'Tough Chew Tech', desc: 'Indestructible, non-toxic natural rubber construction.' },
      { icon: '🧩', label: 'Brain Puzzles', desc: 'Multi-stage enrichment games that stimulate cognitive agility.' },
      { icon: '🧸', label: 'Plush Companions', desc: 'Reinforced double-stitched comfort toys for downtime.' },
      { icon: '⚡', label: 'Active Dynamics', desc: 'High-bounce, aerodynamic designs for outdoor athletics.' },
    ],
    featured: [
      { name: 'AeroBounce Ball', price: '₹650', image: 'https://images.unsplash.com/photo-1535294435445-d7249524ef2e?w=300&q=80' },
      { name: 'Knotted Natural Rope', price: '₹350', image: 'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=300&q=80' },
      { name: 'MindMaze Puzzle Feeder', price: '₹900', image: 'https://images.unsplash.com/photo-1591946614720-90a587da4a36?w=300&q=80' },
    ],
  },
  {
    title: 'Accessories',
    description: 'Everyday elegance. Ergonomically tailored leashes, orthopedic beds, and minimalist collars.',
    image: 'https://images.unsplash.com/photo-1541599540903-216a46ca1dc0?w=600&q=80',
    alt: 'Premium pet accessories',
    tagline: 'Quiet luxury. Uncompromised comfort.',
    gallery: [
      'https://images.unsplash.com/photo-1541599540903-216a46ca1dc0?w=900&q=85',
      'https://images.unsplash.com/photo-1567016432779-094069958ea5?w=900&q=85',
      'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=900&q=85',
    ],
    fullDescription: 'Designed to blend seamlessly into modern architecture and outdoor adventure alike. Built with aerospace-grade hardware, buttery-soft bridle leather, and breathable memory foam, each accessory delivers ultimate comfort for your companion and understated elegance for you.',
    highlights: [
      { icon: '🎀', label: 'Ergonomic Fit', desc: 'Pressure-dispersing chest harnesses that prevent neck strain.' },
      { icon: '🛏️', label: 'Orthopedic Support', desc: 'Multi-layer memory foam beds for deep, restorative sleep.' },
      { icon: '🍽️', label: 'Ceramic Bowls', desc: 'Weighted, non-skid, lead-free stoneware for healthy posture.' },
      { icon: '🏔️', label: 'All-Weather Ready', desc: 'Water-resistant, reflective materials built for durability.' },
    ],
    featured: [
      { name: 'Minimalist Leather Collar', price: '₹800', image: 'https://images.unsplash.com/photo-1541599540903-216a46ca1dc0?w=300&q=80' },
      { name: 'CloudRest Orthopedic Bed', price: '₹2,200', image: 'https://images.unsplash.com/photo-1567016432779-094069958ea5?w=300&q=80' },
      { name: 'ComfortGlide Leash', price: '₹550', image: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=300&q=80' },
    ],
  },
  {
    title: 'Grooming',
    description: 'Spa-grade botanical formulas. Nourishing coats, soothing skin, and leaving behind delicate, fresh scents.',
    image: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=600&q=80',
    alt: 'Professional pet grooming',
    tagline: 'Silky coats. Restored calm.',
    gallery: [
      'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=900&q=85',
      'https://images.unsplash.com/photo-1581888227599-779811939961?w=900&q=85',
      'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=900&q=85',
    ],
    fullDescription: 'Crafted with delicate, tearless plant actives, chamomile extracts, and colloidal oatmeal. Our grooming regimen turns routine baths into a rejuvenating ritual of relaxation, leaving their fur impeccably soft, untangled, and naturally luminous.',
    highlights: [
      { icon: '🛁', label: 'Gentle pH Balance', desc: 'Specifically formulated to protect delicate canine & feline skin.' },
      { icon: '✂️', label: 'Precision Brushes', desc: 'Hypoallergenic de-shedding tools that gently glide through fur.' },
      { icon: '💅', label: 'Paw & Nose Balm', desc: 'Organic beeswax blend for soothing cracked pads.' },
      { icon: '🦷', label: 'Oral Wellness', desc: 'Enzymatic tartar care for pristine dental hygiene.' },
    ],
    featured: [
      { name: 'Colloidal Oatmeal Elixir', price: '₹450', image: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=300&q=80' },
      { name: 'Ultra-Glide Deshedder', price: '₹600', image: 'https://images.unsplash.com/photo-1581888227599-779811939961?w=300&q=80' },
      { name: 'Enzyme Mint Dental Set', price: '₹350', image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=300&q=80' },
    ],
  },
  {
    title: 'Pet Care',
    description: 'Proactive wellness. Clinically formulated vitamins, mobility support, and stress-soothing botanical aids.',
    image: 'https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?w=600&q=80',
    alt: 'Pet health care and wellness',
    tagline: 'Vitality from the inside out.',
    gallery: [
      'https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?w=900&q=85',
      'https://images.unsplash.com/photo-1612531386530-97286d97c2d2?w=900&q=85',
      'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=900&q=85',
    ],
    fullDescription: 'True longevity is built every day. Developed in collaboration with holistic veterinary specialists, our wellness line provides preventive protection, strengthens natural immunity, maintains fluid joint mechanics, and keeps your companion agile well into their golden years.',
    highlights: [
      { icon: '💊', label: 'Daily Vitality', desc: 'Broad-spectrum vitamins and cold-pressed Omega-3.' },
      { icon: '🛡️', label: 'Shield & Protect', desc: 'Gentle, natural tick and flea defense without harsh chemicals.' },
      { icon: '🦴', label: 'Joint Lubrication', desc: 'Glucosamine + MSM complex for effortless spring in every step.' },
      { icon: '😌', label: 'Calming Balance', desc: 'Hemp and L-theanine drops for firework and travel serenity.' },
    ],
    featured: [
      { name: 'Daily Vital Complex', price: '₹700', image: 'https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?w=300&q=80' },
      { name: 'Botanical Defense Spray', price: '₹500', image: 'https://images.unsplash.com/photo-1612531386530-97286d97c2d2?w=300&q=80' },
      { name: 'Peaceful Mind Drops', price: '₹850', image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300&q=80' },
    ],
  },
  {
    title: 'Essentials',
    description: 'Flawless utility. Thoughtfully resolved travel gear, biodegradable waste solutions, and home sanctuaries.',
    image: 'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=600&q=80',
    alt: 'Pet essentials, bedding, and bowls',
    tagline: 'Simple. Intelligent. Indispensable.',
    gallery: [
      'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=900&q=85',
      'https://images.unsplash.com/photo-1601758174114-e711c0cbaa69?w=900&q=85',
      'https://images.unsplash.com/photo-1583511655826-05700d52f4d9?w=900&q=85',
    ],
    fullDescription: 'The everyday tools that turn pet stewardship into an effortless delight. Clean lines, odor-neutralizing materials, and intelligent collapsible designs make home management clean and travel remarkably stress-free.',
    highlights: [
      { icon: '🧹', label: 'Enzyme Cleaners', desc: '100% bio-enzymatic formulas that erase odors completely.' },
      { icon: '📦', label: 'Air-Certified Carriers', desc: 'Ultra-ventilated, padded travel sanctuaries with locking zippers.' },
      { icon: '🚽', label: 'Eco-Litter Systems', desc: 'Fast-clumping, dust-free plant fiber litter.' },
      { icon: '🗃️', label: 'FreshLock Vaults', desc: 'Silicone-sealed airtight food vaults that lock in freshness.' },
    ],
    featured: [
      { name: 'SkyBreeze Travel Pod', price: '₹1,800', image: 'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=300&q=80' },
      { name: 'EcoPaws Compostable Bags', price: '₹400', image: 'https://images.unsplash.com/photo-1601758174114-e711c0cbaa69?w=300&q=80' },
      { name: 'FreshLock Storage Bin', price: '₹550', image: 'https://images.unsplash.com/photo-1583511655826-05700d52f4d9?w=300&q=80' },
    ],
  },
];

const ShopSection = () => {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const cardsRef = useRef([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = (item) => {
    setSelectedItem(item);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setTimeout(() => setSelectedItem(null), 500);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headerRef.current.children, {
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: headerRef.current,
          start: 'top 80%',
          end: 'bottom 60%',
          toggleActions: 'play none none none',
        },
      });

      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.from(card, {
          y: 80,
          opacity: 0,
          rotateX: 10,
          scale: 0.94,
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

  const handleMouseMove = (e, card) => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `perspective(800px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg) translateY(-4px)`;
  };

  const handleMouseLeave = (card) => {
    card.style.transform = 'perspective(800px) rotateY(0deg) rotateX(0deg) translateY(0px)';
  };

  return (
    <>
      <section id="shop" className="section shop-section" ref={sectionRef}>
        <div className="container">
          <div className="section-header" ref={headerRef}>
            <span className="section-label">The Collection</span>
            <h2 className="section-title">
              Precision nutrition.<br />Play reinvented.
            </h2>
            <p className="section-subtitle">
              Obsessively curated for their health, comfort, and boundless joy.
            </p>
          </div>

          <div className="shop-grid">
            {shopItems.map((item, index) => (
              <article
                key={item.title}
                className="shop-card glass-card"
                ref={el => (cardsRef.current[index] = el)}
                onMouseMove={(e) => handleMouseMove(e, e.currentTarget)}
                onMouseLeave={(e) => handleMouseLeave(e.currentTarget)}
                onClick={() => openModal(item)}
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className="shop-card__image">
                  <img
                    src={item.image}
                    alt={item.alt}
                    loading="lazy"
                    decoding="async"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=600&q=80';
                    }}
                  />
                  <div className="shop-card__image-overlay">
                    <span className="shop-card__explore">Explore Details →</span>
                  </div>
                </div>
                <div className="shop-card__content">
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </article>
            ))}
          </div>

          <div className="shop-section__cta">
            <a href="#contact" className="btn btn-primary">Inquire & Order</a>
          </div>
        </div>
      </section>

      <ShopModal
        item={selectedItem}
        isOpen={modalOpen}
        onClose={closeModal}
      />
    </>
  );
};

export default ShopSection;
