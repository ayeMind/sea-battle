import friendSearch from "./friendSearch";
import htmlApp from "../htmlApp";
import initShips from "./initShips";

type ThemeToggler = {
    "main-theme": "sub-theme",
    "sub-theme": "main-theme"
};

export default function startMenu() {

    let theme: "main-theme" | "sub-theme" = "main-theme";

    if (localStorage.getItem("theme") === 'sub-theme') {
        theme = "sub-theme";
    }

    htmlApp('menu', theme);

    const toggleTheme: ThemeToggler = {
        "main-theme": "sub-theme",
        "sub-theme": "main-theme"
    };
  
    const defaultBtn = document.querySelector<HTMLButtonElement>('.default-btn');
    const withFriendBtn = document.querySelector<HTMLButtonElement>('.with-friend-btn');
    const themeBtn = document.querySelector<HTMLButtonElement>('.theme-change');

    if (defaultBtn) defaultBtn.addEventListener("click", () => {
        initShips(theme);
    }, true)

    if (withFriendBtn) withFriendBtn.addEventListener("click", () => {
        friendSearch(theme)
    }, true)
    
    if (themeBtn) themeBtn.addEventListener("click", () => {
        const app = document.querySelector('.main-container');
        app?.classList.remove(theme);
        theme = toggleTheme[theme];
        app?.classList.add(theme);
        localStorage.setItem("theme", theme);
    }, true)
  
  }