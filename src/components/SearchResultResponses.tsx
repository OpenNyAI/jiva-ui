
import {Grid, styled} from '@mui/material';
import React from 'react';
const ResponseText = styled('div')(({theme}) => ({
	backgroundColor: '#222427',
	...theme.typography.h6,
	marginBottom: '1.5rem',
	padding: '1rem',
	alignItems: 'center',
	borderRadius: '0.75rem 0.75rem 0.75rem 0rem',
	minWidth: '10rem',
	float: 'left',
}));
const SuggestionText = styled('div')(({theme}) => ({
	...theme.typography.body2,
	marginBottom: '1.5rem',
	padding: '0 1rem 1rem 0',
	alignItems: 'center',
	minWidth: '10rem',
	float: 'left',
}));

export const DocSearchResultIntroduction: React.FC = () => (
	<Grid
		container
		direction='row'
		justifyContent='flex-start'
		alignItems='center'
		spacing={2}
	>
		<Grid item xs={4}>
			<ResponseText>
            Here is a document that I found
			</ResponseText>
		</Grid>
		<Grid item xs={8}>
		</Grid>
	</Grid>
);

export const SectionSearchResultIntroduction: React.FC = () => (
	<Grid
		container
		direction='row'
		justifyContent='flex-start'
		alignItems='center'
		spacing={2}
	>
		<Grid item xs={4}>
			<ResponseText>
            Here’s an excerpt that I found
			</ResponseText>
		</Grid>
		<Grid item xs={8}>
		</Grid>
	</Grid>
);

export const DocNotFound: React.FC = () => (
	<Grid
		container
		direction='row'
		justifyContent='flex-start'
		alignItems='center'
		spacing={2}
	>
		<Grid item xs={5}>
			<ResponseText>
			Sorry! I could not find any document with that name.
			</ResponseText>
		</Grid>
		<Grid item xs={8}>
		</Grid>
	</Grid>
);

type GeneralResponseComponentProps = {
	message_text: string | undefined;
};

export const GeneralResponseComponent: React.FC<GeneralResponseComponentProps> = ({message_text}) => (
	<Grid
		container
		direction='row'
		justifyContent='flex-start'
		alignItems='center'
		spacing={2}
	>
		<Grid item xs={5}>
			<ResponseText>
				{message_text}
			</ResponseText>
		</Grid>
		<Grid item xs={8}>
		</Grid>
	</Grid>
);

export const SectionNotFound: React.FC = () => (
	<Grid
		container
		direction='row'
		justifyContent='flex-start'
		alignItems='center'
		spacing={2}
	>
		<Grid item xs={5}>
			<ResponseText>
			Sorry! I could not find any such section.
			</ResponseText>
		</Grid>
		<Grid item xs={8}>
		</Grid>
	</Grid>
);
