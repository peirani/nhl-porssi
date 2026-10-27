// Yhteiset apufunktiot kaikille sivuille

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
