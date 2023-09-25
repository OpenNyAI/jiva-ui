import {VisibilityOff, Visibility} from '@mui/icons-material';
import {TextField, InputAdornment, IconButton} from '@mui/material';
import React, {useState, type FC, useEffect} from 'react';
import {type PasswordFieldProps} from '../prop-types/FormProps';

const PasswordField: FC<PasswordFieldProps> = ({handlePassword, placeholder, password}) => {
	const [showPassword, setShowPassword] = React.useState(false);
	const [passwordInput, setPasswordInput] = useState(password);

	const handleShowPassword = () => {
		setShowPassword(show => !show);
	};

	const handlePasswordInput = (event: React.ChangeEvent<HTMLInputElement>) => {
		const newPassword = event.target.value;
		setPasswordInput(newPassword);
		handlePassword(newPassword);
	};

	return (
		<TextField type={showPassword ? 'text' : 'password'} placeholder={placeholder} variant='outlined' fullWidth InputProps={{
			endAdornment: (
				<InputAdornment position='end'>
					<IconButton
						aria-label='toggle password visibility'
						onClick={handleShowPassword}
						edge='end'
					>
						{showPassword ? <VisibilityOff /> : <Visibility />}
					</IconButton>
				</InputAdornment>
			),
		}} onChange={handlePasswordInput} value={passwordInput}/>
	);
};

export default PasswordField;
