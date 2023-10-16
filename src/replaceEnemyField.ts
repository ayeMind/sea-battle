import checkShip from "./checkShip";

export default function replaceEnemyField(field: number[][]) {
    const numberOfColumns = 10
    const numberOfRows = 10
    const enemyField = document.querySelector('.enemy-field');

    if (!enemyField) return console.log("enemyField not founed");
    

    enemyField.querySelectorAll(".prepare").forEach((elem) => {
        elem.remove();
    })

    for (let row = 0; row < numberOfRows; row++) {
        for (let col = 0; col < numberOfColumns; col++) {
            const cell = document.createElement('div');
            cell.className = 'cell enemy';
            if (field[row][col] === 1) {
                cell.dataset.ship = '1'
            }
            cell.onclick = checkShip
            enemyField.appendChild(cell);
        }
    }
}