const input = document.getElementById('nombre-input');
const agregarBtn = document.getElementById('agregar');
const ruleta = document.getElementById('ruleta');
const sortearBtn = document.getElementById('sortear');

let nombres = [];
let disponibles = [];
let rotacionTotal = 0;

function renderRuleta() {
  ruleta.innerHTML = '';
  const n = nombres.length;
  nombres.forEach((nombre, i) => {
    const angulo = 360 / n * i;
    const seg = document.createElement('div');
    seg.classList.add('segmento');
    seg.style.transform = `rotate(${angulo}deg) translateX(50%)`;
    seg.style.background = `hsl(${angulo}, 70%, 80%)`;
    seg.innerHTML = `<span>${nombre}</span>`;
    if (!disponibles.includes(nombre)) {
      seg.style.opacity = 0.4; // nombres ya elegidos
    }
    ruleta.appendChild(seg);
  });
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
  if (disponibles.length === 0) {
    alert('Todos los nombres ya han sido elegidos!');
    return;
  }

  const ganadorIndex = Math.floor(Math.random() * disponibles.length);
  const ganador = disponibles[ganadorIndex];
  const n = nombres.length;
  const indexGlobal = nombres.indexOf(ganador);
  const anguloPorSegmento = 360 / n;

  // Girar ruleta: varias vueltas completas + posición del ganador
  const vueltas = Math.floor(Math.random() * 5) + 5; // 5 a 9 vueltas
  const anguloDestino = vueltas * 360 - (anguloPorSegmento * indexGlobal + anguloPorSegmento/2);

  rotacionTotal += anguloDestino; // acumular rotación
  ruleta.style.transition = 'transform 4s cubic-bezier(0.33, 1, 0.68, 1)';
  ruleta.style.transform = `rotate(${rotacionTotal}deg)`;

  // Después de animación
  setTimeout(() => {
    disponibles.splice(ganadorIndex, 1); // eliminar del grupo disponible
    renderRuleta(); // actualizar ruleta
    alert(`🎉 ¡El ganador es: ${ganador}! 🎉`);
  }, 4200);
});

renderRuleta();
