import os 
import sys 
from pathlib import Path 


backend_dir =Path (__file__ ).resolve ().parent 
sys .path .append (str (backend_dir ))

from fastapi import FastAPI 
from fastapi .middleware .cors import CORSMiddleware 
from dotenv import load_dotenv 


from api .routes import router as api_router 

load_dotenv ()

app =FastAPI (
title ="Keshav Mishra Portfolio API",
description ="Backend API for portfolio Platform",
version ="1.0.0"
)


origins =[
"http://localhost:5173",
"http://127.0.0.1:5173",
"http://localhost:3000",
]

app .add_middleware (
CORSMiddleware ,
allow_origins =origins ,
allow_credentials =True ,
allow_methods =["*"],
allow_headers =["*"],
)


app .include_router (api_router ,prefix ="/api")

@app .get ("/health",tags =["System"])
def health_check ():
    return {"status":"ok","version":app .version }
