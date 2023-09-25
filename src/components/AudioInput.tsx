import React, {useEffect} from 'react';
import './AudioInput.css';
import MicNoneIcon from '@mui/icons-material/MicNone';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import {IconButton, Tooltip, type TooltipProps, Typography, styled, tooltipClasses} from '@mui/material';
import {type AudioProps} from '../prop-types/ChatBotProps';

const MicTooltip = styled(({className, ...props}: TooltipProps) => (
	<Tooltip {...props} classes={{popper: className}} />
))(({theme}) => ({
	[`& .${tooltipClasses.tooltip}`]: {
		backgroundColor: '#f5f5f9',
		color: 'rgba(0, 0, 0, 0.87)',
		maxWidth: 220,
		fontSize: theme.typography.pxToRem(12),
		border: '1px solid #dadde9',
	},
}));
const RecordingTip = () => (
	<em>Please click on the <u>recording icon</u> to stop the recording. </em>
);
const MicTip = () => (
	<>
		<Typography color='inherit'>What is the mic for?</Typography>
		<em>Please click on the <u>{'microphone'}</u> to record your query. You will see the query in the input box.</em>.{' '}
	</>
);
const AudioInput: React.FC<AudioProps> = ({transcript, onTranscript, onStartListening, onStopListening, isListening, handleResetTranscript}) => {
	useEffect(() => {
		if (transcript !== '') {
			onTranscript(transcript);
		}
	}, [transcript, handleResetTranscript]);
	const handleStartListening = async () => {
		await onStartListening();
	};

	const handleStopListening = async () => {
		await onStopListening();
	};

	return (<>
		<MicTooltip
			title={isListening
				? <RecordingTip/>
				: <MicTip/>
			}
		>
			<IconButton onClick={isListening ? handleStopListening : handleStartListening} className='audioInput-mic'>
				{isListening ? <RadioButtonCheckedIcon className='audioInput-audio-input' fontSize='large'/> : <MicNoneIcon className='audioInput-audio-input' fontSize='large' />}
			</IconButton>
		</MicTooltip>
	</>
	);
};

export default AudioInput;
