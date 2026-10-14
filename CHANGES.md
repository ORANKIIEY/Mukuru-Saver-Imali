# Mukuru Money Coach — Changes & Deployment Fixes

> **Summary**: This document details all architectural fixes, duplicate file removals, directory un-nesting, deployment configurations, dashboard UI enhancements, multi-language localization, and Role-Based Access Control (RBAC) Admin Console implementation.

---

## 1. Summary of Changes

| Category | Description | Status |
| :--- | :--- | :--- |
| **Directory Restructure** | Un-nested `money-coach-backend/money-coach-backend/` to a single clean `money-coach-backend/` directory preserving Git history. | Verified & Deployed |
| **Duplicate Cleanup** | Deleted redundant `/Dockerfile`, conflicting root `package-lock.json` and React 19 dependencies, and stale pre-compiled static assets. | Verified |
| **Docker & Deployment** | Fixed `.dockerignore` ignoring `frontend`, standardized multi-stage Docker build, and configured Render Blueprint. | Verified |
| **Single-Port SPA Routing** | Added `SpaWebFilterConfig.java` to support direct client-side routing on `/dashboard`, `/goals`, `/coach`, `/invite`, and `/admin`. | Verified |
| **Demo & Auth Fixes** | Fixed blank page crashes on dashboard (`LoadingState`, `GroceryAlertCard` imports) and unblocked customer registration. | Verified |
| **Active Goals Card Redesign** | Refactored Active Goals to match the dashboard design system (`Card`, `MoneySummaryCard` tokens) while preserving exact emerald, amber, and dark color palettes. | Verified |
| **Active Goals Multi-Language** | Added dynamic i18n localization for Active Goals across English (EN), isiZulu (ZU), and chiShona (SN). | Verified |
| **Admin Console & RBAC** | Implemented Role-Based Access Control (`customer` vs `admin`), 403 Forbidden screen blocking customer access, hidden admin navigation for customers, and operational admin tools. | Verified |

---

## 2. Duplicate Files & Directories Removed

