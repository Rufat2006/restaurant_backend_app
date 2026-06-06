"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var BowlingRecord = /*#__PURE__*/function () {
  function BowlingRecord(player, performances, filter) {
    var _this = this;

    _classCallCheck(this, BowlingRecord);

    _defineProperty(this, "getAvgF", function () {
      return _this.getAvg().toFixed(1);
    });

    _defineProperty(this, "getAvg", function () {
      return _this.wickets ? _this.runs / _this.wickets : 0;
    });

    _defineProperty(this, "getSRF", function () {
      return _this.getSR().toFixed(1);
    });

    _defineProperty(this, "getSR", function () {
      return _this.wickets ? _this.balls / _this.wickets : 0;
    });

    _defineProperty(this, "getEconF", function () {
      return _this.getEcon().toFixed(1);
    });

    _defineProperty(this, "getEcon", function () {
      return _this.balls ? _this.runs * 6 / _this.balls : 0;
    });

    _defineProperty(this, "getBestString", function () {
      return _this.best ? _this.best.getString() : "-";
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

  _createClass(BowlingRecord, [{
    key: "zeroInit",
    value: function zeroInit() {
      this.mats = 0;
      this.inns = 0;
      this.balls = 0;
      this.runs = 0;
      this.wickets = 0;
      this.maidens = 0;
      this.dots = 0;
      this.wd = 0;
      this.nb = 0;
      this.n1w = 0;
      this.n2w = 0;
      this.n3w = 0;
      this.n4w = 0;
      this.n5w = 0;
      this.best = null;
    }
  }, {
    key: "addInnings",
    value: function addInnings() {
      var _this2 = this;

      this.performances.forEach(function (performance) {
        _this2.mats++;
        _this2.inns++;
        _this2.runs += performance.runs;
        _this2.balls += performance.balls;
        _this2.maidens += performance.maidens;
        _this2.wickets += performance.wickets;
        _this2.dots += performance.dots;
        _this2.wd += performance.wd;
        _this2.nb += performance.nb;

        if (_this2.best === null || _this2.best.wickets < performance.wickets) {
          _this2.best = performance;
        } else if (_this2.best.wickets === performance.wickets && _this2.best.runs > performance.runs) {
          // update best figures if player took same n.o. wickets for fewer runs
          _this2.best = performance;
        }
      });
    }
  }]);

  return BowlingRecord;
}();

exports.default = BowlingRecord;