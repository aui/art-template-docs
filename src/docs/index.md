---
title: 介绍
type: docs
order: 2
---
art-template 是一个简约、超快的模板引擎。

它采用作用域预声明的技术来优化模板渲染速度，从而获得接近 JavaScript 极限的运行性能，并且同时支持 NodeJS 和浏览器。[在线速度测试](../rendering-test/)。

## 特性

1. 拥有接近 JavaScript 渲染极限的的性能
2. 调试友好：语法、运行时错误日志精确到模板所在行；支持在模板文件上打断点（Webpack Loader）
5. 支持 Express、Koa、Webpack
6. 支持模板继承与子模板
7. 浏览器版本仅 6KB 大小

[art-template@4.0 新特性一览](https://github.com/aui/art-template/issues/369)

## 模板

art-template 同时支持两种模板语法。标准语法可以让模板更容易读写；原始语法具有强大的逻辑处理能力。

**标准语法**

```html
{{if user}}
  <h2>{{user.name}}</h2>
{{/if}}
```

**原始语法**

```html
<% if (user) { %>
  <h2><%= user.name %></h2>
<% } %>
```

原始语法兼容 [EJS](http://ejs.co)、[Underscore](http://underscorejs.org/#template)、[LoDash](https://lodash.com/docs/#template) 模板。

## 渲染模板

```js
var template = require('art-template');
var html = template(__dirname + '/tpl-user.art', {
    user: {
        name: 'aui'
    }
});
```

## 核心方法

```js
// 基于模板名渲染模板
template(filename, data);

// 将模板源代码编译成函数
template.compile(source, options);

// 将模板源代码编译成函数并立刻执行
template.render(source, data, options);
```