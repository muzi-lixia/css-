(
    function () {
        // 创建canvas节点
        let canvas = document.createElement('canvas');
        let bodyNode = document.body;
        canvas.style.position = 'absolute';
        canvas.style.top = '0';
        canvas.style.left = '0';
        // 将其append到body中
        bodyNode.appendChild(canvas);
        let context = canvas.getContext('2d');

        // 设置canvas宽高
        function setCanvasSize() {
            canvas.width = bodyNode.clientWidth;
            canvas.height = bodyNode.clientHeight;
            clearFillStyle();
        }
        // 填充背景样式
        function clearFillStyle() {
            context.fillStyle = 'RGB(255, 255, 255)';
            context.fillRect(0, 0, canvas.width, canvas.height);
        }

        setCanvasSize();
        // 监听窗体大小改变
        window.addEventListener('resize', setCanvasSize, false);
        // 监听鼠标触发事件
        window.addEventListener('mousedown', mouseDownHandler, false);

        // 鼠标事件
        function mouseDownHandler(e) {
            let x = e.clientX;
            let y = e.clientY;
            createFireworks(x, y);
        }

        let particles = [];

        function tick() {
            context.globalCompositeOperation = 'destination-out';
            context.fillStyle = 'RGBA(0, 0, 0,' + 10 / 100 + ')';
            context.fillRect(0, 0, canvas.width, canvas.height);
            context.globalCompositeOperation = 'lighter';
            drawFireworks();
            requestAnimationFrame(tick);
        }

        tick();
        setInterval(function () {
            createFireworks(Math.random() * canvas.width, Math.random() * canvas.height);
        }, 1000);
        // 绘制烟花
        function createFireworks(sx, sy) {
            let hue = Math.floor(Math.random() * 51) + 150;
            let hueVariance = 30;
            let count = 100;
            for (let i = 0; i < count; i++) {
                let p = {};
                //生成随机角度
                let angle = Math.floor(Math.random() * 360);
                //转化为弧度
                p.radians = angle * Math.PI / 180;
                p.x = sx;
                p.y = sy;
                p.speed = (Math.random() * 5) + .4;
                p.radius = p.speed;
                p.size = Math.floor(Math.random() * 3) + 1;
                p.hue = Math.floor(Math.random() * ((hue + hueVariance) - (hue - hueVariance))) + (hue - hueVariance);
                p.brightness = Math.floor(Math.random() * 31) + 50;
                p.alpha = (Math.floor(Math.random() * 61) + 40) / 100;
                particles.push(p);
            }
        }

        function drawFireworks() {
            // clearFillStyle();
            for (let i = 0; i < particles.length; i++) {
                let p = particles[i];
                let vx = Math.cos(p.radians) * p.radius;
                let vy = Math.sin(p.radians) * p.radius + 0.4;

                p.x += vx;
                p.y += vy;
                p.radius *= 1 - p.speed / 100;
                p.alpha -= 0.005;
                if (p.alpha <= 0) {
                    particles.splice(i, 1);
                    continue;
                }
                context.beginPath();
                context.arc(p.x, p.y, p.size, 0, Math.PI * 2, false);
                context.closePath();
                context.fillStyle = 'hsla(' + p.hue + ', 100%,' + p.brightness + '%, ' + p.alpha + ')';
                context.fill();
            }
        }
    }
)();
/*// clearFillStyle();
            // 烟花粒子数量
            let count = 10;
            // 烟花半径
            let radius = 10;
            for (let i = 0; i < count; i++) {
                // 烟花粒子角度
                let angle = 360 / count * i;
                // 烟花粒子弧度
                let radians = angle * Math.PI / 180;

                let vx = x + Math.cos(radians) * radius;
                let vy = y + Math.sin(radians) * radius;

                context.beginPath();
                context.arc(vx, vy , 2, 0, Math.PI*2, false);
                context.closePath();
                context.fillStyle = '#ff0000';
                context.fill();
            }*/
