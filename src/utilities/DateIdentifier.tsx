const dateSeperator = (str: string) => {
	const dateRegex = /(\b\d{1,2} [A-Za-z]+ \d{4}\b)/g;
	const stringArray = str?.split(dateRegex)?.filter(string => string !== '');
	const response = {
		dateExpression: stringArray?.[1],
		stringExpression: stringArray?.[0],
	};
	return response;
};

const yearSeperator = (str: string) => {
	const yearRegex = /(\b\d{4}\b)/;
	const stringArray = str?.split(yearRegex)?.filter(Boolean);
	const response = {
		yearExpression: stringArray?.[1]?.trim(),
		stringExpression: stringArray?.[0]?.trim(),
	};
	return response;
};

export {dateSeperator, yearSeperator};

