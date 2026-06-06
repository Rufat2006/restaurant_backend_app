import PointsTableRow from './PointsTableRow';

import OrangeCapTable from './OrangeCapTable';
import PurpleCapTable from './PurpleCapTable';



export default class PointsTable {
	constructor (tournament, matches, orangePurple=false) {
		// tournament, season, teams and grounds can have a points table
		this.tournament = tournament;
		this.matches = matches;

		const teamsObject = {}
		for (let match of this.matches) {
			teamsObject[match.team_a.id] = true;
			teamsObject[match.team_b.id] = true;
		}

		this.rows = [];
		Object.keys(teamsObject).forEach(teamId => this.rows.push(new PointsTableRow(this, this.tournament.teams[teamId])));

		this.rows.sort((a, b) => {
			if (a.points === b.points) return (b.netRunrate - a.netRunrate);
			return (b.points - a.points);
		});

		this.rows.forEach((row, index) => row.position = (index+1));

		if (orangePurple) {
			this.setupOrangePurple();
		}
	}

	setupOrangePurple () {
		if (!this.orangeCapTable && !this.purpleCapTable) {
			this.orangeCapTable = new OrangeCapTable(this);
			this.purpleCapTable = new PurpleCapTable(this);
		}
	}
}
