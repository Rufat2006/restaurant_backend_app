"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _PlayerInning2 = _interopRequireDefault(require("./PlayerInning"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var BatsmanInning = /*#__PURE__*/function (_PlayerInning) {
  _inherits(BatsmanInning, _PlayerInning);

  var _super = _createSuper(BatsmanInning);

  function BatsmanInning(teamInning, jo) {
    var _this;

    var position = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

    _classCallCheck(this, BatsmanInning);

    _this = _super.call(this);

    _defineProperty(_assertThisInitialized(_this), "isCaptain", function () {
      return _this.player.id === _this.teamInning.captain.id;
    });

    _defineProperty(_assertThisInitialized(_this), "isWk", function () {
      return _this.player.id === _this.teamInning.wk.id;
    });

    _defineProperty(_assertThisInitialized(_this), "sr", function () {
      return _this.balls ? _this.runs * 100 / _this.balls : 0;
    });

    _defineProperty(_assertThisInitialized(_this), "srF", function () {
      var n = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
      return _this.sr().toFixed(n);
    });

    _defineProperty(_assertThisInitialized(_this), "getBoundaries", function () {
      return _this.n4 + _this.n6;
    });

    _defineProperty(_assertThisInitialized(_this), "getBoundaryRuns", function () {
      return 4 * _this.n4 + 6 * _this.n6;
    });

    _defineProperty(_assertThisInitialized(_this), "getBoundaryPercent", function () {
      var n = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
      return (_this.getBoundaryRuns() * 100 / _this.runs).toFixed(n);
    });

    _defineProperty(_assertThisInitialized(_this), "runsString", function () {
      return _this.isOut ? _this.runs : _this.runs + "*";
    });

    _this.teamInning = teamInning;
    _this.position = position;
    _this.for = teamInning.team;
    _this.vs = teamInning.opposition;
    _this.jo = jo;
    _this.player = teamInning.tournament.players[jo.id];
    _this.dnb = jo.dnb ? true : false;
    _this.runs = jo.r;
    _this.balls = jo.b;
    _this.n4 = jo.n4;
    _this.n6 = jo.n6;
    _this.isOut = jo.out ? true : false;

    if (_this.isOut) {
      var _iterator = _createForOfIteratorHelper(teamInning.wickets),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var wicket = _step.value;

          if (_this.player === wicket.batsman) {
            wicket.setBatsmanInning(_assertThisInitialized(_this));
            _this.wicket = wicket;
            break;
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }

    return _this;
  }

  _createClass(BatsmanInning, [{
    key: "n4S",
    get: function get() {
      return this.n4 ? this.n4 : "-";
    }
  }, {
    key: "n6S",
    get: function get() {
      return this.n6 ? this.n6 : "-";
    }
  }, {
    key: "consoleLog",
    value: function consoleLog() {
      console.log("".concat(this.player.batsRight ? " " : "@", " ").concat(this.player.fn.padEnd(25), " ").concat(this.runsString(), " (").concat(this.balls, ") (").concat(this.n4, "x4, ").concat(this.n6, "x6, ").concat(this.srF(), ")"));
    }
  }]);

  return BatsmanInning;
}(_PlayerInning2.default);

exports.default = BatsmanInning;