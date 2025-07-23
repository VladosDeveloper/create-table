export function getRandomDate() {
	// Генерируем случайный год (от текущего до +10 лет)
	const currentYear = new Date().getFullYear();
	const year = Math.floor(Math.random() * 10) + currentYear;
	
	// Генерируем случайный месяц (1-12)
	const month = Math.floor(Math.random() * 12) + 1;
	const formattedMonth = month < 10 ? `0${month}` : month;
	
	// Генерируем случайный день (с учетом дней в месяце)
	const daysInMonth = new Date(year, month, 0).getDate();
	const day = Math.floor(Math.random() * daysInMonth) + 1;
	const formattedDay = day < 10 ? `0${day}` : day;
	
	return `${formattedDay}.${formattedMonth}.${year}`;
}