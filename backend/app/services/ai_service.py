from google import genai
from google.genai import types
import json
from app.config import settings

client = None
if settings.GOOGLE_API_KEY:
    client = genai.Client(api_key=settings.GOOGLE_API_KEY)

def generate_analysis(summary_str: str):
    print("--- INICIANDO LLAMADA A GEMINI (NUEVA SDK) ---")
    
    if not client:
        print("Error: No se encontró GOOGLE_API_KEY")
        return {"suggestions": []}

    prompt = f"""
    Actúa como un Analista de Datos experto.
    Analiza el siguiente resumen estadístico de un dataset y sugiere de 3 a 5 visualizaciones.

    DATOS DEL USUARIO:
    {summary_str}

    REQUISITO DE SALIDA (ESTRICTO):
    Debes devolver un JSON válido con una lista llamada "suggestions".
    Cada sugerencia DEBE tener exactamente esta estructura:
    {{
        "title": "Título del gráfico",
        "chart_type": "bar" (o "line", "pie", "scatter"),
        "parameters": {{
            "x_axis": "Nombre EXACTO de la columna para el eje X",
            "y_axis": "Nombre EXACTO de la columna para el eje Y",
            "aggregation": "sum" | "avg" | "count" (opcional, por defecto sum)
        }},
        "insight": "Breve análisis de texto."
    }}

    IMPORTANTE: Devuelve SOLO el JSON sin bloques de código markdown (```json).
    """
    
    try:
        response = client.models.generate_content(
            model='gemini-2.0-flash',
            contents=prompt,
            config=types.GenerateContentConfig(
                temperature=0.3
            )
        )
        
        print("Respuesta IA recibida.")
        
        text = response.text.replace("```json", "").replace("```", "").strip()
        return json.loads(text)

    except Exception as e:
        print(f"Error IA: {str(e)}")

        return {"suggestions": []}
