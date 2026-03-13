/* ============================================
   SAKYAN — LakbayTech Solutions
   Main Application JavaScript
   ============================================ */

/* ============ STATE ============ */
let currentUser = null;
let currentMode = 'travelling'; // 'travelling' | 'hosting'

/* ============ DATA ============ */
const vehicles = [
  { id:1, emoji:'🚗', model:'Toyota Vios 1.3E', brand:'Toyota', type:'Sedan', price:2500, company:'ManilaRide Rentals', location:'Makati, Metro Manila', rating:4.8, reviews:124, seats:5, transmission:'Automatic', fuel:'Gasoline', badge:'Popular', features:['Air Conditioning','GPS Navigation','Bluetooth','Backup Camera'] },
  { id:2, emoji:'🚙', model:'Honda BR-V 1.5S', brand:'Honda', type:'SUV', price:3200, company:'CebuDrive Co.', location:'Cebu City, Cebu', rating:4.9, reviews:89, seats:7, transmission:'CVT', fuel:'Gasoline', badge:'Top Rated', features:['Air Conditioning','GPS Navigation','7 Seats','USB Charging'] },
  { id:3, emoji:'🚐', model:'Toyota HiAce GL', brand:'Toyota', type:'Van', price:4800, company:'LagasLakbay Transport', location:'Davao City, Davao', rating:4.7, reviews:56, seats:12, transmission:'Manual', fuel:'Diesel', badge:'', features:['Air Conditioning','Large Luggage Space','Driver Included'] },
  { id:4, emoji:'🏎️', model:'Ford Mustang GT', brand:'Ford', type:'Sports', price:8500, company:'PremiumDrive PH', location:'BGC, Taguig', rating:5.0, reviews:34, seats:4, transmission:'Automatic', fuel:'Gasoline', badge:'Premium', features:['Air Conditioning','Sports Mode','Leather Seats','Sunroof'] },
  { id:5, emoji:'🚌', model:'Hyundai H350 Bus', brand:'Hyundai', type:'Bus', price:6500, company:'PanayWheels Inc.', location:'Iloilo City, Iloilo', rating:4.6, reviews:45, seats:20, transmission:'Automatic', fuel:'Diesel', badge:'', features:['Air Conditioning','Sound System','Group Travel'] },
  { id:6, emoji:'🚗', model:'Mitsubishi Mirage G4', brand:'Mitsubishi', type:'Sedan', price:1900, company:'BaguioCars Rental', location:'Baguio City, Benguet', rating:4.5, reviews:78, seats:5, transmission:'CVT', fuel:'Gasoline', badge:'Best Value', features:['Air Conditioning','Fuel Efficient','Easy Parking'] },
  { id:7, emoji:'🚙', model:'Ford Everest Trend', brand:'Ford', type:'SUV', price:4200, company:'ManilaRide Rentals', location:'Quezon City, Metro Manila', rating:4.8, reviews:92, seats:7, transmission:'Automatic', fuel:'Diesel', badge:'', features:['Air Conditioning','4x4','GPS','7 Seats'] },
  { id:8, emoji:'🚗', model:'Suzuki Ciaz GL', brand:'Suzuki', type:'Sedan', price:2100, company:'LuzViMinRentals', location:'Pasig, Metro Manila', rating:4.6, reviews:67, seats:5, transmission:'Automatic', fuel:'Gasoline', badge:'', features:['Air Conditioning','Smart Key','USB Ports'] },
  { id:9, emoji:'🏎️', model:'BMW 320i Sport', brand:'BMW', type:'Sports', price:9800, company:'PremiumDrive PH', location:'Makati, Metro Manila', rating:4.9, reviews:28, seats:5, transmission:'Automatic', fuel:'Gasoline', badge:'Luxury', features:['Leather Interior','Sunroof','Premium Sound'] },
];

const dashboardVehicles = [
  { emoji:'🚗', model:'Toyota Vios 1.3E', brand:'Toyota', price:2500, status:'available', bookings:24 },
  { emoji:'🚙', model:'Honda BR-V 1.5S', brand:'Honda', price:3200, status:'rented', bookings:18 },
  { emoji:'🚗', model:'Mitsubishi Mirage', brand:'Mitsubishi', price:1900, status:'available', bookings:31 },
  { emoji:'🚙', model:'Ford Everest Trend', brand:'Ford', price:4200, status:'maintenance', bookings:12 },
  { emoji:'🚐', model:'Toyota HiAce GL', brand:'Toyota', price:4800, status:'rented', bookings:9 },
];

