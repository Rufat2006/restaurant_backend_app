import BaseClass from './BaseClass';
import Match from './Match';
import PointsTable from './PointsTable';



export default class Season extends BaseClass {
	constructor (tournament, jo) {
		super();
		this.tournament = tournament;
		this.jo = jo;
		this.year = parseInt(jo.year);
		for (let match of jo.matches) {
			let m = new Match(this, match);
			this.addMatch(m);
			m.team_a.addMatch(m);
			m.team_b.addMatch(m);
			m.ground.addMatch(m);
			// break;
		}

		const n = this.matches.length;
		this.opening = this.matches[0];
		// this.will break when an incomplete season is added
		this.final = this.matches[n-1];
		this.matches[n-1].final = true;
		this.winner = this.final.winner;
		this.loser = this.final.loser;

		// this will work when winner is valid
		if (this.winner) {
			this.bdStyle = this.winner.bdStyle;
			this.bgStyle = this.winner.bgStyle;
			this.fgStyle = this.winner.fgStyle;
		}

		this.numberOfLeagueMatches = (n % 2 === 0) ? (n-4) : (n-3);
		this.leagueMatches = this.matches.slice(0, this.numberOfLeagueMatches);
		this.playoffMatches = this.matches.slice(this.numberOfLeagueMatches);
		this.playoffMatches.forEach((x) => x.playoff = true);

		this.pointsTable = new PointsTable(this.tournament, this.leagueMatches);
		this.seasonPointsTable = new PointsTable(this.tournament, this.matches, true);
	}

	getLink = () => `/${this.year}`;
}
