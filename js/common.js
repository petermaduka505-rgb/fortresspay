/**
 * js/common.js
 * Shared utilities: auth guard, header/nav rendering, notifications,
 * modal helpers, formatting, and SVG icon library.
 */

/* ================================================================== */
/*  SVG ICON LIBRARY                                                   */
/* ================================================================== */

const FP_ICONS = {
  logo: `<svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <rect width="28" height="28" rx="6" fill="#1a56db"/>
    <path d="M7 8h14v3H7zM7 13h10v2H7zM7 18h12v2H7z" fill="#fff"/>
    <path d="M19 13l4 4-4 4" stroke="#93c5fd" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
  </svg>`,

  bell: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`,

  close: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M6 18L18 6M6 6l12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`,

  back: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M19 12H5M5 12l7 7M5 12l7-7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`,

  home: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M3 12l9-9 9 9M5 10v9a1 1 0 001 1h4v-5h4v5h4a1 1 0 001-1v-9" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`,

  activity: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 8h6m-6 4h4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`,

  transfer: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M7 16V4m0 0L3 8m4-4l4 4M17 8v12m0 0l4-4m-4 4l-4-4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`,

  pay: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <rect x="2" y="5" width="20" height="14" rx="2" stroke="currentColor" stroke-width="1.8"/>
    <path d="M2 10h20" stroke="currentColor" stroke-width="1.8"/>
    <path d="M6 15h4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
    <circle cx="17" cy="15" r="1.5" fill="currentColor"/>
  </svg>`,

  user: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`,

  chevronRight: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M9 18l6-6-6-6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`,

  check: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M5 13l4 4L19 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`,

  shield: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`,

  document: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`,

  support: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="1.8"/>
    <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3M12 17h.01" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`,

  logout: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`,

  info: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="1.8"/>
    <path d="M12 16v-4M12 8h.01" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`,

  lock: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <rect x="5" y="11" width="14" height="10" rx="2" stroke="currentColor" stroke-width="1.8"/>
    <path d="M8 11V7a4 4 0 018 0v4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
  </svg>`,

  calendar: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" stroke-width="1.8"/>
    <path d="M16 2v4M8 2v4M3 10h18" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
  </svg>`,

  arrowDown: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M12 5v14M5 12l7 7 7-7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`,
};

/* ================================================================== */
/*  FORMATTING HELPERS                                                 */
/* ================================================================== */

function formatCurrency(amount, currency = "USD") {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

function formatDate(dateStr) {
  return dateStr; /* Already formatted as "Month DD, YYYY" */
}

/* ================================================================== */
/*  AUTH GUARD                                                         */
/* ================================================================== */

function requireAuth() {
  const session = getSession();
  if (!session) {
    window.location.href = "login.html";
    return false;
  }
  return true;
}

function redirectIfAuthed() {
  const session = getSession();
  if (session) {
    window.location.href = "dashboard.html";
    return true;
  }
  return false;
}

/* ================================================================== */
/*  HEADER RENDERING                                                   */
/* ================================================================== */

function renderHeader(activePage) {
  const notifs = getNotifications();
  const unread = notifs.filter((n) => !n.read).length;

  const header = document.getElementById("fp-header");
  if (!header) return;

  header.innerHTML = `
    <div class="fp-header-inner">
      <a class="fp-logo-link" href="dashboard.html" aria-label="Fortress Pay">
        <img
          src="assets/fortresspay-lockup.png"
          alt="Fortress Pay"
          class="fp-logo-img"
          decoding="async"
        />
      </a>
      <div class="fp-header-actions">
        <button class="fp-bell-btn" id="fp-bell-btn" aria-label="Notifications">
          ${FP_ICONS.bell}
          ${unread > 0 ? `<span class="fp-badge" id="fp-badge">${unread}</span>` : '<span class="fp-badge fp-badge-hidden" id="fp-badge">0</span>'}
        </button>
        <div class="fp-profile-menu-wrap">
          <button class="fp-profile-btn" id="fp-profile-btn" aria-label="Profile menu">
            <span class="fp-avatar" id="fp-avatar">--</span>
          </button>
          <div class="fp-profile-dropdown" id="fp-profile-dropdown" aria-hidden="true">
            <div class="fp-profile-dropdown-header">
              <span class="fp-profile-name" id="fp-profile-name">Loading...</span>
              <span class="fp-profile-email" id="fp-profile-email"></span>
            </div>
            <a href="profile.html" class="fp-dropdown-item">
              ${FP_ICONS.user}
              <span>My Profile</span>
            </a>
            <a href="statements.html" class="fp-dropdown-item">
              ${FP_ICONS.document}
              <span>Statements</span>
            </a>
            <a href="support.html" class="fp-dropdown-item">
              ${FP_ICONS.support}
              <span>Support</span>
            </a>
            <button class="fp-dropdown-item fp-dropdown-logout" id="fp-logout-btn">
              ${FP_ICONS.logout}
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Notification Panel -->
    <div class="fp-notif-overlay" id="fp-notif-overlay" aria-hidden="true"></div>
    <div class="fp-notif-panel" id="fp-notif-panel" aria-label="Notifications panel" aria-hidden="true">
      <div class="fp-notif-panel-header">
        <span>Notifications</span>
        <button class="fp-notif-close" id="fp-notif-close" aria-label="Close notifications">
          ${FP_ICONS.close}
        </button>
      </div>
      <ul class="fp-notif-list" id="fp-notif-list">
        ${notifs
          .map(
            (n) => `
          <li class="fp-notif-item${n.read ? "" : " fp-notif-unread"}">
            <div class="fp-notif-dot-wrap">
              ${!n.read ? '<span class="fp-notif-dot"></span>' : '<span class="fp-notif-dot fp-notif-dot-read"></span>'}
            </div>
            <div class="fp-notif-body">
              <p class="fp-notif-title">${n.title}</p>
              <p class="fp-notif-text">${n.body}</p>
              <p class="fp-notif-date">${n.date}</p>
            </div>
          </li>
        `,
          )
          .join("")}
      </ul>
    </div>
  `;

  /* Populate user info async */
  getUser()
    .then((u) => {
      const initials = (u.firstName[0] + u.lastName[0]).toUpperCase();
      const avatarEl = document.getElementById("fp-avatar");
      const nameEl = document.getElementById("fp-profile-name");
      const emailEl = document.getElementById("fp-profile-email");
      if (avatarEl) avatarEl.textContent = initials;
      if (nameEl) nameEl.textContent = u.firstName + " " + u.lastName;
      if (emailEl) emailEl.textContent = u.email;
    })
    .catch(() => {});

  /* Bell button */
  const bellBtn = document.getElementById("fp-bell-btn");
  const notifPanel = document.getElementById("fp-notif-panel");
  const notifOverlay = document.getElementById("fp-notif-overlay");
  const notifClose = document.getElementById("fp-notif-close");

  function openNotifPanel() {
    notifPanel.classList.add("fp-notif-panel-open");
    notifPanel.setAttribute("aria-hidden", "false");
    notifOverlay.classList.add("fp-notif-overlay-open");
    markNotificationsRead();
    const badge = document.getElementById("fp-badge");
    if (badge) {
      badge.classList.add("fp-badge-hidden");
    }
    /* Mark visual unread items as read */
    document.querySelectorAll(".fp-notif-unread").forEach((el) => {
      el.classList.remove("fp-notif-unread");
    });
    document.querySelectorAll(".fp-notif-dot").forEach((el) => {
      el.classList.add("fp-notif-dot-read");
    });
  }

  function closeNotifPanel() {
    notifPanel.classList.remove("fp-notif-panel-open");
    notifPanel.setAttribute("aria-hidden", "true");
    notifOverlay.classList.remove("fp-notif-overlay-open");
  }

  if (bellBtn) bellBtn.addEventListener("click", openNotifPanel);
  if (notifClose) notifClose.addEventListener("click", closeNotifPanel);
  if (notifOverlay) notifOverlay.addEventListener("click", closeNotifPanel);

  /* Profile dropdown */
  const profileBtn = document.getElementById("fp-profile-btn");
  const profileDropdown = document.getElementById("fp-profile-dropdown");

  if (profileBtn && profileDropdown) {
    profileBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      const open = profileDropdown.classList.toggle("fp-profile-dropdown-open");
      profileDropdown.setAttribute("aria-hidden", String(!open));
    });

    document.addEventListener("click", () => {
      if (profileDropdown.classList.contains("fp-profile-dropdown-open")) {
        profileDropdown.classList.remove("fp-profile-dropdown-open");
        profileDropdown.setAttribute("aria-hidden", "true");
      }
    });
  }

  /* Logout */
  const logoutBtn = document.getElementById("fp-logout-btn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      logout().then(() => {
        window.location.href = "login.html";
      });
    });
  }

  /* ESC to close notification panel */
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeNotifPanel();
      if (profileDropdown) {
        profileDropdown.classList.remove("fp-profile-dropdown-open");
        profileDropdown.setAttribute("aria-hidden", "true");
      }
    }
  });
}

/* ================================================================== */
/*  BOTTOM NAVIGATION                                                  */
/* ================================================================== */

function renderBottomNav(activePage) {
  const nav = document.getElementById("fp-bottom-nav");
  if (!nav) return;

  const items = [
    { id: "dashboard", label: "Home", icon: "home", href: "dashboard.html" },
    {
      id: "activity",
      label: "Activity",
      icon: "activity",
      href: "activity.html",
    },
    {
      id: "transfer",
      label: "Transfer",
      icon: "transfer",
      href: "transfer.html",
    },
    { id: "pay", label: "Pay", icon: "pay", href: "pay.html" },
    { id: "profile", label: "Profile", icon: "user", href: "profile.html" },
  ];

  nav.innerHTML = items
    .map(
      (item) => `
    <a href="${item.href}"
       class="fp-nav-item${activePage === item.id ? " fp-nav-item-active" : ""}"
       aria-label="${item.label}"
       ${activePage === item.id ? 'aria-current="page"' : ""}>
      <span class="fp-nav-icon">${FP_ICONS[item.icon]}</span>
      <span class="fp-nav-label">${item.label}</span>
    </a>
  `,
    )
    .join("");
}

/* ================================================================== */
/*  MODAL HELPERS                                                      */
/* ================================================================== */

function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (!modal) return;
  modal.classList.add("fp-modal-open");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("fp-no-scroll");

  /* Close on overlay click */
  modal.addEventListener("click", function onOverlayClick(e) {
    if (e.target === modal) {
      closeModal(modalId);
      modal.removeEventListener("click", onOverlayClick);
    }
  });
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (!modal) return;
  modal.classList.remove("fp-modal-open");
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("fp-no-scroll");
}

function setupModalEsc(modalId) {
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal(modalId);
  });
}

/* ================================================================== */
/*  PAGE INIT HELPER                                                   */
/* ================================================================== */

function initPage(activePage) {
  seedIfNeeded();
  if (!requireAuth()) return false;
  renderHeader(activePage);
  renderBottomNav(activePage);
  return true;
}