const bookings = [
  { id:'BK-2025-001', customer:'Maria Santos', car:'Toyota Vios 1.3E', date:'Jan 14–18', days:4, total:10000, status:'confirmed' },
  { id:'BK-2025-002', customer:'Jose Reyes', car:'Honda BR-V 1.5S', date:'Jan 16–20', days:4, total:12800, status:'active' },
  { id:'BK-2025-003', customer:'Ana Cruz', car:'Ford Everest Trend', date:'Jan 18–21', days:3, total:12600, status:'pending' },
  { id:'BK-2025-004', customer:'Pedro Bautista', car:'Toyota HiAce GL', date:'Jan 20–22', days:2, total:9600, status:'pending' },
  { id:'BK-2025-005', customer:'Rosa dela Cruz', car:'Mitsubishi Mirage', date:'Jan 12–15', days:3, total:5700, status:'completed' },
];

/* ============ NAVIGATION ============ */
function showPage(pageId) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const page = document.getElementById(pageId);
  if (page) { page.classList.add('active'); window.scrollTo({ top:0, behavior:'smooth' }); }

  // Navbar search bar visibility
  const nsb = document.getElementById('navbar-search-bar');
  if (nsb) nsb.classList.toggle('hidden', pageId === 'page-landing' || pageId === 'page-hosting');

  // Hide main navbar on dashboard/hosting page
  const navbar = document.getElementById('main-navbar');
  if (navbar) navbar.style.display = (pageId === 'page-hosting') ? 'none' : '';
}

document.addEventListener('click', e => {
  const link = e.target.closest('[data-page]');
  if (link) { e.preventDefault(); showPage(link.dataset.page); }
  // Close dropdown on outside click
  const dd = document.getElementById('user-dropdown');
  if (dd && !e.target.closest('.nav-user-pill') && !e.target.closest('.user-dropdown')) {
    dd.classList.add('hidden');
  }
});

/* ============ MODE TOGGLE (Travelling / Hosting) ============ */
function setMode(mode) {
  currentMode = mode;
  if (mode === 'hosting') {
    if (!currentUser) { openAuth('login'); return; }
    showPage('page-hosting');
    initDashboard();
    initCharts();
  } else {
    showPage('page-landing');
    renderLandingSections();
  }
}

/* ============ AUTH ============ */
function openAuth(type) {
  document.getElementById('auth-login-form').classList.toggle('hidden', type !== 'login');
  document.getElementById('auth-signup-form').classList.toggle('hidden', type !== 'signup');
  document.getElementById('auth-modal-title').textContent = type === 'login' ? 'Welcome back' : 'Create your account';
  showModal('modal-auth');
  document.getElementById('user-dropdown').classList.add('hidden');
}

function signInWithGoogle() {
  // Simulate Google OAuth
  hideModal('modal-auth');
  setLoggedIn({ name:'Demo User', email:'demo@sakyan.ph', initials:'DU' });
  showToast('success', 'Signed in with Google!', 'Welcome back, Demo User.');
}

function loginWithEmail() {
  const email = document.getElementById('auth-email')?.value;
  const pass = document.getElementById('auth-password')?.value;
  if (!email || !pass) { showToast('error','Missing fields','Please enter email and password.'); return; }
  hideModal('modal-auth');
  const name = email.split('@')[0];
  setLoggedIn({ name, email, initials: name.slice(0,2).toUpperCase() });
  showToast('success','Logged in!', `Welcome, ${name}.`);
}

function signUpWithEmail() {
  const fname = document.getElementById('signup-fname')?.value;
  const lname = document.getElementById('signup-lname')?.value;
  const email = document.getElementById('signup-email')?.value;
  if (!fname || !email) { showToast('error','Missing fields','Please fill in all fields.'); return; }
  hideModal('modal-auth');
  const name = fname + ' ' + lname;
  setLoggedIn({ name, email, initials: (fname[0]+(lname?lname[0]:'')).toUpperCase() });
  showToast('success','Account created!', `Welcome to Sakyan, ${fname}!`);
}

