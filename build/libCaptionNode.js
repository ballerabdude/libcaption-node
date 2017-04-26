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

var LibCaptionNode = function () {
  function LibCaptionNode() {
    _classCallCheck(this, LibCaptionNode);

    this.libcaption = new _libcaption2.default();
  }

  _createClass(LibCaptionNode, [{
    key: 'mp4scc',
    value: function () {
      var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(mp4FilePath, sccFilePath) {
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
                return this._convertToFlv(mp4FilePath, flvFilePath);

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
                return this._convertToOutput(flvFilePathECC, mp4FilePath);

              case 33:
                _context.next = 38;
                break;

              case 35:
                _context.prev = 35;
                _context.t3 = _context['catch'](30);
                throw logger.error(_context.t3);

              case 38:

                logger.debug(mp4FilePath);

                return _context.abrupt('return', true);

              case 40:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[1, 8], [12, 17], [22, 27], [30, 35]]);
      }));

      function mp4scc(_x, _x2) {
        return _ref.apply(this, arguments);
      }

      return mp4scc;
    }()
  }, {
    key: '_convertToFlv',
    value: function _convertToFlv(mp4FilePath, output) {
      return new Promise(function (resolve, reject) {

        (0, _ffmpegNode.exec)(['-i', mp4FilePath, '-codec', 'copy', '-f', 'flv', output], function (stderr, stdout, code) {
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
        (0, _ffmpegNode.exec)(['-i', videoFilePath, '-codec', 'copy', '-y', output // Overwrite the original
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