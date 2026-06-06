import PlayerInning from './PlayerInning';



export default class BatsmanInning extends PlayerInning {
	constructor (teamInning, jo, position=0) {
		super();
		this.teamInning = teamInning;
		this.position = position;
		this.for = teamInning.team;
		this.vs = teamInning.opposition;
		this.jo = jo;
		this.player = teamInning.tournament.players[jo.id];
		this.dnb = jo.dnb ? true : false;

		this.runs = jo.r;
		this.balls = jo.b;
		this.n4 = jo.n4;
		this.n6 = jo.n6;
		this.isOut = jo.out ? true : false;
		if (this.isOut) {
			for (let wicket of teamInning.wickets) {
				if (this.player === wicket.batsman) {
					wicket.setBatsmanInning(this);
					this.wicket = wicket;
					break;
				}
			}
		}
	}

	isCaptain = () => (this.player.id === this.teamInning.captain.id);
	isWk = () => (this.player.id === this.teamInning.wk.id);

	sr = () => this.balls ? (this.runs * 100 / this.balls) : 0;
	srF = (n=1) => this.sr().toFixed(n);

	getBoundaries = () => (this.n4 + this.n6);
	getBoundaryRuns = () => (4 * this.n4 + 6 * this.n6);
	getBoundaryPercent = (n=1) => (this.getBoundaryRuns() * 100 / this.runs).toFixed(n);

	runsString = () => this.isOut ? this.runs : this.runs + "*";
	get n4S () { return this.n4 ? this.n4 : "-"}
	get n6S () { return this.n6 ? this.n6 : "-"}

	consoleLog () {
		console.log(`${this.player.batsRight ? " " : "@"} ${this.player.fn.padEnd(25)} ${this.runsString()} (${this.balls}) (${this.n4}x4, ${this.n6}x6, ${this.srF()})`);
	}
}
