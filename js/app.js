(function () {
  'use strict';

  /* —— Slider —— */
  let idx = 0;
  const slidesEl = document.getElementById('slides');

  function show() {
    if (slidesEl) {
      slidesEl.style.transform = 'translateX(' + (-idx * 100) + '%)';
    }
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

  var sliderInterval = setInterval(window.next, 6000);

  window.addEventListener('beforeunload', function () {
    clearInterval(sliderInterval);
  });

  /* —— Scroll —— */
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

  /* —— Theme —— */
  document.querySelectorAll('.theme-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var theme = btn.getAttribute('data-theme');
      document.body.className = theme;
      try { localStorage.setItem('theme', theme); } catch (e) { /* noop */ }
    });
  });

  var savedTheme;
  try { savedTheme = localStorage.getItem('theme'); } catch (e) { /* noop */ }
  if (savedTheme) {
    document.body.className = savedTheme;
  }

  /* —— Mobile menu —— */
  var burger = document.getElementById('burger');
  var mobileMenu = document.getElementById('mobileMenu');

  window.toggleMobileMenu = function () {
    if (!mobileMenu) return;
    var isHidden = mobileMenu.style.display !== 'flex';
    mobileMenu.style.display = isHidden ? 'flex' : 'none';
  };

  if (burger) {
    burger.addEventListener('click', window.toggleMobileMenu);
  }

  document.addEventListener('click', function (event) {
    if (!mobileMenu || !burger) return;
    if (!mobileMenu.contains(event.target) && !burger.contains(event.target)) {
      mobileMenu.style.display = 'none';
    }
  });

})();
