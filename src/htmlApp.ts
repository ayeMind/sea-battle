export default function htmlApp(state: string) {

    if (state === 'game') document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
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
  `
    else if (state === 'init') document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
    <div class="main-container">
      <p class="title">Create your own arrangement</p>   
      <div class="game">
        <div class="field">
        </div>
        <button class="start">Start</button>
      </div>
    </div>
  `;
}