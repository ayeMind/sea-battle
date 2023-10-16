import checkShip from "./checkShip";
import createField from "./createField";
import replaceEnemyField from "./replaceEnemyField";

let currentPlayer: number;
let enemyCells: NodeListOf<HTMLElement>;

function currentTurn(currentPlayer: number) {
  if (currentPlayer == null) return '';
  else if (currentPlayer == 0) {
    return `First player's turn`;
  }
  else {
    return `Second player's turn}`
  }
}

function checkPlayerId() {
  if (parseInt(sessionStorage.player) === 0) {
    document.querySelector('.player')!.innerHTML = `
      Your field (you first)
    `
  }

  else if (parseInt(sessionStorage.player) === 1) {
    document.querySelector('.player')!.innerHTML = `
      Your field (you second)
    `
  }
}

export default function startGame(field: number[][]) {
  document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
    <div class="main-container">
      <p class="title">Sea Battle</p>   
      <div class="game">
        <div class="flex-x-center">
          <p class="field-text player">Your field</p>
          <div class="field your-field">
          </div>
        </div>
  
        
        <div class="flex-x-center">
          <p class="field-text">Enemy field</p>
          <div class="field enemy-field">
          </div>
        </div>
        <div class='turn'>
          <p>Waiting for the second player</p>
        </div>
      </div>
    </div>
  `;

  const yourField = document.querySelector('.your-field');
  const enemyField = document.querySelector('.enemy-field');

  if (yourField) createField(yourField, field)

  let ws = new WebSocket("ws://localhost:8000/game");

  const turnText = document.querySelector(".turn");
  ws.addEventListener("open", (event) => {
    ws.send(sessionStorage.your_field)

    ws.onmessage = async (e) => {
      const response = await JSON.parse(e.data)
      console.log(response);
      if (response.enemy_field) {
        console.log("It's work!!!");
        sessionStorage.setItem("enemy_field", JSON.stringify(response))
        sessionStorage.setItem("player", response.player)
        replaceEnemyField(response.enemy_field)
        checkPlayerId()
        enemyCells = document.querySelectorAll('.enemy')
      }

      if (response.message === 'move') {
        console.log("Move!");
        turn()
      }

      if (response.init) {
        console.log(response.player, response.message);
        if (response.message != "Waiting for another player") {
          currentPlayer = 0
          if (turnText) turnText.innerHTML = `
              <p>${currentTurn(currentPlayer)}</p>
          `
        }
      }



      async function turn() {
        if (parseInt(sessionStorage.player) === currentPlayer) {
          enemyCells.forEach(element => {
            element.onclick = checkShip;
          });
        }

        else {
          enemyCells.forEach(element => {
            element.onclick = null;
          });
        }
      }

      function togglePlayer() {
        currentPlayer = Math.abs(1 - currentPlayer)
        if (turnText) turnText.innerHTML = `
          <p>${currentTurn(currentPlayer)}</p>
        `
      }


    }
  });

  console.log(sessionStorage.your_field);

  if (enemyField) createField(enemyField, null, "enemy")
}
