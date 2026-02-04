/**
 * 数据存储系统 - 微信小游戏本地存储
 * 支持游戏进度自动保存和加载
 */

class GameStorage {
    constructor() {
        this.storageKey = 'hunger_survival_game_data';
        this.autoSaveInterval = 30000; // 30秒自动保存一次
        this.lastSaveTime = 0;
    }

    /**
     * 保存游戏数据
     */
    saveGame(gameState) {
        try {
            const saveData = {
                timestamp: Date.now(),
                version: '1.0.0',
                data: gameState
            };
            
            // 微信小游戏存储API
            if (typeof wx !== 'undefined' && wx.setStorageSync) {
                wx.setStorageSync(this.storageKey, saveData);
            } else {
                // 浏览器环境使用localStorage
                localStorage.setItem(this.storageKey, JSON.stringify(saveData));
            }
            
            this.lastSaveTime = Date.now();
            console.log('游戏数据已保存');
            return true;
        } catch (error) {
            console.error('保存游戏数据失败:', error);
            return false;
        }
    }

    /**
     * 加载游戏数据
     */
    loadGame() {
        try {
            let saveData = null;
            
            // 微信小游戏存储API
            if (typeof wx !== 'undefined' && wx.getStorageSync) {
                saveData = wx.getStorageSync(this.storageKey);
            } else {
                // 浏览器环境使用localStorage
                const data = localStorage.getItem(this.storageKey);
                saveData = data ? JSON.parse(data) : null;
            }
            
            if (saveData && saveData.data) {
                console.log('游戏数据加载成功');
                return saveData.data;
            }
            
            console.log('未找到存档，开始新游戏');
            return null;
        } catch (error) {
            console.error('加载游戏数据失败:', error);
            return null;
        }
    }

    /**
     * 删除存档
     */
    deleteSave() {
        try {
            if (typeof wx !== 'undefined' && wx.removeStorageSync) {
                wx.removeStorageSync(this.storageKey);
            } else {
                localStorage.removeItem(this.storageKey);
            }
            console.log('存档已删除');
            return true;
        } catch (error) {
            console.error('删除存档失败:', error);
            return false;
        }
    }

    /**
     * 检查是否有存档
     */
    hasSave() {
        try {
            if (typeof wx !== 'undefined' && wx.getStorageSync) {
                return wx.getStorageSync(this.storageKey) !== '';
            } else {
                return localStorage.getItem(this.storageKey) !== null;
            }
        } catch (error) {
            return false;
        }
    }

    /**
     * 自动保存检查
     */
    shouldAutoSave() {
        return Date.now() - this.lastSaveTime > this.autoSaveInterval;
    }

    /**
     * 导出存档数据（用于联机版预留）
     */
    exportSaveData() {
        const saveData = this.loadGame();
        return saveData ? JSON.stringify(saveData) : null;
    }

    /**
     * 导入存档数据（用于联机版预留）
     */
    importSaveData(dataString) {
        try {
            const saveData = JSON.parse(dataString);
            return this.saveGame(saveData);
        } catch (error) {
            console.error('导入存档数据失败:', error);
            return false;
        }
    }
}

// 导出单例
const gameStorage = new GameStorage();
export default gameStorage;