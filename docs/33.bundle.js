(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[33],{

/***/ "./node_modules/monaco-editor/esm/vs/basic-languages/pug/pug.js":
/*!**********************************************************************!*\
  !*** ./node_modules/monaco-editor/esm/vs/basic-languages/pug/pug.js ***!
  \**********************************************************************/
/*! exports provided: conf, language */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"conf\", function() { return conf; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"language\", function() { return language; });\n/*---------------------------------------------------------------------------------------------\n *  Copyright (c) Microsoft Corporation. All rights reserved.\n *  Licensed under the MIT License. See License.txt in the project root for license information.\n *--------------------------------------------------------------------------------------------*/\n\nvar conf = {\n    comments: {\n        lineComment: '//'\n    },\n    brackets: [['{', '}'], ['[', ']'], ['(', ')']],\n    autoClosingPairs: [\n        { open: '\"', close: '\"', notIn: ['string', 'comment'] },\n        { open: '\\'', close: '\\'', notIn: ['string', 'comment'] },\n        { open: '{', close: '}', notIn: ['string', 'comment'] },\n        { open: '[', close: ']', notIn: ['string', 'comment'] },\n        { open: '(', close: ')', notIn: ['string', 'comment'] },\n    ],\n    folding: {\n        offSide: true\n    }\n};\nvar language = {\n    defaultToken: '',\n    tokenPostfix: '.pug',\n    ignoreCase: true,\n    brackets: [\n        { token: 'delimiter.curly', open: '{', close: '}' },\n        { token: 'delimiter.array', open: '[', close: ']' },\n        { token: 'delimiter.parenthesis', open: '(', close: ')' }\n    ],\n    keywords: ['append', 'block', 'case', 'default', 'doctype', 'each', 'else', 'extends',\n        'for', 'if', 'in', 'include', 'mixin', 'typeof', 'unless', 'var', 'when'],\n    tags: [\n        'a', 'abbr', 'acronym', 'address', 'area', 'article', 'aside', 'audio',\n        'b', 'base', 'basefont', 'bdi', 'bdo', 'blockquote', 'body', 'br', 'button',\n        'canvas', 'caption', 'center', 'cite', 'code', 'col', 'colgroup', 'command',\n        'datalist', 'dd', 'del', 'details', 'dfn', 'div', 'dl', 'dt',\n        'em', 'embed',\n        'fieldset', 'figcaption', 'figure', 'font', 'footer', 'form', 'frame', 'frameset',\n        'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'head', 'header', 'hgroup', 'hr', 'html',\n        'i', 'iframe', 'img', 'input', 'ins',\n        'keygen', 'kbd',\n        'label', 'li', 'link',\n        'map', 'mark', 'menu', 'meta', 'meter',\n        'nav', 'noframes', 'noscript',\n        'object', 'ol', 'optgroup', 'option', 'output',\n        'p', 'param', 'pre', 'progress',\n        'q',\n        'rp', 'rt', 'ruby',\n        's', 'samp', 'script', 'section', 'select', 'small', 'source', 'span', 'strike', 'strong', 'style', 'sub', 'summary', 'sup',\n        'table', 'tbody', 'td', 'textarea', 'tfoot', 'th', 'thead', 'time', 'title', 'tr', 'tracks', 'tt',\n        'u', 'ul',\n        'video',\n        'wbr'\n    ],\n    // we include these common regular expressions\n    symbols: /[\\+\\-\\*\\%\\&\\|\\!\\=\\/\\.\\,\\:]+/,\n    escapes: /\\\\(?:[abfnrtv\\\\\"']|x[0-9A-Fa-f]{1,4}|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/,\n    tokenizer: {\n        root: [\n            // Tag or a keyword at start\n            [/^(\\s*)([a-zA-Z_-][\\w-]*)/,\n                {\n                    cases: {\n                        '$2@tags': {\n                            cases: {\n                                '@eos': ['', 'tag'],\n                                '@default': ['', { token: 'tag', next: '@tag.$1' },]\n                            }\n                        },\n                        '$2@keywords': ['', { token: 'keyword.$2' },],\n                        '@default': ['', '',]\n                    }\n                }\n            ],\n            // id\n            [/^(\\s*)(#[a-zA-Z_-][\\w-]*)/, {\n                    cases: {\n                        '@eos': ['', 'tag.id'],\n                        '@default': ['', { token: 'tag.id', next: '@tag.$1' }]\n                    }\n                }],\n            // class\n            [/^(\\s*)(\\.[a-zA-Z_-][\\w-]*)/, {\n                    cases: {\n                        '@eos': ['', 'tag.class'],\n                        '@default': ['', { token: 'tag.class', next: '@tag.$1' }]\n                    }\n                }],\n            // plain text with pipe\n            [/^(\\s*)(\\|.*)$/, ''],\n            { include: '@whitespace' },\n            // keywords\n            [/[a-zA-Z_$][\\w$]*/, {\n                    cases: {\n                        '@keywords': { token: 'keyword.$0' },\n                        '@default': ''\n                    }\n                }],\n            // delimiters and operators\n            [/[{}()\\[\\]]/, '@brackets'],\n            [/@symbols/, 'delimiter'],\n            // numbers\n            [/\\d+\\.\\d+([eE][\\-+]?\\d+)?/, 'number.float'],\n            [/\\d+/, 'number'],\n            // strings:\n            [/\"/, 'string', '@string.\"'],\n            [/'/, 'string', '@string.\\''],\n        ],\n        tag: [\n            [/(\\.)(\\s*$)/, [{ token: 'delimiter', next: '@blockText.$S2.' }, '']],\n            [/\\s+/, { token: '', next: '@simpleText' }],\n            // id\n            [/#[a-zA-Z_-][\\w-]*/, {\n                    cases: {\n                        '@eos': { token: 'tag.id', next: '@pop' },\n                        '@default': 'tag.id'\n                    }\n                }],\n            // class\n            [/\\.[a-zA-Z_-][\\w-]*/, {\n                    cases: {\n                        '@eos': { token: 'tag.class', next: '@pop' },\n                        '@default': 'tag.class'\n                    }\n                }],\n            // attributes\n            [/\\(/, { token: 'delimiter.parenthesis', next: '@attributeList' }],\n        ],\n        simpleText: [\n            [/[^#]+$/, { token: '', next: '@popall' }],\n            [/[^#]+/, { token: '' }],\n            // interpolation\n            [/(#{)([^}]*)(})/, {\n                    cases: {\n                        '@eos': ['interpolation.delimiter', 'interpolation', { token: 'interpolation.delimiter', next: '@popall' }],\n                        '@default': ['interpolation.delimiter', 'interpolation', 'interpolation.delimiter']\n                    }\n                }],\n            [/#$/, { token: '', next: '@popall' }],\n            [/#/, '']\n        ],\n        attributeList: [\n            [/\\s+/, ''],\n            [/(\\w+)(\\s*=\\s*)(\"|')/, ['attribute.name', 'delimiter', { token: 'attribute.value', next: '@value.$3' }]],\n            [/\\w+/, 'attribute.name'],\n            [/,/, {\n                    cases: {\n                        '@eos': { token: 'attribute.delimiter', next: '@popall' },\n                        '@default': 'attribute.delimiter'\n                    }\n                }],\n            [/\\)$/, { token: 'delimiter.parenthesis', next: '@popall' }],\n            [/\\)/, { token: 'delimiter.parenthesis', next: '@pop' }],\n        ],\n        whitespace: [\n            [/^(\\s*)(\\/\\/.*)$/, { token: 'comment', next: '@blockText.$1.comment' }],\n            [/[ \\t\\r\\n]+/, ''],\n            [/<!--/, { token: 'comment', next: '@comment' }],\n        ],\n        blockText: [\n            [/^\\s+.*$/, {\n                    cases: {\n                        '($S2\\\\s+.*$)': { token: '$S3' },\n                        '@default': { token: '@rematch', next: '@popall' }\n                    }\n                }],\n            [/./, { token: '@rematch', next: '@popall' }]\n        ],\n        comment: [\n            [/[^<\\-]+/, 'comment.content'],\n            [/-->/, { token: 'comment', next: '@pop' }],\n            [/<!--/, 'comment.content.invalid'],\n            [/[<\\-]/, 'comment.content']\n        ],\n        string: [\n            [/[^\\\\\"'#]+/, {\n                    cases: {\n                        '@eos': { token: 'string', next: '@popall' },\n                        '@default': 'string'\n                    }\n                }],\n            [/@escapes/, {\n                    cases: {\n                        '@eos': { token: 'string.escape', next: '@popall' },\n                        '@default': 'string.escape'\n                    }\n                }],\n            [/\\\\./, {\n                    cases: {\n                        '@eos': { token: 'string.escape.invalid', next: '@popall' },\n                        '@default': 'string.escape.invalid'\n                    }\n                }],\n            // interpolation\n            [/(#{)([^}]*)(})/, ['interpolation.delimiter', 'interpolation', 'interpolation.delimiter']],\n            [/#/, 'string'],\n            [/[\"']/, {\n                    cases: {\n                        '$#==$S2': { token: 'string', next: '@pop' },\n                        '@default': { token: 'string' }\n                    }\n                }],\n        ],\n        // Almost identical to above, except for escapes and the output token\n        value: [\n            [/[^\\\\\"']+/, {\n                    cases: {\n                        '@eos': { token: 'attribute.value', next: '@popall' },\n                        '@default': 'attribute.value'\n                    }\n                }],\n            [/\\\\./, {\n                    cases: {\n                        '@eos': { token: 'attribute.value', next: '@popall' },\n                        '@default': 'attribute.value'\n                    }\n                }],\n            [/[\"']/, {\n                    cases: {\n                        '$#==$S2': { token: 'attribute.value', next: '@pop' },\n                        '@default': { token: 'attribute.value' }\n                    }\n                }],\n        ],\n    },\n};\n\n\n//# sourceURL=webpack:///./node_modules/monaco-editor/esm/vs/basic-languages/pug/pug.js?");

/***/ })

}]);