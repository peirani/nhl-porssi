// Yhteiset apufunktiot kaikille sivuille

// Google Analytics (mittaustunnus G-D9YG4FNJRC, striimi "NHL Pörssi GitHub")
(function() {
  var GA_ID = 'G-D9YG4FNJRC';
  var s = document.createElement('script');
  s.async = true;
  s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
  document.head.appendChild(s);
  window.dataLayer = window.dataLayer || [];
  window.gtag = function() { dataLayer.push(arguments); };
  gtag('js', new Date());
  gtag('config', GA_ID);
})();

// Kuvakkeet ja sovellustiedot kaikille sivuille (aloitusnäytön kuvake, välilehden kuvake)
(function() {
  var linkit = [
    ['manifest', 'manifest.json'],
    ['icon', 'favicon-32.png'],
    ['apple-touch-icon', 'apple-touch-icon.png']
  ];
  linkit.forEach(function(l) {
    var el = document.createElement('link');
    el.rel = l[0];
    el.href = l[1];
    document.head.appendChild(el);
  });
  var vari = document.createElement('meta');
  vari.name = 'theme-color';
  vari.content = '#0A2038';
  document.head.appendChild(vari);
})();

function esc(s) {
  return String(s == null ? '' : s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;')
    .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

// Hakee data/<nimi>.json. Tunniste vaihtuu 5 minuutin välein, joten
// uusi data näkyy viimeistään 5 min viennin jälkeen (ohittaa GitHubin välimuistin).
function haeData(nimi) {
  var v = Math.floor(Date.now() / 300000);
  return fetch('data/' + nimi + '.json?v=' + v).then(function(r) {
    if (!r.ok) throw new Error('HTTP ' + r.status);
    return r.json();
  });
}

// Vierittää valikon niin, että avoinna oleva sivu näkyy (puhelimella valikko vierii sivusuunnassa)
(function() {
  var on = document.querySelector('.nav a.on');
  var rivi = document.querySelector('.nav .in');
  if (on && rivi && rivi.scrollWidth > rivi.clientWidth) {
    rivi.scrollLeft = on.offsetLeft - (rivi.clientWidth - on.offsetWidth) / 2;
  }
})();

// Telegram-nappi yläpalkkiin kaikille sivuille (NHL Uutiset -ryhmä)
(function() {
  var TG = 'https://t.me/+OcD4QHl1lD04ZjA8';
  var css = document.createElement('style');
  css.textContent =
    '.top .in{display:flex;align-items:center;justify-content:space-between;gap:10px;}' +
    '.tgnappi{display:inline-flex;align-items:center;gap:6px;background:#229ED9;color:#fff;text-decoration:none;' +
    'font-size:13px;font-weight:700;padding:6px 12px;border-radius:999px;white-space:nowrap;}' +
    '.tgnappi:hover{background:#1c8cc2;}' +
    '.tgnappi svg{width:16px;height:16px;fill:#fff;}' +
    '@media (max-width:520px){.tgnappi{font-size:12px;padding:5px 10px;}}';
  document.head.appendChild(css);
  var paikka = document.querySelector('.top .in');
  if (!paikka) return;
  var a = document.createElement('a');
  a.className = 'tgnappi';
  a.href = TG;
  a.target = '_blank';
  a.rel = 'noopener';
  a.title = 'Liity NHL Uutiset -ryhmään Telegramissa';
  a.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9.78 15.28 9.6 19.3c.36 0 .52-.16.71-.35l1.7-1.63 3.53 2.58c.65.36 1.11.17 1.29-.6l2.33-10.94c.21-.97-.35-1.35-.98-1.11L4.47 12.3c-.94.37-.93.9-.16 1.14l3.5 1.09 8.12-5.12c.38-.25.73-.11.44.14z"/></svg>NHL Uutiset';
  paikka.appendChild(a);
})();
