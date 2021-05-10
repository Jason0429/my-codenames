import { v4 as uuidv4 } from "uuid";

export class User {
	constructor(nickname, role, team) {
		this.id = uuidv4();
		this.nickname = nickname;
		this.role = role;
		this.team = team;
	}
}
