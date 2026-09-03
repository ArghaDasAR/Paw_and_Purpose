import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    navigate: [
      { label: 'Home', href: '#home' },
      { label: 'Shop', href: '#shop' },
      { label: 'Meet Our Animals', href: '#animals' },
      { label: 'About Us', href: '#about' },
    ],
    shop: [
      { label: 'Pet Food', href: '#shop' },
      { label: 'Toys & Play', href: '#shop' },
      { label: 'Accessories', href: '#shop' },
      { label: 'Grooming', href: '#shop' },
    ],
    help: [
      { label: 'Adopt', href: '#help' },
      { label: 'Donate', href: '#help' },
      { label: 'Volunteer', href: '#help' },
      { label: 'Contact Us', href: '#contact' },
    ],
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          {/* Brand */}
          <div className="footer__brand">
            <a href="#home" className="footer__logo">
              <svg className="footer__logo-icon" viewBox="0 0 40 40" fill="none">
                <circle cx="12" cy="10" r="5" fill="currentColor" opacity="0.8"/>
                <circle cx="28" cy="10" r="5" fill="currentColor" opacity="0.8"/>
                <circle cx="6" cy="22" r="4.5" fill="currentColor" opacity="0.6"/>
                <circle cx="34" cy="22" r="4.5" fill="currentColor" opacity="0.6"/>
                <ellipse cx="20" cy="28" rx="10" ry="9" fill="currentColor"/>
              </svg>
              <span className="footer__logo-text">Paws & Purpose</span>
            </a>
            <p className="footer__tagline">
              More than a pet shop.<br/>A movement for animals.
            </p>
          </div>

          {/* Navigate */}
          <div className="footer__col">
            <h4>Navigate</h4>
            <ul>
              {footerLinks.navigate.map(link => (
                <li key={link.label}><a href={link.href}>{link.label}</a></li>
              ))}
            </ul>
          </div>

          {/* Shop */}
          <div className="footer__col">
            <h4>Shop</h4>
            <ul>
              {footerLinks.shop.map(link => (
                <li key={link.label}><a href={link.href}>{link.label}</a></li>
              ))}
            </ul>
          </div>

          {/* Help Animals */}
          <div className="footer__col">
            <h4>Help Animals</h4>
            <ul>
              {footerLinks.help.map(link => (
                <li key={link.label}><a href={link.href}>{link.label}</a></li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="footer__col">
            <h4>Contact</h4>
            <ul>
              <li>+91 98765 43210</li>
              <li>hello@pawsandpurpose.in</li>
              <li>New Delhi, India</li>
            </ul>

            {/* Social Icons */}
            <div className="footer__socials">
              <a href="#" aria-label="Instagram" className="footer__social-link">
                <svg viewBox="0 0 24 24" fill="none">
                  <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="2"/>
                  <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="2"/>
                  <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor"/>
                </svg>
              </a>
              <a href="#" aria-label="Facebook" className="footer__social-link">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M18 2H15C13.6739 2 12.4021 2.52678 11.4645 3.46447C10.5268 4.40215 10 5.67392 10 7V10H7V14H10V22H14V14H17L18 10H14V7C14 6.73478 14.1054 6.48043 14.2929 6.29289C14.4804 6.10536 14.7348 6 15 6H18V2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
              <a href="#" aria-label="Twitter / X" className="footer__social-link">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M4 4L10.5 12.5M20 20L13.5 11.5M10.5 12.5L20 4M10.5 12.5L4 20M13.5 11.5L20 4M13.5 11.5L4 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
              <a href="#" aria-label="YouTube" className="footer__social-link">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M22.54 6.42C22.4212 5.94541 22.1793 5.51057 21.8387 5.15941C21.498 4.80824 21.0708 4.55318 20.6 4.42C18.88 4 12 4 12 4C12 4 5.12 4 3.4 4.46C2.92925 4.59318 2.50198 4.84824 2.16135 5.19941C1.82073 5.55057 1.57879 5.98541 1.46 6.46C1 8.18 1 12 1 12C1 12 1 15.82 1.46 17.54C1.69 18.49 2.43 19.23 3.4 19.54C5.12 20 12 20 12 20C12 20 18.88 20 20.6 19.54C21.57 19.23 22.31 18.49 22.54 17.54C23 15.82 23 12 23 12C23 12 23 8.18 22.54 6.42Z" stroke="currentColor" strokeWidth="2"/>
                  <path d="M9.75 15.02L15.5 12L9.75 8.98V15.02Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="footer__bottom">
          <p>&copy; {currentYear} Paws & Purpose. All rights reserved. Made with ❤️ for animals.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
