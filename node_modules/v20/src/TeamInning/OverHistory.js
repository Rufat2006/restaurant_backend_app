
const possible_values = {};

class Over {
	constructor (overHistory, jo) {
		this.overHistory = overHistory;
		this.balls = jo.balls;
		this.over = jo.over;
		this.calculated = false;
	}

	calculate () {
		if (!this.calculated) {
			this.runs = 0;
			this.dots = 0;
			this.nbs = 0;
			this.wds = 0;
			this.wickets = 0;

			for (let ball of this.balls) {
				if (ball.length === 1) {
					if (ball === ".") {
						this.dots += 1;
					} else if (ball === "W") {
						this.wickets += 1;
					} else {
						// if we are here, ball is definitely a number in "1234567"
						this.runs += parseInt(ball);
					}
					continue;
				}

				if (ball.includes("Wd")) {
					this.wds += 1;
					ball = ball.replace("Wd", "");
				}
				if (ball.includes("Nb")) {
					this.nbs += 1;
					ball = ball.replace("Nb", "");
				}
				if (ball.includes("W")) {
					this.wickets += 1;
					ball = ball.replace("W", "");
				}
				if (ball.includes("Lb")) {
					ball = ball.replace("Lb", "");
				}
				if (ball.includes("B")) {
					ball = ball.replace("B", "");
				}

				this.runs += parseInt(ball);
			}
		}
		this.calculated = true;
	}

	getRuns () {
		this.calculate();
		return this.runs;
	}

	getWickets () {
		this.calculate();
		return this.wickets;
	}

	getHeightPercent (n=32) {
		// returns percent value for height of over's bar in scoring-graph
		// n=32 run over is full 100%
		const height = (this.getRuns() * 100 / n).toFixed() + "%";
		return height;
	}

	consoleLog () {
		console.log(`\tover no. ${this.over}: [${this.balls.join('-')}] => ${this.getRuns()} runs`);
	}
}

export default class OverHistory {
	constructor (teamInning, jo) {
		this.teamInning = teamInning;
		this.jo = jo;
		this.overs = [];
		for (let oj of jo) {
			this.overs.push(new Over(this, oj));
		}
		this.possible_values = possible_values;
		this.calculated = false;
	}

	calculate () {
		if (!this.calculated) {
			this.runs = 0;
			this.wickets = 0;
			for (let over of this.overs) {
				this.runs += over.getRuns();
				this.wickets += over.getWickets();
			}
		}
		this.calculated = true;
	}

	getRuns () {
		this.calculate();
		return this.runs;
	}

	getWickets () {
		this.calculate();
		return this.wickets;
	}

	printIfBad () {
		if (this.getRuns() !== this.teamInning.runs || this.getWickets() !== this.teamInning.wkts) {
			// 2 matches with runs not matching
			// 4 matches with wickets not matching, because batsman was retired hurt
			console.log(`BAD OverHistory: ${this.teamInning.match.getName4CL()}`);
			console.log(`\t=> calculated: [${this.getRuns()}/${this.getWickets()}] runs`);
			console.log(`\t=>     actual: [${this.teamInning.runs}/${this.teamInning.wkts}] runs`);
		}
	}

	consoleLog () {
		console.log(`OverHistory: ${this.getRuns()} runs === ${this.teamInning.runs} runs`);
		for (let over of this.overs) {
			over.consoleLog();
		}
	}
}
