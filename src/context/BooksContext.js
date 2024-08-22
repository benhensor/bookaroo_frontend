import React, { createContext, useState, useEffect, useCallback, useMemo } from 'react';
import { useAuth } from './AuthContext';
import axios from 'axios';
import { useQuery } from 'react-query';

const BooksContext = createContext();

export const BooksProvider = ({ children }) => {
  const { user, isAuthenticated } = useAuth();
  const [allBooks, setAllBooks] = useState([]);
  const [book, setBook] = useState(null);
  const [bookOwner, setBookOwner] = useState(null);

  // Debugging
  // useEffect(() => {
  //   if (user) {
  //     console.log('Books context mounted:', user, isAuthenticated);
  //   }
  // }, [user, isAuthenticated]);



  // Fetch all books from the API 
  const getAllBooks = useCallback(async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/books/allbooks`,
        {
          withCredentials: true,
        }
      );
      // console.log('all books:', data);
      if (Array.isArray(data)) {
        setAllBooks(data);
      } else {
        console.error('Unexpected books format:', data);
        setAllBooks([]); // Reset to an empty array if the data is unexpected
      }
    } catch (error) {
      console.error('Error fetching books:', error);
      setAllBooks([]); // Reset to an empty array in case of error
    }
  }, []);
  



  // Fetch books on mount when the user is authenticated
  useEffect(() => {
    if (isAuthenticated) {
      getAllBooks();
    }
  }, [isAuthenticated, getAllBooks]);



  // Derived state for userBooks and recommendations using useMemo
  const usersBooks = useMemo(
    () => allBooks.filter((book) => book.userId === user?.id),
    [allBooks, user?.id]
  );

  const recommendations = useMemo(
    () =>
      user?.preferences && user.preferences.length > 0
        ? allBooks.filter(
            (book) =>
              book.userId !== user?.id &&
              book.category.some((category) =>
                user.preferences.includes(category)
              )
          )
        : [],
    [allBooks, user?.id, user?.preferences]
  );

  const getBookById = useCallback(
    (id) => allBooks.find((book) => book.id === id),
    [allBooks]
  );

  // Function to search for books locally
  const searchBooks = useCallback(
    (query) => {
      if (!query.trim()) return [];

      const lowercaseQuery = query.toLowerCase();
      return allBooks.filter(
        (book) =>
          book.title.toLowerCase().includes(lowercaseQuery) ||
          book.author.toLowerCase().includes(lowercaseQuery) ||
          book.category.some((cat) =>
            cat.toLowerCase().includes(lowercaseQuery)
          )
      );
    },
    [allBooks]
  );


  // create a listing
  const createListing = async (listingData) => {
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/api/books/newlisting`,
        listingData,
        {
          withCredentials: true,
        }
      );
      return { success: true, message: 'Book listed successfully!' };
    } catch (error) {
      console.error('Error submitting book listing:', error);
      return {
        success: false,
        message:
          error.response?.data?.message || 'An error occurred while submitting your listing. Please try again.',
      };
    }
  };
  
  // delete a listing
  const deleteListing = async (bookId) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_API_URL}/api/books/delete/${bookId}`,
        {
          withCredentials: true,
          params: { bookId },
        }
      );
      await getAllBooks(); // Refetch the books data after
      return { success: true, message: 'Book deleted successfully!' };
    } catch (error) {
      console.error('Error deleting book listing:', error);
      return {
        success: false,
        message:
          error.response?.data?.message || 'An error occurred while deleting the book. Please try again.',
      };
    }
  };
  



  return (
    <BooksContext.Provider
      value={{
        book,
        allBooks,
        bookOwner,
        recommendations,
        usersBooks,
        setBook,
        setBookOwner,
        getBookById,
        searchBooks,
        createListing,
        deleteListing,
        refetchBooks: getAllBooks, // Refetch books
        loading: !allBooks.length && isAuthenticated, // Simple loading state based on data presence
        error: null, // Handle this based on the getAllBooksWithUserDetails try/catch block
      }}
    >
      {children}
    </BooksContext.Provider>
  );
};

export const useBooks = () => React.useContext(BooksContext);
