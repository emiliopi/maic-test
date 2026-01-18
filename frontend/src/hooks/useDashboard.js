import { useState } from 'react';
import axios from 'axios';
import { toast } from 'sonner';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export function useDashboard() {
  const [fileId, setFileId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [dashboardItems, setDashboardItems] = useState([]);

  const handleUpload = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    setLoading(true);

    try {
      const response = await axios.post(`${API_URL}/upload`, formData);
      setFileId(response.data.file_id);
      setSuggestions(response.data.suggestions);
    } catch (error) {
      console.error(error);
      toast.error("Error al procesar", { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  const addToDashboard = async (suggestion) => {
    if (dashboardItems.some(i => i.title === suggestion.title)) {
      toast.warning("Ya existe en el dashboard");
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/get-chart-data`, {
        file_id: fileId,
        chart_type: suggestion.chart_type,
        parameters: suggestion.parameters
      });

      if (response.data.error) throw new Error(response.data.error);

      setDashboardItems(prev => [...prev, { ...suggestion, data: response.data.data, id: Date.now() }]);
      toast.success("Gráfico agregado");
    } catch (error) {
      toast.error("Error al generar gráfico");
    }
  };

  const removeFromDashboard = (id) => {
    setDashboardItems(prev => prev.filter(item => item.id !== id));
    toast.info("Eliminado");
  };

  const resetApp = () => {
    toast("¿Reiniciar todo?", {
      action: {
        label: 'Sí',
        onClick: () => {
          setFileId(null);
          setSuggestions([]);
          setDashboardItems([]);
        }
      }
    });
  };

  return {
    fileId,
    loading,
    suggestions,
    dashboardItems,
    handleUpload,
    addToDashboard,
    removeFromDashboard,
    resetApp
  };
}