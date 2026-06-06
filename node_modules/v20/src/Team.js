import BaseClass from './BaseClass';
import PointsTable from './PointsTable';



export default class Team extends BaseClass {
	constructor (tournament, jo) {
		super();
		this.tournament = tournament;
		this.jo = jo;

		this.id = jo.id;
		this.fn = jo.fn;
		this.sn = jo.sn;
		this.name = jo.name;
		this.abb = jo.abb;
		this.path = jo.abb.toLowerCase();

		this.color = jo.color;
		this.fgStyle = {color: this.color};
		this.bgStyle = {backgroundColor: this.color};
		this.bdStyle = {borderColor: this.color};
		this.otStyle = {outlineColor: this.color};
		this.rivalries = [];
	}

	getLink = () => `/teams/${this.path}`;

	postBundleSetup () {
		for (let rivalry of this.tournament.rivalries) {
			if (rivalry.t1 === this || rivalry.t2 === this) {
				this.rivalries.push(rivalry);
			}
		}

		this.pointsTable = new PointsTable(this.tournament, this.matches);
	}
}
