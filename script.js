const input = document.getElementById('nombre-input');
const agregarBtn = document.getElementById('agregar');
const ruleta = document.getElementById('ruleta');
const sortearBtn = document.getElementById('sortear');
const container = document.querySelector('.container');

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
    // Si el nombre ya fue elegido, se atenúa
    if (!disponibles.includes(nombre)) {
      seg.style.opacity = 0.3;
      seg.style.filter = 'grayscale(80%)';
    }
    ruleta.appendChild(seg);
  });
}

// Mostrar ganador en la interfaz (mensaje kawaii)
function mostrarGanador(nombre) {
  let mensaje = document.getElementById('mensaje-ganador');
  if (!mensaje) {
    mensaje = document.createElement('div');
    mensaje.id = 'mensaje-ganador';
    mensaje.style.margin = '20px 0';
    mensaje.style.fontSize = '1.5em';
    mensaje.style.color = '#ff1493';
    mensaje.style.fontWeight = 'bold';
    mensaje.style.transition = 'transform 0.3s';
    container.appendChild(mensaje);
  }
  mensaje.textContent = `🎉 ¡El ganador es: ${nombre}! 🎉`;
  mensaje.style.transform = 'scale(1.2)';
  setTimeout(() => {
    mensaje.style.transform = 'scale(1)';
  }, 500);
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
    mostrarGanador('¡Todos los nombres ya han sido elegidos! 🎀');
    return;
  }

  const ganadorIndex = Math.floor(Math.random() * disponibles.length);
  const ganador = disponibles[ganadorIndex];
  const n = nombres.length;
  const indexGlobal = nombres.indexOf(ganador);
  const anguloPorSegmento = 360 / n;

  // Girar ruleta: varias vueltas + posición del ganador
  const vueltas = Math.floor(Math.random() * 5) + 5;
  const anguloDestino = vueltas * 360 - (anguloPorSegmento * indexGlobal + anguloPorSegmento / 2);

  rotacionTotal += anguloDestino;
  ruleta.style.transition = 'transform 4s cubic-bezier(0.33, 1, 0.68, 1)';
  ruleta.style.transform = `rotate(${rotacionTotal}deg)`;

  // Después de animación
  setTimeout(() => {
    // Eliminar del grupo disponible
    disponibles.splice(ganadorIndex, 1);
    renderRuleta();
    mostrarGanador(ganador);
  }, 4200);
});

renderRuleta();
