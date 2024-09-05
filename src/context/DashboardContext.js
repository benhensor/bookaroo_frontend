import React, {
  createContext,
  useState,
  useEffect,
  useCallback,
} from 'react';

const DashboardContext = createContext();

export const DashboardProvider = ({ children }) => {
  // Retrieve the initial value from localStorage or default to 'Profile'
  const [activePage, setActivePage] = useState(() => {
    return localStorage.getItem('activePage') || 'Profile';
  });

  // Update localStorage whenever the activePage changes
  useEffect(() => {
    localStorage.setItem('activePage', activePage);
  }, [activePage]);

  const handlePageChange = useCallback((page) => {
    setActivePage(page);
  }, []);

  return (
    <DashboardContext.Provider value={{ activePage, handlePageChange }}>
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => React.useContext(DashboardContext);
