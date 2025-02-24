import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'
import useSession from '@/hooks/UseSession';
import React from 'react'

const Layout = ({ children }) => {
    const { data, error } = useSession()

    return (
        <div className="flex h-screen overflow-hidden">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <Header />
                <main className="p-6 h-full overflow-auto">
                    {children}
                </main>
            </div>
        </div>
    )
}

export default Layout