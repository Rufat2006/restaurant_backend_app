import BatsmanInning from './BatsmanInning';
import BowlerInning from './BowlerInning';
import Wicket from './Wicket';
import OverHistory from './OverHistory';



export default class TeamInning {
	constructor (squad, jo) {
		this.squad = squad;
		this.match = squad.match;
		this.captain = squad.captain;
		this.wk = squad.wk;
		this.tournament = squad.tournament;
		this.team = squad.team;
		this.opposition = squad.opposition;
		this.batsmen = [];
		this.bowlers = [];
		this.overHistory = null;
		this.wickets = [];

		if (jo === undefined) {
			this.dnp = true;
			return;
		}

		this.dnp = false;
		this.jo = jo;

		this.setupMeta();
		this.setupBatsmen();
		this.setupBowlers();
	}

	setupMeta () {
		const jo = this.jo;
		this.runs = jo.runs;
		this.overs = jo.overs;
		this.balls = jo.balls;
		this.extras = jo.extras;
		this.totalExtras = [...Object.values(this.extras)].reduce((a, b) => (a + b), 0);

		this.wkts = jo.wickets.length;
		this.allout = this.wkts === 10;

		// jo definitely exists and contains 'history' and 'wickets' keys
		this.overHistory = new OverHistory(this, jo.history);
		for (let wj of jo.wickets) {
			const wicket = new Wicket(this, wj);
			this.wickets.push(wicket);
		}
	}

	setupBatsmen () {
		for (let bj of this.jo.batting) {
			let position = this.batsmen.length + 1;
			let x = new BatsmanInning(this, bj, position);
			x.player.battingPerformances.push(x);
			this.batsmen.push(x);
		}

		// this.nzBatsmen does not contain DNB batsmen
		this.nzBatsmen = [...this.batsmen];
		this.sortedBatsmen = [...this.batsmen].sort((a, b) => {
			return (b.runs - a.runs);
		});
		this.bestBatsman = this.sortedBatsmen[0];

		this.squad.members.forEach(member => {
			for (let batsman of this.batsmen) {
				if (batsman.player.id === member.id) return;
			}
			let x = new BatsmanInning(this, {
				id: member.id,
				dnb: true
			});
			x.player.battingPerformances.push(x);
			this.batsmen.push(x);
		});
	}

	setupBowlers () {
		for (let bj of this.jo.bowling) {
			let position = this.bowlers.length + 1;
			let x = new BowlerInning(this, bj, position);
			x.player.bowlingPerformances.push(x);
			this.bowlers.push(x);
		}

		// this.nzBowlers does not contain DNB bowlers (if they are added in future)
		this.nzBowlers = [...this.bowlers];
		this.sortedBowlers = [...this.bowlers].sort((a, b) => {
			return (b.wickets - a.wickets);
		});
		this.bestBowler = this.sortedBowlers[0];
	}

	runrate = () => this.balls ? (this.runs * 6 / this.balls) : 0;
	runrateF = (n=1) => this.runrate().toFixed(n);

	actuallyHappened = () => !this.dnp;

	consoleLog () {
		const dashes = "=".repeat(50);
		console.log(dashes);
		console.log(`${this.squad.team.fn} ${this.runs}/${this.wkts} (${this.overs}) @${this.runrateF()}`);
		console.log(dashes);

		for (let batsman of this.batsmen) {
			batsman.consoleLog();
		}

		console.log(dashes);

		for (let bowler of this.bowlers) {
			bowler.consoleLog();
		}

		console.log(dashes);
	}
}
