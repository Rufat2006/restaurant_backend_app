"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var PointsTableRow = /*#__PURE__*/function () {
  function PointsTableRow(table, team) {
    var _this = this;

    _classCallCheck(this, PointsTableRow);

    _defineProperty(this, "hasPlusNRR", function () {
      return _this.netRunrate >= 0;
    });

    _defineProperty(this, "hasMinusNRR", function () {
      return _this.netRunrate < 0;
    });

    _defineProperty(this, "getForRunRate", function () {
      var n = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 2;
      return _this.forRunrate.toFixed(n);
    });

    _defineProperty(this, "getVsRunRate", function () {
      var n = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 2;
      return _this.vsRunrate.toFixed(n);
    });

    _defineProperty(this, "getNetRunRate", function () {
      var n = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 2;
      return _this.netRunrate.toFixed(n);
    });

    _defineProperty(this, "getNetRunRateS", function () {
      var n = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 2;

      if (_this.netRunrate >= 0) {
        return "+" + _this.netRunrate.toFixed(n);
      }

      return _this.netRunrate.toFixed(n);
    });

    _defineProperty(this, "getWinPercent", function () {
      return _this.wins * 100 / _this.matches.length;
    });

    _defineProperty(this, "getWinPercentF", function () {
      var n = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
      return _this.getWinPercent().toFixed(n);
    });

    _defineProperty(this, "getLossPercent", function () {
      return _this.losses * 100 / _this.matches.length;
    });

    _defineProperty(this, "getLossPercentF", function () {
      var n = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
      return _this.getLossPercent().toFixed(n);
    });

    this.table = table;
    this.team = team;
    this.zeroInit();
    this.addMatches();
    this.setupNRR();
  }

  _createClass(PointsTableRow, [{
    key: "zeroInit",
    value: function zeroInit() {
      this.matches = [];
      this.forInnings = [];
      this.vsInnings = [];
      this.batsFirst = 0;
      this.bowlsFirst = 0;
      this.points = 0;
      this.wins = 0;
      this.losses = 0;
      this.noResults = 0;
      this.forRuns = 0;
      this.forBalls = 0;
      this.forWickets = 0;
      this.forRunrate = 0;
      this.vsRuns = 0;
      this.vsBalls = 0;
      this.vsWickets = 0;
      this.vsRunrate = 0;
      this.netNunrate = 0;
    }
  }, {
    key: "addMatches",
    value: function addMatches() {
      var _this2 = this;

      this.table.matches.forEach(function (match) {
        if (match.team_a === _this2.team || match.team_b === _this2.team) {
          _this2.matches.push(match); // adding points


          if (match.winner === null) {
            _this2.points += 1;
            _this2.noResults += 1;
          } else if (match.winner === _this2.team) {
            _this2.points += 2;
            _this2.wins += 1;
          } else if (match.loser === _this2.team) {
            _this2.losses += 1;
          } // adding runs, overs and wickets


          var forInning = null,
              vsInning = null;

          if (match.firstInning.team === _this2.team) {
            _this2.batsFirst += 1;
            forInning = match.firstInning;
            vsInning = match.secondInning;
          } else {
            _this2.bowlsFirst += 1;
            forInning = match.secondInning;
            vsInning = match.firstInning;
          }

          if (forInning && forInning.actuallyHappened()) {
            _this2.forInnings.push(forInning);

            _this2.forRuns += forInning.runs;
            _this2.forBalls += forInning.allout ? 120 : forInning.balls;
            _this2.forWickets += forInning.wkts;
          }

          if (vsInning && vsInning.actuallyHappened()) {
            _this2.vsInnings.push(vsInning);

            _this2.vsRuns += vsInning.runs;
            _this2.vsBalls += vsInning.allout ? 120 : vsInning.balls;
            _this2.vsWickets += vsInning.wkts;
          }
        }
      });
    }
  }, {
    key: "setupNRR",
    value: function setupNRR() {
      this.forRunrate = this.forRuns * 6 / this.forBalls;
      this.vsRunrate = this.vsRuns * 6 / this.vsBalls;
      this.netRunrate = this.forRunrate - this.vsRunrate;
    }
  }]);

  return PointsTableRow;
}();

exports.default = PointsTableRow;