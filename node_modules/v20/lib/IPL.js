"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Ground = _interopRequireDefault(require("./Ground"));

var _Player = _interopRequireDefault(require("./Player"));

var _Team = _interopRequireDefault(require("./Team"));

var _Season = _interopRequireDefault(require("./Season"));

var _Rivalry = _interopRequireDefault(require("./Rivalry"));

var _PointsTable = _interopRequireDefault(require("./PointsTable"));

var _Utils = require("./Utils");

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

var IPL = /*#__PURE__*/function () {
  function IPL(codes) {
    var _this = this;

    _classCallCheck(this, IPL);

    _defineProperty(this, "findGroundByName", function (name) {
      return _this.findXByName(name, _this.groundsArray);
    });

    _defineProperty(this, "findPlayerByName", function (name) {
      return _this.findXByName(name, _this.playersArray);
    });

    _defineProperty(this, "findTeamByName", function (name) {
      return _this.findXByName(name, _this.teamsArray);
    });

    this.codes = codes;
    this.loadCodes();
    this.matches = [];
    this.seasons = [];
  }

  _createClass(IPL, [{
    key: "loadCodes",
    value: function loadCodes() {
      this.loadTeams();
      this.loadGrounds();
      this.loadPlayers();
      this.codesArray = [].concat(_toConsumableArray(this.teamsArray), _toConsumableArray(this.groundsArray), _toConsumableArray(this.playersArray));
    }
  }, {
    key: "loadTeams",
    value: function loadTeams() {
      this.teams = {};
      this.teamsArray = [];

      var _iterator = _createForOfIteratorHelper(this.codes.teams),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var jo = _step.value;
          var x = new _Team.default(this, jo);
          this.teams[jo.id] = x;
          this.teamsArray.push(x);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      this.teamsArray.forEach(function (x, index) {
        return x.index = index;
      });
      (0, _Utils.setNextPrev)(this.teamsArray);
    }
  }, {
    key: "loadGrounds",
    value: function loadGrounds() {
      this.grounds = {};
      this.groundsArray = [];

      var _iterator2 = _createForOfIteratorHelper(this.codes.grounds),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var jo = _step2.value;
          var x = new _Ground.default(this, jo);
          this.grounds[jo.id] = x;
          this.groundsArray.push(x);
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }

      this.groundsArray.forEach(function (x, index) {
        return x.index = index;
      });
      (0, _Utils.setNextPrev)(this.groundsArray);
    }
  }, {
    key: "loadPlayers",
    value: function loadPlayers() {
      this.players = {};
      this.playersArray = [];

      var _iterator3 = _createForOfIteratorHelper(this.codes.players),
          _step3;

      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var jo = _step3.value;
          var x = new _Player.default(this, jo);
          this.players[jo.id] = x;
          this.playersArray.push(x);
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }

      this.playersArray.forEach(function (x, index) {
        return x.index = index;
      });
      (0, _Utils.setNextPrev)(this.playersArray);
    }
  }, {
    key: "loadBundle",
    value: function loadBundle(json) {
      this.bundle = json;

      var _iterator4 = _createForOfIteratorHelper(json.seasons),
          _step4;

      try {
        for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
          var season = _step4.value;
          var x = new _Season.default(this, season);
          this.seasons.push(x);
          this.matches = this.matches.concat(x.matches); // console.log(`IPL ${x.year} has ${x.matches.length} matches.`);
          // break;
        }
      } catch (err) {
        _iterator4.e(err);
      } finally {
        _iterator4.f();
      }

      this.matches.forEach(function (m, index) {
        return m.index = index;
      });
      (0, _Utils.setNextPrev)(this.seasons);
      (0, _Utils.setNextPrev)(this.matches);
      this.pointsTable = new _PointsTable.default(this, this.matches);
      this.rivalries = [];

      var _iterator5 = _createForOfIteratorHelper(this.teamsArray),
          _step5;

      try {
        for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
          var t1 = _step5.value;

          var _iterator6 = _createForOfIteratorHelper(this.teamsArray),
              _step6;

          try {
            for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
              var t2 = _step6.value;

              if (t1.id < t2.id) {
                var r = new _Rivalry.default(this, t1, t2);

                if (r.matches.length) {
                  this.rivalries.push(r);
                }
              }
            }
          } catch (err) {
            _iterator6.e(err);
          } finally {
            _iterator6.f();
          }
        }
      } catch (err) {
        _iterator5.e(err);
      } finally {
        _iterator5.f();
      }

      this.rivalries.sort(function (a, b) {
        return b.getLength() - a.getLength();
      });
      (0, _Utils.setNextPrev)(this.rivalries);
      this.postBundleSetup();
    }
  }, {
    key: "postBundleSetup",
    value: function postBundleSetup() {
      this.teamsArray.forEach(function (x) {
        return x.postBundleSetup();
      });
      this.groundsArray.forEach(function (g) {
        return g.postBundleSetup();
      });
      this.playersArray.forEach(function (x) {
        return x.postBundleSetup();
      });
      this.overallBattingRecords = this.playersArray.map(function (r) {
        return r.overallBattingRecord;
      });
      this.overallBowlingRecords = this.playersArray.map(function (r) {
        return r.overallBowlingRecord;
      });
      this.topBatsmen = _toConsumableArray(this.overallBattingRecords).sort(function (a, b) {
        return b.runs - a.runs;
      });
      this.topBowlers = _toConsumableArray(this.overallBowlingRecords).sort(function (a, b) {
        return b.wickets - a.wickets;
      });
      this.top10Batsmen = this.topBatsmen.slice(0, 10);
      this.top10Bowlers = this.topBowlers.slice(0, 10);
    }
  }, {
    key: "getSeason",
    value: function getSeason(year) {
      var _iterator7 = _createForOfIteratorHelper(this.seasons),
          _step7;

      try {
        for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
          var season = _step7.value;
          if (season.year === year) return season;
        }
      } catch (err) {
        _iterator7.e(err);
      } finally {
        _iterator7.f();
      }

      return null;
    }
  }, {
    key: "doStuff",
    value: function doStuff() {
      this.printStatus(); // csk vs kxip
      // this.matches[1].consoleLog();
      // dhoni and oram
      // this.findPlayerByName("dhoni").print50s();
      // this.findPlayerByName("lee").print2Ws();
    }
  }, {
    key: "getTeamFromPath",
    value: function getTeamFromPath(path) {
      path = path.toLowerCase();

      var _iterator8 = _createForOfIteratorHelper(this.teamsArray),
          _step8;

      try {
        for (_iterator8.s(); !(_step8 = _iterator8.n()).done;) {
          var team = _step8.value;
          if (path === team.path) return team;
        }
      } catch (err) {
        _iterator8.e(err);
      } finally {
        _iterator8.f();
      }

      return null;
    }
  }, {
    key: "getGroundFromPath",
    value: function getGroundFromPath(path) {
      path = path.toLowerCase();

      var _iterator9 = _createForOfIteratorHelper(this.groundsArray),
          _step9;

      try {
        for (_iterator9.s(); !(_step9 = _iterator9.n()).done;) {
          var ground = _step9.value;
          if (path === ground.path) return ground;
        }
      } catch (err) {
        _iterator9.e(err);
      } finally {
        _iterator9.f();
      }

      return null;
    }
  }, {
    key: "getPlayerFromPath",
    value: function getPlayerFromPath(path) {
      path = path.toLowerCase();

      var _iterator10 = _createForOfIteratorHelper(this.playersArray),
          _step10;

      try {
        for (_iterator10.s(); !(_step10 = _iterator10.n()).done;) {
          var player = _step10.value;
          if (path === player.path) return player;
        }
      } catch (err) {
        _iterator10.e(err);
      } finally {
        _iterator10.f();
      }

      var _iterator11 = _createForOfIteratorHelper(this.playersArray),
          _step11;

      try {
        for (_iterator11.s(); !(_step11 = _iterator11.n()).done;) {
          var _player = _step11.value;
          // russell goes to andre-russell
          if (_player.path.search(path) !== -1) return _player; // andre-russell-batsman goes to andre-russell

          if (path.search(_player.path) !== -1) return _player;
        }
      } catch (err) {
        _iterator11.e(err);
      } finally {
        _iterator11.f();
      }

      return null;
    }
  }, {
    key: "getRivalryFromPath",
    value: function getRivalryFromPath(path) {
      path = path.toLowerCase();

      var _iterator12 = _createForOfIteratorHelper(this.rivalries),
          _step12;

      try {
        for (_iterator12.s(); !(_step12 = _iterator12.n()).done;) {
          var rivalry = _step12.value;
          if (path === rivalry.path || path === rivalry.path_b) return rivalry;
        }
      } catch (err) {
        _iterator12.e(err);
      } finally {
        _iterator12.f();
      }

      return null;
    }
  }, {
    key: "findXByName",
    value: function findXByName(name, obj) {
      var _iterator13 = _createForOfIteratorHelper(obj),
          _step13;

      try {
        for (_iterator13.s(); !(_step13 = _iterator13.n()).done;) {
          var x = _step13.value;

          if (x.fn.toLowerCase().search(name) !== -1) {
            return x;
          }
        }
      } catch (err) {
        _iterator13.e(err);
      } finally {
        _iterator13.f();
      }

      return null;
    }
  }, {
    key: "getAllFinals",
    value: function getAllFinals() {
      if (!this.finals) {
        this.finals = this.seasons.map(function (season) {
          return season.final;
        });
      }

      return this.finals;
    }
  }, {
    key: "getAllPointsTables",
    value: function getAllPointsTables() {
      if (!this.pointsTables) {
        this.pointsTables = this.seasons.map(function (season) {
          return season.pointsTables;
        });
      }

      return this.pointsTables;
    }
  }, {
    key: "printStatus",
    value: function printStatus() {
      console.log("IPL object:");
      console.log("\t---- ".concat(Object.keys(this.teams).length, " teams"));
      console.log("\t---- ".concat(Object.keys(this.grounds).length, " grounds"));
      console.log("\t---- ".concat(Object.keys(this.players).length, " players"));
      console.log("\t---- ".concat(Object.keys(this.seasons).length, " seasons"));
      console.log("\t---- ".concat(Object.keys(this.matches).length, " matches"));
    }
  }, {
    key: "printRivalries",
    value: function printRivalries() {
      var _iterator14 = _createForOfIteratorHelper(this.rivalries),
          _step14;

      try {
        for (_iterator14.s(); !(_step14 = _iterator14.n()).done;) {
          var r = _step14.value;
          console.log("Rivalry: ".concat(r.getFullName(), " (").concat(r.getLength(), " matches)"));
        }
      } catch (err) {
        _iterator14.e(err);
      } finally {
        _iterator14.f();
      }
    }
  }]);

  return IPL;
}();

exports.default = IPL;