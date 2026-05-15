---
title: 添加导航栏分栏页
date: 2026-05-15 22:00
summary: 添加主页的导航栏分栏页内容
index: 3
tags:
  - 博客
topic:
  name: YmBlog开发手册
  description: 关于如何基于YmBlog开发/部署个人静态博客方法文档
---

# 添加分栏页

你可以在主页的导航栏下建立一个新的栏位，用于展示其他信息。

你可以找到页面上方的 `tabs` 常量数组，这里定义了所有主页的分栏页，只需要添加一行关于页面的配置。

```ts
import HomeAboutTab from './home/HomeAboutTab.vue' // 引入分栏页 vue 文件

const tabs = [
  { key: 'blog', label: '博客', component: HomeBlogTab },

  { key: 'about', label: '关于我', component: HomeAboutTab },
  // 添加一个 "关于我" 页
] as const
```

- `key` 是这个分栏页的 `标识符`。
- `label` 是这个分栏显示的文本。
- `component` 是对应分栏页的 `.vue` 页面，需要将对应页面放到 `docs/.vitepress/theme/components/home/` 下。

你也可以编写一个引导器页面，用MD文档编写内容。

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

## 修改默认分栏页

你可以在主页的 `defaultTab` 字段指定默认展示的分栏页标识符。

```ts
const defaultTab = 'blog' // 这里指定首页为 blog
```

这样每次进入首页，就会自动进入当前分栏页。