function setLoggedIn(user) {
  currentUser = user;
  document.getElementById('dropdown-logged-out').classList.add('hidden');
  document.getElementById('dropdown-logged-in').classList.remove('hidden');
  const av = document.getElementById('nav-avatar-circle');
  if (av) { av.textContent = user.initials; av.style.background = 'linear-gradient(135deg,var(--primary),var(--teal))'; av.style.color = '#fff'; av.style.fontSize = '.8rem'; av.style.fontWeight = '700'; }
  const du = document.getElementById('dropdown-username');
  const de = document.getElementById('dropdown-email');
  const da = document.getElementById('dropdown-avatar');
  if (du) du.textContent = user.name;
  if (de) de.textContent = user.email;
  if (da) { da.textContent = user.initials; }
  const sn = document.getElementById('sidebar-name');
  const sa = document.getElementById('sidebar-avatar');
  if (sn) sn.textContent = user.name;
  if (sa) sa.textContent = user.initials;
}

function logOut() {
  currentUser = null;
  document.getElementById('dropdown-logged-out').classList.remove('hidden');
  document.getElementById('dropdown-logged-in').classList.add('hidden');
  const av = document.getElementById('nav-avatar-circle');
  if (av) { av.textContent = '👤'; av.style.background = ''; av.style.color = ''; }
  document.getElementById('user-dropdown').classList.add('hidden');
  showPage('page-landing');
  showToast('info','Logged out','See you next time!');
}

function toggleUserMenu() {
  const dd = document.getElementById('user-dropdown');
  if (dd) dd.classList.toggle('hidden');
}

/* ============ VEHICLE CARDS ============ */
function renderVehicleCard(v) {
  const badge = v.badge ? `<span class="badge badge-primary">${v.badge}</span>` : '';
  return `
    <div class="vehicle-card" onclick="showCarDetails(${v.id})">
      <div class="car-img-wrap">
        <div class="car-img">${v.emoji}</div>
        <div class="card-badge-overlay">${badge}</div>
        <button class="card-favorite" onclick="toggleFav(event,this)">&#x2661;</button>
      </div>
      <div class="card-body">
        <div class="card-company">📍 ${v.company} · ${v.location.split(',')[0]}</div>
        <div class="card-title">${v.model}</div>
        <div class="card-meta">
          <span class="card-meta-item">👤 ${v.seats}</span>
          <span class="card-meta-item">⚙️ ${v.transmission}</span>
          <span class="card-meta-item">⛽ ${v.fuel}</span>
        </div>
        <div class="card-footer">
          <div class="card-price"><span class="amount">₱${v.price.toLocaleString()}</span><span class="per"> /day</span></div>
          <div class="card-rating">⭐ ${v.rating}</div>
        </div>
      </div>
    </div>`;
}

function renderLandingCard(v) {
  const badge = v.badge ? `<span class="lc-badge">${v.badge}</span>` : '';
  return `
    <div class="landing-card" onclick="showCarDetails(${v.id})">
      <div class="lc-img-wrap">
        <div class="lc-img">${v.emoji}</div>
        ${badge}
        <button class="lc-fav" onclick="toggleFav(event,this)">&#x2661;</button>
      </div>
      <div class="lc-body">
        <div class="lc-location">📍 ${v.location.split(',')[0]}</div>
        <div class="lc-title">${v.model}</div>
        <div class="lc-company">${v.company}</div>
        <div class="lc-meta">⭐ ${v.rating} · ${v.seats} seats · ${v.transmission}</div>
        <div class="lc-price"><span class="lc-amount">₱${v.price.toLocaleString()}</span> <span class="lc-per">/ day</span></div>
      </div>
    </div>`;
}

function toggleFav(e, btn) {
  e.stopPropagation();
  const saved = btn.innerHTML.includes('♥');
  btn.innerHTML = saved ? '&#x2661;' : '&#x2665;';
  btn.style.color = saved ? '' : '#EF4444';
}

/* ============ LANDING SECTIONS ============ */
function renderLandingSections(category = 'all') {
  let list = category === 'all' ? vehicles : vehicles.filter(v => {
    if (category === 'Budget') return v.price < 2500;
    return v.type === category;
  });

  const popular = [...list].sort((a,b) => b.reviews - a.reviews).slice(0,6);
  const topRated = [...list].sort((a,b) => b.rating - a.rating).slice(0,6);
  const budget = list.filter(v => v.price <= 2500).slice(0,6);

  const gr = id => { const el = document.getElementById(id); if (el) el.innerHTML = popular.length ? '' : '<p style="color:var(--text-secondary);padding:16px">No vehicles match.</p>'; return el; };

  const sp = document.getElementById('section-popular');
  if (sp) sp.innerHTML = popular.map(renderLandingCard).join('');
  const st = document.getElementById('section-toprated');
  if (st) st.innerHTML = topRated.map(renderLandingCard).join('');
  const sb = document.getElementById('section-budget');
  if (sb) sb.innerHTML = budget.length ? budget.map(renderLandingCard).join('') : '<p style="color:var(--text-secondary);padding:20px">No budget vehicles in this category.</p>';
}

