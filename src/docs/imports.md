---
title: 模板变量
type: docs
order: 5
---

`template.defaults.imports`

模板通过 `$imports` 可以访问到模板外部的全局变量与导入的变量。

## 导入变量

```js
template.defaults.imports.log = console.log;
```

```html
<% $imports.log('hello world') %>
```

## 内置变量清单

* `$data`     传入模板的数据
* `$imports`  外部导入的变量以及全局变量
* `print`     字符串输出函数
* `include`   子模板载入函数
* `extend`    模板继承模板导入函数
* `block`     模板块声明函数