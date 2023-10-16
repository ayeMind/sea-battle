import createField from './createField.ts'
import validateField from './validateField.ts';
import startGame from './startGame.ts';
import htmlApp from './htmlApp.ts';

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
    
    htmlApp('init')
  
    const btn = document.querySelector<HTMLButtonElement>('.start')
    if (btn) btn.addEventListener("click", () => {
      handleStart()
    })
  
    const field = document.querySelector('.field');
    if (field) createField(field, null, "init")
  }