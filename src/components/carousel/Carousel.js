import React, { useEffect, useState, useMemo } from 'react'
import { useDashboard } from '../../context/DashboardContext'
import { useWindowWidth } from '../../utils/useWindowWidth'
import LinkButton from '../buttons/LinkButton'
import Thumbnail from '../books/Thumbnail'
import Chevron from '../../icons/Chevron'
import {
  CarouselContainer,
  Header,
  CarouselWrapper,
  ChevronContainer,
  BooksViewport,
  BooksWrapper,
  BookPreview,
  ErrorMessage,
} from '../../assets/styles/CarouselStyles'

export default function Carousel({ books = [], title }) {
	const { handlePageChange } = useDashboard()
	const [currentIndex, setCurrentIndex] = useState(0)
	const [leftChevronVisible, setLeftChevronVisible] = useState(false)
	const [rightChevronVisible, setRightChevronVisible] = useState(false)
	const [message, setMessage] = useState('')

	const windowWidth = useWindowWidth()

	const getbooksPerPage = () => {
		if (windowWidth <= 679) return 2
		if (windowWidth <= 849) return 3
		if (windowWidth <= 999) return 4
		return 5
	}

	const booksPerPage = getbooksPerPage()

	const uniquebooks = useMemo(() => {
		const seen = new Set()
		return books.filter((book) => {
			if (seen.has(book.id)) {
				return false
			}
			seen.add(book.id)
			return true
		})
	}, [books])

	const shuffledBooks = useMemo(() => {
		if (title !== 'Your Listings' || title !== 'Recommended for You') {
		return uniquebooks.sort(() => Math.random() - 0.5)
		}
	}, [uniquebooks, title])

	useEffect(() => {
		setCurrentIndex(0)
		if (books.length === 0) {
			setMessage('No books found')
		}
	}, [books])

	const handleNext = () => {
		setCurrentIndex((prevIndex) =>
			Math.min(prevIndex + booksPerPage, books.length - booksPerPage)
		)
	}

	const handlePrev = () => {
		setCurrentIndex((prevIndex) => Math.max(prevIndex - booksPerPage, 0))
	}

	const handleKeyDown = (e) => {
		if (e.key === 'ArrowRight') {
			handleNext()
		}
		if (e.key === 'ArrowLeft') {
			handlePrev()
		}
	}

	useEffect(() => {
		setLeftChevronVisible(currentIndex > 0)
		setRightChevronVisible(currentIndex + booksPerPage < books.length)
	}, [currentIndex, books.length, booksPerPage])

	useEffect(() => {
		setCurrentIndex((prevIndex) => {
			const maxIndex = books.length - booksPerPage
			return Math.min(prevIndex, maxIndex)
		})
	}, [books.length, booksPerPage])

	const renderButton = () => {
		if (title === 'Your Listings') {
			return (
				<LinkButton
					text="Add New"
					onClick={() => handlePageChange('Listings')}
				/>
			)
		}
		if (title === 'Recommended for You') {
			return (
				<LinkButton
					text="View All"
					onClick={() => handlePageChange('Browse')}
				/>
			)
		}
		return null
	}

	const isEmpty = uniquebooks.length === 0

	return (
		<CarouselContainer tabIndex={0} onKeyDown={handleKeyDown}>
			<Header>
				<h2>{title}</h2>
				{renderButton()}
			</Header>
			<CarouselWrapper>
				{isEmpty ? (
					<ErrorMessage>{message}</ErrorMessage>
				) : (
					<>
						<ChevronContainer $position={'left'}>
							<Chevron
								isVisible={leftChevronVisible}
								boolean={true}
								onClick={handlePrev}
							/>
						</ChevronContainer>

						<BooksViewport>
							<BooksWrapper
								$offset={currentIndex / booksPerPage}
								$isEmpty={isEmpty}
							>
								{shuffledBooks.map((book) => (
									<BookPreview key={book.id}>
										<Thumbnail book={book} />
									</BookPreview>
								))}
							</BooksWrapper>
						</BooksViewport>

						<ChevronContainer $position={'right'}>
							<Chevron
								isVisible={rightChevronVisible}
								indexboolean={false}
								onClick={handleNext}
							/>
						</ChevronContainer>
					</>
				)}
			</CarouselWrapper>
		</CarouselContainer>
	)
}
