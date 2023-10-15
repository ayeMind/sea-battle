import createField from "./createField";

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
      </div>
    </div>
  `;    
  
    const yourField = document.querySelector('.your-field');
    const enemyField = document.querySelector('.enemy-field');
  
    if (yourField) createField(yourField, field)
    if (enemyField) createField(enemyField)
  }
