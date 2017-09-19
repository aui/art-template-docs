---
title: Template variable
categories: docs
comments: false
---

`template.defaults.imports`

Template can access global variable outside it and imported variable through `$imports`.

## Import variable

```js
template.defaults.imports.log = console.log;
```

```html
<% $imports.log('hello world') %>
```

## Built-in variable

* `$data`     the data passed into template
* `$imports`  variable imported from outside and global variable
* `print`     string-output function
* `include`   sub-template loading function
* `extend`    template-import function in template inheritance 
* `block`     template-block declaration function