import React, { useState, useRef } from 'react'
import { useAuth } from '../../context/AuthContext'
import { useBooks } from '../../context/BooksContext'
import Carousel from '../carousel/Carousel'
import { 
  GalleryContainer, 
  SearchResults,
  ErrorMessage,
  CarouselWrapper 
} from '../../assets/styles/BooksGalleryStyles'

export default function BooksGallery() {
  
  const { user } = useAuth()
  const { allBooks, searchResults, searchError } = useBooks()
  const resultsRef = useRef(null)

  // console.log('BooksGallery:', allBooks)

  const booksFiltered = allBooks.filter((book) => book.userId !== user.id)

  // Get unique categories from the books array
  const getUniqueCategories = (booksFiltered) => {
    const categories = new Set()
    booksFiltered.forEach((book) => {
      if (Array.isArray(book.category)) {
        book.category.forEach((cat) => categories.add(cat))
      } else {
        categories.add(book.category)
      }
    })
    return Array.from(categories)
  }

  // Filter books by category
  const getBooksByCategory = (category) => {
    return booksFiltered.filter((book) =>
      Array.isArray(book.category)
        ? book.category.includes(category)
        : book.category === category
    )
  }

  const uniqueCategories = getUniqueCategories(booksFiltered)



    // Renders either search results or categories
  const renderContent = () => {
    if (searchError) {
      return (
        <SearchResults ref={resultsRef}>
          <ErrorMessage>{searchError}</ErrorMessage>
        </SearchResults>
      );
    }

    // Check for search results
    if (searchResults && searchResults.length > 0) {
      return (
        <SearchResults ref={resultsRef}>
          <Carousel title="Search Results" books={searchResults} />
        </SearchResults>
      );
    }

    // If searchResults exists but is empty (query was cleared), show all books
    if (searchResults && searchResults.length === 0) {
      return (
        <GalleryContainer>
          {uniqueCategories.map((category) => (
            <CarouselWrapper key={category}>
              <Carousel title={category} books={getBooksByCategory(category)} />
            </CarouselWrapper>
          ))}
        </GalleryContainer>
      );
    }

    // If no search was ever performed, show all books
    return (
      <GalleryContainer>
        {uniqueCategories.map((category) => (
          <CarouselWrapper key={category}>
            <Carousel title={category} books={getBooksByCategory(category)} />
          </CarouselWrapper>
        ))}
      </GalleryContainer>
    );
  };

  return (
    <>
      {renderContent()}
    </>
  );
}