---
title: 解析规则
type: docs
order: 6
---

`template.defaults.rules`

art-template 可以自定义模板解析规则，默认配置了原始语法与标准语法。

## 修改界定符

```js
// 原始语法的界定符规则
template.defaults.rules[0].test = /<%(#?)((?:==|=#|[=-])?)([\w\W]*?)(-?)%>/;
// 标准语法的界定符规则
template.defaults.rules[1].test = /{{[ \t]*([@#]?)(\/?)([\w\W]*?)[ \t]*}}/;
```

它们是一个正则表达式，你可以只修改界定符部分。例如修改 `<%` `%>` 为 `<?` `?>`：

```js
var rule = template.defaults.rules[0];
rule.test = new RegExp(rules.test.source.replace('<%', '<?').replace('%>', '?>'));
```

## 添加语法

从一个简单的例子说起，让模板引擎支持 ES6 `${name}` 模板字符串的解析：

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

其中 `test` 是匹配字符串正则，`use` 是匹配后的调用函数。关于 `use` 函数：

* 参数：一个参数为匹配到的字符串，其余的参数依次接收 `test` 正则的分组匹配内容
* 返回值：必须返回一个对象，包含 `code` 与 `output` 两个字段：
    * `code` 转换后的 JavaScript 语句
    * `output` 描述 `code` 的类型，可选值：
        * `'escape'` 编码后进行输出
        * `'raw'` 输出原始内容
        * `false` 不输出任何内容

值得一提的是，语法规则对渲染速度没有影响，模板引擎编译器会帮你优化渲染性能。