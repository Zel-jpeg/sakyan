/* ============================================
   SAKYAN ADMIN PANEL — LakbayTech Solutions
   admin.js
   ============================================ */

/* ---- DATA ---- */
const adminCompanies = [
  { id:1,  name:'ManilaRide Rentals',      owner:'Carlos Mendoza',   email:'carlos@manilaride.ph',     phone:'+63 917 100 0001', location:'Makati, Metro Manila',        vehicles:12, bookings:147, revenue:847000, rating:4.8, status:'Active',    joined:'Mar 2023' },
  { id:2,  name:'CebuDrive Co.',           owner:'Grace Tan',        email:'grace@cebudrive.ph',        phone:'+63 917 100 0002', location:'Cebu City, Cebu',             vehicles:8,  bookings:89,  revenue:523000, rating:4.9, status:'Active',    joined:'Jun 2023' },
  { id:3,  name:'LagasLakbay Transport',   owner:'Ramon Santos',     email:'ramon@lagas.ph',            phone:'+63 917 100 0003', location:'Davao City, Davao del Sur',   vehicles:6,  bookings:56,  revenue:374000, rating:4.7, status:'Active',    joined:'Aug 2023' },
  { id:4,  name:'PremiumDrive PH',         owner:'Sofia Reyes',      email:'sofia@premiumdrive.ph',     phone:'+63 917 100 0004', location:'BGC, Taguig',                 vehicles:5,  bookings:34,  revenue:612000, rating:5.0, status:'Active',    joined:'Sep 2023' },
  { id:5,  name:'BaguioCars Rental',       owner:'Jose Bautista',    email:'jose@baguiocars.ph',        phone:'+63 917 100 0005', location:'Baguio City, Benguet',        vehicles:7,  bookings:78,  revenue:289000, rating:4.5, status:'Active',    joined:'Oct 2023' },
  { id:6,  name:'PanayWheels Inc.',        owner:'Lourdes Cruz',     email:'lourdes@panaywheels.ph',    phone:'+63 917 100 0006', location:'Iloilo City, Iloilo',         vehicles:4,  bookings:45,  revenue:198000, rating:4.6, status:'Active',    joined:'Nov 2023' },
  { id:7,  name:'LuzViMinRentals',         owner:'Eduardo Flores',   email:'eduardo@luzvemin.ph',       phone:'+63 917 100 0007', location:'Pasig, Metro Manila',         vehicles:9,  bookings:67,  revenue:312000, rating:4.6, status:'Active',    joined:'Dec 2023' },
  { id:8,  name:'QC Express Cars',         owner:'Teresita Lim',     email:'teresita@qcexpress.ph',     phone:'+63 917 100 0008', location:'Quezon City, Metro Manila',   vehicles:11, bookings:92,  revenue:441000, rating:4.7, status:'Active',    joined:'Jan 2024' },
  { id:9,  name:'IslaRide Palawan',        owner:'Benjamin Delos Reyes', email:'ben@islaride.ph',       phone:'+63 917 100 0009', location:'Puerto Princesa, Palawan',    vehicles:3,  bookings:21,  revenue:87000,  rating:4.4, status:'Active',    joined:'Feb 2024' },
  { id:10, name:'Mindanao Fleet Rentals',  owner:'Maricel Uy',       email:'maricel@mdnfleet.ph',       phone:'+63 917 100 0010', location:'Cagayan de Oro, Misamis Or.', vehicles:0,  bookings:0,   revenue:0,      rating:0,   status:'Pending',   joined:'Jan 2025' },
  { id:11, name:'Palawan Island Rides',    owner:'Nathan Dela Cruz', email:'nathan@islandrides.ph',     phone:'+63 917 100 0011', location:'El Nido, Palawan',            vehicles:0,  bookings:0,   revenue:0,      rating:0,   status:'Pending',   joined:'Jan 2025' },
  { id:12, name:'OldCity Rent-a-Car',      owner:'Vicente Ramos',    email:'vince@oldcity.ph',          phone:'+63 917 100 0012', location:'Intramuros, Manila',          vehicles:2,  bookings:4,   revenue:14000,  rating:3.8, status:'Suspended', joined:'Apr 2023' },
];

