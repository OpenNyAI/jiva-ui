import {styled} from '@mui/material';
import React from 'react';

const DrawerSpace = styled('div')(({theme}) => ({
	display: 'flex',
	alignItems: 'center',
	padding: theme.spacing(0, 1),
	...theme.mixins.toolbar,
	justifyContent: 'flex-end',
}));
export default DrawerSpace;
