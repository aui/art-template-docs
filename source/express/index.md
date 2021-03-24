---
title: Express
categories: express
comments: false
---

art-template for express 4.x.

## Install

```bash
npm install --save art-template
npm install --save express-art-template
```

## Example

```js
var express = require('express');
var app = express();

// view engine setup
app.engine('art', require('express-art-template'));
app.set('view options', {
    debug: process.env.NODE_ENV !== 'production'
});
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'art');

// routes
app.get('/', function (req, res) {
    res.render('index.art', {
        user: {
            name: 'aui',
            tags: ['art', 'template', 'nodejs']
        }
    });
});
```

## Options

You can pass [art-template options](../docs/options.html).

## Github

Home: https://github.com/aui/express-art-template
