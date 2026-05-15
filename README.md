# YmBlog

基于 [VitePress](https://github.com/vuejs/vitepress) 的简洁、轻量化的静态个人博客站点模板。
旨在能够通过 Markdown 快速便捷地编写、发布个人博客。

# 如何使用
你可以非常快速地部署 YmBlog！

## 前置准备
Node.js 20+

YmBlog 基于 VitePress，因此你需要安装相关依赖才能构建网页。

拿npm举例：使用 `npm` 安装命令: `npm install -D vitepress`。

随后，就可以在仓库根目录使用命令行执行 `npm run dev` 就可以打开预览。

详细可以查看 [VitePress快速开始](https://vitepress.dev/zh/guide/getting-started) 获取详细的部署信息。

对于 Windows 用户，本仓库提供了 `scripts/start.bat` 它可以自动帮助你安装依赖以及启动预览。

# 快速入门

所有的文章在仓库目录的 `docs/src/` 路径下编写。

我们在目录下创建一个 `first.md` 并编写以下内容：

```md
--
title: 我的第一个博客文章
date: 2026-05-13 22:00
summary: 这是我的第一个博客文章，欢迎阅读！
tags:
  - 博客
topic:
  name: 开发日志
  description: 开发日志记录了一些日常内容
--

# 标题

正文
```

运行项目，你就会在主页得到：
<img width="996" height="600" alt="image" src="https://github.com/user-attachments/assets/46c8304d-4c1d-49bb-95e3-73cf8663075d" />

你也可以添加多个同主题的文章，它会被归类为同一个文集列表。

同一个文集列表的文章在预览时，会显示底部的上下页导航。

默认情况下，文章按照发布时间正序排序。

你可以在文章开头指定 `index` 指定了index的文章会被提前，越小的index排在越前方，你可以使用这个功能对文章进行手动排列。

<img width="783" height="533" alt="image" src="https://github.com/user-attachments/assets/e3b1b56b-0926-436a-a9dd-f156134ce243" />

# 修改样式

若需要预览项目，可以找到仓库目录 `scripts/start.bat` 运行这个批处理文件启动项目。

若需要清除构建的缓存页面，可以运行 `scripts/clear.bat`。

## 主页样式修改

你可以在位于仓库目录下的 `docs/.vitepress/theme/components/BlogHome.vue` 找到主页的 `vue` 样式。

### 修改头像

头像位于 `docs/img/profile-photo.png` 按照源目录替换即可。

### 修改Banner背景

Banner 图像位于 `docs/img/banner.jpg` 只需要将图像放置在此目录即可。

### 修改网站图标

图标的图像位于 `docs/src/public/icon.svg` 只需要将图像放置在此目录即可。

你也可以在 `docs/.vitepress/config.mts` 配置文件顶部修改 `icon` 字段，指定图标的名称。

```ts
const icon = 'icon.svg'
```

### 添加主页的分栏页

你可以找到页面上方的 `tabs` 常量数组，这里定义了主页的分栏子页，只需要添加一行关于页面的配置。

```ts
const tabs = [
  { key: 'blog', label: '博客', component: HomeBlogTab },
  { key: 'about', label: '关于我', component: HomeAboutTab },
  //..
] as const
```

- `key` 是这个子页的 `标识符`。
- `label` 是这个分栏显示的文本。
- `component` 是对应子页的 `.vue` 页面，需要将对应页面放到 `docs/.vitepress/theme/components/home/` 下。

比如，你可以编写一个引导器页面，用MD文档编写内容。

```vue
<script setup lang="ts">
import Content from './content.md'
</script>

<template>
  <section class="space-main space-main--single">
    <section class="space-content space-content--single">
      <div class="space-panel" style="padding: 24px 28px;">
        <div class="vp-doc">
          <Content />
        </div>
      </div>
    </section>
  </section>
</template>
```

### 修改默认分栏页

你可以在主页的 `defaultTab` 字段指定默认展示的子页标识符。

```ts
const defaultTab = 'blog' // 这里指定首页为 blog
```

这样每次进入首页，就会自动进入当前分栏页。

# 构建并部署静态站点

可以在仓库根目录运行 `npm run build` 执行构建，静态站点会生成在 `docs/.vitepress/dist` 下。

可以通过Github Actions执行快速发布：

比如，新建一个 `articles` 分支用于提交文章，再新建一个 `pages` 分支用于发布内容。

```bash
git checkout main

git checkout -b articles

git checkout -b pages
```

随后，在仓库的主分支 `/.github/workflows/` 添加 GithubActions 工作流文件 `deploy.yml` （或者直接在 Github 网站在线配置工作流）：

```yaml
name: Deploy VitePress site to Pages

on:
  push:
    branches: [pages]
    paths:
      - 'docs/**'
      - 'package.json'
      - 'package-lock.json'
      - '.github/workflows/deploy.yml'
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: false

jobs:
  build:
    name: Build
    runs-on: ubuntu-latest

    steps:
      - name: Checkout
        uses: actions/checkout@v5
        with:
          fetch-depth: 0

      - name: Setup Node
        uses: actions/setup-node@v6
        with:
          node-version: 24
          cache: npm

      - name: Setup Pages
        uses: actions/configure-pages@v5

      - name: Install dependencies
        run: npm ci

      - name: Build with VitePress
        run: npm run build

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v4
        with:
          path: docs/.vitepress/dist

  deploy:
    name: Deploy
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}

    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

这个文件监听 `pages` 分支的推送后构建内容，提交工作流文件后

我们需要配置 Github Pages，在 `Settings > Code and automation > Pages > Build and deployment` 指定以 Github Actions 构建。

最后在Github网站找到你克隆仓库的 `Settings > Code and automation > Environments > github-pages`将 Configure github-pages 设置为 No restriction。

我们只需要在 `articles` 分支提交文章，在命令行执行：

```bash
git checkout pages

git marge articles
```

将 articles 分支合并进 pages 分支，触发 GithubActions 自动构建。
