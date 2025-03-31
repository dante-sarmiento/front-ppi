import HeaderTables from '@/components/Tables/HeaderTables'
import PaginatorTables from '@/components/Tables/PaginatorTables'
import { useRouter } from 'next/router'
import React from 'react'

const clientsData = [
    {id: "3493", fullName: "Javier Milei", email: "javier@lla.com", accoutType: "PPI", initDate: "28/01/2024" },
    {id: "8576", fullName: "Marcos Juarez", email: "MArcos@juarez.com", accoutType: "Balanz", initDate: "11/04/2024" },
    {id: "5678", fullName: "Arcor S.A.", email: "arcor@chocolates.com", accountNumber: "554353", accoutType: "PPI", initDate: "20/10/2024" },
    {id: "1846", fullName: "JP Morgan", email: "jpmorgan@inversiones.com",accoutType: "Balanz", initDate: "03/11/2024" },
    {id: "9589", fullName: "Lionel Messi", email: "lionel@messi.com", accoutType: "PPI", initDate: "25/01/2025" },
    {id: "5346", fullName: "Marcos Galperin", email: "galperin@meli.com", accoutType: "PPI", initDate: "17/05/2024" },
    {id: "5212", fullName: "Lionel Scaloni", email: "Lio@Scaloni.com", accoutType: "Balanz", initDate: "11/04/2024" },
    {id: "2976", fullName: "ZARA", email: "zara@ropa.com", accoutType: "PPI", initDate: "20/10/2024" },
    {id: "4502", fullName: "Palpitos 24", email: "palpitos@apuestas.com", accoutType: "Balanz", initDate: "09/11/2023" },
    {id: "1020", fullName: "Donald Trump", email: "donaldo@trump.com", accoutType: "Balanz", initDate: "16/07/2023" },
]

const ClientsTable = () => {
     const router = useRouter()

    return (
        <div className='w-full flex flex-col justify-center items-center rounded-lg overflow-hidden'>
            <HeaderTables />
            <div className='w-full flex jutsify-start items-center px-2 h-[50px] bg-[#692D4F]'>
                <p className='w-[10%] stylesHeader'>
                    Ref
                </p>
                <p className='w-[23%] stylesHeader'>
                    Cliente
                </p>
                <p className='w-[22%] text-start stylesHeader'>
                    Email
                </p>
                <p className='w-[15%] text-center stylesHeader'>
                    Tipo de cuenta
                </p>
                <p className='w-[15%] text-center stylesHeader'>
                    Fecha de creación
                </p>
                <p className='w-[15%] text-end stylesHeader'>
                    Acciones
                </p>
            </div>
            <div className='w-full flex flex-col jutstify-start items-center'>
                {clientsData.map((c, index) => {
                    return (
                        <div key={index} className={`${index % 2 == 0 && "bg-gray-200"} px-2 w-full flex justify-start items-center h-[45px] cursor-pointer`} onClick={() => router.push(`/gestionDeClientes/${c.id}`)}>
                            <div className='w-[10%]'>
                                <p className='text-start stylesData'>
                                    {c.id}
                                </p>
                            </div>
                            <div className='w-[23%]'>
                                <p>
                                    {c.fullName}
                                </p>
                            </div>
                            <div className='w-[22%]'>
                                <p className='stylesData'>
                                    {c.email}
                                </p>
                            </div>
                            <div className='w-[15%] text-center'>
                                <p className='stylesData'>
                                    {c.accoutType}
                                </p>
                            </div>
                            <div className='w-[15%] text-center'>
                                <p className='stylesData'>
                                    {c.initDate}
                                </p>
                            </div>
                            <div className='w-[15%] text-end'>
                                <button className='stylesData'>
                                    Detalles
                                </button>
                            </div>
                        </div>
                    )
                })}
            </div>
            <PaginatorTables />
        </div>
    )
}

export default ClientsTable