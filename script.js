/* ============================================================
   CRAFTHUB — логика сайта
   Оглавление:
   1. ДАННЫЕ (РЕДАКТИРУЙ ЗДЕСЬ, когда добавляешь отделы)
   2. Хранилище   3. Звук        4. Небо (canvas)
   5. Добыча блока 6. Шапка      7. Карточки и модалка
   8. Подписка    9. Тосты      10. День/ночь
   11. Появление при скролле    12. Старт
   ============================================================ */

/* ---------- 1. ДАННЫЕ САЙТА — РЕДАКТИРУЙ ЗДЕСЬ ----------
   Чтобы добавить новый отдел: скопируй любой блок { ... },
   вставь через запятую и поменяй тексты. Карточка появится сама!
   color — цвет отдела, icon — иконка из набора ICONS ниже.  */
const SECTIONS = [
  {
    id: 'skins', title: 'Скины', color: '#6FCF3F', icon: 'skin',
    desc: 'Каталог скинов на любой вкус: от классики до полных безумий.',
    plan: ['Каталог с поиском и фильтрами', 'Примерка скина прямо на сайте', 'Скачивание в один клик', 'Загрузка своих скинов']
  },
  {
    id: 'textures', title: 'Текстуры', color: '#3EE6D8', icon: 'texture',
    desc: 'Ресурспаки, которые преобразят твой мир до неузнаваемости.',
    plan: ['Подборки по стилям и разрешениям', 'Превью «до / после»', 'Совместимость с версиями игры', 'Топ по оценкам игроков']
  },
  {
    id: 'mods', title: 'Моды', color: '#FF5C5C', icon: 'mod',
    desc: 'Проверенные моды: от удобных мелочей до целых вселенных.',
    plan: ['Каталог по версиям и загрузчикам', 'Гайды по установке шаг за шагом', 'Только проверенные файлы', 'Подборки «must have»']
  },
  {
    id: 'maps', title: 'Карты', color: '#FFC93C', icon: 'map',
    desc: 'Приключения, паркур, хорроры и головоломки на вечер (или на месяц).',
    plan: ['Каталог по жанрам и сложности', 'Скриншоты перед скачиванием', 'Установка за одну минуту', 'Карта недели от редакции']
  },
  {
    id: 'servers', title: 'Серверы', color: '#5B8CFF', icon: 'server',
    desc: 'Живой рейтинг серверов: выживание, мини-игры, анархия и RP.',
    plan: ['Рейтинг с живым онлайном', 'Фильтры по режимам и версиям', 'Копирование IP в один клик', 'Обзоры и правила серверов']
  },
  {
    id: 'guides', title: 'Сборки и гайды', color: '#B06BFF', icon: 'chest',
    desc: 'Готовые модпаки и гайды — от первого дома до автоматических ферм.',
    plan: ['Готовые сборки под слабый ПК', 'Пошаговые гайды для новичков', 'Оптимизация FPS', 'Секреты и скрытые механики']
  }
];

const ACHIEVEMENTS = [
  { n: 1,   title: 'Первый блок!',   desc: 'Добыча началась' },
  { n: 10,  title: 'Каменщик',       desc: '10 блоков в копилке' },
  { n: 25,  title: 'Шахтёр',         desc: '25 блоков — серьёзная заявка' },
  { n: 50,  title: 'Мастер кирки',   desc: '50 блоков! Кирка дымится' },
  { n: 100, title: 'Легенда шахт',   desc: '100 блоков. Тебе нет равных' }
];