const adminVehicles = [
  { model:'Toyota Vios 1.3E',     company:'ManilaRide Rentals',    type:'Sedan',  price:2500,  bookings:147, rating:4.8, status:'Active'    },
  { model:'Honda BR-V 1.5S',      company:'CebuDrive Co.',         type:'SUV',    price:3200,  bookings:89,  rating:4.9, status:'Active'    },
  { model:'Toyota HiAce GL',      company:'LagasLakbay Transport', type:'Van',    price:4800,  bookings:56,  rating:4.7, status:'Active'    },
  { model:'Ford Mustang GT',      company:'PremiumDrive PH',       type:'Sports', price:8500,  bookings:34,  rating:5.0, status:'Active'    },
  { model:'BMW 320i Sport',       company:'PremiumDrive PH',       type:'Sports', price:9800,  bookings:28,  rating:4.9, status:'Active'    },
  { model:'Mitsubishi Mirage G4', company:'BaguioCars Rental',     type:'Sedan',  price:1900,  bookings:78,  rating:4.5, status:'Active'    },
  { model:'Ford Everest Trend',   company:'QC Express Cars',       type:'SUV',    price:4200,  bookings:92,  rating:4.7, status:'Active'    },
  { model:'Hyundai H350 Bus',     company:'PanayWheels Inc.',      type:'Bus',    price:6500,  bookings:45,  rating:4.6, status:'Active'    },
  { model:'Suzuki Ciaz GL',       company:'LuzViMinRentals',       type:'Sedan',  price:2100,  bookings:67,  rating:4.6, status:'Active'    },
  { model:'Toyota Fortuner LTD',  company:'ManilaRide Rentals',    type:'SUV',    price:5500,  bookings:38,  rating:4.8, status:'Active'    },
  { model:'Hyundai Santa Fe 2024',company:'CebuDrive Co.',         type:'SUV',    price:5800,  bookings:0,   rating:0,   status:'Pending'   },
  { model:'BMW M3 Competition',   company:'PremiumDrive PH',       type:'Sports', price:15000, bookings:0,   rating:0,   status:'Pending'   },
  { model:'Old Toyota Revo',      company:'OldCity Rent-a-Car',    type:'Van',    price:1200,  bookings:4,   rating:3.2, status:'Suspended' },
];

const adminBookings = [
  { id:'BK-2025-047', customer:'Maria Santos',    vehicle:'Toyota Vios 1.3E',   company:'ManilaRide Rentals',    dates:'Jan 14–18', days:4,  total:10000, commission:1000, status:'Confirmed'  },
  { id:'BK-2025-046', customer:'Jose Reyes',      vehicle:'Honda BR-V 1.5S',    company:'CebuDrive Co.',         dates:'Jan 16–20', days:4,  total:12800, commission:1280, status:'Active'     },
  { id:'BK-2025-045', customer:'Ana Cruz',        vehicle:'Ford Everest Trend', company:'QC Express Cars',       dates:'Jan 18–21', days:3,  total:12600, commission:1260, status:'Pending'    },
  { id:'BK-2025-044', customer:'Pedro Bautista',  vehicle:'Toyota HiAce GL',    company:'LagasLakbay Transport', dates:'Jan 20–22', days:2,  total:9600,  commission:960,  status:'Pending'    },
  { id:'BK-2025-043', customer:'Rosa dela Cruz',  vehicle:'Mitsubishi Mirage',  company:'BaguioCars Rental',     dates:'Jan 12–15', days:3,  total:5700,  commission:570,  status:'Completed'  },
  { id:'BK-2025-042', customer:'Mark Villanueva', vehicle:'Ford Mustang GT',    company:'PremiumDrive PH',       dates:'Jan 10–13', days:3,  total:25500, commission:2550, status:'Completed'  },
  { id:'BK-2025-041', customer:'Liza Soberano',   vehicle:'BMW 320i Sport',     company:'PremiumDrive PH',       dates:'Jan 8–10',  days:2,  total:19600, commission:1960, status:'Cancelled'  },
  { id:'BK-2025-040', customer:'Carlo Cruz',      vehicle:'Hyundai H350 Bus',   company:'PanayWheels Inc.',      dates:'Jan 5–8',   days:3,  total:19500, commission:1950, status:'Completed'  },
  { id:'BK-2025-039', customer:'Jenna Sy',        vehicle:'Toyota Fortuner',    company:'ManilaRide Rentals',    dates:'Jan 3–6',   days:3,  total:16500, commission:1650, status:'Completed'  },
  { id:'BK-2025-038', customer:'Ryan Santos',     vehicle:'Suzuki Ciaz GL',     company:'LuzViMinRentals',       dates:'Jan 2–4',   days:2,  total:4200,  commission:420,  status:'Completed'  },
];

