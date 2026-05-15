---
title: 部署YmBolg
date: 2026-05-15 22:00
summary: 快速部署 YmBolg
index: 1
tags:
  - 博客
topic:
  name: YmBlog开发手册
  description: 关于如何基于YmBlog开发/部署个人静态博客方法文档
---
# 部署YmBolg

## YmBlog简介

YmBlog 是一个基于 [VitePress](https://github.com/vuejs/vitepress) 的简易**静态博客网站模板框架**，它以简洁、美观为核心，使用 Markdown 驱动文章。
它是搭建个人技术博客网站的优秀选择，具备以下特点：

- Markdown 文档渲染
- 根据文章主题分页分栏
- 图像预览
- 样式简洁、可扩展能力强

## 前置准备

- [Node.js 20+](https://nodejs.org/) 环境
- [Git](https://git-scm.com/) 相关工具
- 支持 `Markdown` 的文本编辑器
  - 例如 [VSCode](https://code.visualstudio.com/) 以及相关 `Vue`/`Markdown` 扩展

## 克隆仓库

你需要将 YmBlog 仓库克隆至本地：

这要求你安装 `git` 或其他带有 `git` 的可视化客户端，例如：

- Github Desktop
- Git + VSCode客户端

在命令行/终端输入以下命令克隆仓库（当然，你仍可以选择GUI客户端）

```sh
$ it clone https://github.com/Yanxiyimengya/YmBlog.git
```

## 安装依赖

运行项目之前，你需要确保 Node 已经安装到本地：

::: code-group

```sh [npm]
$ npm install
```

```sh [pnpm]
$ pnpm install
```

:::

::: info 提示
Windows 系统用户可以直接运行仓库目录下的 `scripts/start.bat` 脚本，首次启动前会自动查看依赖是否存在。
:::

## 启动预览服务

依赖安装完成后，在命令行/终端内输入：

```sh
$ npm run dev
```

若服务正常启动，命令行/终端会输出以下内容：

```sh
vitepress v1.6.4

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
➜  press h to show help
```

在浏览器浏览 `http://localhost:5173/` 这个网址即可。