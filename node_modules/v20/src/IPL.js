import Ground from './Ground';
import Player from './Player';
import Team from './Team';
import Season from './Season';
import Rivalry from './Rivalry';
import PointsTable from './PointsTable';

import {setNextPrev} from './Utils';



export default class IPL {
	constructor (codes) {
		this.codes = codes;
		this.loadCodes();
		this.matches = [];
		this.seasons = [];
	}

	loadCodes () {
		this.loadTeams();
		this.loadGrounds();
		this.loadPlayers();
		this.codesArray = [
			...this.teamsArray,
			...this.groundsArray,
			...this.playersArray
		];
	}

	loadTeams () {
		this.teams = {};
		this.teamsArray = [];
		for (let jo of this.codes.teams) {
			let x = new Team(this, jo);
			this.teams[jo.id] = x;
			this.teamsArray.push(x);
		}

		this.teamsArray.forEach((x, index) => x.index = index);
		setNextPrev(this.teamsArray);
	}

	loadGrounds () {
		this.grounds = {};
		this.groundsArray = [];
		for (let jo of this.codes.grounds) {
			let x = new Ground(this, jo);
			this.grounds[jo.id] = x;
			this.groundsArray.push(x);
		}

		this.groundsArray.forEach((x, index) => x.index = index);
		setNextPrev(this.groundsArray);
	}

	loadPlayers () {
		this.players = {};
		this.playersArray = [];
		for (let jo of this.codes.players) {
			let x = new Player(this, jo);
			this.players[jo.id] = x;
			this.playersArray.push(x);
		}

		this.playersArray.forEach((x, index) => x.index = index);
		setNextPrev(this.playersArray);
	}

	loadBundle (json) {
		this.bundle = json;
		for (let season of json.seasons) {
			let x = new Season(this, season);
			this.seasons.push(x);
			this.matches = this.matches.concat(x.matches);
			// console.log(`IPL ${x.year} has ${x.matches.length} matches.`);
			// break;
		}

		this.matches.forEach((m, index) => m.index = index);
		setNextPrev(this.seasons);
		setNextPrev(this.matches);
		this.pointsTable = new PointsTable(this, this.matches);

		this.rivalries = [];
		for (let t1 of this.teamsArray) {
			for (let t2 of this.teamsArray) {
				if (t1.id < t2.id) {
					const r = new Rivalry(this, t1, t2);
					if (r.matches.length) {
						this.rivalries.push(r);
					}
				}
			}
		}
		this.rivalries.sort((a, b) => (b.getLength() - a.getLength()));
		setNextPrev(this.rivalries);

		this.postBundleSetup();
	}

	postBundleSetup () {
		this.teamsArray.forEach(x => x.postBundleSetup());
		this.groundsArray.forEach(g => g.postBundleSetup());
		this.playersArray.forEach(x => x.postBundleSetup());

		this.overallBattingRecords = this.playersArray.map(r => r.overallBattingRecord);
		this.overallBowlingRecords = this.playersArray.map(r => r.overallBowlingRecord);

		this.topBatsmen = [...this.overallBattingRecords].sort((a, b) => b.runs - a.runs);
		this.topBowlers = [...this.overallBowlingRecords].sort((a, b) => b.wickets - a.wickets);
		this.top10Batsmen = this.topBatsmen.slice(0, 10);
		this.top10Bowlers = this.topBowlers.slice(0, 10);
	}

	getSeason (year) {
		for (let season of this.seasons) {
			if (season.year === year) return season;
		}
		return null;
	}

	doStuff () {
		this.printStatus();
		// csk vs kxip
		// this.matches[1].consoleLog();

		// dhoni and oram
		// this.findPlayerByName("dhoni").print50s();
		// this.findPlayerByName("lee").print2Ws();
	}

	getTeamFromPath (path) {
		path = path.toLowerCase();
		for (let team of this.teamsArray) {
			if (path === team.path) return team;
		}
		return null;
	}

	getGroundFromPath (path) {
		path = path.toLowerCase();
		for (let ground of this.groundsArray) {
			if (path === ground.path) return ground;
		}
		return null;
	}

	getPlayerFromPath (path) {
		path = path.toLowerCase();
		for (let player of this.playersArray) {
			if (path === player.path) return player;
		}

		for (let player of this.playersArray) {
			// russell goes to andre-russell
			if (player.path.search(path) !== -1) return player;
			// andre-russell-batsman goes to andre-russell
			if (path.search(player.path) !== -1) return player;
		}
		return null;
	}

	getRivalryFromPath (path) {
		path = path.toLowerCase();
		for (let rivalry of this.rivalries) {
			if (path === rivalry.path || path === rivalry.path_b) return rivalry;
		}
		return null;
	}

	findXByName (name, obj) {
		for (let x of obj) {
			if (x.fn.toLowerCase().search(name) !== -1) {
				return x;
			}
		}
		return null;
	}

	findGroundByName = (name) => this.findXByName(name, this.groundsArray);
	findPlayerByName = (name) => this.findXByName(name, this.playersArray);
	findTeamByName = (name) => this.findXByName(name, this.teamsArray);

	getAllFinals () {
		if (!this.finals) {
			this.finals = this.seasons.map(season => season.final);
		}
		return this.finals;
	}

	getAllPointsTables () {
		if (!this.pointsTables) {
			this.pointsTables = this.seasons.map(season => season.pointsTables);
		}
		return this.pointsTables;
	}

	printStatus () {
		console.log(`IPL object:`);
		console.log(`\t---- ${Object.keys(this.teams).length} teams`);
		console.log(`\t---- ${Object.keys(this.grounds).length} grounds`);
		console.log(`\t---- ${Object.keys(this.players).length} players`);
		console.log(`\t---- ${Object.keys(this.seasons).length} seasons`);
		console.log(`\t---- ${Object.keys(this.matches).length} matches`);
	}

	printRivalries () {
		for (let r of this.rivalries) {
			console.log(`Rivalry: ${r.getFullName()} (${r.getLength()} matches)`);
		}
	}
}
