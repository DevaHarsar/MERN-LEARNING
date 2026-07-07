from fastapi import FastAPI
from routers.chat import router as chat_router
from fastapi.middleware.cors import CORSMiddleware  

app = FastAPI(
    title="Ecommerce AI Service"
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "https://dev-super-mart-rho.vercel.app",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(chat_router)