import React, {useContext, useEffect, useState} from 'react';
import {CustomContext} from '../utilities/CustomContext';
import {type DailyActivityList} from '../prop-types/ChatBotProps';
import {ActivityTable} from '../components/ActivityTable';
import {Alert, Box, CircularProgress, Grid, Snackbar, Typography, styled} from '@mui/material';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import GridItem from '../components/GridItem';

const Activity = () => {
	const {accessToken, username} = useContext(CustomContext);
	const [activities, setActivities] = useState<DailyActivityList>({} as DailyActivityList);
	const [isClearing, setIsClearing] = React.useState(false);
	const [openClearSearch, setOpenClearSearch] = React.useState(false);
	const [clearing, setClearing] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(false);

	const getActivity = async (emailId: string, accessToken: string) => {
		setLoading(true);
		try {
			const response = await fetch(`${process.env.REACT_APP_API_ENDPOINT!}/daily-activities/${emailId}`,
				{
					method: 'GET',
					headers: {
						accept: 'application/json',
						Authorization: `Bearer ${accessToken}`,
					},
				});
			const data: unknown = await response.json();
			setLoading(false);
			setActivities(data as DailyActivityList);
		} catch (error) {
			setLoading(false);
			setActivities({} as DailyActivityList);
		}
	};

	const handleCloseClearSearch = () => {
		setOpenClearSearch(false);
	};

	const handleClickClearSearch = () => {
		setOpenClearSearch(true);
	};

	const handleClearSearch = async (message_id: string) => {
		try {
			const response = await fetch(`${process.env.REACT_APP_API_ENDPOINT!}/daily-activities/${username}/${message_id}`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${accessToken}`,
				},
			});

			const data: unknown = await response.json();
			if ((data as Record<string, unknown>)?.response === 'activity deleted successfully') {
				setIsClearing(true);
				setClearing(true);
				setOpenClearSearch(false);
			} else {
				setClearing(false);
				setIsClearing(false);
				setOpenClearSearch(true);
			}
		} catch (error) {
			setClearing(false);
			setIsClearing(false);
			setOpenClearSearch(true);
		}
	};

	const handleClose = () => {
		setIsClearing(false);
	};

	const handleCloseClearing = () => {
		setClearing(false);
	};

	useEffect(() => {
		getActivity(username, accessToken).catch(error => error as Error);
	}, []);
	return (
		<div style={{marginBottom: '10px'}}>
			<>{
				loading
					? <Box sx={{flexGrow: 1, marginTop: '4rem'}}>
						<Grid container
							justifyContent='space-around'
							alignItems='center' gap={1}>
							<Grid item xs>
								<GridItem/>
							</Grid>
							<Grid item xs textAlign='center'>
								<GridItem>
									<Grid
										container
										direction='column'
										justifyContent='space-around'
										alignItems='center' gap={6}
									>
										<Grid item xs={4}>
											<GridItem/>
										</Grid>
										<Grid item xs={4}>
											<GridItem/>
										</Grid>
										<Grid item xs={4}>
											<GridItem/>
										</Grid>
										<Grid item xs={4}>
											<GridItem>
												<CircularProgress/>
												<Typography variant='h6'>Loading ...</Typography>
											</GridItem>
										</Grid>
									</Grid>
								</GridItem>
							</Grid>
							<Grid item xs>
								<GridItem/>
							</Grid>
						</Grid>
					</Box>
					: <>{activities?.daily_activities?.length > 0
						? <>
							{activities?.daily_activities?.map(activity =>
								<ActivityTable
									key={activity?.date}
									activities={activity}
									handleClearSearch={handleClearSearch}
									isClearingActivity={isClearing}
									handleCloseClearSearch={handleCloseClearSearch}
									openClearSearch={openClearSearch}
									handleClickClearSearch={handleClickClearSearch}/>)}
						</>
						: <>
							<Box sx={{flexGrow: 1, marginTop: '4rem'}}>
								<Grid container
									justifyContent='space-around'
									alignItems='center' gap={1}>
									<Grid item xs>
										<GridItem/>
									</Grid>
									<Grid item xs textAlign='center'>
										<GridItem>
											<Grid
												container
												direction='column'
												justifyContent='space-around'
												alignItems='center' gap={6}
											>
												<Grid item xs={4}>
													<GridItem/>
												</Grid>
												<Grid item xs={4}>
													<GridItem/>
												</Grid>
												<Grid item xs={4}>
													<GridItem/>
												</Grid>
												<Grid item xs={4}>
													<GridItem>
														<SearchOutlinedIcon sx={{fontSize: '100px'}}/>
														<Typography variant='h6'>No Activities</Typography>
													</GridItem>
												</Grid>
											</Grid>
										</GridItem>
									</Grid>
									<Grid item xs>
										<GridItem/>
									</Grid>
								</Grid>
							</Box>
						</>}
					</>
			}
			</>

			<Snackbar
				anchorOrigin={{vertical: 'top', horizontal: 'right'}}
				open={isClearing}
				autoHideDuration={5000}
				onClose={handleClose}
				message='Link is copied!'
			><Alert severity='success'>Activity Deleted</Alert></Snackbar>
		</div>
	);
};

export default Activity;
