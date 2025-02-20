import React, {createContext, useState} from 'react'


export const Context = createContext()

export const ContextProvider = ({children}) => {
  const [tokenSession, setTokenSession] = useState()

  return (
    <Context.Provider
      value={{
        tokenSession,
        setTokenSession
      }}
    >
      {children}
    </Context.Provider>
  )
}