const adminCustomers = [
  { name:'Maria Santos',    email:'maria@email.ph',    phone:'+63 917 200 0001', location:'Makati',       bookings:8,  spent:74000,  joined:'Mar 2023', status:'Active'  },
  { name:'Jose Reyes',      email:'jose@email.ph',     phone:'+63 917 200 0002', location:'Cebu City',    bookings:5,  spent:48000,  joined:'Apr 2023', status:'Active'  },
  { name:'Ana Cruz',        email:'ana@email.ph',      phone:'+63 917 200 0003', location:'Quezon City',  bookings:3,  spent:27000,  joined:'Jul 2023', status:'Active'  },
  { name:'Pedro Bautista',  email:'pedro@email.ph',    phone:'+63 917 200 0004', location:'Davao City',   bookings:2,  spent:14000,  joined:'Aug 2023', status:'Active'  },
  { name:'Rosa dela Cruz',  email:'rosa@email.ph',     phone:'+63 917 200 0005', location:'Baguio City',  bookings:6,  spent:32000,  joined:'Sep 2023', status:'Active'  },
  { name:'Mark Villanueva', email:'mark@email.ph',     phone:'+63 917 200 0006', location:'BGC, Taguig',  bookings:4,  spent:91000,  joined:'Oct 2023', status:'Active'  },
  { name:'Liza Soberano',   email:'liza@email.ph',     phone:'+63 917 200 0007', location:'Pasig',        bookings:1,  spent:0,      joined:'Nov 2023', status:'Active'  },
  { name:'Carlo Cruz',      email:'carlo@email.ph',    phone:'+63 917 200 0008', location:'Iloilo City',  bookings:7,  spent:63000,  joined:'Dec 2023', status:'Active'  },
  { name:'Jenna Sy',        email:'jenna@email.ph',    phone:'+63 917 200 0009', location:'Makati',       bookings:9,  spent:112000, joined:'Jan 2024', status:'Active'  },
  { name:'Ryan Santos',     email:'ryan@email.ph',     phone:'+63 917 200 0010', location:'Mandaluyong',  bookings:2,  spent:8000,   joined:'Feb 2024', status:'Active'  },
  { name:'Banned User',     email:'bad@email.ph',      phone:'+63 917 200 0011', location:'Unknown',      bookings:0,  spent:0,      joined:'Jan 2024', status:'Banned'  },
];

const adminPayouts = [
  { company:'ManilaRide Rentals',    period:'Jan 2025', bookings:31, gross:187000, commission:18700, net:168300, bank:'BDO ****4821', status:'Pending'   },
  { company:'CebuDrive Co.',         period:'Jan 2025', bookings:24, gross:144000, commission:14400, net:129600, bank:'BPI ****3312', status:'Pending'   },
  { company:'QC Express Cars',       period:'Jan 2025', bookings:19, gross:98000,  commission:9800,  net:88200,  bank:'UnionBank ****7734', status:'Processing'},
  { company:'LagasLakbay Transport', period:'Jan 2025', bookings:14, gross:72000,  commission:7200,  net:64800,  bank:'Metrobank ****9901', status:'Paid'      },
  { company:'PremiumDrive PH',       period:'Jan 2025', bookings:11, gross:148000, commission:14800, net:133200, bank:'BDO ****2244', status:'Paid'      },
  { company:'BaguioCars Rental',     period:'Jan 2025', bookings:18, gross:48000,  commission:4800,  net:43200,  bank:'BPI ****5567', status:'Paid'      },
  { company:'PanayWheels Inc.',      period:'Jan 2025', bookings:9,  gross:41000,  commission:4100,  net:36900,  bank:'LandBank ****8823', status:'Pending'  },
  { company:'LuzViMinRentals',       period:'Jan 2025', bookings:16, gross:61000,  commission:6100,  net:54900,  bank:'Metrobank ****1122', status:'Paid'     },
];

const adminLogs = [
  { time:'2025-01-14 10:32', type:'Booking',  actor:'Customer: Maria Santos',    action:'Booking Confirmed',         detail:'BK-2025-047 · Toyota Vios · ₱10,000' },
  { time:'2025-01-14 09:48', type:'User',     actor:'System',                    action:'New Customer Registered',   detail:'Ana Reyes (ana.reyes@email.ph)' },
  { time:'2025-01-14 09:15', type:'Listing',  actor:'Partner: CebuDrive Co.',    action:'Vehicle Added',             detail:'Hyundai Santa Fe 2024 · ₱5,800/day' },
  { time:'2025-01-14 08:52', type:'Payout',   actor:'Admin: Super Admin',        action:'Payout Released',           detail:'BaguioCars Rental · ₱43,200' },
  { time:'2025-01-13 17:44', type:'Booking',  actor:'Customer: Liza Soberano',   action:'Booking Cancelled',         detail:'BK-2025-041 · BMW 320i · ₱0 charged' },
  { time:'2025-01-13 16:20', type:'Company',  actor:'Applicant',                 action:'New Company Registration',  detail:'Mindanao Fleet Rentals · Cagayan de Oro' },
  { time:'2025-01-13 15:10', type:'Review',   actor:'Customer: Pedro Bautista',  action:'Review Flagged',            detail:'Toyota HiAce · LagasLakbay · 3 stars' },
  { time:'2025-01-13 14:05', type:'Listing',  actor:'Partner: PremiumDrive PH',  action:'Vehicle Added',             detail:'BMW M3 Competition · ₱15,000/day' },
  { time:'2025-01-13 11:30', type:'Company',  actor:'Admin: Super Admin',        action:'Company Suspended',         detail:'OldCity Rent-a-Car — Policy violation' },
  { time:'2025-01-12 09:00', type:'System',   actor:'System',                    action:'Platform Revenue Milestone', detail:'₱2,000,000 YTD gross revenue reached' },
];

