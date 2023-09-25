import React from 'react';
import {useNavigate} from 'react-router-dom';
import {Typography, Grid} from '@mui/material';
import GridItem from '../components/GridItem';
import AuthLayout from '../layout/AuthLayout';
const ErrorComponent = () => {
	const navigate = useNavigate();
	const goToLogin = () => {
		navigate('/login');
	};

	return (
		<Grid
			container
			direction='column'
			justifyContent='space-around'
			alignItems='center' gap={6}
		>
			<Grid item xs>
				<GridItem/>
			</Grid>
			<Grid item xs>
				<GridItem>
				</GridItem>
			</Grid>
			<Grid item xs={4}>
				<GridItem>
					<Typography variant='h1' mb={2}><span className='introduction-jiva-heading'>404</span></Typography>
					<Typography variant='h3' fontWeight={800} mb={2}>Page Not Found</Typography>
					<Typography variant='h6' fontWeight={800} onClick={goToLogin} sx={{cursor: 'pointer', color: '#96AAEB'}}>Go back to Login</Typography>
				</GridItem>
			</Grid>
		</Grid>
	);
};

function Error() {
	return (
		<AuthLayout SubComponent={ErrorComponent}/>
	);
}

export default Error;
