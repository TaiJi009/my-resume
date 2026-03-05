# 个人简历网站

这是一个现代化、响应式的个人简历网站，展示了个人信息、教育背景、技能、学术成果、证书荣誉、校内实践和实践经历等内容。

## 功能特点

- 📱 **响应式设计**：适配桌面、平板和移动设备
- 🎨 **现代美观**：使用渐变色彩和卡片式布局
- 🚀 **平滑滚动**：导航栏点击和页面滚动效果
- ✨ **动画效果**：页面加载和元素过渡动画
- 🌙 **深色模式**：自动适配系统深色模式设置
- 🔄 **回到顶部**：滚动到页面顶部的快捷按钮
- 🖨️ **打印友好**：优化的打印样式

## 技术栈

- **前端**：HTML5, CSS3, JavaScript
- **图标**：Font Awesome 6
- **字体**：Inter, 系统默认字体

## 如何运行

1. **克隆项目**
   ```bash
   git clone https://github.com/yourusername/resume-website.git
   cd resume-website
   ```

2. **启动本地服务器**
   - 使用Python内置服务器：
     ```bash
     python -m http.server 8000
     ```
   - 或使用Node.js的http-server：
     ```bash
     npx http-server -p 8000
     ```

3. **访问网站**
   在浏览器中打开 `http://localhost:8000`

## 项目结构

```
├── index.html          # 主页面
├── styles.css          # 样式文件
├── script.js           # 交互功能
└── README.md           # 项目说明
```

## 自定义指南

### 修改个人信息
1. 打开 `index.html` 文件
2. 修改头部的个人信息（姓名、职位、联系方式等）
3. 更新各个部分的内容（教育背景、技能、经历等）

### 修改样式
1. 打开 `styles.css` 文件
2. 修改颜色方案：
   ```css
   /* 头部渐变背景 */
   .header {
       background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
   }
   
   /* 主题色 */
   .section-title {
       color: #667eea;
   }
   ```

3. 修改字体、间距等其他样式

### 添加功能
1. 打开 `script.js` 文件
2. 可以添加新的交互功能，如：
   - 深色模式切换按钮
   - 简历下载功能
   - 更多动画效果

## 浏览器支持

- Chrome (最新版本)
- Firefox (最新版本)
- Safari (最新版本)
- Edge (最新版本)

## 许可证

本项目采用 MIT 许可证 - 详情请参阅 [LICENSE](LICENSE) 文件

## 致谢

- 图标来自 [Font Awesome](https://fontawesome.com/)
- 字体来自 [Google Fonts](https://fonts.google.com/)

---

© 2024 张滨. 保留所有权利.
