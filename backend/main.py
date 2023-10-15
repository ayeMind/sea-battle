from typing import List
from fastapi import FastAPI, Query
from pydantic import BaseModel
from typing_extensions import Annotated
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
class Field(BaseModel):
    field_id: int
    field: List[List[int]] = Query(..., description="2D array with a maximum size of 10x10", max_items=10)


default_field = {
    "field_id": 1,
    "field":[[0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
             [0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
             [0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
             [0, 1, 0, 1, 1, 1, 0, 0, 0, 0],
             [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
             [0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
             [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
             [0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
             [0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
             [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]]
}

@app.get("/game")
def get_field(field_id: Annotated[int, Query(description="0 - first player's field, 1 - second player's field")] = 1):
    return default_field

@app.post("/game")
def post_field(field_id: Annotated[int, Query(description="0 - first player's field, 1 - second player's field")] = 1):
    return default_field