import createField from "./createField";

let currentPlayer: number;

function currentTurn(currentPlayer: number) {
  if (currentPlayer == null) return '';
  else if (currentPlayer == 0) return 'Ход первого игрока';
  else return 'Ход второго игрока'
}

export default function startGame(field: number[][]) {
  document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
    <div class="main-container">
      <p class="title">Морской бой</p>   
      <div class="game">
        <div class="flex-x-center">
          <p class="field-text">Ваше поле</p>
          <div class="field your-field">
          </div>
        </div>
  
        
        <div class="flex-x-center">
          <p class="field-text">Поле попуска</p>
          <div class="field enemy-field">
          </div>
        </div>
        <div class='turn'>
          <p>Ожидание второго игрока</p>
        </div>
      </div>
    </div>
  `;

  const yourField = document.querySelector('.your-field');
  const enemyField = document.querySelector('.enemy-field');

  if (yourField) createField(yourField, field)

  let ws = new WebSocket("ws://localhost:8000/game");

  function postField(field: any) {
    ws.send(field)
    console.log("send!");
  }


  const turnText = document.querySelector(".turn");
  ws.addEventListener("open", (event) => {
    ws.onmessage = (e) => {
      const response = JSON.parse(e.data)
      console.log(response);
      if (response.init) {
        console.log(response.player, response.message);
        if (response.message != "Waiting for another player") {
          const player = response.player;

          currentPlayer = 0
          if (turnText) turnText.innerHTML = `
              <p>${currentTurn(currentPlayer)}</p>
          `

          // if (player !== currentPlayer) {
          //   enemyTurn()
          // }
        }
      }

      function togglePlayer() {
        currentPlayer = Math.abs(1 - currentPlayer)
        if (turnText) turnText.innerHTML = `
          <p>${currentTurn(currentPlayer)}</p>
        `
      }

      // else {
      //   if (response.message === 'move') {
      //     togglePlayer()
      //   }
      // }

    }
    postField(sessionStorage.your_field);
  });

  console.log(sessionStorage.your_field);


  if (enemyField) createField(enemyField, null, "enemy")
}
