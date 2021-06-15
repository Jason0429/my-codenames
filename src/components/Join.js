import React, { useState, useEffect } from "react";
import "../stylesheets/Join.scss";
import { Link, NavLink } from "react-router-dom";
import { TextField, Button, Typography } from "@material-ui/core";
import { v4 as uuidv4 } from "uuid";
import firebase from "firebase/app";

function Join({ currentUser, updateCurrentUserInDB }) {
	const [isValid, setIsValid] = useState(false);
	const [nickname, setNickname] = useState("");

	function handleNickname(e) {
		let value = e.target.value;
		setIsValid(value.trim().length > 0);
		setNickname(value);
	}

	function handleJoinRoomBtn() {
		// Check if nickname is empty
		if (!isValid) {
			alert("Please enter a valid nickname");
		} else {
			updateCurrentUserInDB({
				...currentUser,
				nickname
			});
		}
	}

	// function

	return (
		<div className='window'>
			<div className='group-box'>
				<Typography variant='h5' align='center'>
					Welcome to Codenames
				</Typography>
				<Typography style={{ fontSize: "15px" }} align='center'>
					To enter the room, choose a nickname.
				</Typography>

				<form className='form' noValidate autoComplete='off'>
					<TextField
						id='filled-basic'
						label='Enter Your Nickname'
						value={nickname}
						onChange={handleNickname}
						variant='filled'
					/>
					<div className='spacer'></div>
					{isValid ? (
						<Link to='/game' style={{ textDecoration: "none" }}>
							<Button
								variant='contained'
								color='primary'
								onClick={handleJoinRoomBtn}
								className='btn'
							>
								Join Room
							</Button>
						</Link>
					) : (
						<div>
							<Button
								variant='contained'
								color='primary'
								onClick={handleJoinRoomBtn}
								className='btn'
							>
								Join Room
							</Button>
						</div>
					)}
				</form>
			</div>
		</div>
	);
}

export default Join;
