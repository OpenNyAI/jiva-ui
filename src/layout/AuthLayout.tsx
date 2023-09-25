import {Box, CssBaseline, Grid} from '@mui/material';
import React, {type FC} from 'react';
import AuthAppBar from '../components/AuthAppbar';
import GridItem from '../components/GridItem';
import Main from '../components/Main';
import {type AuthLayoutProps} from '../prop-types/LayoutProps';

const AuthLayout: FC<AuthLayoutProps> = ({SubComponent}) => (
	<Box sx={{display: 'flex'}}>
		<CssBaseline />
		<AuthAppBar/>
		<Main>
			<Box sx={{flexGrow: 1, marginTop: '4rem'}}>
				<Grid
					container
					justifyContent='space-between'
					alignItems='center'
					gap={1}
				>
					<Grid item xs={3}>
						<GridItem/>
					</Grid>
					<Grid item xs={3} textAlign='center'>
						<GridItem>
							<SubComponent/>
						</GridItem>
					</Grid>
					<Grid item xs={1}>
						<GridItem/>
					</Grid>
				</Grid>
			</Box>
		</Main>
	</Box>
);
export default AuthLayout;
