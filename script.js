const startBtn = document.getElementById("startBtn");
const pickBtn = document.getElementById("pickBtn");
const nameInput = document.getElementById("nameInput");
const winnerDiv = document.getElementById("winner");
const remainingDiv = document.getElementById("remaining");
const inputSection = document.querySelector(".input-section");
const gameSection = document.querySelector(".game-section");

let names = [];
let remaining = [];
let charImages = [
    "assets/chars/char1.png",
    "assets/chars/char2.png",
    "assets/chars/char3.png",
    "assets/chars/char4.png"
];

// Comenzar juego
startBtn.addEventListener("click", () => {
    const lines = nameInput.value.split("\n").map(n => n.trim()).filter(n => n);
    if(lines.length === 0) return alert("Introduce al menos un nombre!");
    names = lines.map((name,i)=>({name, char: charImages[i % charImages.length]}));
    remaining = [...names];

    inputSection.classList.add("hidden");
    gameSection.classList.remove("hidden");

    renderRemaining();
    winnerDiv.innerHTML = "<p>🎲 Listo para jugar</p>";
});

// Elegir nombre al azar
pickBtn.addEventListener("click", () => {
    if(remaining.length === 0){
        winnerDiv.innerHTML = "<p>🏆 Todos han sido elegidos!</p>";
        return;
    }

    const index = Math.floor(Math.random() * remaining.length);
    const winner = remaining[index];
    remaining.splice(index,1); // lo eliminamos de la lista

    winnerDiv.innerHTML = `
        <img src="${winner.char}" alt="${winner.name}">
        <span>${winner.name}</span>
    `;

    renderRemaining();
});

// Renderizar lista de nombres restantes
function renderRemaining(){
    remainingDiv.innerHTML = "";
    remaining.forEach(item => {
        const span = document.createElement("span");
        span.className = "name-chip";
        span.textContent = item.name;
        remainingDiv.appendChild(span);
    });
}
