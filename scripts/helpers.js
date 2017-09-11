'use strict';

var pathFn = require('path');
var _ = require('lodash');
var cheerio = require('cheerio');
var lunr = require('lunr');

var localizedPath = ['docs', 'api'];

function startsWith(str, start) {
    return str.substring(0, start.length) === start;
}

hexo.extend.helper.register('page_nav', function () {
    var categories = this.page.canonical_path.split('/')[0];
    var sidebar = this.site.data.sidebar[categories];
    var path = pathFn.basename(this.path);
    var prefix = 'sidebar.' + categories + '.';

    if (!sidebar) {
        return '';
    }

    var keys = sidebar;
    var index = keys.indexOf(path);
    var result = '';

    if (index > 0) {
        result += '<a href="' + keys[index - 1] + '" class="article-footer-prev" title="' + this.__(prefix + keys[index - 1].replace(/\.html$/, '')) + '">' +
            '<i class="fa fa-chevron-left"></i><span>' + this.__('page.prev') + '</span></a>';
    }

    if (index < keys.length - 1) {
        result += '<a href="' + keys[index + 1] + '" class="article-footer-next" title="' + this.__(prefix + keys[index + 1].replace(/\.html$/, '')) + '">' +
            '<span>' + this.__('page.next') + '</span><i class="fa fa-chevron-right"></i></a>';
    }

    return result;
});

hexo.extend.helper.register('doc_sidebar', function (className) {
    var result = `<ul class="${className}">`;
    var self = this;
    var categories = this.page.canonical_path.split('/')[0];
    var sidebar = self.site.data.sidebar;
    var cheerio;

    function toc(page, options) {
        options = options || {};

        if (!cheerio) cheerio = require('cheerio');

        var $ = cheerio.load(page.content);
        var headingsMaxDepth = options.hasOwnProperty('max_depth') ? options.max_depth : 6;
        var headingsSelector = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].slice(0, headingsMaxDepth).join(',');
        var headings = $(headingsSelector);

        if (!headings.length) return '';

        var className = options.class || 'toc';
        var listNumber = options.hasOwnProperty('list_number') ? options.list_number : true;
        var result = '<ol class="' + className + '">';
        var lastNumber = [0, 0, 0, 0, 0, 0];
        var firstLevel = 0;
        var lastLevel = 0;
        var i = 0;

        headings.each(function () {
            var level = +this.name[1];
            var id = $(this).attr('id');
            var text = $(this).text();

            lastNumber[level - 1]++;

            for (i = level; i <= 5; i++) {
                lastNumber[i] = 0;
            }

            if (firstLevel) {
                for (i = level; i < lastLevel; i++) {
                    result += '</li></ol>';
                }

                if (level > lastLevel) {
                    result += '<ol class="' + className + '-child">';
                } else {
                    result += '</li>';
                }
            } else {
                firstLevel = level;
            }

            result += '<li class="' + className + '-item ' + className + '-level-' + level + '">';
            result += '<a class="' + className + '-link" href="' + self.url_for(page.path) + '#' + id + '">';

            if (listNumber) {
                result += '<span class="' + className + '-number">';

                for (i = firstLevel - 1; i < level; i++) {
                    result += lastNumber[i] + '.';
                }

                result += '</span> ';
            }

            result += '<span class="' + className + '-text">' + text + '</span></a>';

            lastLevel = level;
        });

        for (i = firstLevel - 1; i < lastLevel; i++) {
            result += '</li></ol>';
        }

        return result;
    }

    var pages = this.site.pages.find({
        categories: categories
    }).toArray();

    pages.sort(function(a, b) {
        a = pathFn.basename(a.path);
        b = pathFn.basename(b.path);
        return sidebar.docs.indexOf(a) - sidebar.docs.indexOf(b);
    });
    
    pages.forEach(function (page) {

        result += `<li>`;
        result += `<a data-scroll href="${self.url_for(page.path)}" class="${className}-link${self.page.title === page.title ? ' current' : ''}${page.is_new ? ' new' : ''}">${page.title}</a>`;

        if (self.page.path === page.path) {
            result += toc(page, {
                class: `${className}-sub`,
                list_number: false
            });
        }

        result += `</li>`;
    });

    result += '</ul>';

    return result;
});

hexo.extend.helper.register('header_menu', function (className) {
    const menu = this.site.data.menu;
    const self = this;
    const lang = this.page.lang;
    const isEnglish = lang === 'en';
    let result = '';

    _.each(menu, function (path, title) {
        if (!isEnglish && ~localizedPath.indexOf(title)) {
            path = lang + path;
        }

        const href = self.url_for(path);
        const current = self.url_for(self.page.path).indexOf(href) === 0;

        result += `<a href="${href}" class="${className}-link ${current ? 'current' : ''}">${self.__('menu.' + title)}</a>`;
    });

    return result;
});

hexo.extend.helper.register('canonical_url', function (lang) {
    var path = this.page.canonical_path;
    if (lang && lang !== 'en') path = lang + '/' + path;

    return this.config.url + (this.config.root || '/') + path;
});

hexo.extend.helper.register('url_for_lang', function (path) {
    var lang = this.page.lang;
    var url = this.url_for(path);

    if (lang !== 'en' && url[0] === '/') url = url + lang;

    return url;
});

hexo.extend.helper.register('raw_link', function (path) {
    return 'https://github.com/aui/art-template-docs/edit/master/source/' + path;
});

hexo.extend.helper.register('page_anchor', function (str) {
    var $ = cheerio.load(str, {
        decodeEntities: false
    });
    var headings = $('h1, h2, h3, h4, h5, h6');

    if (!headings.length) return str;

    headings.each(function () {
        var id = $(this).attr('id');

        $(this)
            .addClass('article-heading')
            .append('<a class="article-anchor" href="#' + id + '" aria-hidden="true"></a>');
    });

    return $.html();
});

hexo.extend.helper.register('lunr_index', function (data) {
    var index = lunr(function () {
        this.field('name', {
            boost: 10
        });
        this.field('tags', {
            boost: 50
        });
        this.field('description');
        this.ref('id');
    });

    _.sortBy(data, 'name').forEach(function (item, i) {
        index.add(_.assign({
            id: i
        }, item));
    });

    return JSON.stringify(index.toJSON());
});

hexo.extend.helper.register('canonical_path_for_nav', function () {
    var path = this.page.canonical_path;

    if (startsWith(path, 'docs/') || startsWith(path, 'api/')) {
        return path;
    } else {
        return '';
    }
});

hexo.extend.helper.register('lang_name', function (lang) {
    var data = this.site.data.languages[lang];
    return data.name || data;
});

hexo.extend.helper.register('disqus_lang', function () {
    var lang = this.page.lang;
    var data = this.site.data.languages[lang];

    return data.disqus_lang || lang;
});