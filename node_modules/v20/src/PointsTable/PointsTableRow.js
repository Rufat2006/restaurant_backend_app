


export default class PointsTableRow {
	constructor (table, team) {
		this.table = table;
		this.team = team;
		this.zeroInit();
		this.addMatches();
		this.setupNRR();
	}

	zeroInit () {
		this.matches = [];
		this.forInnings = [];
		this.vsInnings = [];
		this.batsFirst = 0;
		this.bowlsFirst = 0;
		this.points = 0;
		this.wins = 0;
		this.losses = 0;
		this.noResults = 0;

		this.forRuns = 0;
		this.forBalls = 0;
		this.forWickets = 0;
		this.forRunrate = 0;

		this.vsRuns = 0;
		this.vsBalls = 0;
		this.vsWickets = 0;
		this.vsRunrate = 0;

		this.netNunrate = 0;
	}

	addMatches () {
		this.table.matches.forEach(match => {
			if (match.team_a === this.team || match.team_b === this.team) {
				this.matches.push(match);

				// adding points
				if (match.winner === null) {
					this.points += 1;
					this.noResults += 1;
				} else if (match.winner === this.team) {
					this.points += 2;
					this.wins += 1;
				} else if (match.loser === this.team) {
					this.losses += 1;
				}

				// adding runs, overs and wickets
				let forInning = null, vsInning = null;
				if (match.firstInning.team === this.team) {
					this.batsFirst += 1;
					forInning = match.firstInning;
					vsInning = match.secondInning;
				} else {
					this.bowlsFirst += 1;
					forInning = match.secondInning;
					vsInning = match.firstInning;
				}

				if (forInning && forInning.actuallyHappened()) {
					this.forInnings.push(forInning);
					this.forRuns += forInning.runs;
					this.forBalls += forInning.allout ? 120 : forInning.balls;
					this.forWickets += forInning.wkts;
				}

				if (vsInning && vsInning.actuallyHappened()) {
					this.vsInnings.push(vsInning);
					this.vsRuns += vsInning.runs;
					this.vsBalls += vsInning.allout ? 120 : vsInning.balls;
					this.vsWickets += vsInning.wkts;
				}
			}
		});
	}

	setupNRR () {
		this.forRunrate = this.forRuns * 6 / this.forBalls;
		this.vsRunrate = this.vsRuns * 6 / this.vsBalls;
		this.netRunrate = this.forRunrate - this.vsRunrate;
	}

	hasPlusNRR = () => this.netRunrate >= 0;
	hasMinusNRR = () => this.netRunrate < 0;

	getForRunRate = (n=2) => this.forRunrate.toFixed(n);
	getVsRunRate = (n=2) => this.vsRunrate.toFixed(n);
	getNetRunRate = (n=2) => this.netRunrate.toFixed(n);
	getNetRunRateS = (n=2) => {
		if (this.netRunrate >= 0) {
			return "+" + this.netRunrate.toFixed(n);
		}
		return this.netRunrate.toFixed(n);
	}

	getWinPercent = () => (this.wins * 100 / this.matches.length);
	getWinPercentF = (n=1) => this.getWinPercent().toFixed(n);

	getLossPercent = () => (this.losses * 100 / this.matches.length);
	getLossPercentF = (n=1) => this.getLossPercent().toFixed(n);
}
