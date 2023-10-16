from fastapi import FastAPI, Query, WebSocket, WebSocketDisconnect
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
    field: list[list[int]] = Query(..., description="2D array with a maximum size of 10x10", max_items=10)


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


class ConnectionManager:
    def __init__(self):
        self.active_connections: list[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        if len(self.active_connections) >= 2:
            await websocket.accept()
            await websocket.close(4000)
        else:
            await websocket.accept()
            self.active_connections.append(websocket)
            if len(self.active_connections) == 1:
                await websocket.send_json({
                    'init': True,
                    'player': 0,
                    'message': 'Waiting for another player'
                })
            else:
                await websocket.send_json({
                    'init': True,
                    'player': 1,
                    'message': 'Ready?'
                })
                await self.active_connections[0].send_json({
                    'init': True,
                    'player': 0,
                    'message': 'Your turn'
                })

    def disconnect(self, websocket: WebSocket):
        self.active_connections.remove(websocket)

    async def send_personal_message(self, message: str, websocket: WebSocket):
        await websocket.send_text(message)

    async def broadcast(self, data: str):
        for connection in self.active_connections:
            await connection.send_json(data)


manager = ConnectionManager()


@app.websocket("/game")
async def websocket_endpoint(websocket: WebSocket):
    await manager.connect(websocket)
    try:
        while True:
            data = await websocket.receive_json()
            await websocket.send_json(data)
    except WebSocketDisconnect:
        manager.disconnect(websocket)