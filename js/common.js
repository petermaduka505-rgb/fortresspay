/**
 * js/common.js
 * Shared utilities: auth guard, header/nav rendering, notifications,
 * modal helpers, formatting, and SVG icon library.
 */

/* ================================================================== */
/*  I18N (English + Chinese Simplified/Traditional)                     */
/* ================================================================== */

const FP_LANGS = [
  { code: "en", label: "English" },
  { code: "zh-Hans", label: "中文（简体）" },
  { code: "zh-Hant", label: "中文（繁體）" },
  // Add more later, e.g.:
  // { code: "es", label: "Español" },
];

const FP_I18N = {
  en: {
    "nav.home": "Home",
    "nav.activity": "Activity",
    "nav.transfer": "Transfer",
    "nav.pay": "Pay",
    "nav.profile": "Profile",

    "menu.profile": "My Profile",
    "menu.statements": "Statements",
    "menu.support": "Support",
    "menu.signout": "Sign Out",
    "menu.language": "Language",

    "notif.header": "Notifications",
    "notif.openAria": "Notifications",
    "notif.closeAria": "Close notifications",

    // Notification content (by ID) — English falls back to stored strings,
    // but we define them here so other languages can map cleanly.
    "notif.notif_006.title": "Geographic restriction applied",
    "notif.notif_006.body":
      "Outgoing transfers and payments are unavailable from your current location. Outgoing account features are supported only within domestic U.S. borders. Incoming bank transfer credits remain available.",

    "notif.notif_005.title": "Profile Updated",
    "notif.notif_005.body":
      "Your contact information was successfully updated.",

    "notif.notif_004.title": "Security Alert",
    "notif.notif_004.body":
      "Your account was accessed from a new device. If this was not you, contact support immediately.",

    "notif.notif_002.title": "Statement Available",
    "notif.notif_002.body":
      "Your account statement for Q1 2023 is now available.",

    "notif.notif_003.title": "Online access enabled",
    "notif.notif_003.body":
      "Online access was enabled for this account. You can view balances, activity, and request statements securely.",

    "notif.notif_001.title": "Account opened",
    "notif.notif_001.body":
      "Your Fixed Deposit Account is active and ready to receive incoming bank transfer credits.",

    "dash.greet.morning": "Good morning,",
    "dash.greet.afternoon": "Good afternoon,",
    "dash.greet.evening": "Good evening,",

    "dash.recent.title": "Recent Activity",
    "dash.recent.viewAll": "View all",
    "dash.recent.viewAllTxns": "View all transactions",
    "dash.recent.empty": "No transactions yet.",

    "dash.details.title": "Account Details",
    "dash.details.accountNo": "Account No.",
    "dash.details.accountType": "Account Type",
    "dash.details.routingNo": "Routing No.",
    "dash.details.memberSince": "Member Since",

    "dash.balance.available": "Available Balance",
    "dash.balance.account": "Account",
    "dash.balance.pillUSOnly": "Transfers: U.S. only",

    "dash.restrict.title": "Account Restriction",
    "dash.restrict.body":
      "Outgoing transfers and payments are unavailable from your current geographical location. This account supports outgoing activity only within domestic U.S. borders. Incoming bank transfer credits will continue to be processed normally.",
    "dash.restrict.help": "For assistance, please contact our support team.",
    "dash.restrict.cta": "Contact Support",

    "dash.security.title": "Security",
    "dash.security.encrypt.title": "256-bit Encryption",
    "dash.security.encrypt.sub": "Your data is fully encrypted",
    "dash.security.session.title": "Session Protected",
    "dash.security.session.sub": "Auto-logout on inactivity",
  },

  "zh-Hans": {
    "nav.home": "首页",
    "nav.activity": "交易记录",
    "nav.transfer": "转账",
    "nav.pay": "付款",
    "nav.profile": "我的",

    "menu.profile": "个人资料",
    "menu.statements": "对账单",
    "menu.support": "帮助与支持",
    "menu.signout": "退出登录",
    "menu.language": "语言",

    "notif.header": "通知",
    "notif.openAria": "通知",
    "notif.closeAria": "关闭通知",

    "notif.notif_006.title": "已应用地理限制",
    "notif.notif_006.body":
      "根据您当前的地理位置，无法发起转账和付款。仅支持在美国境内发起出账操作。入账的银行转账仍可正常处理。",

    "notif.notif_005.title": "个人资料已更新",
    "notif.notif_005.body": "您的联系信息已成功更新。",

    "notif.notif_004.title": "安全提醒",
    "notif.notif_004.body":
      "检测到您的账户从新设备登录访问。如非本人操作，请立即联系支持团队。",

    "notif.notif_002.title": "对账单已生成",
    "notif.notif_002.body": "您的 2023 年第一季度对账单现已可用。",

    "notif.notif_003.title": "已启用在线访问",
    "notif.notif_003.body":
      "已为该账户启用在线访问。您可以安全查看余额、交易记录并申请对账单。",

    "notif.notif_001.title": "账户已开通",
    "notif.notif_001.body":
      "您的定期存款账户已生效，可正常接收入账的银行转账款项。",

    "dash.greet.morning": "早上好，",
    "dash.greet.afternoon": "下午好，",
    "dash.greet.evening": "晚上好，",

    "dash.recent.title": "近期交易",
    "dash.recent.viewAll": "查看全部",
    "dash.recent.viewAllTxns": "查看全部交易",
    "dash.recent.empty": "暂无交易记录。",

    "dash.details.title": "账户详情",
    "dash.details.accountNo": "账户号码",
    "dash.details.accountType": "账户类型",
    "dash.details.routingNo": "路由号码",
    "dash.details.memberSince": "加入时间",

    "dash.balance.available": "可用余额",
    "dash.balance.account": "账户",
    "dash.balance.pillUSOnly": "转账：仅限美国境内",

    "dash.restrict.title": "账户限制",
    "dash.restrict.body":
      "根据您当前的地理位置，无法发起转账和付款。本账户仅支持在美国境内发起出账操作。入账的银行转账将继续正常处理。",
    "dash.restrict.help": "如需协助，请联系支持团队。",
    "dash.restrict.cta": "联系支持",

    "dash.security.title": "安全",
    "dash.security.encrypt.title": "256位加密",
    "dash.security.encrypt.sub": "您的数据已完全加密",
    "dash.security.session.title": "会话保护",
    "dash.security.session.sub": "闲置时自动登出",
  },

  "zh-Hant": {
    "nav.home": "首頁",
    "nav.activity": "交易記錄",
    "nav.transfer": "轉帳",
    "nav.pay": "付款",
    "nav.profile": "我的",

    "menu.profile": "個人資料",
    "menu.statements": "帳單",
    "menu.support": "協助與支援",
    "menu.signout": "登出",
    "menu.language": "語言",

    "notif.header": "通知",
    "notif.openAria": "通知",
    "notif.closeAria": "關閉通知",

    "notif.notif_006.title": "已套用地理限制",
    "notif.notif_006.body":
      "依據您目前的地理位置，無法發起轉帳與付款。僅支援在美國境內發起出帳操作。入帳的銀行轉帳仍可正常處理。",

    "notif.notif_005.title": "個人資料已更新",
    "notif.notif_005.body": "您的聯絡資訊已成功更新。",

    "notif.notif_004.title": "安全提醒",
    "notif.notif_004.body":
      "偵測到您的帳戶從新裝置登入存取。如非本人操作，請立即聯絡支援團隊。",

    "notif.notif_002.title": "帳單已提供",
    "notif.notif_002.body": "您的 2023 年第一季帳單現已可用。",

    "notif.notif_003.title": "已啟用線上存取",
    "notif.notif_003.body":
      "已為此帳戶啟用線上存取。您可以安全查看餘額、交易記錄並申請帳單。",

    "notif.notif_001.title": "帳戶已開通",
    "notif.notif_001.body":
      "您的定期存款帳戶已生效，可正常接收入帳的銀行轉帳款項。",

    "dash.greet.morning": "早安，",
    "dash.greet.afternoon": "午安，",
    "dash.greet.evening": "晚安，",

    "dash.recent.title": "近期交易",
    "dash.recent.viewAll": "檢視全部",
    "dash.recent.viewAllTxns": "檢視全部交易",
    "dash.recent.empty": "暫無交易記錄。",

    "dash.details.title": "帳戶詳情",
    "dash.details.accountNo": "帳戶號碼",
    "dash.details.accountType": "帳戶類型",
    "dash.details.routingNo": "路由號碼",
    "dash.details.memberSince": "加入時間",

    "dash.balance.available": "可用餘額",
    "dash.balance.account": "帳戶",
    "dash.balance.pillUSOnly": "轉帳：僅限美國境內",

    "dash.restrict.title": "帳戶限制",
    "dash.restrict.body":
      "依據您目前的地理位置，無法發起轉帳與付款。本帳戶僅支援在美國境內發起出帳操作。入帳的銀行轉帳將持續正常處理。",
    "dash.restrict.help": "如需協助，請聯絡支援團隊。",
    "dash.restrict.cta": "聯絡支援",

    "dash.security.title": "安全",
    "dash.security.encrypt.title": "256位元加密",
    "dash.security.encrypt.sub": "您的資料已完全加密",
    "dash.security.session.title": "連線階段保護",
    "dash.security.session.sub": "閒置時自動登出",
  },
};

