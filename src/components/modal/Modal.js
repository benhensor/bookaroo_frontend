import React from 'react'
import { useDashboard } from '../../context/DashboardContext'
import BookDetail from '../books/BookDetail'
import Contact from '../contact/Contact'
import { ModalContainer } from '../../assets/styles/ModalStyles'

export default function BookModal() {

  const { modalOpen, selectedBook, type, replyMessage } = useDashboard()

  if (!modalOpen || !selectedBook) {
    return null
  }

  return (
    <ModalContainer $isOpen={modalOpen}>
      {type === 'contact' && (
        <Contact book={selectedBook} replyMessage={replyMessage} />
      )}
      {type === 'book' && (
        <BookDetail book={selectedBook} />
      )}
    </ModalContainer>
  )
}
