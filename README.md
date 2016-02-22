# bindling [![Build Status](https://travis-ci.org/bealearts/bindling.svg)](https://travis-ci.org/bealearts/bindling) [![npm version](https://badge.fury.io/js/bindling.svg)](http://badge.fury.io/js/bindling)
Declarative View-Model-Binding for HTML

## Installation
```shell
npm install bindling --save
```

## Usage
```js
var bindling = require('bindling');
var template = require('./template.html');

var model = {
  name: 'Enter your name',
  update: function(value) {
    this.name = value;
  }
};

var element = bindling(template, model);

document.querySelector('body').appendChild(element);
```

template.html
```html
<section>
  <input type="text" on-input="update(this.value)"><span>{name}</span>
</section>
```
