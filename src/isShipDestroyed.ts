type Coordinate = [number, number];
type Direction = "x" | "y" | null;

export default function isShipDestroyed(
    selectedCoordinate: Coordinate,
    field: number[][],
    selectedList: Coordinate[],
    visited: number[][] | null = null,
    direction: Direction = null
): boolean {
    const [x, y] = selectedCoordinate;

    if (!visited) {
        selectedList.push(selectedCoordinate)
        visited = [selectedCoordinate]
        if (
            (x > 0 && isShipDestroyed([x - 1, y], field, selectedList, visited, "x")) ||
            (x < 9 && isShipDestroyed([x + 1, y], field, selectedList, visited, "x")) ||
            (y > 0 && isShipDestroyed([x, y - 1], field, selectedList, visited, "y")) ||
            (y < 9 && isShipDestroyed([x, y + 1], field, selectedList, visited, "y"))
        ) return false;
        else return true;
    }

    else if (visited) {
        const a = JSON.stringify(visited)
        const b = JSON.stringify(selectedCoordinate)
        const c = a.indexOf(b)
        if (c === -1) return false;

        if (direction === "x") {
            (x > 0 && isShipDestroyed([x - 1, y], field, selectedList, visited, "x")) ||
            (x < 9 && isShipDestroyed([x + 1, y], field, selectedList, visited, "x"))
        }

        else if (direction === "y") {
            (y > 0 && isShipDestroyed([x, y - 1], field, selectedList, visited, "y")) ||
            (y < 9 && isShipDestroyed([x, y + 1], field, selectedList, visited, "y"))
        }
    }



    // Помечаем текущую клетку как посещенную
    visited[x][y] = true;

    // Проверка, что корабль не разрушен
    if (fieldMatrix[x][y] === 1) {
        // Проверяем клетки вокруг выбранной на предмет других частей корабля
        if (
            (x > 0 && isShipDestroyed([x - 1, y], fieldMatrix, selectedCoordinates, visited)) ||
            (x < 9 && isShipDestroyed([x + 1, y], fieldMatrix, selectedCoordinates, visited)) ||
            (y > 0 && isShipDestroyed([x, y - 1], fieldMatrix, selectedCoordinates, visited)) ||
            (y < 9 && isShipDestroyed([x, y + 1], fieldMatrix, selectedCoordinates, visited))
        ) {
            return false;
        }
    }

    // Добавляем текущую координату в массив уже выбранных клеток
    selectedCoordinates.push([x, y]);

    return true;
}

// Пример использования функции
const field: number[][] = [
    // ваше поле здесь
];

const visited: boolean[][] = Array.from({ length: 10 }, () => Array(10).fill(false));

const selectedCoordinates: Coordinate[] = [];
const selectedCoordinate: Coordinate = [3, 7];

const isDestroyed = isShipDestroyed(selectedCoordinate, field, selectedCoordinates, visited);

console.log(`Корабль разрушен: ${isDestroyed}`);
