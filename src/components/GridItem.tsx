import React from 'react';
import {styled} from '@mui/material/styles';
const GridItem = styled('div')(({theme}) => ({
	...theme.typography.body2,
	padding: theme.spacing(1),
}));
export default GridItem;
