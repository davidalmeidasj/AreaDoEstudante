# Carteirinha Web — Digital Student ID

A study project that recreates a university **digital student ID card** as a modern web app.
It started as a port of a React Native (Expo) prototype and grew into a small but
production-flavored front end, used to practice **2026-era React patterns**: feature-based
architecture, strict TypeScript, client/server state separation, schema validation, testing with
mocks, and a styled, scannable QR code.

> **Heads up:** this is a front-end study with **no backend**. The API is mocked with MSW (in tests
> _and_ in the browser during development), and data is persisted in `localStorage`. The QR
> validation is demonstrative (client-side, unsigned) — not cryptographically tamper-proof.

---

## ✨ Features

- **Login** with auto-login: the session is persisted, so reopening the app skips the login screen.
- **Card cadastre** with a live-updating preview and Brazilian input masks (CPF, RG, date).
- **Zod validation**: the "Go to card" button only unlocks when every field is valid.
- **Flip card** (front ↔ back) with a real, **styled QR code** (dots + centered Estácio logo).
- **Public validation page** opened by scanning the QR — works on any phone, offline, no backend.
- **Live greeting** in the top bar mirrors the name typed in the form (shared Zustand store).

**Demo login:** any e-mail and password are accepted.

---

## 🧱 Tech Stack

| Area | Tech |
| --- | --- |
| Core | React 19, Vite 8, TypeScript 6 (`strict`, `noUncheckedIndexedAccess`) |
| Client state | Zustand 5 (`immer` + `devtools` + `persist`) |
| Server state | TanStack Query 5 |
| HTTP | Axios (wrapped `httpClient` with interceptors + token injection) |
| Routing | React Router 7 |
| Validation | Zod 4 |
| Styling | Tailwind CSS 4 (`@theme` tokens) |
| QR | qr-code-styling |
| Testing | Vitest 4, React Testing Library, MSW 2 |
| Tooling | ESLint 10 (flat config + boundaries), Prettier, Husky, lint-staged |

---

## 🏗️ Architecture

**Feature-based ("screaming architecture")** — folders are organized by domain, not by file type.

```
src/
├── app/                  # composition root (router, providers, protected routes, shell)
├── features/
│   ├── auth/             # login, session store, http token injection
│   └── carteirinha/      # student card, form, validation, qr, public validation page
├── shared/               # cross-cutting: httpClient, queryClient, theme, ui (Button)
└── test/                 # vitest setup, msw handlers/server, test-utils
```

Each **feature** is self-contained with `components/`, `hooks/`, `services/`, `store/`, `types/` and a
public `index.ts`. **Dependency rule** (enforced by `eslint-plugin-boundaries`):

- `features` may import from `shared`
- `shared` must **never** import from `features`
- one feature must **never** import another directly — composition happens only in `app/`

The `httpClient` lives in `shared` but needs the auth token. To respect the rule, the `auth`
feature **injects** a token getter into the client at bootstrap (dependency inversion) instead of
`shared` reaching into the feature.

Path aliases: `@/`, `@features/`, `@shared/`.

---

## 🎨 Conventions

Every component follows the same shape, keeping the `.tsx` thin (just JSX):

```
Component/
├── Component.tsx          # markup only
├── Component.styles.ts    # Tailwind classes as constants
├── Component.types.ts     # props & local types
├── useComponent.ts        # state, effects, handlers (logic lives in hooks)
└── index.ts
```

- **Theme as a single source of truth** (`shared/theme`): colors/tokens in TS, mirrored by Tailwind
  `@theme`. No hex colors scattered across components.
- **Services** are pure I/O + request/response types — no business logic.
- **Hooks** own orchestration and the bridge between store and query.
- **Zustand** stores split state from actions and expose atomic selectors.
- **Tests are co-located**, prioritizing hooks, stores and services over UI snapshots.
- Self-documenting code — no inline comments.

---

## 🚀 Getting Started

```bash
npm install
npm run dev          # start the dev app (MSW mocks the API in the browser)
```

Open the printed local URL, log in with any credentials, and fill the card.

### Scripts

| Script | Description |
| --- | --- |
| `npm run dev` | Vite dev server (with browser MSW mocks) |
| `npm run build` | Type-check + production build |
| `npm run test` | Vitest (watch) |
| `npm run test:coverage` | Vitest with coverage report |
| `npm run lint` | ESLint (incl. architecture boundary checks) |
| `npm run format` | Prettier write |

---

## 🧪 Testing

Vitest + React Testing Library + MSW cover the four layers — **service, store, hook, component** —
plus the credential codec and the validation page. MSW intercepts HTTP in tests, so the auth flow is
exercised end to end without a server.

---

## 📌 Notes

- No backend yet: persistence is `localStorage`; the API is mocked by MSW.
- QR validation embeds the data in the URL (base64url) and is **demonstrative** — a real system would
  point the QR at a backend that verifies a signed token.

---

Built as a learning project — feedback is welcome.
