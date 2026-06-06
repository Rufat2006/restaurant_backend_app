"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _PlayerInning2 = _interopRequireDefault(require("./PlayerInning"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

var BowlerInning = /*#__PURE__*/function (_PlayerInning) {
  _inherits(BowlerInning, _PlayerInning);

  var _super = _createSuper(BowlerInning);

  function BowlerInning(teamInning, jo) {
    var _this;

    var position = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

    _classCallCheck(this, BowlerInning);

    _this = _super.call(this);

    _defineProperty(_assertThisInitialized(_this), "isCaptain", function () {
      return _this.player.id === _this.teamInning.squad.oppositionSquad.captain.id;
    });

    _defineProperty(_assertThisInitialized(_this), "isWk", function () {
      return _this.player.id === _this.teamInning.squad.oppositionSquad.wk.id;
    });

    _defineProperty(_assertThisInitialized(_this), "getString", function () {
      return "".concat(_this.wickets, "-").concat(_this.runs);
    });

    _defineProperty(_assertThisInitialized(_this), "econ", function () {
      return _this.balls ? _this.runs * 6 / _this.balls : 0;
    });

    _defineProperty(_assertThisInitialized(_this), "econF", function () {
      var n = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
      return _this.econ().toFixed(n);
    });

    _this.teamInning = teamInning;
    _this.position = position;
    _this.for = teamInning.opposition;
    _this.vs = teamInning.team;
    _this.jo = jo;
    _this.player = teamInning.tournament.players[jo.id];
    _this.overs = jo.ov;
    _this.balls = jo.b;
    _this.maidens = jo.m;
    _this.runs = jo.r;
    _this.wickets = jo.w;
    _this.dots = jo.d;
    _this.wd = jo.wd;
    _this.nb = jo.nb;
    return _this;
  }

  _createClass(BowlerInning, [{
    key: "nWS",
    get: function get() {
      return this.wickets ? this.wickets : "-";
    }
  }, {
    key: "consoleLog",
    value: function consoleLog() {
      console.log("".concat(this.player.bowlsRight ? " " : "@", " ").concat(this.player.fn.padEnd(25), " ").concat(this.overs, "-").concat(this.maidens, "-").concat(this.runs, "-").concat(this.wickets, " (").concat(this.econF(), ")"));
    }
  }]);

  return BowlerInning;
}(_PlayerInning2.default);

exports.default = BowlerInning;