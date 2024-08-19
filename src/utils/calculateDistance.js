export const calcDistance = (userLat, userLon, listingLat, listingLon) => {
	// console.log('calcDistance called...', userLat, userLon, listingLat, listingLon);

	// Check for invalid inputs
	if (!userLat || !userLon || !listingLat || !listingLon) {
		console.error('Invalid coordinates provided.')
		return null
	}

	const earthRadius = 6371 // Radius of the Earth in kilometers

	// Convert degrees to radians
	const deltaLat = deg2rad(listingLat - userLat)
	const deltaLon = deg2rad(listingLon - userLon)

	// Haversine formula
	const a =
		Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
		Math.cos(deg2rad(userLat)) *
			Math.cos(deg2rad(listingLat)) *
			Math.sin(deltaLon / 2) *
			Math.sin(deltaLon / 2)

	const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
	const distance = earthRadius * c // Distance in kilometers

	return Math.round(distance)
}

const deg2rad = (deg) => {
	return deg * (Math.PI / 180)
}