function filterCategory(cat, btn) {
  document.querySelectorAll('.cat-pill').forEach(p => p.classList.remove('active'));
  btn.classList.add('active');
  renderLandingSections(cat);
}

/* ============ CAR DETAILS ============ */
function showCarDetails(id) {
  const v = vehicles.find(c => c.id === id) || vehicles[0];
  const page = document.getElementById('page-details');
  if (!page) return;

  // Title / breadcrumb
  page.querySelectorAll('.detail-title').forEach(el => el.textContent = v.model);
  page.querySelectorAll('.detail-title-bc').forEach(el => el.textContent = v.model);
  page.querySelectorAll('.detail-company').forEach(el => el.textContent = v.company);
  page.querySelectorAll('.detail-location').forEach(el => el.textContent = v.location);
  page.querySelectorAll('.detail-rating-top,.detail-rating-big,.detail-rating-bw').forEach(el => el.textContent = v.rating);
  page.querySelectorAll('.detail-reviews-top,.detail-reviews-big,.detail-reviews-bw').forEach(el => el.textContent = v.reviews);
  page.querySelectorAll('.detail-seats,.detail-seats-spec').forEach(el => el.textContent = v.seats);
  page.querySelectorAll('.detail-trans,.detail-trans-spec').forEach(el => el.textContent = v.transmission);
  page.querySelectorAll('.detail-fuel,.detail-fuel-spec').forEach(el => el.textContent = v.fuel);
  page.querySelectorAll('.detail-type,.detail-type-spec').forEach(el => el.textContent = v.type);
  page.querySelectorAll('.detail-price-amount,.bw-price').forEach(el => el.textContent = '₱' + v.price.toLocaleString());
  page.querySelector('.detail-car-id').value = id;

  // Host avatar initial
  const ha = page.querySelector('.host-avatar-circle');
  if (ha) ha.textContent = v.company[0];

  // Features
  const fl = page.getElementById ? page.getElementById('features-list') : document.getElementById('features-list');
  const featsEl = document.getElementById('features-list');
  if (featsEl) featsEl.innerHTML = v.features.map(f => `<div class="feature-tag">&#x2713; ${f}</div>`).join('');

  // Gallery emoji
  page.querySelectorAll('.detail-emoji-big').forEach(el => el.textContent = v.emoji);
  page.querySelectorAll('.gallery-thumb').forEach((t,i) => {
    if (i === 0) t.textContent = v.emoji;
  });

  // Reset booking
  const pu = document.getElementById('booking-pickup');
  const ret = document.getElementById('booking-return');
  if (pu) pu.value = '';
  if (ret) ret.value = '';
  const bd = document.getElementById('bw-breakdown');
  if (bd) bd.classList.add('hidden');

  // Store price for calculator
  window._currentCarPrice = v.price;
  window._currentCarName = v.model;
  window._currentCarCompany = v.company;

  showPage('page-details');
}

/* ============ BOOKING CALCULATOR ============ */
function calcBookingPrice() {
  const pricePerDay = window._currentCarPrice || 2500;
  const pickup = new Date(document.getElementById('booking-pickup')?.value);
  const ret = new Date(document.getElementById('booking-return')?.value);

  if (!isNaN(pickup) && !isNaN(ret) && ret > pickup) {
    const days = Math.ceil((ret - pickup) / 86400000);
    const rental = pricePerDay * days;
    const service = Math.round(rental * 0.1);
    const total = rental + service + 500;

    document.getElementById('calc-days').textContent = days;
    document.getElementById('calc-rental').textContent = '₱' + rental.toLocaleString();
    document.getElementById('calc-service').textContent = '₱' + service.toLocaleString();
    document.getElementById('calc-total').textContent = '₱' + total.toLocaleString();

    const bd = document.getElementById('bw-breakdown');
    if (bd) bd.classList.remove('hidden');

    window._bookingTotal = '₱' + total.toLocaleString();
    window._bookingDays = days;
  }
}

