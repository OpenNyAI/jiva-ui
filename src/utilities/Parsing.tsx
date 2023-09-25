
export const parsingData = (data: string) => {
	try {
		const parsedData: unknown | undefined = JSON.parse(data);
		if (parsedData) {
			return parsedData;
		}

		return data;
	} catch (error) {
		return data;
	}
};
