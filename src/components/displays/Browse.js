import React, { useRef, useState, useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'
import { useBooks } from '../../context/BooksContext'
import Carousel from '../carousel/Carousel'
import { Spacer } from '../../assets/styles/GlobalStyles'
import {
	BrowseContainer,
	BrowseHeader,
	BrowseControls,
	SearchBar,
	SearchInput,
	SearchResults,
	ErrorMessage,
	GalleryContainer,
	CarouselWrapper,
} from '../../assets/styles/BrowseStyles'

export default function Browse() {
	const { user } = useAuth()
	const {
		allBooks,
		searchBooks,
		searchResults,
		setSearchResults,
		searchError,
		setSearchError,
	} = useBooks()
	const [isScrolled, setIsScrolled] = useState(false)
	const [query, setQuery] = useState('')
	const ref = useRef(null)
	const resultsRef = useRef(null)

	const booksFiltered = allBooks.filter((book) => book.user_id !== user.id)

	// Check if the user is scrolling (for styling purposes)
	useEffect(() => {
    const handleScroll = () => {
        if (ref.current.scrollTop > 15) {
            setIsScrolled(true);
        } else {
            setIsScrolled(false);
        }
    };

    const scrollableElement = ref.current; // Use BrowseContainer ref
    scrollableElement.addEventListener('scroll', handleScroll);

    return () => {
        scrollableElement.removeEventListener('scroll', handleScroll);
    };
	}, []);


	// Search for books based on the query
	useEffect(() => {
		const fetchSearchResults = () => {
			setSearchError(null)
			const results = searchBooks(query)
			setSearchResults(results)

			if (results.length === 0) {
				setSearchError(
					'No results found. Please try a different search term.'
				)
			}
		}

		if (query.trim()) {
			fetchSearchResults()
		} else {
			setSearchResults([])
			setSearchError(null)
		}
	}, [query, searchBooks, setSearchResults, setSearchError])

	// Get unique categories from the books array
	const getUniqueCategories = (booksFiltered) => {
		const categories = new Set()
		booksFiltered.forEach((book) => {
				// Ensure book.category is treated as an array
				const bookCategories = Array.isArray(book.category) 
						? book.category 
						: JSON.parse(book.category)
				
				// Add each individual category to the Set
				bookCategories.forEach(cat => categories.add(cat))
		})
		return Array.from(categories)
	}

	// Filter books by category
	const getBooksByCategory = (category) => {
		return booksFiltered.filter((book) => {
			const bookCategories = Array.isArray(book.category)
				? book.category
				: JSON.parse(book.category)

			return bookCategories.includes(category)
		})
	}

	const uniqueCategories = getUniqueCategories(booksFiltered)

	// Renders either search results or categories
	const renderContent = () => {
		if (searchError) {
			return (
				<GalleryContainer>
					<SearchResults ref={resultsRef}>
						<ErrorMessage>{searchError}</ErrorMessage>
					</SearchResults>
				</GalleryContainer>
			)
		}

		// Check for search results
		if (searchResults && searchResults.length > 0) {
			return (
				<GalleryContainer>
					<SearchResults ref={resultsRef}>
						<Carousel
							title="Search Results"
							books={searchResults}
						/>
					</SearchResults>
				</GalleryContainer>
			)
		}

		// If searchResults exists but is empty (query was cleared), show all books
		if (searchResults && searchResults.length === 0) {
			return (
				<GalleryContainer>
					{uniqueCategories.map((category) => (
						<CarouselWrapper key={category}>
							<Carousel
								title={category}
								books={getBooksByCategory(category)}
							/>
						</CarouselWrapper>
					))}
				</GalleryContainer>
			)
		}

		// If no search was ever performed, show all books
		return (
			<GalleryContainer>
				{uniqueCategories.map((category) => (
					<CarouselWrapper key={category}>
						<Carousel
							title={category}
							books={getBooksByCategory(category)}
						/>
					</CarouselWrapper>
				))}
			</GalleryContainer>
		)
	}

	return (
		<BrowseContainer ref={ref} >
			<BrowseHeader $isScrolled={isScrolled}>
				<BrowseControls>
					<h1>Browse</h1>
					<SearchBar>
						<label
							htmlFor="search-input"
							className="visually-hidden"
						>
							Search
						</label>
						<SearchInput
							type="search"
							id="search-input"
							placeholder="Search for a title, author or genre..."
							onChange={(event) => setQuery(event.target.value)}
							value={query}
						/>
					</SearchBar>
				</BrowseControls>
			</BrowseHeader>
			<Spacer />
			{renderContent()}
		</BrowseContainer>
	)
}
