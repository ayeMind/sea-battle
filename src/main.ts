import './style.css';
import initShips from './initShips'; 

sessionStorage.removeItem("player")
sessionStorage.removeItem("current_player")
sessionStorage.removeItem("destroyed_your_count")
sessionStorage.removeItem("destroyed_count")

initShips()