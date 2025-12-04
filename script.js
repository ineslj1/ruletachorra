// Elementos del DOM
const input = document.getElementById('nombre-input');
const agregarBtn = document.getElementById('agregar');
const sortearBtn = document.getElementById('sortear');
const mensaje = document.getElementById('mensaje-ganador');

const canvas = document.getElementById('ruletaCanvas');
const ctx = canvas.getContext('2d');

// Datos
let nombres = [];
let disponibles = [];
let rotacionTotal = 0;

// Monigotes PNG (en assets/img/monigotes/)
const monigotes = [
  "uno.png","dos.png","tres.png","cuatro.png","cinco.png",
  "seis.png","siete.png","ocho.png","nueve.png"
];

// Dimensiones del canvas
const cx = canvas.width / 2;
const cy = canvas.height / 2;
const radio = 290;

// Función para dibujar la ruleta
function renderRuleta() {
  const n = disponibles.length;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (n === 0) return;

  const step = (2 * Math.PI) / n;
  const cx = canvas.width / 2;
  const cy = canvas.height / 2;
  const r = 290;

  disponibles.forEach((nombre, i) => {
    const start = i * step;
    const end = start + step;

    // Dibujar sector
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, r, start, end);
    ctx.closePath();
    ctx.fillStyle = `hsl(${(i * 360) / n}, 70%, 80%)`;
    ctx.fill();
    ctx.strokeStyle = "#fff";
    ctx.lineWidth = 3;
    ctx.stroke();

    // Posición del contenido dentro del sector
    const mid = start + step / 2;
    const contentRadius = r * 0.6; // Más cerca del centro
    const ix = cx + Math.cos(mid) * contentRadius;
    const iy = cy + Math.sin(mid) * contentRadius;

    // Imagen kawaii
    const img = new Image();
    img.src = `assets/img/monigotes/${monigotes[i % monigotes.length]}`;
    img.onload = () => {
      ctx.save();
      ctx.translate(ix, iy - 10); // subimos un poco para dejar espacio al nombre
      ctx.drawImage(img, -30, -30, 60, 60);
      ctx.restore();
    };

    // Nombre
    ctx.save();
    ctx.translate(ix, iy + 35); // debajo de la imagen
    ctx.rotate(0); // texto horizontal
    ctx.textAlign = "center";
    ctx.font = "18px Comic Sans MS";
    ctx.fillStyle = "#333";
    ctx.fillText(nombre, 0, 0);
    ctx.restore();
  });
}


// Mostrar ganador
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

// Girar ruleta y seleccionar ganador
sortearBtn.addEventListener('click', () => {
  const n = disponibles.length;
  if (n === 0) {
    mostrarGanador('¡Todos los nombres ya han sido elegidos! 🎀');
    return;
  }

  const anguloPorSegmento = 360 / n;
  const vueltas = Math.floor(Math.random() * 5) + 5; // 5 a 9 vueltas

  // Elegimos un índice al azar
  const ganadorIndex = Math.floor(Math.random() * n);

  // Calculamos la rotación para que la flecha apunte al centro del sector elegido
  const anguloDestino = vueltas * 360 + anguloPorSegmento * ganadorIndex + anguloPorSegmento / 2;

  rotacionTotal += anguloDestino;

  // Rotación de la ruleta
  ruleta.style.transition = 'transform 6s cubic-bezier(0.33, 1, 0.68, 1)';
  ruleta.style.transform = `rotate(${rotacionTotal}deg)`;

  // Animación de flecha apuntando al ganador por 2s
  const flecha = document.querySelector('.flecha');
  flecha.style.transition = 'transform 0.5s ease';
  setTimeout(() => {
    mostrarGanador(disponibles[ganadorIndex]);

    // Flecha “celebra” 2s
    flecha.style.transform = 'translateX(-50%) translateY(-15px)';
    setTimeout(() => {
      flecha.style.transform = 'translateX(-50%) translateY(0)';
    }, 2000);

    // Eliminamos al ganador y renderizamos ruleta
    disponibles.splice(ganadorIndex, 1);
    renderRuleta();
  }, 6200); // coincide con la duración de la animación
});


// Render inicial
renderRuleta();
