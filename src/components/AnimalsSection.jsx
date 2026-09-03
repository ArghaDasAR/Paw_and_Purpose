import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AnimalModal from './AnimalModal';
import './AnimalsSection.css';

gsap.registerPlugin(ScrollTrigger);

const animals = [
  {
    name: 'Luna',
    breed: 'Golden Retriever · 2 years',
    tagline: 'Pure warmth. Infinite devotion.',
    description: 'A heart overflowing with sunshine. Always ready to rest her chin gently on your knee.',
    image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=500&q=80',
    status: 'Available',
    statusClass: 'available',
    gallery: [
      'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=900&q=85',
      'https://images.unsplash.com/photo-1552053831-71594a27632d?w=900&q=85',
      'https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?w=900&q=85',
      'https://images.unsplash.com/photo-1633722715463-d30f4f325e24?w=900&q=85',
    ],
    heartMessage: '"She doesn\'t just wag her tail. She wags her whole soul every time she hears your footsteps."',
    fullDescription: 'Luna is pure joy personified. Rescued as a puppy, she has grown into a soulful, gentle golden companion who views every single person as a lifelong friend she hasn’t met yet. Whether it’s greeting you at the front door with quiet, radiant excitement, or curling up beside your feet while you read, Luna’s presence makes any house instantly feel like a sanctuary of comfort and unconditional warmth.',
    details: [
      { label: 'Age', value: '2 Years' },
      { label: 'Weight', value: '28 kg' },
      { label: 'Gender', value: 'Female' },
      { label: 'Vaccinated', value: 'Yes ✓' },
      { label: 'Spayed', value: 'Yes ✓' },
      { label: 'Good With Kids', value: 'Yes ✓' },
    ],
    traits: ['Deeply Gentle', 'Fiercely Loyal', 'Playful Spirit', 'Endless Cuddles', 'Kid-Friendly', 'Soulful Eyes'],
    closingMessage: '"Pure sunshine on four paws. Your heart will never be the same."',
  },
  {
    name: 'Mochi',
    breed: 'Tabby Cat · 1 year',
    tagline: 'Curiosity elevated. Purrfection achieved.',
    description: 'A velvet companion with emerald eyes, turning every quiet afternoon into pure magic.',
    image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=500&q=80',
    status: 'Available',
    statusClass: 'available',
    gallery: [
      'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=900&q=85',
      'https://images.unsplash.com/photo-1494256997604-768d1f608cac?w=900&q=85',
      'https://images.unsplash.com/photo-1519052537078-e6302a4968d4?w=900&q=85',
      'https://images.unsplash.com/photo-1478098711619-5ab0b478d6e6?w=900&q=85',
    ],
    heartMessage: '"A tiny velvet paw that turns every ordinary day into pure magic and quiet wonder."',
    fullDescription: 'Mochi is a curious little explorer whose soft purr can melt away the heaviest day. Found sheltering under a car on a rainy evening, she has blossomed into an affectionate, inquisitive little soul who loves perching on sunny windowsills, chasing sunbeams across the rug, and curling up like a warm pastry right in your lap when the evening settles in.',
    details: [
      { label: 'Age', value: '1 Year' },
      { label: 'Weight', value: '3.5 kg' },
      { label: 'Gender', value: 'Female' },
      { label: 'Vaccinated', value: 'Yes ✓' },
      { label: 'Spayed', value: 'Yes ✓' },
      { label: 'Indoor Cat', value: 'Yes ✓' },
    ],
    traits: ['Quiet Curiosity', 'Velvet Purr', 'Playful Heart', 'Lap Sleeper', 'Gentle Touch', 'Inquisitive'],
    closingMessage: '"She chose you before you even knew you were looking for her."',
  },
  {
    name: 'Bruno',
    breed: 'Labrador · 3 years',
    tagline: 'Steadfast loyalty. Heart of pure gold.',
    description: 'Calm, patient, and deeply devoted. A gentle giant who understands every word you say.',
    image: 'https://images.unsplash.com/photo-1561037404-61cd46aa615b?w=500&q=80',
    status: 'Available',
    statusClass: 'available',
    gallery: [
      'https://images.unsplash.com/photo-1561037404-61cd46aa615b?w=900&q=85',
      'https://images.unsplash.com/photo-1591769225440-811ad7d6eab3?w=900&q=85',
      'https://images.unsplash.com/photo-1605568427561-40dd23c2acea?w=900&q=85',
      'https://images.unsplash.com/photo-1560807707-8cc77767d783?w=900&q=85',
    ],
    heartMessage: '"He will sit quietly beside you through life\'s storms and celebrate every little triumph with you."',
    fullDescription: 'Bruno is dignity and sweetness wrapped in deep, glossy fur. Completely house-trained and exceptionally polite on the leash, Bruno is the dog who reads the room — if you are working, he stays quietly by your side; if you are ready to play, his eyes light up with unbridled joy. He doesn’t ask for much, just a soft bed, an affectionate head rub, and a family he can protect and cherish forever.',
    details: [
      { label: 'Age', value: '3 Years' },
      { label: 'Weight', value: '32 kg' },
      { label: 'Gender', value: 'Male' },
      { label: 'Vaccinated', value: 'Yes ✓' },
      { label: 'Neutered', value: 'Yes ✓' },
      { label: 'Trained', value: 'Fully ✓' },
    ],
    traits: ['Steadfast', 'Family Guardian', 'Patient Soul', 'Leash Master', 'Unshakable Loyalty', 'Gentle Giant'],
    closingMessage: '"He is not waiting for a treat. He is waiting for you."',
  },
  {
    name: 'Cleo',
    breed: 'Persian Cat · 4 years',
    tagline: 'Elegance redefined. Serenity in motion.',
    description: 'Regal grace meets quiet affection. A peaceful presence that transforms any space.',
    image: 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=500&q=80',
    status: 'Adoption Pending',
    statusClass: 'pending',
    gallery: [
      'https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=900&q=85',
      'https://images.unsplash.com/photo-1596854407944-bf87f6fdd49e?w=900&q=85',
      'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?w=900&q=85',
    ],
    heartMessage: '"In her quiet, rhythmic purr lies a soothing universe of peaceful, undemanding love."',
    fullDescription: 'Cleo moves through the world like poetry. With silver-silk fur and eyes that carry centuries of serene wisdom, she brings an aura of calm wherever she lounges. Rescued and lovingly restored to health, Cleo is the perfect companion for quiet evenings, soft classical music, and the timeless beauty of a loyal feline friend resting quietly beside you.',
    details: [
      { label: 'Age', value: '4 Years' },
      { label: 'Weight', value: '4 kg' },
      { label: 'Gender', value: 'Female' },
      { label: 'Vaccinated', value: 'Yes ✓' },
      { label: 'Spayed', value: 'Yes ✓' },
      { label: 'Indoor Cat', value: 'Yes ✓' },
    ],
    traits: ['Royal Composure', 'Quiet Affection', 'Silk Coat', 'Peaceful Companion', 'Sunbather', 'Low Maintenance'],
    closingMessage: '"A queen in disguise, ready to crown your home with love."',
  },
  {
    name: 'Max',
    breed: 'Beagle · 1.5 years',
    tagline: 'Unstoppable joy. Boundless adventure.',
    description: 'An infectious spark of life. Boundless enthusiasm that makes every single day an adventure.',
    image: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=500&q=80',
    status: 'Available',
    statusClass: 'available',
    gallery: [
      'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=900&q=85',
      'https://images.unsplash.com/photo-1505628346881-b72b27e84530?w=900&q=85',
      'https://images.unsplash.com/photo-1588943211346-0908a1fb0b01?w=900&q=85',
      'https://images.unsplash.com/photo-1586671267731-da2cf3ceeb80?w=900&q=85',
    ],
    heartMessage: '"He wakes up every morning believing today will be the greatest day in human history."',
    fullDescription: 'Max is pure unadulterated happiness. Rescued from neglect, his spirit didn\'t just survive — it shone brighter. With his trademark floppy ears and soulful hound eyes, Max turns ordinary walks into epic expeditions. He is affectionate, hilarious, and guaranteed to banish loneliness from your life from the second he bounds through your door.',
    details: [
      { label: 'Age', value: '1.5 Years' },
      { label: 'Weight', value: '12 kg' },
      { label: 'Gender', value: 'Male' },
      { label: 'Vaccinated', value: 'Yes ✓' },
      { label: 'Neutered', value: 'Yes ✓' },
      { label: 'Energy Level', value: 'High ⚡' },
    ],
    traits: ['Joyful Explorer', 'Laugh Machine', 'Social Butterfly', 'Adventure Ready', 'Loving Soul', 'Spirited'],
    closingMessage: '"Life is short. Run wild, love fiercely, and hug Max."',
  },
  {
    name: 'Bella',
    breed: 'Holland Lop · 8 months',
    tagline: 'Whisper soft. Impossibly tender.',
    description: 'A delicate bundle of innocence and comfort, ready to bring gentle tranquility to your home.',
    image: 'https://images.unsplash.com/photo-1548767797-d8c844163c4c?w=500&q=80',
    status: 'Available',
    statusClass: 'available',
    gallery: [
      'https://images.unsplash.com/photo-1548767797-d8c844163c4c?w=900&q=85',
      'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=900&q=85',
      'https://images.unsplash.com/photo-1452857297128-d9c29adba80b?w=900&q=85',
    ],
    heartMessage: '"The gentlest heartbeat that instantly brings stillness and peace to the busiest soul."',
    fullDescription: 'Bella is proof that the smallest creatures carry the deepest tenderness. Surrendered by an unprepared owner, she found safety with us and has since learned to trust human hands completely. Litter-trained and delightfully quiet, Bella loves being stroked behind her velvety ears and watching the world with serene, twinkling eyes.',
    details: [
      { label: 'Age', value: '8 Months' },
      { label: 'Weight', value: '1.8 kg' },
      { label: 'Gender', value: 'Female' },
      { label: 'Vaccinated', value: 'Yes ✓' },
      { label: 'Litter Trained', value: 'Yes ✓' },
      { label: 'Indoor Pet', value: 'Yes ✓' },
    ],
    traits: ['Cloud Soft', 'Tranquil Presence', 'Delicate Touch', 'Litter-Trained', 'Pure Innocence', 'Gentle Love'],
    closingMessage: '"A touch like velvet, a presence like peace."',
  },
];

