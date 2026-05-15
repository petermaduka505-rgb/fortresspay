/**
 * js/api.js
 * Promise-based fake AJAX layer. All data access goes through these
 * functions. No page script should read/write localStorage directly.
 */

/* ------------------------------------------------------------------ */
/*  Internal helpers                                                    */
/* ------------------------------------------------------------------ */

function _delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function _store(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function _load(key) {
  try {
    return JSON.parse(localStorage.getItem(key));
  } catch (_) {
    return null;
  }
}

function _generateSessionToken() {
  return (
    "fp_sess_" + Math.random().toString(36).slice(2) + Date.now().toString(36)
  );
}

/* ------------------------------------------------------------------ */
/*  Transaction generation                                              */
/* ------------------------------------------------------------------ */

function _buildTransactions() {
  const cfg = FP_CONFIG.transaction;
  const target = cfg.targetTotal;

  /* Base amounts: vary realistically month to month */
  const baseAmounts = [
    28500, 31200, 29800, 33400, 27600, 30100, 35000, 38200, 32500, 29900, 41000,
    36700, 28900, 31500, 30400, 34100, 27800, 32300, 36500, 39000, 33200, 30600,
    42500, 38100, 29300, 32000, 30900, 34700, 28200, 31800, 37000, 39500, 33800,
    31100, 43000, 38700, 29700, 32500, 31400, 35200, 28600, 32200, 37500, 40000,
    34300, 31600, 43500, 39200, 30100, 33000, 31900, 35700, 29000, 32700, 38000,
    40500, 34800, 32100, 44000, 39700, 30500, 33500, 32400, 36200, 29400, 33200,
    38500, 41000, 35300, 32600, 44500, 40200, 30900, 34000, 32900, 36700, 29800,
    33700, 39000, 41500, 35800, 33100, 45000, 40700, 31300, 34500, 33400, 37200,
    30200, 34200, 39500, 42000, 36300, 33600, 45500, 41200,
  ];

  /* Compute current sum and adjust the last entry */
  let sum = baseAmounts.reduce((a, b) => a + b, 0);
  const diff = parseFloat((target - sum).toFixed(2));
  baseAmounts[baseAmounts.length - 1] = parseFloat(
    (baseAmounts[baseAmounts.length - 1] + diff).toFixed(2),
  );

  /* Verify */
  const finalSum = baseAmounts.reduce((a, b) => a + b, 0);
  if (Math.abs(finalSum - target) > 0.01) {
    console.warn(
      "[Fortress Pay] Transaction sum mismatch! Expected:",
      target,
      "Got:",
      finalSum,
    );
  }

  const memos = [
    "Monthly credit disbursement",
    "Scheduled account credit",
    "Fixed deposit interest credit",
    "Periodic fund credit",
    "Regular account funding",
    "Quarterly interest posting",
    "Authorized fund transfer",
    "Standing order credit",
    "Account maintenance credit",
    "Contracted payment credit",
    "Agreed schedule credit",
    "Portfolio income credit",
  ];

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const transactions = [];
  let idx = 0;

  for (let year = 2017; year <= 2024; year++) {
    for (let month = 0; month < 12; month++) {
      const monthName = months[month];
      const paddedMonth = String(month + 1).padStart(2, "0");
      const dateStr = `${monthName} ${cfg.day}, ${year}`;
      const isoDate = `${year}-${paddedMonth}-${String(cfg.day).padStart(2, "0")}T${cfg.time}:00`;

      transactions.push({
        id: `txn_${year}_${paddedMonth}`,
        date: dateStr,
        isoDate: isoDate,
        time: cfg.time,
        amount: baseAmounts[idx],
        type: "Credit",
        method: cfg.method,
        status: cfg.status,
        sender: cfg.sender,
        senderAccount: cfg.senderAccount,
        reference: `REF-${year}${paddedMonth}-${String(idx + 1).padStart(3, "0")}`,
        memo: memos[month % memos.length],
        currency: "USD",
      });

      idx++;
    }
  }

  /* Return newest first */
  return transactions.reverse();
}

/* ------------------------------------------------------------------ */
/*  seedIfNeeded                                                        */
/* ------------------------------------------------------------------ */

function seedIfNeeded() {
  const existing = _load("fp_user");
  if (existing) return; /* Already seeded */
  _seed();
}

function _seed() {
  const u = FP_CONFIG.user;
  _store("fp_user", {
    id: u.id,
    email: u.email,
    firstName: u.firstName,
    lastName: u.lastName,
    phone: u.phone,
    address: u.address,
    accountNumber: u.accountNumber,
    accountType: u.accountType,
    routingNumber: u.routingNumber,
    memberSince: u.memberSince,
    restricted: u.restricted,
  });

  _store("fp_transactions", _buildTransactions());
  _store("fp_notifications", FP_CONFIG.notifications);
  _store("fp_statement_requests", []);
  /* Session is not seeded — user must log in */
}

/* ------------------------------------------------------------------ */
/*  forceSeed (used by ?reset=1)                                        */
/* ------------------------------------------------------------------ */

function forceSeed() {
  localStorage.removeItem("fp_user");
  localStorage.removeItem("fp_session");
  localStorage.removeItem("fp_transactions");
  localStorage.removeItem("fp_notifications");
  localStorage.removeItem("fp_statement_requests");
  _seed();
}

/* ------------------------------------------------------------------ */
/*  Auth                                                                */
/* ------------------------------------------------------------------ */

function login(email, password) {
  return _delay(900).then(() => {
    const stored = _load("fp_user");
    if (!stored) throw new Error("No account found.");
    if (
      email.trim().toLowerCase() !== FP_CONFIG.user.email.toLowerCase() ||
      password !== FP_CONFIG.user.password
    ) {
      throw new Error("The email or password you entered is incorrect.");
    }
    const token = _generateSessionToken();
    _store("fp_session", token);
    return { token, user: stored };
  });
}

function logout() {
  localStorage.removeItem("fp_session");
  return Promise.resolve();
}

function getSession() {
  return _load("fp_session");
}

/* ------------------------------------------------------------------ */
/*  User & Balance                                                      */
/* ------------------------------------------------------------------ */

function getUser() {
  return _delay(200).then(() => {
    const u = _load("fp_user");
    if (!u) throw new Error("User not found.");
    return u;
  });
}

function getBalance() {
  return _delay(300).then(() => {
    const txns = _load("fp_transactions") || [];
    const total = txns.reduce((sum, t) => sum + t.amount, 0);
    return parseFloat(total.toFixed(2));
  });
}

/* ------------------------------------------------------------------ */
/*  Transactions                                                        */
/* ------------------------------------------------------------------ */

function getTransactions({ offset = 0, limit = 12 } = {}) {
  return _delay(600).then(() => {
    const all = _load("fp_transactions") || [];
    const slice = all.slice(offset, offset + limit);
    return {
      items: slice,
      total: all.length,
      offset,
      limit,
      hasMore: offset + limit < all.length,
    };
  });
}

function getTransactionById(id) {
  return _delay(400).then(() => {
    const all = _load("fp_transactions") || [];
    const txn = all.find((t) => t.id === id);
    if (!txn) throw new Error("Transaction not found.");
    return txn;
  });
}

/* ------------------------------------------------------------------ */
/*  Notifications                                                       */
/* ------------------------------------------------------------------ */

function getNotifications() {
  return _load("fp_notifications") || [];
}

function markNotificationsRead() {
  const notifs = getNotifications().map((n) => ({ ...n, read: true }));
  _store("fp_notifications", notifs);
}

function getUnreadCount() {
  return getNotifications().filter((n) => !n.read).length;
}

/* ------------------------------------------------------------------ */
/*  Statement Requests                                                  */
/* ------------------------------------------------------------------ */

function requestStatement({ from, to, email }) {
  return _delay(1100).then(() => {
    if (!from || !to || !email) throw new Error("All fields are required.");
    if (new Date(from) > new Date(to))
      throw new Error("Start date must be before end date.");

    const requests = _load("fp_statement_requests") || [];
    const entry = {
      id: "stmt_" + Date.now(),
      from,
      to,
      email,
      requestedAt: new Date().toISOString(),
      status: "Processing",
    };
    requests.unshift(entry);
    _store("fp_statement_requests", requests);
    return entry;
  });
}

function getStatementRequests() {
  return Promise.resolve(_load("fp_statement_requests") || []);
}
