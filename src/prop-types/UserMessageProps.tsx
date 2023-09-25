
type QueryProps = {
	query: string;
};
type DateAutoCompletProps = {
	dates: string[];
	defaultDate?: string;
	handleVersionSelect?: (date: string) => void;
};
export type {QueryProps, DateAutoCompletProps};
