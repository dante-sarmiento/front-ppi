import React, { createContext, useEffect, useState } from 'react'
import { getUser } from '@/connections/user'
import Loader from '@/components/Loader'


export const Context = createContext()

export const ContextProvider = ({ children }) => {
  const [tokenSession, setTokenSession] = useState()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const storedToken = localStorage.getItem("tokenSession");
      const userId = localStorage.getItem("user");

      if (!storedToken || !userId) {
        setLoading(false);
        return;
      }

      setTokenSession(storedToken);

      try {
        const userData = await getUser(userId, storedToken);
        setUser(userData?.data?.user);
      } catch (error) {
        console.error("Error obteniendo usuario:", error);
        setTokenSession(null);
        setUser(null);
      } finally {
        setLoading(false); // Cuando termina la carga, ocultamos el Loader
      }
    };

    fetchUser();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <Context.Provider
      value={{
        tokenSession,
        setTokenSession,
        user,
        setUser
      }}
    >
      {children}
    </Context.Provider>
  )
}
