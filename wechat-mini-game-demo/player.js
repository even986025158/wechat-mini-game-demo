// 玩家角色系统
class Player {
    constructor() {
        this.x = 100;
        this.y = 100;
        this.width = 40;
        this.height = 60;
        
        // 生存状态
        this.hunger = 100;     // 饥饿值 (0-100)
        this.health = 100;     // 生命值 (0-100)
        this.sanity = 100;     // 精神值 (0-100)
        
        // 移动属性
        this.speed = 3;
        this.direction = 'down'; // up, down, left, right
        
        // 背包系统
        this.inventory = {
            wood: 0,
            stone: 0,
            food: 0,
            grass: 0
        };
        
        // 工具系统
        this.tools = {
            axe: false,     // 斧头
            pickaxe: false, // 镐子
            shovel: false   // 铲子
        };
        
        this.isMoving = false;
    }
    
    // 移动控制
    move(direction) {
        this.direction = direction;
        this.isMoving = true;
        
        switch(direction) {
            case 'up':
                this.y -= this.speed;
                break;
            case 'down':
                this.y += this.speed;
                break;
            case 'left':
                this.x -= this.speed;
                break;
            case 'right':
                this.x += this.speed;
                break;
        }
        
        // 边界检查
        this.x = Math.max(0, Math.min(this.x, 800 - this.width));
        this.y = Math.max(0, Math.min(this.y, 600 - this.height));
    }
    
    // 停止移动
    stop() {
        this.isMoving = false;
    }
    
    // 收集资源
    collect(resourceType, amount = 1) {
        if (this.inventory[resourceType] !== undefined) {
            this.inventory[resourceType] += amount;
            return true;
        }
        return false;
    }
    
    // 消耗资源
    consume(resourceType, amount = 1) {
        if (this.inventory[resourceType] >= amount) {
            this.inventory[resourceType] -= amount;
            return true;
        }
        return false;
    }
    
    // 制作工具
    craftTool(toolType) {
        const recipes = {
            axe: { wood: 3, stone: 2 },
            pickaxe: { wood: 2, stone: 3 },
            shovel: { wood: 1, stone: 1 }
        };
        
        const recipe = recipes[toolType];
        if (!recipe) return false;
        
        // 检查材料是否足够
        for (const [material, amount] of Object.entries(recipe)) {
            if (this.inventory[material] < amount) {
                return false;
            }
        }
        
        // 消耗材料并制作工具
        for (const [material, amount] of Object.entries(recipe)) {
            this.inventory[material] -= amount;
        }
        
        this.tools[toolType] = true;
        return true;
    }
    
    // 进食恢复
    eat(foodType = 'food') {
        if (this.inventory[foodType] > 0) {
            this.inventory[foodType]--;
            this.hunger = Math.min(100, this.hunger + 30);
            this.health = Math.min(100, this.health + 10);
            return true;
        }
        return false;
    }
    
    // 状态更新（随时间变化）
    update(deltaTime) {
        // 饥饿值随时间减少
        this.hunger = Math.max(0, this.hunger - deltaTime * 0.1);
        
        // 饥饿值过低时减少生命值
        if (this.hunger < 20) {
            this.health = Math.max(0, this.health - deltaTime * 0.05);
        }
        
        // 生命值过低时减少精神值
        if (this.health < 30) {
            this.sanity = Math.max(0, this.sanity - deltaTime * 0.02);
        }
    }
    
    // 获取玩家状态
    getStatus() {
        return {
            position: { x: this.x, y: this.y },
            stats: {
                hunger: this.hunger,
                health: this.health,
                sanity: this.sanity
            },
            inventory: { ...this.inventory },
            tools: { ...this.tools }
        };
    }
    
    // 渲染玩家角色
    render(ctx) {
        // 简单的角色绘制（后续可替换为精灵图）
        ctx.fillStyle = '#8B4513'; // 棕色身体
        ctx.fillRect(this.x, this.y, this.width, this.height);
        
        // 根据方向绘制头部
        ctx.fillStyle = '#FFB6C1'; // 粉色头部
        switch(this.direction) {
            case 'up':
                ctx.fillRect(this.x + 10, this.y - 10, 20, 20);
                break;
            case 'down':
                ctx.fillRect(this.x + 10, this.y + this.height, 20, 20);
                break;
            case 'left':
                ctx.fillRect(this.x - 10, this.y + 10, 20, 20);
                break;
            case 'right':
                ctx.fillRect(this.x + this.width, this.y + 10, 20, 20);
                break;
        }
        
        // 状态条显示
        this.renderStatusBars(ctx);
    }
    
    // 渲染状态条
    renderStatusBars(ctx) {
        const barWidth = 80;
        const barHeight = 6;
        const startX = this.x - 20;
        const startY = this.y - 25;
        
        // 饥饿条
        ctx.fillStyle = '#FFA500';
        ctx.fillRect(startX, startY, barWidth * (this.hunger / 100), barHeight);
        ctx.strokeStyle = '#000';
        ctx.strokeRect(startX, startY, barWidth, barHeight);
        
        // 生命条
        ctx.fillStyle = '#FF0000';
        ctx.fillRect(startX, startY + 10, barWidth * (this.health / 100), barHeight);
        ctx.strokeRect(startX, startY + 10, barWidth, barHeight);
        
        // 精神条
        ctx.fillStyle = '#9370DB';
        ctx.fillRect(startX, startY + 20, barWidth * (this.sanity / 100), barHeight);
        ctx.strokeRect(startX, startY + 20, barWidth, barHeight);
    }
}

export default Player;