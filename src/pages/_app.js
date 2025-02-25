import '@/styles/globals.css'; // Si está dentro de src/styles/
import React, { useEffect, useState } from 'react'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { ContextProvider } from '@/context/ContextProvider';
import { useRouter } from 'next/router';
import Loader from '@/components/Loader';

const MyApp = ({ Component, pageProps }) => {
    const [queryClient] = React.useState(() => new QueryClient())
    const [loading, setLoading] = useState(true);
    const router = useRouter()
    const ISSERVER = typeof window === 'undefined'
    const route = router.pathname

    useEffect(() => {

        const tokenStorage = localStorage.getItem('tokenSession')
        if (!tokenStorage && route != "/register") {
            router.push('/login');
            setLoading(false)

        } else {
            setLoading(false)
        }
    }, [ISSERVER, route])


    if (loading) {
        return <Loader />
    }

    return (
        <ContextProvider >
            <QueryClientProvider client={queryClient}>
                <Component {...pageProps} />
            </QueryClientProvider>
        </ContextProvider>
    )
}

export default MyApp