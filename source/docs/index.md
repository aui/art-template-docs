---
title: Introduction
categories: docs
comments: false
---
art-template is a simple and superfast templating engine that optimizes template rendering speed by scope pre-declared technique, hence achieving runtime performance which is close to the limits of JavaScript. At the same time, it supports both NodeJS and browser. [speed test online](../rendering-test/).

## feature

1. performance is close to the JavaScript rendering limits
2. debugging friendly. Grammar errors or runtime errors will be located accurately at which line of template. Support setting breakpoint in templating files (Webpack Loader)
3. Support Express, Koa, Webpack
4. Support template inheritance and sub template
5. browser version is only 6KB

## template

art-template simultaneously supports two syntax of template. Standard syntax allows templates to be easier to read and write. While original syntax has powerful logical processing ability.

**standard syntax**

```html
{{if user}}
  <h2>{{user.name}}</h2>
{{/if}}
```

**original syntax**

```html
<% if (user) { %>
  <h2><%= user.name %></h2>
<% } %>
```

Original syntax is compatible with [EJS](http://ejs.co), [Underscore](http://underscorejs.org/#template), [LoDash](https://lodash.com/docs/#template) templates.

## render template

```js
var template = require('art-template');
var html = template(__dirname + '/tpl-user.art', {
    user: {
        name: 'aui'
    }
});
```

## core method

```js
// render template basing on template name
template(filename, data);

// compile source of template as function
template.compile(source, options);

// compile source of template as function and immediately invoke it
template.render(source, data, options);
```
