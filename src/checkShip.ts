import { createElement, Dot, X } from 'lucide'

export default async function checkShip(event: any) {
    if (event.target.dataset.ship === '1') {
        const checkedShip = createElement(X)
        event.target.appendChild(checkedShip)
        event.target.className = 'cell enemy ship'
    }

    else {
        const checkedDot = createElement(Dot)
        event.target.appendChild(checkedDot);
    }
    event.target.onclick = null;
}