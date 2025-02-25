import React, {createContext, useState} from 'react'


export const Context = createContext()

export const ContextProvider = ({children, userSession, token}) => {
  const [tokenSession, setTokenSession] = useState()
  const [user, setUser] = useState(userSession || null)

  return (
    <Context.Provider
      value={{
        tokenSession,
        setTokenSession,
        user,
        setUser,
        token
      }}
    >
      {children}
    </Context.Provider>
  )
}
