export default function htmlApp(state: string, theme = 'main-theme') {
  if (state === 'game')
    document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
    <div class="main-container ${theme}">
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
  else if (state === 'init')
    document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
    <div class="main-container ${theme}">
      <p class="title">Create your own arrangement</p>   
      <div class="game">
        <div class="field">
        </div>
        <button class="start">Start</button>
      </div>
    </div>
  `;
  else if (state === 'menu')
    document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div class="main-container ${theme}">
    <h1 class="title">Sea Battle</h1>   
    <div class="menu">
      <button class="start-btn default-btn">Random opponent</button>
      <button class="start-btn with-friend-btn">With friend</button>
      <button class="theme-change">Change theme</button>
    </div>
  </div>
`;
  else if (state === 'friend')
  document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
<div class="main-container ${theme}">
  <h1 class="title">Sea Battle</h1>   
  <div class="menu">
    <button class="start-btn create">Create</button>
    <button class="start-btn join">Join</button>
    <button class="theme-change back">Back</button>
  </div>
</div>
`;

else if (state === 'create') {
  const gameId = JSON.stringify(Math.floor(Math.random() * 100000));
  sessionStorage.setItem("game_id", gameId);

  document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
<div class="main-container ${theme}">
  <h1 class="title">Sea Battle</h1>   
  <div class="menu">
    <p class='text-xl'>Game ID: ${gameId}</p>
    <p class='text-xl'>Waiting your friend...</p>
    <button class="theme-change back">Back</button>
  </div>
</div>
`;
}

else if (state === 'join') {
  document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
<div class="main-container ${theme}">
  <h1 class="title">Sea Battle</h1>   
    <form class="menu">
      <label class='text-xl'>Input Game ID</label>
      <input class='input-id' type='text' minlength='1' maxlength='6' />
      <button type='button' class="join">Join</button>
    </form>
    <button class="theme-change back">Back</button>
</div>
`;
}
}