/* ---- AUTH ---- */
function adminLogin() {
  const u = document.getElementById('admin-user').value.trim();
  const p = document.getElementById('admin-pass').value.trim();
  const err = document.getElementById('alc-error');
  if (u === 'admin' && p === 'admin123') {
    document.getElementById('admin-login-screen').classList.add('hidden');
    document.getElementById('admin-dashboard').classList.remove('hidden');
    initAdminDashboard();
  } else {
    err.classList.remove('hidden');
    document.getElementById('admin-pass').value = '';
  }
}
document.addEventListener('keydown', e => {
  if (e.key === 'Enter' && !document.getElementById('admin-login-screen').classList.contains('hidden')) adminLogin();
});

function adminLogout() {
  document.getElementById('admin-dashboard').classList.add('hidden');
  document.getElementById('admin-login-screen').classList.remove('hidden');
  document.getElementById('admin-user').value = '';
  document.getElementById('admin-pass').value = '';
  document.getElementById('alc-error').classList.add('hidden');
}

/* ---- INIT ---- */
function initAdminDashboard() {
  renderCompaniesTable();
  renderVehiclesTable();
  renderBookingsTable();
  renderCustomersTable();
  renderRevenuePartners();
  renderPayoutsTable();
  renderLogsTable();
  initAdminCharts();
}

/* ---- NAVIGATION ---- */
function adminNav(section, el) {
  document.querySelectorAll('.asb-link').forEach(l => l.classList.remove('active'));
  if (el) el.classList.add('active');
  document.querySelectorAll('.admin-section').forEach(s => s.classList.add('hidden'));
  const target = document.getElementById('section-' + section);
  if (target) target.classList.remove('hidden');

  const labels = { overview:'Dashboard', analytics:'Analytics', companies:'Rental Companies', vehicles:'All Vehicles', bookings:'All Bookings', customers:'Customers', reviews:'Reviews & Reports', revenue:'Revenue', payouts:'Partner Payouts', settings:'Platform Settings', logs:'Activity Logs' };
  const title = labels[section] || section;
  document.getElementById('admin-page-title').textContent = title;
  document.getElementById('admin-breadcrumb').textContent = 'Sakyan Admin › ' + title;

  if (section === 'analytics') setTimeout(initAnalyticsCharts, 80);
  if (section === 'revenue') setTimeout(initRevenueChart, 80);
}

function toggleAdminSidebar() {
  document.getElementById('admin-sidebar').classList.toggle('collapsed');
  document.getElementById('admin-main').classList.toggle('sidebar-collapsed');
}

/* ---- TABLE RENDERERS ---- */
function renderCompaniesTable() {
  const tbody = document.getElementById('companies-tbody');
  if (!tbody) return;
  tbody.innerHTML = adminCompanies.map(c => {
    const statusClass = c.status === 'Active' ? 'admin-badge-green' : c.status === 'Pending' ? 'admin-badge-orange' : 'admin-badge-red';
    const stars = c.rating > 0 ? '⭐ ' + c.rating : '—';
    return `<tr>
      <td><div style="display:flex;align-items:center;gap:10px">
        <div class="co-avatar">${c.name[0]}</div>
        <div><div class="fw-600">${c.name}</div><div class="text-sm text-muted">${c.email}</div></div>
      </div></td>
      <td>${c.owner}</td>
      <td><div class="fw-500">${c.location.split(',')[0]}</div><div class="text-sm text-muted">${c.location.split(',').slice(1).join(',').trim()}</div></td>
      <td class="text-center fw-600">${c.vehicles}</td>
      <td class="text-center fw-600">${c.bookings}</td>
      <td class="text-center fw-600">${c.revenue > 0 ? '₱'+c.revenue.toLocaleString() : '—'}</td>
      <td class="text-center">${stars}</td>
      <td><span class="admin-badge ${statusClass}">${c.status}</span></td>
      <td class="text-muted text-sm">${c.joined}</td>
      <td>
        <div style="display:flex;gap:4px">
          <button class="tbl-btn view" onclick="viewCompany(${c.id})" title="View">👁</button>
          <button class="tbl-btn edit" onclick="showAdminToast('info','Edit','Opening company editor...')" title="Edit">✏️</button>
          ${c.status === 'Active'
            ? `<button class="tbl-btn danger" onclick="suspendCompany(${c.id},this)" title="Suspend">🚫</button>`
            : c.status === 'Pending'
            ? `<button class="tbl-btn approve" onclick="approveCompanyRow(${c.id},this)" title="Approve">✅</button>`
            : `<button class="tbl-btn approve" onclick="unsuspendCompany(${c.id},this)" title="Unsuspend">↩️</button>`
          }
        </div>
      </td>
    </tr>`;
  }).join('');
}

