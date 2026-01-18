'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

const statuses = [
  { id: 'pending', label: 'Pending', color: 'bg-amber-100 text-amber-700' },
  { id: 'in_progress', label: 'WIP', color: 'bg-blue-100 text-blue-700' },
  { id: 'done', label: 'Done', color: 'bg-emerald-100 text-emerald-700' },
];

export function StatusPicker() {
  const [selected, setSelected] = useState('pending');

  return (
    <div className="flex bg-slate-100 p-1 rounded-xl relative">
      {statuses.map((status) => (
        <label
          key={status.id}
          className="relative flex-1 cursor-pointer py-2 px-3 z-10 text-center transition-colors"
        >
          <input
            type="radio"
            name="status"
            value={status.id}
            checked={selected === status.id}
            onChange={() => setSelected(status.id)}
            className="sr-only" // Hide the actual radio button
          />
          <span className={`text-xs font-bold uppercase tracking-wider ${
            selected === status.id ? 'text-slate-900' : 'text-slate-400'
          }`}>
            {status.label}
          </span>
          
          {/* This is the "Floating" background pill */}
          {selected === status.id && (
            <motion.div
              layoutId="status-pill"
              className="absolute inset-0 bg-white rounded-lg shadow-sm z-[-1]"
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
          )}
        </label>
      ))}
    </div>
  );
}