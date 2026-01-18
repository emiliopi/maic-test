import os
from dotenv import load_dotenv

load_dotenv()

class Settings:
    GOOGLE_API_KEY = os.getenv("AIzaSyBjHO7Vsli-gEVzCd7BYmTYY3GlXeqS0f4")

settings = Settings()