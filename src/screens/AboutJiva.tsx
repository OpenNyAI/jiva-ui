import {Grid, Stack, Typography} from '@mui/material';
import React from 'react';
import {styled} from '@mui/material/styles';
import './AboutJiva.css';
const Item = styled('div')(({theme}) => ({
	...theme.typography.body2,
	padding: theme.spacing(0.5),
}));
const AboutJiva = () => (
	<div className='about-jiva-body'>
		<div><Typography gutterBottom variant='body2' mb={3} fontSize={16}>
		Judges’ Intelligent Virtual Assistant (JIVA), is an AI-powered court infrastructure platform designed to help judges and legal practitioners find relevant legal information (acts, laws, and sections within them) quickly. JIVA is trained on a massive dataset of legal documents, including statutes and regulations. This allows the platform to understand the nuances of legal language and to extract the relevant information from complex documents.
		</Typography>
		<Typography gutterBottom variant='body2' fontSize={16}>
		JIVA is a powerful tool that can save judges’ time and improve the accuracy of their decisions. We are committed to developing innovative technologies that can help the legal system work more efficiently and effectively.
		</Typography></div>
		<div>
			<Typography variant='h6' mb={2} fontSize={24}>
            Why Use JIVA
			</Typography>
			<Grid container maxWidth={1000} mb={2}>
				<Grid item xs={0.7}><img src='./DocumentExcerpts.png'/></Grid>
				<Grid item xs={10}>
					<Typography variant='body2' mb={1}>
					JIVA extracts information from legal documents much faster than a human can. This can free up judges&apos; time so that they can focus on more important tasks.
					</Typography></Grid>
			</Grid>
			<Grid container width={1000}>
				<Grid item xs={0.7}><img src='./SearchLegalDocuments.png'/></Grid>
				<Grid item xs={10}>
					<Typography variant='body2' mb={1}>
					It shows the different amendments to a statute on a single PDF, allowing for quick access to the different versions of a law.
					</Typography></Grid>
			</Grid>
		</div>
		<div>
			<Typography variant='h6' mb={2} fontSize={24}>
        How to Use JIVA
			</Typography>
			<Typography gutterBottom mb={2.5} variant='body2' fontSize={16}>
            To use JIVA, simply enter a search term or phrase related to a law or act (in text or voice, in Indian languages). JIVA will then search its database of legal documents and return a list of relevant results. You can then drill down into the results to view more detailed information.
			</Typography>
		</div>
	</div>
);

export default AboutJiva;
