/**
 * Arnab & Aishwarya Royal Wedding Celebration
 * A Masterpiece Union of Bengal & Rajasthan
 */

(() => {
  'use strict';

  // Core DOM Elements
  const entrancePortal = document.getElementById('entrance-portal');
  const portalVideo = document.getElementById('portal-video');
  const portalGateOverlay = document.getElementById('portal-gate-overlay');
  const btnOpenGate = document.getElementById('btn-open-gate');
  const btnSkipPortal = document.getElementById('btn-skip-portal');
  const heroVideo = document.getElementById('hero-video');
  const royalNav = document.getElementById('royal-nav');
  const btnReplayPortal = document.getElementById('btn-replay-portal');
  const btnNavAudio = document.getElementById('btn-nav-audio');
  const btnFloatingAudio = document.getElementById('btn-floating-audio');
  const audioStatusText = document.getElementById('audio-status-text');

  let heroLoopTimer = null;
  let isMuted = false;
  let entranceFinished = false;

  // 1. OPEN ROYAL GATE & PLAY INTRO VIDEO (PART 1)
  async function openRoyalGate() {
    portalGateOverlay.classList.add('hidden');
    btnSkipPortal.style.display = 'block';

    try {
      portalVideo.muted = isMuted;
      await portalVideo.play();
    } catch (err) {
      console.warn('Playback with audio prevented by browser, playing muted:', err);
      portalVideo.muted = true;
      isMuted = true;
      syncAudioState();
      portalVideo.play().catch(() => finishEntrance());
    }
  }

  // 2. FINISH ENTRANCE & TRANSITION TO LIVING HERO (PART 2)
  function finishEntrance() {
    if (entranceFinished) return;
    entranceFinished = true;

    entrancePortal.classList.add('fade-out');
    document.body.classList.remove('locked');

    setTimeout(() => {
      portalVideo.pause();
    }, 1200);

    // Start Hero Video (part2.mp4)
    if (heroVideo) {
      heroVideo.muted = isMuted;
      heroVideo.currentTime = 0;
      heroVideo.play().catch((err) => {
        console.warn('Hero video muted fallback:', err);
        heroVideo.muted = true;
        heroVideo.play().catch(() => {});
      });
    }
  }

  // 3. HERO VIDEO 5-SEC LOOP LOGIC
  // Requirement: "part2.mp4 as a loop to it 5 sec"
  if (heroVideo) {
    heroVideo.addEventListener('ended', () => {
      clearTimeout(heroLoopTimer);
      heroLoopTimer = setTimeout(() => {
        if (entranceFinished) {
          heroVideo.currentTime = 0;
          heroVideo.play().catch(() => {});
        }
      }, 5000); // 5 seconds interval loop
    });
  }

  if (btnOpenGate) {
    btnOpenGate.addEventListener('click', openRoyalGate);
  }

  if (btnSkipPortal) {
    btnSkipPortal.addEventListener('click', finishEntrance);
  }

  if (portalVideo) {
    portalVideo.addEventListener('ended', finishEntrance);
    portalVideo.addEventListener('error', finishEntrance);
    portalVideo.addEventListener('timeupdate', () => {
      if (portalVideo.duration && portalVideo.currentTime >= portalVideo.duration - 0.5) {
        finishEntrance();
      }
    });
  }

  // 4. REPLAY ROYAL GATE
  if (btnReplayPortal) {
    btnReplayPortal.addEventListener('click', () => {
      clearTimeout(heroLoopTimer);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      entranceFinished = false;
      document.body.classList.add('locked');

      if (heroVideo) heroVideo.pause();

      portalVideo.currentTime = 0;
      portalGateOverlay.classList.remove('hidden');
      btnSkipPortal.style.display = 'none';
      entrancePortal.classList.remove('fade-out');
    });
  }

  // 5. AUDIO CONTROLS
  function syncAudioState() {
    if (btnNavAudio) {
      if (isMuted) {
        btnNavAudio.classList.add('audio-muted');
        if (audioStatusText) audioStatusText.textContent = 'Muted';
      } else {
        btnNavAudio.classList.remove('audio-muted');
        if (audioStatusText) audioStatusText.textContent = 'Music On';
      }
    }
    const floatingIcon = document.getElementById('floating-audio-icon');
    if (floatingIcon) {
      floatingIcon.textContent = isMuted ? '🔇' : '🎵';
    }
  }

  function toggleAudio() {
    isMuted = !isMuted;
    if (portalVideo) portalVideo.muted = isMuted;
    if (heroVideo) heroVideo.muted = isMuted;
    syncAudioState();
  }

  if (btnNavAudio) btnNavAudio.addEventListener('click', toggleAudio);
  if (btnFloatingAudio) btnFloatingAudio.addEventListener('click', toggleAudio);

  // 6. STICKY NAVBAR SCROLL TRIGGER
  window.addEventListener('scroll', () => {
    if (window.scrollY > 80) {
      royalNav.classList.add('scrolled');
    } else {
      royalNav.classList.remove('scrolled');
    }
  });

  // 7. REAL-TIME COUNTDOWN TIMER (8 Dec 2026, 10:30 AM IST)
  const targetDate = new Date('2026-12-08T10:30:00+05:30').getTime();

  function updateCountdown() {
    const now = Date.now();
    const diff = targetDate - now;

    if (diff <= 0) {
      ['cd-days', 'cd-hours', 'cd-minutes', 'cd-seconds'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.textContent = '00';
      });
      return;
    }

    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((diff % (1000 * 60)) / 1000);

    const pad = n => String(n).padStart(2, '0');

    const elD = document.getElementById('cd-days');
    const elH = document.getElementById('cd-hours');
    const elM = document.getElementById('cd-minutes');
    const elS = document.getElementById('cd-seconds');

    if (elD) elD.textContent = pad(d);
    if (elH) elH.textContent = pad(h);
    if (elM) elM.textContent = pad(m);
    if (elS) elS.textContent = pad(s);
  }

  setInterval(updateCountdown, 1000);
  updateCountdown();

  // 8. ITINERARY TABS SWITCHER (Day 1 / Day 2)
  const tabDay1 = document.getElementById('day-tab-1');
  const tabDay2 = document.getElementById('day-tab-2');
  const timelineDay1 = document.getElementById('day-timeline-1');
  const timelineDay2 = document.getElementById('day-timeline-2');

  if (tabDay1 && tabDay2) {
    tabDay1.addEventListener('click', () => {
      tabDay1.classList.add('active');
      tabDay2.classList.remove('active');
      timelineDay1.classList.add('active');
      timelineDay2.classList.remove('active');
    });

    tabDay2.addEventListener('click', () => {
      tabDay2.classList.add('active');
      tabDay1.classList.remove('active');
      timelineDay2.classList.add('active');
      timelineDay1.classList.remove('active');
    });
  }

  // 9. ADD TO CALENDAR (.ICS FILE)
  const btnCalendar = document.getElementById('btn-calendar-download');
  if (btnCalendar) {
    btnCalendar.addEventListener('click', () => {
      const icsData = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'PRODID:-//eWeddingz//Arnab and Aishwarya Wedding//EN',
        'CALSCALE:GREGORIAN',
        'METHOD:PUBLISH',
        'BEGIN:VEVENT',
        'UID:arnab-aishwarya-20261208@eweddingz.online',
        'DTSTAMP:20261009T100000Z',
        'DTSTART:20261208T050000Z', // 10:30 AM IST
        'DTEND:20261209T133000Z',   // 7:00 PM IST next day
        'SUMMARY:Arnab & Aishwarya Royal Vivah (Rajasthan)',
        'LOCATION:Anantgarh Resort, Rajasthan',
        'DESCRIPTION:Celebration of Arnab Karmakar & Aishwarya Negi at Anantgarh Resort. Haldi, Mehendi, Sangeet on 8th Dec & Baraat, Phere, Royal Feast, Vidai on 9th Dec.',
        'URL:https://maps.app.goo.gl/jBfqTfXgRUDQVKC66',
        'END:VEVENT',
        'END:VCALENDAR'
      ].join('\r\n');

      const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'Arnab-Aishwarya-Royal-Wedding.ics';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(link.href);
    });
  }

  // 10. RSVP WHATSAPP FORM
  const rsvpForm = document.getElementById('royal-rsvp-form');
  const rsvpAlert = document.getElementById('rsvp-alert-box');

  if (rsvpForm) {
    rsvpForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('rsvp-name').value.trim();
      const count = document.getElementById('rsvp-count').value;
      const days = document.getElementById('rsvp-days').value;
      const side = document.getElementById('rsvp-side').value;
      const message = document.getElementById('rsvp-message').value.trim();

      if (!name) return;

      const waText = encodeURIComponent(
        `✦ *ROYAL WEDDING RSVP — ARNAB & AISHWARYA* ✦\n\n` +
        `👤 *Guest Name:* ${name}\n` +
        `👥 *Attending Count:* ${count}\n` +
        `📅 *Ceremonies:* ${days}\n` +
        `🪷 *Family Association:* ${side}\n` +
        (message ? `💌 *Wishes for Couple:* "${message}"\n\n` : `\n`) +
        `Eagerly looking forward to blessing the couple at Anantgarh Resort! ✨`
      );

      window.open(`https://api.whatsapp.com/send?text=${waText}`, '_blank');

      if (rsvpAlert) {
        rsvpAlert.textContent = `Thank you, ${name}! Your RSVP has been confirmed. We eagerly await your arrival at Anantgarh Resort!`;
        rsvpAlert.classList.add('active');
      }

      rsvpForm.reset();
    });
  }

  // 11. FLOATING ROSE PETALS & GOLDEN PARTICLES CANVAS
  const canvas = document.getElementById('particles-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    const particles = [];
    const particleCount = 28;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 4 + 2,
        speedY: Math.random() * 1.2 + 0.6,
        speedX: Math.sin(Math.random() * Math.PI) * 0.8,
        angle: Math.random() * Math.PI * 2,
        spin: (Math.random() - 0.5) * 0.03,
        opacity: Math.random() * 0.6 + 0.3,
        isPetal: Math.random() > 0.4
      });
    }

    function renderParticles() {
      ctx.clearRect(0, 0, width, height);

      particles.forEach(p => {
        p.y += p.speedY;
        p.x += Math.sin(p.angle) * 0.6 + p.speedX;
        p.angle += p.spin;

        if (p.y > height + 20) {
          p.y = -20;
          p.x = Math.random() * width;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);

        if (p.isPetal) {
          // Rose Petal
          ctx.beginPath();
          ctx.ellipse(0, 0, p.r * 1.8, p.r, 0, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(180, 30, 48, ${p.opacity * 0.7})`;
          ctx.fill();
        } else {
          // Golden Sparkle
          ctx.beginPath();
          ctx.arc(0, 0, p.r * 0.8, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(247, 231, 180, ${p.opacity})`;
          ctx.shadowBlur = 8;
          ctx.shadowColor = 'rgba(212, 175, 55, 0.8)';
          ctx.fill();
        }

        ctx.restore();
      });

      requestAnimationFrame(renderParticles);
    }

    renderParticles();
  }

})();
