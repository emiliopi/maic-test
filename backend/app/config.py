import os
from pathlib import Path
from dotenv import load_dotenv

env_path = Path(__file__).resolve().parent.parent / '.env'

load_dotenv(dotenv_path=env_path)

class Settings:
    GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")
    
    if not GOOGLE_API_KEY:
        print("⚠️  ADVERTENCIA: No se encontró GOOGLE_API_KEY en el archivo .env")
        print(f"   Buscando en: {env_path}")

settings = Settings()