/* ====== بيانات تجريبية للفعاليات (يمكن لاحقًا استبدالها ببيانات حقيقية من API) ====== */
const EVENTS = [
  {
    id: 1,
    title: "مهرجان الموسيقى الصيفي",
    date: "2025-11-01",
    place: "الحديقة المركزية",
    category: "موسيقى",
    short: "حفلات فرقة محلية وأمسيات فنية.",
    img: "assets/img/music-fest.jpg",
    spotlight: true,
    full: "<p>وصف كامل للمهرجان... يتضمن فرق محلية، أكشاك طعام، ومنطقة عائلية.</p>",
    gallery: ["assets/img/music-1.jpg","assets/img/music-2.jpg"]
  },
  {
    id: 2,
    title: "معرض الفنون المعاصرة",
    date: "2025-11-05",
    place: "قاعة الفن الحديث",
    category: "ثقافة",
    short: "عرض لأعمال فنانين محليين.",
    img: "assets/img/art-expo.jpg",
    spotlight: true,
    full: "<p>المعرض يضم لوحات ومنحوتات حديثة.</p>",
    gallery: ["assets/img/art-1.jpg","assets/img/art-2.jpg"]
  },
  {
    id: 3,
    title: "سباق العائلة السنوي",
    date: "2025-12-10",
    place: "كورنيش المدينة",
    category: "رياضة",
    short: "سباق مخصص للعائلات بمسارات بسيطة.",
    img: "assets/img/run.jpg",
    spotlight: false,
    full: "<p>تسجيل المجموعات العائلية مفتوح.</p>",
    gallery: ["assets/img/run-1.jpg"]
  },
  {
    id: 4,
    title: "سوق نهاية الأسبوع",
    date: "2025-10-25",
    place: "ساحة البلدة",
    category: "عائلي",
    short: "منتجات حرفية، أطعمة وموسيقى حية.",
    img: "assets/img/market.jpg",
    spotlight: false,
    full: "<p>تجمع محلي للبائعين المستقلين.</p>",
    gallery: ["assets/img/market-1.jpg"]
  }
];

/* ====== Helpers ====== */
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => Array.from(document.querySelectorAll(sel));

/* Set dynamic years */
const years = document.querySelectorAll('#year, #year2, #year3, #year4, #year5');
years.forEach(el => { if(el) el.textContent = new Date().getFullYear(); });

/* ====== Spotlight carousel render (index) ====== */
function renderSpotlight(){
  const inner = $('#spotlightInner');
  if(!inner) return;
  const spotlight = EVENTS.filter(e => e.spotlight);
  inner.innerHTML = '';
  spotlight.forEach((ev, idx) => {
    const active = idx === 0 ? 'active' : '';
    const div = document.createElement('div');
    div.className = `carousel-item ${active}`;
    div.innerHTML = `
      <div class="row g-0 align-items-center">
        <div class="col-md-5 d-none d-md-block">
          <img src="${ev.img}" class="d-block w-100 rounded" style="height:250px;object-fit:cover;" alt="${ev.title}">
        </div>
        <div class="col-md-7 p-4">
          <h3>${ev.title}</h3>
          <p class="small-muted">${ev.date} • ${ev.place} • ${ev.category}</p>
          <p>${ev.short}</p>
          <a href="event.html?event=${ev.id}" class="btn btn-primary btn-sm">عرض التفاصيل</a>
        </div>
      </div>
    `;
    inner.appendChild(div);
  });
}

/* ====== Events grid render (index) ====== */
function renderEventsGrid(events){
  const grid = $('#eventsGrid');
  if(!grid) return;
  grid.innerHTML = '';
  events.forEach(ev => {
    const col = document.createElement('div');
    col.className = 'col-12 col-md-6 col-lg-4';
    col.innerHTML = `
      <div class="card h-100">
        <img src="${ev.img}" class="event-card-img card-img-top" alt="${ev.title}">
        <div class="card-body d-flex flex-column">
          <h5 class="card-title">${ev.title}</h5>
          <p class="card-text small-muted">${ev.date} • ${ev.place}</p>
          <p class="card-text">${ev.short}</p>
          <div class="mt-auto d-flex justify-content-between align-items-center">
            <span class="badge bg-secondary">${ev.category}</span>
            <div>
              <a href="event.html?event=${ev.id}" class="btn btn-outline-primary btn-sm">التفاصيل</a>
            </div>
          </div>
        </div>
      </div>
    `;
    grid.appendChild(col);
  });
}

