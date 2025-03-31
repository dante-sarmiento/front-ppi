import '@/styles/globals.css'; // Si está dentro de src/styles/
import React, { useContext, useEffect, useState } from 'react'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { ContextProvider } from '@/context/ContextProvider';
import { useRouter } from 'next/router';
import Loader from '@/components/Loader';
import { getUser } from '@/connections/user';

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
            setTimeout(() => {
                setLoading(false)
            }, 1000);
        } else {
            setLoading(false)
        }
    }, [ISSERVER, route])

    // useEffect(() => {
    //     const userId = localStorage.getItem("user")
    //     console.log("userId ls", userId);
    //     if(userId && !user) {
    //         getUserData(userId)
    //         return <Loader />
    //     }
    // }, [])

    // const getUserData = async (userId) => {
    //     const responseUserId = await getUser(userId)
    //     setUser(responseUserId)
    //     console.log("userId", responseUserId)
    // }
    


    if (loading) {
        return <Loader />
    }
    
    

    return (
        <ContextProvider>
            <QueryClientProvider client={queryClient}>
                <Component {...pageProps} />
            </QueryClientProvider>
        </ContextProvider>
    )
}

export default MyApp