export default function currentTurn() {
    if (!sessionStorage.current_player) return '';
    else if (sessionStorage.current_player === sessionStorage.player) {
      return `Your turn`;
    }
    else {
      return `Enemy turn`
    }
  }