import React, { useEffect, useState, useMemo } from 'react'
import styled from 'styled-components'
import { useWindowWidth } from '../../utils/useWindowWidth'
import Thumbnail from '../books/Thumbnail'
import Chevron from '../../icons/Chevron'

export default function Carousel({ books, title }) {
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

  // console.log('books:', title, books)

	const booksPerPage = getbooksPerPage()



  const uniquebooks = useMemo(() => {
    const seen = new Set();
    return books.filter(book => {
      if (seen.has(book.id)) {
        return false;
      }
      seen.add(book.id);
      return true;
    });
  }, [books]);



  useEffect(() => {
    setCurrentIndex(0)
    if (books.length === 0) {
      setMessage('No books found')
    }
  }, [books])



  // useEffect(() => {
  //   console.log('message', message)
  // }, [message])
  // useEffect(() => {
  //   if (title === 'Liked Books') {
  //     console.log('liked carousel', books)
  //   }
  // }, [title, books])



  const handleNext = () => {
    setCurrentIndex((prevIndex) => Math.min(prevIndex + booksPerPage, books.length - booksPerPage))
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



  // Debugging
  // useEffect(() => {
  //   console.log(title, books[0])
  // }, [title, books])



  const isEmpty = uniquebooks.length === 0


  return (
    <CarouselContainer
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      <h2>{title}</h2>
      <CarouselWrapper>
        {isEmpty ? (
          <ErrorMessage>{message}</ErrorMessage>
        ) : (
          <>
            <ChevronContainer $position={'left'}>

              <Chevron isVisible={leftChevronVisible} boolean={true} onClick={handlePrev} />

            </ChevronContainer>

            <BooksViewport>
              <BooksWrapper $offset={currentIndex / booksPerPage}>
                {uniquebooks.map((book) => (
                  <BookPreview key={book.id}>
                    <Thumbnail book={book} />
                  </BookPreview>
                ))}
              </BooksWrapper>
            </BooksViewport>

            <ChevronContainer $position={'right'}>
              <Chevron isVisible={rightChevronVisible} indexboolean={false} onClick={handleNext} />
            </ChevronContainer>
          </>
        )}
        </CarouselWrapper>
    </CarouselContainer>
  )
}

const CarouselContainer = styled.div`
  z-index: 1000;
  margin-bottom: var(--lg);
`

const CarouselWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
	margin: var(--lg) 0;
`

const ChevronContainer = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: ${(props) => (props.$position === 'left' ? 'flex-start' : 'flex-end')};
  margin: ${(props) => (props.$position === 'left' ? '0 var(--lg) 0 0' : '0 0 0 var(--lg)')};
  width: fit-content;
  height: 100%;
	@media only screen and (max-width: 479px) {
		margin: ${(props) => (props.$position === 'left' ? '0 var(--xs) 0 0' : '0 0 0 var(--xs)')};
	}
`

const BooksViewport = styled.div`
  overflow: hidden;
  flex: 1;
`

const BooksWrapper = styled.div`
  display: flex;
  transition: transform 0.5s ease;
  transform: ${(props) =>
    props.$isEmpty ? 'translateX(0)' : `translateX(${props.$offset * -100}%)`};
  width: ${(props) => (props.$isEmpty ? '100%' : 'auto')};
  justify-content: ${(props) => (props.$isEmpty ? 'center' : 'initial')};
`;


const BookPreview = styled.div`
  flex: 0 0 calc(100% / 5);
	position: relative;
	@media only screen and (max-width: 999px) {
		flex: 0 0 calc(100% / 4);
	}
	@media only screen and (max-width: 849px) {
		flex: 0 0 calc(100% / 3);
	}
	@media only screen and (max-width: 679px) {
		flex: 0 0 calc(100% / 2);
	}
`

const ErrorMessage = styled.div`
  width: 100%;
  margin: 1rem auto;
  padding: var(--sm);
  background-color: var(--creamA);
  color: var(--mdBrown);
  border: 1px solid var(--creamB);
  border-radius: 0.25rem;
  text-align: center;
`