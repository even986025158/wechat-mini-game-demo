# 🎮 微信小游戏部署指南

## 📋 项目概述
这是一个基于《饥荒》风格的微信小游戏Demo，包含完整的生存建造系统。

## 🚀 快速部署步骤

### 方法1：GitHub Pages（推荐）
1. **创建新仓库**
   - 登录 GitHub
   - 创建新仓库：`wechat-mini-game-demo`
   - 选择 "Public"（公开）

2. **上传文件**
   - 将本文件夹中的所有文件上传到仓库
   - 包括：`index.html`, `mobile-index.html`, `game.js` 等所有文件

3. **启用 GitHub Pages**
   - 进入仓库 Settings → Pages
   - Source：选择 "Deploy from a branch"
   - Branch：选择 `main` 分支，`/(root)` 文件夹
   - 点击 Save

4. **获取访问链接**
   - 等待几分钟后，访问：`https://你的用户名.github.io/wechat-mini-game-demo/mobile-index.html`

### 方法2：Netlify 一键部署
1. **访问**：https://app.netlify.com/
2. **拖拽上传**：将整个文件夹拖到部署区域
3. **自动部署**：Netlify 会立即提供访问链接

### 方法3：Vercel 快速部署
1. **访问**：https://vercel.com/
2. **导入项目**：连接 GitHub 账号，选择仓库
3. **自动部署**：Vercel 自动生成生产链接

## 📱 手机体验

### 访问地址格式
- **GitHub Pages**：`https://你的用户名.github.io/wechat-mini-game-demo/mobile-index.html`
- **Netlify**：`https://随机名称.netlify.app/mobile-index.html`
- **Vercel**：`https://随机名称.vercel.app/mobile-index.html`

### 操作说明
- **移动**：WASD 或方向键（键盘）
- **触屏**：虚拟摇杆（手机）
- **交互**：空格键或点击屏幕
- **采集**：靠近资源按交互键

## 🎯 游戏功能

### 核心系统
- ✅ 生存系统：饥饿值、生命值、精神值
- ✅ 资源收集：砍树、挖矿、建造
- ✅ 昼夜循环：白天采集、夜晚生存
- ✅ 数据持久化：自动存档功能

### 技术特性
- 📱 响应式设计：支持手机和电脑
- 🎮 触屏优化：虚拟摇杆控制
- 💾 本地存储：游戏进度自动保存
- ⚡ 性能优化：Canvas 渲染，轻量级

## 🔧 技术栈
- **前端**：HTML5 Canvas + JavaScript
- **游戏引擎**：原生 Canvas API
- **存储**：LocalStorage
- **适配**：微信小游戏 API 兼容

## 📞 技术支持
如有部署问题，请检查：
1. ✅ 所有文件是否完整上传
2. ✅ GitHub Pages 是否启用
3. ✅ 访问链接是否正确
4. ✅ 浏览器控制台是否有错误

---
**祝您游戏愉快！🎮**