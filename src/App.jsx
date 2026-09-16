import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { mockApi } from './services/mockApi';
import { Header } from './components/Header';
import { SummaryCards } from './components/SummaryCards';
import { AnalyticsCharts } from './components/AnalyticsCharts';
import { BudgetManager } from './components/BudgetManager';
import { TransactionList } from './components/TransactionList';
import { ExpenseForm } from './components/ExpenseForm';
import confetti from 'canvas-confetti';
import { CheckCircle2, AlertTriangle } from 'lucide-react';

export default function App() {
  // ==========================================
  // 1. useState - Core Application State
  // ==========================================
  const [transactions, setTransactions] = useState([]);
  const [budgets, setBudgets] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);

  // Global Month Filter state ('all', '01' to '12')
  const [selectedMonthFilter, setSelectedMonthFilter] = useState('all');

  // Table Filter & Search states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [sortBy, setSortBy] = useState('date-desc');

  // Modal & Form state
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTx, setEditingTx] = useState(null);

  // Toast feedback state
  const [toast, setToast] = useState(null);

  // ==========================================
  // 2. useRef - Focus & Ref Management
  // ==========================================
  const searchInputRef = useRef(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 2500);
  };

  // ==========================================
  // 3. useEffect - Initial Async Data Fetching
  // ==========================================
  useEffect(() => {
    let isMounted = true;

    async function loadInitialData() {
      setIsLoading(true);
      try {
        const [txData, budgetData] = await Promise.all([
          mockApi.getTransactions(),
          mockApi.getBudgets()
        ]);
        if (isMounted) {
          setTransactions(txData);
          setBudgets(budgetData);
        }
      } catch (err) {
        if (isMounted) {
          showToast('Failed to load transaction data from API', 'error');
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadInitialData();

    return () => {
      isMounted = false;
    };
  }, []);

  // ==========================================
  // 4. useMemo - Global Month Filtered Dataset
  // ==========================================
  
  // Transactions filtered by the selected global Month
  const monthFilteredTransactions = useMemo(() => {
    if (selectedMonthFilter === 'all') return transactions;
    return transactions.filter(tx => {
      if (!tx.date || !tx.date.includes('-')) return false;
      const monthNum = tx.date.split('-')[1]; // e.g. '09' from '2026-09-16'
      return monthNum === selectedMonthFilter;
    });
  }, [transactions, selectedMonthFilter]);

  // Total Income (Month Specific)
  const totalIncome = useMemo(() => {
    return monthFilteredTransactions
      .filter(tx => tx.type === 'income')
      .reduce((sum, tx) => sum + (parseFloat(tx.amount) || 0), 0);
  }, [monthFilteredTransactions]);

  // Total Expense (Month Specific)
  const totalExpense = useMemo(() => {
    return monthFilteredTransactions
      .filter(tx => tx.type === 'expense')
      .reduce((sum, tx) => sum + (parseFloat(tx.amount) || 0), 0);
  }, [monthFilteredTransactions]);

  // Net Balance (Month Specific)
  const netBalance = useMemo(() => {
    return totalIncome - totalExpense;
  }, [totalIncome, totalExpense]);

  // Savings Rate Percentage (Month Specific)
  const savingsRate = useMemo(() => {
    if (totalIncome === 0) return 0;
    return Math.round(((totalIncome - totalExpense) / totalIncome) * 100);
  }, [totalIncome, totalExpense]);

  // Category Expenses Breakdown (Month Specific)
  const categoryExpenses = useMemo(() => {
    const map = {};
    monthFilteredTransactions.forEach(tx => {
      if (tx.type === 'expense') {
        map[tx.category] = (map[tx.category] || 0) + parseFloat(tx.amount);
      }
    });
    return map;
  }, [monthFilteredTransactions]);

  // Category Breakdown Array for Donut Chart (Month Specific)
  const categoryBreakdown = useMemo(() => {
    return Object.entries(categoryExpenses)
      .map(([name, amount]) => ({ name, amount }))
      .sort((a, b) => b.amount - a.amount);
  }, [categoryExpenses]);

  // Total Budget Cap & Total Budget Expense (Month Specific)
  const totalBudget = useMemo(() => {
    return Object.values(budgets).reduce((sum, val) => sum + (parseFloat(val) || 0), 0);
  }, [budgets]);

  const totalBudgetExpense = useMemo(() => {
    return Object.keys(budgets).reduce((sum, cat) => sum + (categoryExpenses[cat] || 0), 0);
  }, [budgets, categoryExpenses]);

  // Monthly Cashflow Trend (All time trend data for bar chart)
  const monthlyTrend = useMemo(() => {
    const monthsMap = {};
    transactions.forEach(tx => {
      const monthKey = tx.date ? tx.date.substring(0, 7) : 'Unknown';
      if (!monthsMap[monthKey]) {
        monthsMap[monthKey] = { income: 0, expense: 0 };
      }
      if (tx.type === 'income') {
        monthsMap[monthKey].income += parseFloat(tx.amount);
      } else {
        monthsMap[monthKey].expense += parseFloat(tx.amount);
      }
    });

    return Object.entries(monthsMap)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([month, data]) => ({ month, ...data }));
  }, [transactions]);

  // Filtered & Sorted Transactions List (Month + Search + Category + Type + Sort)
  const filteredTransactions = useMemo(() => {
    return monthFilteredTransactions
      .filter(tx => {
        const matchesSearch = searchQuery === '' || 
          tx.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (tx.notes && tx.notes.toLowerCase().includes(searchQuery.toLowerCase()));

        const matchesCategory = selectedCategory === 'all' || tx.category === selectedCategory;

        const matchesType = selectedType === 'all' || tx.type === selectedType;

        return matchesSearch && matchesCategory && matchesType;
      })
      .sort((a, b) => {
        if (sortBy === 'date-desc') return new Date(b.date) - new Date(a.date);
        if (sortBy === 'date-asc') return new Date(a.date) - new Date(b.date);
        if (sortBy === 'amount-desc') return b.amount - a.amount;
        if (sortBy === 'amount-asc') return a.amount - b.amount;
        return 0;
      });
  }, [monthFilteredTransactions, searchQuery, selectedCategory, selectedType, sortBy]);

  // ==========================================
  // 5. useCallback - Action Handlers
  // ==========================================

  const handleOpenAddModal = useCallback(() => {
    setEditingTx(null);
    setIsFormOpen(true);
  }, []);

  const handleCloseFormModal = useCallback(() => {
    setIsFormOpen(false);
    setEditingTx(null);
  }, []);

  const handleAddOrUpdateTransaction = useCallback(async (formData) => {
    setIsSyncing(true);
    try {
      if (editingTx) {
        const updated = await mockApi.updateTransaction(editingTx.id, formData);
        setTransactions(prev => prev.map(tx => tx.id === editingTx.id ? updated : tx));
        showToast('Transaction updated');
      } else {
        const created = await mockApi.addTransaction(formData);
        setTransactions(prev => [created, ...prev]);
        showToast('Transaction added');

        if (created.type === 'income' && created.amount >= 1000) {
          confetti({ particleCount: 60, spread: 50, origin: { y: 0.7 } });
        }
      }
    } catch (err) {
      showToast('Error saving transaction', 'error');
    } finally {
      setIsSyncing(false);
    }
  }, [editingTx]);

  const handleEditTransaction = useCallback((tx) => {
    setEditingTx(tx);
    setIsFormOpen(true);
  }, []);

  const handleDeleteTransaction = useCallback(async (id) => {
    setIsSyncing(true);
    try {
      await mockApi.deleteTransaction(id);
      setTransactions(prev => prev.filter(tx => tx.id !== id));
      showToast('Transaction deleted');
    } catch (err) {
      showToast('Failed to delete transaction', 'error');
    } finally {
      setIsSyncing(false);
    }
  }, []);

  const handleResetData = useCallback(async () => {
    setIsSyncing(true);
    try {
      const { transactions: seedTx, budgets: seedBudgets } = await mockApi.resetToSeedData();
      setTransactions(seedTx);
      setBudgets(seedBudgets);
      setSelectedMonthFilter('all');
      setSearchQuery('');
      setSelectedCategory('all');
      setSelectedType('all');
      showToast('Data reset to default');
    } catch (err) {
      showToast('Error resetting data', 'error');
    } finally {
      setIsSyncing(false);
    }
  }, []);

  const handleFocusSearchInput = useCallback(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, []);

  const handleSaveBudgets = useCallback(async (newBudgets) => {
    setBudgets(newBudgets);
    await mockApi.saveBudgets(newBudgets);
    showToast('Budget limits saved');
  }, []);

  const handleResetFilters = useCallback(() => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedType('all');
    setSortBy('date-desc');
  }, []);

  return (
    <div className="app-container">
      {/* Header with Global Month Filter */}
      <Header
        onOpenAddModal={handleOpenAddModal}
        onFocusSearch={handleFocusSearchInput}
        onResetData={handleResetData}
        isSyncing={isSyncing}
        selectedMonthFilter={selectedMonthFilter}
        onMonthFilterChange={setSelectedMonthFilter}
      />

      {/* KPI Financial Summary Cards (Month Filtered) */}
      <SummaryCards
        totalIncome={totalIncome}
        totalExpense={totalExpense}
        netBalance={netBalance}
        savingsRate={savingsRate}
        totalBudget={totalBudget}
        totalBudgetExpense={totalBudgetExpense}
      />

      {/* Analytics Charts (Month Filtered) */}
      <AnalyticsCharts
        categoryBreakdown={categoryBreakdown}
        totalExpense={totalExpense}
        monthlyTrend={monthlyTrend}
        selectedMonthFilter={selectedMonthFilter}
        onMonthFilterChange={setSelectedMonthFilter}
      />

      {/* Category Budget Manager (Month Filtered) */}
      <BudgetManager
        budgets={budgets}
        categoryExpenses={categoryExpenses}
        onSaveBudgets={handleSaveBudgets}
      />

      {/* Transactions History Table (Month Filtered) */}
      <TransactionList
        transactions={filteredTransactions}
        searchInputRef={searchInputRef}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        selectedType={selectedType}
        onTypeChange={setSelectedType}
        sortBy={sortBy}
        onSortChange={setSortBy}
        onResetFilters={handleResetFilters}
        onEdit={handleEditTransaction}
        onDelete={handleDeleteTransaction}
        isLoading={isLoading}
      />

      {/* Expense Form Modal */}
      <ExpenseForm
        isOpen={isFormOpen}
        onClose={handleCloseFormModal}
        onSubmit={handleAddOrUpdateTransaction}
        initialData={editingTx}
      />

      {/* Toast Notifications */}
      {toast && (
        <div style={{
          position: 'fixed',
          bottom: '1.5rem',
          right: '1.5rem',
          background: toast.type === 'error' ? '#FEF2F2' : '#ECFDF5',
          color: toast.type === 'error' ? '#DC2626' : '#059669',
          border: `1px solid ${toast.type === 'error' ? '#FCA5A5' : '#6EE7B7'}`,
          padding: '0.65rem 1rem',
          borderRadius: 'var(--radius-md)',
          boxShadow: 'var(--shadow-lg)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          fontSize: '0.85rem',
          fontWeight: '600',
          zIndex: 1000
        }}>
          {toast.type === 'error' ? <AlertTriangle size={16} /> : <CheckCircle2 size={16} />}
          {toast.message}
        </div>
      )}
    </div>
  );
}
