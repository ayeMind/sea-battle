
export default function setEnemyField(field: number[][]) {
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
            cell.dataset.coords = JSON.stringify([row, col])
            cell.className = 'cell enemy';
            if (field[row][col] === 1) {    
                cell.dataset.ship = '1'
            }
            enemyField.appendChild(cell);
        }
    }
}