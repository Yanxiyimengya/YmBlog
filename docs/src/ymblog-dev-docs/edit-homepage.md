---
title: 编辑主页
date: 2026-05-15 22:00
summary: 编辑个人主页，修改个人信息
index: 2
tags:
  - 博客
topic:
  name: YmBlog开发手册
  description: 关于如何基于YmBlog开发/部署个人静态博客方法文档
---

# 编辑主页

主页是站点的首页，展示全部的博客文章。

主页样式的 `vue` 样式文件位于仓库目录 `docs/.vitepress/theme/components/BlogHome.vue`

你可以在此修改主页的：

- 名称
- 简介
- 关键词标签
- 子页

## 修改个人信息

在主页样式文件顶部，你可以找到以下常量的声明：

```ts [BlogHome.vue]
const name = "名称" // 主页名称
const bio = "在这里填写你的个性简介~" // 主页简介
const keyword = [
  "关键词1",
  "关键词2",
] as const // 关键词标签
```

修改对应字段的内容即可改变个人信息展示。

## 修改头像

默认的头像图片保存在 `docs/img/profile-photo.png`，你可以按照源目录替换他。

> 头像图片不限定文件扩展名

你也可以手动修改头像图片的搜索目录，亦或者是硬编码路径：

```ts [BlogHome.vue]
const profilePhoto = Object.values(
  import.meta.glob('../../../img/profile-photo.*', {
    eager: true,
    import: 'default'
  })
  )[0] as string
```

## 修改Banner

默认的 Banner 图片保存在 `docs/img/banner.jpg`，你可以按照源目录替换他。

::: warning 注意
banner 图片的后缀名是确定的
:::

若想自定义 Banner 图片的目录以及图片名称，你可以修改 `docs/.vitepress/theme/style.css` 这个样式表文件。

找到文件顶部的变量定义区域，找到：

```css
:root {
  /* ... */
  --ym-banner-bg-image: url("../../img/banner.jpg");
  /* ... */
}
```

即可修改对应的 banner 图像。

### 修改网站图标

图标的图像位于 `docs/src/public/icon.svg` 只需要将图像放置在此目录即可。

你也可以在 `docs/.vitepress/config.mts` 配置文件顶部修改 `icon` 字段，指定图标的名称。

```ts
const icon = 'icon.svg'
```