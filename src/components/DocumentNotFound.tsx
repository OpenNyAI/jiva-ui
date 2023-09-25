
import {Card, CardContent, Grid, Typography} from '@mui/material';
import React from 'react';
import './Loader.css';

const DocumentNotFound: React.FC = () => (
	<Card className='loader' sx={{borderRadius: '12px'}}>
		<CardContent>
			<Grid container className='loader-content'>
				<Grid item xs={1}>
					<img src='/SearchIcon.png' className='loader-searchIcon'/>
				</Grid>
				<Grid item xs={9}>
					<Typography variant='h5' component='div' fontWeight='400' fontSize='1.2rem' mt={2} color='var(--greys-grey-500, #9E9E9E)'>
                    No such document has been found.
					</Typography>
				</Grid>
			</Grid>
		</CardContent>
	</Card>
);

export default DocumentNotFound;
