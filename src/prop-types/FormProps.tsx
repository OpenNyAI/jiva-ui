export type LabelContents = {
	text: string;
};
export type PasswordFieldProps = {
	handlePassword: (newPassword: string) => void;
	password: string;
	placeholder: string;
	showPassword?: boolean;
	handleShowPassword?: () => void;
};
export type LoginFormProps = {
	goToResetPassword: () => void;
	goToSearch: () => void;
	updateAccessToken: (newAccessToken: string) => void;
	updateUsername: (uname: string) => void;
	updateRefreshToken: (newRefreshToken: string) => void;
	handleAuthentication: () => void;
};
export type ResetPasswordFormProps = {
	goToLogin: () => void;
	goToSuccessPage: (email: string) => void;
};
export type ResetPasswordSuccessFormProps = {
	goToLogin: () => void;
	handleNotification: (isMailSent: boolean) => void;
	emailId: string;
};
export type UpdatePasswordFormProps = {
	reset_id: string;
	verification_code: string;
	handleNotification: (isUpdated: boolean) => void;
};
