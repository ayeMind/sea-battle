import htmlApp from "../htmlApp";
import startMenu from "./startMenu";
import create from "./create";
import join from "./join"

export default function friendSearch(theme: string) {
    htmlApp("friend", theme)    

    const createBtn = document.querySelector<HTMLButtonElement>('.create');
    const joinBtn = document.querySelector<HTMLButtonElement>('.join');
    const backBtn = document.querySelector<HTMLButtonElement>('.back');

    if (createBtn) createBtn.addEventListener("click", () => {
        create(theme);
    }, true)

    if (joinBtn) joinBtn.addEventListener("click", () => {
        join(theme)
    }, true)

    if (backBtn) backBtn.addEventListener("click", () => {
        startMenu();
    }, true)
}