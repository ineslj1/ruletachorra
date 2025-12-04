const ruleta = document.getElementById('ruleta');
const boton = document.getElementById('girar');

boton.addEventListener('click', () => {
  const vueltas = Math.floor(Math.random() * 5) + 5; // entre 5 y 9 vueltas
  const angulo = Math.floor(Math.random() * 360); // ángulo final
  ruleta.style.transform = `rotate(${vueltas * 360 + angulo}deg)`;
});