/* ============ BOOKING SUBMIT ============ */
function submitBooking() {
  const pickup = document.getElementById('booking-pickup')?.value;
  const ret = document.getElementById('booking-return')?.value;
  const fname = document.getElementById('renter-fname')?.value;
  const lname = document.getElementById('renter-lname')?.value;
  const phone = document.getElementById('renter-phone')?.value;
  const license = document.getElementById('renter-license')?.value;

  if (!pickup || !ret) { showToast('error','Missing dates','Please select pick-up and return dates.'); return; }
  if (!fname || !lname) { showToast('error','Missing info','Please enter the renter\'s name.'); return; }
  if (!phone) { showToast('error','Missing info','Please enter a phone number.'); return; }
  if (!license) { showToast('error','Missing info','Please enter a driver\'s license number.'); return; }

  document.getElementById('confirm-car-name').textContent = window._currentCarName || 'Vehicle';
  document.getElementById('confirm-company').textContent = window._currentCarCompany || '';
  document.getElementById('confirm-pickup').textContent = pickup;
  document.getElementById('confirm-return').textContent = ret;
  document.getElementById('confirm-renter').textContent = fname + ' ' + lname;
  document.getElementById('confirm-total').textContent = window._bookingTotal || '—';

  showModal('modal-booking-confirm');
}

/* ============ MARKETPLACE ============ */
function initMarketplace() { renderMarketplace(vehicles); }

function renderMarketplace(list) {
  const grid = document.getElementById('vehicles-grid');
  if (grid) grid.innerHTML = list.map(renderVehicleCard).join('');
  const cnt = document.getElementById('vehicle-count');
  if (cnt) cnt.textContent = list.length + ' vehicles found';
}

function filterVehicles() {
  const search = (document.getElementById('market-search')?.value || '').toLowerCase();
  const sort = document.getElementById('sort-select')?.value || 'popular';
  const types = [...document.querySelectorAll('.filter-type:checked')].map(c => c.value);
  const trans = [...document.querySelectorAll('.filter-trans:checked')].map(c => c.value);
  const maxPrice = parseInt(document.getElementById('price-max')?.value) || 99999;

  let list = vehicles.filter(v => {
    const ms = v.model.toLowerCase().includes(search) || v.company.toLowerCase().includes(search) || v.location.toLowerCase().includes(search);
    const mt = types.length === 0 || types.includes(v.type);
    const mx = trans.length === 0 || trans.includes(v.transmission);
    const mp = v.price <= maxPrice;
    return ms && mt && mx && mp;
  });

  if (sort === 'price-asc') list.sort((a,b) => a.price - b.price);
  else if (sort === 'price-desc') list.sort((a,b) => b.price - a.price);
  else if (sort === 'rating') list.sort((a,b) => b.rating - a.rating);
  renderMarketplace(list);
}

function clearFilters() {
  document.querySelectorAll('.filter-type,.filter-trans').forEach(cb => cb.checked = false);
  const sl = document.getElementById('price-slider');
  if (sl) { sl.value = 10000; updatePriceDisplay(10000); }
  const ms = document.getElementById('market-search');
  if (ms) ms.value = '';
  filterVehicles();
}

function updatePriceDisplay(val) {
  const el = document.getElementById('price-display');
  if (el) el.textContent = '₱' + parseInt(val).toLocaleString();
  const pm = document.getElementById('price-max');
  if (pm) pm.value = val;
  filterVehicles();
}

/* ============ SEARCH ============ */
function heroSearch() {
  const loc = document.getElementById('hero-location')?.value;
  showPage('page-marketplace');
  if (loc) {
    setTimeout(() => {
      const ms = document.getElementById('market-search');
      if (ms) { ms.value = loc; filterVehicles(); }
    }, 100);
  }
}
function navSearch() {
  const loc = document.getElementById('ns-location')?.value;
  showPage('page-marketplace');
  if (loc) setTimeout(() => { const ms = document.getElementById('market-search'); if (ms) { ms.value = loc; filterVehicles(); } }, 100);
}

/* ============ DASHBOARD ============ */
function initDashboard() {
  renderDashboardTable();
  renderDashboardBookings();
}

