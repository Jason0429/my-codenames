import React from "react";
import "../stylesheets/Clue.scss";
import { colors } from "../models/Colors";
import { Typography } from "@material-ui/core";

function Clue({ nickname, team, clue, guesses }) {
	return (
		<div className='clue-row' style={{ background: colors.CLUE_ROW_COLOR }}>
			<Typography
				className='nickname'
				style={{
					color:
						team === "red"
							? colors.CLUE_RED_NAME
							: colors.CLUE_BLUE_NAME,
					fontWeight: "bold"
				}}
			>
				{nickname}
			</Typography>
			<Typography>&nbsp;gives clue&nbsp;</Typography>
			<Typography className='clue' style={{ color: colors.CLUE_WORD }}>
				{clue.toUpperCase()}{" "}
				{guesses === "infinity" ? <span>&infin;</span> : guesses}
			</Typography>
		</div>
	);
}

export default Clue;