/* Пиксельные иконки отделов */
const ICONS = {
  skin: `<svg viewBox="0 0 24 24" fill="currentColor" shape-rendering="crispEdges"><rect x="4" y="4" width="16" height="3"/><rect x="4" y="7" width="3" height="10"/><rect x="17" y="7" width="3" height="10"/><rect x="7" y="17" width="10" height="3"/><rect x="8" y="10" width="3" height="3"/><rect x="13" y="10" width="3" height="3"/><rect x="10" y="14" width="4" height="2"/></svg>`,
  texture: `<svg viewBox="0 0 24 24" fill="currentColor" shape-rendering="crispEdges"><rect x="4" y="4" width="7" height="7"/><rect x="13" y="4" width="7" height="7" opacity=".5"/><rect x="4" y="13" width="7" height="7" opacity=".5"/><rect x="13" y="13" width="7" height="7"/><rect x="15" y="6" width="3" height="3" opacity=".9"/><rect x="6" y="15" width="3" height="3" opacity=".9"/></svg>`,
  mod: `<svg viewBox="0 0 24 24" fill="currentColor" shape-rendering="crispEdges"><rect x="9" y="2" width="6" height="2"/><rect x="10" y="4" width="4" height="4"/><rect x="8" y="8" width="8" height="2"/><rect x="6" y="10" width="12" height="8"/><rect x="7" y="18" width="10" height="2"/><rect x="8" y="12" width="3" height="3" opacity=".45"/></svg>`,
  map: `<svg viewBox="0 0 24 24" fill="currentColor" shape-rendering="crispEdges"><rect x="4" y="4" width="16" height="2"/><rect x="4" y="18" width="16" height="2"/><rect x="4" y="6" width="2" height="12"/><rect x="18" y="6" width="2" height="12"/><rect x="11" y="7" width="2" height="4"/><rect x="11" y="13" width="2" height="4" opacity=".5"/><rect x="7" y="11" width="4" height="2" opacity=".5"/><rect x="13" y="11" width="4" height="2" opacity=".5"/><rect x="10" y="10" width="4" height="4"/></svg>`,
  server: `<svg viewBox="0 0 24 24" fill="currentColor" shape-rendering="crispEdges"><rect x="4" y="4" width="16" height="4"/><rect x="4" y="10" width="16" height="4"/><rect x="4" y="16" width="16" height="4"/><rect x="6" y="5" width="2" height="2" fill="var(--tile-cut, #1A1330)"/><rect x="6" y="11" width="2" height="2" fill="var(--tile-cut, #1A1330)"/><rect x="6" y="17" width="2" height="2" fill="var(--tile-cut, #1A1330)"/></svg>`,
  chest: `<svg viewBox="0 0 24 24" fill="currentColor" shape-rendering="crispEdges"><rect x="4" y="4" width="16" height="6"/><rect x="4" y="11" width="16" height="9"/><rect x="10" y="8" width="4" height="5"/><rect x="11" y="10" width="2" height="2" fill="var(--tile-cut, #1A1330)"/></svg>`
};

const CUBE_MINI = `<svg width="26" height="27" viewBox="0 0 100 105"><polygon points="50,4 94,26 50,48 6,26" fill="#6FCF3F"/><polygon points="6,26 50,48 50,100 6,78" fill="#7A4E2B"/><polygon points="94,26 50,48 50,100 94,78" fill="#93613A"/></svg>`;

/* ---------- 2. ХРАНИЛИЩЕ (запоминаем настройки в браузере) ---------- */
const PREFIX = 'mineverse.';
const OLD_PREFIX = 'crafthub.';

/* Переносим данные со старого имени сайта: блоки, достижения, подписка, настройки */
try {
  ['time', 'muted', 'mined', 'ach', 'sub'].forEach(function (k) {
    const old = localStorage.getItem(OLD_PREFIX + k);
    if (old !== null && localStorage.getItem(PREFIX + k) === null) {
      localStorage.setItem(PREFIX + k, old);
    }
  });
} catch (e) {}

const store = {
  get(key, fallback) {
    try { const v = localStorage.getItem(PREFIX + key); return v === null ? fallback : JSON.parse(v); }
    catch (e) { return fallback; }
  },
  set(key, value) {
    try { localStorage.setItem(PREFIX + key, JSON.stringify(value)); } catch (e) {}
  }
};

const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const state = {
  time: document.documentElement.dataset.time || 'night',
  muted: store.get('muted', false),
  mined: store.get('mined', 0),
  shown: store.get('ach', []),
  sub: store.get('sub', null)
};

