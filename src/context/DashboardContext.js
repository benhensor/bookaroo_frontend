import React, { createContext, useState, useEffect, useCallback } from 'react'

const DashboardContext = createContext()

export const DashboardProvider = ({ children }) => {
	const [activePage, setActivePage] = useState(() => {
		return localStorage.getItem('activePage') || 'Profile'
	})
	const [modalOpen, setModalOpen] = useState(false)
  const [type, setType] = useState('')
	const [selectedBook, setSelectedBook] = useState(null)
  const [replyMessage, setReplyMessage] = useState(null)

	useEffect(() => {
		localStorage.setItem('activePage', activePage)
	}, [activePage])

  
	const openModal = useCallback((data) => {
    setSelectedBook(data.book)
    setType(data.type)
    setReplyMessage(data.replyMessage)
		setModalOpen(true)
	}, [])
  
	const closeModal = useCallback(() => {
    setSelectedBook(null)
    setType('')
    setReplyMessage(null)
		setModalOpen(false)
	}, [])
  
  const handlePageChange = ((page) => {
    closeModal()
    setActivePage(page)
  })
  

	return (
		<DashboardContext.Provider
			value={{
				activePage,
				modalOpen,
				selectedBook,
        replyMessage,
        type,
				handlePageChange,
				openModal,
				closeModal,
			}}
		>
			{children}
		</DashboardContext.Provider>
	)
}

export const useDashboard = () => React.useContext(DashboardContext)
