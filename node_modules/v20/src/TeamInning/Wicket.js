
export default class Wicket {
	constructor (teamInning, jo) {
		this.teamInning = teamInning;
		this.batsman = teamInning.tournament.players[jo.id];

		// this.over goes from 0-19, instead of 1-20
		this.over = jo.over - 1;
		this.ball = jo.ball;
		this.runs = jo.r;
		this.wicket = jo.w;
	}

	getBalls = () => (this.over * 6 + this.ball);
	getRR = () => (this.runs * 6 / this.getBalls());
	getRRF = (n=1) => this.getRR().toFixed(n);

	setBatsmanInning (batsmanInning) {
		// let outType = batsmanInning.jo.out.type;
		// outType is one of ['b', 'ct', 'ro', 'lbw', 'ret', 'st', 'ob', 'reto', 'hw']
		this.batsmanInning = batsmanInning;
	}
}
