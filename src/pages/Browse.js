import React, { useRef, useState, useEffect } from 'react'
import { useBooks } from '../context/BooksContext'
import Button from '../components/buttons/Button'
import { PageHeader } from '../assets/styles/GlobalStyles'
import BooksGallery from '../components/books/BooksGallery'
import Carousel from '../components/carousel/Carousel'
import {
	Controls,
	SearchBar,
	SearchInput,
	SearchResults,
	ErrorMessage,
	Display
} from '../assets/styles/BrowseStyles'

export default function Browse() {
	const { searchBooks } = useBooks()
	const [isScrolled, setIsScrolled] = useState(false)
  const [query, setQuery] = useState('')
	const [searchResults, setSearchResults] = useState([])
	const [error, setError] = useState(null)
	const ref = useRef(null)

	const resultsRef = useRef(null)

	useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY > 50) {
				setIsScrolled(true)
			} else {
				setIsScrolled(false)
			}
		}
		window.addEventListener('scroll', handleScroll)
		return () => window.removeEventListener('scroll', handleScroll)
	}, [])


	useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        setError(null) // Clear any previous errors
        const results = await searchBooks(query)
        setSearchResults(results)
        if (results.length === 0) {
          setError('No results found. Please try a different search term.')
        }
      } catch (err) {
        console.error('Error fetching search results:', err)
        setError('An error occurred while searching. Please try again later.')
        setSearchResults([])
      }
    }

    if (query.trim()) {
      fetchSearchResults()
    } else {
      setSearchResults([])
      setError(null)
    }
  }, [query, searchBooks])
	

	const renderSearchContent = () => {
    if (error) {
      return (
				<SearchResults ref={resultsRef}>
					<ErrorMessage>{error}</ErrorMessage>
				</SearchResults>
			)
    }
    if (searchResults.length > 0) {
      return (
        <SearchResults ref={resultsRef}>
          <Carousel title="Search Results" items={searchResults} />
        </SearchResults>
      )
    }
    return null
  }

	return (
		<>
			<Controls ref={ref} $isScrolled={isScrolled}>
				<PageHeader style={{ maxWidth: '100rem' }}>
					<h1>Browse</h1>
					<Button type="word" to="/dashboard" text="Return" />
				</PageHeader>
				<SearchBar>
          <label htmlFor="search-input" className="visually-hidden">
            Search
          </label>
          <SearchInput
            type="search"
            id="search-input"
            placeholder="Search..."
            onChange={event => setQuery(event.target.value)}
            value={query}
          />
        </SearchBar>
				{renderSearchContent()}
			</Controls>
			<section style={{ marginTop: '23rem' }}>
				<Display >
					<BooksGallery />
				</Display>
			</section>
		</>
	)
}