/* ---------- 3. ЗВУК (синтезируется прямо в браузере, файлы не нужны) ---------- */
let audioCtx = null, masterGain = null, noiseBuf = null;

function ensureAudio() {
  const AC = window.AudioContext || window.webkitAudioContext;
  if (!AC) return false;
  if (!audioCtx) {
    audioCtx = new AC();
    masterGain = audioCtx.createGain();
    masterGain.gain.value = state.muted ? 0 : 0.5;
    masterGain.connect(audioCtx.destination);
    noiseBuf = audioCtx.createBuffer(1, audioCtx.sampleRate * 0.2, audioCtx.sampleRate);
    const d = noiseBuf.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
  }
  if (audioCtx.state === 'suspended') audioCtx.resume();
  return true;
}
function tone(type, f1, f2, dur, vol, delay = 0) {
  if (state.muted || !ensureAudio()) return;
  const t = audioCtx.currentTime + delay;
  const o = audioCtx.createOscillator(), g = audioCtx.createGain();
  o.type = type; o.frequency.setValueAtTime(f1, t);
  if (f2 !== f1) o.frequency.exponentialRampToValueAtTime(f2, t + dur);
  g.gain.setValueAtTime(vol, t);
  g.gain.exponentialRampToValueAtTime(0.001, t + dur);
  o.connect(g); g.connect(masterGain); o.start(t); o.stop(t + dur + 0.02);
}
const playClick = () => tone('square', 900, 640, 0.06, 0.16);
const playPop   = () => tone('sine', 260, 560, 0.13, 0.28);
const playError = () => tone('square', 150, 110, 0.16, 0.18);
const playDing  = () => { tone('triangle', 659, 659, 0.18, 0.22); tone('triangle', 988, 988, 0.24, 0.22, 0.12); };
function playBreak() {
  if (state.muted || !ensureAudio()) return;
  const t = audioCtx.currentTime;
  const src = audioCtx.createBufferSource(), g = audioCtx.createGain(), f = audioCtx.createBiquadFilter();
  src.buffer = noiseBuf; src.playbackRate.value = 0.85 + Math.random() * 0.3;
  f.type = 'lowpass'; f.frequency.value = 850;
  g.gain.setValueAtTime(0.55, t); g.gain.exponentialRampToValueAtTime(0.001, t + 0.18);
  src.connect(f); f.connect(g); g.connect(masterGain); src.start(t);
  tone('sine', 130, 70, 0.12, 0.25);
}

/* Звук клика для всех кнопок и ссылок интерфейса */
document.addEventListener('click', (e) => {
  if (e.target.closest('.btn, .nav__link, .icon-btn, .card')) playClick();
});

/* ---------- 4. НЕБО: звёзды, светлячки и пыльца на canvas ---------- */
const hero = document.getElementById('hero');
const canvas = document.getElementById('sky');
const ctx = canvas.getContext('2d');
let W = 0, H = 0, stars = [], flies = [], pollen = [];
let nightAmount = state.time === 'night' ? 1 : 0;
let heroVisible = true, rafId = null, running = false, lastT = 0;
let mx = 0, my = 0, px = 0, py = 0;
const parallaxEls = [...document.querySelectorAll('.parallax')];

function resizeSky() {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  W = hero.clientWidth; H = hero.clientHeight;
  canvas.width = W * dpr; canvas.height = H * dpr;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  const nStars = W < 600 ? 50 : 90;
  stars = Array.from({ length: nStars }, () => ({
    x: Math.random(), y: Math.random() * 0.6, s: 1 + Math.random() * 1.6,
    ph: Math.random() * 6.28, sp: 0.5 + Math.random() * 1.5, a: 0.3 + Math.random() * 0.6
  }));
  flies = Array.from({ length: W < 600 ? 14 : 24 }, () => ({
    x: Math.random() * W, y: Math.random() * H, sp: 6 + Math.random() * 9, ph: Math.random() * 6.28
  }));
  pollen = Array.from({ length: W < 600 ? 16 : 28 }, () => ({
    x: Math.random() * W, y: Math.random() * H, sp: 8 + Math.random() * 10, ph: Math.random() * 6.28
  }));
  if (reduced) drawSky(0);
}

