// Mock API Service for Expense Tracker Project
// Clean zero initial state

const STORAGE_KEY = 'syntecxhub_expenses_v3';
const BUDGET_STORAGE_KEY = 'syntecxhub_budgets_v3';

const INITIAL_TRANSACTIONS = [];

const DEFAULT_BUDGETS = {
  'Housing': 0,
  'Food & Dining': 0,
  'Utilities': 0,
  'Shopping': 0,
  'Healthcare': 0,
  'Transportation': 0,
  'Entertainment': 0
};

const delay = (ms = 200) => new Promise(resolve => setTimeout(resolve, ms));

export const mockApi = {
  async getTransactions() {
    await delay(200);
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_TRANSACTIONS));
      return INITIAL_TRANSACTIONS;
    }
    try {
      return JSON.parse(stored);
    } catch {
      return INITIAL_TRANSACTIONS;
    }
  },

  async addTransaction(newTx) {
    await delay(200);
    const current = await this.getTransactions();
    const createdItem = {
      ...newTx,
      id: 'tx-' + Date.now(),
      amount: parseFloat(newTx.amount) || 0
    };
    const updated = [createdItem, ...current];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return createdItem;
  },

  async updateTransaction(id, updatedTx) {
    await delay(200);
    const current = await this.getTransactions();
    const index = current.findIndex(tx => tx.id === id);
    if (index === -1) throw new Error('Transaction not found');
    
    const item = {
      ...current[index],
      ...updatedTx,
      amount: parseFloat(updatedTx.amount) || 0
    };
    current[index] = item;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
    return item;
  },

  async deleteTransaction(id) {
    await delay(150);
    const current = await this.getTransactions();
    const filtered = current.filter(tx => tx.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    return id;
  },

  async resetToSeedData() {
    await delay(200);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_TRANSACTIONS));
    localStorage.setItem(BUDGET_STORAGE_KEY, JSON.stringify(DEFAULT_BUDGETS));
    return { transactions: INITIAL_TRANSACTIONS, budgets: DEFAULT_BUDGETS };
  },

  async getBudgets() {
    await delay(150);
    const stored = localStorage.getItem(BUDGET_STORAGE_KEY);
    if (!stored) {
      localStorage.setItem(BUDGET_STORAGE_KEY, JSON.stringify(DEFAULT_BUDGETS));
      return DEFAULT_BUDGETS;
    }
    try {
      return JSON.parse(stored);
    } catch {
      return DEFAULT_BUDGETS;
    }
  },

  async saveBudgets(budgets) {
    await delay(150);
    localStorage.setItem(BUDGET_STORAGE_KEY, JSON.stringify(budgets));
    return budgets;
  }
};
