import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import {Typography} from '@mui/material';
import './Introduction.css';
import GridItem from './GridItem';

const Introduction = () => (
	<Box sx={{flexGrow: 1}}>
		<Grid container
			direction='column'
			justifyContent='space-between'
			alignItems='center' gap={1}>
			<Grid item xs>
				<GridItem/>
			</Grid>
			<Grid item xs={6}>
				<GridItem>
					<Typography variant='h4' mb={2}>Welcome to <span className='introduction-jiva-heading'>JIVA_</span></Typography>
					<Typography variant='body2' fontWeight={800} mb={6}>Let me help you look up law documents instantly.</Typography>
					<Grid container gap={1}>
						<Grid item xs={1}><img src='./SearchLegalDocuments.png'/></Grid>
						<Grid item xs={8}><Typography variant='h6' mb={2}>Search legal documents </Typography></Grid>
					</Grid>
					<Typography variant='body2' color='var(--greys-grey-500, #9E9E9E)' mb={2}>&quot;Information Technology Act, 2000 as on 23 May 2023&quot;</Typography>
					<Typography variant='body2' color='var(--greys-grey-500, #9E9E9E)' mb={2}>&quot;Cyber Regular Advisory 2012&quot;</Typography>
					<Typography variant='body2' color='var(--greys-grey-500, #9E9E9E)' mb={2}>&quot;Rules related to Arbitration and Conciliation Act&quot;</Typography>
					<Grid container gap={1} mt={8}>
						<Grid item xs={1}><img src='./DocumentExcerpts.png'/></Grid>
						<Grid item xs={8}><Typography variant='h6' mb={2}>Find document excerpts</Typography></Grid>
					</Grid>
					<Typography variant='body2' color='var(--greys-grey-500, #9E9E9E)' mb={2}>&quot;Show me Section 48 of Arbitration and Conciliation Act, 1996 &quot;</Typography>
					<Typography variant='body2' color='var(--greys-grey-500, #9E9E9E)' mb={2}>&quot;Sections related to Cyber Bullying from IPC&quot;</Typography>
					<Typography variant='body2' color='var(--greys-grey-500, #9E9E9E)' mb={2}>&quot;Guidelines for clinical trials under the Drugs and Cosmetics Act&quot;</Typography>
				</GridItem>
			</Grid>
			<Grid item xs>
				<GridItem/>
			</Grid>
		</Grid>
	</Box>
);

export default Introduction;
