import React from 'react';
import {type Document, type DocumentAutoCompleteProps} from '../prop-types/DocumentAutoCompleteProps';
import Autocomplete, {createFilterOptions} from '@mui/material/Autocomplete';
import {TextField} from '@mui/material';
import './DocumentAutoComplete.css';
import {Clear} from '@mui/icons-material';
const DocumentAutoComplete: React.FC<DocumentAutoCompleteProps> = ({documentList, handleDocumentSelection, handleSubmitFromInput, inputValue, handleQueryInput, queryInput}) => {
	const filter = createFilterOptions<Document>();
	const handleKeyDown = async (
		event: React.KeyboardEvent<HTMLInputElement | HTMLDivElement>,
	) => {
		const handleAsyncKeyDown = async () => {
			if (handleSubmitFromInput !== undefined) {
				await handleSubmitFromInput(event);
			}
		};

		if (event.key === 'Enter') {
			event.preventDefault();
			await handleAsyncKeyDown().catch();
		}
	};

	return (
		<Autocomplete
			sx={{width: '100%'}}
			onKeyDown={inputValue?.id === '' && queryInput === '' ? undefined : handleKeyDown}
			value={inputValue}
			onChange={(event, newValue) => {
				if (newValue !== null) {
					if (typeof newValue !== 'string') {
						handleDocumentSelection?.(newValue);
					}
				}
			}}
			filterOptions={(options, params) => {
				const filtered = filter(options, params);
				const {inputValue} = params;
				const isExisting = options.some((option: Document) => inputValue.toLowerCase() === (option.title!).toLowerCase());
				if (inputValue !== '' && !isExisting) {
					if (handleQueryInput !== undefined) {
						handleQueryInput(inputValue);
					}
				}

				return filtered;
			}}
			clearIcon={
				<div onClick={() => {
					handleDocumentSelection?.({id: '', title: ''});
					handleQueryInput!('');
				}}
				style={{visibility: inputValue?.title === '' && queryInput === '' ? 'hidden' : 'visible'}}>
					<Clear fontSize='small'/>
				</div>
			}
			selectOnFocus
			handleHomeEndKeys
			options={documentList as readonly Document[]}
			getOptionLabel={(option): string => {
				if (typeof option === 'string') {
					return option;
				}

				return option.title!;
			}}
			renderOption={(props, option) => <li {...props}>{option?.title}</li>}
			freeSolo
			renderInput={params => (
				<TextField {...params} placeholder='Type your query here' sx={{background: '#222427', borderRadius: '4px'}} />
			)}
		/>
	);
};

export default DocumentAutoComplete;
