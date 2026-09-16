# 💰 Syntecxhub Expense Tracker

An interactive, responsive, modern financial management web application built with **React** and **Vite**. The Expense Tracker empowers users to track income and expenses, monitor category-wise budgets, visualize monthly cashflows, and analyze savings rates in real time.

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

## 🛠️ Tech Stack

- **Frontend Framework**: [React 18](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Animations**: [Canvas Confetti](https://www.npmjs.com/package/canvas-confetti)
- **Styling**: Modern Vanilla CSS with dark theme variables & glassmorphism elements

---

## 📁 Project Structure

```text
Syntecxhub_Expense Tracker/
├── public/
│   ├── favicon.svg
│   └── icons.svg
├── docs/
│   └── screenshots/          # Application screenshot assets
├── src/
│   ├── assets/               # SVGs and images
│   ├── components/
│   │   ├── AnalyticsCharts.jsx   # Charts and breakdown visualization
│   │   ├── BudgetManager.jsx     # Category budget limit controls
│   │   ├── ExpenseForm.jsx       # Add/Edit modal dialog with presets
│   │   ├── Header.jsx            # Top navbar with global month filter & actions
│   │   ├── SummaryCards.jsx      # KPI summary metrics cards
│   │   └── TransactionList.jsx   # Data table with search, filters, pagination
│   ├── services/
│   │   └── mockApi.js            # Mock async API & seed dataset
│   ├── App.css                   # Custom styles & animations
│   ├── App.jsx                   # Core state management & layout
│   ├── index.css                 # Global CSS variables & design tokens
│   └── main.jsx                  # React application root
├── index.html
├── package.json
└── vite.config.js
```

---

## 🚀 Getting Started

### Prerequisites
Make sure you have **Node.js** (v16+ recommended) installed on your system.

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/CommitWithSandy/Syntecxhub_Expense-Tracker.git
   ```

2. **Navigate into the project directory**:
   ```bash
   cd Syntecxhub_Expense-Tracker
   ```

3. **Install dependencies**:
   ```bash
   npm install
   ```

4. **Start the development server**:
   ```bash
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:5173`.

---

## 📜 License

Distributed under the MIT License. See `LICENSE` for more information.
