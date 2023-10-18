import json
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
class ConnectionManager:
    def __init__(self):
        self.active_connections: list[WebSocket] = []
        self.firstField = None
        self.secondField = None

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

                self.firstField = await websocket.receive_json()
                
            else:
                await websocket.send_json({
                    'init': True,
                    'player': 1,
                    'message': 'Ready?'
                })

                self.secondField = await websocket.receive_json()
                await websocket.send_json({
                    "player": 1,
                    "enemy_field": self.firstField
                })

                await self.active_connections[0].send_json({
                    "player": 0,
                    "enemy_field": self.secondField
                })  

                await self.active_connections[0].send_json({
                    'init': True,
                    'player': 0,
                    'message': 'you turns'
                })

                await self.active_connections[0].send_json({
                    'init': False,
                    'player': 0,
                    'message': 'move'
                })


    def disconnect(self):
        for connection in self.active_connections:
            self.active_connections.remove(connection)

    async def send_coords(self, message: str, websocket: WebSocket):
        await websocket.send_json({
            "coords": message
        })

    async def send_coords_with_ship(self, message: dict, websocket: WebSocket):
        await websocket.send_json({
            "isShip": True,
            "coords": json.loads(message.get("text")).get("coords")
        })

    async def send_destroyed_ships(self, message, websocket: WebSocket):
        await websocket.send_json({
            "destroyedShip": message
        })


manager = ConnectionManager()

@app.websocket("/game")
async def websocket_endpoint(websocket: WebSocket):
    await manager.connect(websocket) 

    try:
        while True:
            data = await websocket.receive()
            # await manager.broadcast(data)
            if len(manager.active_connections) == 2:
                 
                if manager.active_connections[0] == websocket:
                    enemyWebsocket = manager.active_connections[1]
                else:
                    enemyWebsocket = manager.active_connections[0]

            if isinstance(json.loads(data.get("text")), dict) and json.loads(data.get("text")).get("coords"):
                await manager.send_coords_with_ship(data, enemyWebsocket)
            
            elif isinstance(json.loads(data.get("text")), dict):
                await manager.send_destroyed_ships(data, enemyWebsocket)
                
            else:
                await manager.send_coords(data, enemyWebsocket)
                await enemyWebsocket.send_json({
                    'init': False,
                    'message': 'move'
                })

    except WebSocketDisconnect:
        manager.disconnectAll()