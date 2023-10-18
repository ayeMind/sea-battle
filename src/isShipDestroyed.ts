import addDotsOnDestroyShips from "./addDotsOnDestroyShip";

type Coordinate = [number, number];
type Direction = "right" | "top" | "left" | "down" | null;

function isInArray(arr1: Coordinate[], arr2: Coordinate) {
    return arr1.some(coord => coord[0] === arr2[0] && coord[1] === arr2[1]);
}

export default function isShipDestroyed(
    selectedCoordinate: Coordinate,
    field: number[][],
    checkList: Coordinate[],
    cellsToDot: Coordinate[],
    direction: Direction = null,
    isNotFirst = false,
): boolean {
    let [row, col] = selectedCoordinate;

    let correctDirections: Direction[] = [];
    function checkDotsCoords(row: number, col: number, onlyDirect: Direction = null, isFirst: boolean = false) {

        let y = row
        let x = col

        if (isFirst) {

            if (x > 0 && field[y][x - 1] === 1) correctDirections.push("left")
            if (x < 9 && field[y][x + 1] === 1) correctDirections.push("right")
            if (y > 0 && field[y - 1][x] === 1) correctDirections.push("top")
            if (y < 9 && field[y + 1][x] === 1) correctDirections.push("down")

            if (correctDirections.includes("left") || (correctDirections.includes("right"))) {
                if (y > 0) cellsToDot.push([y - 1, x])
                if (y < 9) cellsToDot.push([y + 1, x])
            }

            if (correctDirections.includes("top") || correctDirections.includes("down")) {
                if (x > 0) cellsToDot.push([y, x - 1])
                if (x < 9) cellsToDot.push([y, x + 1])
            }
            else {
                correctDirections.push("left", "top", "right", "down")
            }
        }


        for (let direct of correctDirections) {

            if (direct === "top" && (isFirst || onlyDirect === "top")) {
                if (y > 0 && field[y][x] === 1) {
                    if (x > 0) cellsToDot.push([y - 1, x - 1]);
                    if (x < 9) cellsToDot.push([y - 1, x + 1]);
                    if (field[y-1][x] !== 1) cellsToDot.push([y-1, x]);
                    
                    checkDotsCoords(y - 1, x, "top");
                }
            } else if (direct === "down" && (isFirst || onlyDirect === "down")) {
                if (y < 9 && field[y][x] === 1) {
                    if (x > 0) cellsToDot.push([y + 1, x - 1]);
                    if (x < 9) cellsToDot.push([y + 1, x + 1]);
                    if (field[y + 1][x] !== 1) cellsToDot.push([y+1, x]);
            
                    checkDotsCoords(y + 1, x, "down");
                }
            } else if (direct === "left" && (isFirst || onlyDirect === "left")) {
                if (x > 0 && field[y][x] === 1) {
                    if (y > 0) cellsToDot.push([y - 1, x - 1]);
                    if (y < 9) cellsToDot.push([y + 1, x - 1]);
                    if (field[y][x-1] !== 1) cellsToDot.push([y, x-1]);
                
                    checkDotsCoords(y, x - 1, "left");
                }
            } else if (direct === "right" && (isFirst || onlyDirect === "right")) {
                if (x < 9 && field[y][x] === 1) {
                    if (y > 0) cellsToDot.push([y - 1, x + 1]);
                    if (y < 9) cellsToDot.push([y + 1, x + 1]);
                    if (field[y][x+1] !== 1) cellsToDot.push([y, x+1]);
                 
                    checkDotsCoords(y, x + 1, "right");
                }
            }            
        }
    }

    // First approach (recursive) 
    if (!isNotFirst) {
        checkList.push(selectedCoordinate)  

        if ((row === 0 || isShipDestroyed([row - 1, col], field, checkList, cellsToDot, "top", true)) &&
            (row === 9 || isShipDestroyed([row + 1, col], field, checkList, cellsToDot, "down", true)) &&
            (col === 0 || isShipDestroyed([row, col - 1], field, checkList, cellsToDot, "left", true)) &&
            (col === 9 || isShipDestroyed([row, col + 1], field, checkList, cellsToDot, "right", true))) {

            checkDotsCoords(row, col, null, true)
            addDotsOnDestroyShips(cellsToDot, "enemy");
            return true;
        }
    }

    // Next approaches
    else if (isNotFirst) {

        if (field[row][col] !== 1) {
            return true;
        }

        else if (field[row][col] === 1) {

            if (!isInArray(checkList, [row, col])) {
                return false;
            }

            switch (direction) {
                case "top":
                    return row === 0 || isShipDestroyed([row - 1, col], field, checkList, cellsToDot, "top", true)
                case "down":
                    return row === 9 || isShipDestroyed([row + 1, col], field, checkList, cellsToDot, "down", true)
                case "left":
                    return col === 0 || isShipDestroyed([row, col - 1], field, checkList, cellsToDot, "left", true)
                case "right":
                    return col === 9 || isShipDestroyed([row, col + 1], field, checkList, cellsToDot, "right", true)
            }
        }
    }
    return false;
}