import { useEffect, useRef, useState } from 'react';
import './AnimalModal.css';

const AnimalModal = ({ animal, isOpen, onClose }) => {
  const modalRef = useRef(null);
  const contentRef = useRef(null);
  const [imageIndex, setImageIndex] = useState(0);

  // Lock body scroll when open — position:fixed approach for reliable scroll lock
  useEffect(() => {
    if (isOpen) {
      const scrollY = window.scrollY;
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = '0';
      document.body.style.right = '0';
      setImageIndex(0);
      if (contentRef.current) contentRef.current.scrollTop = 0;
    } else {
      const scrollY = document.body.style.top;
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
      if (scrollY) window.scrollTo(0, parseInt(scrollY || '0') * -1);
    }
    return () => {
      const scrollY = document.body.style.top;
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
      if (scrollY) window.scrollTo(0, parseInt(scrollY || '0') * -1);
    };
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  // Close on backdrop click
  const handleBackdropClick = (e) => {
    if (e.target === modalRef.current) onClose();
  };

  if (!animal) return null;

  const nextImage = () => setImageIndex((prev) => (prev + 1) % animal.gallery.length);
  const prevImage = () => setImageIndex((prev) => (prev - 1 + animal.gallery.length) % animal.gallery.length);

  return (
    <div
      ref={modalRef}
      className={`animal-modal ${isOpen ? 'animal-modal--open' : ''}`}
      onClick={handleBackdropClick}
      aria-modal="true"
      role="dialog"
    >
      <div className="animal-modal__content" ref={contentRef}>
        {/* Close Button */}
        <button className="animal-modal__close" onClick={onClose} aria-label="Close">
          <svg viewBox="0 0 24 24" fill="none">
            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>

        {/* ---- Hero Image Gallery ---- */}
        <div className="animal-modal__hero">
          <div className="animal-modal__gallery">
            <img
              src={animal.gallery[imageIndex]}
              alt={`${animal.name} photo ${imageIndex + 1}`}
              className="animal-modal__hero-image"
              key={imageIndex}
              decoding="async"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = animal.image || 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=900&q=85';
              }}
            />
            <div className="animal-modal__gallery-overlay" />

            {/* Gallery Controls */}
            {animal.gallery.length > 1 && (
              <>
                <button className="animal-modal__gallery-btn animal-modal__gallery-btn--prev" onClick={prevImage} aria-label="Previous photo">
                  <svg viewBox="0 0 24 24" fill="none"><path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>
                <button className="animal-modal__gallery-btn animal-modal__gallery-btn--next" onClick={nextImage} aria-label="Next photo">
                  <svg viewBox="0 0 24 24" fill="none"><path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>
                <div className="animal-modal__gallery-dots">
                  {animal.gallery.map((_, i) => (
                    <button
                      key={i}
                      className={`animal-modal__gallery-dot ${i === imageIndex ? 'animal-modal__gallery-dot--active' : ''}`}
                      onClick={() => setImageIndex(i)}
                      aria-label={`Photo ${i + 1}`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Name overlay on hero */}
          <div className="animal-modal__hero-text">
            <span className={`animal-modal__status animal-modal__status--${animal.statusClass}`}>
              {animal.status}
            </span>
            <h2 className="animal-modal__name">{animal.name}</h2>
            <span className="animal-modal__breed">{animal.breed}</span>
            {animal.tagline && <p className="animal-modal__tagline">{animal.tagline}</p>}
          </div>
        </div>

        {/* ---- Heartwarming Message ---- */}
        <div className="animal-modal__section animal-modal__heart-section">
          <div className="animal-modal__heart-icon">💛</div>
          <blockquote className="animal-modal__quote">
            {animal.heartMessage}
          </blockquote>
        </div>

        {/* ---- Details Grid ---- */}
        <div className="animal-modal__section">
          <h3 className="animal-modal__section-title">About {animal.name}</h3>
          <p className="animal-modal__description">{animal.fullDescription}</p>

          <div className="animal-modal__details-grid">
            {animal.details.map((detail) => (
              <div className="animal-modal__detail" key={detail.label}>
                <span className="animal-modal__detail-label">{detail.label}</span>
                <span className="animal-modal__detail-value">{detail.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ---- Personality Traits ---- */}
        <div className="animal-modal__section">
          <h3 className="animal-modal__section-title">Personality</h3>
          <div className="animal-modal__traits">
            {animal.traits.map((trait) => (
              <span className="animal-modal__trait" key={trait}>{trait}</span>
            ))}
          </div>
        </div>

        {/* ---- Second Heartwarming Message ---- */}
        <div className="animal-modal__section animal-modal__heart-section animal-modal__heart-section--alt">
          <div className="animal-modal__heart-icon">🐾</div>
          <blockquote className="animal-modal__quote animal-modal__quote--alt">
            {animal.closingMessage}
          </blockquote>
        </div>

        {/* ---- Photo Strip ---- */}
        {animal.gallery.length > 2 && (
          <div className="animal-modal__section">
            <h3 className="animal-modal__section-title">More Moments</h3>
            <div className="animal-modal__photo-strip">
              {animal.gallery.slice(1).map((photo, i) => (
                <div className="animal-modal__photo-strip-item" key={i}>
                  <img
                    src={photo}
                    alt={`${animal.name} moment ${i + 2}`}
                    loading="lazy"
                    decoding="async"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = animal.image || 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=900&q=85';
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ---- Adopt CTA ---- */}
        <div className="animal-modal__section animal-modal__cta-section">
          <div className="animal-modal__cta-glow" />
          <h3 className="animal-modal__cta-title">
            Ready to give {animal.name} a forever home?
          </h3>
          <p className="animal-modal__cta-text">
            Every animal deserves love, warmth, and a family. Begin the adoption journey today.
          </p>
          <div className="animal-modal__cta-buttons">
            <a href="#contact" className="btn btn-primary btn-adopt" onClick={onClose}>
              Adopt {animal.name} ❤️
            </a>
            <a href="#contact" className="btn btn-secondary" onClick={onClose}>
              Ask Us a Question
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimalModal;
