import React from "react";
import "../stylesheets/Home.scss";
import { Link } from "react-router-dom";
import {
	Button,
	Accordion,
	AccordionSummary,
	Typography,
	AccordionDetails
} from "@material-ui/core";
import { ExpandMore } from "@material-ui/icons";

function Home({ db }) {
	return (
		<div className='main'>
			{/* Title and Author */}
			<div className='col center'>
				<Typography align='center' variant='h3'>
					Codenames
				</Typography>
				<Typography align='center' variant='h6'>
					by Jason Cheung
				</Typography>
			</div>

			{/* Create Game Button */}
			<div className='row center'>
				<Link to='/join' style={{ textDecoration: "none" }}>
					<Button variant='contained' color='primary' className='btn'>
						Join Room
					</Button>
				</Link>
			</div>

			{/* Instructions */}
			<div className='row center'>
				<Accordion className='accordion'>
					<AccordionSummary
						expandIcon={<ExpandMore />}
						aria-controls='panel1a-content'
						id='panel1a-header'
					>
						<Typography>Instructions</Typography>
					</AccordionSummary>
					<AccordionDetails>
						<Typography>
							1. Click on the JOIN ROOM button.
						</Typography>
						<Typography>2. Enter your nickname.</Typography>
						<Typography>3. Join Game.</Typography>
						<Typography>4. Invite Friends.</Typography>
						<Typography>
							5. Operatives wait for Spymasters to give a clue and
							number of guesses to guess their team's words.
						</Typography>
						<Typography>
							6. Clicking on a Black card is an immediate loss for
							that team.
						</Typography>
						<Typography>
							7. Clicking on a White card wins no points and
							switches turns.
						</Typography>
						<Typography>
							9. Team wins game when their remaining cards to
							reveal is 0.
						</Typography>
					</AccordionDetails>
				</Accordion>
			</div>
		</div>
	);
}

export default Home;
