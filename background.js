const canvas = document.getElementById('background-grid');
const ctx = canvas.getContext('2d');
let mouse = { x: -1000, y: -1000 }; // initially off screen

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function drawGrid() {
  const spacing = 40;
  const highlightRadius = 100;
  const segmentLength = 5; // length of small pieces for smooth fade
  const { width, height } = canvas;

  ctx.clearRect(0, 0, width, height);

  // 1. Draw base grid (always visible, low opacity)
  ctx.strokeStyle = 'rgba(200, 200, 200, 0.1)';
  for (let x = 0; x <= width; x += spacing) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.stroke();
  }
  for (let y = 0; y <= height; y += spacing) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }

  // 2. Draw highlighted segments with smooth circular fade
  // For vertical lines:
  for (let x = 0; x <= width; x += spacing) {
    // Vertical line runs from yStart to yEnd inside highlight circle vertically
    let yStart = Math.max(0, mouse.y - highlightRadius);
    let yEnd = Math.min(height, mouse.y + highlightRadius);

    // Draw small segments along this vertical line
    for (let y = yStart; y < yEnd; y += segmentLength) {
      // Midpoint of segment for distance calculation
      let midY = y + segmentLength / 2;

      // Calculate 2D distance from cursor to this segment midpoint
      const dist = Math.sqrt((x - mouse.x) ** 2 + (midY - mouse.y) ** 2);

      if (dist <= highlightRadius) {
        // Smooth fade with eased opacity
        const t = dist / highlightRadius;
        const eased = Math.max(0, Math.cos((t * Math.PI) / 2)) ** 2; // sharper fade
        const opacity = 0.1 + 0.9 * eased;

        ctx.strokeStyle = `rgba(200, 200, 200, ${opacity})`;
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x, Math.min(y + segmentLength, yEnd));
        ctx.stroke();
      }
    }
  }

  // For horizontal lines:
  for (let y = 0; y <= height; y += spacing) {
    // Horizontal line runs from xStart to xEnd inside highlight circle horizontally
    let xStart = Math.max(0, mouse.x - highlightRadius);
    let xEnd = Math.min(width, mouse.x + highlightRadius);

    // Draw small segments along this horizontal line
    for (let x = xStart; x < xEnd; x += segmentLength) {
      // Midpoint of segment for distance calculation
      let midX = x + segmentLength / 2;

      // Calculate 2D distance from cursor to this segment midpoint
      const dist = Math.sqrt((midX - mouse.x) ** 2 + (y - mouse.y) ** 2);

      if (dist <= highlightRadius) {
        // Smooth fade with eased opacity
        const t = dist / highlightRadius;
        const eased = Math.max(0, Math.cos((t * Math.PI) / 2)) ** 2; // sharper fade
        const opacity = 0.1 + 0.9 * eased;

        ctx.strokeStyle = `rgba(200, 200, 200, ${opacity})`;
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(Math.min(x + segmentLength, xEnd), y);
        ctx.stroke();
      }
    }
  }
}


function animate() {
  drawGrid();
  requestAnimationFrame(animate);
}

window.addEventListener('mousemove', (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

window.addEventListener('resize', resizeCanvas);

resizeCanvas();
animate();
