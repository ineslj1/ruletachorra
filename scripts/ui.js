import { spawnChibis, pickRandomChibi } from "./summoner.js";

let loaded = false;

export function loadNamesUI() {
    const textarea = document.getElementById("name-input");
    const raw = textarea.value.trim();

    if (!raw) {
        updateStatus("⚠️ Debes escribir nombres!");
        return;
    }

    const names = raw.split("\n").map(n => n.trim()).filter(n => n);
    spawnChibis(names);

    loaded = true;
    document.getElementById("summon-btn").disabled = false;
    updateStatus("✨ Chibis cargados en la arena ✨");
}

export function summonOne() {
    if (!loaded) return;
    pickRandomChibi();
}

export function updateStatus(msg) {
    document.getElementById("status").textContent = msg;
}
