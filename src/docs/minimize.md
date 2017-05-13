---
title: 压缩页面
type: docs
order: 7
---

`template.defaults.minimize`

art-template 内建的压缩器可以压缩 HTML、JS、CSS，它在编译阶段运行，因此完全不影响渲染速度，并且能够加快网络传输。

## 开启

```js
template.defaults.minimize = true;
```

## 配置

参见：<https://github.com/kangax/html-minifier>

**默认配置**

```js
template.defaults.htmlMinifierOptions = {
    collapseWhitespace: true,
    minifyCSS: true,
    minifyJS: true,
    // 运行时自动合并：rules.map(rule => rule.test)
    ignoreCustomFragments: []
};
```