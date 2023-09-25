
import {styled} from '@mui/material';
import React from 'react';
import type {QueryProps} from '../prop-types/UserMessageProps';
import './Query.css';
const QueryText = styled('div')(({theme}) => ({
	backgroundColor: '#415573',
	...theme.typography.h6,
	marginBottom: '1.5rem',
	padding: '0.75rem',
	alignItems: 'center',
	borderRadius: '0.75rem 0.75rem 0rem 0.75rem',
	minWidth: '10rem',
	float: 'right',
}));
const Query: React.FC<QueryProps> = ({query}) => (
	<QueryText>
		{query}
	</QueryText>
);

export default Query;
