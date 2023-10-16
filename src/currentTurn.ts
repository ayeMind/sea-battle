export default function currentTurn(currentPlayer: number) {
    if (currentPlayer == null) return '';
    else if (currentPlayer == 0) {
      return `First player's turn`;
    }
    else {
      return `Second player's turn`
    }
  }