function drawSky(t) {
  ctx.clearRect(0, 0, W, H);
  const na = nightAmount;
  if (na > 0.01) {
    ctx.fillStyle = '#FFFFFF';
    for (const s of stars) {
      ctx.globalAlpha = s.a * (0.55 + 0.45 * Math.sin(t * s.sp + s.ph)) * na;
      ctx.fillRect(s.x * W, s.y * H, s.s, s.s);
    }
    for (const f of flies) {
      const tw = 0.5 + 0.5 * Math.sin(t * 2 + f.ph);
      ctx.fillStyle = '#D9F76E';
      ctx.globalAlpha = 0.22 * tw * na; ctx.fillRect(f.x - 3, f.y - 3, 7, 7);
      ctx.globalAlpha = 0.9 * tw * na;  ctx.fillRect(f.x, f.y, 2.5, 2.5);
    }
  }
  if (na < 0.99) {
    const da = 1 - na;
    for (const p of pollen) {
      ctx.fillStyle = '#FFC94D';
      ctx.globalAlpha = 0.18 * da; ctx.fillRect(p.x - 2, p.y - 2, 6, 6);
      ctx.globalAlpha = 0.75 * da; ctx.fillRect(p.x, p.y, 2, 2);
    }
  }
  ctx.globalAlpha = 1;
}

function tick(now) {
  if (!running) return;
  const dt = Math.min((now - lastT) / 1000, 0.05); lastT = now;
  const t = now / 1000;
  const target = state.time === 'night' ? 1 : 0;
  nightAmount += (target - nightAmount) * Math.min(1, dt * 2.5);
  for (const f of flies) {
    f.y -= f.sp * dt; f.x += Math.sin(t * 0.6 + f.ph) * 9 * dt;
    if (f.y < -10) { f.y = H + 10; f.x = Math.random() * W; }
    if (f.x < -10) f.x = W + 10; if (f.x > W + 10) f.x = -10;
  }
  for (const p of pollen) {
    p.y += p.sp * dt; p.x += Math.sin(t * 0.5 + p.ph) * 13 * dt;
    if (p.y > H + 10) { p.y = -10; p.x = Math.random() * W; }
  }
  px += (mx - px) * 0.06; py += (my - py) * 0.06;
  for (const el of parallaxEls) {
    const d = +el.dataset.depth || 12;
    el.style.transform = `translate(${(px * d).toFixed(1)}px, ${(py * d * 0.6).toFixed(1)}px)`;
  }
  drawSky(t);
  rafId = requestAnimationFrame(tick);
}
function startSky() {
  if (running || reduced || !heroVisible || document.hidden) return;
  running = true; lastT = performance.now(); rafId = requestAnimationFrame(tick);
}
function stopSky() { running = false; cancelAnimationFrame(rafId); }

if ('ResizeObserver' in window) new ResizeObserver(resizeSky).observe(hero);
else window.addEventListener('resize', resizeSky);
document.addEventListener('visibilitychange', () => document.hidden ? stopSky() : startSky());
if ('IntersectionObserver' in window) {
  new IntersectionObserver(([e]) => { heroVisible = e.isIntersecting; heroVisible ? startSky() : stopSky(); },
    { threshold: 0.01 }).observe(hero);
}
if (!reduced && window.matchMedia('(pointer: fine)').matches) {
  hero.addEventListener('mousemove', (e) => {
    const r = hero.getBoundingClientRect();
    mx = ((e.clientX - r.left) / r.width - 0.5) * 2;
    my = ((e.clientY - r.top) / r.height - 0.5) * 2;
  });
  hero.addEventListener('mouseleave', () => { mx = 0; my = 0; });
}