// Extend translations from any page script without editing common.js again.
// Last-write-wins if the same key is provided twice.
function fpI18nExtend(bundle) {
  if (!bundle) return;

  Object.keys(bundle).forEach(function (lang) {
    if (!FP_I18N[lang]) FP_I18N[lang] = {};

    var src = bundle[lang] || {};
    Object.keys(src).forEach(function (key) {
      FP_I18N[lang][key] = src[key];
    });
  });
}

function fpIsSupportedLang(code) {
  return FP_LANGS.some((l) => l.code === code);
}

function getLang() {
  try {
    const v = localStorage.getItem("fp_lang");
    return v && fpIsSupportedLang(v) ? v : "";
  } catch (e) {
    return "";
  }
}

function setLang(code) {
  if (!fpIsSupportedLang(code)) code = "en";
  try {
    localStorage.setItem("fp_lang", code);
  } catch (e) {}
  try {
    document.documentElement.setAttribute("lang", code);
  } catch (e) {}
}

function detectPreferredLang() {
  const langs =
    navigator.languages && navigator.languages.length
      ? navigator.languages
      : [navigator.language || "en"];

  for (let i = 0; i < langs.length; i++) {
    const l = String(langs[i] || "").toLowerCase();

    if (l.includes("zh-hant")) return "zh-Hant";
    if (l.includes("zh-hans")) return "zh-Hans";

    if (l.startsWith("zh-")) {
      if (l.includes("-tw") || l.includes("-hk") || l.includes("-mo"))
        return "zh-Hant";
      if (l.includes("-cn") || l.includes("-sg") || l.includes("-my"))
        return "zh-Hans";
      return "zh-Hans";
    }

    if (l === "zh") return "zh-Hans";
  }

  return "en";
}

