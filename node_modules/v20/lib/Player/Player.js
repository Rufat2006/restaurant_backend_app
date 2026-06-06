"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _BaseClass2 = _interopRequireDefault(require("../BaseClass"));

var _BattingRecord = _interopRequireDefault(require("./BattingRecord"));

var _BowlingRecord = _interopRequireDefault(require("./BowlingRecord"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

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

var Player = /*#__PURE__*/function (_BaseClass) {
  _inherits(Player, _BaseClass);

  var _super = _createSuper(Player);

  function Player(tournament, jo) {
    var _this;

    _classCallCheck(this, Player);

    _this = _super.call(this);

    _defineProperty(_assertThisInitialized(_this), "getLink", function () {
      return "/players/".concat(_this.path);
    });

    _defineProperty(_assertThisInitialized(_this), "isIndian", function () {
      return _this.country === "India";
    });

    _defineProperty(_assertThisInitialized(_this), "isOverseas", function () {
      return !_this.isIndian();
    });

    _defineProperty(_assertThisInitialized(_this), "hasNeverBatted", function () {
      return !_this.hasEverBatted();
    });

    _defineProperty(_assertThisInitialized(_this), "hasNeverBowled", function () {
      return _this.bowlingPerformances.length === 0;
    });

    _defineProperty(_assertThisInitialized(_this), "hasEverBowled", function () {
      return !_this.hasNeverBowled();
    });

    _this.tournament = tournament;
    _this.jo = jo;
    _this.id = jo.id;
    _this.fn = jo.fn;
    _this.sn = jo.sn;
    _this.fun = jo.fun;
    _this.nick = jo.nick;
    _this.country = jo.country;
    _this.path = jo.path;
    _this.batsRight = jo.batsRight;
    _this.bowlsRight = jo.bowlsRight;
    _this.firstMatch = null;
    _this.lastMatch = null;
    _this.seasons = {};
    _this.forTeamIndexes = [];
    _this.vsTeamIndexes = [];
    _this.battingPerformances = [];
    _this.bowlingPerformances = [];
    return _this;
  }

  _createClass(Player, [{
    key: "postBundleSetup",
    value: function postBundleSetup() {
      var _this2 = this;

      this.battingPositions = [];
      this.battingPerformances.forEach(function (bp) {
        if (!bp.dnb) _this2.battingPositions[bp.position] = true;
      });
      this.bowlingPositions = [];
      this.bowlingPerformances.forEach(function (bp) {
        if (!bp.dnb) _this2.bowlingPositions[bp.position] = true;
      });
      this.overallBattingRecord = new _BattingRecord.default(this, this.battingPerformances, function () {
        return true;
      });
      this.overallBowlingRecord = new _BowlingRecord.default(this, this.bowlingPerformances, function () {
        return true;
      }); // default value is used when only one season is initialized

      this.debutTeam = this.battingPerformances[0] ? this.battingPerformances[0].for : this.tournament.teamsArray[0];
      var lastBattingPerformance = this.battingPerformances[this.battingPerformances.length - 1];
      this.currentTeam = lastBattingPerformance ? lastBattingPerformance.for : this.debutTeam;
      this.bdStyle = this.currentTeam.bdStyle;
      this.bgStyle = this.currentTeam.bgStyle;
      this.fgStyle = this.currentTeam.fgStyle;
    }
  }, {
    key: "hasEverBatted",
    value: function hasEverBatted() {
      var _iterator = _createForOfIteratorHelper(this.battingPerformances),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var battingPerformance = _step.value;
          if (!battingPerformance.dnb) return true;
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      return false;
    }
  }, {
    key: "addMatch",
    value: function addMatch(match) {
      this.matches.push(match);
      if (this.firstMatch === null) this.firstMatch = match;
      this.lastMatch = match;
      this.seasons[match.year] = true;
    }
  }, {
    key: "getForTeamWiseBattingRecord",
    value: function getForTeamWiseBattingRecord() {
      var _this3 = this;

      var records = [];

      _toConsumableArray(this.forTeamIndexes.keys()).forEach(function (teamIndex) {
        if (!_this3.forTeamIndexes[teamIndex]) return; // player has not played for this team

        records.push({
          team: _this3.tournament.teamsArray[teamIndex],
          record: new _BattingRecord.default(_this3, _this3.battingPerformances, function (x) {
            return x.for.index === teamIndex;
          })
        });
      });

      return records;
    }
  }, {
    key: "getVsTeamWiseBattingRecord",
    value: function getVsTeamWiseBattingRecord() {
      var _this4 = this;

      var records = [];

      _toConsumableArray(this.vsTeamIndexes.keys()).forEach(function (teamIndex) {
        if (!_this4.vsTeamIndexes[teamIndex]) return; // player has not played vs this team

        records.push({
          team: _this4.tournament.teamsArray[teamIndex],
          record: new _BattingRecord.default(_this4, _this4.battingPerformances, function (x) {
            return x.vs.index === teamIndex;
          })
        });
      });

      return records;
    }
  }, {
    key: "getForTeamWiseBowlingRecord",
    value: function getForTeamWiseBowlingRecord() {
      var _this5 = this;

      var records = [];

      _toConsumableArray(this.forTeamIndexes.keys()).forEach(function (teamIndex) {
        if (!_this5.forTeamIndexes[teamIndex]) return; // player has not played for this team

        records.push({
          team: _this5.tournament.teamsArray[teamIndex],
          record: new _BowlingRecord.default(_this5, _this5.bowlingPerformances, function (x) {
            return x.for.index === teamIndex;
          })
        });
      });

      return records;
    }
  }, {
    key: "getVsTeamWiseBowlingRecord",
    value: function getVsTeamWiseBowlingRecord() {
      var _this6 = this;

      var records = [];

      _toConsumableArray(this.vsTeamIndexes.keys()).forEach(function (teamIndex) {
        if (!_this6.vsTeamIndexes[teamIndex]) return; // player has not played vs this team

        records.push({
          team: _this6.tournament.teamsArray[teamIndex],
          record: new _BowlingRecord.default(_this6, _this6.bowlingPerformances, function (x) {
            return x.vs.index === teamIndex;
          })
        });
      });

      return records;
    }
  }, {
    key: "getPositionWiseBattingRecord",
    value: function getPositionWiseBattingRecord() {
      var _this7 = this;

      var records = [];
      this.battingPositions.forEach(function (x, position) {
        records.push({
          position: position,
          record: new _BattingRecord.default(_this7, _this7.battingPerformances, function (x) {
            return x.position === position;
          })
        });
      });
      return records;
    }
  }, {
    key: "getPositionWiseBowlingRecord",
    value: function getPositionWiseBowlingRecord() {
      var _this8 = this;

      var records = [];
      this.bowlingPositions.forEach(function (x, position) {
        records.push({
          position: position,
          record: new _BowlingRecord.default(_this8, _this8.bowlingPerformances, function (x) {
            return x.position === position;
          })
        });
      });
      return records;
    }
  }, {
    key: "getSeasonWiseBattingRecord",
    value: function getSeasonWiseBattingRecord() {
      var _this9 = this;

      var seasonWiseBattingRecord = [];
      Object.keys(this.seasons).reverse().forEach(function (year) {
        seasonWiseBattingRecord.push({
          year: year,
          record: new _BattingRecord.default(_this9, _this9.battingPerformances, function (x) {
            return x.teamInning.match.year === parseInt(year);
          })
        });
      });
      return seasonWiseBattingRecord;
    }
  }, {
    key: "getSeasonWiseBowlingRecord",
    value: function getSeasonWiseBowlingRecord() {
      var _this10 = this;

      var seasonWiseBowlingRecord = [];
      Object.keys(this.seasons).reverse().forEach(function (year) {
        seasonWiseBowlingRecord.push({
          year: year,
          record: new _BowlingRecord.default(_this10, _this10.bowlingPerformances, function (x) {
            return x.teamInning.match.year === parseInt(year);
          })
        });
      });
      return seasonWiseBowlingRecord;
    }
  }, {
    key: "printBattingPerformances",
    value: function printBattingPerformances() {
      console.log("".concat(this.fn, " (").concat(this.batsRight ? "Right" : "Left", " handed)"));

      var _iterator2 = _createForOfIteratorHelper(this.battingPerformances),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var x = _step2.value;
          x.consoleLog();
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
    }
  }, {
    key: "print50s",
    value: function print50s() {
      console.log("".concat(this.fn, " (").concat(this.batsRight ? "Right" : "Left", " handed)"));

      var _iterator3 = _createForOfIteratorHelper(this.battingPerformances),
          _step3;

      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var x = _step3.value;
          if (x.runs >= 50) x.consoleLog();
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }
    }
  }, {
    key: "printBowlingPerformances",
    value: function printBowlingPerformances() {
      console.log("".concat(this.fn, " (").concat(this.bowlsRight ? "Right" : "Left", " arm)"));

      var _iterator4 = _createForOfIteratorHelper(this.bowlingPerformances),
          _step4;

      try {
        for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
          var x = _step4.value;
          x.consoleLog();
        }
      } catch (err) {
        _iterator4.e(err);
      } finally {
        _iterator4.f();
      }
    }
  }, {
    key: "print2Ws",
    value: function print2Ws() {
      console.log("".concat(this.fn, " (").concat(this.batsRight ? "Right" : "Left", " handed)"));

      var _iterator5 = _createForOfIteratorHelper(this.bowlingPerformances),
          _step5;

      try {
        for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
          var x = _step5.value;
          if (x.wickets >= 2) x.consoleLog();
        }
      } catch (err) {
        _iterator5.e(err);
      } finally {
        _iterator5.f();
      }
    }
  }]);

  return Player;
}(_BaseClass2.default);

exports.default = Player;