function renderDashboardTable() {
  const tbody = document.getElementById('cars-tbody');
  if (!tbody) return;
  tbody.innerHTML = dashboardVehicles.map((v,i) => `
    <tr>
      <td><div class="car-cell"><div class="car-thumb">${v.emoji}</div><div><div class="car-name">${v.model}</div><div class="car-brand">${v.brand}</div></div></div></td>
      <td>₱${v.price.toLocaleString()}/day</td>
      <td><span class="badge badge-${v.status==='available'?'green':v.status==='rented'?'primary':'orange'}">${v.status.charAt(0).toUpperCase()+v.status.slice(1)}</span></td>
      <td>${v.bookings}</td>
      <td>
        <button class="action-btn" onclick="showToast('info','Edit','Opening editor...')">✏️</button>
        <button class="action-btn delete" onclick="confirmDelete(${i})">🗑️</button>
      </td>
    </tr>`).join('');
}

function renderDashboardBookings() {
  const tbody = document.getElementById('bookings-tbody');
  if (!tbody) return;
  tbody.innerHTML = bookings.map(b => `
    <tr>
      <td><span style="font-weight:600;color:var(--primary)">${b.id}</span></td>
      <td>${b.customer}</td>
      <td>${b.car}</td>
      <td>${b.date}</td>
      <td>₱${b.total.toLocaleString()}</td>
      <td><span class="badge badge-${b.status==='confirmed'?'teal':b.status==='active'?'green':b.status==='pending'?'orange':'gray'}">${b.status.charAt(0).toUpperCase()+b.status.slice(1)}</span></td>
      <td><button class="action-btn" onclick="showToast('info','Details','Viewing ${b.id}')">👁️</button></td>
    </tr>`).join('');
}

function confirmDelete(i) {
  document.getElementById('delete-car-name').textContent = dashboardVehicles[i]?.model || 'vehicle';
  document.getElementById('delete-car-idx').value = i;
  showModal('modal-delete');
}

function doDelete() {
  const i = parseInt(document.getElementById('delete-car-idx').value);
  dashboardVehicles.splice(i, 1);
  renderDashboardTable();
  hideModal('modal-delete');
  showToast('success','Removed','Vehicle deleted from your fleet.');
}

function submitAddCar(e) {
  e.preventDefault();
  const name = document.getElementById('car-name-input')?.value;
  if (!name) { showToast('error','Missing','Please fill required fields.'); return; }
  dashboardVehicles.unshift({ emoji:'🚗', model:name, brand:document.getElementById('car-brand-input')?.value||'', price:parseInt(document.getElementById('car-price-input')?.value)||0, status:'available', bookings:0 });
  renderDashboardTable();
  hideModal('modal-add-car');
  showToast('success','Vehicle Listed!', name + ' added to your fleet.');
  e.target.reset();
}

/* ============ CHARTS ============ */
function initCharts() {
  const bc = document.getElementById('bookings-chart');
  if (bc && !bc._ci) {
    bc._ci = new Chart(bc, { type:'bar', data:{ labels:['Aug','Sep','Oct','Nov','Dec','Jan'], datasets:[{ label:'Bookings', data:[18,24,21,29,35,28], backgroundColor:'rgba(37,99,235,0.15)', borderColor:'#2563EB', borderWidth:2, borderRadius:8, borderSkipped:false }] }, options:{ responsive:true, maintainAspectRatio:false, plugins:{ legend:{ display:false } }, scales:{ y:{ grid:{ color:'rgba(226,232,240,0.8)' } }, x:{ grid:{ display:false } } } } });
  }
  const dc = document.getElementById('donut-chart');
  if (dc && !dc._ci) {
    dc._ci = new Chart(dc, { type:'doughnut', data:{ labels:['Sedan','SUV','Van','Sports'], datasets:[{ data:[40,35,15,10], backgroundColor:['#2563EB','#14B8A6','#F59E0B','#8B5CF6'], borderWidth:0, hoverOffset:8 }] }, options:{ responsive:true, maintainAspectRatio:false, cutout:'65%', plugins:{ legend:{ position:'bottom', labels:{ font:{ size:11 }, padding:12, usePointStyle:true } } } } });
  }
  const rc = document.getElementById('revenue-chart');
  if (rc && !rc._ci) {
    rc._ci = new Chart(rc, { type:'line', data:{ labels:['Aug','Sep','Oct','Nov','Dec','Jan'], datasets:[{ label:'Revenue (₱)', data:[42000,58000,51000,74000,89000,71000], borderColor:'#14B8A6', backgroundColor:'rgba(20,184,166,0.08)', fill:true, tension:0.4, pointBackgroundColor:'#14B8A6', pointRadius:4 }] }, options:{ responsive:true, maintainAspectRatio:false, plugins:{ legend:{ display:false } }, scales:{ y:{ ticks:{ callback: v => '₱'+(v/1000)+'k' }, grid:{ color:'rgba(226,232,240,0.8)' } }, x:{ grid:{ display:false } } } } });
  }
}

