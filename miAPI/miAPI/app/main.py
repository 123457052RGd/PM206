from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routers import usuarios
from app.data.db import engine
from app.data import usuarioDB

# Crear las tablas
usuarioDB.Base.metadata.create_all(bind=engine)

# Crear la aplicación
app = FastAPI(
    title="API usuarios",
    description="Diego Rubio Guerrero",
    version="1.0.0"
)

# Orígenes permitidos para CORS
origins = [
    "http://localhost:8000",
    "http://127.0.0.1:8081",
]

# Agregar middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Registrar rutas
app.include_router(usuarios.router)