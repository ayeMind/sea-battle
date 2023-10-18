import { createElement, Dot } from 'lucide'

type Player = "you" | "enemy"

export default function addDotsOnDestroyShips(cellsWithoutShip: number[][], who: Player) {
    cellsWithoutShip.forEach((cell) => {
        const stringCell = JSON.stringify(cell)
        // console.log(cell);
        // console.log(stringCell);
        let queryCell;
        if (who === "enemy")
            queryCell = document.querySelector(`.enemy[data-coords="${stringCell}"]`);
        else if (who === "you")
            queryCell = document.querySelector(`.your[data-coords="${stringCell}"]`);
        if (queryCell!.classList.contains("dot")) {
            return true;
        }
        queryCell!.classList.add("dot");
        (queryCell as HTMLElement)!.onclick = null;
        const checkedDot = createElement(Dot);
        queryCell!.appendChild(checkedDot);

    })
}