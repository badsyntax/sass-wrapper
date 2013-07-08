var sass = require('../index');
var path = require('path');

describe('Sass-Wrapper', function() {

  it('Has a compile API method', function() {
    expect(typeof sass.compile).toBe('function');
  });

  it('Should compile Sass when given a path to a file', function() {

    var d;

    sass.compile({
      filepath: path.join(__dirname, 'example.scss'),
      callback: function(err, data) {
        d = data;
      }
    });

    waitsFor(function() {
      return !!d;
    }, "Could not compile the sass", 2000);

    runs(function () {
      expect(d.replace(/\s*/g, '')).toEqual('.content-navigation{border-color:#3bbfce;color:#2ca2af;}.content-navigation.border{padding:8px;margin:8px;border-color:#3bbfce;}');
    });
  });

  it('Should compile Sass when given a string of data', function() {

    var d;

    sass.compile({
      data: '$blue:#3bbfce;$margin:16px;.content-navigation{border-color:$blue;color:darken($blue,9%);.border{padding:$margin/2;margin:$margin/2;border-color:$blue;}}',
      callback: function(err, data) {
        d = data;
      }
    });

    waitsFor(function() {
      return !!d;
    }, "Could not compile the sass", 2000);

    runs(function () {
      expect(d.replace(/\s*/g, '')).toEqual('.content-navigation{border-color:#3bbfce;color:#2ca2af;}.content-navigation.border{padding:8px;margin:8px;border-color:#3bbfce;}');
    });
  });
});
