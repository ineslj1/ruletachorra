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

  disponibles.forEach((nombre, i) => {
    const start = i * step;
    const end = start + step;

    // Sector
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, radio, start, end);
    ctx.closePath();
    ctx.fillStyle = `hsl(${(i * 360) / n}, 70%, 80%)`;
    ctx.fill();
    ctx.strokeStyle = "#fff";
    ctx.lineWidth = 3;
    ctx.stroke();

    // Imagen kawaii
    const mid = start + step / 2;
    const img = new Image();
    img.src = `assets/img/monigotes/${monigotes[i % monigotes.length]}`;
    img.onload = () => {
      const ix = cx + Math.cos(mid) * 160 - 30;
      const iy = cy + Math.sin(mid) * 160 - 30;
      ctx.drawImage(img, ix, iy, 60, 60);
    };

    // Nombre
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(mid);
    ctx.textAlign = "center";
    ctx.font = "20px Comic Sans MS";
    ctx.fillStyle = "#333";
    ctx.fillText(nombre, 120, 7);
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

  const step = 360 / n; // grados por sector
  const ganadorIndex = Math.floor(Math.random() * n);
  const ganador = disponibles[ganadorIndex];

  // Calculamos rotación para que la flecha apunte al ganador
  const vueltas = Math.floor(Math.random() * 5) + 5; // 5 a 9 vueltas
  const anguloDestino = vueltas * 360 + (360 - (ganadorIndex * step + step / 2));

  rotacionTotal += anguloDestino;

  // Animación de giro
  canvas.style.transition = 'transform 6s cubic-bezier(0.33, 1, 0.68, 1)';
  canvas.style.transform = `rotate(${rotacionTotal}deg)`;

  // Cuando termina la rotación
setTimeout(() => {
  // Eliminar ganador de disponibles
  disponibles.splice(ganadorIndex, 1);
  renderRuleta();
  mostrarGanador(ganador);

  const flecha = document.querySelector('.flecha');

  // Hacer que la flecha suba suavemente
  flecha.style.transition = 'transform 2s ease-out'; // 2 segundos
  flecha.style.transform = 'translateX(-50%) translateY(-15px)';

  // Después de 2 segundos vuelve suavemente
  setTimeout(() => {
    flecha.style.transform = 'translateX(-50%) translateY(0)';
  }, 2000);

}, 6200);

});

// Render inicial
renderRuleta();
