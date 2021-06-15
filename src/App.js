import "./App.css";
import React, { useState, useEffect } from "react";
import firebase from "firebase/app";
import "firebase/database";
import { v4 as uuidv4 } from "uuid";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import Join from "./components/Join";
import GameRoom from "./components/GameRoom";

function App() {
	// New user ID
	const id = uuidv4();

	// Enable/Disable connection to database
	var isOnline = true;

	// Firebase database
	var db = firebase.database();

	// GAME_STATE (0 not started, 1 started)
	const [GAME_STATE, setGameState] = useState(0);

	// True if game has been won
	const [hasWon, setHasWon] = useState(false);

	// Words
	const [words, setWords] = useState([]);

	// Current Round (Red, Blue)
	const [currentRound, setCurrentRound] = useState("red");

	// Spymaster Typing?
	const [isSpymasterTyping, setIsSpymasterTyping] = useState(true);

	// Team Remaining Cards
	const [redTeamRemainingCards, setRedTeamRemainingCards] = useState(9);
	const [blueTeamRemainingCards, setBlueTeamRemainingCards] = useState(8);

	// CurrentUser
	const [currentUser, setCurrentUser] = useState({
		id,
		nickname: "",
		role: "",
		team: ""
	});

	// List of users online
	const [users, setUsers] = useState([]);

	// CLUES
	const [clues, setClues] = useState([]);

	// Testing conditions
	if (isOnline) db.goOnline();
	else db.goOffline();

	// When user connects, populate users according to database
	async function loadUsers() {
		let users = await db.ref("users").get();
		console.log("---------------------------------");
		console.log("Loaded Users");
		console.log("---------------------------------");
		console.log(Object.values(users.val()));
		setUsers(Object.values(users.val()));
	}

	function loadWords() {
		// Import word.json and shuffle the order
		const data = require("./data/words.json")["words"];
		let randIdx = Math.floor(Math.random() * data.length);
		const shuffle = require("shuffle-array");
		const words = shuffle(data[randIdx]);
		for (let i = 0; i < words.length; i++) {
			words[i]["id"] = i;
			db.ref(`words/word-${words[i]["id"]}`).set(words[i]);
		}
	}

	// On mount
	useEffect(() => {
		loadUsers();
	}, [setUsers]);

	// On listeners
	useEffect(() => {
		db.ref("users").on("child_added", (snapshot) => {
			// Load words if length of users was previously 0
			setUsers((prevState) => [...prevState, snapshot.val()]);
			// console.log("---------------------------------");
			// console.log("User Added");
			// console.log("---------------------------------");
			// console.log(snapshot.val());
		});

		db.ref("users").on("child_removed", (snapshot) => {
			setUsers((prevState) => {
				if (prevState.length - 1 < 4) {
					db.ref("GAME_STATE").set(0);
				}
				return prevState.filter(
					(user) => user.id !== snapshot.val().id
				);
			});

			// console.log("---------------------------------");
			// console.log("User Removed");
			// console.log("---------------------------------");
			// console.log(snapshot.val());
		});

		db.ref("users").on("child_changed", (snapshot) => {
			// console.log("---------------------------------");
			// console.log("User Changed");
			// console.log("---------------------------------");
			// console.log(snapshot.val());
			setUsers((prevState) =>
				prevState.map((user) =>
					user.id === snapshot.val().id ? snapshot.val() : user
				)
			);
		});

		db.ref("GAME_STATE").on("value", (snapshot) => {
			let GAME_STATE = parseInt(snapshot.val());
			// NEED FOR WORDS TO SORT PROPERLY
			// if (GAME_STATE === 0) {
			// 	loadWords();
			// 	updateHasWonInDB(false);
			// 	updateIsSpymasterTypingInDB(true);
			// 	updateRedTeamRemainingCards(9);
			// 	updateBlueTeamRemainingCards(8);
			// 	updateClueInDB([]);
			// }

			setGameState(GAME_STATE);
			// console.log("---------------------------------");
			// console.log("GAME_STATE");
			// console.log("---------------------------------");
			// console.log(snapshot.val());
		});

		db.ref("hasWon").on("value", (snapshot) => {
			setHasWon(snapshot.val());
		});

		db.ref("isSpymasterTyping").on("value", (snapshot) => {
			setIsSpymasterTyping(snapshot.val());
			// console.log("---------------------------------");
			// console.log("isSpymasterTyping");
			// console.log("---------------------------------");
			// console.log(snapshot.val());
		});

		db.ref("currentRound").on("value", (snapshot) => {
			setCurrentRound(snapshot.val());
			// console.log("---------------------------------");
			// console.log("currentRound");
			// console.log("---------------------------------");
			// console.log(snapshot.val());
		});

		db.ref("RED_TEAM_REMAINING_CARDS").on("value", (snapshot) => {
			setRedTeamRemainingCards(snapshot.val());
			// console.log("---------------------------------");
			// console.log("redTeamRemainingCards");
			// console.log("---------------------------------");
			// console.log(snapshot.val());
		});

		db.ref("BLUE_TEAM_REMAINING_CARDS").on("value", (snapshot) => {
			setBlueTeamRemainingCards(snapshot.val());
			// console.log("---------------------------------");
			// console.log("blueTeamRemainingCards");
			// console.log("---------------------------------");
			// console.log(snapshot.val());
		});

		db.ref("clues").on("child_added", (snapshot) => {
			// let clues = snapshot.val() || [];
			// if (clues instanceof Array && clues.length === 0) {
			// 	setClues([]);
			// } else {
			setClues((prevState) => [...prevState, snapshot.val()]);
			// }

			// console.log("---------------------------------");
			// console.log("clues");
			// console.log("---------------------------------");
			// console.log(snapshot.val());
		});

		db.ref("clues").on("child_removed", (snapshot) => {
			setClues([]);
		});

		db.ref("clues").on("child_changed", (snapshot) => {
			setClues((prevState) =>
				prevState.map((clue) =>
					clue.id === snapshot.val().id ? snapshot.val() : clue
				)
			);
		});

		db.ref("words").on("child_added", (snapshot) => {
			if (words.length < 25) {
				setWords((prevState) => [...prevState, snapshot.val()]);
			}
		});

		db.ref("words").on("child_removed", (snapshot) => {
			setWords((prevState) =>
				prevState.filter(
					(w) => parseInt(w.id) !== parseInt(snapshot.val().id)
				)
			);
		});

		db.ref("words").on("child_changed", (snapshot) => {
			// Add id property to Word object
			// Modify object in words state at that id
			setWords((prevState) =>
				prevState.map((word) =>
					word.id === snapshot.val().id ? snapshot.val() : word
				)
			);
			// console.log("---------------------------------");
			// console.log("words");
			// console.log("---------------------------------");
			// console.log(snapshot.val());
		});

		db.ref(`users/user-${currentUser.id}`).on("value", (snapshot) => {
			setCurrentUser(snapshot.val());

			// console.log("---------------------------------");
			// console.log("CurrentUser");
			// console.log("---------------------------------");
			// console.log(snapshot.val());
		});

		// Add user to database
		db.ref(`users/user-${currentUser.id}`).set(currentUser);

		// Remove user from database
		db.ref(`users/user-${currentUser.id}`).onDisconnect().remove();

		// Stop listeners
		return () => {
			db.ref("users").off();
			db.ref("GAME_STATE").off();
			db.ref("hasWon").off();
			db.ref("isSpymasterTyping").off();
			db.ref("RED_TEAM_REMAINING_CARDS").off();
			db.ref("BLUE_TEAM_REMAINING_CARDS").off();
			db.ref("currentRound").off();
			db.ref("clues").off();
			db.ref("words").off();
			db.ref(`users/user-${currentUser.id}`).off();
		};
	}, [
		setUsers,
		setGameState,
		setIsSpymasterTyping,
		setCurrentRound,
		setClues,
		setWords,
		setCurrentUser,
		setHasWon
	]);

	// Updates GAME_STATE in database
	// value: int
	function updateGameStateInDB(value) {
		db.ref("GAME_STATE").set(value);
	}

	// Updates hasWon in database
	// value: true or false
	function updateHasWonInDB(value) {
		db.ref("hasWon").set(value);
	}

	// Updates isSpymasterTyping in database
	// isTyping: boolean
	function updateIsSpymasterTypingInDB(isTyping) {
		db.ref("isSpymasterTyping").set(isTyping);
	}

	// Updates CURRENT_ROUND in database
	// round: "red" || "blue"
	function updateCurrentRoundInDB(round) {
		db.ref("currentRound").set(round);
	}

	// Updates currentUser in database
	// user: object
	function updateCurrentUserInDB(user) {
		db.ref(`users/user-${currentUser.id}`).set(user);
	}

	// Pushes new clue to database
	// clue: object
	function addClueToDB(clue) {
		clue["id"] = uuidv4();
		db.ref(`clues/clue-${clue["id"]}`).set(clue);
	}

	// Updates clue in database
	// To decrement guesses
	// clue: object
	function updateClueInDB(clue) {
		// if (clue instanceof Array && clue.length === 0) {
		// 	db.ref("clues").remove();
		// 	setClues([]);
		// } else {
		db.ref(`clues/clue-${clue.id}`).set(clue);
		// }
	}

	// Removes all clues in database
	function removeCluesInDB() {
		db.ref("clues").remove();
	}

	// Update word at id
	// word: object
	function updateWordInDB(word) {
		db.ref(`words/word-${word.id}`).set(word);
	}

	// Update RED_TEAM_REMAINING_CARDS in database
	// value: new score
	function updateRedTeamRemainingCards(value) {
		db.ref(`RED_TEAM_REMAINING_CARDS`).set(value);
	}

	// Update BLUE_TEAM_REMAINING_CARDS in database
	// value: new score
	function updateBlueTeamRemainingCards(value) {
		db.ref(`BLUE_TEAM_REMAINING_CARDS`).set(value);
	}

	return (
		<Router>
			{/* For each path */}

			<Switch>
				<Route path='/game'>
					<GameRoom
						users={users}
						GAME_STATE={GAME_STATE}
						hasWon={hasWon}
						currentRound={currentRound}
						currentUser={currentUser}
						clues={clues}
						isSpymasterTyping={isSpymasterTyping}
						words={words}
						redTeamRemainingCards={redTeamRemainingCards}
						blueTeamRemainingCards={blueTeamRemainingCards}
						updateCurrentUserInDB={updateCurrentUserInDB}
						updateGameStateInDB={updateGameStateInDB}
						updateCurrentRoundInDB={updateCurrentRoundInDB}
						updateIsSpymasterTypingInDB={
							updateIsSpymasterTypingInDB
						}
						addClueToDB={addClueToDB}
						updateWordInDB={updateWordInDB}
						updateRedTeamRemainingCards={
							updateRedTeamRemainingCards
						}
						updateBlueTeamRemainingCards={
							updateBlueTeamRemainingCards
						}
						updateClueInDB={updateClueInDB}
						updateHasWonInDB={updateHasWonInDB}
						loadWords={loadWords}
						removeCluesInDB={removeCluesInDB}
					/>
				</Route>
				<Route path='/join'>
					<Join
						currentUser={currentUser}
						updateCurrentUserInDB={updateCurrentUserInDB}
					/>
				</Route>
				{/* Keep root path on bottom */}
				<Route path='/'>
					<Home />
				</Route>
				{/*  */}
			</Switch>
		</Router>
	);
}

export default App;
