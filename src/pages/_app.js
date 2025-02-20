import '@/styles/globals.css'; // Si está dentro de src/styles/
import React from 'react'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { ContextProvider } from '@/context/ContextProvider';

const MyApp = ({ Component, pageProps }) => {
    const [queryClient] = React.useState(() => new QueryClient())
    return (
        <ContextProvider >
            <QueryClientProvider client={queryClient}>
                <Component {...pageProps} />
            </QueryClientProvider>
        </ContextProvider>
    )
}

export default MyApp