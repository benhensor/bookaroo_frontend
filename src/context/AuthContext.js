import React, { createContext, useState, useMemo, useCallback } from 'react';
import { useQueryClient } from 'react-query';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
  const queryClient = useQueryClient();

  const login = useCallback(
    async (credentials) => {
			setIsLoading(true);
      try {

        const { data } = await axios.post(
          `${process.env.REACT_APP_API_URL}/api/auth/login`,
          credentials,
          {
            withCredentials: true,  // Include cookies with the request
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
        setUser(data.user);  // Set the user data directly from the login response
        setIsAuthenticated(true);
        queryClient.invalidateQueries('currentUser');  // Invalidate any stale queries related to the user
      } catch (error) {
        console.error('Login error:', error.response ? error.response.data : error.message);
        setUser(null);
        setIsAuthenticated(false);
        throw error;
      } finally {
				setIsLoading(false);
			}
    },
    [queryClient]
  );

  const logout = useCallback(async () => {
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/logout`, {}, { withCredentials: true });
      setUser(null);
      setIsAuthenticated(false);
      queryClient.clear();  // Clear the cache after logging out
    } catch (error) {
      console.error('Logout error:', error);
    }
  }, [queryClient]);

  const contextValue = useMemo(
    () => ({
      user,
      isAuthenticated,
			isLoading,
      login,
      logout,
    }),
    [user, isAuthenticated, isLoading, login, logout]
  );

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => React.useContext(AuthContext);
