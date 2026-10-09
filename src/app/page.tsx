"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Home() {
  const [activeTab, setActiveTab] = useState<"all" | "website" | "reel" | "card">("all");
  const [activeTradition, setActiveTradition] = useState<"all" | "hindu" | "muslim" | "catholic" | "interfaith">("all");
  const [countdown, setCountdown] = useState({ days: 42, hours: 14, mins: 28, secs: 55 });
  const [portfolioFilter, setPortfolioFilter] = useState<"all" | "website" | "reel" | "card">("all");
  const [activeModalProject, setActiveModalProject] = useState<any | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev.secs > 0) return { ...prev, secs: prev.secs - 1 };
        return { ...prev, secs: 59, mins: prev.mins > 0 ? prev.mins - 1 : 59 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <header className="site-header">
        <div className="nav-container">
          <div className="logo" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ color: '#D45B28' }}>✦</span> eWeddingz
          </div>
          <nav className="nav-links">
            <Link href="#services">Services</Link>
            <Link href="#traditions">Traditions</Link>
            <Link href="#portfolio">Portfolio</Link>
            <Link href="/prashant-vaishali" style={{ color: 'var(--primary-accent)', fontWeight: 700 }}>
              Live Demo ↗
            </Link>
            <Link href="#contact" className="btn btn-outline" style={{ padding: '8px 16px' }}>Book Now</Link>
          </nav>
        </div>
      </header>

      <main>
        {/* UNIQUE MODERN DIGITAL STUDIO HERO */}
        <section className="modern-hero">
          {/* Top Announcement Tag */}
          <div className="hero-announcement">
            <span className="sparkle">✦</span>
            <span>NEXT-GEN WEDDING INVITATIONS, WEBSITES & REELS</span>
            <span className="dot">•</span>
            <span className="highlight-tag">ALL TRADITIONS</span>
          </div>

          {/* Bold Editorial Headline */}
          <div className="hero-header-box">
            <h1 className="modern-hero-title">
              Crafting <span className="accent-script">Modern</span> Digital<br />
              <span className="luxury-serif">Wedding Heirlooms</span>
            </h1>
            <p className="modern-hero-subtitle">
              Replace outdated paper cards with interactive bespoke websites, 9:16 cinematic reels, and luxury digital invites. Thoughtfully tailored for Hindu, Muslim, Catholic, and all cultural unions.
            </p>
          </div>

          {/* Quick Interactive Format Tabs */}
          <div className="hero-tab-bar">
            <button 
              className={`hero-tab-btn ${activeTab === 'all' ? 'active' : ''}`}
              onClick={() => setActiveTab('all')}
            >
              ✦ Complete Studio
            </button>
            <button 
              className={`hero-tab-btn ${activeTab === 'website' ? 'active' : ''}`}
              onClick={() => setActiveTab('website')}
            >
              🌐 Bespoke Websites <span className="tab-price">₹999</span>
            </button>
            <button 
              className={`hero-tab-btn ${activeTab === 'reel' ? 'active' : ''}`}
              onClick={() => setActiveTab('reel')}
            >
              🎬 Cinematic Reels <span className="tab-price">₹699</span>
            </button>
            <button 
              className={`hero-tab-btn ${activeTab === 'card' ? 'active' : ''}`}
              onClick={() => setActiveTab('card')}
            >
              ✉ Digital Cards <span className="tab-price">₹299</span>
            </button>
          </div>

          {/* UNIQUE 3-PRODUCT FLOATING DIGITAL CANVAS */}
          <div className={`showcase-canvas ${activeTab !== 'all' ? `focus-${activeTab}` : ''}`}>
            
            {/* PRODUCT 1: DIGITAL INVITE CARD (₹299) */}
            <div className="canvas-card invite-card">
              <div className="card-seal-badge">
                <span className="seal-monogram">ET</span>
              </div>
              <div className="invite-top-meta">
                <span className="invite-tradition-tag">Vivah & Nuptials</span>
                <span className="invite-type">Digital Invite · ₹299</span>
              </div>
              <div className="invite-names">
                <h3>Ayaan &amp; Sofia</h3>
                <p className="invite-sub">REQUEST THE HONOR OF YOUR PRESENCE</p>
              </div>
              <div className="invite-details-row">
                <div className="invite-date-block">
                  <span className="invite-label">DATE</span>
                  <span className="invite-val">DEC 24, 2026</span>
                </div>
                <div className="invite-date-block">
                  <span className="invite-label">CEREMONY</span>
                  <span className="invite-val">THE GRAND PALACE</span>
                </div>
              </div>
              <div className="invite-interactive-badge">
                <span className="qr-glyph">▣</span>
                <span>Includes Tap-to-RSVP &amp; Map Pin</span>
              </div>
            </div>

            {/* PRODUCT 2: 9:16 CINEMATIC IPHONE REEL (₹699) - CENTERPIECE */}
            <div className="canvas-card reel-mockup">
              <div className="phone-screen">
                <div className="phone-island">
                  <div className="island-camera"></div>
                </div>
                <div className="phone-video-bg">
                  <img 
                    src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=900" 
                    alt="Cinematic Wedding Reel Preview"
                    className="phone-img" 
                  />
                  <div className="video-shade"></div>
                </div>

                {/* Live Reel UI Elements */}
                <div className="reel-floating-header">
                  <span className="live-pill">● 9:16 REEL</span>
                  <span className="reel-duration">₹699 · 4K HDR</span>
                </div>

                <div className="reel-center-play">
                  <div className="play-button-circle">
                    <span className="play-triangle">▶</span>
                  </div>
                </div>

                <div className="reel-bottom-meta">
                  <div className="reel-audio-pill">
                    <div className="equalizer-bars">
                      <span className="eq-bar bar-1"></span>
                      <span className="eq-bar bar-2"></span>
                      <span className="eq-bar bar-3"></span>
                      <span className="eq-bar bar-4"></span>
                    </div>
                    <span className="audio-title">Original Audio · "Forever &amp; Always"</span>
                  </div>
                  <div className="reel-caption">
                    <p><strong>Ayaan &amp; Sofia</strong> Celebrating eternal love across traditions ✨ #WeddingReel #eWeddingz</p>
                  </div>
                  <div className="reel-social-stats">
                    <span>❤️ 18.4K</span>
                    <span>💬 412</span>
                    <span>↗ Share</span>
                  </div>
                </div>
              </div>

              {/* Floating Badge outside phone */}
              <div className="floating-reel-tag">
                <span className="star-icon">✦</span>
                <span>Social-Ready Reel · Ready in 48h</span>
              </div>
            </div>

            {/* PRODUCT 3: BESPOKE INTERACTIVE WEBSITE (₹999) */}
            <div className="canvas-card website-mockup">
              <div className="browser-header">
                <div className="browser-dots">
                  <span className="dot red"></span>
                  <span className="dot yellow"></span>
                  <span className="dot green"></span>
                </div>
                <Link 
                  href="/prashant-vaishali" 
                  className="browser-url-pill" 
                  title="Click to explore live Hindu wedding website"
                  style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center', gap: '6px' }}
                >
                  <span className="lock-icon">🔒</span>
                  <span>eweddingz.online/prashant-vaishali</span>
                  <span style={{ fontSize: '0.62rem', background: '#D45B28', color: '#FFFDF9', padding: '1px 6px', borderRadius: '100px', fontWeight: 700 }}>DEMO ↗</span>
                </Link>
                <span className="web-price-tag">₹999</span>
              </div>

              <div className="browser-body">
                <div className="web-hero-thumb">
                  <img 
                    src="https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&q=80&w=800" 
                    alt="Vaishali & Prashant Hindu Vivah Cover" 
                  />
                  <div className="web-thumb-overlay">
                    <span className="web-couple-title">Vaishali &amp; Prashant</span>
                    <span style={{ fontSize: '0.72rem', color: '#FFFDF9', opacity: 0.9 }}>Shubh Vivah · Udaipur</span>
                  </div>
                </div>

                {/* Live Interactive RSVP Counter Card */}
                <div className="web-live-rsvp">
                  <div className="rsvp-header">
                    <span className="rsvp-indicator">● LIVE RSVP</span>
                    <span className="rsvp-count">148 Confirmed</span>
                  </div>
                  <div className="rsvp-progress-bg">
                    <div className="rsvp-progress-fill" style={{ width: '84%' }}></div>
                  </div>
                </div>

                {/* Live Countdown Timer Widget */}
                <div className="web-countdown-box">
                  <div className="cd-item">
                    <span className="cd-num">{countdown.days}</span>
                    <span className="cd-txt">DAYS</span>
                  </div>
                  <span className="cd-sep">:</span>
                  <div className="cd-item">
                    <span className="cd-num">{countdown.hours}</span>
                    <span className="cd-txt">HOURS</span>
                  </div>
                  <span className="cd-sep">:</span>
                  <div className="cd-item">
                    <span className="cd-num">{countdown.mins}</span>
                    <span className="cd-txt">MINS</span>
                  </div>
                  <span className="cd-sep">:</span>
                  <div className="cd-item">
                    <span className="cd-num">{countdown.secs < 10 ? `0${countdown.secs}` : countdown.secs}</span>
                    <span className="cd-txt">SECS</span>
                  </div>
                </div>

                <div className="web-feature-chips">
                  <span>🗺️ Google Maps</span>
                  <span>🎵 Shehnai Player</span>
                  <span>🪷 7 Sacred Pheras</span>
                </div>

                <div style={{ marginTop: '12px' }}>
                  <Link 
                    href="/prashant-vaishali" 
                    style={{
                      display: 'block',
                      textAlign: 'center',
                      background: 'linear-gradient(135deg, #D45B28 0%, #AF490F 100%)',
                      color: '#FFFDF9',
                      padding: '8px 12px',
                      borderRadius: '8px',
                      fontSize: '0.78rem',
                      fontWeight: 700,
                      textDecoration: 'none',
                      boxShadow: '0 4px 12px rgba(212, 91, 40, 0.35)'
                    }}
                  >
                    Open Live Hindu Vivah Site ↗
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Action CTAs & All-in-One Ribbon */}
          <div className="hero-bottom-actions">
            <div className="hero-cta-group">
              <Link href="#services" className="btn btn-luxury-primary">
                View Packages (From ₹299)
                <span className="cta-arrow">→</span>
              </Link>
              <Link href="#portfolio" className="btn btn-luxury-ghost">
                Explore Live Demos
              </Link>
            </div>

            {/* Grand Bundle Banner */}
            <div className="grand-bundle-badge">
              <span className="bundle-sparkle">👑</span>
              <span className="bundle-text"><strong>The Grand All-Inclusive Bundle:</strong> Website + Reel + Invite for only <strong>₹1,499</strong></span>
              <Link href="#services" className="bundle-link">Get All Three →</Link>
            </div>

            {/* Multifaith trust row */}
            <div className="multifaith-trust-bar">
              <span className="trust-title">Honoring Every Tradition with Respect &amp; Beauty:</span>
              <div className="trust-tags">
                <span className="trust-chip">🕉️ Hindu Vivah</span>
                <span className="trust-chip">☪️ Muslim Nikah &amp; Walima</span>
                <span className="trust-chip">✝️ Catholic &amp; Christian</span>
                <span className="trust-chip">☬ Sikh Anand Karaj</span>
                <span className="trust-chip">✦ Inter-faith &amp; Modern</span>
              </div>
            </div>
          </div>
        </section>

        {/* INTERACTIVE BESPOKE HERITAGE SUITE */}
        <section id="traditions" className="heritage-suite-section">
          <div className="container">
            {/* Header */}
            <div className="text-center suite-header">
              <div className="suite-eyebrow">
                <span className="sparkle">✦</span>
                <span>CULTURAL INTEGRITY &amp; SACRED REVERENCE</span>
                <span className="sparkle">✦</span>
              </div>
              <h2 className="suite-title">
                The <span className="accent-script">Bespoke</span> Heritage Suite
              </h2>
              <p className="suite-subtitle">
                A wedding is not just an event—it is the sacred convergence of two families, centuries of heritage, and timeless prayers. Select a tradition to experience how we tailor your digital website, cinematic reel, and invitation card.
              </p>

              {/* Faith Selector Navigation */}
              <div className="faith-selector-bar">
                <button 
                  className={`faith-tab-btn ${activeTradition === 'hindu' ? 'active' : ''}`}
                  onClick={() => setActiveTradition('hindu')}
                >
                  <span className="faith-tab-icon">🕉️</span>
                  <span className="faith-tab-name">Hindu Vivah</span>
                  <span className="faith-tab-sub">7 Pheras &amp; Sangeet</span>
                </button>

                <button 
                  className={`faith-tab-btn ${activeTradition === 'muslim' ? 'active' : ''}`}
                  onClick={() => setActiveTradition('muslim')}
                >
                  <span className="faith-tab-icon">☪️</span>
                  <span className="faith-tab-name">Muslim Nikah</span>
                  <span className="faith-tab-sub">Bismillah &amp; Walima</span>
                </button>

                <button 
                  className={`faith-tab-btn ${activeTradition === 'catholic' ? 'active' : ''}`}
                  onClick={() => setActiveTradition('catholic')}
                >
                  <span className="faith-tab-icon">✝️</span>
                  <span className="faith-tab-name">Catholic Nuptials</span>
                  <span className="faith-tab-sub">Cathedral Mass &amp; Vows</span>
                </button>

                <button 
                  className={`faith-tab-btn ${activeTradition === 'interfaith' ? 'active' : ''}`}
                  onClick={() => setActiveTradition('interfaith')}
                >
                  <span className="faith-tab-icon">☬</span>
                  <span className="faith-tab-name">Sikh &amp; Interfaith</span>
                  <span className="faith-tab-sub">Anand Karaj &amp; Fusions</span>
                </button>
              </div>
            </div>

            {/* DYNAMIC HERITAGE STAGE */}
            {(() => {
              const currentTraditionKey = (activeTradition === 'all' ? 'hindu' : activeTradition) as 'hindu' | 'muslim' | 'catholic' | 'interfaith';
              
              const TRADITION_DATA = {
                hindu: {
                  badge: "VEDIC VIVAH & SANGEET",
                  icon: "🕉️",
                  title: "Hindu Vivah & Sangeet",
                  tagline: "Sacred 7 Pheras, Vedic Shlokas & Auspicious Muhurat",
                  verse: "यदेतद्धृदयं तव तदस्तु हृदयं मम ॥",
                  translation: "“May your heart be in harmony with mine; may our souls walk as one.”",
                  audioTrack: "Sacred Shehnai & Vedic Mangalam Chant",
                  palette: [
                    { name: "Royal Crimson", hex: "#8B1E2D" },
                    { name: "Festive Gold", hex: "#D4AF37" },
                    { name: "Haldi Ochre", hex: "#E8A838" },
                    { name: "Raw Silk Cream", hex: "#F7F3E9" }
                  ],
                  timeline: ["1. Ganesh Puja", "2. Haldi & Mehndi", "3. Sangeet Night", "4. Saat Pheras", "5. Grand Reception"],
                  features: [
                    { icon: "⏳", title: "Auspicious Muhurat Countdown", desc: "Live countdown synchronized to the exact planetary lagna for the Saat Pheras." },
                    { icon: "📍", title: "Multi-Venue GPS Directions", desc: "Separate navigation for Haldi, Sangeet & Mandap so out-of-town guests never get lost." },
                    { icon: "🪔", title: "Sanskrit Shloka Audio & Invites", desc: "Embedded holy mantras with graceful English translations for cross-generation guests." }
                  ],
                  image: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&q=80&w=1200",
                  couple: "Vaishali & Prashant",
                  date: "Auspicious Lagna: Dec 18, 2026",
                  venue: "The Leela Palace, Lake Pichola, Udaipur",
                  ctaLabel: "Build Hindu Wedding Suite (From ₹299)"
                },
                muslim: {
                  badge: "SACRED NIKAH & WALIMA",
                  icon: "☪️",
                  title: "Muslim Nikah & Walima",
                  tagline: "Bismillah Calligraphy, Duas & Elegant Modest Celebrations",
                  verse: "وَخَلَقْنَاكُمْ أَزْوَاجًا",
                  translation: "“And We created you in pairs.” — Surah An-Naba (78:8)",
                  audioTrack: "Soulful Sufi Instrumental · Flute & Oud Ambiance",
                  palette: [
                    { name: "Royal Emerald", hex: "#1B4332" },
                    { name: "Antique Champagne", hex: "#C2A476" },
                    { name: "Pearl Ivory", hex: "#FAF8F5" },
                    { name: "Rose Blush", hex: "#E9D8D6" }
                  ],
                  timeline: ["1. Manjha & Haldi", "2. Mehendi Ki Raat", "3. Sacred Nikah", "4. Dua-e-Khair", "5. Grand Walima"],
                  features: [
                    { icon: "✨", title: "Bismillah Calligraphy & Quranic Duas", desc: "Masterfully engraved digital Arabic calligraphy with reverent meaning." },
                    { icon: "💌", title: "Separate Nikah & Walima RSVPs", desc: "Dual invitation pathways allowing independent guest lists for family & banquet." },
                    { icon: "🎬", title: "Modest & Hijab-Sensitive Reel Edits", desc: "Private password-protected family reels respecting personal privacy preferences." }
                  ],
                  image: "https://images.unsplash.com/photo-1587271407850-8d438ca9fdf2?auto=format&fit=crop&q=80&w=1200",
                  couple: "Zayd & Mariam",
                  date: "Nikah Ceremony: Jan 14, 2027",
                  venue: "The Imperial Ballroom, Hyderabad",
                  ctaLabel: "Build Muslim Wedding Suite (From ₹299)"
                },
                catholic: {
                  badge: "HOLY MATRIMONY & NUPTIAL MASS",
                  icon: "✝️",
                  title: "Catholic & Christian Nuptials",
                  tagline: "Cathedral Liturgy, Sacred Vows & Formal Banquets",
                  verse: "Love is patient, love is kind. It always protects, always trusts, always perseveres.",
                  translation: "1 Corinthians 13:4-7 · Holy Matrimony Liturgy",
                  audioTrack: "Pachelbel's Canon in D · Cathedral String Ensemble",
                  palette: [
                    { name: "Ivory Satin", hex: "#FAF8F5" },
                    { name: "Cathedral Navy", hex: "#1D2D44" },
                    { name: "Brushed Gold", hex: "#D4AF37" },
                    { name: "Blush Rose", hex: "#F3E8EE" }
                  ],
                  timeline: ["1. Rehearsal Dinner", "2. Nuptial Mass & Vows", "3. Ring Exchange", "4. Cocktail Hour", "5. Formal Banquet"],
                  features: [
                    { icon: "⛪", title: "Nuptial Mass Order of Service", desc: "Complete digital Mass booklet with scripture readings, responses, and hymn lyrics." },
                    { icon: "🎶", title: "Choir & Classical Audio Embeds", desc: "Guests can listen to your entrance hymn and classical tracks right on the website." },
                    { icon: "🥂", title: "Formal RSVP & Dietary Preferences", desc: "Interactive seat reservation with meal options (Vegetarian, Vegan, Dietary notes)." }
                  ],
                  image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=1200",
                  couple: "Julian & Genevieve",
                  date: "Sacred Vows: Nov 28, 2026",
                  venue: "St. Thomas Cathedral, Goa",
                  ctaLabel: "Build Catholic Wedding Suite (From ₹299)"
                },
                interfaith: {
                  badge: "ANAND KARAJ & MULTICULTURAL FUSIONS",
                  icon: "☬",
                  title: "Sikh Anand Karaj & Interfaith",
                  tagline: "Sacred 4 Laavan, Blended Heritage & Dual-Language Invites",
                  verse: "ਏਕ ਜੋਤਿ ਦੁਇ ਮੂਰਤੀ ਧਨ ਪਿਰੁ ਕਹੀਐ ਸੋਇ ॥",
                  translation: "“Two bodies, one light — united in heart and divine purpose.”",
                  audioTrack: "Sacred Kirtan & Fusion Strings · Dilruba & Harp",
                  palette: [
                    { name: "Warm Saffron", hex: "#E07A5F" },
                    { name: "Royal Amber", hex: "#C5A059" },
                    { name: "Oatmeal Cream", hex: "#F4F1DE" },
                    { name: "Terracotta Glow", hex: "#3D405B" }
                  ],
                  timeline: ["1. Kurmai & Roka", "2. Sangeet & Jaago", "3. Anand Karaj (4 Laavan)", "4. Langar Seva", "5. Fusion Reception"],
                  features: [
                    { icon: "🌐", title: "Dual-Language & Multi-Script Invites", desc: "Seamless bilingual presentations in Gurmukhi, English, Hindi, and regional scripts." },
                    { icon: "🕊️", title: "Blended Multi-Ceremony Timelines", desc: "Crystal-clear schedules guiding diverse guests through every cultural ceremony." },
                    { icon: "📖", title: "\"What to Expect\" Cultural Etiquette Guide", desc: "Helpful dress code and ceremonial tips (e.g. head coverings, shoe removal) for guests." }
                  ],
                  image: "https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&q=80&w=1200",
                  couple: "Kabir & Ananya",
                  date: "Anand Karaj & Reception: Feb 20, 2027",
                  venue: "Heritage Gurdwara & Palace, Punjab",
                  ctaLabel: "Build Fusion Wedding Suite (From ₹299)"
                }
              };

              const current = TRADITION_DATA[currentTraditionKey];

              return (
                <div className="heritage-master-stage">
                  {/* LEFT: Cultural Artistry Dossier */}
                  <div className="stage-dossier-panel">
                    <div className="dossier-top-badge">
                      <span className="badge-glyph">{current.icon}</span>
                      <span>{current.badge}</span>
                    </div>

                    <h3 className="dossier-title">{current.title}</h3>
                    <p className="dossier-tagline">{current.tagline}</p>

                    {/* Sacred Verse Callout */}
                    <div className="dossier-verse-card">
                      <div className="verse-gold-quote">“</div>
                      <div className="verse-original">{current.verse}</div>
                      <div className="verse-translation">{current.translation}</div>
                    </div>

                    {/* Live Audio Track Pill */}
                    <div className="dossier-audio-pill">
                      <div className="audio-live-dot"></div>
                      <div className="audio-meta">
                        <span className="audio-status">INCLUDED CEREMONIAL AUDIO</span>
                        <span className="audio-name">♫ {current.audioTrack}</span>
                      </div>
                      <div className="audio-mini-bars">
                        <span className="m-bar mb-1"></span>
                        <span className="m-bar mb-2"></span>
                        <span className="m-bar mb-3"></span>
                      </div>
                    </div>

                    {/* Multi-Day Ritual Flow Roadmap */}
                    <div className="dossier-timeline-box">
                      <span className="timeline-heading">CEREMONY SEQUENCE ITINERARY:</span>
                      <div className="timeline-steps-flow">
                        {current.timeline.map((step, idx) => (
                          <span key={idx} className="timeline-step-badge">{step}</span>
                        ))}
                      </div>
                    </div>

                    {/* Tailored Customization Feature Bullets */}
                    <div className="dossier-features-grid">
                      {current.features.map((feat, idx) => (
                        <div key={idx} className="dossier-feat-item">
                          <span className="feat-glyph">{feat.icon}</span>
                          <div>
                            <strong>{feat.title}</strong>
                            <p>{feat.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Palette Swatches */}
                    <div className="dossier-palette-row">
                      <span className="palette-label">CURATED PALETTE:</span>
                      <div className="palette-dots">
                        {current.palette.map((p, idx) => (
                          <div key={idx} className="palette-dot-item" title={p.name}>
                            <span className="color-circle" style={{ backgroundColor: p.hex }}></span>
                            <span className="color-name">{p.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="dossier-actions" style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                      <Link href="#services" className="btn btn-luxury-primary">
                        {current.ctaLabel} →
                      </Link>
                      {currentTraditionKey === 'hindu' && (
                        <Link 
                          href="/prashant-vaishali" 
                          className="btn btn-outline"
                          style={{ borderColor: 'var(--primary-accent)', color: 'var(--text-dark)', fontWeight: 700 }}
                        >
                          Explore Vaishali & Prashant Vivah Site ↗
                        </Link>
                      )}
                    </div>
                  </div>

                  {/* RIGHT: Live Digital Artifact Showcase */}
                  <div className="stage-visual-panel">
                    <div className="visual-hero-arch">
                      <img 
                        src={current.image} 
                        alt={`${current.title} Showcase`}
                        className="arch-main-img" 
                      />
                      <div className="arch-glow-shade"></div>

                      {/* Floating Digital Invite Overlay Card */}
                      <div className="floating-digital-card">
                        <div className="digital-card-seal">
                          <span>{current.icon}</span>
                        </div>
                        <div className="digital-card-meta">
                          <span className="digital-badge">BESPOKE DIGITAL INVITE</span>
                          <h4 className="digital-couple">{current.couple}</h4>
                          <p className="digital-date">{current.date}</p>
                          <p className="digital-venue">{current.venue}</p>
                        </div>
                        <div className="digital-rsvp-action">
                          <span className="mini-rsvp-btn">Tap to RSVP Online ↗</span>
                        </div>
                      </div>

                      {/* Floating Multi-Device Tag */}
                      <div className="floating-suite-specs">
                        <div className="spec-badge">
                          <span>🌐 Interactive Website</span>
                          <span className="spec-price">₹999</span>
                        </div>
                        <div className="spec-badge">
                          <span>🎬 9:16 Cinematic Reel</span>
                          <span className="spec-price">₹699</span>
                        </div>
                        <div className="spec-badge">
                          <span>✉ Digital Card</span>
                          <span className="spec-price">₹299</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })()}

            {/* Cultural Standards & Excellence Grid */}
            <div className="heritage-standards-grid">
              <div className="standard-card">
                <div className="standard-icon-box">
                  <span>✨</span>
                </div>
                <div className="standard-info">
                  <h4>Authentic Cultural Artistry</h4>
                  <p>Accurate sacred shlokas, Quranic calligraphy, hymns, and custom traditional motifs vetted for reverent cultural accuracy.</p>
                </div>
              </div>

              <div className="standard-card">
                <div className="standard-icon-box">
                  <span>🌍</span>
                </div>
                <div className="standard-info">
                  <h4>Bilingual &amp; Multi-Script</h4>
                  <p>Flawless multilingual typesetting in English, Hindi, Urdu, Gurmukhi, Tamil, Gujarati, and global international scripts.</p>
                </div>
              </div>

              <div className="standard-card">
                <div className="standard-icon-box">
                  <span>📍</span>
                </div>
                <div className="standard-info">
                  <h4>Multi-Day Venue Navigation</h4>
                  <p>Integrated Google Maps and one-tap directions for every ceremony—from Haldi &amp; Sangeet to Mandap &amp; Banquet.</p>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* Services & Investment Packages */}
        <section id="services" className="luxury-investment-section">
          <div className="container">
            {/* Header */}
            <div className="text-center investment-header">
              <div className="investment-eyebrow">
                <span className="sparkle">✦</span>
                <span>TRANSPARENT INVESTMENT · ZERO HIDDEN FEES</span>
                <span className="sparkle">✦</span>
              </div>
              <h2 className="investment-title">
                Curated Packages &amp; <span className="accent-script">Investment</span>
              </h2>
              <p className="investment-subtitle">
                Accessible luxury tailored for modern weddings. Choose an individual bespoke digital creation or unlock the complete Grand Heirloom Bundle for maximum savings.
              </p>
              
              {/* Savings Announcement Pill */}
              <div className="investment-savings-pill">
                <span className="savings-badge">BEST VALUE</span>
                <span>Combined Price: <del>₹1,997</del></span>
                <span className="savings-arrow">➔</span>
                <span className="savings-highlight">Grand Bundle: <strong>₹1,499</strong> (Save ₹498)</span>
              </div>
            </div>

            {/* 4 Packages Grid */}
            <div className="packages-showcase-grid">

              {/* TIER 1: DIGITAL INVITE (₹299) */}
              <div className="package-card">
                <div className="package-top-bar">
                  <span className="package-icon-box">✉</span>
                  <span className="package-category">SAVE THE DATE</span>
                </div>
                <h3 className="package-name">Digital Invite</h3>
                <p className="package-summary">Elegant digital invitation cards with tap-to-RSVP and venue map links.</p>

                <div className="package-pricing-row">
                  <span className="currency-symbol">₹</span>
                  <span className="price-amount">299</span>
                  <span className="price-period">/one-time</span>
                </div>

                <div className="package-specs-pill">
                  <span>⚡ 24-48h Delivery</span>
                  <span className="pill-dot">•</span>
                  <span>📱 PDF &amp; JPEG</span>
                </div>

                <ul className="package-perks-list">
                  <li>
                    <span className="perk-check">✓</span>
                    <div><strong>Bespoke Aesthetic Design</strong>: Custom typography &amp; traditional floral motifs</div>
                  </li>
                  <li>
                    <span className="perk-check">✓</span>
                    <div><strong>Interactive RSVP Link</strong>: Direct WhatsApp or Google Form connection</div>
                  </li>
                  <li>
                    <span className="perk-check">✓</span>
                    <div><strong>Google Maps Pin Integration</strong>: One-tap venue GPS directions for guests</div>
                  </li>
                  <li>
                    <span className="perk-check">✓</span>
                    <div><strong>High-Res Social Formats</strong>: Optimized for WhatsApp &amp; Instagram Stories</div>
                  </li>
                  <li>
                    <span className="perk-check">✓</span>
                    <div><strong>Bilingual Script Support</strong>: English, Hindi, Urdu &amp; regional scripts</div>
                  </li>
                  <li>
                    <span className="perk-check">✓</span>
                    <div><strong>2 Free Revision Rounds</strong>: Refine dates, spellings &amp; itinerary details</div>
                  </li>
                </ul>

                <Link href="#contact" className="btn-package-select">
                  Choose Invite · ₹299 →
                </Link>
              </div>

              {/* TIER 2: CINEMATIC REEL (₹699) */}
              <div className="package-card">
                <div className="package-top-bar">
                  <span className="package-icon-box">🎬</span>
                  <span className="package-category">SOCIAL HIGHLIGHT</span>
                </div>
                <h3 className="package-name">Cinematic Reel</h3>
                <p className="package-summary">9:16 vertical 4K video reel crafted for Instagram, WhatsApp &amp; TikTok.</p>

                <div className="package-pricing-row">
                  <span className="currency-symbol">₹</span>
                  <span className="price-amount">699</span>
                  <span className="price-period">/one-time</span>
                </div>

                <div className="package-specs-pill">
                  <span>⚡ 48-72h Delivery</span>
                  <span className="pill-dot">•</span>
                  <span>🎬 4K Vertical 9:16</span>
                </div>

                <ul className="package-perks-list">
                  <li>
                    <span className="perk-check">✓</span>
                    <div><strong>60-90s Cinematic Cut</strong>: Storytelling narrative &amp; rhythm pacing</div>
                  </li>
                  <li>
                    <span className="perk-check">✓</span>
                    <div><strong>Luxury Color Grading</strong>: Warm golden-hour tones &amp; filmic glow</div>
                  </li>
                  <li>
                    <span className="perk-check">✓</span>
                    <div><strong>Trending / Sacred Audio</strong>: Royalty-free or custom couple song sync</div>
                  </li>
                  <li>
                    <span className="perk-check">✓</span>
                    <div><strong>Social-First 9:16 Ratio</strong>: Perfect for WhatsApp Status &amp; Reels</div>
                  </li>
                  <li>
                    <span className="perk-check">✓</span>
                    <div><strong>Modest / Private Edits</strong>: Family-safe privacy options upon request</div>
                  </li>
                  <li>
                    <span className="perk-check">✓</span>
                    <div><strong>2 Free Revision Rounds</strong>: Audio timing &amp; transition adjustments</div>
                  </li>
                </ul>

                <Link href="#contact" className="btn-package-select">
                  Choose Reel · ₹699 →
                </Link>
              </div>

              {/* TIER 3: BESPOKE WEBSITE (₹999) */}
              <div className="package-card">
                <div className="package-top-bar">
                  <span className="package-icon-box">🌐</span>
                  <span className="package-category">THE DIGITAL HEIRLOOM</span>
                </div>
                <h3 className="package-name">Bespoke Website</h3>
                <p className="package-summary">The interactive digital home for your wedding, itinerary, RSVPs &amp; love story.</p>

                <div className="package-pricing-row">
                  <span className="currency-symbol">₹</span>
                  <span className="price-amount">999</span>
                  <span className="price-period">/one-time</span>
                </div>

                <div className="package-specs-pill">
                  <span>⚡ 3-5 Days Delivery</span>
                  <span className="pill-dot">•</span>
                  <span>🔒 Custom Web Link</span>
                </div>

                <ul className="package-perks-list">
                  <li>
                    <span className="perk-check">✓</span>
                    <div><strong>Personalized Couple Link</strong>: Elegant web URL (e.g. <em>ayaan-sofia.wedding</em>)</div>
                  </li>
                  <li>
                    <span className="perk-check">✓</span>
                    <div><strong>Real-Time RSVP Manager</strong>: Live guest headcount &amp; dietary notes</div>
                  </li>
                  <li>
                    <span className="perk-check">✓</span>
                    <div><strong>Multi-Event Itinerary &amp; GPS</strong>: Separate maps for Haldi, Sangeet &amp; Pheras</div>
                  </li>
                  <li>
                    <span className="perk-check">✓</span>
                    <div><strong>Love Story Timeline &amp; Gallery</strong>: High-resolution digital photo vault</div>
                  </li>
                  <li>
                    <span className="perk-check">✓</span>
                    <div><strong>Background Music Player</strong>: Plays your chosen melody upon opening</div>
                  </li>
                  <li>
                    <span className="perk-check">✓</span>
                    <div><strong>Digital Guestbook &amp; Wishes</strong>: Collect heartfelt blessings from guests</div>
                  </li>
                </ul>

                <Link href="#contact" className="btn-package-select">
                  Choose Website · ₹999 →
                </Link>
              </div>

              {/* TIER 4: THE GRAND HEIRLOOM BUNDLE (₹1,499) - FEATURED HERO */}
              <div className="package-card featured-grand-bundle">
                <div className="bundle-crown-tag">
                  <span>👑 MOST POPULAR · SAVE ₹498</span>
                </div>

                <div className="package-top-bar">
                  <span className="package-icon-box gold">✦</span>
                  <span className="package-category gold">ALL-INCLUSIVE SUITE</span>
                </div>
                <h3 className="package-name">The Grand Bundle</h3>
                <p className="package-summary">Every digital asset seamlessly unified for a breathtaking wedding experience.</p>

                <div className="package-pricing-row">
                  <span className="currency-symbol">₹</span>
                  <span className="price-amount">1,499</span>
                  <span className="price-original"><del>₹1,997</del></span>
                </div>

                <div className="package-specs-pill highlight">
                  <span>⚡ VIP Express Delivery</span>
                  <span className="pill-dot">•</span>
                  <span>💎 All 3 Deliverables</span>
                </div>

                <ul className="package-perks-list">
                  <li className="bundle-core-item">
                    <span className="perk-check gold">★</span>
                    <div><strong>Full Bespoke Wedding Website</strong> (₹999 standalone value)</div>
                  </li>
                  <li className="bundle-core-item">
                    <span className="perk-check gold">★</span>
                    <div><strong>Cinematic 9:16 Wedding Reel</strong> (₹699 standalone value)</div>
                  </li>
                  <li className="bundle-core-item">
                    <span className="perk-check gold">★</span>
                    <div><strong>Luxury Digital Invitation Card</strong> (₹299 standalone value)</div>
                  </li>
                  <li>
                    <span className="perk-check">✓</span>
                    <div><strong>Priority 48-Hour VIP Delivery</strong>: Fast-track studio turnaround</div>
                  </li>
                  <li>
                    <span className="perk-check">✓</span>
                    <div><strong>Dedicated WhatsApp Concierge</strong>: 1-on-1 designer support</div>
                  </li>
                  <li>
                    <span className="perk-check">✓</span>
                    <div><strong>Unlimited Revisions</strong>: We refine until you are 100% thrilled</div>
                  </li>
                </ul>

                <Link href="#contact" className="btn-bundle-select">
                  Claim Grand Bundle · ₹1,499 →
                </Link>
              </div>

            </div>

            {/* Bottom Investment Guarantee Bar */}
            <div className="investment-assurance-strip">
              <div className="assurance-col">
                <span className="assurance-icon">🛡️</span>
                <div>
                  <strong>Zero-Risk Revision Guarantee</strong>
                  <p>We work with you closely until every font, photo, and detail is flawless.</p>
                </div>
              </div>
              <div className="assurance-divider"></div>
              <div className="assurance-col">
                <span className="assurance-icon">⚡</span>
                <div>
                  <strong>Ultra-Fast Turnaround</strong>
                  <p>Standard delivery in 24 to 72 hours. Last-minute wedding requests welcomed.</p>
                </div>
              </div>
              <div className="assurance-divider"></div>
              <div className="assurance-col">
                <span className="assurance-icon">💬</span>
                <div>
                  <strong>Direct WhatsApp Concierge</strong>
                  <p>No clunky ticket system. Direct chat with your personal creative designer.</p>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* Bespoke Portfolio Showcase */}
        <section id="portfolio" className="bespoke-portfolio-section">
          <div className="container">
            {/* Header */}
            <div className="text-center portfolio-header">
              <div className="portfolio-eyebrow">
                <span className="sparkle">✦</span>
                <span>CURATED CLIENT SHOWCASE · BESPOKE DIGITAL ATELIER</span>
                <span className="sparkle">✦</span>
              </div>
              <h2 className="portfolio-title">
                A Glimpse of <span className="accent-script">Eternal</span> Magic
              </h2>
              <p className="portfolio-subtitle">
                Explore real wedding websites, vertical 9:16 cinematic reels, and luxury digital invitations created for couples worldwide. Each piece is tailored with reverence to sacred heritage and modern elegance.
              </p>

              {/* Category Filter Pills */}
              <div className="portfolio-filter-tabs">
                <button
                  className={`p-filter-btn ${portfolioFilter === 'all' ? 'active' : ''}`}
                  onClick={() => setPortfolioFilter('all')}
                >
                  ✦ All Creations (8)
                </button>
                <button
                  className={`p-filter-btn ${portfolioFilter === 'website' ? 'active' : ''}`}
                  onClick={() => setPortfolioFilter('website')}
                >
                  🌐 Bespoke Websites <span className="p-filter-price">₹999</span>
                </button>
                <button
                  className={`p-filter-btn ${portfolioFilter === 'reel' ? 'active' : ''}`}
                  onClick={() => setPortfolioFilter('reel')}
                >
                  🎬 Cinematic Reels <span className="p-filter-price">₹699</span>
                </button>
                <button
                  className={`p-filter-btn ${portfolioFilter === 'card' ? 'active' : ''}`}
                  onClick={() => setPortfolioFilter('card')}
                >
                  ✉ Digital Invites <span className="p-filter-price">₹299</span>
                </button>
              </div>
            </div>

            {/* Portfolio Grid */}
            <div className="portfolio-showcase-grid">
              {(() => {
                const ALL_PROJECTS = [
                  {
                    id: "p1",
                    category: "website" as const,
                    badge: "BESPOKE WEDDING WEBSITE · LIVE DEMO",
                    price: "₹999",
                    couple: "Vaishali & Prashant",
                    tradition: "🕉️ Hindu Vivah & Saat Pheras",
                    venue: "The Leela Palace, Lake Pichola, Udaipur",
                    date: "Dec 18, 2026",
                    mockupType: "browser" as const,
                    urlPreview: "eweddingz.online/prashant-vaishali",
                    liveDemoUrl: "/prashant-vaishali",
                    image: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&q=80&w=1200",
                    tags: ["Live Lagna Countdown", "7 Sacred Pheras", "Shehnai Player", "RSVP Desk"],
                    quote: "Our guests across 6 countries were captivated. The 7 Pheras explorer and live RSVP manager made our Udaipur wedding feel royal before we even stepped foot at the palace.",
                    clientName: "Vaishali & Prashant (Udaipur)",
                    deliverables: ["Custom Domain Web Link (eweddingz.online)", "Real-Time RSVP & Blessings Desk", "Ceremony GPS Navigation", "Ambient Shehnai Player"],
                    whatsappMessage: "Hi eWeddingz! I love the Vaishali & Prashant Hindu Vivah Bespoke Website style (₹999). Can you share details for our wedding?"
                  },
                  {
                    id: "p2",
                    category: "reel" as const,
                    badge: "CINEMATIC 9:16 REEL",
                    price: "₹699",
                    couple: "Zayd & Mariam",
                    tradition: "☪️ Royal Nikah & Walima",
                    venue: "The Imperial Ballroom, Hyderabad",
                    date: "Jan 2027",
                    mockupType: "phone" as const,
                    urlPreview: "01:15 · 4K Vertical HDR",
                    image: "https://images.unsplash.com/photo-1587271407850-8d438ca9fdf2?auto=format&fit=crop&q=80&w=1200",
                    tags: ["Sufi Instrumental Sync", "Golden Filmic Glow", "Family Modest Cut"],
                    quote: "The emotional pacing and Sufi music synchronization gave everyone goosebumps. Our WhatsApp status was flooded with praises.",
                    clientName: "Zayd & Mariam (Hyderabad)",
                    deliverables: ["4K Vertical 9:16 Cut", "Studio Color Grading", "Royalty-Free Audio Sync", "Modest Family Version"],
                    whatsappMessage: "Hi eWeddingz! I'm interested in the Zayd & Mariam Cinematic Reel style (₹699). How do we get started?"
                  },
                  {
                    id: "p3",
                    category: "card" as const,
                    badge: "LUXURY DIGITAL INVITE",
                    price: "₹299",
                    couple: "Julian & Genevieve",
                    tradition: "✝️ Catholic Nuptials & Liturgy",
                    venue: "St. Thomas Cathedral, Goa",
                    date: "Nov 2026",
                    mockupType: "card" as const,
                    urlPreview: "Save-The-Date · WhatsApp PDF & JPG",
                    image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=1200",
                    tags: ["One-Tap WhatsApp RSVP", "Cathedral GPS Pin", "Nuptial Mass Booklet"],
                    quote: "So much more practical than paper cards. Guests clicked directly into Google Maps and added the rehearsal dinner to their calendars.",
                    clientName: "Julian & Genevieve (Goa)",
                    deliverables: ["High-Res Digital Card", "Google Maps Venue Pin", "One-Tap RSVP Action", "Bilingual Script Formatting"],
                    whatsappMessage: "Hi eWeddingz! I love the Julian & Genevieve Digital Invitation Suite (₹299). Let's discuss our design!"
                  },
                  {
                    id: "p4",
                    category: "website" as const,
                    badge: "THE GRAND HEIRLOOM BUNDLE",
                    price: "₹1,499",
                    couple: "Kabir & Ananya",
                    tradition: "☬ Sikh Anand Karaj & Fusion",
                    venue: "Heritage Gurdwara & Palace, Punjab",
                    date: "Feb 2027",
                    mockupType: "browser" as const,
                    urlPreview: "eweddingz.online/kabir-ananya",
                    image: "https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&q=80&w=1200",
                    tags: ["Dual-Language Gurmukhi", "Multi-Day Timeline", "Unified Branding"],
                    quote: "The cohesive branding between our invite card, wedding site, and after-movie reel made our wedding feel like a royal production.",
                    clientName: "Kabir & Ananya (Chandigarh)",
                    deliverables: ["Full Interactive Website", "Cinematic 9:16 Reel", "Digital Invite Card", "Priority VIP Turnaround"],
                    whatsappMessage: "Hi eWeddingz! I want to book the Grand Heirloom Bundle (₹1,499) like Kabir & Ananya. Please connect me with a designer!"
                  },
                  {
                    id: "p5",
                    category: "reel" as const,
                    badge: "CINEMATIC 9:16 REEL",
                    price: "₹699",
                    couple: "Rohan & Alisha",
                    tradition: "💍 Modern Coastal Nuptials",
                    venue: "Alila Diwa Beachfront, South Goa",
                    date: "Sunset Vows 2026",
                    mockupType: "phone" as const,
                    urlPreview: "00:90 · 4K Drone & Beach Vows",
                    image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=1200",
                    tags: ["Sunset Drone Sequence", "Acoustic Audio Sync", "48h VIP Delivery"],
                    quote: "Turnaround time was incredible. We had our highlight reel ready to post on Instagram before our reception night even began!",
                    clientName: "Rohan & Alisha (Mumbai)",
                    deliverables: ["Dynamic Rhythm Edit", "Sunset Color Grading", "Instagram & TikTok Ready", "Licensed Acoustic Track"],
                    whatsappMessage: "Hi eWeddingz! I'd like a Sunset Cinematic Reel (₹699) like Rohan & Alisha's style."
                  },
                  {
                    id: "p6",
                    category: "card" as const,
                    badge: "ROYAL DIGITAL INVITE",
                    price: "₹299",
                    couple: "Arjun & Meera",
                    tradition: "🪔 Royal Sangeet & Vivah",
                    venue: "Rambagh Palace, Jaipur",
                    date: "Royal Vivah 2027",
                    mockupType: "card" as const,
                    urlPreview: "Gold Foil Monogram Card",
                    image: "https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&q=80&w=1200",
                    tags: ["Animated Gold Shimmer", "Custom Royal Monogram", "WhatsApp Express Share"],
                    quote: "Saved us thousands on printing and courier charges. Our friends said it felt like receiving a royal parchment on their phones.",
                    clientName: "Arjun & Meera (Jaipur)",
                    deliverables: ["Custom Palace Monogram", "Interactive RSVP Link", "High-Res Formats", "2 Free Revision Rounds"],
                    whatsappMessage: "Hi eWeddingz! I'm looking for a Royal Digital Invitation (₹299) like Arjun & Meera's Jaipur suite."
                  },
                  {
                    id: "p7",
                    category: "website" as const,
                    badge: "MODERN MINIMALIST WEBSITE · LIVE DEMO",
                    price: "₹999",
                    couple: "Sahil & Geet",
                    tradition: "✦ Modern & Elegant Celebration",
                    venue: "Villa Balbiano, Lake Como, Italy",
                    date: "Aug 24, 2027",
                    mockupType: "browser" as const,
                    urlPreview: "eweddingz.online/sahil-geet",
                    liveDemoUrl: "/sahil-geet",
                    image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=80&w=1200",
                    tags: ["Champagne & Espresso", "Interactive Save The Date", "Destination Wedding"],
                    quote: "The Champagne & Espresso aesthetic was perfectly elegant for our Lake Como wedding. The modern digital envelope reveal completely wowed our friends.",
                    clientName: "Sahil & Geet (Lake Como)",
                    deliverables: ["Custom Domain Web Link (eweddingz.online)", "Modern Interactive UI", "Digital Envelope Reveal", "Mobile-Optimized Design"],
                    whatsappMessage: "Hi eWeddingz! I love the Sahil & Geet Modern Minimalist Website style (₹999). Can you share details for our wedding?"
                  },
                  {
                    id: "p8",
                    category: "website" as const,
                    badge: "FLORAL WEDDING INVITATION · LIVE DEMO",
                    price: "₹999",
                    couple: "Alex & Jamie",
                    tradition: "✦ Classic & Botanical",
                    venue: "Sunlit Sandstone Courtyard",
                    date: "Sep 27, 2026",
                    mockupType: "browser" as const,
                    urlPreview: "eweddingz.online/alex-jamie",
                    liveDemoUrl: "/alex-jamie",
                    image: "https://images.unsplash.com/photo-1542042161784-26ab9e041e89?auto=format&fit=crop&q=80&w=1200",
                    tags: ["Golden Camellia", "Floral Envelope", "Classic Elegance"],
                    quote: "The Golden Camellia design perfectly captured the elegant botanical vibe of our courtyard wedding.",
                    clientName: "Alex & Jamie",
                    deliverables: ["Custom Domain Web Link (eweddingz.online)", "Animated Envelope Opening", "Botanical Themed UI", "RSVP Form"],
                    whatsappMessage: "Hi eWeddingz! I love the Alex & Jamie Golden Camellia style (₹999). Can you share details for our wedding?"
                  },
                  {
                    id: "p9",
                    category: "website" as const,
                    badge: "CATHOLIC MATRIMONY · LIVE DEMO",
                    price: "₹999",
                    couple: "Akash & Selina",
                    tradition: "✦ Catholic Wedding",
                    venue: "Holy Matrimony",
                    date: "Custom Date",
                    mockupType: "browser" as const,
                    urlPreview: "eweddingz.online/cristianweb/",
                    liveDemoUrl: "/cristianweb/",
                    image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=1200",
                    tags: ["Catholic Theme", "Holy Matrimony", "Elegant Design"],
                    quote: "A beautiful digital experience for our Catholic ceremony.",
                    clientName: "Akash & Selina",
                    deliverables: ["Custom Domain Web Link (eweddingz.online)", "Catholic Theme", "RSVP Form"],
                    whatsappMessage: "Hi eWeddingz! I love the Akash & Selina Catholic theme (₹999). Can you share details for our wedding?"
                  },
                  {
                    id: "p10",
                    category: "website" as const,
                    badge: "MUSLIM NIKAH · LIVE DEMO",
                    price: "₹999",
                    couple: "Farhan & Muskan",
                    tradition: "✦ Muslim Wedding",
                    venue: "TBD",
                    date: "Dec 9, 2028",
                    mockupType: "browser" as const,
                    urlPreview: "eweddingz.online/farhan-muskan",
                    liveDemoUrl: "/farhan-muskan",
                    image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=1200",
                    tags: ["Muslim Nikah", "Elegant Design", "Floral Theme"],
                    quote: "A beautifully designed Nikah invitation for our special day.",
                    clientName: "Farhan & Muskan",
                    deliverables: ["Custom Domain Web Link (eweddingz.online)", "Nikah Theme", "Animated Envelope"],
                    whatsappMessage: "Hi eWeddingz! I love the Farhan & Muskan Nikah theme (₹999). Can you share details for our wedding?"
                  },
                  {
                    id: "p11",
                    category: "website" as const,
                    badge: "ROYAL RAJASTHANI & BENGALI VIVAH · LIVE DEMO",
                    price: "₹999",
                    couple: "Arnab & Aishwarya",
                    tradition: "🪷 Bengal & Rajasthan Union",
                    venue: "Anantgarh Resort, Rajasthan",
                    date: "Dec 8 & 9, 2026",
                    mockupType: "browser" as const,
                    urlPreview: "eweddingz.online/arnab-aishwarya",
                    liveDemoUrl: "/arnab-aishwarya",
                    image: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&q=80&w=1200",
                    tags: ["Video Intro & Loop", "Bengal + Rajasthan", "Royal Palace Gates"],
                    quote: "The royal palace doors opening to the moonlit courtyard with our parents' blessings was beyond our dreams. Every guest was mesmerized!",
                    clientName: "Arnab & Aishwarya (Rajasthan)",
                    deliverables: ["Custom Domain Web Link (eweddingz.online)", "Cinematic 2-Part Video Intro & Loop", "2-Day Ceremony Itinerary", "WhatsApp RSVP & Maps"],
                    whatsappMessage: "Hi eWeddingz! I love the Arnab & Aishwarya Royal Vivah theme (₹999). Can you share details for our wedding?"
                  }
                ];

                const filtered = portfolioFilter === 'all' 
                  ? ALL_PROJECTS 
                  : ALL_PROJECTS.filter(p => p.category === portfolioFilter);

                return filtered.map((item) => (
                  <div key={item.id} className="portfolio-card">
                    {/* Top Device Header Mockup */}
                    <div className="portfolio-card-device-bar">
                      {item.mockupType === 'browser' && (
                        <div className="mini-browser-bar">
                          <div className="browser-dots">
                            <span className="dot red"></span>
                            <span className="dot yellow"></span>
                            <span className="dot green"></span>
                          </div>
                          <div className="browser-url-pill">
                            <span className="lock-icon">🔒</span>
                            <span>{item.urlPreview}</span>
                          </div>
                          <span className="live-status-pill">● LIVE</span>
                        </div>
                      )}

                      {item.mockupType === 'phone' && (
                        <div className="mini-phone-bar">
                          <span className="phone-tag">📱 9:16 VERTICAL REEL</span>
                          <span className="phone-quality">{item.urlPreview}</span>
                        </div>
                      )}

                      {item.mockupType === 'card' && (
                        <div className="mini-card-bar">
                          <span className="seal-glyph">⚜️</span>
                          <span className="card-tag">DIGITAL INVITE ATELIER</span>
                          <span className="card-format">PDF &amp; JPEG</span>
                        </div>
                      )}
                    </div>

                    {/* Image Stage with Gradient Overlays */}
                    <div className="portfolio-image-stage">
                      <img 
                        src={item.image} 
                        alt={`${item.couple} Wedding`} 
                        className="portfolio-main-img" 
                      />
                      <div className="portfolio-stage-overlay"></div>

                      {/* Center Play Button for Reels */}
                      {item.category === 'reel' && (
                        <div className="portfolio-reel-play-btn" onClick={() => setActiveModalProject(item)}>
                          <span>▶</span>
                        </div>
                      )}

                      {/* Floating Couple Tag over Image */}
                      <div className="portfolio-floating-couple">
                        <span className="couple-tradition-tag">{item.tradition}</span>
                        <h4 className="couple-names">{item.couple}</h4>
                      </div>

                      {/* Price Badge */}
                      <div className="portfolio-price-tag">
                        <span>{item.price}</span>
                      </div>
                    </div>

                    {/* Card Body Dossier */}
                    <div className="portfolio-card-body">
                      <div className="portfolio-venue-row">
                        <span className="venue-pin">📍</span>
                        <span className="venue-text">{item.venue}</span>
                        <span className="venue-dot">•</span>
                        <span className="date-text">{item.date}</span>
                      </div>

                      {/* Tags */}
                      <div className="portfolio-tags-row">
                        {item.tags.map((tag, idx) => (
                          <span key={idx} className="p-tag-pill">{tag}</span>
                        ))}
                      </div>

                      {/* Client Testimonial Snippet */}
                      <div className="portfolio-quote-box">
                        <p className="p-quote-text">“{item.quote}”</p>
                        <span className="p-quote-author">— {item.clientName}</span>
                      </div>

                      {/* Card Action Row */}
                      <div className="portfolio-actions-row">
                        {(item as any).liveDemoUrl ? (
                          <Link 
                            href={(item as any).liveDemoUrl}
                            className="btn-p-quickview"
                            style={{ background: 'linear-gradient(135deg, #D45B28 0%, #AF490F 100%)', color: '#FFFDF9', borderColor: '#D45B28', textAlign: 'center', textDecoration: 'none' }}
                          >
                            Live Demo ↗
                          </Link>
                        ) : (
                          <button 
                            className="btn-p-quickview"
                            onClick={() => setActiveModalProject(item)}
                          >
                            Quick Preview ↗
                          </button>
                        )}

                        <a 
                          href={`https://wa.me/919876543210?text=${encodeURIComponent(item.whatsappMessage)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-p-order"
                        >
                          Order Style 💬
                        </a>
                      </div>
                    </div>
                  </div>
                ));
              })()}
            </div>

            {/* Verified Client Love & Reviews Strip */}
            <div className="portfolio-social-proof-strip">
              <div className="proof-header">
                <span className="gold-stars">★★★★★</span>
                <span className="proof-title">TRUSTED BY MODERN COUPLES WORLDWIDE</span>
                <span className="gold-stars">★★★★★</span>
              </div>
              
              <div className="proof-cards-grid">
                <div className="proof-card">
                  <div className="proof-rating">★★★★★ · 5.0</div>
                  <p className="proof-text">
                    “450+ guests RSVP&apos;d online without a single hitch! Our international relatives in the US and UK loved the live Google Maps navigation for each Udaipur event.”
                  </p>
                  <div className="proof-author">
                    <strong>Sofia &amp; Ayaan</strong>
                    <span>Bespoke Website &amp; Reel Suite · Mumbai &amp; Dubai</span>
                  </div>
                </div>

                <div className="proof-card">
                  <div className="proof-rating">★★★★★ · 5.0</div>
                  <p className="proof-text">
                    “The 9:16 vertical reel brought both our families to tears. The Sufi audio beat matching and golden color grading made it look like a high-budget Netflix film.”
                  </p>
                  <div className="proof-author">
                    <strong>Zayd &amp; Mariam</strong>
                    <span>Cinematic 9:16 Highlight Reel · Hyderabad</span>
                  </div>
                </div>

                <div className="proof-card">
                  <div className="proof-rating">★★★★★ · 5.0</div>
                  <p className="proof-text">
                    “Having our cathedral Mass liturgy booklet, hymns, and dietary seat preferences all interactive saved us over ₹35,000 in paper printing fees.”
                  </p>
                  <div className="proof-author">
                    <strong>Genevieve &amp; Julian</strong>
                    <span>Catholic Digital Invite &amp; Booklet · Goa</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* Interactive Quick Preview Modal */}
        {activeModalProject && (
          <div className="portfolio-modal-backdrop" onClick={() => setActiveModalProject(null)}>
            <div className="portfolio-modal-box" onClick={(e) => e.stopPropagation()}>
              <button 
                className="modal-close-btn"
                onClick={() => setActiveModalProject(null)}
                aria-label="Close Preview"
              >
                ✕
              </button>

              <div className="modal-content-grid">
                {/* Left: Artifact Showcase Preview */}
                <div className="modal-preview-stage">
                  <img 
                    src={activeModalProject.image} 
                    alt={activeModalProject.couple} 
                    className="modal-stage-img" 
                  />
                  <div className="modal-img-tag">
                    <span>{activeModalProject.badge}</span>
                  </div>
                  {activeModalProject.category === 'reel' && (
                    <div className="modal-audio-badge">
                      <span>♫ Trending &amp; Sacred Audio Synced</span>
                    </div>
                  )}
                </div>

                {/* Right: Artifact Specifications Dossier */}
                <div className="modal-details-panel">
                  <div className="modal-top-meta">
                    <span className="modal-badge">{activeModalProject.tradition}</span>
                    <span className="modal-price">{activeModalProject.price}</span>
                  </div>

                  <h3 className="modal-couple-title">{activeModalProject.couple}</h3>
                  <p className="modal-venue-info">
                    📍 {activeModalProject.venue} • {activeModalProject.date}
                  </p>

                  <div className="modal-divider"></div>

                  <h4 className="modal-section-heading">Deliverables in this Suite:</h4>
                  <ul className="modal-deliverables-list">
                    {activeModalProject.deliverables.map((del: string, i: number) => (
                      <li key={i}>
                        <span className="del-check">✓</span>
                        <span>{del}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="modal-quote-callout">
                    <div className="quote-stars">★★★★★</div>
                    <p className="quote-body">“{activeModalProject.quote}”</p>
                    <span className="quote-by">— Verified Couple Review ({activeModalProject.clientName})</span>
                  </div>

                  <div className="modal-cta-group">
                    {(activeModalProject as any).liveDemoUrl && (
                      <Link 
                        href={(activeModalProject as any).liveDemoUrl}
                        className="btn-modal-primary"
                        style={{ background: '#2C1810', color: '#FAF6F0', textAlign: 'center', textDecoration: 'none', marginBottom: '8px' }}
                      >
                        Explore Live Hindu Vivah Site (eweddingz.online) ↗
                      </Link>
                    )}
                    <a 
                      href={`https://wa.me/919876543210?text=${encodeURIComponent(activeModalProject.whatsappMessage)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-modal-primary"
                    >
                      Book This Style on WhatsApp ({activeModalProject.price}) 💬
                    </a>
                    <button 
                      className="btn-modal-dismiss"
                      onClick={() => setActiveModalProject(null)}
                    >
                      Back to Gallery
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Redesigned High-End Concierge Footer */}
      <footer id="contact" className="concierge-footer">
        <div className="container">
          <div className="concierge-box">
            <div className="concierge-eyebrow">
              <span className="sparkle">✦</span>
              <span>PRIVATE DIGITAL WEDDING ATELIER</span>
              <span className="sparkle">✦</span>
            </div>
            
            <h2 className="concierge-title">
              Ready to Immortalize <span className="accent-script">Your Special Day?</span>
            </h2>
            
            <p className="concierge-subtitle">
              Whether you envision an interactive bespoke wedding website, a cinematic vertical reel, or an opulent digital invite, our creative directors are ready to craft your celebration with timeless reverence.
            </p>

            <div className="concierge-actions">
              <a 
                href="https://wa.me/919876543210?text=Hi%20eWeddingz!%20We%20are%20planning%20our%20wedding%20and%20would%20love%20to%20discuss%20crafting%20our%20bespoke%20digital%20assets." 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn-concierge-primary"
              >
                <span>💬 Direct WhatsApp Concierge</span>
                <span className="btn-subtext">Instant Response · 1-on-1 Creative Director</span>
              </a>

              <a 
                href="mailto:concierge@eweddingz.online?subject=Wedding%20Digital%20Suite%20Inquiry" 
                className="btn-concierge-secondary"
              >
                <span>✉ Email Creative Studio</span>
                <span className="btn-subtext">concierge@eweddingz.online</span>
              </a>
            </div>

            {/* Concierge Trust Badges */}
            <div className="concierge-trust-badges">
              <div className="c-badge">
                <span className="c-badge-icon">⚡</span>
                <span>24–72h Delivery Guarantee</span>
              </div>
              <div className="c-badge-sep">•</div>
              <div className="c-badge">
                <span className="c-badge-icon">🛡️</span>
                <span>Zero-Risk Revisions</span>
              </div>
              <div className="c-badge-sep">•</div>
              <div className="c-badge">
                <span className="c-badge-icon">🌍</span>
                <span>Global Multi-Script Typesetting</span>
              </div>
              <div className="c-badge-sep">•</div>
              <div className="c-badge">
                <span className="c-badge-icon">👑</span>
                <span>All Faiths &amp; Traditions Revered</span>
              </div>
            </div>
          </div>

          <div className="footer-bottom-bar">
            <div className="footer-logo">eWeddingz</div>
            <p className="footer-copyright">
              &copy; {new Date().getFullYear()} eWeddingz Atelier · eweddingz.online. Crafted for unforgettable love stories worldwide. All rights reserved.
            </p>
            <div className="footer-links">
              <Link href="#services">Investment</Link>
              <span>•</span>
              <Link href="#traditions">Traditions</Link>
              <span>•</span>
              <Link href="#portfolio">Portfolio</Link>
              <span>•</span>
              <Link href="/prashant-vaishali">Hindu Vivah Demo</Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
