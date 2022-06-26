export function dateFormat(timestamp) {
	var date = new Date(timestamp);

	var d = date.getDate();

	var m = date.getMonth() + 1;

	var y = date.getFullYear();

	return `${m}/${d}/${y}`;
}
