---
title: Syntax
categories: docs
comments: false
---

art-template supports standard syntax and original syntax. Standard syntax allows templates to be easier to read and write. While original syntax has powerful logical processing ability.

Standard syntax supports basic templating syntax and JavaScript expression. Original syntax supports arbitrary JavaScript statement, the same as EJS.

## Output

**standard syntax**

```html
{{value}}
{{data.key}}
{{data['key']}}
{{a ? b : c}}
{{a || b}}
{{a + b}}
```

**original syntax**

```html
<%= value %>
<%= data.key %>
<%= data['key'] %>
<%= a ? b : c %>
<%= a || b %>
<%= a + b %>
```

You can use `$data` with bracket notation to access a first-class variable of templates (such as keyword, reserved word, etc):

```html
{{$data['user list']}}
```

## Raw output

**standard syntax**

```html
{{@value}}
```

**original syntax**

```html
<%- value %>
```

> raw output will not escape the content of `HTML`, so there may be security problems. Please be careful.

## Condition

**standard syntax**

```html
{{if value}} ... {{/if}}
{{if v1}} ... {{else if v2}} ... {{/if}}
```

**original syntax**

```html
<% if (value) { %> ... <% } %>
<% if (v1) { %> ... <% } else if (v2) { %> ... <% } %>
```

## Loop

**standard syntax**

```html
{{each target}}
    {{$index}} {{$value}}
{{/each}}
```

**original syntax**

```html
<% for(var i = 0; i < target.length; i++){ %>
    <%= i %> <%= target[i] %>
<% } %>
```

1. `target` supports iteration of `array` and `object`, and its default value is `$data`.
2. `$value` and `$index` can be customized: `{% raw %}{{each target val key}}{% endraw %}`.

## Variable

**standard syntax**

```html
{{set temp = data.sub.content}}
```

**original syntax**

```html
<% var temp = data.sub.content; %> 
```

## Template inheritance

**standard syntax**

```html
{{extend './layout.art'}}
{{block 'head'}} ... {{/block}}
```

**original syntax**

```html
<% extend('./layout.art') %>
<% block('head', function(){ %> ... <% }) %>
```

Template inheritance allows you to build a basic templating "skeleton" that contains common parts of your site. Example:

```html
<!--layout.art-->
<!doctype html>
<html>
<head>
    <meta charset="utf-8">
    <title>{{block 'title'}}My Site{{/block}}</title>

    {{block 'head'}}
    <link rel="stylesheet" href="main.css">
    {{/block}}
</head>
<body>
    {{block 'content'}}{{/block}}
</body>
</html>
```

```html
<!--index.art-->
{{extend './layout.art'}}

{{block 'title'}}{{title}}{{/block}}

{{block 'head'}}
    <link rel="stylesheet" href="custom.css">
{{/block}}

{{block 'content'}}
<p>This is just an awesome page.</p>
{{/block}}
```

After rendering index.art, layout skeleton will be automatically applied.

## Sub template

**standard syntax**

```html
{{include './header.art'}}
{{include './header.art' data}}
```

**original syntax**

```html
<% include('./header.art') %>
<% include('./header.art', data) %>
```

1. `data` value is `$data` by default. Standard syntax doesn't support declaration of `object` and `array` but reference variable. However, original syntax is no limits.
2. art-template has built-in HTML minifier and please avoid writing abnormal closing tag in sub templates. Otherwise, tags may be unexpectedly "optimized" when `minimize` option is open.

## Filters

**register filters**

```js
template.defaults.imports.dateFormat = function(date, format){/*[code..]*/};
template.defaults.imports.timestamp = function(value){return value * 1000};
```

The first parameter of filter function accepts target value.

**standard syntax**

```html
{{date | timestamp | dateFormat 'yyyy-MM-dd hh:mm:ss'}}
```

`{% raw %}{{value | filter}}{% endraw %}` filter syntax is similar to pipe operator. Its last output will be the next input.

**original syntax**

```html
<%= $imports.dateFormat($imports.timestamp(date), 'yyyy-MM-dd hh:mm:ss') %>
```

> If you want to modify `{% raw %}{{{% endraw %}` `{% raw %}}}{% endraw %}` and `<%` `%>`,please refer to [rules](rules.html).