import {Toolbar, Typography} from '@mui/material';
import React from 'react';
import CustomAppBar from './CustomAppBar';

const AuthAppBar = () => (
	<CustomAppBar position='fixed'>
		<Toolbar>
			<Typography variant='h6' noWrap component='div'>
					JIVA
			</Typography>
		</Toolbar>
	</CustomAppBar>
);
export default AuthAppBar;