1. **Removed Redundant Backend Dockerfile**:
   - Deleted: `money-coach-backend/money-coach-backend/Dockerfile`
   - Single source of truth retained at root: [`Dockerfile`](file:///Dockerfile).
2. **Removed Redundant Root `package-lock.json`**:
   - Deleted: `package-lock.json` (root)
   - The root is strictly an npm script runner; actual project dependencies and lockfile reside cleanly in [`frontend/package.json`](file:///frontend/package.json) and [`frontend/package-lock.json`](file:///frontend/package-lock.json).
3. **Removed Stale Static Build Assets from Version Control**:
   - Untracked:
     - `money-coach-backend/src/main/resources/static/assets/index-BxDlXtFF.css`
     - `money-coach-backend/src/main/resources/static/assets/index-CnsKbCp-.js`
     - `money-coach-backend/src/main/resources/static/index.html`
     - `money-coach-backend/src/main/resources/static/_redirects`
   - Static files are now dynamically built from `frontend/` and bundled during packaging.
4. **Cleaned Duplicate `.gitignore` Rules**:
   - Cleaned root `.gitignore` to avoid duplicate rules (`node_modules/` listed twice) and updated ignore patterns for `money-coach-backend/target/` and `money-coach-backend/src/main/resources/static/`.

---

## 3. Directory Structure Flattening

The nested backend directory was flattened to match standard monorepo conventions:

```
BEFORE:
Mukuru-Saver-Imali/
├── frontend/
└── money-coach-backend/
    └── money-coach-backend/
        ├── pom.xml
        ├── Dockerfile (DUPLICATE)
        ├── docker-compose.yml
        └── src/

AFTER:
Mukuru-Saver-Imali/
├── Dockerfile                         # Unified root multi-stage Docker build
├── render.yaml                        # Render Blueprint configuration
├── package.json                       # Root script orchestrator
├── frontend/                          # React 18 SPA + Vite
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── src/
└── money-coach-backend/               # Spring Boot 3.4 REST API & Single-Port Host
    ├── pom.xml
    ├── docker-compose.yml             # Local PostgreSQL orchestration
    └── src/
        ├── main/java/com/moneycoach/
        └── test/java/com/moneycoach/
```

All 60+ Java source files, resources, tests, and configuration files were safely moved up using `git mv` to preserve commit history.

---

## 4. Active Goals Card Redesign & Dynamic Localization

### Layout & Design System Alignment
The Active Goals component ([`CurrentGoalCard.jsx`](file:///frontend/src/app/dashboard/CurrentGoalCard.jsx)) was re-architected to harmonize with the home dashboard layout:
- **Card Token Standard**: Wrapped in `<Card>` using standard Mukuru design tokens (`rounded-2xl`, border styling, subtle backdrop glassmorphism) matching `MoneySummaryCard`.
- **Exact Color Palette Preserved**:
  - **Needs / Essential Goals**: Emerald color theme (`#059669` / `#10b981`), `bg-emerald-500/10 text-emerald-400 border-emerald-500/20`, gradient bar `from-emerald-500 to-teal-400`.
  - **Wants / Personal Goals**: Amber color theme (`#d97706` / `#f59e0b`), `bg-amber-500/10 text-amber-400 border-amber-500/20`, gradient bar `from-amber-500 to-yellow-400`.
  - **All Goals Filter**: Dark slate theme (`bg-gray-800/80 text-gray-200 border-gray-700`).
  - **Target Badge**: Mukuru Orange (`bg-brand-orange text-white`).
- **Interactive Filtering**: Filter chips (`All`, `Needs`, `Wants`) allow immediate switching between active goals.

### Dynamic Multi-Language Localization
Added dictionary keys in `frontend/src/i18n/locales/` across English, isiZulu, and chiShona:
- **English (EN)**:
  - Title: "Active Goals"
  - Filters: "All", "Needs", "Wants"
  - Labels: "Target", "Required Categories", "Saved so far", "Keep it up!"
- **isiZulu (ZU)**:
  - Title: "Izinjongo Ezisebenzayo"
  - Filters: "Konke", "Izidingo", "Izifiso"
  - Labels: "Inhloso", "Izigaba ezifunekayo", "Sekugcinwe kuze kube manje", "Qhubeka njalo!"
- **chiShona (SN)**:
  - Title: "Zvinangwa Zviri Kushanda"
  - Filters: "Zvose", "Zvinodiwa Chaizvo", "Zvinoshuviwa"
  - Labels: "Chinangwa", "Zvikamu zvinodiwa", "Zvachengetwa kusvika iye zvino", "Ramba uchidaro!"

Language switching in the top bar instantly updates all Active Goals titles, badges, and progress copy without needing page reloads.

---

## 5. Admin Console & Role-Based Access Control (RBAC)

### Access Control Architecture
1. **User Role Separation**:
   - Supported roles: `customer` (default for all registered users and demo sessions) and `admin`.
   - Admin credentials:
     - **Email**: `admin@mukuru.com`
     - **Password**: ``
     - Role: `admin`
2. **Customer Access Denial (403 Forbidden Screen)**:
   - When a customer attempts to visit `/admin`, the route is intercepted by `AdminRoute` in [`routes.jsx`](file:///frontend/src/routes.jsx).
   - Instead of exposing administrative data or redirecting without explanation, the customer is shown a **403 Forbidden Access Restricted** screen:
     - Clear security notice: *"The Mukuru Operations & Admin Console is restricted strictly to authorized system administrators. Regular customers and users do not have access."*
     - Direct navigation button: *"Return to My Dashboard"*.
3. **Hidden Admin Navigation**:
   - In [`TopBar.jsx`](file:///frontend/src/shared/TopBar.jsx) and [`SideNav.jsx`](file:///frontend/src/shared/SideNav.jsx), the "Admin Console" link and badge are only rendered when `user?.role === 'admin'`. Regular customers see only customer-facing navigation.

### Admin Console Features ([`AdminConsolePage.jsx`](file:///frontend/src/features/admin/AdminConsolePage.jsx))
- **Operational KPIs**:
  - Registered Customers (14,280)
  - Active Budgets (9,840)
  - Remittance Volume (R 42.8M)
  - Backend System Health (99.98% uptime)
- **Customer Oversight Table**:
  - Search customer by name, email, or phone number.
  - Filter by customer tier (Silver, Gold, Platinum).
  - Displays customer savings rate, active goals count, and status badge.
- **Partner Grocery Deals Manager**:
  - Live interactive toggles to enable or disable community staple grocery discounts (e.g. Maize Meal 10kg, Cooking Oil 2L, Long Life Milk 6-pack).
- **Security & Audit Logs**:
  - Immutable audit trail tracking RBAC policy evaluations, admin logins, and system transactions.

---

## 6. Verification & Test Results

The following test suites and builds were verified:

1. **Frontend Core Unit Tests**:
   - Command: `npm --prefix frontend test`
   - Result: **PASS** (All 3 core unit tests for `MoneyText`, `CategoryTag`, and `i18n` passed).
2. **Frontend Production Build**:
   - Command: `npm run build`
   - Result: **SUCCESS** (Frontend compiled and synced into `money-coach-backend/src/main/resources/static`).
3. **Backend JUnit / Mockito Test Suite**:
   - Command: `mvn clean test` (inside `money-coach-backend`)
   - Result: **BUILD SUCCESS** (`Tests run: 22, Failures: 0, Errors: 0`).
4. **Backend Executable JAR Packaging**:
   - Command: `mvn package -DskipTests`
   - Result: **BUILD SUCCESS** (Spring Boot executable JAR created with embedded frontend).
5. **End-to-End Browser Subagent Verification**:
   - **Active Goals Layout**: Verified matching `<Card>` container, filter chips, and preserved color palettes.
   - **Language Switching**: Verified real-time updates across EN, ZU, and SN.
   - **Customer Access Denial**: Attempted navigation to `/admin` as customer -> verified 403 Forbidden Access Restricted screen displayed and admin links hidden.
   - **Admin Access**: Authenticated as `admin@mukuru.com` -> verified Admin Console unlocked with KPI metrics, customer oversight, deal toggles, and audit logs.
