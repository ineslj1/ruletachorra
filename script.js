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
let rotacionActual = 0; // grados
let animando = false;

// Monigotes PNG (en assets/img/monigotes/)
const monigotes = [
  "uno.png","dos.png","tres.png","cuatro.png","cinco.png",
  "seis.png","siete.png","ocho.png","nueve.png"
];

// Dimensiones del canvas
const cx = canvas.width / 2;
const cy = canvas.height / 2;
const radio = 290;

// Dibujar ruleta rotada
function renderRuleta(rotacion = 0) {
  const n = disponibles.length;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (n === 0) return;

  const step = (2 * Math.PI) / n;

  disponibles.forEach((nombre, i) => {
    const start = i * step + rotacion * Math.PI / 180;
    const end = start + step;

    // Dibujar sector
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, radio, start, end);
    ctx.closePath();
    ctx.fillStyle = `hsl(${(i * 360) / n}, 70%, 80%)`;
    ctx.fill();
    ctx.strokeStyle = "#fff";
    ctx.lineWidth = 3;
    ctx.stroke();

    // Posición del contenido dentro del sector
    const mid = start + step / 2;
    const contentRadius = radio * 0.6;
    const ix = cx + Math.cos(mid) * contentRadius;
    const iy = cy + Math.sin(mid) * contentRadius;

    // Imagen kawaii
    const img = new Image();
    img.src = `assets/img/monigotes/${monigotes[i % monigotes.length]}`;
    img.onload = () => {
      ctx.save();
      ctx.translate(ix, iy - 10);
      ctx.drawImage(img, -30, -30, 60, 60);
      ctx.restore();
    };

    // Nombre
    ctx.save();
    ctx.translate(ix, iy + 35);
    ctx.rotate(0);
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
    renderRuleta(rotacionActual);
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
  if (animando) return;
  const n = disponibles.length;
  if (n === 0) {
    mostrarGanador('¡Todos los nombres ya han sido elegidos! 🎀');
    return;
  }

  animando = true;
  const anguloPorSegmento = 360 / n;
  const vueltas = Math.floor(Math.random() * 5) + 5;
  const ganadorIndex = Math.floor(Math.random() * n);

  const rotacionDestino = rotacionActual + vueltas * 360 + anguloPorSegmento * ganadorIndex + anguloPorSegmento / 2;
  const duracion = 6000; // ms
  const inicio = performance.now();

  const flecha = document.querySelector('.flecha');
  flecha.style.transition = 'transform 0.5s ease';

  function animar(time) {
    const t = Math.min((time - inicio) / duracion, 1);
    const eased = t < 0.5 ? 4*t*t*t : (t-1)*(2*t-2)*(2*t-2)+1; // easing
    rotacionActual = rotacionActual + (rotacionDestino - rotacionActual) * eased;
    renderRuleta(rotacionActual);

    if (t < 1) {
      requestAnimationFrame(animar);
    } else {
      // Mostrar ganador y animar flecha 2s
      mostrarGanador(disponibles[ganadorIndex]);
      flecha.style.transform = 'translateX(-50%) translateY(-15px)';
      setTimeout(() => {
        flecha.style.transform = 'translateX(-50%) translateY(0)';
      }, 2000);

      // Eliminar ganador y actualizar ruleta
      disponibles.splice(ganadorIndex, 1);
      renderRuleta(rotacionActual);
      animando = false;
    }
  }

  requestAnimationFrame(animar);
});

// Render inicial
renderRuleta(rotacionActual);
