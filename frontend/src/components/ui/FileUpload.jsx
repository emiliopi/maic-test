import React from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, Loader2 } from 'lucide-react';

export const FileUpload = ({ onUpload, loading }) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (files) => onUpload(files[0]),
    accept: { 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'], 'text/csv': ['.csv'] }
  });

  return (
    <div className="w-full max-w-3xl mt-10 animate-fade-in-up">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6">
          Analítica <span className="text-indigo-600 dark:text-indigo-400">Inteligente</span>
        </h1>
        <p className="text-slate-500 text-lg">Sube tu archivo para visualizar tus datos.</p>
      </div>

      <div {...getRootProps()} className={`w-full border-2 border-dashed rounded-[2rem] p-16 text-center cursor-pointer transition-all bg-white dark:bg-[#1a1a1a] ${isDragActive ? 'border-indigo-500 scale-[1.02]' : 'border-slate-300 dark:border-slate-700 hover:shadow-xl'}`}>
        <input {...getInputProps()} />
        {loading ? (
          <div className="flex flex-col items-center animate-pulse">
            <Loader2 className="w-16 h-16 text-indigo-600 animate-spin mb-6" />
            <p className="text-xl">Procesando archivo...</p>
            <p className="text-xl">Nuestra IA esta analizando sus datos</p>

          </div>
        ) : (
          <div className="flex flex-col items-center">
            <Upload className="w-20 h-20 text-slate-300 mb-6" />
            <p className="text-2xl font-bold">Arrastra tu archivo aquí</p>
            <p className="text-xl text-slate-500">Extensiones permitidas .xlsx y .csv</p>

          </div>
        )}
      </div>
    </div>
  );
};