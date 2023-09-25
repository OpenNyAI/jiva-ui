import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import {IconButton, Typography} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import {useNavigate} from 'react-router-dom';
import {useState} from 'react';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import {type ActivityTableProps, type ActivityColumn, type ActivityItem} from '../prop-types/ChatBotProps';
import {currentDateInVerbose} from '../utilities/CurrentDate';

export const ActivityTable: React.FC<ActivityTableProps> = ({activities, handleClearSearch, handleCloseClearSearch, isClearingActivity, openClearSearch, handleClickClearSearch}) => {
	const navigate = useNavigate();
	const [rows, setRows] = React.useState<ActivityItem[]>(activities?.activities);
	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(25);
	const [searched, setSearched] = React.useState<string>('');
	const [clearing, setClearing] = useState<boolean>(false);

	const handleChangePage = (event: unknown, newPage: number) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
		setRowsPerPage(Number(event.target.value));
		setPage(0);
	};

	const columns: readonly ActivityColumn[] = [
		{id: 'activity', label: <Typography>{activities?.date === currentDateInVerbose() ? <>Today</> : <>{activities?.date}</>}</Typography>, minWidth: 10, align: 'left'},
		{id: 'title', label: '', minWidth: 20, align: 'left'},
		{id: 'time', label: '', minWidth: 50, align: 'right'},
	];
	const cancelSearch = () => {
		setSearched('');
	};

	const onClear = async (message_id: string) => {
		setClearing(true);
		await handleClearSearch(message_id);
		setClearing(false);
		const remainingActivities = rows?.filter((row: ActivityItem) => (row?.message_id) !== message_id);
		setRows(remainingActivities);
	};

	return (<>
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
						</TableRow>
					</TableHead>
					<TableBody>
						{(rows)?.slice(page * rowsPerPage, (page * rowsPerPage) + rowsPerPage)
							.map((row, index) => (
								<TableRow hover role='checkbox' tabIndex={-1} key={row.message_id}>
									{columns.map(column => {
										const value = row[column.id];
										return (
											<TableCell key={column.id} align={column.align}>
												<Typography variant='body1' mb={0.5}>{
													value === 'Searched' || value === 'Feedback' ? <>
														{value === 'Searched' ? <><SearchIcon sx={{marginRight: '20px', paddingTop: '9px'}}/>{value}</> : <><svg xmlns='http://www.w3.org/2000/svg' width='12' height='14' viewBox='0 0 12 14' fill='none' style={{marginRight: '20px'}}>
															<path d='M5.5199 0.439453C5.14365 0.439453 4.78115 0.671953 4.5399 1.04945C4.53115 1.06195 4.5174 1.06695 4.5099 1.07945L0.939902 5.97945C0.582403 6.4807 0.399902 7.0632 0.399902 7.66945V10.6795C0.399902 12.262 1.6974 13.5595 3.2799 13.5595H9.3599C9.8449 13.5595 10.2462 13.3632 10.5199 13.0995C10.7937 12.8357 10.9599 12.5107 10.9599 12.1795C10.9599 11.9057 10.8962 11.6807 10.8299 11.5095C11.1412 11.342 11.5999 11.0245 11.5999 10.2995C11.5999 9.8432 11.3787 9.54445 11.1599 9.34945C11.3787 9.13445 11.5999 8.8182 11.5999 8.33945C11.5999 7.62195 11.1449 7.3282 10.8799 7.18945C10.9074 7.02445 10.9599 6.78195 10.9599 6.48945C10.9599 5.8632 10.3687 5.27445 9.4999 5.26945C9.4974 5.26945 9.4924 5.26945 9.4899 5.26945C8.49615 5.2407 6.09615 5.23945 5.4999 5.23945C5.60615 5.0007 5.68365 4.83445 5.8799 4.38945C6.17865 3.71195 6.4924 3.00195 6.5899 2.72945C6.5899 2.7282 6.5899 2.7207 6.5899 2.71945C6.67615 2.4907 6.7999 2.26445 6.7999 1.90945C6.7999 1.4157 6.6074 1.0307 6.3499 0.789453C6.0924 0.548203 5.7924 0.439453 5.5199 0.439453ZM5.5199 1.07945C5.59865 1.07945 5.7749 1.1332 5.9099 1.25945C6.0449 1.3857 6.1599 1.57195 6.1599 1.90945C6.1599 2.12695 6.0949 2.2182 5.9899 2.49945C5.9899 2.5032 5.9899 2.5057 5.9899 2.50945C5.92615 2.6882 5.5999 3.4507 5.2999 4.12945C4.9999 4.8082 4.7199 5.42945 4.7199 5.42945C4.67615 5.5282 4.6849 5.64195 4.74365 5.7332C4.8024 5.8232 4.9024 5.8782 5.0099 5.87945C5.0099 5.87945 8.41115 5.8782 9.4799 5.90945C9.48365 5.90945 9.48615 5.90945 9.4899 5.90945C10.0862 5.90945 10.3199 6.28695 10.3199 6.48945C10.3199 6.7457 10.2299 7.29945 10.2299 7.29945C10.2062 7.45195 10.2949 7.5982 10.4399 7.64945C10.4399 7.64945 10.9599 7.81695 10.9599 8.33945C10.9599 8.8082 10.4899 9.08945 10.4899 9.08945C10.3799 9.1482 10.3137 9.26445 10.3199 9.38945C10.3262 9.5132 10.4037 9.6232 10.5199 9.66945C10.5199 9.66945 10.9599 9.8307 10.9599 10.2995C10.9599 10.827 10.2999 11.0795 10.2999 11.0795C10.2049 11.1132 10.1312 11.1907 10.1024 11.287C10.0724 11.3832 10.0899 11.4882 10.1499 11.5695C10.1499 11.5695 10.3199 11.7995 10.3199 12.1795C10.3199 12.2645 10.2462 12.4795 10.0799 12.6395C9.91365 12.7995 9.6749 12.9195 9.3599 12.9195H3.2799C2.04615 12.9195 1.0399 11.9132 1.0399 10.6795V7.66945C1.0399 7.1907 1.18115 6.7532 1.4599 6.35945C1.46115 6.35695 1.45865 6.35195 1.4599 6.34945L5.0399 1.42945C5.0474 1.41945 5.05365 1.40945 5.0599 1.39945C5.20365 1.1607 5.3974 1.07945 5.5199 1.07945Z' fill='#DFDFDF'/>
														</svg>{value}</>}
													</> : <>{value}</>
												}</Typography>
											</TableCell>
										);
									})}
									{row?.activity === 'Searched' ? <TableCell align='right'>
										<IconButton size='large' aria-label='show 4 new mails' color='inherit' onClick={async () => onClear(row?.message_id)}>
											<DeleteForeverOutlinedIcon/>
										</IconButton>
									</TableCell> : <TableCell align='right'>
									</TableCell>}

								</TableRow>
							))}
					</TableBody>
				</Table>
			</TableContainer>
			<TablePagination
				rowsPerPageOptions={[10, 25, 100]}
				component='div'
				count={rows?.length}
				rowsPerPage={rowsPerPage}
				page={page}
				onPageChange={handleChangePage}
				onRowsPerPageChange={handleChangeRowsPerPage}
			/>
		</Paper>
	</>
	);
};
