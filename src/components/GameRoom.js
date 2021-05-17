import React, { useState, useRef, useEffect } from 'react';
import '../stylesheets/GameRoom.scss';
import {
	Card,
	CardContent,
	Typography,
	Button,
	Box,
	Grid,
	Paper,
	TextField,
	FormControl,
	InputLabel,
	Select,
	MenuItem
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { colors } from '../models/Colors';
import WordBox from './WordBox';
import Clue from './Clue';

const useStyles = makeStyles((theme) => ({
	window: {
		padding: '20px',
		height: '100vh',
		width: '100%'
	},
	paper: {
		padding: '15px 10px',
		textAlign: 'center',
		border: '2px solid #D1BC9D',
		minWidth: '150px',
		cursor: 'pointer',
		color: '#fff'
	},
	row: {
		width: '100%',
		display: 'flex',
		flex: '1',
		justifyContent: 'space-evenly',
		alignItems: 'flex-start'
	}
}));

function GameRoom({
	users,
	GAME_STATE,
	hasWon,
	currentRound,
	currentUser,
	clues,
	isSpymasterTyping,
	words,
	redTeamRemainingCards,
	blueTeamRemainingCards,
	updateCurrentUserInDB,
	updateGameStateInDB,
	updateCurrentRoundInDB,
	updateIsSpymasterTypingInDB,
	addClueToDB,
	updateWordInDB,
	updateRedTeamRemainingCards,
	updateBlueTeamRemainingCards,
	updateClueInDB,
	updateHasWonInDB
}) {
	// Class styles
	const classes = useStyles();

	// Current Clue
	const [currentClue, setCurrentClue] = useState({
		nickname: currentUser.nickname,
		team: currentUser.team,
		clue: '',
		guesses: 1
	});

	useEffect(() => {
		if (currentUser.role === '' && GAME_STATE === 1) {
			updateCurrentUserInDB({ ...currentUser, role: 'spectator' });
		}
	}, updateCurrentUserInDB);

	// Buttons
	function handleJoinAsRedOperative() {
		if (currentUser.team === 'red' && currentUser.role === 'operative')
			return;

		let user = {
			...currentUser,
			team: 'red',
			role: 'operative'
		};

		updateCurrentUserInDB(user);
	}

	function handleJoinAsRedSpymaster() {
		if (currentUser.team === 'red' && currentUser.role === 'spymaster')
			return;

		let user = {
			...currentUser,
			team: 'red',
			role: 'spymaster'
		};

		updateCurrentUserInDB(user);
	}

	function handleJoinAsBlueOperative() {
		if (currentUser.team === 'blue' && currentUser.role === 'operative')
			return;

		let user = {
			...currentUser,
			team: 'blue',
			role: 'operative'
		};

		updateCurrentUserInDB(user);
	}

	function handleJoinAsBlueSpymaster() {
		if (currentUser.team === 'blue' && currentUser.role === 'spymaster')
			return;

		let user = {
			...currentUser,
			team: 'blue',
			role: 'spymaster'
		};

		updateCurrentUserInDB(user);
	}

	// Listeners
	function handleGuesses(e) {
		setCurrentClue((prevState) => ({
			...prevState,
			guesses: e.target.value
		}));
	}

	function handleClueText(e) {
		setCurrentClue((prevState) => ({
			...prevState,
			clue: e.target.value.trim()
		}));
	}

	// Give Clue Button
	function handleSubmitClue() {
		addClueToDB(currentClue);
		updateIsSpymasterTypingInDB(false);
	}

	// Check for winning conditions
	function checkWin() {
		return redTeamRemainingCards === 1 || blueTeamRemainingCards === 1;
	}

	// Switches turns in database
	function switchTurns() {
		if (currentRound === 'red') {
			updateCurrentRoundInDB('blue');
		} else {
			updateCurrentRoundInDB('red');
		}
	}

	// End turn button
	function handleEndTurn() {
		switchTurns();
		updateIsSpymasterTypingInDB(true);
	}

	// Handles when a word is pressed
	function handleWordClick(e) {
		const idx = e.target.parentElement.getAttribute('idx');

		if (
			currentUser.role !== 'operative' ||
			isSpymasterTyping ||
			hasWon ||
			currentUser.team !== currentRound ||
			words[idx].isRevealed
		)
			return;

		let word = words[idx];
		let clue = clues[clues.length - 1];

		// Reveal word and update in database
		updateWordInDB({ ...word, isRevealed: true });

		if (word.team === 'black') {
			// If black card
			switchTurns();
			updateHasWonInDB(true);
			updateIsSpymasterTypingInDB(true);
			endGame();
			return;
		} else if (word.team === 'white') {
			// If white card
			switchTurns();
			updateIsSpymasterTypingInDB(true);
			return;
		} else if (word.team === currentUser.team) {
			// If correct
			// Decrement guesses left
			if (clue.guesses !== 'infinity') {
				updateClueInDB({ ...clue, guesses: clue.guesses - 1 });
			}

			if (currentRound === 'blue') {
				updateBlueTeamRemainingCards(blueTeamRemainingCards - 1);
			} else {
				updateRedTeamRemainingCards(redTeamRemainingCards - 1);
			}
		} else {
			// If chooses opposite team
			if (currentRound === 'red') {
				updateBlueTeamRemainingCards(blueTeamRemainingCards - 1);
			} else {
				updateRedTeamRemainingCards(redTeamRemainingCards - 1);
			}
			updateIsSpymasterTypingInDB(true);
			switchTurns();
		}

		// CHANGE ORDER OF THIS METHOD
		// ENDING GAME WHEN A TEAM HAS 1 CARD REMAINING
		// Check if remaining cards = 0
		if (checkWin()) {
			updateHasWonInDB(true);
			endGame();
			return;
		}

		// No more guesses, switch turns
		if (clue.guesses === 1) {
			switchTurns();
			updateIsSpymasterTypingInDB(true);
		}
	}

	function startGame() {
		let redOperative = false;
		let redSpymaster = false;
		let blueOperative = false;
		let blueSpymaster = false;

		for (let user of users) {
			if (user.team === 'red' && user.role === 'operative') {
				redOperative = true;
			} else if (user.team === 'red' && user.role === 'spymaster') {
				redSpymaster = true;
			} else if (user.team === 'blue' && user.role === 'operative') {
				blueOperative = true;
			} else if (user.team === 'blue' && user.role === 'spymaster') {
				blueSpymaster = true;
			}
		}

		if (
			users.length >= 4 &&
			redOperative &&
			redSpymaster &&
			blueOperative &&
			blueSpymaster
		) {
			updateGameStateInDB(1);
		} else {
			alert('Please have at least 4 players and each role fulfilled');
		}
	}

	// Ends game from a 5 second countdown
	function endGame() {
		setTimeout(() => {
			updateGameStateInDB(0);
		}, 5000);
	}

	return (
		<div
			className={classes.window}
			style={{
				background:
					currentRound === 'red'
						? colors.RED_TURN_BACKGROUND
						: colors.BLUE_TURN_BACKGROUND
			}}>
			<div className={classes.row}>
				{/* Red Card */}
				<Card
					style={{ background: colors.DARK_RED }}
					className="team-card">
					<CardContent>
						{GAME_STATE === 1 && (
							<Typography
								variant="h4"
								align="right"
								style={{ color: '#fff' }}>
								{redTeamRemainingCards}
							</Typography>
						)}

						<Box mt={2} mb={2}>
							<Typography
								variant="h6"
								align="left"
								style={{ color: '#fff' }}>
								Operative(s)
							</Typography>
						</Box>
						{/* List of Operatives (Red)*/}
						<Box mt={2} mb={2}>
							{users
								.filter(
									(u) =>
										u.team === 'red' &&
										u.role === 'operative'
								)
								.map((u) => (
									<React.Fragment>
										<Typography
											align="left"
											style={{
												width: 'fit-content',
												padding: '1px 10px',
												borderRadius: '15px',
												background: colors.LIGHT_RED,
												color: '#fff'
											}}>
											{u.nickname}
										</Typography>
										<br />
									</React.Fragment>
								))}
						</Box>
						{GAME_STATE === 0 && (
							<Button
								variant="contained"
								color="default"
								onClick={handleJoinAsRedOperative}
								style={{
									display:
										currentUser.team === 'red' &&
										currentUser.role === 'operative'
											? 'none'
											: 'block'
								}}>
								Join as Operative
							</Button>
						)}

						<Box mt={2} mb={2}>
							<Typography
								variant="h6"
								align="left"
								style={{ color: '#fff' }}>
								Spymaster(s)
							</Typography>
						</Box>
						{/* List of Spymasters (Red) */}
						<Box mt={2} mb={2}>
							{users
								.filter(
									(u) =>
										u.team === 'red' &&
										u.role === 'spymaster'
								)
								.map((u) => (
									<React.Fragment>
										<Typography
											align="left"
											style={{
												width: 'fit-content',
												padding: '1px 10px',
												borderRadius: '15px',
												background: colors.LIGHT_RED,
												color: '#fff'
											}}>
											{u.nickname}
										</Typography>
										<br />
									</React.Fragment>
								))}
						</Box>
						{GAME_STATE === 0 && (
							<Button
								variant="contained"
								color="default"
								onClick={handleJoinAsRedSpymaster}
								style={{
									display:
										currentUser.team === 'red' &&
										currentUser.role === 'spymaster'
											? 'none'
											: 'block'
								}}>
								Join as Spymaster
							</Button>
						)}
					</CardContent>
				</Card>

				{/* Game Board */}
				{GAME_STATE === 1 && (
					<Grid container spacing={1} xs={6} item justify="center">
						{words.map(({ word, team, isRevealed }, idx) => (
							<WordBox
								word={word}
								team={team}
								isRevealed={
									isRevealed ||
									currentUser.role === 'spymaster'
								}
								idx={idx}
								classes={classes}
								onClick={handleWordClick}
							/>
						))}
					</Grid>
				)}

				{/* Blue Card */}
				<Card
					style={{ background: colors.DARK_BLUE }}
					className="team-card">
					<CardContent>
						{GAME_STATE === 1 && (
							<Typography
								variant="h4"
								align="right"
								style={{ color: '#fff' }}>
								{blueTeamRemainingCards}
							</Typography>
						)}
						<Box mt={2} mb={2}>
							<Typography
								variant="h6"
								align="left"
								style={{ color: '#fff' }}>
								Operative(s)
							</Typography>
						</Box>
						{/* List of Operatives (Blue) */}
						<Box mt={2} mb={2}>
							{users
								.filter(
									(u) =>
										u.team === 'blue' &&
										u.role === 'operative'
								)
								.map((u) => (
									<React.Fragment>
										<Typography
											align="left"
											style={{
												width: 'fit-content',
												padding: '1px 10px',
												borderRadius: '15px',
												background: colors.LIGHT_BLUE,
												color: '#fff'
											}}>
											{u.nickname}
										</Typography>
										<br />
									</React.Fragment>
								))}
						</Box>
						{GAME_STATE === 0 && (
							<Button
								variant="contained"
								color="default"
								onClick={handleJoinAsBlueOperative}
								style={{
									display:
										currentUser.team === 'blue' &&
										currentUser.role === 'operative'
											? 'none'
											: 'block'
								}}>
								Join as Operative
							</Button>
						)}
						<Box mt={2} mb={2}>
							<Typography
								variant="h6"
								align="left"
								style={{ color: '#fff' }}>
								Spymaster(s)
							</Typography>
						</Box>
						{/* List of Spymasters (Blue) */}
						<Box mt={2} mb={2}>
							{users
								.filter(
									(u) =>
										u.team === 'blue' &&
										u.role === 'spymaster'
								)
								.map((u) => (
									<React.Fragment>
										<Typography
											align="left"
											style={{
												width: 'fit-content',
												padding: '1px 10px',
												borderRadius: '15px',
												background: colors.LIGHT_BLUE,
												color: '#fff'
											}}>
											{u.nickname}
										</Typography>
										<br />
									</React.Fragment>
								))}
						</Box>
						{GAME_STATE === 0 && (
							<Button
								variant="contained"
								color="default"
								onClick={handleJoinAsBlueSpymaster}
								style={{
									display:
										currentUser.team === 'blue' &&
										currentUser.role === 'spymaster'
											? 'none'
											: 'block'
								}}>
								Join as Spymaster
							</Button>
						)}
					</CardContent>
				</Card>
			</div>

			{/* Guess Row */}
			{GAME_STATE === 1 &&
				currentUser.team === currentRound &&
				currentUser.role === 'spymaster' &&
				isSpymasterTyping &&
				!hasWon && (
					<div
						className={classes.row}
						style={{
							padding: '30px'
						}}>
						<form noValidate autoComplete="off">
							{/* Typing Clue */}
							<TextField
								id="outlined-basic"
								label="Type Your Clue Here"
								variant="outlined"
								onChange={handleClueText}
							/>
							&emsp;
							{/* Number of Guesses */}
							<FormControl variant="outlined">
								<InputLabel id="demo-simple-select-outlined-label">
									Guesses
								</InputLabel>
								<Select
									style={{ width: '100px' }}
									value={currentClue.guesses}
									onChange={handleGuesses}
									label="Guesses">
									<MenuItem value={1}>1</MenuItem>
									<MenuItem value={2}>2</MenuItem>
									<MenuItem value={3}>3</MenuItem>
									<MenuItem value={4}>4</MenuItem>
									<MenuItem value={5}>5</MenuItem>
									<MenuItem value={6}>6</MenuItem>
									<MenuItem value={7}>7</MenuItem>
									<MenuItem value={8}>8</MenuItem>
									<MenuItem value={9}>9</MenuItem>
									<MenuItem value={'infinity'}>
										&infin;
									</MenuItem>
								</Select>
							</FormControl>
							&emsp;
							{/* Submit Clue Button */}
							<Button
								variant="contained"
								align="center"
								color="primary"
								onClick={handleSubmitClue}>
								Give Clue
							</Button>
						</form>
					</div>
				)}

			{/* Start Button */}
			{GAME_STATE === 0 && (
				<div className={classes.row} style={{ padding: '30px' }}>
					<Button
						variant="contained"
						color="default"
						align="center"
						onClick={startGame}>
						Start Game
					</Button>
				</div>
			)}

			{/* currentRound Text */}
			{GAME_STATE === 1 && (
				<div
					className={classes.row}
					style={{
						padding: '30px',
						justifyContent: 'center',
						alignItems: 'center'
					}}>
					<Typography
						variant="h6"
						align="center"
						className="clue"
						style={{
							background: '#FFF',
							border: `5px solid ${colors.BLACK_CARD_BORDER}`
						}}>
						{isSpymasterTyping
							? 'Waiting for clue...'
							: clues[clues.length - 1]?.clue.toUpperCase()}
					</Typography>
					{!isSpymasterTyping && (
						<Typography
							variant="h6"
							align="center"
							className="clue"
							style={{
								background: '#FFF',
								border: `5px solid ${colors.BLACK_CARD_BORDER}`
							}}>
							{clues[clues.length - 1]?.guesses === 'infinity' ? (
								<span>&infin;</span>
							) : (
								clues[clues.length - 1]?.guesses
							)}
						</Typography>
					)}
					{!isSpymasterTyping &&
						currentUser.role === 'operative' &&
						currentUser.team === currentRound && (
							<Button
								variant="contained"
								color="primary"
								align="center"
								onClick={handleEndTurn}>
								End Turn
							</Button>
						)}
				</div>
			)}

			{/* Clues Chat Box */}
			{GAME_STATE === 1 && (
				<div className="chat-box">
					<Typography variant="body1" align="center">
						Game Log
					</Typography>
					<div className="chat-box-dialog">
						{clues.map((clue) => (
							<Clue
								nickname={clue.nickname}
								team={clue.team}
								clue={clue.clue}
								guesses={clue.guesses}
							/>
						))}
					</div>
				</div>
			)}

			{/* Winner Message */}
			{GAME_STATE === 1 && hasWon && (
				<div className={classes.row}>
					<Typography variant="h5">
						{currentRound.toUpperCase()} TEAM HAS WON
					</Typography>
				</div>
			)}
		</div>
	);
}

export default GameRoom;
