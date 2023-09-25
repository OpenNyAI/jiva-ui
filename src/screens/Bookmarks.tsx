import {Box, CircularProgress, Grid, Typography} from '@mui/material';
import React, {useContext, useEffect, useState} from 'react';
import {CustomContext} from '../utilities/CustomContext';
import {BookmarkDocsTable} from '../components/BookmarkTable';
import {type Bookmark, type TransformedObject} from '../prop-types/BookmarkProps';
import GridItem from '../components/GridItem';

const Bookmarks = () => {
	const {bookmarks, accessToken, username, isAuthenticated, updateBookmarks} = useContext(CustomContext);
	const [aggregatedBookmarks, setAggregatedBookmarks] = useState<TransformedObject[]>([]);
	const [loading, setLoading] = useState<boolean>(false);
	const aggregrateBookmarks = (bookmarks: Bookmark[]) => {
		const transformedArray: TransformedObject[] = [];

		bookmarks.forEach(item => {
			const existingItem = transformedArray.find(obj => obj?.docId === item?.document_id && obj?.docTitle === item?.document_title);
			const newItem: Bookmark = item;

			if (existingItem) {
				existingItem?.bookmarks?.push(newItem);
				existingItem.savedPages = existingItem?.bookmarks?.length;
			} else {
				transformedArray.push({
					docId: item?.document_id,
					docTitle: item?.document_title,
					bookmarks: [newItem],
					savedPages: 1,
				});
			}
		});
		setAggregatedBookmarks(transformedArray);
	};

	const getBookmarks = async () => {
		setLoading(true);
		if (accessToken?.length > 0 && username?.length > 0) {
			try {
				const response = await fetch(`${process.env.REACT_APP_API_ENDPOINT!}/bookmarks/${username}`,
					{
						method: 'GET',
						headers: {
							accept: 'application/json',
							Authorization: `Bearer ${accessToken}`,
						},
					});
				const data: unknown = await response.json();
				updateBookmarks(data as Bookmark[]);
				setLoading(false);
			} catch (error) {
				updateBookmarks([] as Bookmark[]);
			}
		}
	};

	useEffect(() => {
		if (accessToken.length > 0 && isAuthenticated && username?.length > 0) {
			getBookmarks().catch(error => error as Error);
		}
	}, []);
	useEffect(() => {
		if (bookmarks !== undefined && bookmarks?.length > 0) {
			aggregrateBookmarks(bookmarks);
			setLoading(false);
		}
	}, [bookmarks]);

	return (
		<>{loading ? <Box sx={{flexGrow: 1, marginTop: '4rem'}}>
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
		</Box> : <>
			{aggregatedBookmarks !== undefined
			&& <>{aggregatedBookmarks?.length > 0 ? (
				<>
					<BookmarkDocsTable bookmarks={aggregatedBookmarks}/>
				</>)
				: (
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
												<img src='./BookmarkEmpty.png'/>
												<Typography variant='h6'>No Bookmarks</Typography>
												<Typography variant='body2'>To bookmark a page, click on the bookmark icon in the toolbar.</Typography>
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
				)}</>
			}
		</>}
		</>
	);
};

export default Bookmarks;
