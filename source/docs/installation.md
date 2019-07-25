---
title: Installation
categories: docs
comments: false
---

## Npm

```bash
npm install art-template --save
```

## Real-time compilation in browser

download：[template-web.js](https://unpkg.com/art-template/lib/template-web.js)（gzip: 6kb）

**compatibility**

IE8+（IE8 needs patch for execution. [example](https://github.com/aui/art-template/blob/master/example/web-ie-compatible/index.html)）

**difference**

Because browser doesn't support file system, so `template(filename, data)` doesn't support passing in file paths, and inside the method it uses `document.getElementById(filename).innerHTML` to obtain templates. For instance:

```html
<script src="lib/template-web.js"></script>
<script id="tpl-user" type="text/html">
{{if user}}
  <h2>{{user.name}}</h2>
{{/if}}
</script>
```

## Pre-compilation in browser

use loader of webpack: [art-template-loader](../webpack).

## Plugins

* Webpack: [art-template-loader](../webpack)
* Express: [express-art-template](../express)
* Koa: [koa-art-template](../koa)
