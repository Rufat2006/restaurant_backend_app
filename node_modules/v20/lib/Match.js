"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Squad = _interopRequireDefault(require("./Squad"));

var _TeamInning = _interopRequireDefault(require("./TeamInning"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

var Match = /*#__PURE__*/function () {
  function Match(season, jo) {
    var _this = this;

    _classCallCheck(this, Match);

    _defineProperty(this, "getLink", function () {
      return "/".concat(_this.year, "/").concat(_this.seasonIndex + 1);
    });

    _defineProperty(this, "getName4CL", function () {
      return "[".concat(_this.season.year, "] ").concat(_this.team_a.abb, " vs ").concat(_this.team_b.abb);
    });

    this.season = season;
    this.year = season.year;
    this.tournament = season.tournament;
    this.seasonIndex = season.matches.length;
    this.playoff = false;
    this.final = false;
    this.jo = jo;
    this.team_a = this.tournament.teams[jo.teams[0].team];
    this.team_b = this.tournament.teams[jo.teams[1].team];
    this.ground = this.tournament.grounds[jo.meta.ground];
    this.winner = null;
    this.loser = null;

    if (jo.meta.outcome === "A") {
      this.winner = this.team_a;
      this.loser = this.team_b;
    } else if (jo.meta.outcome === "B") {
      this.winner = this.team_b;
      this.loser = this.team_a;
    }

    this.bdStyle = this.winner && this.winner.bdStyle;
    this.bgStyle = this.winner && this.winner.bgStyle;
    this.fgStyle = this.winner && this.winner.fgStyle;
    this.order = jo.meta.order;
    this.squad_a = new _Squad.default(this, jo.teams[0], this.team_a, this.team_b);
    this.squad_b = new _Squad.default(this, jo.teams[1], this.team_b, this.team_a);
    this.squad_a.oppositionSquad = this.squad_b;
    this.squad_b.oppositionSquad = this.squad_a;
    this.players = this.squad_a.members.concat(this.squad_b.members);
    this.players.forEach(function (player) {
      return player.addMatch(_this);
    });

    if (this.order[0] === 0) {
      this.inning_a = new _TeamInning.default(this.squad_a, jo.innings[0]);
      this.inning_b = new _TeamInning.default(this.squad_b, jo.innings[1]);
    } else {
      this.inning_a = new _TeamInning.default(this.squad_a, jo.innings[1]);
      this.inning_b = new _TeamInning.default(this.squad_b, jo.innings[0]);
    }

    this.firstInning = this.order[0] === 0 ? this.inning_a : this.inning_b;
    this.secondInning = this.order[0] === 0 ? this.inning_b : this.inning_a;
    this.players = [].concat(_toConsumableArray(this.squad_a.members), _toConsumableArray(this.squad_b.members));
    this.battingPerformances = [].concat(_toConsumableArray(this.inning_a.batsmen), _toConsumableArray(this.inning_b.batsmen));
    this.bowlingPerformances = [].concat(_toConsumableArray(this.inning_a.bowlers), _toConsumableArray(this.inning_b.bowlers));
  }

  _createClass(Match, [{
    key: "consoleLog",
    value: function consoleLog() {
      if (this.firstInning) this.firstInning.consoleLog();
      if (this.secondInning) this.secondInning.consoleLog();
    }
  }]);

  return Match;
}();

exports.default = Match;