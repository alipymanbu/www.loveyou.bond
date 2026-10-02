/* FluxDown 介绍站 · 交互脚本
   1) 把 links.js 里的网盘地址统一挂到所有 [data-site-link="download"] 按钮上
   2) 右下角浮动按钮：返回顶部（下滚后出现）
   3) 进视口渐显（尊重 prefers-reduced-motion） */
(function () {
  'use strict';

  /* 下载按钮统一指向 links.js 里的网盘地址 */
  var dl = (window.SITE_LINKS && window.SITE_LINKS.download) || '';
  var btns = document.querySelectorAll('[data-link="download"]');
  for (var i = 0; i < btns.length; i++) {
    if (dl) {
      btns[i].setAttribute('href', dl);
    } else {
      btns[i].addEventListener('click', function (e) { e.preventDefault(); });
    }
  }

  /* 返回顶部：下滚后出现 */
  var topBtn = document.getElementById('backTop');
  if (topBtn) {
    var onScroll = function () {
      if (window.scrollY > 480) { topBtn.classList.add('show'); }
      else { topBtn.classList.remove('show'); }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    topBtn.addEventListener('click', function () {
      var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
    });
  }

  /* 进视口渐显 */
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var items = document.querySelectorAll('.reveal');
  if (!reduce && 'IntersectionObserver' in window && items.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { threshold: 0.12 });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add('in'); });
  }
})();
