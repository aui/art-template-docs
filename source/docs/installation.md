---
title: 安装
categories: docs
comments: false
---

## NodeJS

```bash
npm install art-template --save
```

## 浏览器

下载：[lib/template-web.js](https://raw.githubusercontent.com/aui/art-template/master/lib/template-web.js)（gzip: 6kb）

**兼容**

IE8+（IE8 需要 [es5-shim](https://github.com/es-shims/es5-shim) 才能运行。[示例](https://github.com/aui/art-template/blob/master/example/web-ie-compatible/index.html)）

**差异**

浏览器版本没有文件读取的能力。所以 `template(filename, data)` 不支持文件路径，它内部使用 `document.getElementById(filename).innerHTML` 来获取模板，例如：

```html
<script src="lib/template-web.js"></script>
<script id="tpl-user" type="text/html">
{{if user}}
  <h2>{{user.name}}</h2>
{{/if}}
</script>
```

## 插件

* Webpack: [art-template-loader](../webpack)
* Express: [express-art-template](../express)
* Koa: [koa-art-template](../koa)
