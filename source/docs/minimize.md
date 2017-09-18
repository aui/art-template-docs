---
title: Minimize
categories: docs
comments: false
---

`template.defaults.minimize`

Built-in minifier of art-template can minimize HTML, JS and CSS, which happens in compilation phase. So it totally has no effect on rendering speed and moreover speeds up network transmission.

## Minimize mode

```js
template.defaults.minimize = true;
```

## Configuration

Refer to: <https://github.com/kangax/html-minifier>

**default configuration**

```js
template.defaults.htmlMinifierOptions = {
    collapseWhitespace: true,
    minifyCSS: true,
    minifyJS: true,
    // automatically merged at runtime: rules.map(rule => rule.test)
    ignoreCustomFragments: []
};
```