/* ============ COMPARE ============ */
function initComparison() {
  const compare = [vehicles[0], vehicles[1], vehicles[3]];
  const header = document.getElementById('compare-header');
  const tbody = document.getElementById('compare-tbody');
  const bookRow = document.getElementById('compare-book-row');
  if (!tbody) return;

  if (header) header.innerHTML = '<th>Feature</th>' + compare.map(v => `<th style="text-align:center">${v.emoji} ${v.model}</th>`).join('');

  const rows = [
    { label:'💰 Price/Day', key:'price', fmt: v => '₱'+v.price.toLocaleString(), best: a => Math.min(...a) },
    { label:'⭐ Rating', key:'rating', fmt: v => v.rating+' / 5.0', best: a => Math.max(...a) },
    { label:'👤 Seats', key:'seats', fmt: v => v.seats+' seats', best: a => Math.max(...a) },
    { label:'⚙️ Transmission', key:'transmission', fmt: v => v.transmission, best: null },
    { label:'⛽ Fuel', key:'fuel', fmt: v => v.fuel, best: null },
    { label:'🏷️ Type', key:'type', fmt: v => v.type, best: null },
    { label:'🏢 Company', key:'company', fmt: v => v.company, best: null },
    { label:'📍 Location', key:'location', fmt: v => v.location.split(',')[0], best: null },
  ];

  tbody.innerHTML = rows.map(row => {
    const numVals = compare.map(v => v[row.key]).filter(v => typeof v === 'number');
    const bestVal = row.best ? row.best(numVals) : null;
    return '<tr>' + '<td class="feature-col">'+row.label+'</td>' +
      compare.map(v => {
        const isBest = bestVal !== null && v[row.key] === bestVal;
        return `<td class="${isBest?'highlight':''}" style="${isBest?'font-weight:700;color:var(--primary)':''};text-align:center">${row.fmt(v)}${isBest?' ✓':''}</td>`;
      }).join('') + '</tr>';
  }).join('');

  if (bookRow) bookRow.innerHTML = '<div></div>' + compare.map(v => `<div style="text-align:center"><button class="btn btn-primary w-full" onclick="showCarDetails(${v.id})">Book ₱${v.price.toLocaleString()}/day</button></div>`).join('');
}

/* ============ MODAL ============ */
function showModal(id) { const m = document.getElementById(id); if (m) m.classList.add('open'); }
function hideModal(id) { const m = document.getElementById(id); if (m) m.classList.remove('open'); }
document.addEventListener('click', e => { if (e.target.classList.contains('modal-overlay')) e.target.classList.remove('open'); });

/* ============ TOAST ============ */
function showToast(type, title, msg) {
  const c = document.getElementById('toast-container');
  if (!c) return;
  const icons = { success:'✅', error:'❌', info:'ℹ️', warning:'⚠️' };
  const t = document.createElement('div');
  t.className = 'toast';
  t.innerHTML = `<span class="toast-icon">${icons[type]||'ℹ️'}</span><div><div class="toast-title">${title}</div><div class="toast-msg">${msg}</div></div>`;
  c.appendChild(t);
  requestAnimationFrame(() => requestAnimationFrame(() => t.classList.add('show')));
  setTimeout(() => { t.classList.remove('show'); setTimeout(() => t.remove(), 300); }, 3500);
}

/* ============ INIT ============ */
document.addEventListener('DOMContentLoaded', () => {
  showPage('page-landing');
  renderLandingSections();
  initMarketplace();
  initComparison();

  const today = new Date().toISOString().split('T')[0];
  document.querySelectorAll('input[type="date"]').forEach(i => i.min = today);
  document.querySelectorAll('.filter-type,.filter-trans').forEach(cb => cb.addEventListener('change', filterVehicles));
  document.getElementById('market-search')?.addEventListener('input', filterVehicles);
  document.getElementById('sort-select')?.addEventListener('change', filterVehicles);

  // Navbar scroll effect
  window.addEventListener('scroll', () => {
    const nb = document.getElementById('main-navbar');
    if (nb) nb.classList.toggle('scrolled', window.scrollY > 20);
  });
});


