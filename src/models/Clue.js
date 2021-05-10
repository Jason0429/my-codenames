import { v4 as uuidv4 } from "uuid";
import { db } from "../App";

export class Clue {
	constructor(clue, nickname, team, guesses) {
		this.id = uuidv4();
		this.clue = clue;
		this.nickname = nickname;
		this.team = team;
		this.guesses = guesses;
	}

	// Appends new clue to database
	// clue: object
	addToDB() {
		db.ref(`clues/clue-${this.id}`).set(this);
	}
}
