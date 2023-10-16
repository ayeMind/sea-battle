export default function setPlayerText() {
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