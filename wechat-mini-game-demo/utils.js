/**
 * 工具函数库
 */

// 随机数生成
const Utils = {
    // 生成指定范围内的随机整数
    randomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    
    // 生成指定范围内的随机数
    randomFloat(min, max) {
        return Math.random() * (max - min) + min;
    },
    
    // 计算两点间距离
    distance(x1, y1, x2, y2) {
        return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    },
    
    // 限制数值范围
    clamp(value, min, max) {
        return Math.max(min, Math.min(max, value));
    },
    
    // 格式化时间显示
    formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    },
    
    // 检查矩形碰撞
    checkRectCollision(rect1, rect2) {
        return rect1.x < rect2.x + rect2.width &&
               rect1.x + rect1.width > rect2.x &&
               rect1.y < rect2.y + rect2.height &&
               rect1.y + rect1.height > rect2.y;
    },
    
    // 加载图片资源
    loadImage(src) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve(img);
            img.onerror = reject;
            img.src = src;
        });
    },
    
    // 创建简易粒子效果
    createParticles(x, y, count, color = '#ffffff') {
        const particles = [];
        for (let i = 0; i < count; i++) {
            particles.push({
                x: x,
                y: y,
                vx: Utils.randomFloat(-2, 2),
                vy: Utils.randomFloat(-2, 2),
                life: Utils.randomFloat(0.5, 2),
                color: color,
                size: Utils.randomFloat(1, 3)
            });
        }
        return particles;
    },
    
    // 更新粒子系统
    updateParticles(particles, deltaTime) {
        return particles.filter(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            particle.life -= deltaTime;
            particle.vy += 0.1; // 重力效果
            return particle.life > 0;
        });
    }
};

module.exports = Utils;