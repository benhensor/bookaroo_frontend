export const formatDate = (dateString) => {
	const date = new Date(dateString)

	const dayNames = [
		'Sunday',
		'Monday',
		'Tuesday',
		'Wednesday',
		'Thursday',
		'Friday',
		'Saturday',
	]
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
	]

	const dayName = dayNames[date.getDay()]
	const dayNumber = date.getDate()
	const monthName = monthNames[date.getMonth()]
	const year = date.getFullYear()

	// Add suffix (st, nd, rd, th)
	const getDaySuffix = (day) => {
		if (day >= 11 && day <= 13) return 'th'
		switch (day % 10) {
			case 1:
				return 'st'
			case 2:
				return 'nd'
			case 3:
				return 'rd'
			default:
				return 'th'
		}
	}

	const daySuffix = getDaySuffix(dayNumber)

	return {
    dayName,
    dayNumber,
    monthName,
    year,
    daySuffix,
  }
}
