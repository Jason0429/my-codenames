import React from 'react';
import '../stylesheets/Home.scss';
import { Link } from 'react-router-dom';
import {
	Button,
	Accordion,
	AccordionSummary,
	Typography,
	AccordionDetails
} from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';
import { v4 as uuidv4 } from 'uuid';

function Home({ db }) {
	return (
		<div className="main">
			{/* Title and Author */}
			<div className="col center">
				<Typography align="center" variant="h3">
					Codenames
				</Typography>
				<Typography align="center" variant="h6">
					by Jason Cheung
				</Typography>
			</div>

			{/* Create Game Button */}
			<div className="row center">
				<Link to="/join" style={{ textDecoration: 'none' }}>
					<Button variant="contained" color="primary" className="btn">
						Join Room
					</Button>
				</Link>
			</div>

			{/* Instructions */}
			<div className="row center">
				<Accordion className="accordion">
					<AccordionSummary
						expandIcon={<ExpandMore />}
						aria-controls="panel1a-content"
						id="panel1a-header">
						<Typography>Instructions</Typography>
					</AccordionSummary>
					<AccordionDetails>
						<Typography>
							1. Click on the JOIN ROOM button.
						</Typography>
						<Typography>
							2. Enter your nickname and start the game.
						</Typography>
						<Typography>3. Connect with your friends.</Typography>
						<Typography>
							4. Share the room URL with your friends.
						</Typography>
						<Typography>5. Enjoy the game!</Typography>
					</AccordionDetails>
				</Accordion>
			</div>
		</div>
	);
}

export default Home;
