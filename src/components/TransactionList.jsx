import React, { useState } from 'react';
import { Search, Edit3, Trash2, Calendar, FileText, ChevronLeft, ChevronRight, XCircle } from 'lucide-react';

export const TransactionList = React.memo(({
  transactions,
  searchInputRef,
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  selectedType,
  onTypeChange,
  sortBy,
  onSortChange,
  onResetFilters,
  onEdit,
  onDelete,
  isLoading
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const formatCurrency = (val, type) => {
    const formatted = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val);
    return type === 'income' ? `+${formatted}` : `-${formatted}`;
  };

  const categories = [
    'All Categories',
    'Housing',
    'Food & Dining',
    'Transportation',
    'Utilities',
    'Shopping',
    'Entertainment',
    'Healthcare',
    'Income',
    'Other'
  ];

  const totalPages = Math.ceil(transactions.length / itemsPerPage) || 1;
  const paginatedItems = transactions.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="clean-card" style={{ padding: '1.25rem', marginBottom: '1.75rem' }}>
      {/* List Header & Controls */}
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '0.85rem', marginBottom: '1.25rem' }}>
        <div>
          <h3 style={{ fontSize: '1rem', fontWeight: '700', color: 'var(--text-main)' }}>Transaction History</h3>
          <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
            Showing {transactions.length} records
          </p>
        </div>

        {/* Filter Controls Row */}
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.5rem' }}>
          {/* Search Box */}
          <div style={{ position: 'relative', width: '200px' }}>
            <Search size={14} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-subtle)' }} />
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => { onSearchChange(e.target.value); setCurrentPage(1); }}
              placeholder="Search..."
              className="clean-input"
              style={{ paddingLeft: '2.1rem', fontSize: '0.82rem' }}
            />
          </div>

          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => { onCategoryChange(e.target.value); setCurrentPage(1); }}
            className="clean-input"
            style={{ width: '140px', fontSize: '0.82rem', cursor: 'pointer' }}
          >
            {categories.map((cat, idx) => (
              <option key={idx} value={cat === 'All Categories' ? 'all' : cat} style={{ background: '#1E293B', color: 'white' }}>
                {cat}
              </option>
            ))}
          </select>

          {/* Type Filter */}
          <select
            value={selectedType}
            onChange={(e) => { onTypeChange(e.target.value); setCurrentPage(1); }}
            className="clean-input"
            style={{ width: '110px', fontSize: '0.82rem', cursor: 'pointer' }}
          >
            <option value="all" style={{ background: '#1E293B', color: 'white' }}>All Types</option>
            <option value="income" style={{ background: '#1E293B', color: 'white' }}>Income</option>
            <option value="expense" style={{ background: '#1E293B', color: 'white' }}>Expense</option>
          </select>

          {/* Sort By Selector */}
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="clean-input"
            style={{ width: '130px', fontSize: '0.82rem', cursor: 'pointer' }}
          >
            <option value="date-desc" style={{ background: '#1E293B', color: 'white' }}>Newest First</option>
            <option value="date-asc" style={{ background: '#1E293B', color: 'white' }}>Oldest First</option>
            <option value="amount-desc" style={{ background: '#1E293B', color: 'white' }}>Highest Amount</option>
            <option value="amount-asc" style={{ background: '#1E293B', color: 'white' }}>Lowest Amount</option>
          </select>

          {/* Reset Filters */}
          {(searchQuery || selectedCategory !== 'all' || selectedType !== 'all') && (
            <button
              onClick={() => { onResetFilters(); setCurrentPage(1); }}
              className="btn-secondary"
              style={{ padding: '0.55rem 0.75rem', fontSize: '0.78rem', color: 'var(--expense)' }}
              title="Clear all filters"
            >
              <XCircle size={13} /> Clear
            </button>
          )}
        </div>
      </div>

      {/* Table Content */}
      {isLoading ? (
        <div style={{ padding: '3rem 1rem', textAlign: 'center', color: 'var(--text-muted)' }}>
          <div className="spin" style={{ display: 'inline-block', width: '24px', height: '24px', border: '2px solid var(--border-color)', borderTopColor: 'var(--primary)', borderRadius: '50%', marginBottom: '0.5rem' }} />
          <p style={{ fontSize: '0.85rem' }}>Loading transactions...</p>
        </div>
      ) : paginatedItems.length === 0 ? (
        <div style={{ padding: '3rem 1rem', textAlign: 'center', color: 'var(--text-muted)', border: '1px dashed var(--border-color)', borderRadius: 'var(--radius-md)' }}>
          <FileText size={32} style={{ opacity: 0.3, marginBottom: '0.4rem' }} />
          <p style={{ fontWeight: '600', color: 'var(--text-main)', fontSize: '0.9rem' }}>No transactions found</p>
        </div>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                <th style={{ padding: '0.65rem 0.85rem' }}>Title</th>
                <th style={{ padding: '0.65rem 0.85rem' }}>Category</th>
                <th style={{ padding: '0.65rem 0.85rem' }}>Date</th>
                <th style={{ padding: '0.65rem 0.85rem', textAlign: 'right' }}>Amount</th>
                <th style={{ padding: '0.65rem 0.85rem', textAlign: 'center' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedItems.map((tx) => (
                <tr
                  key={tx.id}
                  style={{ borderBottom: '1px solid var(--border-color)' }}
                >
                  <td style={{ padding: '0.75rem 0.85rem' }}>
                    <div style={{ fontWeight: '600', color: 'var(--text-main)', fontSize: '0.88rem' }}>
                      {tx.title}
                    </div>
                    {tx.notes && (
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-subtle)', marginTop: '0.1rem' }}>
                        {tx.notes}
                      </div>
                    )}
                  </td>
                  <td style={{ padding: '0.75rem 0.85rem' }}>
                    <span className={tx.type === 'income' ? 'badge badge-income' : 'badge badge-expense'}>
                      {tx.category}
                    </span>
                  </td>
                  <td style={{ padding: '0.75rem 0.85rem', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                      <Calendar size={12} color="var(--text-subtle)" />
                      {tx.date}
                    </span>
                  </td>
                  <td style={{ padding: '0.75rem 0.85rem', textAlign: 'right', fontWeight: '600', fontSize: '0.88rem', color: tx.type === 'income' ? 'var(--income)' : 'var(--expense)' }}>
                    {formatCurrency(tx.amount, tx.type)}
                  </td>
                  {/* Action Column with Symbol-Only Buttons */}
                  <td style={{ padding: '0.75rem 0.85rem', textAlign: 'center' }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                      <button
                        type="button"
                        onClick={() => onEdit(tx)}
                        style={{
                          background: 'rgba(255, 255, 255, 0.05)',
                          border: '1px solid var(--border-color)',
                          color: 'var(--text-main)',
                          padding: '0.45rem',
                          borderRadius: 'var(--radius-sm)',
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                        title="Edit transaction"
                      >
                        <Edit3 size={15} />
                      </button>
                      <button
                        type="button"
                        onClick={() => onDelete(tx.id)}
                        className="btn-danger"
                        style={{
                          padding: '0.45rem',
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                        title="Delete transaction"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination Footer */}
      {totalPages > 1 && (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '1rem', paddingTop: '0.75rem', borderTop: '1px solid var(--border-color)', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          <span>Page {currentPage} of {totalPages}</span>
          <div style={{ display: 'flex', gap: '0.3rem' }}>
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="btn-secondary"
              style={{ padding: '0.35rem 0.65rem', opacity: currentPage === 1 ? 0.4 : 1 }}
            >
              <ChevronLeft size={14} /> Prev
            </button>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="btn-secondary"
              style={{ padding: '0.35rem 0.65rem', opacity: currentPage === totalPages ? 0.4 : 1 }}
            >
              Next <ChevronRight size={14} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
});

TransactionList.displayName = 'TransactionList';
