import React from 'react'

const TableMarket = ({ handleData, selectedData, data = [] }) => {
    return (
        <div className='w-full flex flex-col justify-center items-center'>
            <div className='h-12 bg-gray-400 w-full flex justify-start items-center p-2 rounded-t-lg'>
                <p className='text-black font-bold w-[25%] text-start'>
                    Nombre
                </p>
                 <p className='text-black font-bold w-[25%] text-start'>
                    Liquidación
                </p>
                 <p className='text-black font-bold w-[25%] text-center'>
                    Tipo
                </p>
                 <p className='text-black font-bold w-[25%] text-center'>
                    Mercado
                </p>
            </div>
            <div className='w-full h-full justify-center items-center'>
                {data.map((d, index) => {
                    return (
                        <div 
                          key={index} 
                          className={`${selectedData?.ticker == d.ticker && "bg-gray-200"} w-full flex justify-start items-center p-2 cursor-pointer hover:bg-gray-200 `} 
                          onClick={() => handleData(d)}>
                            <p className='text-start w-[25%]'>
                                {d.ticker}
                            </p>
                            <p className='text-start w-[25%]'>
                                {d.currency}
                            </p>
                            <p className='text-center w-[25%]'>
                                {d.type}
                            </p>
                            <p className='text-center w-[25%]'>
                                {d.market}
                            </p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default TableMarket