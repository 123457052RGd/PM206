from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional

app = FastAPI(title="API usuarios")


origins = ["*"]

#  CONFIGURACIÓN DE CORS OBLIGATORIA
# Esto permite que tanto el navegador web como el celular hagan peticiones
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(usuarios.router)
