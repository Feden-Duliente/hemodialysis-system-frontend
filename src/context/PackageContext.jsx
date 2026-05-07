import { createContext, useContext, useEffect, useState } from "react";
import dashboardApi from "../services/dashboardApi";

const PackageContext = createContext();

export function PackageProvider({ children }) {
  const [fluids, setFluids] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadPackages = async () => {
    try {
      setLoading(true);

      const packagesRes = await dashboardApi.getPackages();

      setFluids(packagesRes);

      console.log("Packages: ", packagesRes);
    } catch (error) {
      console.log("Error: ", error);
      setError("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPackages();
  }, []);

  return (
    <PackageContext.Provider
      value={{
        fluids,
        loading,
        error,
        reload: loadPackages,
      }}
    >
      {children}
    </PackageContext.Provider>
  );
}

export function usePackages() {
  return useContext(PackageContext);
}
