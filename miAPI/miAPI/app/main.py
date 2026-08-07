from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.data.db import Base, engine
from app.data import usuarioDB
from app.routers import misc, usuarios

app = FastAPI(title="API usuarios")

origins = ["*"]

# CONFIGURACIÓN DE CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Crea las tablas en la base de datos al arrancar
Base.metadata.create_all(bind=engine)

# Routers
app.include_router(misc.router)
app.include_router(usuarios.router)