/* ====== Events list render (events.html) ====== */
function renderEventsList(filter = {}) {
  const container = $('#eventsList');
  if(!container) return;
  let list = [...EVENTS];

  // filtering
  if(filter.category && filter.category !== 'all'){
    list = list.filter(e => e.category === filter.category);
  }
  if(filter.date){
    list = list.filter(e => e.date === filter.date);
  }
  if(filter.search){
    const s = filter.search.toLowerCase();
    list = list.filter(e => e.title.toLowerCase().includes(s) || e.place.toLowerCase().includes(s));
  }

  // render
  container.innerHTML = '';
  if(list.length === 0){
    container.innerHTML = '<div class="col-12"><div class="alert alert-warning">لا توجد فعاليات مطابقة للفلتر.</div></div>';
    return;
  }

  list.forEach(ev => {
    const card = document.createElement('div');
    card.className = 'col-12 col-md-6';
    card.innerHTML = `
      <div class="card h-100 flex-row flex-wrap">
        <div class="col-5 p-0">
          <img src="${ev.img}" class="img-fluid" style="height:150px;object-fit:cover;width:100%;" alt="${ev.title}">
        </div>
        <div class="col-7 p-3">
          <h5>${ev.title}</h5>
          <p class="small-muted">${ev.date} • ${ev.place} • <span class="badge bg-light text-dark">${ev.category}</span></p>
          <p>${ev.short}</p>
          <a href="event.html?event=${ev.id}" class="btn btn-primary btn-sm">التفاصيل</a>
        </div>
      </div>
    `;
    container.appendChild(card);
  });
}

/* ====== Event detail loader (event.html) ====== */
function loadEventDetail(){
  const params = new URLSearchParams(location.search);
  const id = Number(params.get('event')) || EVENTS[0].id;
  const ev = EVENTS.find(e => e.id === id) || EVENTS[0];

  const titleEl = $('#eventTitle');
  if(titleEl) titleEl.textContent = ev.title;

  const meta = $('#eventMeta');
  if(meta) meta.innerHTML = `${ev.date} • ${ev.place} • <span class="badge bg-secondary">${ev.category}</span>`;

  const hero = $('#eventHero');
  if(hero) hero.src = ev.img;

  const full = $('#eventFullDesc');
  if(full) full.innerHTML = ev.full;

  // gallery
  const gallery = $('#gallery');
  if(gallery){
    gallery.innerHTML = '';
    ev.gallery.forEach(src => {
      const img = document.createElement('img');
      img.src = src;
      img.style.width = '120px';
      img.style.height = '80px';
      img.style.objectFit = 'cover';
      img.className = 'rounded';
      gallery.appendChild(img);
    });
  }

  // share link
  const linkInput = $('#eventLinkInput');
  if(linkInput) linkInput.value = location.href;

  // related events (same category)
  const related = $('#relatedEvents');
  if(related){
    related.innerHTML = '';
    EVENTS.filter(e => e.category === ev.category && e.id !== ev.id).slice(0,3).forEach(re => {
      const col = document.createElement('div');
      col.className = 'col-12 col-md-4';
      col.innerHTML = `
        <div class="card">
          <img src="${re.img}" class="card-img-top" style="height:120px;object-fit:cover;">
          <div class="card-body">
            <h6>${re.title}</h6>
            <p class="small-muted">${re.date} • ${re.place}</p>
            <a href="event.html?event=${re.id}" class="btn btn-outline-primary btn-sm">عرض</a>
          </div>
        </div>
      `;
      related.appendChild(col);
    });
  }

  // booking modal submit handler
  const bookingForm = $('#bookingForm');
  if(bookingForm){
    bookingForm.onsubmit = (e) => {
      e.preventDefault();
      // حد بسيط للتحقق
      const name = $('#bookName').value.trim();
      const email = $('#bookEmail').value.trim();
      if(!name || !email || !/^\S+@\S+\.\S+$/.test(email)){
        alert('الرجاء إدخال بيانات صحيحة للحجز.');
        return;
      }
      // محاكاة نجاح
      const modalEl = document.querySelector('#bookingModal');
      const bs = bootstrap.Modal.getInstance(modalEl);
      bs.hide();
      alert('تم استلام الحجز (وهمي). شكرًا لك!');
      bookingForm.reset();
    };
  }
}

/* ====== Contact form validation (contact.html) ====== */
function setupContactForm(){
  const form = $('#contactForm');
  if(!form) return;
  form.addEventListener('submit', function(e){
    e.preventDefault();
    const name = $('#contactName').value.trim();
    const email = $('#contactEmail').value.trim();
    const msg = $('#contactMessage').value.trim();

    // front-end validation
    let ok = true;
    if(!name){ $('#contactName').classList.add('is-invalid'); ok = false; } else { $('#contactName').classList.remove('is-invalid'); }
    if(!/^\S+@\S+\.\S+$/.test(email)){ $('#contactEmail').classList.add('is-invalid'); ok = false; } else { $('#contactEmail').classList.remove('is-invalid'); }
    if(!msg){ $('#contactMessage').classList.add('is-invalid'); ok = false; } else { $('#contactMessage').classList.remove('is-invalid'); }

    const placeholder = $('#contactAlertPlaceholder');
    placeholder.innerHTML = '';
    if(!ok){
      placeholder.innerHTML = `<div class="alert alert-danger">الرجاء تصحيح الحقول المشار إليها.</div>`;
      return;
    }

    // Simulate success (no backend)
    placeholder.innerHTML = `<div class="alert alert-success">تم إرسال رسالتك. سنرد عبر البريد.</div>`;
    form.reset();
  });
}

