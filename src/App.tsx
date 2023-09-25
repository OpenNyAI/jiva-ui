import React, {useState} from 'react';
import './App.css';
import theme from './theme/theme';
import {ThemeProvider} from '@mui/material/styles';
import {BrowserRouter, Navigate, Routes, Route} from 'react-router-dom';
import {CustomContextProvider} from './utilities/CustomContext';

import Layout from './layout/Layout';
import Login from './screens/Login';
import ResetPassword from './screens/ResetPassword';
import Error from './screens/Error';
import ResetPasswordSuccess from './screens/ResetPasswordSuccess';
import UpdatePassword from './screens/UpdatePassword';

function App() {
	return (
		<CustomContextProvider>
			<ThemeProvider theme={theme}>
				<BrowserRouter>
					<Routes>
						<Route path='/login' element={<Login/>} />
						<Route path='/reset-password' element={<ResetPassword/>} />
						<Route path='/reset-password-success/:emailId' element={<ResetPasswordSuccess/>} />
						<Route path='/update-password' element={<UpdatePassword/>} />
						<Route path='/*' element={<Layout/>}/>
						<Route path='/' element={<Navigate to='/login' replace />}/>
						<Route path='*' element={<Error/>}/>
					</Routes>
				</BrowserRouter>
			</ThemeProvider>
		</CustomContextProvider>
	);
}

export default App;
