import React from 'react';
import { PieChart, BarChart3, Calendar } from 'lucide-react';

export const AnalyticsCharts = React.memo(({
  categoryBreakdown,
  totalExpense,
  monthlyTrend,
  selectedMonthFilter,
  onMonthFilterChange
}) => {
  const CATEGORY_COLORS = {
    'Housing': '#818CF8',
    'Food & Dining': '#34D399',
    'Transportation': '#60A5FA',
    'Utilities': '#FBBF24',
    'Shopping': '#F472B6',
    'Entertainment': '#A78BFA',
    'Healthcare': '#F87171',
    'Other': '#94A3B8'
  };

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

  const formatCurrency = (val) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val);
  };

  let cumulativeAngle = 0;
  const donutSegments = categoryBreakdown.map((cat) => {
    const percentage = totalExpense > 0 ? (cat.amount / totalExpense) : 0;
    const angle = percentage * 360;
    const startAngle = cumulativeAngle;
    cumulativeAngle += angle;

    return {
      ...cat,
      percentage: (percentage * 100).toFixed(1),
      color: CATEGORY_COLORS[cat.name] || '#94A3B8',
      startAngle,
      angle
    };
  });

  const getArcPath = (cx, cy, rInner, rOuter, startAngleDeg, angleDeg) => {
    if (angleDeg >= 360) angleDeg = 359.99;
    const startRad = ((startAngleDeg - 90) * Math.PI) / 180;
    const endRad = (((startAngleDeg + angleDeg) - 90) * Math.PI) / 180;

    const x1 = cx + rOuter * Math.cos(startRad);
    const y1 = cy + rOuter * Math.sin(startRad);
    const x2 = cx + rOuter * Math.cos(endRad);
    const y2 = cy + rOuter * Math.sin(endRad);

    const x3 = cx + rInner * Math.cos(endRad);
    const y3 = cy + rInner * Math.sin(endRad);
    const x4 = cx + rInner * Math.cos(startRad);
    const y4 = cy + rInner * Math.sin(startRad);

    const largeArcFlag = angleDeg > 180 ? 1 : 0;

    return `
      M ${x1} ${y1}
      A ${rOuter} ${rOuter} 0 ${largeArcFlag} 1 ${x2} ${y2}
      L ${x3} ${y3}
      A ${rInner} ${rInner} 0 ${largeArcFlag} 0 ${x4} ${y4}
      Z
    `;
  };

  const displayedTrend = selectedMonthFilter === 'all'
    ? monthlyTrend
    : monthlyTrend.filter(m => {
        if (m.month && m.month.includes('-')) {
          const mNum = m.month.split('-')[1];
          return mNum === selectedMonthFilter;
        }
        return false;
      });

  const maxTrendVal = Math.max(
    ...displayedTrend.map(m => Math.max(m.income, m.expense)),
    1000
  );

  const getSelectedMonthName = () => {
    const found = ALL_MONTHS.find(m => m.value === selectedMonthFilter);
    return found ? found.label : 'Selected Month';
  };

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '1rem',
      marginBottom: '1.75rem'
    }}>
      {/* Category Expense Donut Chart */}
      <div className="clean-card" style={{ padding: '1.25rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <PieChart size={18} color="var(--primary)" />
            <h3 style={{ fontSize: '0.95rem', fontWeight: '700', color: 'var(--text-main)' }}>Expense Breakdown</h3>
          </div>
          {selectedMonthFilter !== 'all' && (
            <span className="badge badge-neutral" style={{ fontSize: '0.72rem' }}>
              {getSelectedMonthName()}
            </span>
          )}
        </div>

        {totalExpense === 0 || donutSegments.length === 0 ? (
          <div style={{ padding: '2.5rem 1rem', textAlign: 'center', color: 'var(--text-subtle)', fontSize: '0.85rem' }}>
            No expense records for {getSelectedMonthName()}.
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
            <div style={{ position: 'relative', width: '170px', height: '170px' }}>
              <svg width="170" height="170" viewBox="0 0 170 170">
                {donutSegments.map((seg, idx) => (
                  <path
                    key={idx}
                    d={getArcPath(85, 85, 48, 78, seg.startAngle, seg.angle)}
                    fill={seg.color}
                    style={{ cursor: 'pointer' }}
                  >
                    <title>{`${seg.name}: ${formatCurrency(seg.amount)} (${seg.percentage}%)`}</title>
                  </path>
                ))}
              </svg>
              <div style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                pointerEvents: 'none'
              }}>
                <span style={{ fontSize: '0.65rem', color: 'var(--text-subtle)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Spent</span>
                <span style={{ fontSize: '0.95rem', fontWeight: '700', color: 'var(--text-main)' }}>{formatCurrency(totalExpense)}</span>
              </div>
            </div>

            <div style={{ width: '100%', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.4rem' }}>
              {donutSegments.map((seg, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.78rem', background: 'rgba(255, 255, 255, 0.03)', padding: '0.35rem 0.5rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', overflow: 'hidden' }}>
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: seg.color, flexShrink: 0 }} />
                    <span style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap', color: 'var(--text-muted)' }}>{seg.name}</span>
                  </div>
                  <strong style={{ color: 'var(--text-main)', marginLeft: '0.2rem' }}>{seg.percentage}%</strong>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Monthly Comparison Chart */}
      <div className="clean-card" style={{ padding: '1.25rem' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem', marginBottom: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <BarChart3 size={18} color="var(--primary)" />
            <h3 style={{ fontSize: '0.95rem', fontWeight: '700', color: 'var(--text-main)' }}>Monthly Comparison</h3>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <Calendar size={14} color="var(--text-muted)" />
            <select
              value={selectedMonthFilter}
              onChange={(e) => onMonthFilterChange(e.target.value)}
              className="clean-input"
              style={{ width: '135px', padding: '0.35rem 0.6rem', fontSize: '0.78rem', cursor: 'pointer', color: 'var(--text-main)' }}
            >
              {ALL_MONTHS.map((m) => (
                <option key={m.value} value={m.value} style={{ background: '#1E293B', color: 'white' }}>
                  {m.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Legend */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.6rem', fontSize: '0.72rem', marginBottom: '0.75rem' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'var(--text-muted)' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '2px', background: 'var(--income)' }} /> Income
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'var(--text-muted)' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '2px', background: 'var(--expense)' }} /> Expense
          </span>
        </div>

        {displayedTrend.length === 0 ? (
          <div style={{ padding: '2.5rem 1rem', textAlign: 'center', color: 'var(--text-subtle)', fontSize: '0.85rem' }}>
            No records for {getSelectedMonthName()}.
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-around', height: '160px', paddingBottom: '0.5rem', borderBottom: '1px solid var(--border-color)' }}>
              {displayedTrend.map((m, idx) => {
                const incomeHeight = m.income > 0 ? Math.max(10, (m.income / maxTrendVal) * 130) : 0;
                const expenseHeight = m.expense > 0 ? Math.max(10, (m.expense / maxTrendVal) * 130) : 0;

                return (
                  <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.35rem' }}>
                    <div style={{ display: 'flex', alignItems: 'flex-end', gap: '4px', height: '130px' }}>
                      {m.income > 0 && (
                        <div
                          style={{
                            width: displayedTrend.length === 1 ? '32px' : '18px',
                            height: `${incomeHeight}px`,
                            background: 'var(--income)',
                            borderRadius: '3px 3px 0 0',
                            transition: 'height 0.3s ease'
                          }}
                          title={`Income (${m.month}): ${formatCurrency(m.income)}`}
                        />
                      )}

                      {m.expense > 0 && (
                        <div
                          style={{
                            width: displayedTrend.length === 1 ? '32px' : '18px',
                            height: `${expenseHeight}px`,
                            background: 'var(--expense)',
                            borderRadius: '3px 3px 0 0',
                            transition: 'height 0.3s ease'
                          }}
                          title={`Expense (${m.month}): ${formatCurrency(m.expense)}`}
                        />
                      )}
                    </div>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{m.month}</span>
                  </div>
                );
              })}
            </div>

            {selectedMonthFilter !== 'all' && (
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', background: 'rgba(255, 255, 255, 0.03)', padding: '0.4rem 0.6rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
                <span style={{ color: 'var(--income)' }}>Income: <strong>{formatCurrency(displayedTrend[0]?.income || 0)}</strong></span>
                <span style={{ color: 'var(--expense)' }}>Expense: <strong>{formatCurrency(displayedTrend[0]?.expense || 0)}</strong></span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
});

AnalyticsCharts.displayName = 'AnalyticsCharts';
