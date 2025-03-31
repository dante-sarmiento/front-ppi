import React from 'react'

const InvestmentsTable = ({ data }) => {
    return (
        <div className='w-full flex flex-col justify-start items-center rounded-md overflow-hidden'>
            <div className='w-full flex jutstify-start items-center bg-[#692D4F] h-[60px] px-2'>
                <p className='w-[6%] styleseHaderInv'>
                    Ticker
                </p>
                <p className='w-[16%] styleseHaderInv'>
                    Descripción
                </p>
                <p className='w-[7%] styleseHaderInv text-center'>
                    Nominales
                </p>
                <p className='w-[9%] styleseHaderInv text-center'>
                    Precio
                </p>
                <p className='w-[9%] styleseHaderInv text-center'>
                    Variación (%)
                </p>
                <p className='w-[9%] styleseHaderInv text-center'>
                    Rendimiento
                </p>
                <p className='w-[9%] styleseHaderInv text-center'>
                    Valor actual
                </p>
                <p className='w-[9%] styleseHaderInv text-center'>
                    Valor inicial
                </p>
                <p className='w-[9%] styleseHaderInv text-center'>
                    Precio pormedio de compra
                </p>
                <p className='w-[9%] styleseHaderInv text-center'>
                    %
                </p>
                <p className='w-[8%] styleseHaderInv text-center'>
                    Días promedio de tenecia
                </p>
            </div>
            <div className='w-full flex flex-col jutstify-start items-center px-2'>
                {data.map((d, index) => {
                    return (
                        <div key={index} className='w-full flex jutstify-start items-center h-[50px] overflow-hidden'>
                            <p className='w-[6%] styleseData'>
                                {d.ticker}
                            </p>
                            <p className='w-[16%] styleseData'>
                                {d.description}
                            </p>
                            <p className='w-[7%] styleseData text-center'>
                                {d.nominales}
                            </p>
                            <p className='w-[9%] styleseData text-center'>
                                {d.price}
                            </p>
                            <p className='w-[9%] styleseData text-center'>
                                {d.variacion}
                            </p>
                            <p className='w-[9%] styleseData text-center'>
                                {d.rendimiento}
                            </p>
                            <p className='w-[9%] styleseData text-center'>
                                {d.currentValue}
                            </p>
                            <p className='w-[9%] styleseData text-center'>
                                {d.initialValue}
                            </p>
                            <p className='w-[9%] styleseData text-center'>
                                {d.averegaePriceBuy}
                            </p>
                            <p className='w-[9%] styleseData text-center'>
                                {d.percentage}
                            </p>
                            <p className='w-[8%] styleseData text-center'>
                                {d.avergaeDays}
                            </p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default InvestmentsTable