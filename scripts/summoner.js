let chibiElements = [];

export function spawnChibis(names) {
    const container = document.getElementById("chibi-container");
    container.innerHTML = "";
    chibiElements = [];

    const radius = 180;
    const center = 250;

    names.forEach((name, i) => {
        const angle = (i / names.length) * (2 * Math.PI);
        const x = center + radius * Math.cos(angle);
        const y = center + radius * Math.sin(angle);

        const el = document.createElement("div");
        el.classList.add("chibi");
        el.textContent = name;
        el.style.left = `${x - 30}px`;
        el.style.top = `${y - 15}px`;

        container.appendChild(el);
        chibiElements.push(el);
    });
}

export function pickRandomChibi() {
    if (chibiElements.length === 0) {
        alert("¡Todos los chibis han sido invocados!");
        return;
    }

    const chosen = chibiElements[Math.floor(Math.random() * chibiElements.length)];
    chosen.classList.add("selected");

    // sonido
    playSound("assets/sounds/summon.mp3");

    // remover tras animación
    setTimeout(() => {
        chosen.remove();
        chibiElements = chibiElements.filter(c => c !== chosen);
    }, 750);
}

function playSound(src) {
    const audio = new Audio(src);
    audio.volume = 0.6;
    audio.play();
}