/* ---------- 5. ДОБЫЧА БЛОКА + ДОСТИЖЕНИЯ ---------- */
const mineBlock = document.getElementById('mineBlock');
const mineHint = document.getElementById('mineHint');
const mineCount = document.getElementById('mineCount');
const xpBar = document.getElementById('xpBar');
const xpLabel = document.getElementById('xpLabel');
const burstLayer = document.getElementById('burstLayer');
let mining = false;

function spawnBurst(cx, cy, colors, count = 26) {
  if (reduced) return;
  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.className = 'pixel';
    const size = 5 + Math.random() * 8;
    p.style.cssText = `left:${cx}px;top:${cy}px;width:${size}px;height:${size}px;background:${colors[i % colors.length]}`;
    burstLayer.appendChild(p);
    const ang = Math.random() * Math.PI * 2, dist = 40 + Math.random() * 110;
    const dx = Math.cos(ang) * dist, up = 50 + Math.random() * 110, down = 130 + Math.random() * 140;
    const anim = p.animate([
      { transform: 'translate(0,0) rotate(0deg)', opacity: 1 },
      { transform: `translate(${dx * 0.6}px, ${-up}px) rotate(${Math.random() * 180}deg)`, opacity: 1, offset: 0.4 },
      { transform: `translate(${dx}px, ${down}px) rotate(${Math.random() * 360}deg)`, opacity: 0 }
    ], { duration: 700 + Math.random() * 400, easing: 'cubic-bezier(.2,.6,.35,1)' });
    anim.onfinish = () => p.remove();
  }
}

function updateMineUI() {
  mineCount.textContent = 'Добыто: ' + state.mined;
  const reached = ACHIEVEMENTS.filter(a => state.mined >= a.n);
  const level = reached.length;
  const prev = level ? reached[level - 1].n : 0;
  const next = ACHIEVEMENTS[level];
  const progress = next ? (state.mined - prev) / (next.n - prev) : 1;
  xpBar.style.width = Math.round(progress * 100) + '%';
  xpLabel.textContent = 'Ур. ' + level;
  xpLabel.title = next ? `До достижения: ${next.n - state.mined} блоков` : 'Максимальный уровень!';
  if (state.mined > 0) mineHint.textContent = 'Так держать! Добывай ещё ⛏';
}

function checkAchievements() {
  let dinged = false;
  for (const a of ACHIEVEMENTS) {
    if (state.mined >= a.n && !state.shown.includes(a.n)) {
      state.shown.push(a.n); store.set('ach', state.shown);
      toast(a.title, a.desc, true);
      if (!dinged) { playDing(); dinged = true; }
    }
  }
}

mineBlock.addEventListener('click', () => {
  if (mining) return;
  mining = true;
  state.mined++; store.set('mined', state.mined);
  playBreak();
  const r = mineBlock.getBoundingClientRect();
  spawnBurst(r.left + r.width / 2, r.top + r.height / 2,
    ['#7ED957', '#57B32E', '#8B5A33', '#6B4324', '#9BE15D']);
  mineBlock.classList.add('is-breaking');
  setTimeout(() => {
    mineBlock.classList.remove('is-breaking');
    mineBlock.classList.add('is-mined');
    updateMineUI(); checkAchievements();
  }, 300);
  setTimeout(() => {
    mineBlock.classList.remove('is-mined');
    mineBlock.classList.add('is-spawning');
    playPop();
    setTimeout(() => { mineBlock.classList.remove('is-spawning'); mining = false; }, 420);
  }, 1500);
});

/* ---------- 6. ШАПКА: скролл, меню, активные ссылки ---------- */
const navbar = document.getElementById('navbar');
const navLinks = document.getElementById('navLinks');
const burger = document.getElementById('burger');
const hills = document.querySelector('.hills');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('is-scrolled', window.scrollY > 8);
  if (!reduced && window.scrollY < hero.offsetHeight) {
    hills.style.transform = `translateY(${window.scrollY * 0.16}px)`;
  }
}, { passive: true });

