/* ─── WEB SILK — Interactive Mouse Background ───────────── */
(function () {
  const canvas = document.getElementById('bg-canvas');
  const ctx = canvas.getContext('2d');
  let W, H, nodes;
  const mouse = { x: -1, y: -1 };

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
    init();
  }

  function init() {
    const count = Math.min(120, Math.floor((W * H) / 12000));
    nodes = Array.from({ length: count }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      hue: 180 + Math.random() * 80
    }));
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);

    // Move nodes
    nodes.forEach(n => {
      n.x += n.vx;
      n.y += n.vy;
      if (n.x < 0 || n.x > W) n.vx *= -1;
      if (n.y < 0 || n.y > H) n.vy *= -1;
    });

    // Build list including mouse as a virtual node
    const all = mouse.x >= 0
      ? [...nodes, { x: mouse.x, y: mouse.y, hue: 195, isMouse: true }]
      : nodes;

    // Draw connections
    for (let i = 0; i < all.length; i++) {
      for (let j = i + 1; j < all.length; j++) {
        const a = all[i], b = all[j];
        const dx = a.x - b.x, dy = a.y - b.y;
        const d = Math.sqrt(dx * dx + dy * dy);
        const isMouse = a.isMouse || b.isMouse;
        const maxD = isMouse ? 200 : 120;

        if (d < maxD) {
          const alpha = (1 - d / maxD) * (isMouse ? 0.65 : 0.2);
          const hue = (a.hue + b.hue) / 2;
          ctx.strokeStyle = `hsla(${hue}, 100%, 70%, ${alpha})`;
          ctx.lineWidth = isMouse ? 1.0 : 0.4;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    }

    // Draw nodes
    nodes.forEach(n => {
      ctx.fillStyle = `hsla(${n.hue}, 100%, 75%, 0.55)`;
      ctx.beginPath();
      ctx.arc(n.x, n.y, 1.8, 0, Math.PI * 2);
      ctx.fill();
    });

    // Draw mouse cursor dot
    if (mouse.x >= 0) {
      const grd = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 18);
      grd.addColorStop(0, 'rgba(0,245,255,0.7)');
      grd.addColorStop(1, 'transparent');
      ctx.fillStyle = grd;
      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, 18, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = 'rgba(0,245,255,1)';
      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, 3, 0, Math.PI * 2);
      ctx.fill();
    }

    requestAnimationFrame(draw);
  }

  window.addEventListener('resize', resize);
  window.addEventListener('mousemove', e => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });
  window.addEventListener('mouseleave', () => {
    mouse.x = -1;
    mouse.y = -1;
  });

  resize();
  draw();
})();
