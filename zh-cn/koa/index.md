---
title: Koa
categories: koa
comments: false
---

Koa art-template view render middleware. support all feature of art-template.

## Install

```bash
npm install --save art-template
npm install --save koa-art-template
```

## Example

```js
const Koa = require('koa');
const render = require('koa-art-template');

const app = new Koa();
render(app, {
  root: path.join(__dirname, 'view'),
  extname: '.art',
  debug: process.env.NODE_ENV !== 'production'
});

app.use(async function (ctx) {
  await ctx.render('user');
});

app.listen(8080);
```

Or you can checkout the [example](https://github.com/aui/koa-art-template/tree/master/example).

## Options

You can pass [art-template options](../docs/options.html).

## State

Support [`ctx.state` in koa](https://github.com/koajs/koa/blob/master/docs/api/context.md#ctxstate).

## Github

Home: <https://github.com/aui/koa-art-template>