function renderVehiclesTable() {
  const tbody = document.getElementById('vehicles-tbody');
  if (!tbody) return;
  tbody.innerHTML = adminVehicles.map((v, i) => {
    const sc = v.status === 'Active' ? 'admin-badge-green' : v.status === 'Pending' ? 'admin-badge-orange' : 'admin-badge-red';
    return `<tr>
      <td><div class="fw-600">${v.model}</div></td>
      <td class="text-sm">${v.company}</td>
      <td><span class="type-pill">${v.type}</span></td>
      <td class="fw-600">₱${v.price.toLocaleString()}</td>
      <td class="text-center">${v.bookings}</td>
      <td class="text-center">${v.rating > 0 ? '⭐ '+v.rating : '—'}</td>
      <td><span class="admin-badge ${sc}">${v.status}</span></td>
      <td>
        <div style="display:flex;gap:4px">
          <button class="tbl-btn view" onclick="showAdminToast('info','Vehicle','Viewing ${v.model}')">👁</button>
          ${v.status === 'Pending' ? `<button class="tbl-btn approve" onclick="approveVehicle(${i},this)">✅ Approve</button>` : ''}
          ${v.status === 'Active' ? `<button class="tbl-btn danger" onclick="suspendVehicle(${i},this)">🚫</button>` : ''}
        </div>
      </td>
    </tr>`;
  }).join('');
}

function renderBookingsTable() {
  const tbody = document.getElementById('bookings-tbody-admin');
  if (!tbody) return;
  tbody.innerHTML = adminBookings.map(b => {
    const sc = { Confirmed:'admin-badge-teal', Active:'admin-badge-green', Pending:'admin-badge-orange', Completed:'admin-badge-gray', Cancelled:'admin-badge-red' }[b.status] || 'admin-badge-gray';
    return `<tr>
      <td class="fw-600 text-primary">${b.id}</td>
      <td>${b.customer}</td>
      <td class="text-sm">${b.vehicle}</td>
      <td class="text-sm">${b.company}</td>
      <td class="text-sm text-muted">${b.dates}</td>
      <td class="text-center">${b.days}d</td>
      <td class="fw-600">₱${b.total.toLocaleString()}</td>
      <td class="text-primary fw-600">₱${b.commission.toLocaleString()}</td>
      <td><span class="admin-badge ${sc}">${b.status}</span></td>
      <td><button class="tbl-btn view" onclick="showAdminToast('info','Booking','Viewing ${b.id}')">👁</button></td>
    </tr>`;
  }).join('');
}

function renderCustomersTable() {
  const tbody = document.getElementById('customers-tbody');
  if (!tbody) return;
  tbody.innerHTML = adminCustomers.map(c => {
    const sc = c.status === 'Active' ? 'admin-badge-green' : 'admin-badge-red';
    return `<tr>
      <td><div style="display:flex;align-items:center;gap:10px">
        <div class="co-avatar" style="background:linear-gradient(135deg,#14B8A6,#2563EB)">${c.name.split(' ').map(w=>w[0]).join('').slice(0,2)}</div>
        <div class="fw-600">${c.name}</div>
      </div></td>
      <td class="text-sm text-muted">${c.email}</td>
      <td class="text-sm">${c.phone}</td>
      <td class="text-sm">${c.location}</td>
      <td class="text-center fw-600">${c.bookings}</td>
      <td class="fw-600">${c.spent > 0 ? '₱'+c.spent.toLocaleString() : '—'}</td>
      <td class="text-sm text-muted">${c.joined}</td>
      <td><span class="admin-badge ${sc}">${c.status}</span></td>
      <td>
        <div style="display:flex;gap:4px">
          <button class="tbl-btn view" onclick="showAdminToast('info','Customer','Viewing ${c.name}')">👁</button>
          ${c.status === 'Active' ? `<button class="tbl-btn danger" onclick="showAdminToast('warning','Banned','${c.name} has been banned.')">🚫</button>` : `<button class="tbl-btn approve" onclick="showAdminToast('success','Unbanned','${c.name} has been reinstated.')">↩️</button>`}
        </div>
      </td>
    </tr>`;
  }).join('');
}

