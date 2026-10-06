'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import './wedding.css';

import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(useGSAP, ScrollTrigger);
}

// 7 Sacred Pheras Data
const PHERAS_DATA = [
  {
    num: 1,
    name: 'Prathama Phera',
    sanskrit: 'प्रथम फेरा — भोजनं च पुष्टिः',
    mantra: 'ॐ एकमिषे विष्णुस्त्वान्वेतु',
    meaning: 'The first step is a prayer for pure, nourishing food, shared health, and mutual sustenance throughout life.',
    vow: '“We promise to nourish one another in body, mind, and spirit, creating a warm and hospitable home for all.”',
    image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=900&q=80',
    caption: 'The Sacred Agni Ceremony'
  },
  {
    num: 2,
    name: 'Dvitiya Phera',
    sanskrit: 'द्वितीय फेरा — बलवर्धनं च धैर्यम्',
    mantra: 'ॐ द्वे ऊर्जे विष्णुस्त्वान्वेतु',
    meaning: 'The second step invokes mental, emotional, and physical strength to stand resilient against any tempest.',
    vow: '“We pledge to stand beside each other in strength and vulnerability, sharing every sorrow and magnifying every triumph.”',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=900&q=80',
    caption: 'Hand in Hand by Lake Pichola'
  },
  {
    num: 3,
    name: 'Tritiya Phera',
    sanskrit: 'तृतीय फेरा — समृद्धिः धर्मपालनम्',
    mantra: 'ॐ त्रीणि रायस्पोषाय विष्णुस्त्वान्वेतु',
    meaning: 'The third step seeks prosperity, righteous wealth (Artha), and spiritual dedication to Dharma.',
    vow: '“We promise to earn honestly, live purposefully, and dedicate our fortune to ethical living and noble causes.”',
    image: 'https://images.unsplash.com/photo-1544078741-7ea0e0cb8ce6?auto=format&fit=crop&w=900&q=80',
    caption: 'Vows of Prosperity & Harmony'
  },
  {
    num: 4,
    name: 'Chaturtha Phera',
    sanskrit: 'चतुर्थ फेरा — सुखं प्रीतिश्च',
    mantra: 'ॐ चत्वारि मायोभवाय विष्णुस्त्वान्वेतु',
    meaning: 'The fourth step calls for universal family harmony, mutual respect, and unconditional delight in each other.',
    vow: '“We vow to cherish both our families as one, cultivating respect, patience, and boundless affection in our household.”',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=900&q=80',
    caption: 'Royal Courtyard Celebrations'
  },
  {
    num: 5,
    name: 'Panchama Phera',
    sanskrit: 'पञ्चम फेरा — सन्ततिः मार्गदर्शनम्',
    mantra: 'ॐ पञ्च पशुभ्यो विष्णुस्त्वान्वेतु',
    meaning: 'The fifth step seeks divine blessings for righteous future generations, wisdom, and caring stewardship of nature.',
    vow: '“We promise to be wise guides, gentle partners, and compassionate stewards of all living beings around us.”',
    image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=900&q=80',
    caption: 'Evening Aarti over the Water'
  },
  {
    num: 6,
    name: 'Shashta Phera',
    sanskrit: 'षष्ठ फेरा — ऋतवः दीर्घायुष्यम्',
    mantra: 'ॐ षड् ॠतुभ्यो विष्णुस्त्वान्वेtu',
    meaning: 'The sixth step celebrates harmony through all seasons of life—spring, summer, autumn, and winter of the heart.',
    vow: '“Through every cycle of seasons and years, we shall find joy, peace, laughter, and lifelong devotion in each other.”',
    image: 'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&w=900&q=80',
    caption: 'Petal Shower on Mandap'
  },
  {
    num: 7,
    name: 'Saptama Phera',
    sanskrit: 'सप्तम फेरा — सखा सप्तपदा भव',
    mantra: 'ॐ सखे सप्ताक्षा भव सा मामनुव्रता भव',
    meaning: 'The seventh and crowning step seals eternal friendship, sacred companionship, and spiritual oneness for seven lifetimes.',
    vow: '“Having walked seven steps together, we are now true companions for eternity. Where you go, I shall go.”',
    image: 'https://images.unsplash.com/photo-1519225424909-2b0051e70e9f?auto=format&fit=crop&w=900&q=80',
    caption: 'United Under the Golden Canopy'
  }
];

