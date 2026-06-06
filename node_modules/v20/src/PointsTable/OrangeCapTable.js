import BaseCapTable from './BaseCapTable';
import BattingRecord from '../Player/BattingRecord';



export default class OrangeCapTable extends BaseCapTable {
	constructor (pointsTable) {
		super(pointsTable);

		this.performances = [];
		for (let match of this.pointsTable.matches) {
			this.performances = this.performances.concat(match.battingPerformances);
		}

		// removed dnb performances
		this.performances = this.performances.filter(b => !b.dnb);
		this.sortedPerformances = [...this.performances].sort((a, b) => (b.runs - a.runs));
		this.top10Scores = this.sortedPerformances.slice(0, 10);

		this.records = [];
		const batsmanIds = {};
		this.performances.forEach(x => batsmanIds[x.player.id] = true);
		for (const batsmanId in batsmanIds) {
			const player = this.pointsTable.tournament.players[batsmanId];
			this.records.push(new BattingRecord(player, this.performances, x => x.player === player));
		}
		this.sortedRecords = [...this.records].sort((a, b) => (b.runs - a.runs));
	}

	getTopNScores = (n=10) => this.sortedPerformances.slice(0, n);
	getTopNByRuns = (n=10) => this.sortedRecords.slice(0, n);
}

