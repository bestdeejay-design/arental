(function () {
  'use strict';

  /* —— Review slider —— */
  var idx = 0;
  var slidesEl = document.getElementById('slides');
  var dotsEl = document.getElementById('sliderDots');

  function updateDots() {
    if (!dotsEl) return;
    var dots = dotsEl.querySelectorAll('.slider-dot');
    dots.forEach(function (d, i) {
      d.classList.toggle('active', i === idx);
    });
  }

  function show() {
    if (slidesEl) {
      slidesEl.style.transform = 'translateX(' + (-idx * 100) + '%)';
    }
    updateDots();
  }

  window.next = function () {
    if (!slidesEl || !slidesEl.children.length) return;
    idx = (idx + 1) % slidesEl.children.length;
    show();
  };

  window.prev = function () {
    if (!slidesEl || !slidesEl.children.length) return;
    idx = (idx - 1 + slidesEl.children.length) % slidesEl.children.length;
    show();
  };

  window.goToSlide = function (i) {
    if (!slidesEl || !slidesEl.children.length) return;
    idx = i;
    show();
  };

  var sliderInterval = setInterval(window.next, 6000);
  window.addEventListener('beforeunload', function () {
    clearInterval(sliderInterval);
  });

  if (dotsEl) {
    dotsEl.querySelectorAll('.slider-dot').forEach(function (dot, i) {
      dot.addEventListener('click', function () { window.goToSlide(i); });
    });
  }

  /* —— Smooth scroll —— */
  window.scrollToBlock = function (sel) {
    var el = document.querySelector(sel);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var href = this.getAttribute('href');
      if (href !== '#' && href.length > 1) {
        e.preventDefault();
        window.scrollToBlock(href);
      }
    });
  });

  window.scrollToTop = function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  /* —— Theme switcher —— */
  function setTheme(theme) {
    document.body.className = theme;
    try { localStorage.setItem('arental_theme', theme); } catch (e) { }
    document.querySelectorAll('.theme-btn').forEach(function (btn) {
      btn.classList.toggle('active', btn.getAttribute('data-theme') === theme);
    });
  }

  document.querySelectorAll('.theme-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      setTheme(btn.getAttribute('data-theme'));
    });
  });

  var savedTheme;
  try { savedTheme = localStorage.getItem('arental_theme'); } catch (e) { }
  setTheme(savedTheme || 'dark');

  /* —— Mobile menu —— */
  var burger = document.getElementById('burger');
  var mobileMenu = document.getElementById('mobileMenu');

  window.toggleMobileMenu = function () {
    if (!mobileMenu) return;
    var isOpen = mobileMenu.classList.contains('open');
    mobileMenu.classList.toggle('open');
    if (!isOpen) {
      mobileMenu.style.display = 'flex';
      requestAnimationFrame(function () {
        mobileMenu.classList.add('open');
      });
    } else {
      mobileMenu.classList.remove('open');
      setTimeout(function () {
        mobileMenu.style.display = 'none';
      }, 300);
    }
  };

  if (burger) {
    burger.addEventListener('click', window.toggleMobileMenu);
  }

  document.addEventListener('click', function (event) {
    if (!mobileMenu || !burger) return;
    if (!mobileMenu.contains(event.target) && !burger.contains(event.target) && mobileMenu.classList.contains('open')) {
      mobileMenu.classList.remove('open');
      setTimeout(function () {
        mobileMenu.style.display = 'none';
      }, 300);
    }
  });

})();
