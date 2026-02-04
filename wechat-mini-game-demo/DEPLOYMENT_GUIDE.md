# 微信小游戏在线部署指南

## 🚀 快速部署到免费平台

### 方案一：GitHub Pages（推荐）
1. **创建GitHub仓库**
   - 登录GitHub，创建新仓库
   - 仓库名：`hunger-survival-game`
   - 选择公开仓库

2. **上传代码**
```bash
git init
git add .
git commit -m "饥荒风格生存游戏Demo"
git branch -M main
git remote add origin https://github.com/你的用户名/hunger-survival-game.git
git push -u origin main
```

3. **启用GitHub Pages**
   - 进入仓库设置 → Pages
   - 选择分支：`main`
   - 选择文件夹：`/(root)`
   - 保存设置

4. **访问地址**
   - 访问：`https://你的用户名.github.io/hunger-survival-game/mobile-index.html`

### 方案二：Netlify（更简单）
1. **注册Netlify账号**
2. **拖拽项目文件夹到部署区域**
3. **自动生成访问链接**
4. **手机直接访问**

### 方案三：Vercel
1. **注册Vercel账号**
2. **连接GitHub仓库**
3. **一键部署**
4. **获得专属域名**

## 📱 手机体验地址

部署成功后，手机访问地址格式：
- **GitHub Pages**: `https://用户名.github.io/仓库名/mobile-index.html`
- **Netlify**: `https://随机名称.netlify.app/mobile-index.html`
- **Vercel**: `https://随机名称.vercel.app/mobile-index.html`

## 🎮 游戏功能说明

### 已实现功能
- ✅ 角色移动（虚拟摇杆）
- ✅ 资源收集（树木、石头）
- ✅ 生存系统（饥饿值、生命值）
- ✅ 昼夜循环
- ✅ 自动存档
- ✅ 触屏优化

### 操作说明
- **移动**：使用虚拟摇杆
- **交互**：点击屏幕按钮
- **采集**：靠近资源点击交互按钮
- **建造**：收集足够资源后解锁

## 🔧 技术特点

- **响应式设计**：适配各种手机屏幕
- **离线存储**：游戏进度自动保存
- **性能优化**：Canvas渲染，流畅体验
- **微信兼容**：为微信小游戏环境优化

## 📞 技术支持

如有部署问题，请检查：
1. 确保所有文件已上传
2. 确认GitHub Pages已启用
3. 检查浏览器控制台错误信息
4. 清除浏览器缓存重新加载

## 🎯 下一步

体验游戏后，可以：
1. 反馈游戏体验
2. 提出功能改进建议
3. 开始微信小游戏正式部署

---
*部署愉快！🎮*