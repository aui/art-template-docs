---
title: 安装
categories: docs
comments: false
---

## Npm

```bash
npm install art-template --save
```

## 在浏览器中实时编译

下载：[lib/template-web.js](https://raw.githubusercontent.com/aui/art-template/master/lib/template-web.js)（gzip: 6kb）

**兼容**

IE8+（IE8 需要 [es5-shim](https://github.com/es-shims/es5-shim) 才能运行。[示例](./example/web-ie-compatible/index.html)）

**差异**

因为浏览器不支持文件系统，所以 `template(filename, data)` 不支持传入文件路径，它内部使用 `document.getElementById(filename).innerHTML` 来获取模板，例如：

```html
<script src="lib/template-web.js"></script>
<script id="tpl-user" type="text/html">
{{if user}}
  <h2>{{user.name}}</h2>
{{/if}}
</script>
```

## 在浏览器中预编译

使用 Webpack 的 Loader: [art-template-loader](../webpack)。

## 插件

* Webpack: [art-template-loader](../webpack)
* Express: [express-art-template](../express)
* Koa: [koa-art-template](../koa)