# DataInsight AI 🚀
### Analítica Inteligente con Inteligencia Artificial

**DataInsight AI** es una plataforma **Full-Stack** diseñada para transformar archivos de datos planos (Excel / CSV) en **dashboards interactivos y visualizaciones estratégicas** de manera automática, utilizando **inteligencia artificial de última generación**.

La solución está orientada a usuarios técnicos y no técnicos que necesitan obtener **insights accionables** a partir de datos sin realizar procesos manuales de análisis o visualización.

---

## 🌐 Demo en Producción

**URL de prueba:**  
https://maic-test.vercel.app

### Infraestructura
- **Frontend:** alojado en **Vercel**
- **Backend:** alojado en **Render (Free Tier)**

> ⚠️ **Consideración importante:**  
> El backend se ejecuta en el plan gratuito de Render, por lo que el servidor entra en estado inactivo cuando no hay tráfico.  
> La **primera carga de archivos puede presentar una ligera latencia** mientras el servidor se reactiva.

---

## 🧱 Arquitectura General

- **Frontend:** React + Vite
- **Backend:** FastAPI (Python)
- **IA:** Google Gemini (GenAI SDK v2.0 Flash)
- **Procesamiento de datos:** Pandas
- **Visualización:** Recharts

Arquitectura desacoplada que permite escalar frontend, backend y motor de IA de forma independiente.

---

## ⚙️ Configuración Local

### 📋 Requisitos Previos

- **Node.js** v18 o superior  
- **Python** 3.9 o superior  
- **API Key** de [Google AI Studio](https://aistudio.google.com/)

---

### 1️⃣ Clonar el proyecto

```bash
git clone https://github.com/emiliopi/maic-test.git
cd maic-test
```

---

### 2️⃣ Configurar el Backend (FastAPI)

```bash
cd backend
python -m venv venv
source venv/bin/activate   # En Windows: venv\Scripts\activate
pip install -r requirements.txt
```

Crear un archivo `.env` dentro de la carpeta `backend/`:

```env
GOOGLE_API_KEY="TU_API_KEY_AQUI"
```

Iniciar el servidor:

```bash
uvicorn app.main:app --reload
```

---

### 3️⃣ Configurar el Frontend (React + Vite)

```bash
cd ../frontend
npm install
```

Crear un archivo `.env` en la carpeta `frontend/` (opcional):

```env
VITE_API_URL=http://localhost:8000
```

Iniciar la aplicación:

```bash
npm run dev
```

---

## 🧪 Tecnologías Utilizadas

### 🔙 Backend

- Arquitectura en capas (routers, services, models)
- Pandas para limpieza y agregación de datos
- Google GenAI SDK (Gemini v2.0 Flash)

### 🎨 Frontend

- Tailwind CSS v4
- Custom Hooks (`useDashboard`, `useTheme`)
- Sonner (toast notifications)
- Recharts para visualización dinámica

---

## 🧠 Ingeniería de Prompts (IA)

El motor de **DataInsight AI** se basa en un enfoque de **Prompt Estricto**, asegurando salidas estructuradas y compatibles con el frontend.

### Estrategias:
- Asignación de rol como Analista de Datos Experto
- Resumen técnico del dataset (`df.info()`, `df.describe()`, sample)
- Esquema JSON estricto
- Selección automática del tipo de gráfico según los datos

---
