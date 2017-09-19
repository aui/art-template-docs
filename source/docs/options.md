---
title: Options
categories: docs
comments: false
---

`template.defaults`

```js
// template name
filename: null,

// an array of rules of template syntax
rules: [nativeRule, artRule],

// whether to automatically encode output statements of template. Setting false will close that functionality
// escape can prevent XSS attacks
escape: true,

// enable debug mode. If true: {cache:false, minimize:false, compileDebug:true}
debug: detectNode ? process.env.NODE_ENV !== 'production' : false,

// if bail is set true, compilation errors and runtime errors will throw exception
bail: true,

// whether to enable caching
cache: true,

// whether to enable minimization. It will execute htmlMinifier and minimize HTML, CSS, JS
// if template contains unclosing tags, please don't open minimize. Otherwise unclosing tags will be restored or filtered
minimize: true,

// whether to compile in debug mode
compileDebug: false,

// resolve template path
resolveFilename: resolveFilename,

// sub template compilation adapter
include: include,

// HTML minifier. Work only in NodeJS environment
htmlMinifier: htmlMinifier,

// HTML minifier configuration. Refer to: https://github.com/kangax/html-minifier
htmlMinifierOptions: {
    collapseWhitespace: true,
    minifyCSS: true,
    minifyJS: true,
    // automatically merged at runtime: rules.map(rule => rule.test)
    ignoreCustomFragments: []
},

// error events. Work only if bail is false
onerror: onerror,

// template file loader
loader: loader,

// cache center adapter (depend on filename field)
caches: caches,

// root directory of template. If filename field is not a local path, template will be found in root directory
root: '/',

// default extension. If no extensions, extname will be automatically added
extname: '.art',

// ignored variables. An array of template variables ignored by template compiler
ignore: [],

// imported template variables
imports: runtime
```