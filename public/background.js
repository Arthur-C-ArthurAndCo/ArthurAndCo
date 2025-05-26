const canvas = document.getElementById('background');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const blobs = [];

for (let i = 0; i < 10; i++) {
  blobs.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: 100 + Math.random() * 150,
    dx: (Math.random() - 0.5) * 0.5,
    dy: (Math.random() - 0.5) * 0.5,
    color: `hsla(${Math.random() * 360}, 70%, 60%, 0.3)`
  });
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  blobs.forEach(blob => {
    ctx.beginPath();
    ctx.fillStyle = blob.color;
    ctx.filter = 'blur(80px)';
    ctx.arc(blob.x, blob.y, blob.radius, 0, Math.PI * 2);
    ctx.fill();

    blob.x += blob.dx;
    blob.y += blob.dy;

    if (blob.x - blob.radius < 0 || blob.x + blob.radius > canvas.width) blob.dx *= -1;
    if (blob.y - blob.radius < 0 || blob.y + blob.radius > canvas.height) blob.dy *= -1;
  });

  requestAnimationFrame(animate);
}

animate();

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});