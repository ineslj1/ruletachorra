export function initParticles() {
    const canvas = document.getElementById("particle-canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = 500;
    canvas.height = 500;

    const particles = [];

    for (let i = 0; i < 40; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            r: 2 + Math.random() * 3,
            dx: (Math.random() - 0.5) * 0.6,
            dy: (Math.random() - 0.5) * 0.6
        });
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach(p => {
            ctx.beginPath();
            ctx.fillStyle = "rgba(255, 180, 240, 0.8)";
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fill();

            p.x += p.dx;
            p.y += p.dy;

            if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
            if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
        });

        requestAnimationFrame(animate);
    }

    animate();
}
