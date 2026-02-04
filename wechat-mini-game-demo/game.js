// game.js - 微信小游戏主文件

// 游戏主类
class Game {
  constructor() {
    this.canvas = null;
    this.ctx = null;
    this.player = null;
    this.world = null;
    this.isRunning = false;
    this.lastTime = 0;
    
    this.init();
  }

  // 初始化游戏
  init() {
    // 获取Canvas上下文
    this.canvas = wx.createCanvas();
    this.ctx = this.canvas.getContext('2d');
    
    // 初始化游戏系统
    this.player = new Player();
    this.world = new World();
    this.storage = new Storage();
    
    // 加载存档
    this.loadGameState();
    
    // 开始游戏循环
    this.startGameLoop();
  }

  // 游戏主循环
  gameLoop(timestamp) {
    if (!this.isRunning) return;
    
    const deltaTime = timestamp - this.lastTime;
    this.lastTime = timestamp;
    
    // 更新游戏状态
    this.update(deltaTime);
    
    // 渲染游戏画面
    this.render();
    
    // 继续循环
    wx.requestAnimationFrame(this.gameLoop.bind(this));
  }

  // 更新游戏逻辑
  update(deltaTime) {
    this.player.update(deltaTime);
    this.world.update(deltaTime);
    
    // 自动保存（每30秒）
    if (Date.now() - this.lastSaveTime > 30000) {
      this.saveGameState();
      this.lastSaveTime = Date.now();
    }
  }

  // 渲染游戏画面
  render() {
    // 清空画布
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    // 渲染世界背景
    this.world.render(this.ctx);
    
    // 渲染玩家
    this.player.render(this.ctx);
    
    // 渲染UI
    this.renderUI();
  }

  // 渲染UI界面
  renderUI() {
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    this.ctx.fillRect(10, 10, 200, 100);
    
    this.ctx.fillStyle = 'white';
    this.ctx.font = '14px Arial';
    
    // 显示玩家状态
    this.ctx.fillText(`饥饿: ${this.player.hunger}`, 20, 30);
    this.ctx.fillText(`生命: ${this.player.health}`, 20, 50);
    this.ctx.fillText(`精神: ${this.player.sanity}`, 20, 70);
    this.ctx.fillText(`天数: ${this.world.dayCount}`, 20, 90);
  }

  // 开始游戏循环
  startGameLoop() {
    this.isRunning = true;
    this.lastSaveTime = Date.now();
    wx.requestAnimationFrame(this.gameLoop.bind(this));
  }

  // 暂停游戏
  pause() {
    this.isRunning = false;
    this.saveGameState();
  }

  // 恢复游戏
  resume() {
    this.isRunning = true;
    this.lastTime = performance.now();
    wx.requestAnimationFrame(this.gameLoop.bind(this));
  }

  // 保存游戏状态
  saveGameState() {
    const gameState = {
      player: this.player.getState(),
      world: this.world.getState(),
      timestamp: Date.now()
    };
    this.storage.save(gameState);
  }

  // 加载游戏状态
  loadGameState() {
    const savedState = this.storage.load();
    if (savedState) {
      this.player.setState(savedState.player);
      this.world.setState(savedState.world);
    }
  }
}

// 导出游戏实例
const game = new Game();

// 微信小游戏生命周期
App({
  onLaunch() {
    console.log('游戏启动');
  },
  
  onShow() {
    console.log('游戏显示');
    game.resume();
  },
  
  onHide() {
    console.log('游戏隐藏');
    game.pause();
  },
  
  onError(msg) {
    console.error('游戏错误:', msg);
  }
});