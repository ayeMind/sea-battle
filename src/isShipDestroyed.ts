import { createElement, Dot } from 'lucide'

type Coordinate = [number, number];
type Direction = "right" | "top" | "left" | "down" | null;

function isInArray(arr1: Coordinate[], arr2: Coordinate) {
    return arr1.some(coord => coord[0] === arr2[0] && coord[1] === arr2[1]);
}

export default function isShipDestroyed(
    selectedCoordinate: Coordinate,
    field: number[][],
    checkList: Coordinate[],
    visited: Coordinate[] | null = null,
    direction: Direction = null,
    cellsWithoutShip: Coordinate[] = []
): boolean {
    let [row, col] = selectedCoordinate;
    
    if (!visited) {
        checkList.push(selectedCoordinate)
        visited = [selectedCoordinate]
        if (
            (row === 0 || isShipDestroyed([row - 1, col], field, checkList, visited, "top", cellsWithoutShip)) &&
            (row === 9 || isShipDestroyed([row + 1, col], field, checkList, visited, "down", cellsWithoutShip)) &&
            (col === 0 || isShipDestroyed([row, col - 1], field, checkList, visited, "left", cellsWithoutShip)) &&
            (col === 9 || isShipDestroyed([row, col + 1], field, checkList, visited, "right", cellsWithoutShip))
        ) {
            cellsWithoutShip.forEach((cell) => {
                const stringCell = JSON.stringify(cell)
                // console.log(cell);
                // console.log(stringCell);
                const queryCell = document.querySelector(`.enemy[data-coords="${stringCell}"]`);
                if (queryCell!.classList.contains("dot")) {
                    return true;
                }
                (queryCell as HTMLElement)!.onclick = null;
                const checkedDot = createElement(Dot);
                queryCell!.className = "cell enemy dot";
                queryCell!.appendChild(checkedDot);
                
            })
            return true;
        }
        else return false;
    }

    else if (visited) {
        if (isInArray(visited, selectedCoordinate)) {
            return false;
        }
        
        const cell = field[row][col];
        if (cell === 1) {
            if (!isInArray(checkList, selectedCoordinate)) {
                return false;
            }
        }

        else if (cell !== 1) {
            cellsWithoutShip.push(selectedCoordinate)
            if (direction === "left" || direction === "right") {
                if (row !== 0 && row !== 9) {
                    cellsWithoutShip.push([row + 1, col], [row - 1, col]);
                }
                else if (row !== 9) {
                    cellsWithoutShip.push([row - 1, col]);
                }
                else {
                    cellsWithoutShip.push([row + 1, col])
                }
            }

            if (direction === "down" || direction === "top") {
                if (col !== 0 && col !== 9) {
                    cellsWithoutShip.push([row, col + 1], [row, col - 1]);
                }
                else if (col !== 9) {
                    cellsWithoutShip.push([row, col - 1]);
                }
                else {
                    cellsWithoutShip.push([row, col + 1])
                }
            }

            return true;
        }

        if (row === 0 || (direction === "top" && isShipDestroyed([row - 1, col], field, checkList, visited, "top"))) {
            return true;
        }

        if (row === 9 || (direction === "down" && isShipDestroyed([row + 1, col], field, checkList, visited, "down"))) {
            return true;
        }

        if (col === 0 || (direction === "left" && isShipDestroyed([row, col - 1], field, checkList, visited, "left"))) {
            return true;
        }

        if (col === 9 || (direction === "right" && isShipDestroyed([row, col + 1], field, checkList, visited, "right"))) {
            return true;
        }
        
        
        }
    return false;
}