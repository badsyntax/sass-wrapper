# sass-wrapper

A nodejs module that provides a friendly javascript API for compiling sass. This module is simply a wrapper
around the sass utility, and thus you need to have sass installed on your system to use this module.

## Example

```javascript
var sass = require('./sass-wrapper');

sass.on('success', function(data) {
  console.log(data);
});

sass.on('error', function(err) {
  console.log(err);
});

// You can specify a filepath to compile...
sass.compile({
  filepath: 'styles.scss'
});

// Or pass in a string of sass...
sass.compile({
  data: '.mysass{.important{color:red;}}',
  type: 'scss' // (optional) 'scss' or 'sass'
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