export const navItemColorBehavior = (isAuthenticated, isActive) => {
	if (!isAuthenticated) {
		return 'var(--ltGreenHover)'
	} else {
		if (isActive) {
			return 'var(--accentGreen)'
		} else {
			return 'var(--white)'
		}
	}
}