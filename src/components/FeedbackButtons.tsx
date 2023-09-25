import React from 'react';
import {Grid, IconButton} from '@mui/material';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import ThumbDownAltOutlinedIcon from '@mui/icons-material/ThumbDownAltOutlined';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import {type FeedbackButton} from '../prop-types/ChatBotProps';
const FeedbackButtons: React.FC<FeedbackButton> = ({
	isLiked, isDisliked, onLiked, onDisLiked,
}) => (
	<Grid container xs={2.2}>
		<Grid item xs>
			{isLiked !== undefined && isLiked ? <IconButton sx={{color: '#FAFAFA'}} onClick={onLiked} disabled={isDisliked === false} ><ThumbUpAltIcon/></IconButton>
				: <IconButton sx={{color: '#9B9C9E'}} onClick={onLiked} disabled={isDisliked === false} ><ThumbUpAltOutlinedIcon/></IconButton>}
		</Grid>
		<Grid item xs>
			{isDisliked !== undefined && isDisliked ? <IconButton sx={{color: '#9B9C9E'}} onClick={onDisLiked} disabled={isLiked}><ThumbDownAltOutlinedIcon/></IconButton>
				: <IconButton sx={{color: '#FAFAFA'}} onClick={onDisLiked} disabled={isLiked}><ThumbDownAltIcon/></IconButton>}
		</Grid>
	</Grid>
);
export default FeedbackButtons;
