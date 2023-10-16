import createField from './createField.ts'
import validateField from './validateField.ts';
import startGame from './startGame.ts';

function handleStart() {
    
    if (!validateField(JSON.parse(sessionStorage.your_field))) {
      alert("Неправильная расстановка!")
      console.log(sessionStorage.your_field);
      
    }
    else {
      startGame(JSON.parse(sessionStorage.your_field))
    }
  }

export default function initShips() {
    document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
    <div class="main-container">
      <p class="title">Create your own arrangement</p>   
      <div class="game">
        <div class="field">
        </div>
        <button class="start">Start</button>
      </div>
    </div>
  `;
  
    const btn = document.querySelector<HTMLButtonElement>('.start')
    if (btn) btn.addEventListener("click", () => {
      handleStart()
    })
  
    const field = document.querySelector('.field');
    if (field) createField(field, null, "init")
  }