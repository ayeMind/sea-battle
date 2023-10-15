import checkShip from "./checkShip";

const numberOfRows = 10;
const numberOfColumns = 10;

const field = new Array(10);
for (let i = 0; i < 10; i++) {
    field[i] = new Array(10).fill(0);
}

sessionStorage.setItem("your_field", JSON.stringify(field))

function handleClick(event: any) {
    const cellRow = parseInt(event.target.dataset.row);
    const cellCol = parseInt(event.target.dataset.col);

    const newField = JSON.parse(sessionStorage.your_field)
    if (!(event.target.dataset.ship === "1")) {
        event.target.dataset.ship = "1"
        newField[cellRow][cellCol] = 1
        event.target.className = "cell active"
    }
    else {
        event.target.dataset.ship = "0"
        newField[cellRow][cellCol] = 0
        event.target.classList.remove("active")
    }
    sessionStorage.setItem("your_field", JSON.stringify(newField))
    // console.log(newField[cellRow][cellCol]);

}


export default async function createField(fieldParent: Element, field: number[][] | null = null, who: string = "you") {

    if (who === 'enemy') {
        const enemyFieldPromise = await fetch("http://127.0.0.1:8000/game?field_id=1")
        const response = await enemyFieldPromise.json()
        const enemyField = response.field
        console.log(enemyField);

        console.log("enemy", response.field);

        for (let row = 0; row < numberOfRows; row++) {
            for (let col = 0; col < numberOfColumns; col++) {
                const cell = document.createElement('div');
                cell.className = 'cell enemy';
                if (enemyField[row][col] === 1) {
                    cell.dataset.ship = '1'
                }

                cell.onclick = checkShip
                fieldParent.appendChild(cell);
            }
        }
    }
    // Game Field
    else if (who === 'you' && field) {

        console.log("your", field);

        for (let row = 0; row < numberOfRows; row++) {
            for (let col = 0; col < numberOfColumns; col++) {
                const cell = document.createElement('div');
                cell.className = 'cell';
                cell.onclick = () => false
                //for some reason not all elements are 0 or 1
                if (field[row][col] > 0) {
                    cell.dataset.ship = '1';
                    cell.className = 'cell active'
                }
                fieldParent.appendChild(cell);
            }
        }
    }

    // Initializaion field
    else {
        for (let row = 0; row < numberOfRows; row++) {
            for (let col = 0; col < numberOfColumns; col++) {
                const cell = document.createElement('div');
                cell.className = 'cell';
                cell.dataset.row = row.toString();
                cell.dataset.col = col.toString();
                cell.onclick = handleClick;
                fieldParent.appendChild(cell);

            }
        }
    }
}