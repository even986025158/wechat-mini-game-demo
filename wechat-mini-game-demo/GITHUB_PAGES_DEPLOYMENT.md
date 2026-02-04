# GitHub Pages 部署指南

## 部署步骤

### 1. 启用 GitHub Pages
1. 进入 GitHub 仓库的 Settings 页面
2. 在左侧菜单选择 "Pages"
3. 在 "Source" 部分选择 "GitHub Actions"
4. 保存设置

### 2. 推送代码触发部署
```bash
git add .
git commit -m "部署到 GitHub Pages"
git push origin main
```

### 3. 查看部署状态
1. 进入仓库的 "Actions" 标签页
2. 查看 "Deploy to GitHub Pages" 工作流运行状态
3. 等待部署完成（约 1-2 分钟）

### 4. 访问部署的网站
部署完成后，可以通过以下 URL 访问：
- **主页面**: `https://<你的用户名>.github.io/wechat-mini-game-demo/`
- **手机版**: `https://<你的用户名>.github.io/wechat-mini-game-demo/mobile-index.html`

## 文件结构说明

GitHub Pages 会自动部署以下文件：
- `index.html` - 桌面版游戏
- `mobile-index.html` - 手机优化版游戏
- `style.css` - 样式文件
- `game.js` - 游戏逻辑
- 其他相关资源文件

## 自定义域名（可选）

如需使用自定义域名：
1. 在仓库根目录创建 `CNAME` 文件，内容为你的域名
2. 在域名服务商处配置 CNAME 记录指向 GitHub Pages

## 注意事项

- GitHub Pages 仅支持静态文件（HTML、CSS、JS）
- 游戏数据保存在浏览器的 localStorage 中
- 不支持服务器端逻辑
- 部署后可能需要几分钟才能生效