/**
 * 世界环境系统
 * 负责昼夜循环、天气、地图生成等环境逻辑
 */

class WorldSystem {
    constructor() {
        this.dayCount = 1;
        this.timeOfDay = 'day'; // day, dusk, night, dawn
        this.timeProgress = 0; // 0-100，表示一天中的进度
        this.weather = 'sunny'; // sunny, rainy, stormy
        this.mapSize = { width: 800, height: 600 };
        this.resources = [];
        this.buildings = [];
        this.creatures = [];
        
        this.initWorld();
    }
    
    initWorld() {
        this.generateMap();
        this.spawnInitialResources();
    }
    
    generateMap() {
        // 生成基础地形
        console.log('生成游戏地图...');
        
        // 简单的地形生成逻辑
        this.terrain = {
            ground: [],
            obstacles: [],
            spawnPoints: []
        };
        
        // 添加一些初始资源点
        for (let i = 0; i < 10; i++) {
            this.terrain.spawnPoints.push({
                x: Math.random() * this.mapSize.width,
                y: Math.random() * this.mapSize.height,
                type: 'resource'
            });
        }
    }
    
    spawnInitialResources() {
        // 生成初始资源
        const resourceTypes = ['wood', 'stone', 'grass', 'berry'];
        
        resourceTypes.forEach(type => {
            for (let i = 0; i < 5; i++) {
                this.resources.push({
                    id: `resource_${type}_${i}`,
                    type: type,
                    position: {
                        x: Math.random() * this.mapSize.width,
                        y: Math.random() * this.mapSize.height
                    },
                    amount: Math.floor(Math.random() * 5) + 1,
                    collected: false
                });
            }
        });
    }
    
    update(deltaTime) {
        // 更新时间进度
        this.timeProgress += deltaTime * 0.1; // 控制时间流逝速度
        
        if (this.timeProgress >= 100) {
            this.timeProgress = 0;
            this.dayCount++;
            this.advanceTimeOfDay();
        }
        
        this.updateWeather();
        this.updateCreatures();
    }
    
    advanceTimeOfDay() {
        const timeSequence = ['day', 'dusk', 'night', 'dawn'];
        const currentIndex = timeSequence.indexOf(this.timeOfDay);
        this.timeOfDay = timeSequence[(currentIndex + 1) % timeSequence.length];
        
        console.log(`时间推进：第${this.dayCount}天 ${this.timeOfDay}`);
    }
    
    updateWeather() {
        // 简单的天气变化逻辑
        if (Math.random() < 0.01) { // 1%概率改变天气
            const weatherTypes = ['sunny', 'rainy', 'stormy'];
            this.weather = weatherTypes[Math.floor(Math.random() * weatherTypes.length)];
            console.log(`天气变化：${this.weather}`);
        }
    }
    
    updateCreatures() {
        // 更新生物行为
        this.creatures.forEach(creature => {
            if (creature.type === 'passive') {
                // 被动生物随机移动
                if (Math.random() < 0.1) {
                    creature.position.x += (Math.random() - 0.5) * 10;
                    creature.position.y += (Math.random() - 0.5) * 10;
                }
            }
        });
    }
    
    getResourceAtPosition(x, y, radius = 30) {
        // 获取指定位置附近的资源
        return this.resources.filter(resource => {
            if (resource.collected) return false;
            
            const distance = Math.sqrt(
                Math.pow(resource.position.x - x, 2) + 
                Math.pow(resource.position.y - y, 2)
            );
            
            return distance <= radius;
        });
    }
    
    collectResource(resourceId) {
        const resource = this.resources.find(r => r.id === resourceId);
        if (resource && !resource.collected) {
            resource.collected = true;
            return resource;
        }
        return null;
    }
    
    spawnCreature(type, position) {
        const creature = {
            id: `creature_${Date.now()}`,
            type: type,
            position: position,
            health: 100,
            behavior: 'passive' // passive, neutral, hostile
        };
        
        this.creatures.push(creature);
        return creature;
    }
    
    addBuilding(type, position) {
        const building = {
            id: `building_${type}_${Date.now()}`,
            type: type,
            position: position,
            level: 1,
            health: 100
        };
        
        this.buildings.push(building);
        return building;
    }
    
    getTimeInfo() {
        return {
            dayCount: this.dayCount,
            timeOfDay: this.timeOfDay,
            timeProgress: this.timeProgress,
            weather: this.weather
        };
    }
    
    getWorldState() {
        return {
            dayCount: this.dayCount,
            timeOfDay: this.timeOfDay,
            timeProgress: this.timeProgress,
            weather: this.weather,
            resources: this.resources.filter(r => !r.collected),
            buildings: this.buildings,
            creatures: this.creatures
        };
    }
    
    // 用于存档的数据
    getSaveData() {
        return {
            dayCount: this.dayCount,
            timeOfDay: this.timeOfDay,
            timeProgress: this.timeProgress,
            weather: this.weather,
            resources: this.resources,
            buildings: this.buildings,
            creatures: this.creatures
        };
    }
    
    loadSaveData(data) {
        if (data) {
            this.dayCount = data.dayCount || 1;
            this.timeOfDay = data.timeOfDay || 'day';
            this.timeProgress = data.timeProgress || 0;
            this.weather = data.weather || 'sunny';
            this.resources = data.resources || [];
            this.buildings = data.buildings || [];
            this.creatures = data.creatures || [];
        }
    }
}

module.exports = WorldSystem;