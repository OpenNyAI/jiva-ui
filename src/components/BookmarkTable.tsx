import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import {Grid, IconButton, InputAdornment, TextField, Typography} from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchIcon from '@mui/icons-material/Search';
import {useNavigate} from 'react-router-dom';
import {type BookmarkColumn, type Bookmark, type BookmarksTableProps, type BookmarkDocsTableProps, type TransformedObject, type BookmarkDocColumn} from '../prop-types/BookmarkProps';
import BookmarkEditMenu from './BookmarkEditMenu';
import {useEffect, useState} from 'react';
import RefreshIcon from '@mui/icons-material/Refresh';

export const BookmarksTable: React.FC<BookmarksTableProps> = ({bookmarks, editBookmark, deleteBookmark, handleDeleted, isDeleted, isBookmarkDeletionUndo}) => {
	const [anchorHamburger, setAnchorHamburger] = React.useState<undefined | HTMLElement>(undefined);
	const openHamburger = Boolean(anchorHamburger);
	const [selectedBookmark, setSelectedBookmark] = useState<Bookmark>({} as Bookmark);
	const [deletedBookmark, setDeletedBookmark] = useState<Bookmark>({} as Bookmark);
	const handleClickHamburgerMenu = (bookmark: Bookmark) => (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorHamburger(event.currentTarget);
		setSelectedBookmark(bookmark);
	};

	const editBm = () => {
		editBookmark!(selectedBookmark?.bookmark_page);
	};

	const handleCloseHamburgerMenu = () => {
		setAnchorHamburger(undefined);
	};

	const navigate = useNavigate();
	const [rows, setRows] = React.useState<Bookmark[]>(bookmarks);
	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(25);
	const [searched, setSearched] = React.useState<string>('');

	const handleChangePage = (event: unknown, newPage: number) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
		setRowsPerPage(Number(event.target.value));
		setPage(0);
	};

	const deleteBm = async () => {
		await deleteBookmark!(selectedBookmark);
		setDeletedBookmark(selectedBookmark);
		handleCloseHamburgerMenu();
		handleDeleted();
		const remainingBookmarks = rows.filter((row: Bookmark) => (row?.bookmark_name)?.toLowerCase() !== selectedBookmark?.bookmark_name?.toLowerCase());
		setRows(remainingBookmarks);
	};

	useEffect(() => {
		if (isBookmarkDeletionUndo && Object.keys(deletedBookmark).length > 0) {
			setRows([...rows, deletedBookmark]);
			setDeletedBookmark({} as Bookmark);
		}
	}, [isBookmarkDeletionUndo, deletedBookmark]);
	const requestSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearched(event.target.value);
		const filteredRows = bookmarks.filter((row: Bookmark) => (row?.bookmark_name)?.toLowerCase().includes(event.target.value?.toLowerCase()));
		setRows(filteredRows);
	};

	const columns: readonly BookmarkColumn[] = [
		{id: 'bookmark_name', label: <TextField sx={{width: 300}} size='small'
			value={searched}
			onChange={
				requestSearch}
			InputProps={{
				startAdornment: (
					<InputAdornment position='start'>
						<SearchIcon />
					</InputAdornment>
				),
			}}
			placeholder='Search'
		/>, minWidth: 200, align: 'left'},
		{id: 'bookmark_page', label: 'Page No.', minWidth: 50, align: 'left'},
	];
	const cancelSearch = () => {
		setSearched('');
	};

	return (
		<Paper sx={{width: '100%', overflow: 'hidden'}}>
			<TableContainer sx={{maxHeight: 440}}>
				<Table stickyHeader aria-label='sticky table'>
					<TableHead>
						<TableRow>
							{columns.map(column => (
								<TableCell
									key={column.id}
									align={column.align}
									style={{minWidth: column.minWidth, paddingLeft: '0'}}
								>
									{column.label}
								</TableCell>
							))}
							<TableCell
								align='right'
								style={{minWidth: 50, paddingLeft: '0'}}
							>
							</TableCell>
							<TableCell
								align='right'
								style={{minWidth: 50, paddingLeft: '0'}}
							>
							</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{rows
							.slice(page * rowsPerPage, (page * rowsPerPage) + rowsPerPage)
							.map((row, index) => (
								<TableRow hover role='checkbox' tabIndex={-1} key={row.document_id }>
									{columns.map(column => {
										let value;
										if (column.id === 'slot') {
											value = index + 1;
										} else {
											value = row[column.id];
										}

										return (
											<TableCell key={column.id} align={column.align}>
												{column.id === 'bookmark_name' ? <Grid container width={500}>
													<Grid item xs={1} mt={0.5}><Typography variant='body1'>{index + 1}</Typography></Grid>
													<Grid item xs={8}><Typography variant='body1' mb={1}>{value}</Typography>
														<Typography variant='caption' color='text.secondary' >{row?.bookmark_note}</Typography></Grid>
												</Grid> : <Typography variant='body1' mb={0.5}>{value}</Typography>}
												<BookmarkEditMenu anchorHamburger={anchorHamburger} handleCloseHamburgerMenu={handleCloseHamburgerMenu} openHamburger={openHamburger} deleteBookmark={deleteBm} editBookmark={editBm} bookmark={selectedBookmark}/>
											</TableCell>
										);
									})}
									<TableCell align='right'>
										<IconButton size='large' aria-label='show 4 new mails' color='inherit' onClick={() => {
											navigate(`/pdf/${row.document_id}/${String(row.bookmark_page)}`);
										}}>
											<OpenInNewIcon sx={{color: '#5571C2'}}/>
										</IconButton>
									</TableCell>
									<TableCell align='right'>
										<IconButton size='large' aria-label='show 4 new mails' color='inherit' onClick={handleClickHamburgerMenu(row)}>
											<MoreVertIcon/>
										</IconButton>
									</TableCell>
								</TableRow>
							))}
					</TableBody>
				</Table>
			</TableContainer>
			<TablePagination
				rowsPerPageOptions={[10, 25, 100]}
				component='div'
				count={rows.length}
				rowsPerPage={rowsPerPage}
				page={page}
				onPageChange={handleChangePage}
				onRowsPerPageChange={handleChangeRowsPerPage}
			/>
		</Paper>
	);
};

