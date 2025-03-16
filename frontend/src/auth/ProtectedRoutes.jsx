import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import supabase from "/supabaseClient.js";

const ProtectedRoute = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsAuthenticated(session ? true : false);
    };
    checkAuth();
  }, []);

  if (isAuthenticated === null) return <p>Loading...</p>; // Show loading while checking

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
