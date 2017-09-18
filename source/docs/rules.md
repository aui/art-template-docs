---
title: Parsing rules
categories: docs
comments: false
---

`template.defaults.rules`

You can customize template parsing rules in art-template. Standard syntax and orginal syntax is configured by default.

## Modify delimiters

```js
// delimiter rules of original syntax
template.defaults.rules[0].test = /<%(#?)((?:==|=#|[=-])?)[ \t]*([\w\W]*?)[ \t]*(-?)%>/;
// delimiter rules of standard syntax
template.defaults.rules[1].test = /{{([@#]?)[ \t]*(\/?)([\w\W]*?)[ \t]*}}/;
```

They are regular expressions and you can only modify the delimiter part. For example, modify `<%` `%>` to `<?` `?>`:

```js
var rule = template.defaults.rules[0];
rule.test = new RegExp(rule.test.source.replace('<%', '<\\\?').replace('%>', '\\\?>'));
```

## Add syntax

Let's start with a simple example that make template engine support parse of template strings `${name}` of ES6:

```js
template.defaults.rules.push({
    test: /\${([\w\W]*?)}/,
    use: function(match, code) {
        return {
            code: code,
            output: 'escape'
        }
    }
});
```

`test` is a regular expression which matches strings and `use` is a callback function after matching. About `use` function:

* parameters: first parameter is the matching string, and others are content of capturing group of `test` regular expression
* return value: MUST return an object containing `code` and `output` properties:
    * `code` transformed JavaScript statements 
    * `output` describe type of `code`, optional value:
        * `'escape'` output after encoding
        * `'raw'` output raw content
        * `false` output nothing

It's worth mentioning that syntax rules have no effect on rendering speed and template parser will help you optimize rendering performance.