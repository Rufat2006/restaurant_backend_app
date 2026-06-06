"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var BattingRecord = /*#__PURE__*/function () {
  function BattingRecord(player, performances, filter) {
    var _this = this;

    _classCallCheck(this, BattingRecord);

    _defineProperty(this, "getAvgF", function () {
      var n = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
      return _this.getAvg().toFixed(n);
    });

    _defineProperty(this, "getAvg", function () {
      return _this.outs ? _this.runs / _this.outs : 0;
    });

    _defineProperty(this, "getSRF", function () {
      var n = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
      return _this.getSR().toFixed(n);
    });

    _defineProperty(this, "getSR", function () {
      return _this.balls ? _this.runs * 100 / _this.balls : 0;
    });

    _defineProperty(this, "getBoundaries", function () {
      return _this.n4 + _this.n6;
    });

    _defineProperty(this, "getBoundaryRuns", function () {
      return 4 * _this.n4 + 6 * _this.n6;
    });

    _defineProperty(this, "getBoundaryPercent", function () {
      var n = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
      return (_this.getBoundaryRuns() * 100 / _this.runs).toFixed(n);
    });

    _defineProperty(this, "getHsString", function () {
      return _this.hs ? _this.hs.runsString() : "-";
    });

    this.player = player;

    if (filter) {
      this.performances = performances.filter(filter);
    } else {
      this.performances = performances;
    }

    this.zeroInit();
    this.addInnings();
  }

  _createClass(BattingRecord, [{
    key: "zeroInit",
    value: function zeroInit() {
      this.mats = 0;
      this.inns = 0;
      this.runs = 0;
      this.balls = 0;
      this.outs = 0;
      this.n4 = 0;
      this.n6 = 0;
      this.n50 = 0;
      this.n100 = 0;
      this.hs = null;
    }
  }, {
    key: "addInnings",
    value: function addInnings() {
      var _this2 = this;

      this.performances.forEach(function (performance) {
        _this2.mats++;
        if (performance.dnb) return;
        _this2.inns++;
        _this2.runs += performance.runs;
        _this2.balls += performance.balls;
        if (performance.isOut) _this2.outs++;
        _this2.n4 += performance.n4;
        _this2.n6 += performance.n6;

        if (performance.runs >= 100) {
          _this2.n100++;
        } else if (performance.runs >= 50) {
          _this2.n50++;
        }

        if (_this2.hs === null || _this2.hs.runs < performance.runs) {
          _this2.hs = performance;
        } else if (_this2.hs.runs === performance.runs && _this2.hs.balls > performance.balls) {
          // update hs if there is another inning with same runs at a faster sr
          _this2.hs = performance;
        }
      });
    }
  }]);

  return BattingRecord;
}();

exports.default = BattingRecord;