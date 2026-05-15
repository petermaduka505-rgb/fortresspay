# Fortress Pay

A multi-page banking web application built with vanilla HTML, CSS, and JavaScript.
localStorage is used as the database. All network calls are simulated via a Promise-based
fake AJAX layer using setTimeout delays.

---

## How to Run

No build tools are required. Simply open `index.html` in any modern browser:

**Option A — Direct file open:**

```
Open index.html in your browser (double-click or drag into browser window).
```

**Option B — Local static server (recommended to avoid any browser file:// quirks):**

```bash
# Python 3
python -m http.server 8080

# Node.js (npx)
npx serve .

# Then visit: http://localhost:8080
```

The app will automatically redirect you to the login page on first visit,
or to the dashboard if a session is already active.

---

## Credentials

Login credentials are defined in a single file: **`js/config.js`**

```js
// js/config.js
const FP_CONFIG = {
  user: {
    email: "margaret.osei@example.com",
    password: "Fortress2024!",
    ...
  }
};
```

**Default credentials for convenience:**

- Email: `margaret.osei@example.com`
- Password: `Fortress2024!`

To change credentials, edit **only** `js/config.js`. No other file needs to be touched.

---

## How to Change Credentials

1. Open `js/config.js` in any text editor.
2. Update the `email` and/or `password` fields inside `FP_CONFIG.user`.
3. Save the file.
4. Perform a data reset (see below) so localStorage is reseeded with the new values.

---

## Data Reset (Hidden)

If you need to clear and reseed all localStorage data (transactions, notifications,
user profile, session), navigate to:

```
login.html?reset=1
```

This will silently wipe all stored data, reseed from `js/config.js`, and display
an inline confirmation message on the page. No modal will appear.

Use this after changing credentials or if the app enters an unexpected state.

---

## Architecture Notes

- `js/config.js` — Single source of truth for credentials, user profile, and seed data config.
- `js/api.js` — All data access functions. Pages never touch localStorage directly.
- `js/common.js` — Shared layout rendering (header, bottom nav, auth guard, notifications, modals).
- `styles.css` — Global styles shared across all pages.
- Each `.html` file is a fully self-contained page with its own `<script>` block.

---

## localStorage Keys Used

| Key                     | Contents                                     |
| ----------------------- | -------------------------------------------- |
| `fp_user`               | User profile object                          |
| `fp_session`            | Session token string                         |
| `fp_transactions`       | Array of 96 transaction objects              |
| `fp_notifications`      | Array of notification objects                |
| `fp_statement_requests` | Array of submitted statement request objects |

---

## Transaction Dataset

- Account type: Fixed Deposit Account
- 96 transactions: one per month, January 2017 through December 2024
- All credits via Bank Transfer
- Sender: Stonebridge Holdings / \*\*\*\* 4831
- Total balance: **$3,750,059.00**
