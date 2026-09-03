import { useEffect, useRef, useState } from 'react';
import './ShopModal.css';

const ShopModal = ({ item, isOpen, onClose }) => {
  const modalRef = useRef(null);
  const contentRef = useRef(null);
  const [imageIndex, setImageIndex] = useState(0);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.top = `-${window.scrollY}px`;
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

  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
    if (isOpen) window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  const handleBackdropClick = (e) => {
    if (e.target === modalRef.current) onClose();
  };

  if (!item) return null;

  const nextImage = () => setImageIndex((prev) => (prev + 1) % item.gallery.length);
  const prevImage = () => setImageIndex((prev) => (prev - 1 + item.gallery.length) % item.gallery.length);

  return (
    <div
      ref={modalRef}
      className={`shop-modal ${isOpen ? 'shop-modal--open' : ''}`}
      onClick={handleBackdropClick}
      aria-modal="true"
      role="dialog"
    >
      <div className="shop-modal__content" ref={contentRef}>
        {/* Close */}
        <button className="shop-modal__close" onClick={onClose} aria-label="Close">
          <svg viewBox="0 0 24 24" fill="none">
            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>

        {/* Hero Gallery */}
        <div className="shop-modal__hero">
          <div className="shop-modal__gallery">
            <img
              src={item.gallery[imageIndex]}
              alt={`${item.title} photo ${imageIndex + 1}`}
              className="shop-modal__hero-image"
              key={imageIndex}
              decoding="async"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = item.image || 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=900&q=85';
              }}
            />
            <div className="shop-modal__gallery-overlay" />

            {item.gallery.length > 1 && (
              <>
                <button className="shop-modal__gallery-btn shop-modal__gallery-btn--prev" onClick={prevImage} aria-label="Previous photo">
                  <svg viewBox="0 0 24 24" fill="none"><path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>
                <button className="shop-modal__gallery-btn shop-modal__gallery-btn--next" onClick={nextImage} aria-label="Next photo">
                  <svg viewBox="0 0 24 24" fill="none"><path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>
                <div className="shop-modal__gallery-dots">
                  {item.gallery.map((_, i) => (
                    <button
                      key={i}
                      className={`shop-modal__gallery-dot ${i === imageIndex ? 'shop-modal__gallery-dot--active' : ''}`}
                      onClick={() => setImageIndex(i)}
                      aria-label={`Photo ${i + 1}`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>

          <div className="shop-modal__hero-text">
            <h2 className="shop-modal__title">{item.title}</h2>
            <span className="shop-modal__tagline">{item.tagline}</span>
          </div>
        </div>

        {/* Description */}
        <div className="shop-modal__section">
          <h3 className="shop-modal__section-title">About This Category</h3>
          <p className="shop-modal__description">{item.fullDescription}</p>
        </div>

        {/* Highlights */}
        <div className="shop-modal__section">
          <h3 className="shop-modal__section-title">What We Offer</h3>
          <div className="shop-modal__highlights">
            {item.highlights.map((highlight) => (
              <div className="shop-modal__highlight" key={highlight.label}>
                <span className="shop-modal__highlight-icon">{highlight.icon}</span>
                <div>
                  <span className="shop-modal__highlight-label">{highlight.label}</span>
                  <span className="shop-modal__highlight-desc">{highlight.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Featured Products */}
        {item.featured && (
          <div className="shop-modal__section">
            <h3 className="shop-modal__section-title">Featured Products</h3>
            <div className="shop-modal__featured-grid">
              {item.featured.map((product, i) => (
                <div className="shop-modal__featured-item" key={i}>
                  <div className="shop-modal__featured-image">
                    <img
                      src={product.image}
                      alt={product.name}
                      loading="lazy"
                      decoding="async"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=300&q=80';
                      }}
                    />
                  </div>
                  <div className="shop-modal__featured-info">
                    <span className="shop-modal__featured-name">{product.name}</span>
                    <span className="shop-modal__featured-price">{product.price}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Photo Strip */}
        {item.gallery.length > 2 && (
          <div className="shop-modal__section">
            <h3 className="shop-modal__section-title">Gallery</h3>
            <div className="shop-modal__photo-strip">
              {item.gallery.slice(1).map((photo, i) => (
                <div className="shop-modal__photo-strip-item" key={i}>
                  <img
                    src={photo}
                    alt={`${item.title} ${i + 2}`}
                    loading="lazy"
                    decoding="async"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = item.image || 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=900&q=85';
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="shop-modal__section shop-modal__cta-section">
          <div className="shop-modal__cta-glow" />
          <h3 className="shop-modal__cta-title">Interested in {item.title}?</h3>
          <p className="shop-modal__cta-text">
            Get in touch with us to place an order or learn more about our products.
          </p>
          <div className="shop-modal__cta-buttons">
            <a href="#contact" className="btn btn-primary" onClick={onClose}>
              Inquire & Order
            </a>
            <a href="#contact" className="btn btn-secondary" onClick={onClose}>
              Ask a Question
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopModal;
