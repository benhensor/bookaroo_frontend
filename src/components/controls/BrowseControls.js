import React, { useRef, useState, useEffect } from 'react'
import { useBooks } from '../../context/BooksContext'
import {
	Controls,
	SearchBar,
	SearchInput,
} from '../../assets/styles/BrowseStyles'

export default function BrowseControls() {
	const { searchBooks, setSearchResults, setSearchError } = useBooks()
	const [isScrolled, setIsScrolled] = useState(false)
  const [query, setQuery] = useState('')
	const ref = useRef(null)


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
    const fetchSearchResults = () => {
      setSearchError(null); // Clear previous errors
      const results = searchBooks(query); // Fetch results using context function
      setSearchResults(results); // Set the filtered results in the context

      if (results.length === 0) {
        setSearchError('No results found. Please try a different search term.');
      }
    };

    if (query.trim()) {
      fetchSearchResults(); // Trigger search when query is not empty
    } else {
      setSearchResults([]); // Clear search results if query is empty
      setSearchError(null); // Clear any error messages when query is cleared
    }
  }, [query, searchBooks, setSearchResults, setSearchError]);


	return (
    <Controls ref={ref} $isScrolled={isScrolled}>
      <SearchBar>
        <label htmlFor="search-input" className="visually-hidden">
          Search
        </label>
        <SearchInput
          type="search"
          id="search-input"
          placeholder="Search for a title, author or genre..."
          onChange={event => setQuery(event.target.value)}
          value={query}
        />
      </SearchBar>
    </Controls>
	)
}