function closeMenu() {
  navLinks.classList.remove('is-open');
  burger.classList.remove('is-open');
  burger.setAttribute('aria-expanded', 'false');
}
burger.addEventListener('click', () => {
  const open = navLinks.classList.toggle('is-open');
  burger.classList.toggle('is-open', open);
  burger.setAttribute('aria-expanded', String(open));
});
navLinks.addEventListener('click', (e) => { if (e.target.closest('a')) closeMenu(); });
document.addEventListener('click', (e) => {
  if (navLinks.classList.contains('is-open') && !e.target.closest('.nav')) closeMenu();
});

if ('IntersectionObserver' in window) {
  const linkFor = {};
  document.querySelectorAll('.nav__link').forEach(l => linkFor[l.dataset.target] = l);
  const io = new IntersectionObserver((entries) => {
    entries.forEach(en => {
      if (en.isIntersecting && linkFor[en.target.id]) {
        document.querySelectorAll('.nav__link').forEach(l => l.classList.remove('is-active'));
        linkFor[en.target.id].classList.add('is-active');
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });
  ['hero', 'sections', 'roadmap', 'subscribe'].forEach(id => io.observe(document.getElementById(id)));
}

/* ---------- 7. КАРТОЧКИ ОТДЕЛОВ И МОДАЛЬНОЕ ОКНО ---------- */
const grid = document.getElementById('sectionsGrid');
const modal = document.getElementById('modal');
const modalCard = modal.querySelector('.modal__card');
let lastFocus = null, modalTimer = null;

SECTIONS.forEach((s, i) => {
  const card = document.createElement('button');
  card.className = 'card reveal';
  card.style.setProperty('--c', s.color);
  card.style.transitionDelay = (i % 3) * 70 + 'ms';
  card.setAttribute('aria-label', `${s.title} — план отдела`);
  card.innerHTML = `
    <span class="tile">${ICONS[s.icon]}</span>
    <h3>${s.title}</h3>
    <p>${s.desc}</p>
    <span class="card__foot"><span class="chip">Скоро</span><span class="card__more">План отдела →</span></span>`;
  card.addEventListener('click', () => openModal(s));
  grid.appendChild(card);
});

function openModal(s) {
  clearTimeout(modalTimer);
  modalCard.style.setProperty('--c', s.color);
  document.getElementById('modalIcon').innerHTML = ICONS[s.icon];
  document.getElementById('modalTitle').textContent = s.title;
  document.getElementById('modalDesc').textContent = s.desc;
  const list = document.getElementById('modalList');
  list.innerHTML = '';
  s.plan.forEach(item => {
    const li = document.createElement('li'); li.textContent = item; list.appendChild(li);
  });
  lastFocus = document.activeElement;
  modal.hidden = false;
  document.body.classList.add('no-scroll');
  requestAnimationFrame(() => modal.classList.add('is-open'));
  modal.querySelector('.modal__close').focus();
}
function closeModal() {
  modal.classList.remove('is-open');
  document.body.classList.remove('no-scroll');
  modalTimer = setTimeout(() => { modal.hidden = true; }, 260);
  if (lastFocus) lastFocus.focus();
}
modal.addEventListener('click', (e) => { if (e.target.closest('[data-close]')) closeModal(); });
document.addEventListener('keydown', (e) => {
  if (e.key !== 'Escape') return;
  if (!modal.hidden) closeModal();
  else if (navLinks.classList.contains('is-open')) closeMenu();
});
document.getElementById('modalNotify').addEventListener('click', () => {
  closeModal();
  document.getElementById('subscribe').scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' });
  setTimeout(() => document.getElementById('subEmail').focus({ preventScroll: true }), reduced ? 0 : 650);
});

/* ---------- 8. ПОДПИСКА ---------- */
const subForm = document.getElementById('subForm');
const subEmail = document.getElementById('subEmail');
const subMsg = document.getElementById('subMsg');
const subDone = document.getElementById('subDone');
const subDoneEmail = document.getElementById('subDoneEmail');

function renderSub() {
  const subscribed = !!(state.sub && state.sub.email);
  subForm.hidden = subscribed;
  subDone.hidden = !subscribed;
  if (subscribed) subDoneEmail.textContent = state.sub.email;
}
subForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = subEmail.value.trim();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
    subMsg.textContent = 'Похоже, в адресе опечатка — проверь почту.';
    subEmail.classList.remove('is-error');
    void subEmail.offsetWidth; // перезапуск анимации тряски
    subEmail.classList.add('is-error');
    playError(); subEmail.focus();
    return;
  }
  state.sub = { email, at: Date.now() };
  store.set('sub', state.sub);
  subMsg.textContent = ''; subEmail.value = ''; subEmail.classList.remove('is-error');
  renderSub(); playDing();
  const btn = subForm.querySelector('button');
  const r = btn.getBoundingClientRect();
  spawnBurst(r.left + r.width / 2, r.top + r.height / 2, ['#7ED957', '#3EE6D8', '#FFC93C'], 22);
  toast('Подписка оформлена!', 'Напишем, когда откроется первый отдел.');
});
subEmail.addEventListener('input', () => { subEmail.classList.remove('is-error'); subMsg.textContent = ''; });
document.getElementById('unsubBtn').addEventListener('click', () => {
  state.sub = null; store.set('sub', null);
  renderSub(); toast('Подписка отменена', 'Можно подписаться снова в любой момент.');
  subEmail.focus();
});

