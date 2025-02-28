import { SECTIONS } from '@/constants/sections';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
import { Context } from '@/context/ContextProvider';
import { USER } from '@/constants/user';
const SidebarClient = () => {
    const [selectedSection, setSelectedSection] = useState('');
    const router = useRouter();
    const context = useContext(Context)
    if (!context) console.log("Error de contexto")
    const { user } = context

    console.log("user", user);

    const handleSection = (data) => {
        setSelectedSection(selectedSection == data.label ? "" : data.label)
        if (data.route) {
            router.push(`${data.route}`);
        }
    };

    const route = router.pathname


    useEffect(() => {
        if (route || route != "accionesUsa" || route != "fciExterior") {
            setSelectedSection(route.slice(1))
        } else if (route == "accionesUsa") {
            setSelectedSection("acciones-usa")
        } else if (route == "fciExterior") {
            setSelectedSection("fci-exterior")
        } else if (route == "clientes") {
            setSelectedSection("clientes")
        }
    }, [route])

    return (
        <div className='w-64 bg-gray-900 text-white p-4 h-full'>
            <div className='h-16 w-full flex justify-start items-center'>
                <button className='text-3xl font-bold' onClick={() => router.push("/cliente/dashboard")}>PPI market</button>
            </div>
            <div className='mt-4 flex flex-col gap-4'>
                <div className={`${selectedSection.toLocaleLowerCase() == "cliente/home" ? "bg-gray-800" : ""} w-full flex lex-col items-endf rounded-md`}>
                    <div
                        className='w-full p-2 flex justify-between items-center h-10 cursor-pointer hover:bg-gray-800 rounded-md'
                        onClick={() => router.push('/cliente/home')}
                    >
                        <p>Inicio</p>
                    </div>
                </div>
                <div className={`${selectedSection.toLocaleLowerCase() == "perfil" ? "bg-gray-800" : ""} w-full flex lex-col items-endf rounded-md`}>
                    <div
                        className='w-full p-2 flex justify-between items-center h-10 cursor-pointer hover:bg-gray-800 rounded-md'
                        onClick={() => router.push('/cliente/perfil')}
                    >
                        <p>Perfil</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SidebarClient;