const input = document.getElementById('nombre-input');
const agregarBtn = document.getElementById('agregar');
const ruleta = document.getElementById('ruleta');
const sortearBtn = document.getElementById('sortear');
const mensaje = document.getElementById('mensaje-ganador');

let nombres = [];
let disponibles = [];
let rotacionTotal = 0;

function renderRuleta() {
  ruleta.innerHTML = '';
  const n = disponibles.length;
  if (n === 0) return;

  // Redistribuir todos los segmentos disponibles
  disponibles.forEach((nombre, i) => {
    const angulo = 360 / n * i;
    const seg = document.createElement('div');
    seg.classList.add('segmento');
    seg.style.transform = `rotate(${angulo}deg) translateX(50%)`;
    seg.style.background = `hsl(${angulo}, 70%, 80%)`;
    seg.innerHTML = `<span>${nombre}</span>`;
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
  const anguloDestino = (Math.floor(Math.random() * 5) + 5) * 360 - (anguloPorSegmento * ganadorIndex + anguloPorSegmento / 2);

  rotacionTotal += anguloDestino;
  ruleta.style.transition = 'transform 4s cubic-bezier(0.33, 1, 0.68, 1)';
  ruleta.style.transform = `rotate(${rotacionTotal}deg)`;

  setTimeout(() => {
    // eliminar ganador
    disponibles.splice(ganadorIndex, 1);
    renderRuleta();
    mostrarGanador(ganador);
  }, 4200);
});

renderRuleta();
