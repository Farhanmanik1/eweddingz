(() => {
  'use strict';
  const data = window.WEDDING_DATA;
  const theme = window.INVITATION_THEMES[data.theme] || window.INVITATION_THEMES["royal-rajasthan"] || window.INVITATION_THEMES["cinnamon-camellia"];
  const root = document.documentElement;
  ['paper','ink','accent'].forEach(key => root.style.setProperty(`--${key}`, theme[key]));
  const asset = name => `data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=`;
  const assetUrl = name => {
    try { return new URL(asset(name), location.href).href; } catch { return asset(name); }
  };
  root.style.setProperty('--botanical', `url("${assetUrl('botanical.webp')}")`);
  root.style.setProperty('--timeline-flower', `url("/arnab-aishwarya/images/flower.png")`);
  document.body.classList.add(`theme-${data.theme}`, 'locked');
  const escape = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const safeURL = value => { try { const u = new URL(value, location.href); return ['http:','https:','file:'].includes(u.protocol) ? u.href : ''; } catch { return ''; } };
  const text = escape;
  const date = new Date(data.wedding.dateISO);
  const validDate = !Number.isNaN(date.getTime());
  document.title = `${data.couple.first} & ${data.couple.second} | Royal Wedding Invitation`;
  document.querySelector('#app').innerHTML = `
    <div class="entrance" id="entrance">
      <img class="envelope" src="${data.media.openingPoster ? text(safeURL(data.media.openingPoster)) : asset('envelope-first.webp')}" alt="" fetchpriority="high" style="display: none;">
      <img class="envelope envelope-end" id="envelope-end" data-src="${asset('envelope-last.webp')}" alt="" hidden>
      <button class="open-invitation" id="open" aria-label="Open the royal wedding invitation" style="z-index: 10;"><span class="open-caption">Open your invitation<small>${text(data.couple.first)} &amp; ${text(data.couple.second)}</small></span></button>
      <video class="opening-video" id="opening-video" muted playsinline preload="auto" src="/arnab-aishwarya/part1.mp4#t=0.001" style="object-fit: cover; width: 100%; height: 100%; position: absolute; z-index: 0;"></video>
      <button class="skip-opening" id="skip" hidden>Skip opening</button>
    </div>
    <main class="invitation" id="invitation" inert>
      <section class="hero" aria-label="Wedding invitation">
        <img class="hero-art" src="${data.media.heroPoster ? text(safeURL(data.media.heroPoster)) : asset('hero-first.webp')}" alt="" decoding="async" style="display: none;">
        <video class="hero-video" id="hero-video" muted autoplay playsinline preload="none" src="/arnab-aishwarya/part2.mp4" style="object-fit: cover; width: 100%; height: 100%; position: absolute; z-index: 0;"></video>
        <div class="hero-copy" style="z-index: 10;"><p class="occasion">The royal wedding of</p><p class="date">${text(data.wedding.dateLabel)}</p>
          <h1 class="names" id="names" tabindex="-1"><span>${text(data.couple.first)}</span><i>&amp;</i><span>${text(data.couple.second)}</span></h1>
          <p class="hero-note">${text(data.couple.heroNote)}</p><a class="hero-link" href="#our-invitation">With love, you are invited</a>
        </div>
      </section>
      <section class="paper-section floral intro" id="our-invitation" aria-label="Our invitation">
        <h2 class="script reveal">${text(data.couple.subtitle)}</h2><div class="rule" aria-hidden="true"></div>
        <p class="reveal">${text(data.wedding.salutation)}</p><p class="invitation-note reveal">${text(data.wedding.invitationNote)}</p>
      </section>

      <!-- Sacred Family Roots Section (Bengal & Rajasthan) -->
      <section class="paper-section floral family-section" aria-label="Two Traditions and Families" style="padding-top: 20px; padding-bottom: 70px;">
        <h2 class="script reveal">With Family Blessings</h2>
        <div class="rule" aria-hidden="true"></div>
        <div style="display:flex; flex-direction:column; gap:20px; max-width:420px; margin:0 auto; text-align:center;">
          <div style="background:color-mix(in srgb, var(--paper) 95%, white); border:1px solid color-mix(in srgb, var(--metal) 45%, transparent); border-radius:12px; padding:20px 16px; box-shadow:0 4px 15px #00000008;" class="reveal">
            <span style="font-size:11px; letter-spacing:2px; text-transform:uppercase; color:var(--accent); font-weight:700; display:block; margin-bottom:6px;">🌿 Groom’s Roots • Bengal</span>
            <strong style="font-size:24px; font-family:'Cormorant Garamond',serif; color:var(--ink); display:block; margin-bottom:6px;">Arnab Karmakar</strong>
            <p style="font-size:15px; margin:0; opacity:0.9; line-height:1.5;">With blessings from beloved parents:<br><strong>Smt. Malina Karmakar</strong> (Mother)<br><strong>Shri Swapan Kumar Karmakar</strong> (Father)</p>
          </div>
          <div style="background:color-mix(in srgb, var(--paper) 95%, white); border:1px solid color-mix(in srgb, var(--metal) 45%, transparent); border-radius:12px; padding:20px 16px; box-shadow:0 4px 15px #00000008;" class="reveal">
            <span style="font-size:11px; letter-spacing:2px; text-transform:uppercase; color:var(--accent); font-weight:700; display:block; margin-bottom:6px;">👑 Bride’s Roots • Rajasthan</span>
            <strong style="font-size:24px; font-family:'Cormorant Garamond',serif; color:var(--ink); display:block; margin-bottom:6px;">Aishwarya Negi</strong>
            <p style="font-size:15px; margin:0; opacity:0.9; line-height:1.5;">With blessings from beloved parents:<br><strong>Smt. Nirmala Devi</strong> (Mother)<br><strong>Shri Jagdish Prasad</strong> (Father)</p>
          </div>
        </div>
      </section>

      <section class="paper-section countdown-section torn" aria-labelledby="countdown-title"><h2 class="script" id="countdown-title">Until the Auspicious Muhurat</h2>
        <div class="countdown" id="countdown" role="timer" aria-label="Time until the wedding"><div><strong data-count="days">00</strong><span>Days</span></div><div><strong data-count="hours">00</strong><span>Hours</span></div><div><strong data-count="minutes">00</strong><span>Minutes</span></div><div><strong data-count="seconds">00</strong><span>Seconds</span></div></div><p class="countdown-note" id="countdown-note">${text(data.wedding.longDate)}</p>
      </section>
      <section class="paper-section floral schedule-section" aria-labelledby="schedule-title"><h2 class="script reveal" id="schedule-title">The Royal Itinerary</h2><ol class="timeline">${data.schedule.map(event=>`<li class="reveal"><time>${text(event.time)}</time><span class="event-marker" aria-hidden="true"></span><span class="event-name">${text(event.title)}</span></li>`).join('')}</ol><p class="schedule-note">${text(data.wedding.scheduleNote)}</p></section>
      <section class="paper-section venue-section torn" aria-labelledby="venue-title"><h2 class="script reveal" id="venue-title">Where We Celebrate</h2><img class="venue-scene reveal" src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=800" alt="Anantgarh Resort, Rajasthan" loading="lazy"><p class="venue-caption">${text(data.venue.sceneCaption)}</p><div class="location-frame reveal"><h3 class="venue-name">${text(data.venue.name)}</h3><div class="rule" aria-hidden="true"></div><address class="venue-address">${text(data.venue.address)}</address><p>${text(data.venue.timeLabel)}</p><div class="actions"><a class="action" id="maps" href="https://maps.app.goo.gl/jBfqTfXgRUDQVKC66" target="_blank" rel="noopener noreferrer">Open in Google Maps</a><button class="action secondary" id="calendar">Add to calendar</button></div></div><p class="travel-note">${text(data.venue.note)}</p></section>
      <section class="paper-section floral etiquette" aria-label="Guest details"><article class="reveal"><h2 class="script">Dress code</h2><p>${text(data.details.dressCode)}</p></article><div class="rule" aria-hidden="true"></div><article class="reveal"><h2 class="script">Your presence, our present</h2><p>${text(data.details.giftPreference)}</p></article></section>

      <!-- RSVP Section -->
      <section class="paper-section rsvp-section torn" id="rsvp-section" aria-labelledby="rsvp-title">
        <div class="rsvp-card reveal">
          <span class="rsvp-kicker">Reply</span>
          <h2 class="script" id="rsvp-title">Kindly Respond</h2>
          <div class="rule" aria-hidden="true"></div>
          <p>Will you grace our two-day royal celebration with your presence?</p>
          <form id="rsvp-form" class="rsvp-form"></form>
        </div>
      </section>

      <footer class="closing" aria-labelledby="closing-title" style="position: relative; overflow: hidden;">
        <div class="closing-scene">
          <img class="closing-art" src="${data.media.heroPoster ? text(safeURL(data.media.heroPoster)) : asset('hero-first.webp')}" alt="" width="720" height="1280" loading="lazy" decoding="async">
          <div class="closing-copy reveal" style="position: relative; z-index: 10;">
            <p class="closing-eyebrow">The beginning of our forever</p>
            <h2 class="closing-title" id="closing-title">With all <em>our love</em></h2>
            <div class="closing-rule" aria-hidden="true"></div>
            <p class="closing-names"><span>${text(data.couple.first)}</span><i>&amp;</i><span>${text(data.couple.second)}</span></p>
            <p class="closing-date">${text(data.wedding.dateLabel)}</p>
            <p class="closing-note">Our celebration will be complete only with your presence and blessings.</p>

          </div>
          <p class="closing-caption">A sacred union of Bengal &amp; Rajasthan.</p>
        </div>
        <div class="closing-colophon">
          <button class="reopen" id="reopen">Open the royal envelope again <span aria-hidden="true">↺</span></button>
          <a class="dearly-signature" href="/" aria-label="Explore eWeddingz invitations">eWeddingz<small>Crafted for your forever</small></a>
          ${data.media.music && data.media.musicTitle ? `<p class="music-credit">Music: <a href="${text(safeURL(data.media.musicSource))}" target="_blank" rel="noopener noreferrer">${text(data.media.musicTitle)}</a><br><small>Volume adjusted</small></p>` : ''}
        </div>
      </footer>
    </main>
    <div class="media-controls" id="media-controls" hidden><button class="media-button" id="motion" aria-pressed="false" hidden>Pause motion</button><button class="media-button" id="music" aria-pressed="false" hidden>Play music</button></div>
    <audio id="audio" loop preload="none"></audio><p id="status" class="status" role="status" hidden></p>`;

  const $ = id => document.getElementById(id);
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const hero = $('hero-video'), opening = $('opening-video'), audio = $('audio');
  let musicAttempted = false;
  let opened = false, openingTimer, fadeTimer, statusTimer, heroLoopTimer, observersStarted = false;
  let motionPaused = reduced.matches;
  const ambience = window.initInvitationMotion ? window.initInvitationMotion({theme:data.theme,reduced}) : { setPaused: ()=>{} };
  function syncMotion() {
    const stopped = motionPaused || reduced.matches;
    if (ambience && ambience.setPaused) ambience.setPaused(stopped || !opened);
    $('motion').hidden=false;
    $('motion').disabled=reduced.matches;
    $('motion').textContent=reduced.matches ? 'Reduced motion' : (motionPaused ? 'Play motion' : 'Pause motion');
    $('motion').setAttribute('aria-pressed',String(stopped));
    hero.hidden=stopped || !source('heroVideo');
    if(stopped || !opened) {
      clearTimeout(heroLoopTimer);
      hero.pause();
    } else if(source('heroVideo')) {
      clearTimeout(heroLoopTimer);
      hero.play().catch(()=>{hero.hidden=true;});
    }
  }
  const notify = message => { $('status').textContent = message; $('status').hidden=false; clearTimeout(statusTimer); statusTimer=setTimeout(()=>$('status').hidden=true,4500); };
  const source = name => data.media[name] ? safeURL(data.media[name]) : '';
  if (source('openingVideo')) { opening.src=source('openingVideo') + '?v=3#t=0.001'; opening.poster=source('openingPoster') || ''; opening.preload='auto'; }
  if (source('heroVideo')) { hero.src=source('heroVideo') + '?v=3'; hero.poster=source('heroPoster') || asset('hero-first.webp'); }
  if (source('music')) { audio.src=source('music'); audio.volume=.45; }
  audio.addEventListener('error',()=>{ $('music').textContent='Play music'; $('music').setAttribute('aria-pressed','false'); if(opened) notify('Music could not be loaded. You can still enjoy the invitation.'); });
  const mapsURL = data.venue.mapsUrl ? safeURL(data.venue.mapsUrl) : '';
  $('maps').hidden = !mapsURL && !data.venue.address.trim();
  $('maps').href=mapsURL || `https://maps.app.goo.gl/jBfqTfXgRUDQVKC66`;

  // Initialize WhatsApp RSVP
  if ($('rsvp-form') && window.initWeddingRSVP) {
    window.initWeddingRSVP($('rsvp-form'), data.rsvp, `${data.couple.first} & ${data.couple.second}`);
  }

  function beginObservers() {
    if(observersStarted || !('IntersectionObserver' in window)) return;
    observersStarted=true;
    const reveal=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){if(!reduced.matches && !motionPaused) entry.target.classList.add('arriving');reveal.unobserve(entry.target);}}),{threshold:.12});
    document.querySelectorAll('.reveal').forEach(el=>reveal.observe(el));
    const timeline=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){document.querySelectorAll('.timeline li').forEach(el=>el.classList.remove('is-current'));entry.target.classList.add('is-current');}}),{rootMargin:'-30% 0px -45% 0px'});
    document.querySelectorAll('.timeline li').forEach(el=>timeline.observe(el));
  }
  function finishOpening() {
    if($('entrance').classList.contains('leaving') || $('entrance').hidden)return;
    clearTimeout(openingTimer);
    $('entrance').classList.add('leaving');
    $('invitation').inert=false;
    document.body.classList.remove('locked');
    $('media-controls').hidden=false;
    syncMotion();
    $('music').hidden=!source('music');
    beginObservers();
    $('names').focus({preventScroll:true});
    fadeTimer=setTimeout(()=>{$('entrance').hidden=true;opening.pause();},reduced.matches?0:900);
  }
  async function openInvitation() {
    if(opened)return;opened=true;$('open').disabled=true;
    $('entrance').classList.add('opening');
    if(source('heroVideo') && !reduced.matches) { hero.preload='auto'; hero.load(); }
    if(source('music')) {
      $('media-controls').hidden=false; $('music').hidden=false;
      if(!musicAttempted) { musicAttempted=true; audio.play().then(()=>{ $('music').textContent='Pause music'; $('music').setAttribute('aria-pressed','true'); }).catch(()=>{}); }
    }
    if(source('openingVideo') && !reduced.matches){
      $('skip').hidden=false;$('skip').focus();opening.hidden=false;
      openingTimer=setTimeout(finishOpening,20000);
      try{await opening.play();}catch{finishOpening();}
    }else if(reduced.matches){finishOpening();}
    else{const end=$('envelope-end');end.src=end.dataset.src;end.hidden=false;openingTimer=setTimeout(finishOpening,1800);}
  }
  $('open').addEventListener('click',openInvitation);
  $('skip').addEventListener('click',finishOpening);
  opening.addEventListener('ended',finishOpening);
  opening.addEventListener('error',()=>{if(opened)finishOpening();});
  opening.addEventListener('timeupdate',()=>{if(Number.isFinite(opening.duration)&&opening.currentTime>=opening.duration-.8)finishOpening();});
  
  // Hero video 5-sec loop as requested!
  hero.addEventListener('ended', () => {
    clearTimeout(heroLoopTimer);
    heroLoopTimer = setTimeout(() => {
      const stopped = motionPaused || reduced.matches;
      if (!stopped && opened) {
        hero.currentTime = 0;
        hero.play().catch(() => {});
      }
    }, 5000);
  });
  hero.addEventListener('error',()=>{hero.hidden=true;});
  $('reopen').addEventListener('click',()=>{clearTimeout(fadeTimer);clearTimeout(openingTimer);clearTimeout(heroLoopTimer);window.scrollTo({top:0,behavior:'instant'});opened=false;if (ambience && ambience.setPaused) ambience.setPaused(true);opening.pause();opening.currentTime=0;opening.hidden=true;hero.pause();hero.currentTime=0;$('entrance').hidden=false;$('entrance').classList.remove('leaving','opening');$('open').disabled=false;$('skip').hidden=true;$('invitation').inert=true;$('media-controls').hidden=true;document.body.classList.add('locked');$('open').focus();});
  $('music').addEventListener('click',async()=>{if(audio.paused){try{await audio.play();$('music').textContent='Pause music';$('music').setAttribute('aria-pressed','true');}catch{notify('Music could not be played. Please try again.');}}else{audio.pause();$('music').textContent='Play music';$('music').setAttribute('aria-pressed','false');}});
  $('motion').addEventListener('click',()=>{if(reduced.matches)return;motionPaused=!motionPaused;syncMotion();});
  reduced.addEventListener('change',event=>{motionPaused=event.matches;if(event.matches && opened)finishOpening();syncMotion();});

  function tick(){
    if(!validDate){$('countdown').hidden=true;$('countdown-note').textContent=data.wedding.longDate;return;}
    const remaining=Math.max(0,date.getTime()-Date.now()), seconds=Math.floor(remaining/1000);
    const values={days:Math.floor(seconds/86400),hours:Math.floor(seconds/3600)%24,minutes:Math.floor(seconds/60)%60,seconds:seconds%60};
    for(const [key,value] of Object.entries(values)) {
      const el = document.querySelector(`[data-count="${key}"]`);
      if (el) el.textContent=String(value).padStart(2,'0');
    }
    if(!remaining){$('countdown-title').textContent='Our celebration has begun';$('countdown-note').textContent='Thank you for being part of our story.';}
  }
  tick();setInterval(tick,1000);
  const icsEscape=value=>String(value).replace(/\\/g,'\\\\').replace(/\r?\n/g,'\\n').replace(/,/g,'\\,').replace(/;/g,'\\;');
  const stamp=value=>value.toISOString().replace(/[-:]/g,'').replace(/\.\d{3}/,'');
  $('calendar').disabled=!validDate;
  $('calendar').addEventListener('click',()=>{
    const configuredEnd=new Date(data.wedding.endISO);const end=Number.isFinite(configuredEnd.getTime())&&configuredEnd>date?configuredEnd:new Date(date.getTime()+6*3600000);
    const lines=['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//eWeddingz//Arnab & Aishwarya Wedding//EN','CALSCALE:GREGORIAN','BEGIN:VEVENT',`UID:${icsEscape(data.theme)}-${date.getTime()}@eweddingz.online`,`DTSTAMP:${stamp(new Date())}`,`DTSTART:${stamp(date)}`,`DTEND:${stamp(end)}`,`SUMMARY:${icsEscape(data.couple.first+' & '+data.couple.second+' Royal Wedding')}`,`LOCATION:${icsEscape(data.venue.name+', '+data.venue.address)}`,`DESCRIPTION:${icsEscape(data.wedding.invitationNote)}`,'END:VEVENT','END:VCALENDAR'];
    const url=URL.createObjectURL(new Blob([lines.join('\r\n')+'\r\n'],{type:'text/calendar;charset=utf-8'}));const a=document.createElement('a');a.href=url;a.download=`${data.couple.first}-${data.couple.second}-wedding.ics`;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);notify('Your calendar invitation has been downloaded.');
  });
})();
