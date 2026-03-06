# 个人简历网站

这是一个现代化、响应式的个人简历网站，基于 [Astro](https://astro.build) 构建，展示了个人信息、教育背景、技能、学术成果、证书荣誉、校内实践和实践经历等内容。

**URL:** https://taiji009.github.io/my-resume/

## 技术栈

- **框架**: Astro 4.x
- **样式**: 原生 CSS
- **部署**: GitHub Pages

## 本地开发

```bash
npm install
npm run dev
```

## 构建

```bash
npm run build
```

构建产物输出到 `dist/` 目录。

## 内容更新

简历内容存储在 `src/content/resume.json`，修改该文件即可更新网站内容，无需改动组件代码。

## 头像配置

在 `src/content/resume.json` 的 `profile.avatar` 中配置头像 URL：
- 使用本地图片：将图片放入 `public/` 目录，填写文件名（如 `avatar.jpg`）
- 使用外部链接：填写完整 URL（以 `http` 开头）

## 部署说明

- 首次部署前请在本地执行 `npm install` 生成 `package-lock.json`
- 若仓库名不是 `my-resume`，请修改 `astro.config.mjs` 中的 `base` 为 `'/你的仓库名/'`