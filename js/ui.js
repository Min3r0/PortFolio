/* ─── SCROLL REVEAL ─────────────────────────────────────── */
(function () {
    const els = document.querySelectorAll('.reveal');
    const io = new IntersectionObserver(entries => {
        entries.forEach((e, i) => {
            if (e.isIntersecting) {
                setTimeout(() => e.target.classList.add('visible'), i * 80);
                io.unobserve(e.target);
            }
        });
    }, { threshold: 0.15 });
    els.forEach(el => io.observe(el));
})();

/* ─── ACTIVE NAV ────────────────────────────────────────── */
(function () {
    const sections = document.querySelectorAll('section[id]');
    const links = document.querySelectorAll('nav a');
    const io = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                links.forEach(l => l.classList.remove('active'));
                const active = document.querySelector(`nav a[href="#${e.target.id}"]`);
                if (active) active.classList.add('active');
            }
        });
    }, { threshold: 0.5 });
    sections.forEach(s => io.observe(s));
})();