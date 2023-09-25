import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Typography from '@mui/material/Typography';
import styled from '@emotion/styled';
import {StepConnector, stepConnectorClasses, type StepIconProps, Chip} from '@mui/material';
import {type EditionsListProps} from '../prop-types/PdfProps';
import BulletIcon from '../assets/Show.png';
import FadedBulletIcon from '../assets/NotShow.png';

const EditionsList: React.FC<EditionsListProps> = ({editions, changeEdition}) => {
	const QontoConnector = styled(StepConnector)(({theme}) => ({
		[`&.${stepConnectorClasses.alternativeLabel}`]: {
			top: 0,
			left: 'calc(-50% + 16px)',
			right: 'calc(50% + 16px)',
		},
		[`&.${stepConnectorClasses.active}`]: {
			[`& .${stepConnectorClasses.line}`]: {
				borderColor: 'white',
			},
		},
		[`&.${stepConnectorClasses.completed}`]: {
			[`& .${stepConnectorClasses.line}`]: {
				borderColor: 'white',
			},
		},
		[`& .${stepConnectorClasses.line}`]: {
			borderColor: 'white',
		},
	}));

	const QontoStepIconRoot = styled('div')<{ownerState: {active?: boolean}}>(
		({theme, ownerState}) => ({
			display: 'flex',
			height: 40,
			alignItems: 'center',
			color: 'white',
			...(ownerState.active === true && {
				color: 'white',
			}),
			...(ownerState.active === false && {
				color: 'white',
			}),
		}),
	);

	function QontoStepIcon(props: StepIconProps) {
		const {active, completed, className} = props;

		return (
			<QontoStepIconRoot ownerState={{active}} className={className}>
				{completed === true ? <img style={{marginLeft: '8px'}} src={BulletIcon}/> : <img style={{marginLeft: '8px'}} src={FadedBulletIcon}/>}
			</QontoStepIconRoot>
		);
	}

	const editionsSorted = editions?.sort((a, b) => Number(b?.publish_date?.substring(0, 4)?.trim()) - Number(a?.publish_date?.substring(0, 4)?.trim()));
	return (
		<Box sx={{maxWidth: 600, padding: 2}}>
			<Typography mb={1}>Timeline and Editions</Typography>
			<Stepper orientation='vertical' activeStep={1} connector={<QontoConnector />}>
				{editionsSorted?.map(edition => (
					<Step key={edition?.id}>
						<StepLabel StepIconComponent={QontoStepIcon} onClick={async () => {
							if (edition?.id !== undefined) {
								await changeEdition(edition?.id);
							}
						}}><span style={{cursor: 'pointer'}}>Edition {edition?.publish_date?.substring(0, 4).trim()}
								{editionsSorted[0]?.publish_date?.substring(0, 4).trim() === edition?.publish_date?.substring(0, 4)?.trim()
							&& <Chip label='CURRENT' sx={{marginLeft: '12px', backgroundColor: 'teal', fontSize: '10px', padding: '3px'}} size='small'/>
								}</span>
						</StepLabel></Step>
				))}
			</Stepper>
		</Box>
	);
};

export default EditionsList;
