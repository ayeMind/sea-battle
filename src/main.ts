import './style.css';


const numberOfRows = 10;
const numberOfColumns = 10;

function createField(fieldParent: Element, field: number[][] | null = null) {

  if (field) {
    console.log(field);
    
    for (let row = 0; row < numberOfRows; row++) {
      for (let col = 0; col < numberOfColumns; col++) {
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'cell';
        

        //for some reason not all elements are 0 or 1
        if (field[row][col] > 0) {
          checkbox.checked = true;
        }

        fieldParent.appendChild(checkbox);

      }
    }
  }

  else {
    for (let row = 0; row < numberOfRows; row++) {
      for (let col = 0; col < numberOfColumns; col++) {
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'cell';
        checkbox.dataset.row = row.toString();
        checkbox.dataset.col = col.toString();
        checkbox.onchange = handleClick;
        fieldParent.appendChild(checkbox);
      }
    }
  }
}


function isEqual(array1: number[], array2: number[]) {
  return JSON.stringify(array1) === JSON.stringify(array2);
}


function validateBattlefield(yourField: number[][]) {
  const field = [...yourField]

  const hit = (row: number, col: number) =>
    (row < 0 || col < 0 || row > 9 || col > 9) ? 0 : field[row][col];

  for (var ships = [10, 0, 0, 0, 0], row = 0; row < 10; row++) {
    for (var col = 0; col < 10; col++) {
      if (hit(row, col)) {
        if (hit(row - 1, col - 1) || hit(row - 1, col + 1)) return false; // Corner is touching
        if (hit(row - 1, col) && hit(row, col - 1)) return false; // Side is touching
        if ((field[row][col] += hit(row - 1, col) + hit(row, col - 1)) > 4) return false; // Ship is too long
        ships[field[row][col]]++; ships[field[row][col] - 1]--;
      }
    }
  }
  return [0, 4, 3, 2, 1].every((s, i) => s == ships[i]);
}


const field = new Array(10);
for (let i = 0; i < 10; i++) {
  field[i] = new Array(10).fill(0);
}

function handleClick(event: any) {
  const cellRow = parseInt(event.target.dataset.row);
  const cellCol = parseInt(event.target.dataset.col);

  if (!event.target.checked) {
    field[cellRow][cellCol] = 0;
  }
  else {
    field[cellRow][cellCol] = 1;
  }
}

function startGame(field: number[][]) {
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
    </div>
  </div>
`;

  const yourField = document.querySelector('.your-field');
  const enemyField = document!.querySelector('.enemy-field');

  if (yourField) createField(yourField, field)
  if (enemyField) createField(enemyField)
}


function handleStart() {
  if (!validateBattlefield(field)) alert("ЭЭЭЭЭЭЭ! АХУЕЛ?")
  else {
    startGame(field)
  }

}

function initShips() {
  document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div class="main-container">
    <p class="title">Создай свою расстановку</p>   
    <div class="game">
      <div class="field">
      </div>
      <button class="start">Начать</button>
    </div>
  </div>
`;

  const btn = document.querySelector<HTMLButtonElement>('.start')
  if (btn) btn.addEventListener("click", () => {
    handleStart()
  })

  const field = document.querySelector('.field');
  if (field) createField(field)
}

initShips()