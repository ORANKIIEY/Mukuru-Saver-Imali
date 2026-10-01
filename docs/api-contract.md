# Mukuru Money Coach - Frontend API Contract & Shared Data Shapes

Documented by **Frontend Role 4 (App Shell & Dashboard)** for cross-role alignment between Role 4, Role 5, and Role 6.

---

## 1. Goal Data Shape (`goals.json`)

**Owner:** Role 5 (Money Screens)  
**Consumers:** Role 4 (Dashboard `CurrentGoalCard`), Role 6 (Simulator impact calculations)

```json
{
  "id": "frosty-fridge",
  "title": "Frosty Fridge",
  "name": "Frosty",
  "targetAmount": 6000,
  "currentSaved": 1200,
  "percentage": 20,
  "remainingAmount": 4800,
  "targetDate": "2026-12-15",
  "status": "in_progress"
}
```

### Goal Status Enum:
- `"in_progress"`: Active goal being saved towards.
- `"completed"` / `"complete"`: Goal target reached. Trigger for Role 5's **Celebration Screen**.

---

## 2. Shared Route Contracts (`src/routes.jsx`)

**Created & Owned by:** Role 4

### Role 4 Routes (App Shell & Dashboard)
- `/`: Welcome Screen (*"Continue as Grace"*)
- `/dashboard`: Main Dashboard Screen
- `/more`: Settings, Language Switcher (EN / ZU / SN) & Mock Mode Toggle

### Role 5 Routes (Money Screens & Goal Creator)
- `/transactions`: Searchable transaction history
- `/commitments`: My Commitments (*"Who depends on your money?"*)
- `/goals`: Goals list & progress
- `/celebration`: Goal complete celebration screen (Linked by Role 4's dashboard when `status === "completed"`)

### Role 6 Routes (Coach, What-If UI & Tier 3)
- `/simulator`: What-if simulators (*"Send R500 home"*, *"Save R100/week"*)
- `/coach`: AI Money Coach Chat screen
- `/groceries`: Grocery Watch Tier 3 alerts (Linked by Role 4's `GroceryAlertCard`)

---

## 3. Dashboard API Endpoints (`/api/dashboard` & `/api/insights`)

**Base Client:** `src/api/client.js` (Role 4 owned, automatically attaches `Accept-Language: en|zu|sn` header)

### `GET /api/dashboard` Response Structure:
```json
{
  "user": {
    "name": "Grace",
    "accountNumber": "MK-789210",
    "tier": "Tier 2 Saver"
  },
  "summary": {
    "income": 8500,
    "commitments": 6300,
    "available": 2200,
    "suggestedSaving": 500,
    "flexibleSavingMax": 1700
  },
  "currentGoal": {
    "id": "frosty-fridge",
    "title": "Frosty Fridge",
    "name": "Frosty",
    "targetAmount": 6000,
    "currentSaved": 1200,
    "percentage": 20,
    "remainingAmount": 4800,
    "targetDate": "2026-12-15",
    "status": "in_progress"
  },
  "coachTip": {
    "id": "tip-101",
    "title": "Grocery Fee Savings",
    "content": "You saved R150 on grocery fees this week! Put R100 towards your Frosty Fridge goal to stay on track.",
    "actionText": "Transfer R100 Now",
    "actionRoute": "/coach"
  },
  "nextStep": {
    "id": "step-201",
    "title": "Lock in R500 for Safe-to-Save",
    "description": "R500 looks comfortable for Frosty this month. Lock it in today to reach your target on schedule.",
    "actionText": "Lock In R500",
    "actionRoute": "/goals"
  },
  "groceryAlert": {
    "id": "alert-301",
    "active": true,
    "store": "Shoprite",
    "item": "Super Maize Meal 10kg",
    "discount": "12% OFF",
    "description": "Mealie Meal is R25 cheaper at Shoprite this week!",
    "actionRoute": "/groceries"
  }
}
```