function renderRevenuePartners() {
  const tbody = document.getElementById('revenue-partners-tbody');
  if (!tbody) return;
  const top = [...adminCompanies].filter(c => c.revenue > 0).sort((a,b) => b.revenue - a.revenue).slice(0, 6);
  tbody.innerHTML = top.map(c => {
    const commission = Math.round(c.revenue * 0.1);
    const net = c.revenue - commission;
    return `<tr>
      <td><div class="fw-600">${c.name}</div><div class="text-sm text-muted">${c.location.split(',')[0]}</div></td>
      <td class="text-center">${c.bookings}</td>
      <td class="fw-600">₱${c.revenue.toLocaleString()}</td>
      <td class="text-primary fw-600">₱${commission.toLocaleString()}</td>
      <td class="fw-600">₱${net.toLocaleString()}</td>
      <td><span class="admin-badge admin-badge-orange">Pending Payout</span></td>
    </tr>`;
  }).join('');
}

function renderPayoutsTable() {
  const tbody = document.getElementById('payouts-tbody');
  if (!tbody) return;
  tbody.innerHTML = adminPayouts.map(p => {
    const sc = p.status === 'Paid' ? 'admin-badge-green' : p.status === 'Processing' ? 'admin-badge-teal' : 'admin-badge-orange';
    return `<tr>
      <td class="fw-600">${p.company}</td>
      <td class="text-sm text-muted">${p.period}</td>
      <td class="text-center">${p.bookings}</td>
      <td class="fw-600">₱${p.gross.toLocaleString()}</td>
      <td class="text-primary">₱${p.commission.toLocaleString()}</td>
      <td class="fw-600">₱${p.net.toLocaleString()}</td>
      <td class="text-sm text-muted">${p.bank}</td>
      <td><span class="admin-badge ${sc}">${p.status}</span></td>
      <td>
        ${p.status === 'Pending'
          ? `<button class="admin-btn-approve" onclick="releasePayout(this,'${p.company}')">Release</button>`
          : p.status === 'Processing'
          ? `<button class="tbl-btn view">Track</button>`
          : `<button class="tbl-btn view" onclick="showAdminToast('info','Receipt','Payout receipt for ${p.company}')">Receipt</button>`}
      </td>
    </tr>`;
  }).join('');
}

function renderLogsTable() {
  const tbody = document.getElementById('logs-tbody');
  if (!tbody) return;
  const typeColor = { Booking:'admin-badge-teal', User:'admin-badge-green', Listing:'admin-badge-orange', Payout:'admin-badge-green', Company:'admin-badge-orange', Review:'admin-badge-orange', System:'admin-badge-gray' };
  tbody.innerHTML = adminLogs.map(l => `<tr>
    <td class="text-sm text-muted" style="white-space:nowrap">${l.time}</td>
    <td><span class="admin-badge ${typeColor[l.type]||'admin-badge-gray'}">${l.type}</span></td>
    <td class="text-sm">${l.actor}</td>
    <td class="fw-500">${l.action}</td>
    <td class="text-sm text-muted">${l.detail}</td>
  </tr>`).join('');
}

/* ---- TABLE FILTER ---- */
function filterAdminTable(tbodyId, query) {
  const q = query.toLowerCase();
  document.querySelectorAll(`#${tbodyId} tr`).forEach(row => {
    row.style.display = row.textContent.toLowerCase().includes(q) ? '' : 'none';
  });
}
function filterVehicleStatus(val) {
  document.querySelectorAll('#vehicles-tbody tr').forEach(row => {
    row.style.display = (!val || row.textContent.includes(val)) ? '' : 'none';
  });
}

