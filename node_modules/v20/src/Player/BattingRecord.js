
export default class BattingRecord {
	constructor (player, performances, filter) {
		this.player = player;
		if (filter) {
			this.performances = performances.filter(filter);
		} else {
			this.performances = performances;
		}

		this.zeroInit();
		this.addInnings();
	}

	zeroInit () {
		this.mats = 0;
		this.inns = 0;
		this.runs = 0;
		this.balls = 0;
		this.outs = 0;
		this.n4 = 0;
		this.n6 = 0;
		this.n50 = 0;
		this.n100 = 0;
		this.hs = null;
	}

	addInnings () {
		this.performances.forEach(performance => {
			this.mats++;
			if (performance.dnb) return;
			this.inns++;
			this.runs += performance.runs;
			this.balls += performance.balls;
			if (performance.isOut) this.outs++;

			this.n4 += performance.n4;
			this.n6 += performance.n6;
			if (performance.runs >= 100) {
				this.n100++;
			} else if (performance.runs >= 50) {
				this.n50++;
			}

			if (this.hs === null || this.hs.runs < performance.runs) {
				this.hs = performance;
			} else if (this.hs.runs === performance.runs && this.hs.balls > performance.balls) {
				// update hs if there is another inning with same runs at a faster sr
				this.hs = performance;
			}
		});
	}

	getAvgF = (n=1) => this.getAvg().toFixed(n);
	getAvg = () => this.outs ? (this.runs / this.outs) : 0;

	getSRF = (n=1) => this.getSR().toFixed(n);
	getSR = () => this.balls ? (this.runs * 100 / this.balls) : 0;

	getBoundaries = () => (this.n4 + this.n6);
	getBoundaryRuns = () => (4 * this.n4 + 6 * this.n6);
	getBoundaryPercent = (n=1) => (this.getBoundaryRuns() * 100 / this.runs).toFixed(n);

	getHsString = () => this.hs ? this.hs.runsString() : "-";
}
