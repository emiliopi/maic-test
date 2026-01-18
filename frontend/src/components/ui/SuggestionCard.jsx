import React from 'react';
import { PlusCircle } from 'lucide-react';

export const SuggestionCard = ({ suggestion, onAdd, isLoading }) => {
  return (
    <div className="bg-white dark:bg-[#1e1e1e] p-8 rounded-3xl shadow-lg border border-slate-100 dark:border-slate-800 flex flex-col justify-between hover:-translate-y-2 transition-transform h-full">
      <div>
        <div className="flex justify-between items-start mb-6">
          <span className="bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 text-xs px-4 py-2 rounded-full font-bold uppercase tracking-wider border border-indigo-100 dark:border-indigo-500/20">
            {suggestion.chart_type}
          </span>
        </div>
        
        <h3 className="font-bold text-2xl mb-4 leading-tight text-slate-800 dark:text-slate-100">
          {suggestion.title}
        </h3>
        
        <p className="text-slate-600 dark:text-slate-400 text-sm mb-8 leading-relaxed">
          {suggestion.insight}
        </p>
      </div>

      <button 
        onClick={() => onAdd(suggestion)}
        disabled={isLoading}
        className="w-full flex items-center justify-center gap-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-indigo-600 dark:hover:bg-indigo-400 hover:text-white dark:hover:text-white py-4 px-6 rounded-2xl font-bold text-lg shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <PlusCircle className="w-5 h-5" /> 
        {isLoading ? 'Cargando...' : 'Agregar'}
      </button>
    </div>
  );
};