'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Created by abdulhagi on 4/25/17.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */


var _log4js = require('log4js');

var _log4js2 = _interopRequireDefault(_log4js);

var _libcaption = require('./libcaption');

var _libcaption2 = _interopRequireDefault(_libcaption);

var _tmp = require('tmp');

var _tmp2 = _interopRequireDefault(_tmp);

var _ffmpegNode = require('ffmpeg-node');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var logger = _log4js2.default.getLogger('[' + __filename.split('/')[__filename.split('/').length - 1] + ']');


logger.level = process.env.LOG_LEVEL || 'error';

var LibCaptionNode = function () {
  function LibCaptionNode() {
    _classCallCheck(this, LibCaptionNode);

    this.libcaption = new _libcaption2.default();
  }

  _createClass(LibCaptionNode, [{
    key: 'embedscc',
    value: function () {
      var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(input, sccFilePath, output) {
        var tmpDir, flvFilePath, flvFilePathECC;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:

                // Create temp dir to work in
                tmpDir = void 0;
                _context.prev = 1;
                _context.next = 4;
                return this._createTmpDir();

              case 4:
                tmpDir = _context.sent;

                logger.debug('Dir: ', tmpDir.path);
                _context.next = 11;
                break;

              case 8:
                _context.prev = 8;
                _context.t0 = _context['catch'](1);
                throw logger.error(_context.t0);

              case 11:

                // set the output for the flv
                flvFilePath = tmpDir.path + '/source.flv';
                _context.prev = 12;
                _context.next = 15;
                return this._convertToFlv(input, flvFilePath);

              case 15:
                _context.next = 20;
                break;

              case 17:
                _context.prev = 17;
                _context.t1 = _context['catch'](12);
                throw logger.error(_context.t1);

              case 20:

                logger.debug(flvFilePath);

                // set the output for the flv with captions
                flvFilePathECC = tmpDir.path + '/source_ecc.flv';
                _context.prev = 22;
                _context.next = 25;
                return this.libcaption.flvscc(flvFilePath, sccFilePath, flvFilePathECC);

              case 25:
                _context.next = 30;
                break;

              case 27:
                _context.prev = 27;
                _context.t2 = _context['catch'](22);
                throw logger.error(_context.t2);

              case 30:
                _context.prev = 30;
                _context.next = 33;
                return this._convertToOutput(flvFilePathECC, output);

              case 33:
                _context.next = 38;
                break;

              case 35:
                _context.prev = 35;
                _context.t3 = _context['catch'](30);
                throw logger.error(_context.t3);

              case 38:

                logger.debug(output);

                return _context.abrupt('return', output);

              case 40:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[1, 8], [12, 17], [22, 27], [30, 35]]);
      }));

      function embedscc(_x, _x2, _x3) {
        return _ref.apply(this, arguments);
      }

      return embedscc;
    }()
  }, {
    key: 'embedsrt',
    value: function () {
      var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(input, srtFilePath, output) {
        var tmpDir, flvFilePath, flvFilePathECC;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:

                // Create temp dir to work in
                tmpDir = void 0;
                _context2.prev = 1;
                _context2.next = 4;
                return this._createTmpDir();

              case 4:
                tmpDir = _context2.sent;

                logger.debug('Dir: ', tmpDir.path);
                _context2.next = 11;
                break;

              case 8:
                _context2.prev = 8;
                _context2.t0 = _context2['catch'](1);
                throw logger.error(_context2.t0);

              case 11:

                // set the output for the flv
                flvFilePath = tmpDir.path + '/source.flv';
                _context2.prev = 12;
                _context2.next = 15;
                return this._convertToFlv(input, flvFilePath);

              case 15:
                _context2.next = 20;
                break;

              case 17:
                _context2.prev = 17;
                _context2.t1 = _context2['catch'](12);
                throw logger.error(_context2.t1);

              case 20:

                logger.debug(flvFilePath);

                // set the output for the flv with captions
                flvFilePathECC = tmpDir.path + '/source_ecc.flv';
                _context2.prev = 22;
                _context2.next = 25;
                return this.libcaption.flvsrt(flvFilePath, srtFilePath, flvFilePathECC);

              case 25:
                _context2.next = 30;
                break;

              case 27:
                _context2.prev = 27;
                _context2.t2 = _context2['catch'](22);
                throw logger.error(_context2.t2);

              case 30:
                _context2.prev = 30;
                _context2.next = 33;
                return this._convertToOutput(flvFilePathECC, output);

              case 33:
                _context2.next = 38;
                break;

              case 35:
                _context2.prev = 35;
                _context2.t3 = _context2['catch'](30);
                throw logger.error(_context2.t3);

              case 38:

                logger.debug(output);

                return _context2.abrupt('return', output);

              case 40:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this, [[1, 8], [12, 17], [22, 27], [30, 35]]);
      }));

      function embedsrt(_x4, _x5, _x6) {
        return _ref2.apply(this, arguments);
      }

      return embedsrt;
    }()
  }, {
    key: 'mp42srt',
    value: function () {
      var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(input) {
        var tmpDir, flvFilePath, srt;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                // Create temp dir to work in
                tmpDir = void 0;
                _context3.prev = 1;
                _context3.next = 4;
                return this._createTmpDir();

              case 4:
                tmpDir = _context3.sent;

                logger.debug('Dir: ', tmpDir.path);
                _context3.next = 11;
                break;

              case 8:
                _context3.prev = 8;
                _context3.t0 = _context3['catch'](1);
                throw logger.error(_context3.t0);

              case 11:

                // set the output for the flv
                flvFilePath = tmpDir.path + '/source.flv';
                _context3.prev = 12;
                _context3.next = 15;
                return this._convertToFlv(input, flvFilePath);

              case 15:
                _context3.next = 20;
                break;

              case 17:
                _context3.prev = 17;
                _context3.t1 = _context3['catch'](12);
                throw logger.error(_context3.t1);

              case 20:

                logger.debug(flvFilePath);

                srt = void 0;
                _context3.prev = 22;
                _context3.next = 25;
                return this.libcaption.flv2srt(flvFilePath);

              case 25:
                srt = _context3.sent;
                _context3.next = 31;
                break;

              case 28:
                _context3.prev = 28;
                _context3.t2 = _context3['catch'](22);
                throw logger.error(_context3.t2);

              case 31:

                logger.debug(srt);

                return _context3.abrupt('return', srt);

              case 33:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this, [[1, 8], [12, 17], [22, 28]]);
      }));

      function mp42srt(_x7) {
        return _ref3.apply(this, arguments);
      }

      return mp42srt;
    }()
  }, {
    key: 'ts2srt',
    value: function () {
      var _ref4 = _asyncToGenerator(regeneratorRuntime.mark(function _callee4(input) {
        var srt;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                srt = void 0;
                _context4.prev = 1;
                _context4.next = 4;
                return this.libcaption.ts2srt(input);

              case 4:
                srt = _context4.sent;
                _context4.next = 10;
                break;

              case 7:
                _context4.prev = 7;
                _context4.t0 = _context4['catch'](1);
                throw logger.error(_context4.t0);

              case 10:

                logger.debug(srt);

                return _context4.abrupt('return', srt);

              case 12:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this, [[1, 7]]);
      }));

      function ts2srt(_x8) {
        return _ref4.apply(this, arguments);
      }

      return ts2srt;
    }()
  }, {
    key: '_convertToFlv',
    value: function _convertToFlv(input, output) {
      return new Promise(function (resolve, reject) {

        (0, _ffmpegNode.exec)(['-i', input, '-codec', 'copy', '-f', 'flv', output], function (stderr, stdout, code) {
          if (code !== 0) {
            return reject(stderr);
          }
          logger.debug(stderr);
          resolve();
        });
      });
    }
  }, {
    key: '_convertToOutput',
    value: function _convertToOutput(videoFilePath, output) {
      return new Promise(function (resolve, reject) {
        /* we need to convert the container over to an flv
         This step will not re-encode your video
         */
        (0, _ffmpegNode.exec)(['-loglevel', 'panic', '-i', videoFilePath, '-codec', 'copy', '-y', output // Overwrite the original
        ], function (stderr, stdout, code) {
          if (code !== 0) {
            return reject(stderr);
          }
          logger.debug(stderr);
          resolve();
        });
      });
    }
  }, {
    key: '_createTmpDir',
    value: function _createTmpDir() {
      return new Promise(function (resolve, reject) {
        _tmp2.default.dir(function (err, path, cleanupCallback) {
          if (err) return reject(err);

          resolve({ path: path, cleanupCallback: cleanupCallback });
        });
      });
    }
  }]);

  return LibCaptionNode;
}();

exports.default = LibCaptionNode;