/* ---- ACTIONS ---- */
function viewCompany(id) {
  const c = adminCompanies.find(x => x.id === id);
  if (!c) return;
  showAdminToast('info', c.name, `${c.vehicles} vehicles · ${c.bookings} bookings · ₱${c.revenue.toLocaleString()} revenue`);
}
function suspendCompany(id, btn) {
  const c = adminCompanies.find(x => x.id === id);
  if (c) { c.status = 'Suspended'; renderCompaniesTable(); showAdminToast('warning', 'Suspended', c.name + ' has been suspended.'); }
}
function approveCompanyRow(id, btn) {
  const c = adminCompanies.find(x => x.id === id);
  if (c) { c.status = 'Active'; renderCompaniesTable(); showAdminToast('success', 'Approved!', c.name + ' is now live on the platform.'); }
}
function unsuspendCompany(id, btn) {
  const c = adminCompanies.find(x => x.id === id);
  if (c) { c.status = 'Active'; renderCompaniesTable(); showAdminToast('success', 'Reinstated', c.name + ' is now active again.'); }
}
function approveVehicle(i, btn) {
  if (adminVehicles[i]) { adminVehicles[i].status = 'Active'; renderVehiclesTable(); showAdminToast('success','Vehicle Approved', adminVehicles[i].model + ' is now live.'); }
}
function suspendVehicle(i, btn) {
  if (adminVehicles[i]) { adminVehicles[i].status = 'Suspended'; renderVehiclesTable(); showAdminToast('warning','Vehicle Suspended', adminVehicles[i].model + ' removed from listings.'); }
}
function approveCompany(btn, name) {
  const item = btn.closest('.pending-item');
  if (item) { item.style.opacity='0'; item.style.transition='opacity .3s'; setTimeout(()=>item.remove(),300); }
  showAdminToast('success', 'Approved!', name + ' is now active on the platform.');
}
function rejectCompany(btn) {
  const item = btn.closest('.pending-item');
  const name = item?.querySelector('.pi-name')?.textContent || 'Item';
  if (item) { item.style.opacity='0'; item.style.transition='opacity .3s'; setTimeout(()=>item.remove(),300); }
  showAdminToast('info', 'Rejected', name + ' application has been declined.');
}
function releasePayout(btn, company) {
  btn.textContent = 'Processing...';
  btn.disabled = true;
  setTimeout(() => { showAdminToast('success','Payout Released', '₱ sent to ' + company + ' via bank transfer.'); renderPayoutsTable(); }, 1000);
}
function addAdminCompany() {
  const name = document.getElementById('nc-name').value.trim();
  const owner = document.getElementById('nc-owner').value.trim();
  const email = document.getElementById('nc-email').value.trim();
  if (!name || !owner || !email) { showAdminToast('error','Missing fields','Please fill in all required fields.'); return; }
  adminCompanies.push({ id: adminCompanies.length+1, name, owner, email, phone: document.getElementById('nc-phone').value||'—', location: document.getElementById('nc-location').value||'Philippines', vehicles:0, bookings:0, revenue:0, rating:0, status:'Pending', joined:'Jan 2025' });
  renderCompaniesTable();
  hideAdminModal('modal-add-company');
  showAdminToast('success','Company Added', name + ' added and set to Pending review.');
}

/* ---- CHARTS ---- */
function initAdminCharts() {
  // Booking volume + revenue combo chart
  const bc = document.getElementById('chart-bookings-rev');
  if (bc && !bc._ci) {
    bc._ci = new Chart(bc, { type:'bar', data:{ labels:['Aug','Sep','Oct','Nov','Dec','Jan'], datasets:[
      { type:'bar', label:'Bookings', data:[28,34,29,41,52,38], backgroundColor:'rgba(37,99,235,0.15)', borderColor:'#2563EB', borderWidth:2, borderRadius:6, yAxisID:'y' },
      { type:'line', label:'Revenue (₱K)', data:[320,410,380,520,680,520], borderColor:'#14B8A6', backgroundColor:'rgba(20,184,166,0.08)', fill:true, tension:.4, pointBackgroundColor:'#14B8A6', pointRadius:4, yAxisID:'y1' }
    ]}, options:{ responsive:true, maintainAspectRatio:false, plugins:{ legend:{ position:'top', labels:{ usePointStyle:true, font:{size:11} } } }, scales:{ y:{ position:'left', grid:{ color:'rgba(226,232,240,.7)' }, ticks:{font:{size:11}} }, y1:{ position:'right', grid:{ drawOnChartArea:false }, ticks:{ callback: v=>'₱'+v+'k', font:{size:11} } }, x:{ grid:{ display:false } } } }});
  }
  // Bookings by location (donut)
  const lc = document.getElementById('chart-locations');
  if (lc && !lc._ci) {
    lc._ci = new Chart(lc, { type:'doughnut', data:{ labels:['Metro Manila','Cebu','Davao','Baguio','Iloilo','Others'], datasets:[{ data:[112,54,31,24,18,8], backgroundColor:['#2563EB','#14B8A6','#F59E0B','#8B5CF6','#EC4899','#94A3B8'], borderWidth:0, hoverOffset:8 }]}, options:{ responsive:true, maintainAspectRatio:false, cutout:'60%', plugins:{ legend:{ position:'bottom', labels:{ font:{size:11}, padding:10, usePointStyle:true } } } }});
  }
}

