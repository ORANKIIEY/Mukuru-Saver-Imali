# Mukuru Money Coach — SheHacks Challenge B

> **Empowering emerging African consumers to track spending, protect family remittances, reach financial goals, and build lasting wealth with AI coaching.**

---

## Executive Summary

Millions of emerging consumers across Africa rely on **Mukuru** for international money transfers, bill payments, and financial services. Often managing limited incomes, supporting multiple households, and using inexpensive mobile phones with unreliable internet, these consumers need financial tools that are simple, accessible, and culturally relevant.

**Mukuru Money Coach** is a mobile-first, multi-lingual financial platform built for **SheHacks Challenge B**. It features transaction categorisation, safe-to-save guidance, goal tracking, an AI Money Coach, gamified goal sprint boosters, an automated auto-saver engine, a referral rewards program with social sharing, and full localization in **English (EN)**, **isiZulu (ZU)**, and **chiShona (SN)**.

---

## Key Features

### 1. Secure Multi-Region Auth & Protected Routes
- **Multi-Country Support**: Sign Up and Sign In with automatic dial codes for **South Africa (+27)**, **Zimbabwe (+263)**, **Malawi (+265)**, **Mozambique (+258)**, **Zambia (+260)**, **Botswana (+267)**, **Kenya (+254)**, and more.
- **Session Persistence**: Account credentials securely stored in `localStorage`.
- **Protected Routes (`ProtectedRoute`)**: Unauthenticated users are automatically redirected to the Welcome screen (`/`) upon sign-out or when attempting to access private dashboard pages.

### 2. Dynamic Dashboard & Safe-to-Save Buffer
- **Personalized Experience**: Greets signed-in users by name (*"Good morning, Oratile"*) with their custom financial summary.
- **Family Commitment Protection**: Automatically categorizes family support remittances as legitimate commitments before calculating the **Safe-to-Save Buffer** (e.g. R500 suggested out of R2,200 available).

### 3. Referral Program & Social Share Hub
- **Dynamic Referral Links**: Generates unique, auto-refreshing referral links (`https://mukuru-moneycoach.app/invite?code=MUKURU-USER-2026`).
- **One-Click Social Sharing**: Direct sharing to **WhatsApp**, **SMS Text**, **Facebook**, **X (Twitter)**, **Telegram**, and **Email**.
- **R50 Savings Reward**: Automatic R50 welcome bonus credited when registering with a referral code.

### 4. Gamified Goal Sprint & Smart Auto-Saver Engine
- **Goal Milestone Alerts**: Visual alerts when goals reach >60% progress.
- **Interactive Quick Boosters**: Earn XP and save towards goals with one-click habits (*+R15 Round-Up*, *+R35 Skip Takeout*, *+R50 Friday Lock*).
- **Confetti Particle Celebrations**: Visual particle animations upon achieving milestones.
- **Automated Rules Engine**:
  - *Friday Auto-Lock*: Automatically locks R20 into goals every Friday.
  - *Grocery Round-Up*: Rounds up grocery purchases to the nearest R10.
  - *Sprint Threshold Boost*: Deposits R50 when any goal reaches 80% completion.

### 5. AI Money Coach & What-If Simulator
- **Interactive AI Chat**: Conversational money guidance tailored to emerging consumers.
- **What-If Scenario Simulator**: Simulates financial outcomes (e.g. *What if I cut takeaway spending by R150/month?*).

### 6. Grocery Price Watch & WhatsApp Simulator
- **Grocery Price Alerts**: Real-time alerts for local staple discounts (e.g. Mealie Meal 12% off at Shoprite).
- **WhatsApp Interface**: Simulated chat interface mimicking Mukuru's WhatsApp channel.

### 7. 3-Language Localization (i18n)
- Instant, real-time language switching across **English (EN)**, **isiZulu (ZU)**, and **chiShona (SN)** with full template interpolation support.

---

## Technology Stack

| Layer | Technologies Used |
| :--- | :--- |
| **Frontend Framework** | React 18, Vite |
| **Routing** | React Router DOM v6 (with `ProtectedRoute` route guards) |
| **Styling & System** | Vanilla CSS (CSS Modules & Custom Brand Tokens), Mobile-First Flexbox/Grid |
| **Icons & Media** | Lucide React Vector Icons |
| **Internationalization** | i18next (EN, ZU, SN) |
| **Backend Service** | Java 21, Spring Boot, Maven |
| **Containerization** | Docker, Docker Compose |
| **API Integration** | REST API client with auto-switchable Live/Mock modes |

---

