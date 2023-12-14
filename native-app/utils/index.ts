export const formatDate = (timestamp) => {
	const date = new Date(parseInt(timestamp));
	return date.toDateString() + ' ' + date.toLocaleTimeString();
}
