(function () {
  'use strict';

  /* —— Site toggle (easter egg) —— */
  window.toggleSite = function () {
    var slider = document.getElementById('siteSlider');
    if (slider) {
      slider.classList.toggle('show-alt');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  /* —— Review sliders —— */
  var sliderState = { A: 0, B: 0 };
  var sliderIntervals = [];

  function getSlides(site) {
    return document.getElementById('slides' + site);
  }

  function showSlide(site) {
    var el = getSlides(site);
    if (el) {
      el.style.transform = 'translateX(' + (-sliderState[site] * 100) + '%)';
    }
  }

  window.next = function (site) {
    var el = getSlides(site);
    if (!el || !el.children.length) return;
    sliderState[site] = (sliderState[site] + 1) % el.children.length;
    showSlide(site);
  };

  window.prev = function (site) {
    var el = getSlides(site);
    if (!el || !el.children.length) return;
    sliderState[site] = (sliderState[site] - 1 + el.children.length) % el.children.length;
    showSlide(site);
  };

  ['A', 'B'].forEach(function (s) {
    if (getSlides(s)) {
      sliderIntervals.push(setInterval(function () { window.next(s); }, 6000));
    }
  });

  window.addEventListener('beforeunload', function () {
    sliderIntervals.forEach(function (id) { clearInterval(id); });
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

  window.scrollToTopB = function () {
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

  /* —— Mobile menus —— */
  window.toggleMobileMenu = function (site) {
    var menu = document.getElementById('mobileMenu' + site);
    if (!menu) return;
    var isHidden = menu.style.display !== 'flex';
    menu.style.display = isHidden ? 'flex' : 'none';
  };

  ['A', 'B'].forEach(function (s) {
    var burger = document.getElementById('burger' + s);
    if (burger) {
      burger.addEventListener('click', function () {
        window.toggleMobileMenu(s);
      });
    }
  });

  document.addEventListener('click', function (event) {
    ['A', 'B'].forEach(function (s) {
      var menu = document.getElementById('mobileMenu' + s);
      var burger = document.getElementById('burger' + s);
      if (menu && burger) {
        if (!menu.contains(event.target) && !burger.contains(event.target)) {
          menu.style.display = 'none';
        }
      }
    });
  });

})();