/* ---------- 9. ТОСТЫ (уведомления и достижения) ---------- */
const toasts = document.getElementById('toasts');
function toast(title, text, achievement = false) {
  while (toasts.children.length >= 3) toasts.firstChild.remove();
  const el = document.createElement('div');
  el.className = 'toast' + (achievement ? ' toast--ach' : '');
  el.innerHTML = `
    <span class="toast__ico">${achievement ? CUBE_MINI : '<svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" shape-rendering="crispEdges"><rect x="4" y="12" width="3" height="3"/><rect x="7" y="15" width="3" height="3"/><rect x="10" y="12" width="3" height="3"/><rect x="13" y="9" width="3" height="3"/><rect x="16" y="6" width="3" height="3"/></svg>'}</span>
    <span class="toast__body">${achievement ? '<small>Достижение получено!</small>' : ''}<b>${title}</b><span>${text}</span></span>`;
  toasts.appendChild(el);
  setTimeout(() => {
    el.classList.add('is-out');
    setTimeout(() => el.remove(), 350);
  }, 4200);
}

/* ---------- 10. ДЕНЬ / НОЧЬ И ЗВУК ---------- */
const timeBtn = document.getElementById('timeBtn');
const soundBtn = document.getElementById('soundBtn');

function applyTime() {
  document.documentElement.dataset.time = state.time;
  timeBtn.setAttribute('aria-label', state.time === 'night' ? 'Включить день' : 'Включить ночь');
  if (reduced) { nightAmount = state.time === 'night' ? 1 : 0; drawSky(0); }
}
timeBtn.addEventListener('click', () => {
  state.time = state.time === 'night' ? 'day' : 'night';
  store.set('time', state.time);
  applyTime();
});

function applySound() {
  soundBtn.setAttribute('aria-pressed', String(!state.muted));
  soundBtn.setAttribute('aria-label', state.muted ? 'Включить звук' : 'Выключить звук');
  if (masterGain) masterGain.gain.value = state.muted ? 0 : 0.5;
}
soundBtn.addEventListener('click', () => {
  state.muted = !state.muted;
  store.set('muted', state.muted);
  applySound();
});

/* ---------- 11. ПОЯВЛЕНИЕ ПРИ СКРОЛЛЕ ---------- */
function initReveal() {
  const items = document.querySelectorAll('.reveal');
  if (reduced || !('IntersectionObserver' in window)) {
    items.forEach(el => el.classList.add('is-in')); return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach(en => {
      if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  items.forEach(el => io.observe(el));
}

/* ---------- 12. СТАРТ ---------- */
document.getElementById('tickerTrack').innerHTML += document.getElementById('tickerTrack').innerHTML;
document.getElementById('year').textContent = new Date().getFullYear();
applyTime(); applySound(); renderSub(); updateMineUI();
resizeSky(); initReveal(); startSky();