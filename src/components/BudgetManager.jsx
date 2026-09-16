import React, { useState } from 'react';
import { Target, Edit2, Check } from 'lucide-react';

export const BudgetManager = React.memo(({ budgets, categoryExpenses, onSaveBudgets }) => {
  const [editingCategory, setEditingCategory] = useState(null);
  const [tempCap, setTempCap] = useState('');

  const formatCurrency = (val) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val);
  };

  const handleStartEdit = (cat, currentCap) => {
    setEditingCategory(cat);
    setTempCap(currentCap.toString());
  };

  const handleSaveEdit = (cat) => {
    const val = parseFloat(tempCap);
    if (!isNaN(val) && val >= 0) {
      onSaveBudgets({
        ...budgets,
        [cat]: val
      });
    }
    setEditingCategory(null);
  };

  return (
    <div className="clean-card" style={{ padding: '1.25rem', marginBottom: '1.75rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Target size={18} color="var(--primary)" />
          <h3 style={{ fontSize: '0.95rem', fontWeight: '700', color: 'var(--text-main)' }}>Category Budget Limits</h3>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '0.85rem' }}>
        {Object.keys(budgets).map((cat) => {
          const cap = budgets[cat] || 0;
          const spent = categoryExpenses[cat] || 0;
          const percent = cap > 0 ? Math.min(100, Math.round((spent / cap) * 100)) : 0;
          const isOver = spent > cap;

          return (
            <div key={cat} style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '0.75rem 0.85rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                <span style={{ fontSize: '0.82rem', fontWeight: '600', color: 'var(--text-main)' }}>{cat}</span>
                {editingCategory === cat ? (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <input
                      type="number"
                      value={tempCap}
                      onChange={(e) => setTempCap(e.target.value)}
                      style={{ width: '75px', padding: '0.2rem 0.4rem', border: '1px solid var(--primary)', borderRadius: '4px', fontSize: '0.78rem', background: 'var(--bg-input)', color: 'var(--text-main)' }}
                    />
                    <button onClick={() => handleSaveEdit(cat)} style={{ background: 'var(--primary)', color: 'white', border: 'none', padding: '0.2rem', borderRadius: '4px', cursor: 'pointer' }}>
                      <Check size={13} />
                    </button>
                  </div>
                ) : (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Cap: {formatCurrency(cap)}</span>
                    <button onClick={() => handleStartEdit(cat, cap)} style={{ background: 'transparent', border: 'none', color: 'var(--text-subtle)', cursor: 'pointer' }}>
                      <Edit2 size={12} />
                    </button>
                  </div>
                )}
              </div>

              {/* Progress Bar */}
              <div style={{ width: '100%', height: '5px', background: 'rgba(255,255,255,0.08)', borderRadius: '3px', overflow: 'hidden', margin: '0.35rem 0' }}>
                <div style={{
                  width: `${percent}%`,
                  height: '100%',
                  background: isOver ? 'var(--expense)' : 'var(--income)',
                  borderRadius: '3px'
                }} />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--text-subtle)' }}>
                <span>Spent: {formatCurrency(spent)}</span>
                <span style={{ color: isOver ? 'var(--expense)' : 'var(--income)', fontWeight: '600' }}>
                  {percent}%
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
});

BudgetManager.displayName = 'BudgetManager';