// Ceremonies Itinerary Data
const CEREMONIES = [
  {
    id: 'c1',
    glyph: '🪔',
    badge: 'Day 1 — Welcome',
    name: 'Ganesh Sthapana & Mehendi Ki Shaam',
    date: 'Dec 16, 2026',
    time: '4:00 PM Onwards',
    venue: 'Mewar Courtyard, The Leela Palace Udaipur',
    dress: 'Pastel Florals & Handloom Silks',
    desc: 'Commencing our wedding celebrations with divine invocations to Lord Vignaharta, followed by delicate henna rituals, Rajasthani folk music, and welcome high-tea by the royal fountains.',
    mapUrl: 'https://maps.google.com/?q=The+Leela+Palace+Udaipur'
  },
  {
    id: 'c2',
    glyph: '🌼',
    badge: 'Day 2 — Morning',
    name: 'Haldi Rasam & Phoolon Ki Holi',
    date: 'Dec 17, 2026',
    time: '10:30 AM – 2:00 PM',
    venue: 'Lakeside Guava Gardens & Lawn',
    dress: 'Shades of Haldi Yellow & Mustard Kurta',
    desc: 'An exuberant morning of fresh organic turmeric paste, marigold petal showers, energetic dhol beats, and traditional delicacies under the sun-drenched Udaipur sky.',
    mapUrl: 'https://maps.google.com/?q=The+Leela+Palace+Udaipur'
  },
  {
    id: 'c3',
    glyph: '✨',
    badge: 'Day 2 — Evening',
    name: 'The Royal Sangeet & Musical Gala',
    date: 'Dec 17, 2026',
    time: '7:30 PM Till Late',
    venue: 'Grand Pichola Ballroom & Terrace',
    dress: 'Glamorous Indo-Western & Royal Velvet',
    desc: 'An evening of scintillating family dance performances, live Sufi fusion band, artisanal cocktail pairings, and late-night celebrations celebrating our love story.',
    mapUrl: 'https://maps.google.com/?q=The+Leela+Palace+Udaipur'
  },
  {
    id: 'c4',
    glyph: '🔥',
    badge: 'The Sacred Vivah',
    highlight: true,
    name: 'Shubh Vivah & Saat Pheras',
    date: 'Dec 18, 2026',
    time: '4:30 PM (Godhuli Bela Muhurat)',
    venue: 'Floating Island Mandap, Lake Pichola',
    dress: 'Traditional Regal Banarasi & Sherwanis',
    desc: 'As the golden sun sets over the Aravalli hills, join us for the Baraat boat procession, Varmala under chandeliers, Vedic Saat Pheras, and Kanyadaan amidst chanting of sacred mantras.',
    mapUrl: 'https://maps.google.com/?q=The+Leela+Palace+Udaipur'
  },
  {
    id: 'c5',
    glyph: '👑',
    badge: 'Day 3 — Grand Night',
    name: 'Royal Vivah Dawat & Reception',
    date: 'Dec 18, 2026',
    time: '8:30 PM Onwards',
    venue: 'Palace Amphitheatre & Lakefront Promenade',
    dress: 'Black Tie or Royal Indian Elegance',
    desc: 'An opulent royal feast curated by master chefs featuring authentic Mewari delicacies, champagne toasts, sitar symphonies, and grand fireworks mirroring Lake Pichola.',
    mapUrl: 'https://maps.google.com/?q=The+Leela+Palace+Udaipur'
  },
  {
    id: 'c6',
    glyph: '🕊️',
    badge: 'Day 4 — Farewell',
    name: 'Ashirwad Brunch & Vidaai',
    date: 'Dec 19, 2026',
    time: '11:00 AM – 2:00 PM',
    venue: 'The Haveli Terrace, Lake Pichola',
    dress: 'Effortless Resort Indian & Linen',
    desc: 'A gentle morning sharing memories, heartfelt elder blessings, royal brunch overlooking City Palace, and sweet send-offs as we begin our lifelong journey together.',
    mapUrl: 'https://maps.google.com/?q=The+Leela+Palace+Udaipur'
  }
];

// Photo Gallery Items
const GALLERY_ITEMS = [
  {
    id: 'g1',
    category: 'engagement',
    title: 'The Ring Ceremony in Jaipur',
    image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 'g2',
    category: 'udaipur',
    title: 'Sunset Boat on Lake Pichola',
    image: 'https://images.unsplash.com/photo-1544078741-7ea0e0cb8ce6?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 'g3',
    category: 'moments',
    title: 'Stolen Whispers at City Palace',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 'g4',
    category: 'haldi',
    title: 'Marigold Hues & Laughter',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 'g5',
    category: 'engagement',
    title: 'Draped in Raw Silk & Zardozi',
    image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 'g6',
    category: 'udaipur',
    title: 'Jagmandir Courtyard at Twilight',
    image: 'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&w=900&q=80'
  }
];

// Initial Blessings Wall
const INITIAL_BLESSINGS = [
  {
    id: 'b1',
    author: 'Rajiv & Sunita Sharma',
    city: 'New Delhi',
    relation: 'Chacha & Chachi',
    text: 'May Mahadev and Maa Parvati shower your sacred union with infinite joy, harmony, and prosperity. We can hardly wait to witness the pheras in Udaipur!'
  },
  {
    id: 'b2',
    author: 'Ananya & Rohan Verma',
    city: 'Bengaluru',
    relation: 'Cousins & Friends',
    text: 'From those coffee dates on Church Street to Udaipur’s royal palaces, your love story is pure magic. Ready to burn up the dance floor at the Sangeet!'
  },
  {
    id: 'b3',
    author: 'Dr. Ashok & Meera Singhania',
    city: 'Mumbai',
    relation: 'Family Elders',
    text: 'Sada Saubhagyavati Bhava. May your seven steps together be paved with patience, laughter, and lifelong devotion. Heartiest congratulations to both families!'
  }
];

