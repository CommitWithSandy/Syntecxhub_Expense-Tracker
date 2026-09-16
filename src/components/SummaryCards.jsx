import React from 'react';
import { IndianRupee, ArrowUpRight, ArrowDownRight, Target } from 'lucide-react';

export const SummaryCards = React.memo(({ totalIncome, totalExpense, netBalance, savingsRate, totalBudget, totalBudgetExpense }) => {
  const formatCurrency = (val) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val);
  };

  const budgetPercent = totalBudget > 0 ? Math.min(100, Math.round((totalBudgetExpense / totalBudget) * 100)) : 0;

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))',
      gap: '1rem',
      marginBottom: '1.75rem'
    }}>
      {/* Net Balance Card */}
      <div className="clean-card" style={{ padding: '1.25rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
          <span style={{ fontSize: '0.82rem', fontWeight: '600', color: 'var(--text-muted)' }}>Net Balance</span>
          <div style={{ width: '32px', height: '32px', borderRadius: 'var(--radius-sm)', background: 'var(--primary-light)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <IndianRupee size={18} />
          </div>
        </div>
        <div style={{ fontSize: '1.6rem', fontWeight: '700', color: netBalance >= 0 ? 'var(--text-main)' : 'var(--expense)' }}>
          {formatCurrency(netBalance)}
        </div>
        <div style={{ marginTop: '0.4rem', fontSize: '0.78rem', color: 'var(--text-subtle)' }}>
          Total calculated balance
        </div>
      </div>

      {/* Total Income Card */}
      <div className="clean-card" style={{ padding: '1.25rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
          <span style={{ fontSize: '0.82rem', fontWeight: '600', color: 'var(--text-muted)' }}>Total Income</span>
          <div style={{ width: '32px', height: '32px', borderRadius: 'var(--radius-sm)', background: 'var(--income-light)', color: 'var(--income)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ArrowUpRight size={18} />
          </div>
        </div>
        <div style={{ fontSize: '1.6rem', fontWeight: '700', color: 'var(--income)' }}>
          {formatCurrency(totalIncome)}
        </div>
        <div style={{ marginTop: '0.4rem', fontSize: '0.78rem', color: 'var(--text-subtle)' }}>
          Incoming funds
        </div>
      </div>

      {/* Total Expenses Card */}
      <div className="clean-card" style={{ padding: '1.25rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
          <span style={{ fontSize: '0.82rem', fontWeight: '600', color: 'var(--text-muted)' }}>Total Expenses</span>
          <div style={{ width: '32px', height: '32px', borderRadius: 'var(--radius-sm)', background: 'var(--expense-light)', color: 'var(--expense)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ArrowDownRight size={18} />
          </div>
        </div>
        <div style={{ fontSize: '1.6rem', fontWeight: '700', color: 'var(--expense)' }}>
          {formatCurrency(totalExpense)}
        </div>
        <div style={{ marginTop: '0.4rem', fontSize: '0.78rem', color: 'var(--text-subtle)' }}>
          Savings Rate: <strong>{savingsRate}%</strong>
        </div>
      </div>

      {/* Budget Meter Card */}
      <div className="clean-card" style={{ padding: '1.25rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
          <span style={{ fontSize: '0.82rem', fontWeight: '600', color: 'var(--text-muted)' }}>Budget Spent</span>
          <div style={{ width: '32px', height: '32px', borderRadius: 'var(--radius-sm)', background: '#F1F5F9', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Target size={18} />
          </div>
        </div>
        <div style={{ fontSize: '1.6rem', fontWeight: '700', color: budgetPercent > 90 ? 'var(--expense)' : 'var(--text-main)' }}>
          {budgetPercent}%
        </div>
        <div style={{ marginTop: '0.4rem' }}>
          <div style={{ width: '100%', height: '6px', borderRadius: '3px', background: '#E2E8F0', overflow: 'hidden' }}>
            <div style={{
              width: `${budgetPercent}%`,
              height: '100%',
              background: budgetPercent > 90 ? 'var(--expense)' : 'var(--primary)',
              borderRadius: '3px'
            }} />
          </div>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-subtle)', marginTop: '0.2rem', display: 'flex', justifyContent: 'space-between' }}>
            <span>{formatCurrency(totalBudgetExpense)} spent</span>
            <span>{formatCurrency(totalBudget)} cap</span>
          </div>
        </div>
      </div>
    </div>
  );
});

SummaryCards.displayName = 'SummaryCards';
