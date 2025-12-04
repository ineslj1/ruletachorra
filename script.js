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
let rotacionActual = 0;
let animando = false;

// Monigotes PNG
const monigotes = [
  "uno.png","dos.png","tres.png","cuatro.png","cinco.png",
  "seis.png","siete.png","ocho.png","nueve.png"
];

// Pre-cargar imágenes
const imgs = monigotes.map(src => {
  const img = new Image();
  img.src = `assets/img/monigotes/${src}`;
  return img;
});

// Dimensiones
const cx = canvas.width / 2;
const cy = canvas.height / 2;
const radio = 290;

// Dibujar ruleta con rotación
function renderRuleta(rotacion = 0) {
  const n = disponibles.length;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (n === 0) return;

  const step = (2 * Math.PI) / n;

  disponibles.forEach((nombre, i) => {
    const start = i * step + rotacion * Math.PI / 180;
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

    // Contenido sector
    const mid = start + step / 2;
    const contentRadius = radio * 0.6;
    const ix = cx + Math.cos(mid) * contentRadius;
    const iy = cy + Math.sin(mid) * contentRadius;

    // Imagen kawaii
    const img = imgs[i % imgs.length];
    ctx.save();
    ctx.translate(ix, iy - 10);
    ctx.drawImage(img, -30, -30, 60, 60);
    ctx.restore();

    // Nombre
    ctx.save();
    ctx.translate(ix, iy + 35);
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

// Easing cubic-out
function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}

// Girar ruleta
sortearBtn.addEventListener('click', () => {
  if (animando) return;
  const n = disponibles.length;
  if (n === 0) {
    mostrarGanador('¡Todos los nombres ya han sido elegidos! 🎀');
    return;
  }

  animando = true;

  const vueltas = Math.floor(Math.random() * 5) + 5;
  const anguloAleatorio = Math.random() * 360;
  const rotacionDestino = rotacionActual + vueltas * 360 + anguloAleatorio;
  const duracion = 6000;
  const inicio = performance.now();

  const flecha = document.querySelector('.flecha');
  flecha.style.transition = 'transform 0.5s ease';

  function animar(time) {
    let t = (time - inicio) / duracion;
    t = Math.min(t, 1);
    const eased = easeOutCubic(t);
    const anguloActual = rotacionActual + (rotacionDestino - rotacionActual) * eased;
    renderRuleta(anguloActual);

    if (t < 1) requestAnimationFrame(animar);
    else {
      // Determinar ganador exacto según la flecha arriba
      const anguloFinal = (rotacionDestino % 360 + 360) % 360; // 0-360
      const anguloPorSegmento = 360 / n;
      // La flecha apunta arriba: ajustamos
      const indexGanador = Math.floor(((360 - anguloFinal + anguloPorSegmento / 2) % 360) / anguloPorSegmento);
      const ganador = disponibles[indexGanador];

      mostrarGanador(ganador);

      // Flecha celebra 2s
      flecha.style.transform = 'translateX(-50%) translateY(-15px)';
      setTimeout(() => {
        flecha.style.transform = 'translateX(-50%) translateY(0)';
      }, 2000);

      // Eliminar ganador y actualizar ruleta
      disponibles.splice(indexGanador, 1);
      rotacionActual = rotacionDestino % 360;
      renderRuleta(rotacionActual);
      animando = false;
    }
  }

  requestAnimationFrame(animar);
});

// Render inicial
renderRuleta(rotacionActual);
