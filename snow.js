(() => {
    const canvas = document.createElement("canvas");
    canvas.id = "snow";
    document.body.appendChild(canvas);

    const ctx = canvas.getContext("2d");
    let w, h, dpr;
    const flakes = [];

    function resize() {
        dpr = Math.max(1, window.devicePixelRatio || 1);
        w = window.innerWidth;
        h = window.innerHeight;
        canvas.style.width = w + "px";
        canvas.style.height = h + "px";
        canvas.width = Math.floor(w * dpr);
        canvas.height = Math.floor(h * dpr);
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function rand(min, max) { return Math.random() * (max - min) + min; }

    function makeFlake() {
        return {
            x: rand(0, w),
            y: rand(-h, 0),
            r: rand(1, 3.2),
            vx: rand(-0.4, 0.4),
            vy: rand(0.8, 2.2),
            a: rand(0.25, 0.8),
        };
    }

    function init(n = 140) {
        flakes.length = 0;
        for (let i = 0; i < n; i++) flakes.push(makeFlake());
    }

    function step() {
        ctx.clearRect(0, 0, w, h);

        ctx.fillStyle = "rgba(255,255,255,1";
        
        for (const f of flakes) {
            f.x += f.vx;
            f.y += f.vy;

            // 風のゆらぎ
            f.vx += rand(-0.02, 0.02);
            f.vx = Math.max(-0.6, Math.min(0.6, f.vx));

            // 画面外処理
            if (f.y > h + 10) {
                f.y = -10;
                f.x = rand(0, w);
            }
            if (f.x < -10) f.x = w + 10;
            if (f.x > w + 10) f.x = -10;

            ctx.globalAlpha = f.a;
            ctx.beginPath();
            ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
            ctx.fill();
        }

        requestAnimationFrame(step);
    }

    resize();
    init(Math.min(180, Math.floor((window.innerWidth * window.innerHeight) / 12000)));
    step();

    window.addEventListener("resize", () => {
        resize();
        init(Math.min(180, Math.floor((window.innerWidth * window.innerHeight) / 12000)));
    });
})();
