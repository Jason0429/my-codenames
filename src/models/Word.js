import { v4 as uuidv4 } from "uuid";
import { db } from "../App";

export class Word {
	constructor(word, team) {
		this.id = uuidv4();
		this.word = word;
		this.team = team;
		this.isRevealed = false;
		this.usersThatSelected = [];
	}

	// Updates word in database
	// word: object
	updateInDB() {
		db.ref(`words/word-${this.id}`).set(this);
	}
}
