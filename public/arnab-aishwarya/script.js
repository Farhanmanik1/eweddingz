/**
 * Arnab & Aishwarya Royal Wedding Website
 * A Celestial Union of Bengal & Rajasthan
 */

(() => {
  'use strict';

  // DOM Elements
  const entrancePortal = document.getElementById('entrance-portal');
  const portalVideo = document.getElementById('portal-video');
  const portalTeaser = document.getElementById('portal-teaser');
  const btnOpen = document.getElementById('btn-open-royal');
  const btnSkip = document.getElementById('btn-skip-intro');
  const heroVideo = document.getElementById('hero-video');
  const btnReplay = document.getElementById('btn-replay-portal');
  const btnMuteToggle = document.getElementById('btn-mute-toggle');
  const soundIcon = document.getElementById('sound-icon');

  let heroLoopTimer = null;
  let isMuted = false;
  let entranceFinished = false;

  // Initialize videos
  if (portalVideo) {
    portalVideo.preload = 'auto';
  }
  if (heroVideo) {
    heroVideo.preload = 'auto';
  }

  // 1. OPEN ROYAL INVITATION (PLAY PART 1 INTRO)
  async function startRoyalEntrance() {
    portalTeaser.classList.add('hidden');
    btnSkip.style.display = 'block';

    try {
      portalVideo.muted = isMuted;
      await portalVideo.play();
    } catch (err) {
      console.warn('Autoplay with sound prevented, playing muted:', err);
      portalVideo.muted = true;
      isMuted = true;
      updateMuteIcon();
      portalVideo.play().catch(() => finishEntrance());
    }
  }

  // 2. FINISH ENTRANCE & TRANSITION TO HERO (PART 2)
  function finishEntrance() {
    if (entranceFinished) return;
    entranceFinished = true;

    // Smoothly fade out entrance overlay
    entrancePortal.classList.add('fade-out');
    document.body.classList.remove('locked');

    // Pause portal video after fade
    setTimeout(() => {
      portalVideo.pause();
    }, 1000);

    // Play Hero Video (part2.mp4)
    if (heroVideo) {
      heroVideo.muted = isMuted;
      heroVideo.currentTime = 0;
      heroVideo.play().catch((err) => {
        console.warn('Hero video autoplay muted fallback:', err);
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
      }, 5000); // 5-second pause between loops as requested
    });
  }

  // Event Listeners for Portal
  if (btnOpen) {
    btnOpen.addEventListener('click', startRoyalEntrance);
  }

  if (btnSkip) {
    btnSkip.addEventListener('click', finishEntrance);
  }

  if (portalVideo) {
    portalVideo.addEventListener('ended', finishEntrance);
    portalVideo.addEventListener('error', () => {
      finishEntrance();
    });
    // Fallback if video ends near duration
    portalVideo.addEventListener('timeupdate', () => {
      if (portalVideo.duration && portalVideo.currentTime >= portalVideo.duration - 0.5) {
        finishEntrance();
      }
    });
  }

  // 4. REPLAY ROYAL PORTAL FEATURE
  if (btnReplay) {
    btnReplay.addEventListener('click', () => {
      clearTimeout(heroLoopTimer);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      entranceFinished = false;
      document.body.classList.add('locked');

      if (heroVideo) {
        heroVideo.pause();
      }

      portalVideo.currentTime = 0;
      portalTeaser.classList.remove('hidden');
      btnSkip.style.display = 'none';
      entrancePortal.classList.remove('fade-out');
    });
  }

  // 5. AUDIO / MUTE CONTROLS
  function updateMuteIcon() {
    if (!soundIcon) return;
    soundIcon.textContent = isMuted ? '🔇' : '🔊';
  }

  if (btnMuteToggle) {
    btnMuteToggle.addEventListener('click', () => {
      isMuted = !isMuted;
      if (portalVideo) portalVideo.muted = isMuted;
      if (heroVideo) heroVideo.muted = isMuted;
      updateMuteIcon();
    });
  }

  // 6. AUSPICIOUS MUHURAT COUNTDOWN TIMER
  // Target: 8th December 2026, 10:30:00 AM IST
  const weddingDate = new Date('2026-12-08T10:30:00+05:30').getTime();

  function updateCountdown() {
    const now = new Date().getTime();
    const distance = weddingDate - now;

    if (distance <= 0) {
      document.getElementById('days').textContent = '00';
      document.getElementById('hours').textContent = '00';
      document.getElementById('minutes').textContent = '00';
      document.getElementById('seconds').textContent = '00';
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    const pad = (num) => String(num).padStart(2, '0');

    const elDays = document.getElementById('days');
    const elHours = document.getElementById('hours');
    const elMins = document.getElementById('minutes');
    const elSecs = document.getElementById('seconds');

    if (elDays) elDays.textContent = pad(days);
    if (elHours) elHours.textContent = pad(hours);
    if (elMins) elMins.textContent = pad(minutes);
    if (elSecs) elSecs.textContent = pad(seconds);
  }

  setInterval(updateCountdown, 1000);
  updateCountdown();

  // 7. ITINERARY TAB SWITCHER
  const tabDay1 = document.getElementById('tab-day-1');
  const tabDay2 = document.getElementById('tab-day-2');
  const timelineDay1 = document.getElementById('timeline-day-1');
  const timelineDay2 = document.getElementById('timeline-day-2');

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

  // 8. ADD TO CALENDAR (.ICS GENERATION)
  const btnCalendar = document.getElementById('btn-add-calendar');
  if (btnCalendar) {
    btnCalendar.addEventListener('click', () => {
      const icsContent = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'PRODID:-//eWeddingz//Arnab & Aishwarya Wedding//EN',
        'CALSCALE:GREGORIAN',
        'METHOD:PUBLISH',
        // Day 1
        'BEGIN:VEVENT',
        'UID:arnab-aishwarya-day1-20261208@eweddingz.online',
        'DTSTAMP:20261009T100000Z',
        'DTSTART:20261208T050000Z', // 10:30 AM IST is 05:00 UTC
        'DTEND:20261208T163000Z',   // 10:00 PM IST is 16:30 UTC
        'SUMMARY:Arnab & Aishwarya Wedding - Haldi, Mehendi & Sangeet',
        'LOCATION:Anantgarh Resort, Rajasthan',
        'DESCRIPTION:Celebration of Arnab Karmakar & Aishwarya Negi. Haldi & Mehendi (10:30am), Lunch (1:30pm), Sagai & Sangeet (6:00pm), Dinner (7:30pm).',
        'END:VEVENT',
        // Day 2
        'BEGIN:VEVENT',
        'UID:arnab-aishwarya-day2-20261209@eweddingz.online',
        'DTSTAMP:20261009T100000Z',
        'DTSTART:20261209T043000Z', // 10:00 AM IST is 04:30 UTC
        'DTEND:20261209T133000Z',   // 7:00 PM IST is 13:30 UTC
        'SUMMARY:Arnab & Aishwarya Royal Vivah - Baraat, Phere & Big Feast',
        'LOCATION:Anantgarh Resort, Rajasthan',
        'DESCRIPTION:Baraat (10am), Phere (11:30am), Big Feast (1:30pm), Vidai (5pm). Venue: Anantgarh Resort.',
        'END:VEVENT',
        'END:VCALENDAR'
      ].join('\r\n');

      const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'Arnab-Aishwarya-Royal-Wedding.ics';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(link.href);
    });
  }

  // 9. RSVP FORM SUBMISSION
  const rsvpForm = document.getElementById('rsvp-form');
  const rsvpStatus = document.getElementById('rsvp-status');

  if (rsvpForm) {
    rsvpForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('guest-name').value.trim();
      const guests = document.getElementById('guest-count').value;
      const attendance = document.getElementById('guest-attendance').value;
      const side = document.getElementById('guest-side').value;
      const message = document.getElementById('guest-message').value.trim();

      if (!name) return;

      // Construct friendly WhatsApp greeting
      const waText = encodeURIComponent(
        `✦ *Royal Wedding RSVP - Arnab & Aishwarya* ✦\n\n` +
        `👤 *Guest Name:* ${name}\n` +
        `👥 *Number of Guests:* ${guests}\n` +
        `📅 *Attending:* ${attendance}\n` +
        `🪷 *Family Side:* ${side}\n` +
        (message ? `💌 *Wishes:* "${message}"\n\n` : `\n`) +
        `Looking forward to celebrating at Anantgarh Resort! ✨`
      );

      // Open WhatsApp or display confirmation
      const waUrl = `https://api.whatsapp.com/send?text=${waText}`;
      window.open(waUrl, '_blank');

      if (rsvpStatus) {
        rsvpStatus.textContent = `Thank you, ${name}! Your RSVP has been noted. We look forward to welcoming you at Anantgarh Resort!`;
        rsvpStatus.classList.add('success');
      }

      rsvpForm.reset();
    });
  }

})();
