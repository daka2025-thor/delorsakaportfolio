document.addEventListener('DOMContentLoaded', () => {
  AOS.init({ duration: 800, once: true, easing: 'ease-in-out' });

  const form = document.getElementById('contactForm');
  form.addEventListener('submit', e => {
    e.preventDefault();

    const data = new FormData(form);
    const params = new URLSearchParams(data);

    // 1. Envoi à l'API Web3Forms pour email
    fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        access_key: '4631ea28-9c6d-4728-a07d-f71594e0a2fe', // à remplacer
        ...Object.fromEntries(data),
        subject: 'Nouveau message portfolio'
      })
    }).then(res => res.json()).then(json => {
      if (json.success) alert('Message envoyé par email ✅');
      else alert('Erreur d’envoi email : ' + json.message);
    }).catch(err => alert('Erreur réseau : ' + err));

    // 2. Préparation message WhatsApp
    const waUrl = `https://api.whatsapp.com/send?phone=votreNumero&text=*Nouveau+message+portfolio*%0ANom:+${encodeURIComponent(data.get('name'))}%0AEmail:+${encodeURIComponent(data.get('email'))}%0AMessage:+${encodeURIComponent(data.get('message'))}`;
    window.open(waUrl, '_blank');
  });
});
