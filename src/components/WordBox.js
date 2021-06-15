import React from "react";
import { colors } from "../models/Colors";
import { Grid, Paper } from "@material-ui/core";

function WordBox({ word, team, isRevealed, isChosen, idx, onClick }) {
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
		<Paper
			onClick={onClick}
			idx={idx}
			className='word-box'
			style={{
				background: backgroundColor,
				border: `5px solid ${borderColor}`,
				color: textColor
				// fontWeight: isChosen ? "bold" : "normal",
				// textTransform: isChosen ? "uppercase" : "lowercase"
			}}
		>
			{word}
			{isChosen && <span>&#10003;</span>}
		</Paper>
	);
}

export default WordBox;
