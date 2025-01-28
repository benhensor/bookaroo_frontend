import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useBooks } from '../../context/BooksContext';
import axios from 'axios';
import ActionButton from '../buttons/ActionButton';
import { categories } from '../../utils/categories';
import { Spacer } from '../../assets/styles/GlobalStyles';
import {
  ListingsContainer,
  ListingsHeader,
  Block,
  Form,
  ErrorMessage,
  SuccessMessage,
  ListOfListings,
} from '../../assets/styles/ListingStyles';

const INITIAL_BOOK_DATA = {
  isbn: '',
  cover_img: '',
  title: '',
  author: '',
  published_date: '',
  publisher: '',
  category: '',
  book_condition: '',
  notes: '',
  user_id: ''
}

const PLACEHOLDER_IMAGE_URL = `data:image/svg+xml;base64,${btoa(`
  <svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 120 120">
    <rect width="120" height="120" fill="#EFF1F3"/>
    <path d="M33.2503 38.4816C33.2603 37.0472 34.4199 35.8864 35.8543 35.875H83.1463C84.5848 35.875 85.7503 37.0431 85.7503 38.4816V80.5184C85.7403 81.9528 84.5807 83.1136 83.1463 83.125H35.8543C34.4158 83.1236 33.2503 81.957 33.2503 80.5184V38.4816ZM80.5006 41.1251H38.5006V77.8751L62.8921 53.4783C63.9172 52.4536 65.5788 52.4536 66.6039 53.4783L80.5006 67.4013V41.1251ZM43.75 51.6249C43.75 54.5244 46.1005 56.8749 49 56.8749C51.8995 56.8749 54.25 54.5244 54.25 51.6249C54.25 48.7254 51.8995 46.3749 49 46.3749C46.1005 46.3749 43.75 48.7254 43.75 51.6249Z" fill="#687787" fill-rule="evenodd" clip-rule="evenodd"/>
  </svg>
`)}`;

