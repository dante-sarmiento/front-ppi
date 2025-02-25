import React from 'react'

const LayoutSession = ({children}) => {
    return (
        <div className="flex h-screen overflow-hidden bg-gray-500">
            <div className="flex-1 flex flex-col justify-center items-center">
                {children}
            </div>
        </div>
    )
}

export default LayoutSession