## Repository Directory Structure

```
Mukuru-Saver-Imali/
├── frontend/                          # React + Vite Frontend Application
│   ├── index.html                     # Entry HTML template with mobile viewport
│   ├── package.json                   # Dependencies and scripts
│   ├── vite.config.js                 # Vite build configuration & API proxy
│   └── src/
│       ├── main.jsx                   # React root entry point
│       ├── App.jsx                    # Top-level app wrapper
│       ├── routes.jsx                 # Route definitions & ProtectedRoute wrapper
│       ├── app/
│       │   ├── auth/                  # AuthModal with multi-country dial codes & registration
│       │   ├── layout/                # AppShell, TopBar, and BottomNav (Home, Goals, Coach, Referral, More)
│       │   ├── welcome/               # Landing screen with Sign In / Sign Up / Demo mode
│       │   └── dashboard/             # Personalized Dashboard, MoneySummaryCard, ReferralCard
│       ├── components/                # Reusable UI Kit (Button, Card, ProgressBar, MoneyText, etc.)
│       ├── context/                   # UserContext (Session storage, Sign In, Sign Up, Referral handling)
│       ├── features/
│       │   ├── money/                 # Transactions, Commitments, Goals, GoalSprintMinigame
│       │   ├── coach/                 # AI Coach Chat & What-If Simulator
│       │   ├── referral/              # Dedicated Referral Page & Social Share Hub
│       │   └── tier3/                 # Grocery Price Watch & WhatsApp Mock Screen
│       ├── styles/                    # tokens.css (Mukuru orange design tokens & global CSS)
│       ├── i18n/                      # Localization engine & translation JSON files (EN, ZU, SN)
│       └── tests/                     # Frontend unit test suite (role4.test.js)
└── money-coach-backend/               # Spring Boot Backend Service
    └── money-coach-backend/
        ├── pom.xml                    # Maven project configuration (Java 21)
        ├── docker-compose.yml         # Container orchestration
        └── src/
            ├── main/java/com/moneycoach/  # 55 Java classes (SafeToSaveService, GoalService, etc.)
            └── test/java/com/moneycoach/  # 22 JUnit & Mockito backend unit tests
```

---

## Installation & Setup Guide

### Prerequisites
- **Node.js**: v18.0 or higher
- **npm**: v9.0 or higher
- **Java JDK**: v21 (for backend)
- **Maven**: v3.8+ (for backend)

---

### 1. Frontend Setup

```bash
# Navigate to the frontend directory
cd frontend

# Install dependencies
npm install

# Start the local development server (runs on http://localhost:3000)
npm run dev
```

#### Build Production Bundle & Run Frontend Tests:
```bash
# Build production bundle
npm run build

# Run frontend core unit test suite
node src/tests/role4.test.js
```

---

### 2. Backend Setup (Spring Boot)

```bash
# Navigate to the backend directory
cd money-coach-backend/money-coach-backend

# Run Maven test suite (22 unit tests)
mvn clean test

# Start Spring Boot application (runs on http://localhost:5000)
mvn spring-boot:run
```

---

### 3. Docker Deployment (Optional)

```bash
# Run backend and database services via Docker Compose
cd money-coach-backend/money-coach-backend
docker-compose up --build
```

---

## Testing & Verification

### Frontend Unit Tests
Execute the automated test script to verify core UI helpers (`MoneyText`, `CategoryTag` fallback, and `i18n` fallback):
```bash
cd frontend
node src/tests/role4.test.js
```
*Expected Result*: `[PASS] All 3 Frontend Core unit tests passed successfully!`

### Backend Unit Tests
Run the Maven JUnit test suite covering `GoalService`, `MilestoneService`, `MoneyEngineService`, `NudgeService`, `SafeToSaveService`, and `SimulatorService`:
```bash
cd money-coach-backend/money-coach-backend
mvn test
```
*Expected Result*: `Tests run: 22, Failures: 0, Errors: 0` (**BUILD SUCCESS**)

---

## Security & Data Privacy

- **Protected Routes**: Private financial screens (`/dashboard`, `/goals`, `/transactions`, `/commitments`, `/coach`, `/referral`) require a valid signed-in user session.
- **Local Storage Sanitization**: Sensitive authentication keys are managed locally and automatically cleared upon user sign-out.
- **Role-Neutral & Professional**: Contains zero hardcoded placeholders or internal references.

---

## License & Acknowledgments

Built for **Mukuru SheHacks – Challenge B: Money Coach**.  
*Empowering emerging African consumers to achieve financial freedom.*