export default function PrashantVaishaliWeddingPage() {
  // Countdown state
  const [timeLeft, setTimeLeft] = useState({ days: 73, hours: 14, minutes: 22, seconds: 45 });
  
  // Interactive Pheras tab
  const [activePhera, setActivePhera] = useState(1);

  // Gallery filter
  const [galleryFilter, setGalleryFilter] = useState('all');

  // Audio state
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscNodesRef = useRef<any[]>([]);

  // Phera Navigation & Touch Swipe Refs
  const pheraNavRef = useRef<HTMLDivElement | null>(null);
  const touchStartX = useRef<number | null>(null);

  // Auto center active phera tab horizontally within container
  useEffect(() => {
    const tabEl = document.getElementById(`phera-tab-${activePhera}`);
    if (tabEl && pheraNavRef.current) {
      const container = pheraNavRef.current;
      const left = tabEl.offsetLeft - (container.clientWidth / 2) + (tabEl.clientWidth / 2);
      container.scrollTo({ left, behavior: 'smooth' });
    }
  }, [activePhera]);

  const handlePheraTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handlePheraTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 45 && activePhera < 7) {
      setActivePhera(prev => prev + 1);
    } else if (diff < -45 && activePhera > 1) {
      setActivePhera(prev => prev - 1);
    }
    touchStartX.current = null;
  };



  // Blessings Wall state
  const [blessings, setBlessings] = useState(INITIAL_BLESSINGS);
  const [newBlessing, setNewBlessing] = useState({ author: '', city: '', text: '' });
  const [showBlessingInput, setShowBlessingInput] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Countdown timer logic
  useEffect(() => {
    // Target date: Dec 18, 2026, 16:30 IST
    const targetDate = new Date('2026-12-18T16:30:00+05:30').getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Ambient Shehnai & Sitar Harmony via Web Audio API
  const toggleAmbientMusic = () => {
    if (isPlayingAudio) {
      // Stop oscillators
      try {
        oscNodesRef.current.forEach(node => {
          try { node.stop(); node.disconnect(); } catch (e) {}
        });
        oscNodesRef.current = [];
        if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
          audioContextRef.current.suspend();
        }
      } catch (e) {
        console.error(e);
      }
      setIsPlayingAudio(false);
    } else {
      try {
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        if (!AudioContextClass) return;

        const ctx = audioContextRef.current || new AudioContextClass();
        audioContextRef.current = ctx;
        if (ctx.state === 'suspended') {
          ctx.resume();
        }

        // Master gain
        const masterGain = ctx.createGain();
        masterGain.gain.setValueAtTime(0.08, ctx.currentTime);
        masterGain.connect(ctx.destination);

        // Tanpura drone (Sa - Pa - Sa)
        const fundamentalFreqs = [146.83, 220.0, 293.66]; // D3, A3, D4
        const nodes: any[] = [];

        fundamentalFreqs.forEach((freq, i) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          
          osc.type = i === 1 ? 'triangle' : 'sine';
          osc.frequency.setValueAtTime(freq, ctx.currentTime);

          // Gentle tremolo
          const lfo = ctx.createOscillator();
          const lfoGain = ctx.createGain();
          lfo.frequency.setValueAtTime(0.25 + i * 0.1, ctx.currentTime);
          lfoGain.gain.setValueAtTime(4.0, ctx.currentTime);
          lfo.connect(lfoGain);
          lfoGain.connect(osc.frequency);
          lfo.start();
          nodes.push(lfo);

          gain.gain.setValueAtTime(0.04, ctx.currentTime);
          osc.connect(gain);
          gain.connect(masterGain);

          osc.start();
          nodes.push(osc);
        });

        oscNodesRef.current = nodes;
        setIsPlayingAudio(true);
        triggerToast('🎵 Shehnai & Tanpura Raga Playing');
      } catch (err) {
        console.error('Web Audio error:', err);
        setIsPlayingAudio(true);
      }
    }
  };

  // Toast notification helper
  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3800);
  };



  // Add blessing
  const handleAddBlessing = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBlessing.author || !newBlessing.text) {
      alert('Please share your name and heartfelt blessing.');
      return;
    }
    const created = {
      id: 'b-' + Date.now(),
      author: newBlessing.author,
      city: newBlessing.city || 'Udaipur',
      relation: 'Beloved Guest',
      text: newBlessing.text
    };
    setBlessings([created, ...blessings]);
    setNewBlessing({ author: '', city: '', text: '' });
    setShowBlessingInput(false);
    triggerToast('🙏 Thank you for your warm wedding blessing!');
  };

  // Filtered gallery
  const filteredGallery = galleryFilter === 'all'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter(item => item.category === galleryFilter);

  const currentPhera = PHERAS_DATA.find(p => p.num === activePhera) || PHERAS_DATA[0];

  const containerRef = useRef<HTMLDivElement>(null);
  const heroVideoRef = useRef<HTMLVideoElement>(null);

  useGSAP(() => {
    // 1. Hero Entrance Timeline (Maximised Animation)
    const heroTl = gsap.timeline();
    
    // Background glow expansion
    heroTl.fromTo('.pv-hero-bg-glow', 
      { opacity: 0, scale: 0.8 }, 
      { opacity: 1, scale: 1, duration: 2, ease: 'power2.out' }
    );

    // 3D Staggered entrance for the left content (excluding countdown items which we animate separately)
    heroTl.fromTo('.pv-hero-left > *:not(.pv-hero-countdown-strip)', 
      { y: 80, opacity: 0, rotationX: 10, scale: 0.95 }, 
      { y: 0, opacity: 1, rotationX: 0, scale: 1, duration: 1.4, stagger: 0.15, ease: 'expo.out' },
      "-=1.5"
    );

    // Make the countdown strip wrapper visible
    heroTl.fromTo('.pv-hero-countdown-strip',
      { opacity: 0 },
      { opacity: 1, duration: 0.5 },
      "-=1.0"
    );

    // Bouncing falling animation for the countdown letters and numbers (falling from the header area one by one)
    heroTl.fromTo('.pv-time-digits, .pv-time-tag, .pv-time-colon',
      { y: '-40vh', opacity: 0 },
      { y: 0, opacity: 1, duration: 1.8, stagger: 0.15, ease: 'bounce.out' },
      "-=0.8"
    );

    // Special elastic pop for the ampersand '&'
    heroTl.fromTo('.pv-hero-amp',
      { scale: 0, rotation: -45, opacity: 0 },
      { scale: 1, rotation: 0, opacity: 1, duration: 1.5, ease: 'elastic.out(1, 0.5)' },
      "-=1.2"
    );

    // Cinematic clip-path reveal for the main Arch image (with extended margins to avoid clipping the absolute children)
    heroTl.fromTo('.pv-arch-wrapper',
      { clipPath: 'polygon(-20% 100%, 120% 100%, 120% 100%, -20% 100%)', y: 40 },
      { 
        clipPath: 'polygon(-20% -20%, 120% -20%, 120% 120%, -20% 120%)', 
        y: 0, 
        duration: 1.8, 
        ease: 'expo.inOut', 
        clearProps: 'clipPath',
        onStart: () => {
          const video = heroVideoRef.current;
          if (video) {
            video.currentTime = 0;
            video.play().catch(e => console.log('Video play error:', e));
            
            const handleTimeUpdate = () => {
              if (video.currentTime >= 5) {
                video.pause();
                video.removeEventListener('timeupdate', handleTimeUpdate);
              }
            };
            video.addEventListener('timeupdate', handleTimeUpdate);
          }
        }
      },
      "-=1.6"
    );

    // Bouncy pop-in for the seal badge
    heroTl.fromTo('.pv-arch-seal-badge',
      { scale: 0, rotation: -90 },
      { scale: 1, rotation: 0, duration: 1.2, ease: 'back.out(1.7)' },
      "-=0.6"
    );

    // Smooth float-in for the floating detail card
    heroTl.fromTo('.pv-arch-floating-card',
      { x: 50, opacity: 0 },
      { x: 0, opacity: 1, duration: 1, ease: 'power3.out' },
      "-=0.8"
    );

    // 2. Section Headers Reveal
    const headers = gsap.utils.toArray('.pv-section-header') as HTMLElement[];
    headers.forEach((header) => {
      gsap.fromTo(header.children,
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: 'power3.out',
          scrollTrigger: {
            trigger: header,
            start: 'top 85%',
          }
        }
      );
    });

    // 3. Story Cards - Stagger Reveal
    gsap.fromTo('.pv-story-card',
      { y: 60, opacity: 0, rotationX: -5 },
      {
        y: 0, opacity: 1, rotationX: 0, duration: 1.2, stagger: 0.2, ease: 'power3.out',
        scrollTrigger: {
          trigger: '.pv-story-grid',
          start: 'top 80%',
        }
      }
    );

    // 4. Ceremony Itinerary - Alternate Sides (or simple stagger)
    gsap.fromTo('.pv-ceremony-card',
      { y: 80, opacity: 0, scale: 0.95 },
      {
        y: 0, opacity: 1, scale: 1, duration: 1, stagger: 0.15, ease: 'back.out(1.2)',
        scrollTrigger: {
          trigger: '.pv-itinerary-grid',
          start: 'top 75%',
        }
      }
    );

    // 5. Gallery Images - Masonry Stagger Pop-in
    gsap.fromTo('.pv-photo-frame',
      { scale: 0.8, opacity: 0 },
      {
        scale: 1, opacity: 1, duration: 0.8, stagger: 0.05, ease: 'power2.out',
        scrollTrigger: {
          trigger: '.pv-gallery-grid',
          start: 'top 85%',
        }
      }
    );

    // Gallery Parallax Depth Effect
    gsap.to('.pv-photo-frame:nth-child(even)', {
      y: -40,
      ease: 'none',
      scrollTrigger: {
        trigger: '.pv-gallery-grid',
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    });

    // 6. Travel Guides
    gsap.fromTo('.pv-concierge-card',
      { x: -40, opacity: 0 },
      {
        x: 0, opacity: 1, duration: 1, stagger: 0.2, ease: 'power3.out',
        scrollTrigger: {
          trigger: '.pv-concierge-grid',
          start: 'top 80%',
        }
      }
    );
  }, { scope: containerRef });

  // Phera Tab Change Animation
  useGSAP(() => {
    gsap.fromTo('.pv-phera-left > *', 
      { opacity: 0, x: -20 }, 
      { opacity: 1, x: 0, duration: 0.6, stagger: 0.1, ease: 'power2.out' }
    );
    gsap.fromTo('.pv-phera-right img',
      { opacity: 0, scale: 0.9, filter: 'blur(10px)' },
      { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 0.8, ease: 'power2.out' }
    );
  }, { dependencies: [activePhera], scope: containerRef });

  return (
    <div className="pv-page" ref={containerRef}>
      {/* Toast Alert */}
      {toastMessage && (
        <div style={{
          position: 'fixed',
          top: '80px',
          right: '24px',
          zIndex: 9999,
          background: '#2C1810',
          color: '#FAF6F0',
          padding: '12px 22px',
          borderRadius: '100px',
          fontSize: '0.85rem',
          fontWeight: 600,
          border: '1.5px solid #D45B28',
          boxShadow: '0 10px 25px rgba(0,0,0,0.3)',
          animation: 'fadeIn 0.3s ease'
        }}>
          {toastMessage}
        </div>
      )}

      {/* Floating Navigation Header */}
      <header className="pv-header-nav">
        <div className="pv-nav-inner">
          <Link href="#top" className="pv-nav-monogram">
            <div className="pv-monogram-circle">P✦V</div>
            <div className="pv-nav-names">
              <span className="pv-nav-title">Prashant & Vaishali</span>
              <span className="pv-nav-subtitle">Shubh Vivah · Udaipur</span>
            </div>
          </Link>

          <nav className="pv-nav-links" aria-label="Wedding sections">
            <a href="#story">Our Story</a>
            <a href="#pheras">7 Pheras</a>
            <a href="#ceremonies">Muhurat Itinerary</a>
            <a href="#gallery">Moments</a>
            <a href="#travel">Concierge</a>
          </nav>

          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            {/* Audio Toggle */}
            <button 
              className={`pv-audio-toggle ${isPlayingAudio ? 'playing' : ''}`}
              onClick={toggleAmbientMusic}
              title={isPlayingAudio ? 'Mute Shehnai Raga' : 'Play Shehnai Raga'}
            >
              <div className="pv-equalizer">
                <span className="pv-eq-bar" />
                <span className="pv-eq-bar" />
                <span className="pv-eq-bar" />
                <span className="pv-eq-bar" />
              </div>
              <span>{isPlayingAudio ? 'Shehnai Playing' : 'Play Shehnai'}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Royal Heritage Hero Banner (Shubh Vivah) */}
      <section id="top" className="pv-hero">
        <div className="pv-hero-bg-glow" />

        <div className="pv-hero-container">
          {/* Left Column: Invocation, Editorial Names & Minimalist Lagna Countdown */}
          <div className="pv-hero-left">
            <div className="pv-ganesh-pill">
              <span className="pv-ganesh-glyph">🪷</span>
              <span>॥ श्री गणेशाय नमः ॥</span>
              <span className="pv-ganesh-glyph">🪷</span>
            </div>

            <span className="pv-hero-eyebrow">The Royal Shubh Vivah</span>

            <h1 className="pv-hero-names-editorial">
              Prashant
              <span className="pv-hero-amp">&</span>
              <br />
              Vaishali
            </h1>

            <div className="pv-hero-meta-strip">
              <div className="pv-meta-date-badge">
                <span>🗓️ Friday, December 18, 2026</span>
              </div>
              <span className="pv-meta-dot">✦</span>
              <div className="pv-meta-venue-badge">
                <span>📍 The Leela Palace · Lake Pichola, Udaipur</span>
              </div>
            </div>

            {/* Sleek Minimalist Lagna Countdown Capsule */}
            <div className="pv-hero-countdown-strip">
              <div className="pv-countdown-timer-row">
                <div className="pv-time-block">
                  <span className="pv-time-digits">{timeLeft.days}</span>
                  <span className="pv-time-tag">Days</span>
                </div>
                <span className="pv-time-colon">:</span>
                <div className="pv-time-block">
                  <span className="pv-time-digits">{timeLeft.hours}</span>
                  <span className="pv-time-tag">Hours</span>
                </div>
                <span className="pv-time-colon">:</span>
                <div className="pv-time-block">
                  <span className="pv-time-digits">{timeLeft.minutes}</span>
                  <span className="pv-time-tag">Mins</span>
                </div>
                <span className="pv-time-colon">:</span>
                <div className="pv-time-block">
                  <span className="pv-time-digits">{timeLeft.seconds < 10 ? `0${timeLeft.seconds}` : timeLeft.seconds}</span>
                  <span className="pv-time-tag">Secs</span>
                </div>
              </div>

              <div className="pv-lagna-muhurat-line">
                <span>✨ Auspicious Lagna: Godhuli Bela · Margashirsha Shukla Navami</span>
              </div>
            </div>

            {/* Clean Impactful Action CTAs */}
            <div className="pv-hero-btn-group">
              <a href="#ceremonies" className="pv-btn-primary">
                Explore Ceremonies 🪷
              </a>
            </div>
          </div>

          {/* Right Column: Scalloped Heritage Arch Frame Centerpiece */}
          <div className="pv-hero-right">
            <div className="pv-arch-wrapper">
              {/* Floating Wax Seal Monogram Badge */}
              <div className="pv-arch-seal-badge">
                <span className="pv-seal-initials">P✦V</span>
                <span className="pv-seal-sub">EST. 2026</span>
              </div>

              {/* The Scalloped Royal Arch Frame */}
              <div className="pv-royal-arch-frame">
                <video 
                  ref={heroVideoRef}
                  src="/bg-video.mp4" 
                  className="pv-arch-img" 
                  muted 
                  playsInline 
                  style={{ objectFit: 'cover' }}
                />
                <div className="pv-arch-inner-gold-trim" />
              </div>

              {/* Floating Detail Card */}
              <div className="pv-arch-floating-card">
                <span className="pv-card-icon">🪷</span>
                <div className="pv-card-text">
                  <span className="pv-card-title">Lake Pichola Mandap</span>
                  <span className="pv-card-subtitle">Saat Pheras at Sunset</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sacred Scripture Callout Section (Vedic Parchment) */}
      <section className="pv-verse-strip">
        <div className="pv-verse-box">
          <div style={{ fontSize: '1.6rem', color: '#D45B28', marginBottom: '10px' }}>🪷</div>
          <p className="pv-sanskrit-quote">
            « यदेतद्धृदयं तव तदस्तु हृदयं मम । यदिदं हृदयं मम तदस्तु हृदयं तव ॥ »
          </p>
          <p className="pv-translation-text">
            “That which is your heart, let it be my heart; that which is my heart, let it be your heart.”
          </p>
          <span className="pv-verse-citation">
            ✦ Rigveda · The Eternal Vivah Sankalpa ✦
          </span>
        </div>
      </section>



      {/* Interactive 7 Sacred Pheras Explorer */}
      <section id="pheras" className="pv-section" style={{ background: '#FAF6F0' }}>
        <div className="pv-section-header">
          <span className="pv-eyebrow">The Seven Sacred Steps</span>
          <h2 className="pv-section-title">The Saat Pheras & Eternal Vows</h2>
          <p className="pv-section-subtitle">
            In Hindu philosophy, each step around the holy fire (Agni) seals a spiritual commitment binding bride and groom in love, faith, and cosmic harmony.
          </p>
        </div>

        <div className="pv-pheras-container">
          {/* Progress Bar Indicator */}
          <div className="pv-phera-progress-bar">
            <div 
              className="pv-phera-progress-fill" 
              style={{ width: `${(activePhera / 7) * 100}%` }}
            />
          </div>

          {/* Tabs */}
          <div className="pv-phera-nav-wrapper">
            <div className="pv-phera-nav-row" ref={pheraNavRef}>
              {PHERAS_DATA.map((p) => (
                <button
                  key={p.num}
                  id={`phera-tab-${p.num}`}
                  className={`pv-phera-tab ${activePhera === p.num ? 'active' : ''}`}
                  onClick={() => setActivePhera(p.num)}
                >
                  <span>Step {p.num}</span>
                  <span style={{ opacity: 0.85 }}>• {p.name.replace(' Phera', '')}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Spotlight Active Phera with Touch Swipe */}
          <div 
            className="pv-phera-spotlight"
            onTouchStart={handlePheraTouchStart}
            onTouchEnd={handlePheraTouchEnd}
          >
            <div className="pv-phera-left">
              <span className="pv-phera-num-badge">Sacred Step {currentPhera.num} of 7</span>
              <h3 className="pv-phera-sanskrit-title">{currentPhera.sanskrit}</h3>

              <div className="pv-phera-mantra-box">
                <div className="pv-phera-mantra">{currentPhera.mantra}</div>
                <div style={{ fontSize: '0.74rem', color: '#C85A17', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px' }}>
                  Vedic Invocation
                </div>
              </div>

              <p className="pv-phera-meaning">{currentPhera.meaning}</p>
              
              <div style={{ marginTop: '12px' }}>
                <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '1.5px', color: '#2C1810', fontWeight: 700, display: 'block', marginBottom: '4px' }}>
                  Prashant & Vaishali’s Vow:
                </span>
                <p className="pv-phera-vow">{currentPhera.vow}</p>
              </div>
            </div>

            <div className="pv-phera-right">
              <img src={currentPhera.image} alt={currentPhera.caption} />
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                padding: '16px 20px',
                background: 'linear-gradient(to top, rgba(44, 24, 16, 0.85) 0%, transparent 100%)',
                color: '#FFFDF9',
                fontSize: '0.85rem',
                fontFamily: 'Playfair Display, serif'
              }}>
                ✦ {currentPhera.caption}
              </div>
            </div>
          </div>

          {/* Interactive Step Controller Bar */}
          <div className="pv-phera-footer-nav">
            <button
              className="pv-phera-nav-btn prev"
              onClick={() => setActivePhera(prev => Math.max(1, prev - 1))}
              disabled={activePhera === 1}
              aria-label="Previous Sacred Step"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M15 18l-6-6 6-6"/>
              </svg>
              <span>Previous Step</span>
            </button>

            <div className="pv-phera-dots-indicator">
              {PHERAS_DATA.map((p) => (
                <button
                  key={p.num}
                  className={`pv-phera-dot ${activePhera === p.num ? 'active' : ''}`}
                  onClick={() => setActivePhera(p.num)}
                  aria-label={`Go to Sacred Step ${p.num}`}
                />
              ))}
            </div>

            <button
              className="pv-phera-nav-btn next"
              onClick={() => setActivePhera(prev => Math.min(7, prev + 1))}
              disabled={activePhera === 7}
              aria-label="Next Sacred Step"
            >
              <span>Next Step</span>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M9 18l6-6-6-6"/>
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Ceremonies & Shubh Muhurat Itinerary */}
      <section id="ceremonies" className="pv-section">
        <div className="pv-section-header">
          <span className="pv-eyebrow">Shubh Muhurat Itinerary</span>
          <h2 className="pv-section-title">The Royal Wedding Celebrations</h2>
          <p className="pv-section-subtitle">
            Four days of vibrant festive traditions, devotional poojas, and joyous festivities at The Leela Palace, Lake Pichola.
          </p>
        </div>

        <div className="pv-itinerary-grid">
          {CEREMONIES.map((c) => (
            <div key={c.id} className={`pv-ceremony-card ${c.highlight ? 'highlight' : ''}`}>
              {c.highlight && <div className="pv-ceremony-badge">Main Wedding Ceremony</div>}

              <div className="pv-ceremony-icon-row">
                <span className="pv-ceremony-glyph">{c.glyph}</span>
                <span className="pv-ceremony-date-badge">{c.date}</span>
              </div>

              <h3 className="pv-ceremony-name">{c.name}</h3>
              <div className="pv-ceremony-time">
                <span>⏰ {c.time}</span>
              </div>

              <p className="pv-ceremony-desc">{c.desc}</p>

              <div className="pv-ceremony-meta-box">
                <div className="pv-meta-item">
                  <span>📍</span>
                  <span><strong>Venue:</strong> {c.venue}</span>
                </div>
                <div className="pv-meta-item">
                  <span>👘</span>
                  <span><strong>Attire:</strong> {c.dress}</span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '10px', marginTop: 'auto' }}>
                <a 
                  href={c.mapUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="pv-ceremony-btn"
                  style={{ flex: 1 }}
                >
                  Map & Directions ↗
                </a>
                <button
                  onClick={() => triggerToast(`📅 Added "${c.name}" to your schedule!`)}
                  className="pv-ceremony-btn"
                  title="Add to Calendar"
                  style={{ background: 'transparent' }}
                >
                  + Cal
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Curated Moments Gallery */}
      <section id="gallery" className="pv-section" style={{ background: '#FFFDF9' }}>
        <div className="pv-section-header">
          <span className="pv-eyebrow">Visual Memories</span>
          <h2 className="pv-section-title">Glimpses of Joy & Togetherness</h2>
          <p className="pv-section-subtitle">
            Candid captures from our journey of laughter, engagements, and royal pre-wedding escapades.
          </p>
        </div>

        {/* Gallery Filter Tabs */}
        <div className="pv-gallery-tabs">
          {[
            { id: 'all', label: 'All Photographs' },
            { id: 'engagement', label: 'Engagement' },
            { id: 'udaipur', label: 'Udaipur Palaces' },
            { id: 'haldi', label: 'Festive Hues' },
            { id: 'moments', label: 'Candid Smiles' }
          ].map(tab => (
            <button
              key={tab.id}
              className={`pv-g-tab ${galleryFilter === tab.id ? 'active' : ''}`}
              onClick={() => setGalleryFilter(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Photo Grid */}
        <div className="pv-gallery-grid">
          {filteredGallery.map(photo => (
            <div key={photo.id} className="pv-photo-frame">
              <img src={photo.image} alt={photo.title} className="pv-photo-img" />
              <div className="pv-photo-overlay">
                <span className="pv-photo-caption">{photo.title}</span>
              </div>
            </div>
          ))}
        </div>
      </section>



      {/* Guest Concierge & Travel Guide */}
      <section id="travel" className="pv-section" style={{ background: '#FAF6F0' }}>
        <div className="pv-section-header">
          <span className="pv-eyebrow">Guest Concierge</span>
          <h2 className="pv-section-title">Your Udaipur Travel Guide</h2>
          <p className="pv-section-subtitle">
            Seamless travel details to make your royal getaway effortless, comfortable, and enchanting.
          </p>
        </div>

        <div className="pv-travel-grid">
          <div className="pv-travel-card">
            <div className="pv-travel-icon">✈️</div>
            <h4>Airport & Train Arrivals</h4>
            <p>
              Maharana Pratap Airport (UDR) is well connected with daily direct flights from Delhi, Mumbai, Bengaluru, and Jaipur. Dedicated luxury chauffeurs will meet guests upon arrival.
            </p>
            <div className="pv-travel-tag">Airport Code: UDR · 45 mins to Palace</div>
          </div>

          <div className="pv-travel-card">
            <div className="pv-travel-icon">🚤</div>
            <h4>Royal Boat Transfers</h4>
            <p>
              Arrival at The Leela Palace is through exclusive ceremonial royal boats from the private hotel jetty. Enjoy rose petal showers and traditional shehnai greetings as you disembark.
            </p>
            <div className="pv-travel-tag">Boat Jetty Location: Dudh Talai Road</div>
          </div>

          <div className="pv-travel-card">
            <div className="pv-travel-icon">🧣</div>
            <h4>Weather & Attire Guide</h4>
            <p>
              December in Udaipur boasts pleasant sunshine (24°C) by day and crisp royal lakeside breezes (12°C) at night. We recommend pashmina shawls and bandhgalas for evening soirees.
            </p>
            <div className="pv-travel-tag">Sunny Afternoons · Chilly Evenings</div>
          </div>
        </div>

        {/* Concierge Desk Contact Bar */}
        <div style={{
          marginTop: '40px',
          background: '#FFFDF9',
          border: '1px solid rgba(44, 24, 16, 0.16)',
          borderRadius: '16px',
          padding: '24px 30px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '20px'
        }}>
          <div>
            <h4 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.15rem', color: '#2C1810', marginBottom: '4px' }}>
              Dedicated Wedding Hospitality Desk
            </h4>
            <p style={{ fontSize: '0.86rem', color: '#735447', margin: 0 }}>
              Need special room arrangements, infant cribs, or elderly golf cart transfers? We are here 24/7.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <a 
              href="https://wa.me/919876543210?text=Hello%20Hospitality%20Desk%2C%20regarding%20Prashant%20and%20Vaishali%20Wedding"
              target="_blank"
              rel="noopener noreferrer"
              className="pv-btn-primary"
              style={{ padding: '10px 20px', fontSize: '0.82rem' }}
            >
              WhatsApp Concierge 💬
            </a>
          </div>
        </div>
      </section>

      {/* Regal Footer */}
      <footer className="pv-footer">
        <div className="pv-footer-monogram">P ✦ V</div>
        <div className="pv-footer-tagline">Prashant weds Vaishali</div>
        <p className="pv-footer-quote">
          “With folded hands and overflowing joy, our families await your divine presence and warm blessings as we begin our sacred journey as husband and wife.”
        </p>

        <div className="pv-footer-links">
          <a href="#top">Back to Top</a>
          <a href="#story">Our Story</a>
          <a href="#pheras">7 Pheras</a>
          <a href="#ceremonies">Itinerary</a>
          <a href="#travel">Concierge</a>
        </div>

        <div className="pv-footer-bottom">
          <p style={{ marginBottom: '8px' }}>
            Hosted with boundless love by <strong>The Sharma & Verma Families</strong>
          </p>
          <p style={{ fontSize: '0.74rem', opacity: 0.8 }}>
            © 2026 Prashant & Vaishali Vivah · Live on <span style={{ color: '#D45B28' }}>eweddingz.online/prashant-vaishali</span>
          </p>
        </div>
      </footer>

      {/* Bottom Floating eWeddingz Atelier Badge */}
      <aside className="pv-eweddingz-badge-bar">
        <div className="pv-badge-left">
          <span style={{ fontSize: '1rem' }}>✨</span>
          <span>Powered by <strong>eWeddingz Atelier</strong></span>
          <span style={{ opacity: 0.4 }}>|</span>
          <span className="pv-domain-tag">eweddingz.online/prashant-vaishali</span>
        </div>

        <div className="pv-badge-right">
          <button
            onClick={() => {
              if (navigator.clipboard) {
                navigator.clipboard.writeText(window.location.href);
                triggerToast('🔗 Wedding link copied to clipboard!');
              }
            }}
            style={{
              background: 'transparent',
              border: '1px solid rgba(250, 246, 240, 0.3)',
              color: '#FAF6F0',
              padding: '6px 14px',
              borderRadius: '100px',
              fontSize: '0.75rem',
              cursor: 'pointer'
            }}
          >
            Share Invite 🔗
          </button>
          
          <Link
            href="/"
            style={{
              background: 'linear-gradient(135deg, #D45B28 0%, #AF490F 100%)',
              color: '#FFFDF9',
              padding: '6px 16px',
              borderRadius: '100px',
              fontSize: '0.75rem',
              fontWeight: 700,
              textDecoration: 'none',
              boxShadow: '0 2px 8px rgba(212, 91, 40, 0.4)'
            }}
          >
            Create Your Wedding Website ↗
          </Link>
        </div>
      </aside>
    </div>
  );
}
