/* WhatsApp & Email RSVP behavior for Arnab & Aishwarya Royal Wedding */
window.initWeddingRSVP = (form, config, names) => {
  form.innerHTML = `
    <label for="rsvp-name">Your Full Name</label>
    <input id="rsvp-name" name="guestName" autocomplete="name" maxlength="120" placeholder="First and last name" required>
    <label for="rsvp-attendance">Will you be joining us?</label>
    <select id="rsvp-attendance" name="attendance" required>
      <option value="yes" selected>Joyfully accepts (Both Days • 8th &amp; 9th Dec)</option>
      <option value="dec8">Joining for 8th Dec only (Haldi, Mehendi &amp; Sangeet)</option>
      <option value="dec9">Joining for 9th Dec only (Baraat, Phere &amp; Feast)</option>
      <option value="no">Regretfully declines</option>
    </select>
    <div id="rsvp-party">
      <label for="rsvp-count">Number of guests attending</label>
      <input id="rsvp-count" name="guestCount" type="number" min="1" max="20" step="1" value="2" required aria-describedby="rsvp-count-help">
      <small id="rsvp-count-help">Including yourself</small>
    </div>
    <button type="submit" class="action rsvp-link" style="margin-top: 20px;">Confirm RSVP via WhatsApp ✦</button>
    <p class="rsvp-help" role="status" style="margin-top: 12px; font-size: 13px;"></p>
  `;

  const name = form.querySelector('#rsvp-name');
  const attendance = form.querySelector('#rsvp-attendance');
  const count = form.querySelector('#rsvp-count');
  const party = form.querySelector('#rsvp-party');
  const help = form.querySelector('.rsvp-help');

  const sync = () => {
    const attending = attendance.value !== 'no';
    party.hidden = !attending;
    count.disabled = !attending;
    count.required = attending;
  };

  attendance.addEventListener('change', sync);
  name.addEventListener('input', () => name.setCustomValidity(''));
  sync();

  form.addEventListener('submit', event => {
    event.preventDefault();
    if (!name.value.trim()) {
      name.setCustomValidity('Please enter your full name.');
      form.reportValidity();
      return;
    }

    const attending = attendance.value !== 'no';
    const attendText = attendance.options[attendance.selectedIndex].text;
    const guestCountVal = attending ? count.value : '0';

    const waMsg = encodeURIComponent(
      `✦ *ROYAL WEDDING RSVP — ARNAB & AISHWARYA* ✦\n\n` +
      `👤 *Guest Name:* ${name.value.trim()}\n` +
      `📅 *Attendance:* ${attendText}\n` +
      `👥 *Number of Guests:* ${guestCountVal}\n\n` +
      `Looking forward to celebrating at Anantgarh Resort, Rajasthan! ✨`
    );

    window.open(`https://api.whatsapp.com/send?text=${waMsg}`, '_blank');
    help.textContent = 'Thank you! WhatsApp will open with your RSVP message. Please tap Send to confirm.';
  });
};
