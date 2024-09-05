import React, {
	createContext,
	useState,
	useEffect,
	useMemo,
	useCallback,
} from 'react'

const DashboardContext = createContext()

export const DashboardProvider = ({ children }) => {
	const [activePage, setActivePage] = useState('Profile')

	const handlePageChange = (page) => {
		setActivePage(page)
	}

	return (
		<DashboardContext.Provider value={{
      activePage,
      handlePageChange,
    }}>
			{children}
		</DashboardContext.Provider>
	)
}

export const useDashboard = () => React.useContext(DashboardContext)
