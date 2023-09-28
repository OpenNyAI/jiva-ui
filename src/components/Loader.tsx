
import {Grid, styled} from '@mui/material';
import React from 'react';
import './Loader.css';
import LoaderIcon from '../assets/loader.gif';
const Item = styled('div')(({theme}) => ({
	backgroundColor: '#222427',
	...theme.typography.h6,
	marginBottom: '1.5rem',
	padding: '1rem',
	alignItems: 'center',
	borderRadius: '0.75rem 0.75rem 0.75rem 0rem',
	minWidth: '5rem',
	float: 'left',
}));
const Loader: React.FC = () => (
	<Grid
		container
		direction='row'
		justifyContent='flex-start'
		alignItems='center'
		spacing={2}
	>
		<Grid item xs={4}>
			<Item>
				<img src={LoaderIcon}/>
			</Item>
		</Grid>
		<Grid item xs={8}>
		</Grid>
	</Grid>
);

export default Loader;
