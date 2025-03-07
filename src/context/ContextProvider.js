import { getUser } from '@/connections/user'
import React, { createContext, useEffect, useState } from 'react'


export const Context = createContext()

export const ContextProvider = ({ children, user, setUser }) => {
  const [tokenSession, setTokenSession] = useState()
  // const [user, setUser] = useState(null)
  // const userId =  localStorage.getItem("user");

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
