import {Button} from '@mui/material';
import React from 'react';
import LoadingIcon from './LoadingIcon';
import './LoadingButton.css';
const LoadingButton = () => (
	<Button
		variant='contained'
		fullWidth
		startIcon={<LoadingIcon/>}
		className='LoadingButton-button'
	></Button>
);

export default LoadingButton;
