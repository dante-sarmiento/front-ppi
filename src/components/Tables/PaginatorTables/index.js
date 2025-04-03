import React from 'react'

const PaginatorTables = ({data}) => {
    return (
        <div className='w-full flex h-[50px] bg-gray-700 justify-between items-center px-2'>
            <p className="stylesHeader text-[14px] w-full">
                Mostrando {data?.length} de {data.length} - Página 1 de {' '}
                1
            </p>
        </div>
    )
}

export default PaginatorTables