/* ====== Search, filter bindings (index/events) ====== */
function bindFilters(){
  // index: category buttons
  $$('.category-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const cat = btn.dataset.cat;
      // Save preference
      localStorage.setItem('preferredCategory', cat);
      if(document.location.pathname.endsWith('index.html') || document.location.pathname === '/'){
        // filter grid on index
        let filtered = EVENTS.slice();
        if(cat && cat !== 'all') filtered = filtered.filter(e => e.category === cat);
        renderEventsGrid(filtered);
      } else {
        // on events page, set select
        const sel = $('#filterCategory');
        if(sel) sel.value = cat;
        renderEventsList({category: cat});
      }
    });
  });

  // events page controls
  const globalSearch = $('#globalSearch');
  if(globalSearch){
    globalSearch.addEventListener('input', (e) => {
      renderEventsList({search: e.target.value, category: $('#filterCategory').value, date: $('#filterDate').value});
    });
  }
  const filterCategory = $('#filterCategory');
  if(filterCategory){
    filterCategory.addEventListener('change', () => {
      renderEventsList({category: filterCategory.value, search: globalSearch.value, date: $('#filterDate').value});
    });
  }
  const filterDate = $('#filterDate');
  if(filterDate){
    filterDate.addEventListener('change', () => {
      renderEventsList({date: filterDate.value, category: filterCategory.value, search: globalSearch.value});
    });
  }

  // index search & sort
  const searchInput = $('#searchInput');
  const sortSelect = $('#sortSelect');
  if(searchInput){
    searchInput.addEventListener('input', () => {
      const q = searchInput.value.toLowerCase();
      const filtered = EVENTS.filter(e => e.title.toLowerCase().includes(q) || e.place.toLowerCase().includes(q));
      renderEventsGrid(filtered);
    });
  }
  if(sortSelect){
    sortSelect.addEventListener('change', () => {
      const val = sortSelect.value;
      let list = EVENTS.slice();
      if(val === 'date_asc') list.sort((a,b) => a.date.localeCompare(b.date));
      if(val === 'date_desc') list.sort((a,b) => b.date.localeCompare(a.date));
      if(val === 'title_az') list.sort((a,b) => a.title.localeCompare(b.title));
      renderEventsGrid(list);
    });
  }
}

/* ====== Dark mode toggle & save preference ====== */
const darkToggle = document.getElementById('darkModeToggle');

// التحقق عند تحميل الصفحة
if (localStorage.getItem('darkMode') === 'enabled') {
  document.body.classList.add('dark-mode');
  if (darkToggle) darkToggle.checked = true;
}

// عند تغيير الحالة
if (darkToggle) {
  darkToggle.addEventListener('change', () => {
    if (darkToggle.checked) {
      document.body.classList.add('dark-mode');
      localStorage.setItem('darkMode', 'enabled');
    } else {
      document.body.classList.remove('dark-mode');
      localStorage.setItem('darkMode', 'disabled');
    }
  });
}

/* ====== Scroll to top button ====== */
function setupScrollTop(){
  const btn = $('#scrollTopBtn');
  if(!btn) return;
  window.addEventListener('scroll', () => {
    if(window.scrollY > 300) btn.style.display = 'block'; else btn.style.display = 'none';
  });
  btn.addEventListener('click', () => window.scrollTo({top:0, behavior:'smooth'}));
}

/* ====== Initialization on DOMContentLoaded ====== */
document.addEventListener('DOMContentLoaded', () => {
  renderSpotlight();
  // If on index -> render grid
  if(document.getElementById('eventsGrid')){
    // Apply preferred category
    const pref = localStorage.getItem('preferredCategory') || 'all';
    if(pref && pref !== 'all'){
      renderEventsGrid(EVENTS.filter(e => e.category === pref));
    } else {
      renderEventsGrid(EVENTS);
    }
  }
  // If events page
  if(document.getElementById('eventsList')){
    renderEventsList();
  }
  // If event details page
  if(document.getElementById('eventDetail')){
    loadEventDetail();
  }
  setupContactForm();
  bindFilters();
  setupDarkMode();
  setupScrollTop();

  // Extra small features:
  // allow "add to calendar" button to download basic .ics file (simple implementation)
  const addCal = $('#addCalendarBtn');
  if(addCal){
    addCal.addEventListener('click', () => {
      const params = new URLSearchParams(location.search);
      const id = Number(params.get('event')) || 1;
      const ev = EVENTS.find(e => e.id === id);
      const ics = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'BEGIN:VEVENT',
        `SUMMARY:${ev.title}`,
        `DTSTART:${ev.date.replace(/-/g,'')}T090000`,
        `DTEND:${ev.date.replace(/-/g,'')}T120000`,
        `LOCATION:${ev.place}`,
        'END:VEVENT',
        'END:VCALENDAR'
      ].join('\n');
      const blob = new Blob([ics], {type:'text/calendar;charset=utf-8'});
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${ev.title}.ics`;
      a.click();
      URL.revokeObjectURL(url);
    });
  }

  // booking success alert handled in booking modal submit (see loadEventDetail)
});