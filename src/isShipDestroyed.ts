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
    direction: Direction = null
): boolean {
    let [x, y] = selectedCoordinate;
    console.log(x, y);
    
    if (!visited) {
        checkList.push(selectedCoordinate)
        visited = [selectedCoordinate]
        if (
            (x === 0 || isShipDestroyed([x - 1, y], field, checkList, visited, "left")) &&
            (x === 9 || isShipDestroyed([x + 1, y], field, checkList, visited, "right")) &&
            (y === 0 || isShipDestroyed([x, y - 1], field, checkList, visited, "top")) &&
            (y === 9 || isShipDestroyed([x, y + 1], field, checkList, visited, "down"))
        ) return true;
        else return false;
    }

    else if (visited) {
        if (isInArray(visited, selectedCoordinate)) {
            return false;
        }
        
        const cell = field[x][y];
        if (cell === 1) {
            if (!isInArray(checkList, selectedCoordinate)) {
                return false;
            }
        }

        else if (cell !== 1) {
            return true;
        }

        if (x === 0 || (direction === "left" && isShipDestroyed([x - 1, y], field, checkList, visited, "left"))) {
            return true;
        }

        if (x === 9 || (direction === "right" && isShipDestroyed([x + 1, y], field, checkList, visited, "right"))) {
            return true;
        }

        if (y === 0 || (direction === "down" && isShipDestroyed([x, y - 1], field, checkList, visited, "down"))) {
            return true;
        }

        if (y === 9 || (direction === "top" && isShipDestroyed([x, y + 1], field, checkList, visited, "top"))) {
            return true;
        }
        
        
        }
    return false;
}