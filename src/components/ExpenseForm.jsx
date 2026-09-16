import React, { useState, useEffect, useRef } from 'react';
import { X, AlertCircle } from 'lucide-react';

export const ExpenseForm = ({ isOpen, onClose, onSubmit, initialData }) => {
  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    type: 'expense',
    category: 'Food & Dining',
    date: new Date().toISOString().split('T')[0],
    notes: ''
  });

  const [errors, setErrors] = useState({});

  const titleInputRef = useRef(null);
  const amountInputRef = useRef(null);

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || '',
        amount: initialData.amount ? initialData.amount.toString() : '',
        type: initialData.type || 'expense',
        category: initialData.category || 'Food & Dining',
        date: initialData.date || new Date().toISOString().split('T')[0],
        notes: initialData.notes || ''
      });
    } else {
      setFormData({
        title: '',
        amount: '',
        type: 'expense',
        category: 'Food & Dining',
        date: new Date().toISOString().split('T')[0],
        notes: ''
      });
    }
    setErrors({});
  }, [initialData, isOpen]);

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        if (titleInputRef.current) {
          titleInputRef.current.focus();
        }
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const applyPreset = (preset) => {
    setFormData(prev => ({
      ...prev,
      title: preset.title,
      amount: preset.amount.toString(),
      type: preset.type,
      category: preset.category
    }));

    if (amountInputRef.current) {
      amountInputRef.current.focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    if (!formData.amount || isNaN(formData.amount) || parseFloat(formData.amount) <= 0) {
      newErrors.amount = 'Enter valid amount > ₹0';
    }
    if (!formData.date) {
      newErrors.date = 'Date is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      if (newErrors.title && titleInputRef.current) {
        titleInputRef.current.focus();
      } else if (newErrors.amount && amountInputRef.current) {
        amountInputRef.current.focus();
      }
      return;
    }

    onSubmit(formData);
    onClose();
  };

  const categories = [
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

  const presets = [
    { title: 'Morning Coffee', amount: 50, type: 'expense', category: 'Food & Dining' },
    { title: 'Grocery Shopping', amount: 1200, type: 'expense', category: 'Food & Dining' },
    { title: 'Freelance Work', amount: 5000, type: 'income', category: 'Income' },
    { title: 'Taxi Ride', amount: 250, type: 'expense', category: 'Transportation' }
  ];

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem' }}>
          <h2 style={{ fontSize: '1.1rem', fontWeight: '700', color: 'var(--text-main)' }}>
            {initialData ? 'Edit Transaction' : 'Add New Transaction'}
          </h2>
          <button 
            onClick={onClose} 
            style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Quick Presets */}
        {!initialData && (
          <div style={{ marginBottom: '1rem' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: '600', color: 'var(--text-muted)', display: 'block', marginBottom: '0.35rem' }}>
              Quick Presets:
            </span>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
              {presets.map((preset, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => applyPreset(preset)}
                  style={{
                    fontSize: '0.75rem',
                    background: 'rgba(255, 255, 255, 0.08)',
                    border: '1px solid var(--border-color)',
                    color: '#F8FAFC',
                    padding: '0.3rem 0.6rem',
                    borderRadius: 'var(--radius-full)',
                    cursor: 'pointer',
                    fontWeight: '500'
                  }}
                >
                  + {preset.title} (₹{preset.amount})
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          {/* Expense vs Income Toggle Buttons */}
          <div style={{ display: 'flex', gap: '0.4rem', background: 'var(--bg-input)', padding: '0.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
            <button
              type="button"
              onClick={() => setFormData(prev => ({ ...prev, type: 'expense', category: prev.category === 'Income' ? 'Food & Dining' : prev.category }))}
              style={{
                flex: 1,
                padding: '0.5rem',
                borderRadius: 'var(--radius-sm)',
                border: 'none',
                background: formData.type === 'expense' ? 'var(--expense)' : 'transparent',
                color: formData.type === 'expense' ? '#FFFFFF' : 'var(--text-muted)',
                fontWeight: '600',
                fontSize: '0.85rem',
                cursor: 'pointer'
              }}
            >
              Expense
            </button>
            <button
              type="button"
              onClick={() => setFormData(prev => ({ ...prev, type: 'income', category: 'Income' }))}
              style={{
                flex: 1,
                padding: '0.5rem',
                borderRadius: 'var(--radius-sm)',
                border: 'none',
                background: formData.type === 'income' ? 'var(--income)' : 'transparent',
                color: formData.type === 'income' ? '#FFFFFF' : 'var(--text-muted)',
                fontWeight: '600',
                fontSize: '0.85rem',
                cursor: 'pointer'
              }}
            >
              Income
            </button>
          </div>

          {/* Title Input with useRef */}
          <div>
            <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '600', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>
              Title *
            </label>
            <input
              ref={titleInputRef}
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. House Rent, Groceries"
              className="clean-input"
              style={{ borderColor: errors.title ? 'var(--expense)' : undefined }}
            />
            {errors.title && (
              <span style={{ fontSize: '0.72rem', color: 'var(--expense)', display: 'flex', alignItems: 'center', gap: '0.2rem', marginTop: '0.2rem' }}>
                <AlertCircle size={11} /> {errors.title}
              </span>
            )}
          </div>

          {/* Amount & Category */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.65rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '600', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>
                Amount (₹) *
              </label>
              <input
                ref={amountInputRef}
                type="number"
                step="1"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                placeholder="0"
                className="clean-input"
                style={{ borderColor: errors.amount ? 'var(--expense)' : undefined }}
              />
              {errors.amount && (
                <span style={{ fontSize: '0.72rem', color: 'var(--expense)', display: 'flex', alignItems: 'center', gap: '0.2rem', marginTop: '0.2rem' }}>
                  <AlertCircle size={11} /> {errors.amount}
                </span>
              )}
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '600', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>
                Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="clean-input"
                style={{ cursor: 'pointer', color: 'var(--text-main)' }}
              >
                {categories.map((cat, idx) => (
                  <option key={idx} value={cat} style={{ background: '#1E293B', color: '#F8FAFC' }}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Date Picker */}
          <div>
            <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '600', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>
              Date *
            </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="clean-input"
              style={{ color: 'var(--text-main)', colorScheme: 'dark' }}
            />
          </div>

          {/* Notes */}
          <div>
            <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '600', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>
              Notes
            </label>
            <textarea
              name="notes"
              rows={2}
              value={formData.notes}
              onChange={handleChange}
              placeholder="Optional details..."
              className="clean-input"
              style={{ resize: 'vertical' }}
            />
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', marginTop: '0.4rem' }}>
            <button type="button" className="btn-secondary" onClick={onClose} style={{ fontSize: '0.82rem', padding: '0.55rem 0.9rem' }}>
              Cancel
            </button>
            <button type="submit" className="btn-primary" style={{ fontSize: '0.82rem', padding: '0.55rem 1rem' }}>
              {initialData ? 'Save Changes' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
