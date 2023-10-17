import { createElement, Dot, X } from 'lucide'
import createField from "./createField";
import setEnemyField from "./setEnemyField";
import currentTurn from "./currentTurn";
import setPlayerText from './setPlayerText';
import htmlApp from './htmlApp';

let turnText = document.querySelector(".turn");

export default function startGame(field: number[][]) {

  function togglePlayer() {
    sessionStorage.current_player = Math.abs(1 - parseInt(sessionStorage.current_player)).toString()
    if (turnText) turnText.innerHTML = `
      <p>${currentTurn(parseInt(sessionStorage.current_player))}</p>
    `
  }

  function turn() {

    const enemyCells = document.querySelectorAll('.enemy')

    enemyCells.forEach((elem) => {
      (elem as HTMLElement).onclick = checkShip;
    })




  }

  function checkShip(event: any) {

    if (event.target.dataset.clicked) {
      return;
    }

    const enemyCells = document.querySelectorAll('.enemy')

    enemyCells.forEach((elem) => {
      (elem as HTMLElement).onclick = null;
    });

    if (event.target.dataset.ship === '1') {
      const checkedShip = createElement(X)
      event.target.appendChild(checkedShip)
      event.target.className = 'cell enemy ship'
    }

    else {
      const checkedDot = createElement(Dot)
      event.target.appendChild(checkedDot);
    }

    event.target.dataset.clicked = true;
    if (ws.OPEN) {
      ws.send(event.target.dataset.coords)
      console.log("something sent");
      togglePlayer()
    }
  }

  htmlApp('game')

  const yourField = document.querySelector('.your-field');
  const enemyField = document.querySelector('.enemy-field');

  if (yourField) createField(yourField, field)

  let ws = new WebSocket("ws://localhost:8000/game");


  turnText = document.querySelector(".turn");
  ws.addEventListener("open", () => {
    ws.send(sessionStorage.your_field)

    ws.onmessage = async (e) => {
      const response = await JSON.parse(e.data)
      console.log(response);
      if (response.enemy_field) {
        console.log("It's work!!!");
        sessionStorage.setItem("enemy_field", JSON.stringify(response))
        sessionStorage.setItem("player", response.player)
        setEnemyField(response.enemy_field)
        setPlayerText()
      }

      else if (response.message === 'move') {
        console.log("Move!");
        if (sessionStorage.current_player !== sessionStorage.player) {
          
          togglePlayer()
        }
        turn()
        
      }

      else if (response.init) {
        console.log(response.player, response.message);
        if (response.message != "Waiting for another player") {
          sessionStorage.setItem("current_player", "0")
          if (turnText) turnText.innerHTML = `
              <p>${currentTurn(parseInt(sessionStorage.current_player))}</p>
          `
        }
      }

      else if (response.coords) {
        console.log("beda", response.coords);
        const selectedCell = document.querySelector(`[data-coords="${response.coords.text}"]`) as HTMLElement;
        if (selectedCell.dataset.ship === '1') {
          const checkedShip = createElement(X)
          selectedCell.appendChild(checkedShip)
          selectedCell.className = 'cell ship'
        }
    
        else {
          const checkedDot = createElement(Dot)
          selectedCell.appendChild(checkedDot);
        }

      }
    }
  });

  if (enemyField) createField(enemyField, null, "enemy")
}
