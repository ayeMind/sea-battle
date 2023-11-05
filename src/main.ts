import './style.css';
import startMenu from './pages/startMenu';

sessionStorage.removeItem("player")
sessionStorage.removeItem("current_player")
sessionStorage.removeItem("destroyed_your_count")
sessionStorage.removeItem("destroyed_count")
sessionStorage.removeItem("game_id")

startMenu()