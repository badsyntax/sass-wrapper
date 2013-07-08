/**
 * Prepare the command arguments.
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
function compile(options) {

  var cp = require('child_process').spawn('sass', getArgs(options));

  cp.stdout.setEncoding('utf8');
  cp.stdout.on('data', function (data) {
    if (options.callback) {
      options.callback(null, new Buffer(data).toString('utf8'));
    }
  });

  cp.stderr.setEncoding('utf8');
  cp.stderr.on('data', function (data) {
    if (options.callback) {
      options.callback(new Buffer(data).toString('utf8'), null);
    }
  });

  if (options.data) {
    cp.stdin.setEncoding('utf8');
    cp.stdin.write(options.data);
    cp.stdin.end();
  }
}

module.exports = {
  compile: compile
};