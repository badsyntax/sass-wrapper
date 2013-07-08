# sass-wrapper [![Build Status](https://travis-ci.org/badsyntax/sass-wrapper.png?branch=master)](https://travis-ci.org/badsyntax/sass-wrapper)

A nodejs module that provides a friendly javascript API for compiling sass. This module is simply a wrapper
around the sass utility, and thus you need to have sass installed on your system to use this module.

## Installation

`npm install sass-wrapper`

## Example

```javascript
var sass = require('sass-wrapper');

// You can specify a filepath to compile...
sass.compile({
  filepath: 'styles.scss',
  complete: function(err, data) {
    if (err) {
      console.log(err);
      throw err;
    }
    console.log(data);
  }
});

// Or pass in a string of sass...
sass.compile({
  data: '.mysass{.important{color:red;}}',
  type: 'scss', // {optional} 'scss' or 'sass' (defaults to 'scss')
  complete: function(err, data) {
    if (err) {
      console.log(err);
      throw err;
    }
    console.log(data);
  }
});
```

## Options

```javascript
{
  filepath: '/path/to/file.scss',
  data: '.mysass{.style{color:red}}',
  type: 'scss', 
  compass: true,
  style: 'nested',
  precision: 3,
  loadPath: '/path/to/dir'
}
```

## Tests

Run the tests with `npm test` or `grunt test`.
