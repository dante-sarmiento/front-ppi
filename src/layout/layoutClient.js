import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'
import SidebarClient from '@/components/Sidebar/SidebarClient'
import React from 'react'

const LayoutClient = ({ children }) => {

    return (
        <div className="flex h-screen overflow-hidden">
            <SidebarClient />
            <div className="flex-1 flex flex-col">
                <Header />
                <main className="px-4 py-2 h-full overflow-auto">
                    {children}
                </main>
            </div>
        </div>
    )
}

export default LayoutClient