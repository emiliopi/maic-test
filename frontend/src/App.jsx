import React, { useRef, useEffect } from 'react';
import { Toaster } from 'sonner';

import { Navbar } from './components/ui/Navbar';
import { FileUpload } from './components/ui/FileUpload';
import { SuggestionCard } from './components/ui/SuggestionCard';
import { DashboardCard } from './components/ui/DashboardCard';

import { useTheme } from './hooks/useTheme';
import { useDashboard } from './hooks/useDashboard';

function App() {
  const { theme, toggleTheme } = useTheme();
  
  const { 
    fileId, 
    loading, 
    suggestions, 
    dashboardItems, 
    handleUpload, 
    addToDashboard, 
    removeFromDashboard, 
    resetApp 
  } = useDashboard();

  const dashboardRef = useRef(null);
  const prevCount = useRef(0);

  useEffect(() => {

    if (dashboardItems.length > prevCount.current) {

      setTimeout(() => {
        dashboardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }

    prevCount.current = dashboardItems.length;
  }, [dashboardItems]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#111] pt-28 pb-12 px-4 font-sans text-slate-800 dark:text-white flex flex-col items-center transition-colors duration-300">
      
      <Toaster position="top-center" richColors closeButton theme={theme} />
      
      <Navbar 
        fileId={fileId} 
        onReset={resetApp} 
        theme={theme} 
        onToggleTheme={toggleTheme} 
      />

      {!fileId ? (
        <FileUpload onUpload={handleUpload} loading={loading} />
      ) : (
        <div className="w-full max-w-[90%] flex flex-col gap-24 mt-4">
          
          {suggestions.length > 0 && (
            <div className="flex flex-col gap-10">
              <div className="flex items-center gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
                 <div className="w-2 h-10 bg-indigo-600 rounded-full"></div>
                 <h2 className="text-3xl font-bold text-slate-800 dark:text-white">Hallazgos de la IA</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                {suggestions.map((sug, idx) => (
                  <SuggestionCard 
                    key={idx} 
                    suggestion={sug} 
                    onAdd={addToDashboard} 
                  />
                ))}
              </div>
            </div>
          )}

          <div ref={dashboardRef} className="scroll-mt-24 pb-32"> 
            
            {dashboardItems.length > 0 && (
              <>
                <div className="flex items-center gap-4 border-b border-slate-200 dark:border-slate-800 pb-6 mb-12">
                   <div className="w-2 h-10 bg-purple-600 rounded-full"></div>
                   <h2 className="text-3xl font-bold text-slate-800 dark:text-white">Tu Dashboard</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
                  {dashboardItems.map((item) => (
                    <DashboardCard 
                      key={item.id} 
                      item={item} 
                      onDelete={removeFromDashboard} 
                    />
                  ))}
                </div>
              </>
            )}
            
          </div>
        </div>
      )}
    </div>
  );
}

export default App;