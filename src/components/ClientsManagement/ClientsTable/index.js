import HeaderTables from '@/components/Tables/HeaderTables'
import PaginatorTables from '@/components/Tables/PaginatorTables'
import { getUsers } from '@/connections/user'
import { formatTimestamp } from '@/helpers/formatDate'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

const ClientsTable = ({ setLoader }) => {
    const router = useRouter()
    const [data, setData] = useState([])

    const getDataUsers = async () => {
        setLoader(true)
        try {
            const roleSend = "CLIENTE"
            const dataUsers = await getUsers(roleSend)
            setData(dataUsers)
        } catch (error) {
            console.log("getUsers error", error)
        }
        setLoader(false)
    }

    useEffect(() => {
        getDataUsers()
    }, [])

    console.log("data", data);
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
            {data && data.length > 0 ?
                <div className='w-full flex flex-col jutstify-start items-center'>
                    {data && data.map((c, index) => {
                        return (
                            <div key={index} className={`${index % 2 == 0 && "bg-gray-200"} px-2 w-full flex justify-start items-center h-[45px] cursor-pointer`} onClick={() => router.push(`/gestionDeClientes/${c._id}`)}>
                                <div className='w-[10%]'>
                                    <p className='text-start stylesData'>
                                        {c._id.slice(-5)}
                                    </p>
                                </div>
                                <div className='w-[23%]'>
                                    <p>
                                        {c.firstName} {c.lastName}
                                    </p>
                                </div>
                                <div className='w-[22%]'>
                                    <p className='stylesData'>
                                        {c.email}
                                    </p>
                                </div>
                                <div className='w-[15%] text-center'>
                                    <p className='stylesData'>
                                        {c.accoutType || "-"}
                                    </p>
                                </div>
                                <div className='w-[15%] text-center'>
                                    <p className='stylesData'>
                                        {formatTimestamp(c.createdAt)}
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
                </div> :
                <div className='w-full flex justify-center items-center'>
                    No hay resultados
                </div>
            }
            <PaginatorTables  data={data}/>
        </div>
    )
}

export default ClientsTable