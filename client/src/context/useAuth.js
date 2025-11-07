import { useState, useEffect } from "react";
import { API } from "../service/api"; // Adjust path

export function useAuth() {
  const [user, setUser] = useState(null);
  const [authReady, setAuthReady] = useState(false);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      API.getUserProfile(token)
        .then(profile => {
          setUser({ ...profile, token });
        })
        .catch(() => {
          setUser(null);
          sessionStorage.removeItem("token");
        })
        .finally(() => {
          setAuthReady(true);
        });
    } else {
      setAuthReady(true);
    }
  }, []);

  return { user, setUser, authReady };
}
