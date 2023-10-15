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
    if (!event.target.checked) {
        newField[cellRow][cellCol] = 0
    }
    else {
        newField[cellRow][cellCol] = 1
    }
    sessionStorage.setItem("your_field", JSON.stringify(newField))
}


export default function createField(fieldParent: Element, field: number[][] | null = null) {

    // Game Field
    if (field) {
        console.log(field);

        for (let row = 0; row < numberOfRows; row++) {
            for (let col = 0; col < numberOfColumns; col++) {
                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.className = 'cell';
                checkbox.onclick = () => false;

                //for some reason not all elements are 0 or 1
                if (field[row][col] > 0) {
                    checkbox.checked = true;
                }

                fieldParent.appendChild(checkbox);
            }
        }
    }

    // Initializaion field
    else {
        for (let row = 0; row < numberOfRows; row++) {
            for (let col = 0; col < numberOfColumns; col++) {
                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.className = 'cell';
                checkbox.dataset.row = row.toString();
                checkbox.dataset.col = col.toString();
                checkbox.onchange = handleClick;
                fieldParent.appendChild(checkbox);
            }
        }
    }
}