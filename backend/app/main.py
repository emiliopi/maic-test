from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import analytics

app = FastAPI(title="DataInsight Backend")

origins = [
    "http://localhost:5173",
    "https://maic-test.vercel.app",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(analytics.router)

if __name__ == "__main__":
    import uvicorn

    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)