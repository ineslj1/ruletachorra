const input = document.getElementById('nombre-input');
const agregarBtn = document.getElementById('agregar');
const ruleta = document.getElementById('ruleta');
const sortearBtn = document.getElementById('sortear');
const mensaje = document.getElementById('mensaje-ganador');

let nombres = [];
let disponibles = [];
let rotacionTotal = 0;
// Lista de monigotes PNG kawaii (debes tenerlos en assets/img/monigotes/)
const monigotes = [
  "uno.png",
  "dos.png",
  "tres.png",
  "cuatro.png",
  "cinco.png",
  "seis.png",
  "siete.png",
  "ocho.png",
  "nueve.png",
];


function renderRuleta() {
  ruleta.innerHTML = "";
  const n = disponibles.length;
  if (n === 0) return;

  const anguloPorSegmento = 360 / n;

  disponibles.forEach((nombre, i) => {
    const seg = document.createElement("div");
    seg.className = "segmento";

    const angulo = i * anguloPorSegmento;
    const icon = monigotes[i % monigotes.length];

    // Necesario para que el contenido quede derecho
    seg.style.setProperty("--segment-rotation", `${anguloPorSegmento}deg`);

    seg.style.transform = `rotate(${angulo}deg)`;

    seg.style.background = `hsl(${(i * 360) / n}, 70%, 85%)`;

    seg.innerHTML = `
      <div class="segmento-content">
        <img src="assets/img/monigotes/${icon}" class="icono-kawaii">
        <span>${nombre}</span>
      </div>
    `;

    ruleta.appendChild(seg);
  });
}

function mostrarGanador(nombre) {
  mensaje.textContent = `🎉 ¡El ganador es: ${nombre}! 🎉`;
  mensaje.style.transform = 'scale(1.2)';
  setTimeout(() => mensaje.style.transform = 'scale(1)', 500);
}

// Agregar nombre
agregarBtn.addEventListener('click', () => {
  const nombre = input.value.trim();
  if (nombre && !nombres.includes(nombre)) {
    nombres.push(nombre);
    disponibles.push(nombre);
    renderRuleta();
    input.value = '';
    input.focus();
  }
});

// Enter para agregar
input.addEventListener('keypress', e => {
  if (e.key === 'Enter') agregarBtn.click();
});

// Sortear
sortearBtn.addEventListener('click', () => {
  const n = disponibles.length;
  if (n === 0) {
    mostrarGanador('¡Todos los nombres ya han sido elegidos! 🎀');
    return;
  }

  const ganadorIndex = Math.floor(Math.random() * n);
  const ganador = disponibles[ganadorIndex];

  const anguloPorSegmento = 360 / n;

  // Girar varias vueltas + posición del ganador
  const vueltas = Math.floor(Math.random() * 5) + 5; // 5 a 9 vueltas
  const anguloDestino = vueltas * 360 + anguloPorSegmento * ganadorIndex + anguloPorSegmento / 2;

  rotacionTotal += anguloDestino;

  // Duración más lenta: 6s
  ruleta.style.transition = 'transform 6s cubic-bezier(0.33, 1, 0.68, 1)';
  ruleta.style.transform = `rotate(${rotacionTotal}deg)`;

  setTimeout(() => {
    // eliminar ganador
    disponibles.splice(ganadorIndex, 1);
    renderRuleta();
    mostrarGanador(ganador);
  }, 6200); // coincide con la duración de la animación
});

renderRuleta();
