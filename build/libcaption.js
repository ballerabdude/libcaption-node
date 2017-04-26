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
      flvscc: process.cwd() + '/libcaption-build/libcaption/examples/flv+scc'
    };
  }

  _createClass(LibCaption, [{
    key: 'dumpSCC',
    value: function dumpSCC(sccFilePath) {
      var cmd = this.libcaptionApps.sccDump + ' ' + sccFilePath;

      (0, _child_process.exec)(cmd, function (error, stdout, stderr) {
        // command output is in stdout
        console.log(stdout);
      });
    }
  }, {
    key: 'dumpSRT',
    value: function dumpSRT(srtFilePath) {
      var cmd = this.libcaptionApps.srtDump + ' ' + srtFilePath;

      (0, _child_process.exec)(cmd, function (error, stdout, stderr) {
        // command output is in stdout
        console.log(stdout);
      });
    }
  }, {
    key: 'scc2srt',
    value: function scc2srt(sccFilePath) {
      var cmd = this.libcaptionApps.scc2srt + ' ' + sccFilePath;

      (0, _child_process.exec)(cmd, function (error, stdout, stderr) {
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

        (0, _child_process.exec)(cmd, function (error, stdout, stderr) {
          if (!error) {
            console.log(stderr);
            return resolve();
          }

          reject(error);
        });
      });
    }
  }]);

  return LibCaption;
}();

exports.default = LibCaption;