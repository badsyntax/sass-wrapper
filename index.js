var EventEmitter = require('events').EventEmitter;
var spawn = require('child_process').spawn;
var sass = new EventEmitter();

/**
 * Prepare the command arguments.
 * Available options:
 * {
 *   filepath: '/path/to/file.scss',
 *   data: '.mysass{.style{color:red}}',
 *   compass: true,
 *   style: 'nested',
 *   precision: 3,
 *   loadPath: '/path/to/dir'
 * }
 * @param  {object} options - The options passed to the compile method
 * @return {array}
 */
function getArgs(options) {

  if (!options.data && !options.filepath) {
    throw new Error('Please either specify a filepath or data string to compile');
  }

  var args = [];

  if (options.filepath) {
    args.push(options.filepath);
  }
  if (options.type || options.data) {
    args.push('--' + (options.type || 'scss'));
  }
  if (options.compass) {
    args.push('--compass');
  }
  if (options.style) {
    args.push('--style', options.style);
  }
  if (options.precision) {
    args.push('--precision', options.precision);
  }
  if (options.loadPath) {
    args.push('--load-path', options.loadPath);
  }

  return args;
}

/**
 * Compiles the sass, either from a filepath or from a data string
 * @param {object} options - The compile options
 */
sass.compile = function(options) {

  var child = spawn('sass', getArgs(options));

  child.stdout.setEncoding('utf8');
  child.stdout.on('data', function (data) {
    sass.emit('success', new Buffer(data).toString('utf8'));
  });

  child.stderr.setEncoding('utf8');
  child.stderr.on('data', function (data) {
    sass.emit('error', new Buffer(data).toString('utf8'));
  });

  if (options.data) {
    child.stdin.setEncoding('utf8');
    child.stdin.write(options.data);
    child.stdin.end();
  }
};

module.exports = sass;