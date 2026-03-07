/* ============================================================
   赛博朋克特效脚本
   ============================================================ */

// ── 1. 粒子网格背景 ──────────────────────────────────────────
(function initParticles() {
    const canvas = document.getElementById('particle-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const COLORS = ['#ff0055', '#ff2d78', '#ff6b9d', '#ffffff'];
    const PARTICLE_COUNT = 80;
    const LINK_DISTANCE = 130;
    const REPEL_DISTANCE = 90;
    const REPEL_FORCE = 0.6;

    let W, H, particles, mouse = { x: -9999, y: -9999 };

    function resize() {
        W = canvas.width = canvas.offsetWidth;
        H = canvas.height = canvas.offsetHeight;
    }

    function randomColor() {
        return COLORS[Math.floor(Math.random() * COLORS.length)];
    }

    function createParticles() {
        particles = Array.from({ length: PARTICLE_COUNT }, () => ({
            x: Math.random() * W,
            y: Math.random() * H,
            vx: (Math.random() - 0.5) * 0.4,
            vy: (Math.random() - 0.5) * 0.4,
            r: Math.random() * 1.8 + 0.6,
            color: randomColor(),
            alpha: Math.random() * 0.5 + 0.15,
        }));
    }

    function hexToRgb(hex) {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return `${r},${g},${b}`;
    }

    function draw() {
        ctx.clearRect(0, 0, W, H);

        for (let i = 0; i < particles.length; i++) {
            const p = particles[i];

            // 鼠标排斥
            const dx = p.x - mouse.x;
            const dy = p.y - mouse.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < REPEL_DISTANCE && dist > 0) {
                const force = (REPEL_DISTANCE - dist) / REPEL_DISTANCE * REPEL_FORCE;
                p.vx += (dx / dist) * force;
                p.vy += (dy / dist) * force;
            }

            // 速度阻尼
            p.vx *= 0.98;
            p.vy *= 0.98;

            p.x += p.vx;
            p.y += p.vy;

            // 边界反弹
            if (p.x < 0) { p.x = 0; p.vx *= -1; }
            if (p.x > W) { p.x = W; p.vx *= -1; }
            if (p.y < 0) { p.y = 0; p.vy *= -1; }
            if (p.y > H) { p.y = H; p.vy *= -1; }

            // 绘制粒子
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${hexToRgb(p.color)},${p.alpha})`;
            ctx.fill();

            // 绘制连线
            for (let j = i + 1; j < particles.length; j++) {
                const q = particles[j];
                const lx = p.x - q.x;
                const ly = p.y - q.y;
                const ld = Math.sqrt(lx * lx + ly * ly);
                if (ld < LINK_DISTANCE) {
                    const lineAlpha = (1 - ld / LINK_DISTANCE) * 0.25;
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(q.x, q.y);
                    ctx.strokeStyle = `rgba(${hexToRgb(p.color)},${lineAlpha})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        }

        requestAnimationFrame(draw);
    }

    window.addEventListener('resize', () => {
        resize();
        createParticles();
    });

    canvas.closest('.header').addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
    });

    canvas.closest('.header').addEventListener('mouseleave', () => {
        mouse.x = -9999;
        mouse.y = -9999;
    });

    resize();
    createParticles();
    draw();
})();


// ── 2. 打字机效果 ────────────────────────────────────────────
(function initTypewriter() {
    const el = document.getElementById('typewriter-text');
    const src = document.getElementById('typewriter-source');
    if (!el || !src) return;

    const text = src.textContent.trim();
    let index = 0;

    function type() {
        if (index <= text.length) {
            el.textContent = text.slice(0, index);
            index++;
            setTimeout(type, 80);
        }
    }

    // 延迟 600ms 后开始打字，让页面先渲染
    setTimeout(type, 600);
})();


// ── 3. 滚动视差进入动画 ──────────────────────────────────────
(function initScrollReveal() {
    const sections = document.querySelectorAll('.section');

    sections.forEach(section => {
        section.classList.add('reveal-ready');
        const title = section.querySelector('.section-title');
        if (title) title.classList.add('reveal-title');
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                const title = entry.target.querySelector('.section-title');
                if (title) title.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.08,
        rootMargin: '0px 0px -40px 0px'
    });

    sections.forEach(section => observer.observe(section));
})();


// ── 4. 导航激活高亮 ──────────────────────────────────────────
(function initNavActive() {
    const navLinks = document.querySelectorAll('.nav-list a[data-section]');
    const sectionIds = Array.from(navLinks).map(a => a.dataset.section);

    function updateActive() {
        let current = sectionIds[0];
        sectionIds.forEach(id => {
            const el = document.getElementById(id);
            if (el) {
                const rect = el.getBoundingClientRect();
                if (rect.top <= 120) current = id;
            }
        });
        navLinks.forEach(a => {
            a.classList.toggle('active', a.dataset.section === current);
        });
    }

    window.addEventListener('scroll', updateActive, { passive: true });
    updateActive();
})();


// ── 5. 导航平滑滚动 ──────────────────────────────────────────
(function initSmoothScroll() {
    const navLinks = document.querySelectorAll('.nav-list a');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (!href || !href.startsWith('#')) return;
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
})();


// ── 6. 回到顶部按钮 ──────────────────────────────────────────
(function initBackToTop() {
    const btn = document.createElement('a');
    btn.href = '#';
    btn.className = 'back-to-top';
    btn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    btn.setAttribute('aria-label', '回到顶部');
    document.body.appendChild(btn);

    window.addEventListener('scroll', () => {
        btn.classList.toggle('visible', window.pageYOffset > 300);
    }, { passive: true });

    btn.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
})();


// ── 7. 导航栏滚动阴影 ────────────────────────────────────────
(function initNavShadow() {
    const nav = document.querySelector('.nav');
    if (!nav) return;

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 60) {
            nav.style.boxShadow = '0 4px 20px #ff005533';
        } else {
            nav.style.boxShadow = 'none';
        }
    }, { passive: true });
})();


// ── 8. 技能/证书卡片霓虹悬停（补强 CSS 动效）────────────────
(function initCardGlow() {
    const cards = document.querySelectorAll('.skill-category, .certificate-item');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.boxShadow = '0 0 24px #ff005544, inset 0 0 20px #ff00550d';
        });
        card.addEventListener('mouseleave', () => {
            card.style.boxShadow = '';
        });
    });
})();


// ── 9. 页面淡入 ──────────────────────────────────────────────
(function initFadeIn() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.4s ease-in-out';
    window.addEventListener('load', () => {
        setTimeout(() => { document.body.style.opacity = '1'; }, 80);
    });
})();
