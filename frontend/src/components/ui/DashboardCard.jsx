import React from 'react';
import { Trash2 } from 'lucide-react';
import { ChartRenderer } from '../ChartRenderer';

export const DashboardCard = ({ item, onDelete }) => {
  return (
    <div className="bg-white dark:bg-[#1e1e1e] p-8 md:p-10 rounded-[2.5rem] shadow-2xl border border-slate-100 dark:border-slate-800 relative group transition-all hover:shadow-indigo-500/10">
      
      <div className="flex justify-between items-start mb-10 w-full">
        <div className="pr-4">
          <h3 className="font-bold text-2xl text-slate-800 dark:text-white leading-snug">
            {item.title}
          </h3>
          <p className="text-xs text-slate-400 mt-2 uppercase tracking-wide font-semibold">
             {item.parameters.x_axis} vs {item.parameters.y_axis}
          </p>
        </div>
        
        <button 
          onClick={() => onDelete(item.id)}
          className="p-3 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-2xl transition-all border border-transparent hover:border-red-200 dark:hover:border-red-900 flex-shrink-0"
          title="Eliminar gráfico"
        >
          <Trash2 className="w-6 h-6" />
        </button>
      </div>

      <div className="h-80 w-full">
        <ChartRenderer 
          type={item.chart_type} 
          data={item.data} 
          xKey={item.parameters.x_axis} 
          yKey={item.parameters.y_axis} 
        />
      </div>
    </div>
  );
};