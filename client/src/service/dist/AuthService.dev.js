"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Api = _interopRequireDefault(require("@/service/Api"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = {
  register: function register(data) {
    return regeneratorRuntime.async(function register$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt("return", (0, _Api["default"])().post('/register', data));

          case 1:
          case "end":
            return _context.stop();
        }
      }
    });
  },
  status: function status() {
    return (0, _Api["default"])().get('/status');
  },
  linkWikidotUsername: function linkWikidotUsername(data) {
    return regeneratorRuntime.async(function linkWikidotUsername$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            return _context2.abrupt("return", (0, _Api["default"])().post('/link', data));

          case 1:
          case "end":
            return _context2.stop();
        }
      }
    });
  },
  getWikidotUsername: function getWikidotUsername(uid) {
    return regeneratorRuntime.async(function getWikidotUsername$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            return _context3.abrupt("return", (0, _Api["default"])().get('/link', {
              params: {
                uid: uid
              }
            }));

          case 1:
          case "end":
            return _context3.stop();
        }
      }
    });
  }
};
exports["default"] = _default;