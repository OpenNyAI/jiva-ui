
const monthConversion = (dateString: string) => {
	const date = new Date(dateString);
	const formattedDate = date.toLocaleDateString('en-US', {day: '2-digit', month: 'short'}).toUpperCase();
	return formattedDate;
};

export default monthConversion;
