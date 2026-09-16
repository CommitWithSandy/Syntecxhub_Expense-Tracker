import React from 'react';
import { Plus, Search, RefreshCw, Wallet, Calendar } from 'lucide-react';

export const Header = React.memo(({
  onOpenAddModal,
  onFocusSearch,
  onResetData,
  isSyncing,
  selectedMonthFilter,
  onMonthFilterChange
}) => {
  const ALL_MONTHS = [
    { label: 'All Months', value: 'all' },
    { label: 'January', value: '01' },
    { label: 'February', value: '02' },
    { label: 'March', value: '03' },
    { label: 'April', value: '04' },
    { label: 'May', value: '05' },
    { label: 'June', value: '06' },
    { label: 'July', value: '07' },
    { label: 'August', value: '08' },
    { label: 'September', value: '09' },
    { label: 'October', value: '10' },
    { label: 'November', value: '11' },
    { label: 'December', value: '12' }
  ];

  return (
    <header style={{ marginBottom: '1.75rem' }}>
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1rem',
        padding: '1.25rem 1.5rem',
        background: 'var(--bg-card)',
        border: '1px solid var(--border-color)',
        borderRadius: 'var(--radius-lg)',
        boxShadow: 'var(--shadow-sm)'
      }}>
        {/* Brand */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: 'var(--radius-md)',
            background: 'var(--primary)',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Wallet size={22} />
          </div>
          <h1 style={{ fontSize: '1.4rem', fontWeight: '700', color: 'var(--text-main)', letterSpacing: '-0.01em' }}>
            Expense Tracker
          </h1>
        </div>

        {/* Header Action Buttons & Global Month Filter */}
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.55rem' }}>
          {/* Global Month Selector */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', background: 'var(--bg-input)', padding: '0.2rem 0.6rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
            <Calendar size={15} color="var(--primary)" />
            <select
              value={selectedMonthFilter}
              onChange={(e) => onMonthFilterChange(e.target.value)}
              className="clean-input"
              style={{ border: 'none', background: 'transparent', padding: '0.35rem 0.2rem', fontSize: '0.82rem', fontWeight: '600', cursor: 'pointer', color: 'var(--text-main)' }}
            >
              {ALL_MONTHS.map((m) => (
                <option key={m.value} value={m.value} style={{ background: '#1E293B', color: 'white' }}>
                  {m.label}
                </option>
              ))}
            </select>
          </div>

          <button 
            className="btn-secondary" 
            onClick={onFocusSearch}
            title="Focus Search Bar"
            style={{ fontSize: '0.82rem', padding: '0.55rem 0.85rem' }}
          >
            <Search size={15} />
            Focus Search
          </button>

          <button 
            className="btn-secondary" 
            onClick={onResetData}
            disabled={isSyncing}
            title="Reset Data"
            style={{ fontSize: '0.82rem', padding: '0.55rem 0.85rem' }}
          >
            <RefreshCw size={15} className={isSyncing ? 'spin' : ''} />
            Reset Data
          </button>

          <button 
            className="btn-primary" 
            onClick={onOpenAddModal}
            style={{ fontSize: '0.85rem', padding: '0.55rem 1rem' }}
          >
            <Plus size={18} />
            Add Expense
          </button>
        </div>
      </div>
    </header>
  );
});

Header.displayName = 'Header';
