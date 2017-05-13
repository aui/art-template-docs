---
title: API
type: docs
order: 9
---

##	template(filename, content)

根据模板名渲染模板。

* **参数**：
    * `{string} filename`
    * `{Object,string} content`
* **返回值**：
    * 如果 `content` 为 `Object`，则渲染模板并返回 `string`
    * 如果 `content` 为 `string`，则编译模板并返回 `function`

```js
var html = template('/welcome.art', {
    value: 'aui'
});
```

> 浏览器版本无法加载外部文件，`filename` 为存放模板的元素 `id`

**示例**

编译模板并缓存。

```js
// compile && cache
template('/welcome.art', 'hi, <%=value%>.');

// use
template('/welcome.art', {
    value: 'aui'
});
```

##	.compile(source, options)

编译模板并返回一个渲染函数。

* **参数**：
    * `{string} source`
    * `{Object} options`
* **返回值**：`{function}`

**示例**

```js
var render = template.compile('hi, <%=value%>.');
var html = render({value: 'aui'});
```

##	.render(source, data, options)

编译并返回渲染结果。

* **参数**：
    * `{string} source`
    * `{Object} options`
* **返回值**：`{string}`

**示例**

```js
var html = template.render('hi, <%=value%>.', {value: 'aui'});
```

##	.defaults

模板引擎默认配置。参考 [选项](./options.html)。

* **类型**：`{Object}`

##  .extension

给 NodeJS `require.extensions` 注册的模板渲染函数。 

* **类型**：`{function}`

**示例**

加载 `.ejs` 模板：

```js
var template = require('art-template');
require.extensions['.ejs'] = template.extension;

var view = require('./index.ejs');
var html = view(data); 
```

`.art` 默认被注册，可以直接使用：

```js
var template = require('art-template');
var view = require('./index.art');
var html = view(data); 
```

需要注意的是：此功能仅对 NodeJS 生效，如果要在浏览器中使用模板文件渲染功能，请使用 Webpack [art-template-loader](../webpack)。