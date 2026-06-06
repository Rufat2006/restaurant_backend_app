"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _PointsTableRow = _interopRequireDefault(require("./PointsTableRow"));

var _OrangeCapTable = _interopRequireDefault(require("./OrangeCapTable"));

var _PurpleCapTable = _interopRequireDefault(require("./PurpleCapTable"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var PointsTable = /*#__PURE__*/function () {
  function PointsTable(tournament, matches) {
    var _this = this;

    var orangePurple = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    _classCallCheck(this, PointsTable);

    // tournament, season, teams and grounds can have a points table
    this.tournament = tournament;
    this.matches = matches;
    var teamsObject = {};

    var _iterator = _createForOfIteratorHelper(this.matches),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var match = _step.value;
        teamsObject[match.team_a.id] = true;
        teamsObject[match.team_b.id] = true;
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }

    this.rows = [];
    Object.keys(teamsObject).forEach(function (teamId) {
      return _this.rows.push(new _PointsTableRow.default(_this, _this.tournament.teams[teamId]));
    });
    this.rows.sort(function (a, b) {
      if (a.points === b.points) return b.netRunrate - a.netRunrate;
      return b.points - a.points;
    });
    this.rows.forEach(function (row, index) {
      return row.position = index + 1;
    });

    if (orangePurple) {
      this.setupOrangePurple();
    }
  }

  _createClass(PointsTable, [{
    key: "setupOrangePurple",
    value: function setupOrangePurple() {
      if (!this.orangeCapTable && !this.purpleCapTable) {
        this.orangeCapTable = new _OrangeCapTable.default(this);
        this.purpleCapTable = new _PurpleCapTable.default(this);
      }
    }
  }]);

  return PointsTable;
}();

exports.default = PointsTable;