---
title: API
categories: docs
comments: false
---

## template(filename, content)

Render templates according to template name.

* **Parameters**：
    * `{string} filename`
    * `{Object,string} content`
* **Return**：
    * if `content` is `Object`，render template and return `string`
    * if `content` is `string`，compile template and return `function`

```js
var html = template('/welcome.art', {
    value: 'aui'
});
```

> browser version can not load external file. `filename` is the element `id` of template

**Examples**

Compile templates and cache it.

```js
// compile && cache
template('/welcome.art', 'hi, <%=value%>.');

// use
template('/welcome.art', {
    value: 'aui'
});
```

## .compile(source, options)

Compile templates and return a rendering function.

* **Parameters**：
    * `{string} source`
    * `{Object} options`
* **Return**：`{function}`

**Examples**

```js
var render = template.compile('hi, <%=value%>.');
var html = render({value: 'aui'});
```

## .render(source, data, options)

Compile and return rendering results.

* **Parameters**：
    * `{string} source`
    * `{Object} options`
* **Return**：`{string}`

**Examples**

```js
var html = template.render('hi, <%=value%>.', {value: 'aui'});
```

## .defaults

Default configuration of template engine. Refer to [Options](./options.html).

* **Type**：`{Object}`

## .extension

Template rendering function registering for NodeJS `require.extensions`.

* **Type**：`{Object}`

**Examples**

Load `.ejs` templates:

```js
var template = require('art-template');
require.extensions['.ejs'] = template.extension;

var view = require('./index.ejs');
var html = view(data); 
```

`.art` is registered by default and you can use it directly:

```js
var template = require('art-template');
var view = require('./index.art');
var html = view(data); 
```

It should be noted that this functionality only works for NodeJS. If you want to use template rendering functionality, please use Webpack [art-template-loader](../webpack).
