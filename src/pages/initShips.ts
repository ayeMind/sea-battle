import createField from '../functions/createField.ts'
import validateField from '../functions/validateField.ts';
import startGame from './startGame.ts';
import htmlApp from '../htmlApp.ts';

function handleStart(theme: string) {
    
    if (!validateField(JSON.parse(sessionStorage.your_field))) {
      alert("Неправильная расстановка!")
      
    }
    else {
      startGame(JSON.parse(sessionStorage.your_field), theme)
    }
  }

export default function initShips(theme: string) {
    
    htmlApp('init', theme)
  
    const btn = document.querySelector<HTMLButtonElement>('.start')
    if (btn) btn.addEventListener("click", () => {
      handleStart(theme)
    }, true)
  
    const field = document.querySelector('.field');
    if (field) createField(field, null, "init")
  }