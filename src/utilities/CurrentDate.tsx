export const currentDate = () => {
	const currentDate = new Date();
	const year = String(currentDate.getFullYear());
	const month = String(currentDate.getMonth() + 1);
	const day = String(currentDate.getDate());
	const formattedDate = year + '-' + month.toString().padStart(2, '0') + '-' + day.toString().padStart(2, '0');
	return formattedDate;
};

const monthNames = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December',
];
export const currentDateReversed = () => currentDate().split('-').reverse().join('-');

export const currentDateInVerbose = () => {
	const currentDate = new Date();
	const month = monthNames[currentDate.getMonth()];
	const day = currentDate.getDate();
	const year = currentDate.getFullYear();
	const formattedDate = `${month} ${day}, ${year}`;
	return formattedDate;
};

export const convertDateInVerbose = (inputDate: string) => {
	if (inputDate !== undefined && inputDate?.length > 0) {
		const date = new Date(inputDate);
		const day = date.getDate();
		const month = date.getMonth();
		const year = date.getFullYear();

		const addSuffix = (day: number) => {
			if (day >= 11 && day <= 13) {
				return `${day}th`;
			}

			switch (day % 10) {
				case 1:
					return `${day}st`;
				case 2:
					return `${day}nd`;
				case 3:
					return `${day}rd`;
				default:
					return `${day}th`;
			}
		};

		const formattedDate = `${addSuffix(day)} ${monthNames[month]} ${year}`;

		return formattedDate;
	}
};
