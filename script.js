(function () {
  'use strict';

  var THEME_KEY = 'chadcv-theme';
  var DEFAULT_THEME = 'dark';

  // Theme: apply saved preference and handle toggle
  function getTheme() {
    try {
      var saved = localStorage.getItem(THEME_KEY);
      return saved === 'light' || saved === 'dark' ? saved : DEFAULT_THEME;
    } catch (e) {
      return DEFAULT_THEME;
    }
  }

  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch (e) {}
    var btn = document.querySelector('.theme-toggle');
    if (btn) {
      btn.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
      btn.setAttribute('title', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
    }
  }

  document.documentElement.setAttribute('data-theme', getTheme());
  setTheme(getTheme()); // sync aria-label/title

  var themeToggle = document.querySelector('.theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      var next = getTheme() === 'dark' ? 'light' : 'dark';
      setTheme(next);
    });
  }

  // Nav: add .scrolled when user has scrolled
  var nav = document.querySelector('.nav');
  if (nav) {
    function onScroll() {
      nav.classList.toggle('scrolled', window.scrollY > 40);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // Scroll hint: fixed above bottom of viewport, lags behind as user scrolls (parallax), then fades out
  var scrollHint = document.querySelector('.scroll-hint');
  if (scrollHint) {
    var scrollHintThreshold = 280;
    var scrollLagFactor = 0.22;
    var scrollLagMax = 56;

    function updateScrollHint() {
      var y = window.scrollY || window.pageYOffset;
      if (y >= scrollHintThreshold) {
        scrollHint.classList.add('scroll-hint--hidden');
        scrollHint.style.transform = 'translate(-50%, 0)';
      } else {
        scrollHint.classList.remove('scroll-hint--hidden');
        var lag = Math.min(y * scrollLagFactor, scrollLagMax);
        scrollHint.style.transform = 'translate(-50%, ' + lag + 'px)';
      }
    }

    window.addEventListener('scroll', updateScrollHint, { passive: true });
    updateScrollHint();
  }

  // Photo: support GitHub Pages and local file (file://) loading
  var photoPlaceholder = document.getElementById('photoPlaceholder');
  if (photoPlaceholder) {
    var photoUrl = photoPlaceholder.getAttribute('data-photo');
    var base = getBaseUrl();

    if (photoUrl) {
      // Explicit URL from data-photo (absolute or relative)
      setPhoto(photoPlaceholder, photoUrl);
    } else {
      // Try common paths that work both on GitHub Pages and locally
      var candidates = ['assets/photo.jpg', 'assets/photo.png', 'photo.jpg', 'photo.png'];
      tryFirstImage(photoPlaceholder, base, candidates);
    }
  }

  function getBaseUrl() {
    if (typeof window.location === 'undefined') return '';
    var loc = window.location;
    if (loc.protocol === 'file:') {
      var path = loc.pathname;
      if (path.indexOf('/') === -1) return './';
      return path.replace(/\/[^/]*$/, '/');
    }
    var path = loc.pathname;
    return loc.origin + (path.endsWith('/') ? path : path.replace(/\/[^/]*$/, '/'));
  }

  function setPhoto(el, src) {
    var img = new Image();
    img.alt = 'Chad LaFarge';
    img.onload = function () {
      el.classList.add('has-photo');
      el.innerHTML = '';
      el.appendChild(img);
    };
    img.onerror = function () { /* keep placeholder */ };
    img.src = src;
  }

  function tryFirstImage(placeholder, base, paths) {
    var i = 0;
    function next() {
      if (i >= paths.length) return;
      var path = paths[i++];
      var url = path.startsWith('http') ? path : base + path;
      var img = new Image();
      img.onload = function () {
        setPhoto(placeholder, url);
      };
      img.onerror = next;
      img.src = url;
    }
    next();
  }
})();
