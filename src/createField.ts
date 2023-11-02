const numberOfRows: number = 10;
const numberOfColumns: number = 10;

const field: number[][] = new Array(10);
for (let i = 0; i < 10; i++) {
    field[i] = new Array(10).fill(0);
}

sessionStorage.setItem("your_field", JSON.stringify(field));

function handleClick(event: MouseEvent) {
    const cell = event.target as HTMLDivElement;
    const cellRow: number = parseInt(cell.dataset.row || "0", 10);
    const cellCol: number = parseInt(cell.dataset.col || "0", 10);

    const storedField: number[][] = JSON.parse(sessionStorage.getItem("your_field") || "[]");
    if (!(cell.dataset.ship === "1")) {
        cell.setAttribute("data-ship", "1");
        storedField[cellRow][cellCol] = 1;
        cell.classList.add("active");
    } else {
        cell.setAttribute("data-ship", "0");
        storedField[cellRow][cellCol] = 0;
        cell.classList.remove("active");
    }
    sessionStorage.setItem("your_field", JSON.stringify(storedField));
}

export default async function createField(fieldParent: Element, field: number[][] | null = null, who: string = "you") {
    if (who === 'enemy') {
        for (let row = 0; row < numberOfRows; row++) {
            for (let col = 0; col < numberOfColumns; col++) {
                const cell = document.createElement('div');
                cell.className = 'cell enemy prepare';
                fieldParent.appendChild(cell);
            }
        }
    } else if (who === 'you' && field) {
        for (let row = 0; row < numberOfRows; row++) {
            for (let col = 0; col < numberOfColumns; col++) {
                const cell = document.createElement('div');
                cell.className = 'cell your';
                cell.dataset.coords = JSON.stringify([row, col]);
                cell.onclick = () => false;

                if (field[row][col] > 0) {
                    cell.setAttribute("data-ship", '1');
                    cell.className = 'cell your active';
                }
                fieldParent.appendChild(cell);
            }
        }
    } else {
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