/* ============ MY BOOKINGS PAGE ============ */
function openMyBookings() {
  document.getElementById('user-dropdown').classList.add('hidden');
  if (!currentUser) { openAuth('login'); return; }
  showPage('page-my-bookings');
  // Reset to upcoming tab
  document.querySelectorAll('.bpt').forEach(b => b.classList.remove('active'));
  const firstTab = document.querySelector('.bpt');
  if (firstTab) firstTab.classList.add('active');
  ['upcoming','active','completed','cancelled'].forEach(t => {
    const el = document.getElementById('bptab-' + t);
    if (el) el.classList.toggle('hidden', t !== 'upcoming');
  });
}

function switchBookingTab(tab, btn) {
  document.querySelectorAll('.bpt').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  ['upcoming','active','completed','cancelled'].forEach(t => {
    const el = document.getElementById('bptab-' + t);
    if (el) el.classList.toggle('hidden', t !== tab);
  });
}

function showCancelModal(bookingId) {
  document.getElementById('cancel-booking-id').textContent = bookingId;
  showModal('modal-cancel-booking');
}

function confirmCancel() {
  hideModal('modal-cancel-booking');
  showToast('info', 'Booking Cancelled', 'Your booking has been cancelled. No charges applied.');
  // Move to cancelled tab
  switchBookingTab('cancelled', document.querySelectorAll('.bpt')[3]);
}

/* ============ WISHLIST PAGE ============ */
let wishlistItems = [1, 2, 4]; // default saved vehicle IDs

function openWishlist() {
  document.getElementById('user-dropdown').classList.add('hidden');
  if (!currentUser) { openAuth('login'); return; }
  showPage('page-wishlist');
  renderWishlist();
}

function renderWishlist() {
  const grid = document.getElementById('wishlist-grid');
  const empty = document.getElementById('wishlist-empty');
  const footer = document.getElementById('wishlist-footer');
  const count = document.getElementById('wishlist-count');
  if (!grid) return;

  if (wishlistItems.length === 0) {
    grid.innerHTML = '';
    if (empty) empty.classList.remove('hidden');
    if (footer) footer.style.display = 'none';
    return;
  }

  if (empty) empty.classList.add('hidden');
  if (footer) footer.style.display = 'flex';
  if (count) count.textContent = wishlistItems.length + ' saved vehicle' + (wishlistItems.length !== 1 ? 's' : '');

  const saved = wishlistItems.map(id => vehicles.find(v => v.id === id)).filter(Boolean);
  grid.innerHTML = saved.map(v => `
    <div class="wishlist-card">
      <div class="wc-img-wrap">
        <div class="wc-img">${v.emoji}</div>
        <button class="wc-remove" onclick="removeFromWishlist(${v.id},this)" title="Remove from wishlist">&#x2665;</button>
      </div>
      <div class="wc-body">
        <div class="wc-location">&#x1F4CD; ${v.location.split(',')[0]}</div>
        <div class="wc-title">${v.model}</div>
        <div class="wc-company">${v.company}</div>
        <div class="wc-meta">&#x2B50; ${v.rating} &middot; ${v.seats} seats &middot; ${v.transmission}</div>
        <div class="wc-footer">
          <div class="wc-price"><span class="wc-amount">&#x20B1;${v.price.toLocaleString()}</span><span class="wc-per"> / day</span></div>
          <button class="btn btn-primary btn-sm" onclick="showCarDetails(${v.id})">Book now</button>
        </div>
      </div>
    </div>
  `).join('');
}

function removeFromWishlist(id, btn) {
  wishlistItems = wishlistItems.filter(i => i !== id);
  const card = btn.closest('.wishlist-card');
  if (card) { card.style.opacity = '0'; card.style.transform = 'scale(0.95)'; card.style.transition = 'all 0.25s ease'; setTimeout(() => renderWishlist(), 260); }
  showToast('info', 'Removed', 'Vehicle removed from wishlist.');
}

function clearWishlist() {
  wishlistItems = [];
  renderWishlist();
  showToast('info', 'Wishlist cleared', 'All saved vehicles removed.');
}