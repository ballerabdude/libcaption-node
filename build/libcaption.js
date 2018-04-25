'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Created by abdulhagi on 4/26/17.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */


var _child_process = require('child_process');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var LibCaption = function () {
  function LibCaption() {
    _classCallCheck(this, LibCaption);

    this.libcaptionApps = {
      sccDump: process.cwd() + '/libcaption-build/libcaption/examples/sccdump',
      srtDump: process.cwd() + '/libcaption-build/libcaption/examples/srtdump',
      scc2srt: process.cwd() + '/libcaption-build/libcaption/examples/scc2srt',
      srt2vtt: process.cwd() + '/libcaption-build/libcaption/examples/srt2vtt',
      ts2srt: process.cwd() + '/libcaption-build/libcaption/examples/ts2srt',
      flv2srt: process.cwd() + '/libcaption-build/libcaption/examples/flv2srt',
      flvscc: process.cwd() + '/libcaption-build/libcaption/examples/flv+scc',
      flvsrt: process.cwd() + '/libcaption-build/libcaption/examples/flv+srt'
    };

    // This is large to get the full caption from stdout
    this.maxBuffer = 10000000; // 10MB
  }

  _createClass(LibCaption, [{
    key: 'dumpSCC',
    value: function dumpSCC(sccFilePath) {
      var cmd = this.libcaptionApps.sccDump + ' ' + sccFilePath;

      (0, _child_process.exec)(cmd, { maxBuffer: this.maxBuffer }, function (error, stdout, stderr) {
        // command output is in stdout
        console.log(stdout);
      });
    }
  }, {
    key: 'dumpSRT',
    value: function dumpSRT(srtFilePath) {
      var cmd = this.libcaptionApps.srtDump + ' ' + srtFilePath;

      (0, _child_process.exec)(cmd, { maxBuffer: this.maxBuffer }, function (error, stdout, stderr) {
        // command output is in stdout
        console.log(stdout);
      });
    }
  }, {
    key: 'scc2srt',
    value: function scc2srt(sccFilePath) {
      var cmd = this.libcaptionApps.scc2srt + ' ' + sccFilePath;

      (0, _child_process.exec)(cmd, { maxBuffer: this.maxBuffer }, function (error, stdout, stderr) {
        // command output is in stdout
        console.log(stdout);
      });
    }
  }, {
    key: 'flvscc',
    value: function flvscc(flvFilePath, sccFilePath, output) {
      var _this = this;

      return new Promise(function (resolve, reject) {
        var cmd = _this.libcaptionApps.flvscc + ' ' + flvFilePath + ' ' + sccFilePath + ' ' + output;

        (0, _child_process.exec)(cmd, { maxBuffer: _this.maxBuffer }, function (error, stdout, stderr) {
          if (!error) {
            console.log(stderr);
            return resolve();
          }

          reject(error);
        });
      });
    }
  }, {
    key: 'flvsrt',
    value: function flvsrt(flvFilePath, srtFilePath, output) {
      var _this2 = this;

      return new Promise(function (resolve, reject) {
        var cmd = _this2.libcaptionApps.flvsrt + ' ' + flvFilePath + ' ' + srtFilePath + ' ' + output;

        (0, _child_process.exec)(cmd, { maxBuffer: _this2.maxBuffer }, function (error, stdout, stderr) {
          if (!error) {
            console.log(stderr);
            return resolve();
          }

          reject(error);
        });
      });
    }
  }, {
    key: 'flv2srt',
    value: function flv2srt(flvFilePath) {
      var _this3 = this;

      return new Promise(function (resolve, reject) {
        var cmd = _this3.libcaptionApps.flv2srt + ' ' + flvFilePath;

        (0, _child_process.exec)(cmd, { maxBuffer: _this3.maxBuffer }, function (error, stdout, stderr) {
          return resolve(stdout);
          if (!error) {
            console.log(stderr);
            return resolve(stdout);
          }

          reject(error);
        });
      });
    }
  }, {
    key: 'ts2srt',
    value: function ts2srt(flvFilePath) {
      var _this4 = this;

      return new Promise(function (resolve, reject) {
        var cmd = _this4.libcaptionApps.ts2srt + ' ' + flvFilePath;

        (0, _child_process.exec)(cmd, { maxBuffer: _this4.maxBuffer }, function (error, stdout, stderr) {
          return resolve(stdout);
          if (!error) {
            console.log(stderr);
            return resolve(stdout);
          }

          reject(error);
        });
      });
    }
  }]);

  return LibCaption;
}();

exports.default = LibCaption;