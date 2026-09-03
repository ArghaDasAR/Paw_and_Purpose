import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Testimonials.css';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    text: '"We adopted our dog Bruno from Paws & Purpose. The team made the entire process smooth, warm, and unforgettable. He\'s family now."',
    name: 'Verified Adopter',
    role: 'Dog Parent',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80',
  },
  {
    text: '"The quality of products here is unmatched. My cats only eat food from their store now. Plus, knowing they support animal rescue makes me feel great."',
    name: 'Devoted Pet Parent',
    role: 'Cat Guardian',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80',
  },
  {
    text: '"I volunteered at their shelter for a month. The compassion and care they show towards every animal is truly inspiring. Highly recommend supporting them."',
    name: 'Community Volunteer',
    role: 'Shelter Helper',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80',
  },
  {
    text: '"From grooming to nutrition advice, they treat my dog like family. The best pet care experience I\'ve ever had. Period."',
    name: 'Loyal Customer',
    role: 'Pet Care Member',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80',
  },
  {
    text: '"Our donation goes to a place where every rupee truly counts. Transparent, caring, and deeply committed to animal welfare."',
    name: 'Shelter Supporter',
    role: 'Monthly Donor',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80',
  },
];

const Testimonials = () => {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const headerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.from(headerRef.current.children, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: headerRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });

      // Apple-style horizontal scroll pinned section
      const track = trackRef.current;
      const totalWidth = track.scrollWidth - window.innerWidth;

      gsap.to(track, {
        x: -totalWidth,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: () => `+=${totalWidth}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="testimonials" className="testimonials-section" ref={sectionRef}>
      <div className="section-header testimonials__header container" ref={headerRef}>
        <span className="section-label">Real Stories</span>
        <h2 className="section-title">
          Pure devotion.<br />Cherished forever.
        </h2>
        <p className="section-subtitle">
          Real words from families whose lives were forever changed by a rescue.
        </p>
      </div>

      <div className="testimonials__track" ref={trackRef}>
        {/* Leading spacer */}
        <div className="testimonials__spacer" />

        {testimonials.map((testimonial, index) => (
          <div className="testimonial-card glass-card" key={index}>
            <div className="testimonial-card__stars">★★★★★</div>
            <blockquote className="testimonial-card__text">
              {testimonial.text}
            </blockquote>
            <div className="testimonial-card__author">
              <img
                src={testimonial.avatar}
                alt={testimonial.name}
                className="testimonial-card__avatar"
                loading="lazy"
              />
              <div>
                <span className="testimonial-card__name">{testimonial.name}</span>
                <span className="testimonial-card__role">{testimonial.role}</span>
              </div>
            </div>
          </div>
        ))}

        {/* Trailing spacer */}
        <div className="testimonials__spacer" />
      </div>
    </section>
  );
};

export default Testimonials;
