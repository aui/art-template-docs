---
title: Debug
categories: docs
comments: false
---

`template.defaults.debug`

art-template has built-in debugger. It can catch syntax and runtime errors. In addition, it supports custom syntax. In NodeJS, debugging mode will be automatically opened according to the environment variable: `process.env.NODE_ENV !== 'production'`

Setting `template.defaults.debug=true` is equivalent to:

```json
{
    "cache": false,
    "minimize": false,
    "compileDebug": true
}
```

More for [options](./options.html).