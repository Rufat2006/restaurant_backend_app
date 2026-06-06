"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var possible_values = {};

var Over = /*#__PURE__*/function () {
  function Over(overHistory, jo) {
    _classCallCheck(this, Over);

    this.overHistory = overHistory;
    this.balls = jo.balls;
    this.over = jo.over;
    this.calculated = false;
  }

  _createClass(Over, [{
    key: "calculate",
    value: function calculate() {
      if (!this.calculated) {
        this.runs = 0;
        this.dots = 0;
        this.nbs = 0;
        this.wds = 0;
        this.wickets = 0;

        var _iterator = _createForOfIteratorHelper(this.balls),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var ball = _step.value;

            if (ball.length === 1) {
              if (ball === ".") {
                this.dots += 1;
              } else if (ball === "W") {
                this.wickets += 1;
              } else {
                // if we are here, ball is definitely a number in "1234567"
                this.runs += parseInt(ball);
              }

              continue;
            }

            if (ball.includes("Wd")) {
              this.wds += 1;
              ball = ball.replace("Wd", "");
            }

            if (ball.includes("Nb")) {
              this.nbs += 1;
              ball = ball.replace("Nb", "");
            }

            if (ball.includes("W")) {
              this.wickets += 1;
              ball = ball.replace("W", "");
            }

            if (ball.includes("Lb")) {
              ball = ball.replace("Lb", "");
            }

            if (ball.includes("B")) {
              ball = ball.replace("B", "");
            }

            this.runs += parseInt(ball);
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      }

      this.calculated = true;
    }
  }, {
    key: "getRuns",
    value: function getRuns() {
      this.calculate();
      return this.runs;
    }
  }, {
    key: "getWickets",
    value: function getWickets() {
      this.calculate();
      return this.wickets;
    }
  }, {
    key: "getHeightPercent",
    value: function getHeightPercent() {
      var n = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 32;
      // returns percent value for height of over's bar in scoring-graph
      // n=32 run over is full 100%
      var height = (this.getRuns() * 100 / n).toFixed() + "%";
      return height;
    }
  }, {
    key: "consoleLog",
    value: function consoleLog() {
      console.log("\tover no. ".concat(this.over, ": [").concat(this.balls.join('-'), "] => ").concat(this.getRuns(), " runs"));
    }
  }]);

  return Over;
}();

var OverHistory = /*#__PURE__*/function () {
  function OverHistory(teamInning, jo) {
    _classCallCheck(this, OverHistory);

    this.teamInning = teamInning;
    this.jo = jo;
    this.overs = [];

    var _iterator2 = _createForOfIteratorHelper(jo),
        _step2;

    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        var oj = _step2.value;
        this.overs.push(new Over(this, oj));
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }

    this.possible_values = possible_values;
    this.calculated = false;
  }

  _createClass(OverHistory, [{
    key: "calculate",
    value: function calculate() {
      if (!this.calculated) {
        this.runs = 0;
        this.wickets = 0;

        var _iterator3 = _createForOfIteratorHelper(this.overs),
            _step3;

        try {
          for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
            var over = _step3.value;
            this.runs += over.getRuns();
            this.wickets += over.getWickets();
          }
        } catch (err) {
          _iterator3.e(err);
        } finally {
          _iterator3.f();
        }
      }

      this.calculated = true;
    }
  }, {
    key: "getRuns",
    value: function getRuns() {
      this.calculate();
      return this.runs;
    }
  }, {
    key: "getWickets",
    value: function getWickets() {
      this.calculate();
      return this.wickets;
    }
  }, {
    key: "printIfBad",
    value: function printIfBad() {
      if (this.getRuns() !== this.teamInning.runs || this.getWickets() !== this.teamInning.wkts) {
        // 2 matches with runs not matching
        // 4 matches with wickets not matching, because batsman was retired hurt
        console.log("BAD OverHistory: ".concat(this.teamInning.match.getName4CL()));
        console.log("\t=> calculated: [".concat(this.getRuns(), "/").concat(this.getWickets(), "] runs"));
        console.log("\t=>     actual: [".concat(this.teamInning.runs, "/").concat(this.teamInning.wkts, "] runs"));
      }
    }
  }, {
    key: "consoleLog",
    value: function consoleLog() {
      console.log("OverHistory: ".concat(this.getRuns(), " runs === ").concat(this.teamInning.runs, " runs"));

      var _iterator4 = _createForOfIteratorHelper(this.overs),
          _step4;

      try {
        for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
          var over = _step4.value;
          over.consoleLog();
        }
      } catch (err) {
        _iterator4.e(err);
      } finally {
        _iterator4.f();
      }
    }
  }]);

  return OverHistory;
}();

exports.default = OverHistory;