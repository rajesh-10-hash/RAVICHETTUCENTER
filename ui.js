/* ═══════════════════════════════════
   RC CENTER — SHARED NAV + FOOTER JS
   ═══════════════════════════════════ */

function rcNavbar(activePage) {
  const links = [
    { href: 'index.html',        label: 'Home' },
    { href: 'about.html',        label: 'About' },
    { href: 'gallery.html',      label: 'Gallery' },
    { href: 'achievements.html', label: 'Achievements' },
    { href: 'contact.html',      label: 'Contact' },
    { href: 'login.html',        label: '⚙ Admin', cls: 'nav-admin' },
  ];

  const liItems = links.map(l => `
    <li>
      <a href="${l.href}"
         class="${l.cls || ''}${activePage === l.href ? ' active' : ''}">
        ${l.label}
      </a>
    </li>`).join('');

  const mobileItems = links.map(l => `
    <a href="${l.href}">${l.label}</a>`).join('');

  document.body.insertAdjacentHTML('afterbegin', `
    <nav class="rc-navbar">
      <a href="index.html" class="rc-logo">
        <img src="images/logo.png" onerror="this.style.display='none'">
        <div class="rc-logo-text">RC <span>Center</span></div>
      </a>
      <ul class="rc-nav-links">${liItems}</ul>
      <div class="rc-hamburger" onclick="rcToggleMobile()" id="rcHamburger">
        <span></span><span></span><span></span>
      </div>
    </nav>
    <div class="rc-mobile-nav" id="rcMobileNav">${mobileItems}</div>
  `);
}

function rcToggleMobile() {
  document.getElementById('rcMobileNav').classList.toggle('open');
}

function rcFooter() {
  document.body.insertAdjacentHTML('beforeend', `
    <footer class="rc-footer">
      <div class="rc-footer-inner">
        <div class="footer-brand">
          <a href="index.html" class="rc-logo">
            <img src="images/logo.png" onerror="this.style.display='none'">
            <div class="rc-logo-text">RC <span>Center</span></div>
          </a>
          <p>A passionate community friends group celebrating Vinayaka Chavithi with devotion, creativity, and friendship every year.</p>
          <div class="footer-social">
            <a href="https://www.instagram.com/_rc_center_/" target="_blank" class="social-btn">📸</a>
            <a href="contact.html" class="social-btn">✉️</a>
          </div>
        </div>
        <div class="footer-col">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="index.html">Home</a></li>
            <li><a href="about.html">About Us</a></li>
            <li><a href="gallery.html">Gallery</a></li>
            <li><a href="achievements.html">Achievements</a></li>
            <li><a href="contact.html">Contact</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Connect</h4>
          <ul>
            <li><a href="https://www.instagram.com/_rc_center_/" target="_blank">📸 Instagram</a></li>
            <li><a href="login.html">⚙ Admin Panel</a></li>
          </ul>
        </div>
      </div>
      <div class="rc-footer-bottom">
        © 2024 <span>RC Center</span> — Celebrating Vinayaka Chavithi with Unity & Culture ✦
      </div>
    </footer>
  `);
}

/* Scroll fade-in observer */
function rcObserveFade() {
  const els = document.querySelectorAll('.fade-in');
  const obs = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add('visible'), i * 80);
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });
  els.forEach(el => obs.observe(el));
}

document.addEventListener('DOMContentLoaded', rcObserveFade);