export default function Listings() {
  const { user } = useAuth();
  const { usersBooks, loading: booksLoading, createListing, deleteListing } = useBooks();
  
  // Search state
  const [searchTerm, setSearchTerm] = useState('');
  const [bookResults, setBookResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  
  // Book selection state
  const [isbn, setIsbn] = useState('');
  const [bookData, setBookData] = useState({ ...INITIAL_BOOK_DATA, user_id: user?.id || '' });
  
  // UI state
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Reset all state
  const handleReset = useCallback(() => {
    setSearchTerm('');
    setBookResults([]);
    setIsbn('');
    setMessage('');
    setError('');
    setBookData({ ...INITIAL_BOOK_DATA, user_id: user?.id || '' });
  }, [user]);

  // Reset only book selection
  const resetBookSelection = () => {
    setBookData(prevData => ({ 
      ...INITIAL_BOOK_DATA, 
      user_id: prevData.user_id 
    }));
    setIsbn('');
    setMessage('');
    setError('');
  };

  // Initialize state on mount
  useEffect(() => {
    handleReset();
  }, [user, handleReset]);

  // Validate form before submission
  const validateForm = () => {
    const errors = [];
    if (!bookData.title) errors.push('Title is required');
    if (!bookData.book_condition) errors.push('Condition is required');
    if (!bookData.category) errors.push('Category is required');
    return errors;
  };

  // Handle image URLs and fallbacks
  const getBookImage = (volumeInfo) => {
    if (!volumeInfo?.imageLinks) return PLACEHOLDER_IMAGE_URL;

    const url = volumeInfo.imageLinks.extraLarge ||
                volumeInfo.imageLinks.large ||
                volumeInfo.imageLinks.medium ||
                volumeInfo.imageLinks.small ||
                volumeInfo.imageLinks.thumbnail;

    return url ? url.replace('http:', 'https:') : PLACEHOLDER_IMAGE_URL;
  };

  // Search for books with error handling and retries
  const handleSearch = async (e) => {
    e.preventDefault();
    resetBookSelection();
    setSearchLoading(true);
    setError('');

    const searchWithRetry = async (retries = 3) => {
      try {
        const safeSearchTerm = encodeURIComponent(searchTerm.trim());
        const response = await axios.get(
          `https://www.googleapis.com/books/v1/volumes?q=${safeSearchTerm}&country=UK`,
          { timeout: 5000 }
        );

        setBookResults(response.data.items || []);
        if (!response.data.items?.length) {
          setError('No books found. Please try a different search term.');
        }
      } catch (error) {
        if (retries > 0 && error.code === 'ECONNABORTED') {
          return searchWithRetry(retries - 1);
        }
        throw error;
      }
    };

    try {
      await searchWithRetry();
    } catch (error) {
      console.error('Error fetching books:', error);
      setError('An error occurred while searching for books. Please try again later.');
    } finally {
      setSearchLoading(false);
    }
  };

  // Select and fetch detailed book info
  const handleSelectBook = async (e) => {
    const bookId = e.target.value;
    if (!bookId) {
      resetBookSelection();
      return;
    }

    const book = bookResults.find(b => b.id === bookId);
    if (!book) return;

    setSearchLoading(true);
    try {
      const response = await axios.get(book.selfLink, { timeout: 5000 });
      const detailedBook = response.data;
      
      const isbnValue = detailedBook.volumeInfo.industryIdentifiers?.find(
        id => id.type === 'ISBN_13'
      )?.identifier || '';

      setIsbn(isbnValue);
      setBookData({
        isbn: isbnValue,
        cover_img: getBookImage(detailedBook.volumeInfo),
        title: detailedBook.volumeInfo.title || '',
        author: detailedBook.volumeInfo.authors?.join(', ') || 'Unknown Author',
        published_date: detailedBook.volumeInfo.publishedDate || '',
        publisher: detailedBook.volumeInfo.publisher || '',
        category: bookData.category || '',
        book_condition: '',
        notes: '',
        user_id: user?.id || '',
      });
    } catch (error) {
      console.error('Error fetching detailed book info:', error);
      setError('An error occurred while retrieving book details.');
      resetBookSelection();
    } finally {
      setSearchLoading(false);
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookData(prevData => ({
      ...prevData,
      [name]: name === 'category' ? [value] : value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    
    if (errors.length) {
      setError(errors.join(', '));
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await createListing(bookData);
      if (response.success) {
        setMessage('Book listed successfully!');
        handleReset();
      } else {
        setError(response.message || 'An error occurred. Please try again.');
      }
    } catch (error) {
      console.error('Submit error:', error);
      setError('Failed to create the listing, please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Render book listings
  const renderListings = (books, title, loading) => (
    <ListOfListings>
      <h2>{title}</h2>
      {loading ? (
        <p>Loading...</p>
      ) : books.length > 0 ? (
        <ul>
          {books.map((book) => (
            <li key={book.id}>
              <img 
                src={book.cover_img} 
                alt={book.title}
                onError={(e) => {
                  e.target.src = PLACEHOLDER_IMAGE_URL;
                  e.target.onerror = null; // Prevent infinite loop
                }}
              />
              <div className='outer'>
                <div className='inner'>
                  <p>{book.title}</p>
                  <span>{book.author}</span>
                </div>
                <button
                  onClick={() => deleteListing(book.id)}
                  aria-label={`Delete listing of ${book.title}`}
                  disabled={isSubmitting}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No books found.</p>
      )}
    </ListOfListings>
  );

  return (
    <ListingsContainer>
      <Spacer />
      <ListingsHeader>
        <h1>List a Book</h1>
      </ListingsHeader>

      {/* Search Form */}
      <Block>
        <Form onSubmit={handleSearch}>
          <label>
            Search for a Book:
            <input
              type="text"
              value={searchTerm}
              placeholder="Search by title, author, or ISBN"
              onChange={(e) => setSearchTerm(e.target.value)}
              aria-label="Search for a book by title, author, or ISBN"
              disabled={searchLoading}
            />
            <ActionButton 
              text={searchLoading ? "Searching..." : "Search"}
              disabled={searchLoading || !searchTerm.trim()}
            />
          </label>
          {error && <ErrorMessage role='alert'>{error}</ErrorMessage>}
          {message && <SuccessMessage role='alert'>{message}</SuccessMessage>}
        </Form>
      </Block>

      {/* Book Selection and Details Form */}
      {bookResults.length > 0 && (
        <Block>
          <Form onSubmit={handleSubmit}>
            <label>
              Select a Book:
              <select
                onChange={handleSelectBook}
                value={bookData.title ? 
                  bookResults.find(book => book.volumeInfo.title === bookData.title)?.id || '' 
                  : ''
                }
                aria-label='Select a book'
                disabled={searchLoading}
              >
                <option value="">Select a Book</option>
                {bookResults.map((book) => (
                  <option key={book.id} value={book.id}>
                    {book.volumeInfo.title} - {' '}
                    {book.volumeInfo.authors?.join(', ') || 'Unknown Author'}
                  </option>
                ))}
              </select>
            </label>

            {bookData.title && (
              <>
                <h2>Selected Book</h2>
                {isbn && (
                  <img
                    src={bookData.cover_img}
                    alt={bookData.title}
                    onError={(e) => {
                      e.target.src = PLACEHOLDER_IMAGE_URL;
                      e.target.onerror = null;
                    }}
                  />
                )}
                <p>{bookData.title}</p>
                <p>
                  <span>{bookData.author}</span>
                </p>

                <label>
                  Category:
                  <select
                    name="category"
                    value={bookData.category[0] || ''}
                    onChange={handleInputChange}
                    aria-label='Select category'
                    required
                  >
                    <option value="">Select Category</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </label>

                <label>
                  Condition:
                  <select
                    name="book_condition"
                    value={bookData.book_condition}
                    onChange={handleInputChange}
                    required
                    aria-label='Select condition'
                  >
                    <option value="">Select Condition</option>
                    <option value="As New">As New</option>
                    <option value="Good">Good</option>
                    <option value="Fair">Fair</option>
                    <option value="Poor">Poor</option>
                  </select>
                </label>

                <label>
                  Notes:
                  <textarea
                    name="notes"
                    value={bookData.notes}
                    onChange={handleInputChange}
                    placeholder="Any additional information about the book?"
                    aria-label='Enter any additional notes'
                  />
                </label>

                <ActionButton 
                  text={isSubmitting ? "Submitting..." : "Submit"} 
                  disabled={isSubmitting}
                />
              </>
            )}
          </Form>
        </Block>
      )}

      {/* User's Listings */}
      {renderListings(usersBooks, 'Your Listings', booksLoading)}
    </ListingsContainer>
  );
}