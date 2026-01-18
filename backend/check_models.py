import google.generativeai as genai

GOOGLE_API_KEY = "AIzaSyBxpdO6T8-x8a-6j0mSwsKJbfrXKj2dn1I" 
genai.configure(api_key=GOOGLE_API_KEY)

print("--- BUSCANDO MODELOS DISPONIBLES ---")
try:
    available_models = []
    for m in genai.list_models()
        if 'generateContent' in m.supported_generation_methods:
            print(f"Encontrado: {m.name}")
            available_models.append(m.name)
            
    if not available_models:
        print("No se encontraron modelos compatibles. Revisa tu API Key.")
        
except Exception as e:
    print(f"Error conectando: {e}")