/* ─── PARTICLE GRID BACKGROUND ─────────────────────────── */
(function () {
    const canvas = document.getElementById('bg-canvas');
    const ctx = canvas.getContext('2d');
    let W, H, particles;
    const mouse = { x: -9999, y: -9999 };

    const COLS = [
        'rgba(0,245,255,',
        'rgba(123,47,255,',
        'rgba(255,45,120,'
    ];

    function resize() {
        W = canvas.width = window.innerWidth;
        H = canvas.height = window.innerHeight;
        init();
    }

    function init() {
        particles = [];
        const count = Math.floor((W * H) / 14000);
        for (let i = 0; i < count; i++) {
            particles.push({
                x: Math.random() * W,
                y: Math.random() * H,
                vx: (Math.random() - 0.5) * 0.4,
                vy: (Math.random() - 0.5) * 0.4,
                r: Math.random() * 1.5 + 0.5,
                col: COLS[Math.floor(Math.random() * COLS.length)]
            });
        }
    }

    function draw() {
        ctx.clearRect(0, 0, W, H);
        particles.forEach((p, i) => {
            p.x += p.vx;
            p.y += p.vy;
            if (p.x < 0) p.x = W;
            if (p.x > W) p.x = 0;
            if (p.y < 0) p.y = H;
            if (p.y > H) p.y = 0;

            const dx = mouse.x - p.x;
            const dy = mouse.y - p.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const glow = dist < 200 ? 1 - dist / 200 : 0;

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r + glow * 2, 0, Math.PI * 2);
            ctx.fillStyle = p.col + (0.4 + glow * 0.6) + ')';
            ctx.fill();

            // Connect nearby particles
            for (let j = i + 1; j < particles.length; j++) {
                const q = particles[j];
                const ex = p.x - q.x;
                const ey = p.y - q.y;
                const ed = Math.sqrt(ex * ex + ey * ey);
                if (ed < 120) {
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(q.x, q.y);
                    ctx.strokeStyle = p.col + (0.08 * (1 - ed / 120)) + ')';
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        });
        requestAnimationFrame(draw);
    }

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', e => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });

    resize();
    draw();
})();