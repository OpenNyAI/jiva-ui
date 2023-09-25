import {styled} from '@mui/material';
import React from 'react';
const drawerWidth = 300;

const Main = styled('main', {shouldForwardProp: prop => prop !== 'open'})<{
	open?: boolean; ispdfscreen?: boolean;
}>(({theme, open, ispdfscreen}) => ({
	flexGrow: 1,
	padding: (ispdfscreen === true ? 0 : theme.spacing(3)),
	transition: theme.transitions.create('margin', {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	marginLeft: `-${drawerWidth - (ispdfscreen === true ? -0 : 150)}px`,
	marginRight: `${drawerWidth - (ispdfscreen === true ? drawerWidth : 150)}px`,
	...((open === true) && {
		transition: theme.transitions.create('margin', {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen,
		}),
		marginLeft: 0,
		marginRight: 0,
	}),
}));
export default Main;
