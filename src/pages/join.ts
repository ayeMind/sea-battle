import htmlApp from "../htmlApp";
import friendSearch from "./friendSearch";
import initShips from "./initShips";

export default function join(theme: string) {
    htmlApp("join", theme)
    const backBtn = document.querySelector<HTMLButtonElement>('.back');
    const joinBtn = document.querySelector<HTMLButtonElement>('.join');
    const input = document.querySelector<HTMLInputElement>('.input-id');

    if (joinBtn) joinBtn.addEventListener("click", () => {

        if (!input) return;

        let v = parseInt(input.value);
        if(v>=0 && v<=100000) {
            sessionStorage.setItem("game_id", input.value);
            let ws = new WebSocket(`ws://localhost:8000/game/${input.value}`);
            ws.addEventListener("open", () => {  
                ws.send("join")
                initShips(theme)
            });
        }
    })

    if (backBtn) backBtn.addEventListener("click", () => {
        friendSearch(theme);
    }, true)
}