function initAnalyticsCharts() {
  const tc = document.getElementById('chart-type-breakdown');
  if (tc && !tc._ci) {
    tc._ci = new Chart(tc, { type:'bar', data:{ labels:['Aug','Sep','Oct','Nov','Dec','Jan'], datasets:[
      { label:'Sedan',  data:[32,38,34,44,55,42], backgroundColor:'rgba(37,99,235,0.8)',  borderRadius:4 },
      { label:'SUV',    data:[24,29,26,34,42,31], backgroundColor:'rgba(20,184,166,0.8)', borderRadius:4 },
      { label:'Van',    data:[12,14,11,16,19,14], backgroundColor:'rgba(245,158,11,0.8)', borderRadius:4 },
      { label:'Sports', data:[4,6,5,8,11,8],       backgroundColor:'rgba(139,92,246,0.8)', borderRadius:4 },
    ]}, options:{ responsive:true, maintainAspectRatio:false, plugins:{ legend:{ position:'top', labels:{ usePointStyle:true, font:{size:11} } } }, scales:{ x:{ stacked:true, grid:{ display:false } }, y:{ stacked:true, grid:{ color:'rgba(226,232,240,.7)' } } } }});
  }
  const cc = document.getElementById('chart-cities');
  if (cc && !cc._ci) {
    cc._ci = new Chart(cc, { type:'bar', data:{ labels:['Metro Manila','Cebu','Davao','Baguio','Iloilo','Palawan'], datasets:[{ label:'Bookings', data:[112,54,31,24,18,8], backgroundColor:['#2563EB','#14B8A6','#F59E0B','#8B5CF6','#EC4899','#94A3B8'], borderRadius:6 }]}, options:{ responsive:true, maintainAspectRatio:false, indexAxis:'y', plugins:{ legend:{display:false} }, scales:{ x:{ grid:{color:'rgba(226,232,240,.7)'} }, y:{ grid:{display:false} } } }});
  }
  const cg = document.getElementById('chart-customer-growth');
  if (cg && !cg._ci) {
    cg._ci = new Chart(cg, { type:'line', data:{ labels:['Aug','Sep','Oct','Nov','Dec','Jan'], datasets:[{ label:'New Customers', data:[124,148,136,182,241,184], borderColor:'#2563EB', backgroundColor:'rgba(37,99,235,0.08)', fill:true, tension:.4, pointBackgroundColor:'#2563EB', pointRadius:4 }]}, options:{ responsive:true, maintainAspectRatio:false, plugins:{ legend:{display:false} }, scales:{ x:{ grid:{display:false} }, y:{ grid:{color:'rgba(226,232,240,.7)'} } } }});
  }
}

function initRevenueChart() {
  const rc = document.getElementById('chart-revenue-breakdown');
  if (rc && !rc._ci) {
    rc._ci = new Chart(rc, { type:'bar', data:{ labels:['Aug','Sep','Oct','Nov','Dec','Jan'], datasets:[
      { label:'Partner Revenue', data:[290,372,344,468,612,468], backgroundColor:'rgba(37,99,235,0.15)', borderColor:'#2563EB', borderWidth:2, borderRadius:6 },
      { label:'Platform Commission', data:[32,41,38,52,68,52], backgroundColor:'rgba(20,184,166,0.8)', borderRadius:6 },
    ]}, options:{ responsive:true, maintainAspectRatio:false, plugins:{ legend:{ position:'top', labels:{ usePointStyle:true, font:{size:11} } } }, scales:{ x:{ stacked:true, grid:{ display:false } }, y:{ stacked:true, ticks:{ callback: v=>'₱'+(v/1000).toFixed(0)+'k' }, grid:{ color:'rgba(226,232,240,.7)' } } } }});
  }
}

/* ---- MODAL ---- */
function showAdminModal(id) { const m=document.getElementById(id); if(m) m.classList.add('open'); }
function hideAdminModal(id) { const m=document.getElementById(id); if(m) m.classList.remove('open'); }
document.addEventListener('click', e => { if(e.target.classList.contains('modal-overlay')) e.target.classList.remove('open'); });

/* ---- TOAST ---- */
function showAdminToast(type, title, msg) {
  const c = document.getElementById('admin-toast-container');
  if (!c) return;
  const icons = { success:'✅', error:'❌', info:'ℹ️', warning:'⚠️' };
  const t = document.createElement('div');
  t.className = 'toast';
  t.innerHTML = `<span class="toast-icon">${icons[type]||'ℹ️'}</span><div><div class="toast-title">${title}</div><div class="toast-msg">${msg}</div></div>`;
  c.appendChild(t);
  requestAnimationFrame(() => requestAnimationFrame(() => t.classList.add('show')));
  setTimeout(() => { t.classList.remove('show'); setTimeout(() => t.remove(), 300); }, 3500);
}

/* ---- DARK MODE ---- */
function toggleAdminDark() {
  const isDark = document.documentElement.classList.toggle('dark');
  localStorage.setItem('sakyan-admin-theme', isDark ? 'dark' : 'light');
  const btn = document.getElementById('admin-dark-btn');
  if (btn) btn.textContent = isDark ? '☀️' : '🌙';
}
// Init on load
(function() {
  const saved = localStorage.getItem('sakyan-admin-theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  if (saved === 'dark' || (!saved && prefersDark)) {
    document.documentElement.classList.add('dark');
    document.addEventListener('DOMContentLoaded', () => {
      const btn = document.getElementById('admin-dark-btn');
      if (btn) btn.textContent = '☀️';
    });
  }
})();