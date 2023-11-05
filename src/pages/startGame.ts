import { createElement, Dot, X } from 'lucide'
import createField from "../functions/createField";
import setEnemyField from "../functions/setEnemyField";
import currentTurn from "../functions/currentTurn";
import htmlApp from '../htmlApp';
import isShipDestroyed from '../functions/isShipDestroyed';
import addDotsOnDestroyShips from '../functions/addDotsOnDestroyShip';
import startMenu from './startMenu';

let turnText = document.querySelector(".turn");
const checkList: any = [];
let cellsWithoutShip: any = []

let gameId = 0;
if (sessionStorage.game_id) {
  gameId = parseInt(sessionStorage.game_id)
}

export default function startGame(field: number[][], theme:string) {

  function togglePlayer() {
    sessionStorage.current_player = Math.abs(1 - parseInt(sessionStorage.current_player)).toString()
    if (turnText) turnText.innerHTML = `
      <p>${currentTurn()}</p>
    `
  }

  function turn() {

    const enemyCells = document.querySelectorAll('.enemy')

    enemyCells.forEach((elem) => {
      (elem as HTMLElement).onclick = checkShip;
    })

  }

  function checkShip(event: MouseEvent) {

    const cell = event.target as HTMLDivElement

    if (cell.dataset.clicked || !cell.dataset.coords) {
      return;
    }

    cell.dataset.clicked = "1";

    const enemyCells = document.querySelectorAll('.enemy')

    if (cell.dataset.ship === '1') {
      const checkedShip = createElement(X)
      cell.appendChild(checkedShip)
      cell.className = 'cell enemy ship'
      const coords = JSON.parse(cell.dataset.coords)
      const shipDestroyed = isShipDestroyed(coords, JSON.parse(sessionStorage.enemy_field).enemy_field, checkList, cellsWithoutShip);
      if (shipDestroyed) {
        ws.send(JSON.stringify({
          "destroyedShip": cellsWithoutShip
        }))
        cellsWithoutShip = []
        if (!sessionStorage.getItem("destroyed_count"))
          sessionStorage.setItem("destroyed_count", "1");
        else
          sessionStorage.destroyed_count = (parseInt(sessionStorage.destroyed_count)+1).toString();
        
        if (sessionStorage.destroyed_count === "10") {
          alert("You won!")
          ws.close()
          startMenu();
        }
      }
      if (ws.OPEN) {
        ws.send(JSON.stringify({
          "isShip": true,
          "coords": cell.dataset.coords
        }))

      }
    }

    else {

      const checkedDot = createElement(Dot)
      cell.className = 'cell enemy dot'
      cell.appendChild(checkedDot);
      enemyCells.forEach((elem) => {
        (elem as HTMLElement).onclick = null;
      });

      if (ws.OPEN) {
        ws.send(cell.dataset.coords)
        togglePlayer()
      }

    }
  }

  htmlApp('game', theme)

  const yourField = document.querySelector('.your-field');
  const enemyField = document.querySelector('.enemy-field');

  if (yourField) createField(yourField, field);

  let ws = new WebSocket(`ws://localhost:8000/game/${gameId}`);


  turnText = document.querySelector(".turn");
  ws.addEventListener("open", () => {
    ws.send(sessionStorage.your_field);

    ws.onmessage = async (e) => {
      const response = await JSON.parse(e.data);

      if (response.enemy_field) {
        sessionStorage.setItem("enemy_field", JSON.stringify(response));
        sessionStorage.setItem("player", response.player);
        setEnemyField(response.enemy_field);
      }

      
      else if (response.message === 'disconnect') {
        alert("The opponent left")
        ws.close();
        startMenu();
      }

      else if (response.message === 'move') {
        if (sessionStorage.current_player !== sessionStorage.player) {

          togglePlayer();
        }
        turn()
      }

      else if (response.init) {
        if (response.message != "Waiting for another player") {
          sessionStorage.setItem("current_player", "0")
          if (turnText) turnText.innerHTML = `
              <p>${currentTurn()}</p>
          `
        }
      }

      else if (response.isShip) {
        const selectedCell = document.querySelector(`[data-coords="${response.coords}"]`) as HTMLElement;
        const checkedShip = createElement(X);
        selectedCell.appendChild(checkedShip);
        selectedCell.className = 'cell ship';
      }

      else if (response.coords) {
        const selectedCell = document.querySelector(`[data-coords="${response.coords.text}"]`) as HTMLElement;
        if (!selectedCell.classList.contains("dot")) {
          selectedCell.classList.add("dot")
          const checkedDot = createElement(Dot);
          selectedCell.appendChild(checkedDot);
        }

      }

      else if (response.destroyedShip) {
        addDotsOnDestroyShips(JSON.parse(response.destroyedShip.text).destroyedShip, "you");
        if (!sessionStorage.getItem("destroyed_your_count"))
          sessionStorage.setItem("destroyed_your_count", "1");
        else
          sessionStorage.destroyed_your_count = (parseInt(sessionStorage.destroyed_your_count)+1).toString()

          
        if (sessionStorage.destroyed_your_count === "10") {
          alert("You lose");
          ws.close();
          startMenu();
        }
      }
    }
  });

  if (enemyField) createField(enemyField, null, "enemy");
}
