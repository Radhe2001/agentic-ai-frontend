import { createContext, useEffect, useMemo, useState } from "react";
import { getUserProfileData } from "../services/authService";
import OverlayLoader from "../components/Loader";

export const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  const [userData, setUserData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      const data = await getUserProfileData();
      setUserData(data);
    })();
  }, []);

  const contextData = useMemo(
    () => ({ userData, setUserData, isLoading, setIsLoading }),
    [userData, isLoading],
  );

  return (
    <AppContext.Provider value={contextData}>
      {isLoading && <OverlayLoader />}
      {children}
    </AppContext.Provider>
  );
};