const AnimalsSection = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const cardsRef = useRef([]);
  const [selectedAnimal, setSelectedAnimal] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = (animal, e) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedAnimal(animal);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setTimeout(() => setSelectedAnimal(null), 500);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { scale: 0.85, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 85%',
            end: 'top 45%',
            scrub: 1,
          },
        }
      );

      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.from(card, {
          y: 80 + i * 15,
          opacity: 0,
          scale: 0.94,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <section id="animals" className="section animals-section" ref={sectionRef}>
        <div className="container">
          <div className="section-header">
            <span className="section-label">Rescue. Cherish. Belong.</span>
            <h2 className="section-title animals-section__title" ref={titleRef}>
              Soulful. Devoted. Irresistible.
            </h2>
            <p className="section-subtitle">
              Unconditional love isn’t just a feeling. It’s an extraordinary, lifelong connection waiting to begin.
            </p>
          </div>

          <div className="animals-grid">
            {animals.map((animal, index) => (
              <article
                key={animal.name}
                className="animal-card"
                ref={el => (cardsRef.current[index] = el)}
              >
                <div className="animal-card__image">
                  <img
                    src={animal.image}
                    alt={`${animal.name} the ${animal.breed}`}
                    loading="lazy"
                    decoding="async"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=500&q=80';
                    }}
                  />
                  <span className={`animal-card__status animal-card__status--${animal.statusClass}`}>
                    {animal.status}
                  </span>
                  <div className="animal-card__overlay">
                    <button
                      className="btn btn-small btn-primary"
                      onClick={(e) => openModal(animal, e)}
                    >
                      {animal.statusClass === 'available' ? 'Meet Me' : 'Learn More'}
                    </button>
                  </div>
                </div>
                <div className="animal-card__info">
                  <h3>{animal.name}</h3>
                  <span className="animal-card__breed">{animal.breed}</span>
                  <p>{animal.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <AnimalModal
        animal={selectedAnimal}
        isOpen={modalOpen}
        onClose={closeModal}
      />
    </>
  );
};

export default AnimalsSection;
