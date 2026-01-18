import React from 'react';
import { BarChart3, RefreshCcw, Sun, Moon } from 'lucide-react';

export const Navbar = ({ fileId, onReset, theme, onToggleTheme }) => (
  <nav className="fixed top-0 left-0 w-full z-50 h-20 px-6 md:px-12 flex items-center justify-between bg-white/70 dark:bg-[#111]/70 backdrop-blur-lg border-b border-slate-200 dark:border-slate-800">
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg text-white">
        <BarChart3 className="w-6 h-6" />
      </div>
      <span className="font-bold text-xl hidden sm:block">
        Data<span className="text-indigo-600 dark:text-indigo-400">Insight</span> AI
      </span>
    </div>

    <div className="flex items-center gap-4">
      {fileId && (
        <button onClick={onReset} className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-500 hover:text-red-500 bg-slate-100 dark:bg-slate-800/50 rounded-lg transition-all">
          <RefreshCcw className="w-4 h-4" /> Reiniciar
        </button>
      )}
      <button onClick={onToggleTheme} className="p-2.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
        {theme === 'dark' ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-indigo-600" />}
      </button>
    </div>
  </nav>
);