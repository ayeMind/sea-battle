import htmlApp from "../htmlApp";
import friendSearch from "./friendSearch";
import initShips from "./initShips";

export default function create(theme: string) {
    htmlApp("create", theme)
    const backBtn = document.querySelector<HTMLButtonElement>('.back');
    let ws = new WebSocket(`ws://localhost:8000/game/${sessionStorage.game_id}`);
    
    ws.addEventListener("open", () => {    
        ws.onmessage = async (e) => {
          const response = await JSON.parse(e.data);
          console.log(response);
          
          if (!response.init) {
            initShips(theme)
          }
        }
    }, true)

    if (backBtn) backBtn.addEventListener("click", () => {
        friendSearch(theme);
    }, true)
}