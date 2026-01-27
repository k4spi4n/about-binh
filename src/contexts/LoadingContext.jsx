import { createContext, useContext, useState, useCallback } from "react";
import { LoadingScreen } from "../components/LoadingScreen";
import PropTypes from "prop-types";

const LoadingContext = createContext(null);

export const LoadingProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [callback, setCallback] = useState(null);

  const triggerLoading = useCallback((cb) => {
    setCallback(() => cb);
    setIsLoading(true);
  }, []);

  const handleComplete = useCallback(() => {
    setIsLoading(false);
    if (callback) {
      callback();
      setCallback(null);
    }
  }, [callback]);

  return (
    <LoadingContext.Provider value={{ triggerLoading, isLoading }}>
      {isLoading && <LoadingScreen onComplete={handleComplete} duration={1500} />}
      {children}
    </LoadingContext.Provider>
  );
};

LoadingProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// eslint-disable-next-line react-refresh/only-export-components
export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }
  return context;
};
