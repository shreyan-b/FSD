import React, { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

export const AuthLoader = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <div>Loading authentication...</div>;

  return <>{children}</>;
};
