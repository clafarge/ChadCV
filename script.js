(function () {
  'use strict';

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
