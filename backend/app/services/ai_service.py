import google.generativeai as genai
import json
from app.config import settings

if settings.GOOGLE_API_KEY:
    genai.configure(api_key=settings.GOOGLE_API_KEY)

def generate_analysis(summary_str: str):
    print("--- INICIANDO LLAMADA A GEMINI ---")
    
    try:
        model = genai.GenerativeModel('models/gemini-2.5-pro')
    except:
        model = genai.GenerativeModel('gemini-pro')
    
    prompt = f"""
    Actúa como un Analista de Datos experto.
    Analiza el siguiente resumen estadístico de un dataset y sugiere de 3 a 5 visualizaciones.

    DATOS DEL USUARIO:
    {summary_str}

    REQUISITO DE SALIDA (ESTRICTO):
    Debes devolver un JSON válido con una lista llamada "suggestions".
    Cada sugerencia DEBE tener exactamente esta estructura anidada para cumplir con la API del frontend:

    {{
        "title": "Título del gráfico",
        "chart_type": "bar" (o "line", "pie", "scatter"),
        "parameters": {{
            "x_axis": "Nombre EXACTO de la columna para el eje X",
            "y_axis": "Nombre EXACTO de la columna para el eje Y"
        }},
        "insight": "Breve análisis de texto explicando el hallazgo."
    }}

    IMPORTANTE: 
    1. La clave "parameters" es OBLIGATORIA.
    2. No inventes nombres de columnas, usa las que aparecen en el resumen.
    3. Devuelve SOLO el JSON sin bloques de código markdown.
    """
    
    try:
        response = model.generate_content(prompt)
        print("Respuesta IA recibida.")
        
        text = response.text.replace("```json", "").replace("```", "").strip()
        return json.loads(text)

    except Exception as e:
        print(f"Error IA: {str(e)}")
        return {"suggestions": []}