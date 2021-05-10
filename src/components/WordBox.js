import React from "react";
import { colors } from "../models/Colors";
import { Grid, Paper } from "@material-ui/core";

function WordBox({ word, team, isRevealed, idx, classes, onClick }) {
	let backgroundColor,
		borderColor,
		textColor = "#fff";

	if (!isRevealed) {
		backgroundColor = colors.CARD_COLOR;
		borderColor = colors.WHITE_CARD_BORDER;
		textColor = "#000";
	} else if (team === "red") {
		backgroundColor = colors.LIGHT_RED;
		borderColor = colors.RED_CARD_BORDER;
	} else if (team === "blue") {
		backgroundColor = colors.LIGHT_BLUE;
		borderColor = colors.BLUE_CARD_BORDER;
	} else if (team === "white") {
		backgroundColor = colors.WHITE_CARD;
		borderColor = colors.WHITE_CARD_BORDER;
	} else if (team === "black") {
		backgroundColor = colors.BLACK_CARD;
		borderColor = colors.BLACK_CARD_BORDER;
	}

	return (
		<Grid item onClick={onClick} idx={idx}>
			<Paper
				className={classes.paper}
				style={{
					background: backgroundColor,
					border: `5px solid ${borderColor}`,
					color: textColor
				}}
			>
				{word}
			</Paper>
		</Grid>
	);
}

export default WordBox;
