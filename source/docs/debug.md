---
title: 调试
categories: docs
comments: false
---

`template.defaults.debug`

art-template 内建调试器，能够捕获到语法与运行错误，并且支持自定义的语法。在 NodeJS 中调试模式会根据环境变量自动开启：`process.env.NODE_ENV !== 'production'`

设置 `template.defaults.debug=true` 后，等同于：

```json
{
    "bail": false,
    "cache": false,
    "minimize": false,
    "compileDebug": true
}
```

更多参见 [选项](./options.html)。