function ensureLang() {
  const saved = getLang();
  if (saved) {
    setLang(saved);
    return saved;
  }
  const initial = detectPreferredLang();
  setLang(initial);
  return initial;
}

function t(key, fallback) {
  const lang = getLang() || "en";
  const table = FP_I18N[lang] || FP_I18N.en;
  const en = FP_I18N.en || {};
  if (table && Object.prototype.hasOwnProperty.call(table, key))
    return table[key];
  if (en && Object.prototype.hasOwnProperty.call(en, key)) return en[key];
  return fallback != null ? fallback : key;
}

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

  function notifTitle(n) {
    return t(`notif.${n.id}.title`, n.title);
  }
  function notifBody(n) {
    return t(`notif.${n.id}.body`, n.body);
  }

  const lang = getLang() || "en";
  const langOptions = FP_LANGS.map(
    (l) =>
      `<option value="${l.code}"${l.code === lang ? " selected" : ""}>${l.label}</option>`,
  ).join("");

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
        <button class="fp-bell-btn" id="fp-bell-btn" aria-label="${t("notif.openAria", "Notifications")}">
          ${FP_ICONS.bell}
          ${
            unread > 0
              ? `<span class="fp-badge" id="fp-badge">${unread}</span>`
              : '<span class="fp-badge fp-badge-hidden" id="fp-badge">0</span>'
          }
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
              <span>${t("menu.profile", "My Profile")}</span>
            </a>

            <a href="statements.html" class="fp-dropdown-item">
              ${FP_ICONS.document}
              <span>${t("menu.statements", "Statements")}</span>
            </a>

            <a href="support.html" class="fp-dropdown-item">
              ${FP_ICONS.support}
              <span>${t("menu.support", "Support")}</span>
            </a>

            <!-- Language switcher -->
            <div class="fp-dropdown-item" style="gap:10px; cursor:default;">
              <span style="width:18px; height:18px; display:inline-flex; align-items:center; justify-content:center; color:var(--fp-gray-500);">
                <!-- simple globe-ish icon -->
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.8"/>
                  <path d="M3 12h18" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
                  <path d="M12 3c3 3.5 3 14 0 18c-3-3.5-3-14 0-18z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>
                </svg>
              </span>
              <span style="flex:1; color:var(--fp-gray-700); font-size:0.875rem;">${t("menu.language", "Language")}</span>
              <select id="fp-lang-select" aria-label="${t("menu.language", "Language")}"
                style="font:inherit; font-size:0.85rem; padding:6px 8px; border:1px solid var(--fp-gray-200); border-radius:10px; background:#fff; color:var(--fp-gray-800);">
                ${langOptions}
              </select>
            </div>

            <button class="fp-dropdown-item fp-dropdown-logout" id="fp-logout-btn">
              ${FP_ICONS.logout}
              <span>${t("menu.signout", "Sign Out")}</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Notification Panel -->
    <div class="fp-notif-overlay" id="fp-notif-overlay" aria-hidden="true"></div>
    <div class="fp-notif-panel" id="fp-notif-panel" aria-label="${t("notif.header", "Notifications")}" aria-hidden="true">
      <div class="fp-notif-panel-header">
        <span>${t("notif.header", "Notifications")}</span>
        <button class="fp-notif-close" id="fp-notif-close" aria-label="${t("notif.closeAria", "Close notifications")}">
          ${FP_ICONS.close}
        </button>
      </div>
      <ul class="fp-notif-list" id="fp-notif-list">
        ${notifs
          .map(
            (n) => `
          <li class="fp-notif-item${n.read ? "" : " fp-notif-unread"}">
            <div class="fp-notif-dot-wrap">
              ${
                !n.read
                  ? '<span class="fp-notif-dot"></span>'
                  : '<span class="fp-notif-dot fp-notif-dot-read"></span>'
              }
            </div>
            <div class="fp-notif-body">
              <p class="fp-notif-title">${notifTitle(n)}</p>
              <p class="fp-notif-text">${notifBody(n)}</p>
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
    if (!notifPanel || !notifOverlay) return;
    notifPanel.classList.add("fp-notif-panel-open");
    notifPanel.setAttribute("aria-hidden", "false");
    notifOverlay.classList.add("fp-notif-overlay-open");
    markNotificationsRead();

    const badge = document.getElementById("fp-badge");
    if (badge) badge.classList.add("fp-badge-hidden");

    document.querySelectorAll(".fp-notif-unread").forEach((el) => {
      el.classList.remove("fp-notif-unread");
    });
    document.querySelectorAll(".fp-notif-dot").forEach((el) => {
      el.classList.add("fp-notif-dot-read");
    });
  }

  function closeNotifPanel() {
    if (!notifPanel || !notifOverlay) return;
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
  }

  /* Bind global document handlers once (prevents stacking on rerender) */
  if (!window.__fpHeaderGlobalBound) {
    window.__fpHeaderGlobalBound = true;

    document.addEventListener("click", () => {
      const dd = document.getElementById("fp-profile-dropdown");
      if (dd && dd.classList.contains("fp-profile-dropdown-open")) {
        dd.classList.remove("fp-profile-dropdown-open");
        dd.setAttribute("aria-hidden", "true");
      }
    });

    document.addEventListener("keydown", (e) => {
      if (e.key !== "Escape") return;

      // Close notif panel
      const p = document.getElementById("fp-notif-panel");
      const o = document.getElementById("fp-notif-overlay");
      if (p) {
        p.classList.remove("fp-notif-panel-open");
        p.setAttribute("aria-hidden", "true");
      }
      if (o) o.classList.remove("fp-notif-overlay-open");

      // Close profile dropdown
      const dd = document.getElementById("fp-profile-dropdown");
      if (dd) {
        dd.classList.remove("fp-profile-dropdown-open");
        dd.setAttribute("aria-hidden", "true");
      }
    });
  }

  /* Language switch */
  const langSelect = document.getElementById("fp-lang-select");
  if (langSelect) {
    langSelect.addEventListener("change", (e) => {
      const next = e.target.value;
      setLang(next);

      // Re-render header + bottom nav in the new language
      const page = window.__fpActivePage || activePage || "dashboard";
      renderHeader(page);
      renderBottomNav(page);
      window.dispatchEvent(new Event("fp:langchange"));
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
}

/* ================================================================== */
/*  BOTTOM NAVIGATION                                                  */
/* ================================================================== */

function renderBottomNav(activePage) {
  const nav = document.getElementById("fp-bottom-nav");
  if (!nav) return;

  const items = [
    {
      id: "dashboard",
      labelKey: "nav.home",
      icon: "home",
      href: "dashboard.html",
    },
    {
      id: "activity",
      labelKey: "nav.activity",
      icon: "activity",
      href: "activity.html",
    },
    {
      id: "transfer",
      labelKey: "nav.transfer",
      icon: "transfer",
      href: "transfer.html",
    },
    { id: "pay", labelKey: "nav.pay", icon: "pay", href: "pay.html" },
    {
      id: "profile",
      labelKey: "nav.profile",
      icon: "user",
      href: "profile.html",
    },
  ];

  nav.innerHTML = items
    .map((item) => {
      const label = t(item.labelKey, ""); // fallback not needed here
      return `
        <a href="${item.href}"
          class="fp-nav-item${activePage === item.id ? " fp-nav-item-active" : ""}"
          aria-label="${label}"
          ${activePage === item.id ? 'aria-current="page"' : ""}>
          <span class="fp-nav-icon">${FP_ICONS[item.icon]}</span>
          <span class="fp-nav-label">${label}</span>
        </a>
      `;
    })
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

  // Track active page for rerender on language switch
  window.__fpActivePage = activePage;

  // Ensure a language is chosen once (and html[lang] set)
  ensureLang();

  if (!requireAuth()) return false;

  renderHeader(activePage);
  renderBottomNav(activePage);
  return true;
}
