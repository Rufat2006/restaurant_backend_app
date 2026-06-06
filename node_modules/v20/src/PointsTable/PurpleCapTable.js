import BaseCapTable from './BaseCapTable';
import BowlingRecord from '../Player/BowlingRecord';



export default class PurpleCapTable extends BaseCapTable {
	constructor (pointsTable) {
		super(pointsTable);

		this.performances = [];
		for (let match of this.pointsTable.matches) {
			this.performances = this.performances.concat(match.bowlingPerformances);
		}

		this.sortedPerformances = [...this.performances].sort((a, b) => {
			if (b.wickets === a.wickets) {
				return a.runs - b.runs;
			}
			return b.wickets - a.wickets;
		});
		this.top10Figures = this.sortedPerformances.slice(0, 10);

		this.records = [];
		const bowlerIds = {};
		this.performances.forEach(x => bowlerIds[x.player.id] = true);
		for (const bowlerId in bowlerIds) {
			const player = this.pointsTable.tournament.players[bowlerId];
			this.records.push(new BowlingRecord(player, this.performances, x => x.player === player));
		}
		this.sortedRecords = [...this.records].sort((a, b) => (b.wickets - a.wickets));
	}

	getTopNFigures = (n=10) => this.sortedPerformances.slice(0, n);
	getTopNByWickets = (n=10) => this.sortedRecords.slice(0, n);
}

