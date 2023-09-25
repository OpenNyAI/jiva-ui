
import React from 'react';
import Button from '@mui/material/Button';
import {styled} from '@mui/system';
import LoadingButton from './LoadingButton';

const StyledButton = styled(Button)(({theme}) => ({
	color: 'white',
	background: 'linear-gradient(227deg, #E5948E 0%, #7592E3 100%)',
	fontWeight: 800,
}));

type AuthButtonProps = {
	children: React.ReactNode;
	onClick?: () => void;
	disabled?: boolean;
	loading?: boolean;
};

function AuthButton({children, onClick, disabled, loading, ...props}: AuthButtonProps) {
	const handleClick = () => {
		if (onClick && disabled === false) {
			onClick();
		}
	};

	return loading === true ? (
		<LoadingButton />
	) : <StyledButton {...props} variant='contained' onClick={handleClick} disabled={disabled} fullWidth>
		{children}
	</StyledButton>;
}

export default AuthButton;
