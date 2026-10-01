# Mukuru Money Coach — SheHacks Challenge B

> **One-sentence pitch:** Money Coach helps people supporting family across households understand where their money goes, see how today's decisions affect tomorrow's goals, and get practical next steps in language they understand.

---

## 🚀 Frontend Role 4: App Shell & Dashboard

**Frontend Role 4** owns the project setup, mobile-first + desktop responsive frame layout, Mukuru brand design system, navigation bar, primary dashboard screen, multi-language i18n setup (**English**, **isiZulu**, **chiShona**), and shared UI component kit.

---

## 🛠️ Getting Started

### Prerequisites
- Node.js (v18+) & npm

### Installation & Execution
```bash
# Navigate to the frontend directory
cd frontend

# Install dependencies
npm install

# Start local development server
npm run dev

# Build production bundle
npm run build
```

---

## 📁 Role 4 File Structure Overview

```
frontend/
├── index.html               # Mobile-first viewport & font definitions
├── package.json             # Frontend dependencies & build scripts
├── vite.config.js           # Vite React plugin & REST API proxy configuration
├── .env / .env.example      # Environment variables (VITE_API_URL, VITE_USE_MOCKS)
└── src/
    ├── main.jsx             # React entry point
    ├── App.jsx              # Root app wrapper with providers
    ├── routes.jsx           # Shared route configuration with Role 5/6 placeholders
    ├── app/
    │   ├── layout/
    │   │   ├── AppShell.jsx       # Responsive frame container
    │   │   ├── TopBar.jsx         # Header with profile switcher, notifications & i18n
    │   │   └── BottomNav.jsx      # Mobile navigation bar
    │   ├── welcome/
    │   │   └── WelcomeScreen.jsx  # "Continue as Grace" opening screen with i18n picker
    │   └── dashboard/
    │       ├── DashboardPage.jsx  # Primary dashboard page
    │       ├── MoneySummaryCard.jsx # Income, Commitments & Safe-to-Save (R500)
    │       ├── CurrentGoalCard.jsx # Active goal (Frosty Fridge R1,200/R6,000)
    │       ├── CoachTipCard.jsx   # AI coach tip insight
    │       ├── NextStepCard.jsx   # Action card
    │       └── GroceryAlertCard.jsx # Tier 3 grocery price alert card
    ├── components/          # Shared UI Kit
    │   ├── Button.jsx
    │   ├── Card.jsx
    │   ├── ProgressBar.jsx
    │   ├── CategoryTag.jsx
    │   ├── MoneyText.jsx
    │   ├── LoadingState.jsx
    │   └── ErrorState.jsx
    ├── context/
    │   └── UserContext.jsx   # Logged-in user state & profile switcher
    ├── styles/
    │   ├── tokens.css        # Mukuru orange color tokens & variables
    │   └── global.css        # Responsive mobile + desktop CSS grid rules
    ├── i18n/
    │   ├── index.jsx / index.js # i18n setup & useLanguage hook
    │   └── locales/
    │       ├── en/           # English strings
    │       ├── zu/           # isiZulu strings
    │       └── sn/           # chiShona strings
    ├── api/
    │   ├── client.js         # Base REST API client with Accept-Language header
    │   └── dashboard.js      # /api/dashboard & /api/insights fetchers
    └── mocks/
        ├── dashboard.json    # Grace's figures (Income R8500, Safe-to-Save R500)
        └── insights.json     # Mock AI insights
```

---

## 💡 Key Role 4 Highlights for Demo

1. **Responsive Design:** Mobile-first layout on smartphones and a centered 2-column dashboard grid layout on desktop displays (≥768px).
2. **3-Language i18n:** Realtime instant language translation across the entire app for **English (EN)**, **isiZulu (ZU)**, and **chiShona (SN)**.
3. **Grace's Financial Model:** R8,500 monthly income, R6,300 commitments, R2,200 available remainder, and **R500 suggested Safe-to-Save** towards Frosty Fridge.
4. **Shared UI Kit:** 7 production components (`Button`, `Card`, `ProgressBar`, `CategoryTag`, `MoneyText`, `LoadingState`, `ErrorState`) ready for Roles 5 & 6.
