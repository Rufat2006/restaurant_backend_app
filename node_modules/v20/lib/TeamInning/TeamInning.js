"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _BatsmanInning = _interopRequireDefault(require("./BatsmanInning"));

var _BowlerInning = _interopRequireDefault(require("./BowlerInning"));

var _Wicket = _interopRequireDefault(require("./Wicket"));

var _OverHistory = _interopRequireDefault(require("./OverHistory"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var TeamInning = /*#__PURE__*/function () {
  function TeamInning(squad, jo) {
    var _this = this;

    _classCallCheck(this, TeamInning);

    _defineProperty(this, "runrate", function () {
      return _this.balls ? _this.runs * 6 / _this.balls : 0;
    });

    _defineProperty(this, "runrateF", function () {
      var n = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
      return _this.runrate().toFixed(n);
    });

    _defineProperty(this, "actuallyHappened", function () {
      return !_this.dnp;
    });

    this.squad = squad;
    this.match = squad.match;
    this.captain = squad.captain;
    this.wk = squad.wk;
    this.tournament = squad.tournament;
    this.team = squad.team;
    this.opposition = squad.opposition;
    this.batsmen = [];
    this.bowlers = [];
    this.overHistory = null;
    this.wickets = [];

    if (jo === undefined) {
      this.dnp = true;
      return;
    }

    this.dnp = false;
    this.jo = jo;
    this.setupMeta();
    this.setupBatsmen();
    this.setupBowlers();
  }

  _createClass(TeamInning, [{
    key: "setupMeta",
    value: function setupMeta() {
      var jo = this.jo;
      this.runs = jo.runs;
      this.overs = jo.overs;
      this.balls = jo.balls;
      this.extras = jo.extras;
      this.totalExtras = _toConsumableArray(Object.values(this.extras)).reduce(function (a, b) {
        return a + b;
      }, 0);
      this.wkts = jo.wickets.length;
      this.allout = this.wkts === 10; // jo definitely exists and contains 'history' and 'wickets' keys

      this.overHistory = new _OverHistory.default(this, jo.history);

      var _iterator = _createForOfIteratorHelper(jo.wickets),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var wj = _step.value;
          var wicket = new _Wicket.default(this, wj);
          this.wickets.push(wicket);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
  }, {
    key: "setupBatsmen",
    value: function setupBatsmen() {
      var _this2 = this;

      var _iterator2 = _createForOfIteratorHelper(this.jo.batting),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var bj = _step2.value;
          var position = this.batsmen.length + 1;
          var x = new _BatsmanInning.default(this, bj, position);
          x.player.battingPerformances.push(x);
          this.batsmen.push(x);
        } // this.nzBatsmen does not contain DNB batsmen

      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }

      this.nzBatsmen = _toConsumableArray(this.batsmen);
      this.sortedBatsmen = _toConsumableArray(this.batsmen).sort(function (a, b) {
        return b.runs - a.runs;
      });
      this.bestBatsman = this.sortedBatsmen[0];
      this.squad.members.forEach(function (member) {
        var _iterator3 = _createForOfIteratorHelper(_this2.batsmen),
            _step3;

        try {
          for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
            var batsman = _step3.value;
            if (batsman.player.id === member.id) return;
          }
        } catch (err) {
          _iterator3.e(err);
        } finally {
          _iterator3.f();
        }

        var x = new _BatsmanInning.default(_this2, {
          id: member.id,
          dnb: true
        });
        x.player.battingPerformances.push(x);

        _this2.batsmen.push(x);
      });
    }
  }, {
    key: "setupBowlers",
    value: function setupBowlers() {
      var _iterator4 = _createForOfIteratorHelper(this.jo.bowling),
          _step4;

      try {
        for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
          var bj = _step4.value;
          var position = this.bowlers.length + 1;
          var x = new _BowlerInning.default(this, bj, position);
          x.player.bowlingPerformances.push(x);
          this.bowlers.push(x);
        } // this.nzBowlers does not contain DNB bowlers (if they are added in future)

      } catch (err) {
        _iterator4.e(err);
      } finally {
        _iterator4.f();
      }

      this.nzBowlers = _toConsumableArray(this.bowlers);
      this.sortedBowlers = _toConsumableArray(this.bowlers).sort(function (a, b) {
        return b.wickets - a.wickets;
      });
      this.bestBowler = this.sortedBowlers[0];
    }
  }, {
    key: "consoleLog",
    value: function consoleLog() {
      var dashes = "=".repeat(50);
      console.log(dashes);
      console.log("".concat(this.squad.team.fn, " ").concat(this.runs, "/").concat(this.wkts, " (").concat(this.overs, ") @").concat(this.runrateF()));
      console.log(dashes);

      var _iterator5 = _createForOfIteratorHelper(this.batsmen),
          _step5;

      try {
        for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
          var batsman = _step5.value;
          batsman.consoleLog();
        }
      } catch (err) {
        _iterator5.e(err);
      } finally {
        _iterator5.f();
      }

      console.log(dashes);

      var _iterator6 = _createForOfIteratorHelper(this.bowlers),
          _step6;

      try {
        for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
          var bowler = _step6.value;
          bowler.consoleLog();
        }
      } catch (err) {
        _iterator6.e(err);
      } finally {
        _iterator6.f();
      }

      console.log(dashes);
    }
  }]);

  return TeamInning;
}();

exports.default = TeamInning;