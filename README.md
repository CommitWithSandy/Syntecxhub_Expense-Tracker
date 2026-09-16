# 💰 Syntecxhub Expense Tracker

An interactive, responsive, modern financial management web application built with **React**, **Vite**, and **JavaScript**. The Expense Tracker empowers users to track income and expenses, monitor category-wise budgets, visualize monthly cashflows, and analyze savings rates in real time.

<div align="center">

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![npm](https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white)

</div>

---

## 📸 Screenshots

| Dashboard Overview | Add New Transaction Modal |
| :---: | :---: |
| ![Dashboard Overview](docs/screenshots/dashboard.png) | ![Add New Transaction](docs/screenshots/add-transaction.png) |

| Transaction History & Filters | Edit Transaction Modal |
| :---: | :---: |
| ![Transaction History](docs/screenshots/transaction-history.png) | ![Edit Transaction](docs/screenshots/edit-transaction.png) |

---

## ✨ Key Features

- **📊 KPI Financial Summary Cards**: Instant insights into Net Balance, Total Income, Total Expenses, Savings Rate %, and overall Budget Cap progress.
- **📅 Global Month Filter**: Filter all dashboard analytics, summary cards, and transaction records by specific month or view all-time records.
- **📈 Analytics & Charts**:
  - **Expense Breakdown**: Visual category distribution of expenses.
  - **Monthly Comparison**: Bar chart illustrating income vs. expense trends over time.
- **🎯 Category Budget Manager**: Set and update maximum budget caps per category with percentage tracking.
- **🔍 Advanced Transaction History**:
  - Search transactions by title or notes.
  - Filter by Category (Housing, Food & Dining, Transportation, Utilities, etc.) and Type (Income / Expense).
  - Sort by Date (Newest/Oldest) or Amount (Highest/Lowest).
  - Paginated transaction list.
- **⚡ Modal Form with Quick Presets**: Easily add transactions or edit existing records. Includes quick presets (e.g. Morning Coffee, Grocery Shopping, Freelance Work).
- **🎉 Income Celebration**: Triggers confetti micro-animations upon logging significant income transactions.
- **💾 Asynchronous Data Sync**: Mock API backend integration with smooth loading states and toast notifications.

---

## 🛠️ Built With

| Technology | Logo / Badge | Description |
| :--- | :---: | :--- |
| **React 18** | <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg" width="30"/> | Component-based UI library |
| **Vite** | <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/vitejs/vitejs-original.svg" width="30"/> | Next-generation frontend build tool & HMR |
| **JavaScript (ES6+)** | <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" width="30"/> | Dynamic client-side logic & state handling |
| **HTML5** | <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original.svg" width="30"/> | Semantic web document structure |
| **CSS3** | <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original.svg" width="30"/> | Vanilla CSS variables & dark mode design system |
| **Lucide React** | <img src="https://lucide.dev/logo.svg" width="30"/> | Clean & modern SVG icons |
| **Canvas Confetti** | 🎊 | Micro-animation visual feedback |

---

## 💻 Installation & Setup Guide

Follow these step-by-step instructions to get a local copy up and running.

### 📋 Prerequisites

Make sure you have **Node.js** (v16.0 or higher) and **npm** installed on your machine.

- Verify Node.js installation:
  ```bash
  node -v
  ```
- Verify npm installation:
  ```bash
  npm -v
  ```

---

### 📥 Step-by-Step Installation

#### 1. Clone the Repository
Open your terminal and clone the repository using Git:
```bash
git clone https://github.com/CommitWithSandy/Syntecxhub_Expense-Tracker.git
```

#### 2. Navigate to the Project Directory
```bash
cd Syntecxhub_Expense-Tracker
```

#### 3. Install Dependencies
Run npm to install all required packages (`react`, `vite`, `lucide-react`, `canvas-confetti`):
```bash
npm install
```

#### 4. Run the Development Server
Launch the local Vite server with Hot Module Replacement (HMR):
```bash
npm run dev
```

#### 5. Open in Browser
Click on the local URL shown in your terminal (usually `http://localhost:5173`) to view the application live.

---

### 📦 Production Build & Preview

To generate a production-ready build:
```bash
npm run build
```

To preview the built app locally:
```bash
npm run preview
```

---

## 📁 Project Structure

```text
Syntecxhub_Expense Tracker/
├── public/
│   ├── favicon.svg
│   └── icons.svg
├── docs/
│   └── screenshots/          # Screenshot preview assets
├── src/
│   ├── assets/               # Static assets & graphics
│   ├── components/
│   │   ├── AnalyticsCharts.jsx   # Expense breakdown & monthly trend charts
│   │   ├── BudgetManager.jsx     # Category budget limit controls
│   │   ├── ExpenseForm.jsx       # Add/Edit modal dialog with presets
│   │   ├── Header.jsx            # Top bar with global month filter & actions
│   │   ├── SummaryCards.jsx      # Financial KPI summary cards
│   │   └── TransactionList.jsx   # Data table with search, filters, pagination
│   ├── services/
│   │   └── mockApi.js            # Mock async API backend service
│   ├── App.css                   # Custom UI styles & layout rules
│   ├── App.jsx                   # Central state management & root layout
│   ├── index.css                 # Global CSS tokens & dark theme rules
│   └── main.jsx                  # React DOM root entry point
├── index.html
├── package.json
└── vite.config.js
```

---

## 📜 License

Distributed under the MIT License. See `LICENSE` for more information.
