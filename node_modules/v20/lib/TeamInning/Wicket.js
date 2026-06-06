"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Wicket = /*#__PURE__*/function () {
  function Wicket(teamInning, jo) {
    var _this = this;

    _classCallCheck(this, Wicket);

    _defineProperty(this, "getBalls", function () {
      return _this.over * 6 + _this.ball;
    });

    _defineProperty(this, "getRR", function () {
      return _this.runs * 6 / _this.getBalls();
    });

    _defineProperty(this, "getRRF", function () {
      var n = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
      return _this.getRR().toFixed(n);
    });

    this.teamInning = teamInning;
    this.batsman = teamInning.tournament.players[jo.id]; // this.over goes from 0-19, instead of 1-20

    this.over = jo.over - 1;
    this.ball = jo.ball;
    this.runs = jo.r;
    this.wicket = jo.w;
  }

  _createClass(Wicket, [{
    key: "setBatsmanInning",
    value: function setBatsmanInning(batsmanInning) {
      // let outType = batsmanInning.jo.out.type;
      // outType is one of ['b', 'ct', 'ro', 'lbw', 'ret', 'st', 'ob', 'reto', 'hw']
      this.batsmanInning = batsmanInning;
    }
  }]);

  return Wicket;
}();

exports.default = Wicket;