export const BookmarkDocsTable: React.FC<BookmarkDocsTableProps> = ({bookmarks}) => {
	const navigate = useNavigate();
	const [rows, setRows] = React.useState<TransformedObject[]>(bookmarks);
	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(10);
	const [searched, setSearched] = React.useState<string>('');

	const handleChangePage = (event: unknown, newPage: number) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
		setRowsPerPage(Number(event.target.value));
		setPage(0);
	};

	const requestSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearched(event.target.value);
		const filteredRows = bookmarks.filter(row => (row?.docTitle)?.toLowerCase().includes(event.target.value?.toLowerCase()));
		setRows(filteredRows);
	};

	const columns: readonly BookmarkDocColumn[] = [
		{id: 'docTitle', label: <><TextField sx={{width: 300}} size='small'
			value={searched}
			onChange={
				requestSearch}
			InputProps={{
				startAdornment: (
					<InputAdornment position='start'>
						<SearchIcon />
					</InputAdornment>
				),
			}}
			placeholder='Search'
		/><IconButton onClick={() => {
			window.location.reload();
		}}><RefreshIcon/></IconButton></>, minWidth: 500, align: 'left'},
		{id: 'savedPages', label: 'Saved Pages', minWidth: 100, align: 'left'},
	];
	const cancelSearch = () => {
		setSearched('');
	};

	return (
		<Paper sx={{width: '100%', overflow: 'hidden'}}>
			<TableContainer sx={{maxHeight: 440}}>
				<Table stickyHeader aria-label='sticky table'>
					<TableHead>
						<TableRow>
							{columns.map(column => (
								<TableCell
									key={column.id}
									align={column.align}
									style={{minWidth: column.minWidth, paddingLeft: '0'}}
								>
									{column.label}
								</TableCell>
							))}
						</TableRow>
					</TableHead>
					<TableBody>
						{rows
							.slice(page * rowsPerPage, (page * rowsPerPage) + rowsPerPage)
							.map(row => (
								<TableRow onClick={() => {
									navigate(`/bookmark/${row.docId}`, {state: {row}});
								}} hover role='checkbox' tabIndex={-1} key={row.docId } sx={{cursor: 'pointer'}}>
									{columns.map(column => {
										const value = row[column.id];
										return (
											<TableCell key={column.id} align={column.align}>
												{value as string}
											</TableCell>
										);
									})}
								</TableRow>
							))}
					</TableBody>
				</Table>
			</TableContainer>
			<TablePagination
				rowsPerPageOptions={[10, 25, 100]}
				component='div'
				count={rows.length}
				rowsPerPage={rowsPerPage}
				page={page}
				onPageChange={handleChangePage}
				onRowsPerPageChange={handleChangeRowsPerPage}
			/>
		</Paper>
	);
};
