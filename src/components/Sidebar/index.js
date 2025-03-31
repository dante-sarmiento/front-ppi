import { SECTIONS } from '@/constants/sections';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
import { Context } from '@/context/ContextProvider';
import { USER } from '@/constants/user';
const Sidebar = () => {
    const [selectedSection, setSelectedSection] = useState('');
    const router = useRouter();
    const context = useContext(Context)
    if (!context) console.log("Error de contexto")
    const { user } = context

    const handleSection = (data) => {
        setSelectedSection(selectedSection == data.label ? "" : data.label)
        if (data.route) {
            router.push(`${data.route}`);
        }
    };

    const route = router.pathname


    useEffect(() => {
        if (route && route != "accionesUsa" && route != "fciExterior") {
            setSelectedSection(route.slice(1))
        } else if (route == "accionesUsa") {
            setSelectedSection("acciones-usa")
        } else if (route == "fciExterior") {
            setSelectedSection("fci-exterior")
        } else if (route == "/gestionDeClientes") {
            setSelectedSection("Gestion de clientes")
        }
    }, [route])

    return (
        <div className='w-64 bg-gray-900 text-white p-4 h-full'>
            <div className='h-16 w-full flex justify-start items-center overflow-hidden rounded-lg'>
                    <Image
                        src='/img/amautaLogo.png'
                        width={160}
                        height={100}
                        alt='logo'
                        className="w-full h-full bg-contain"
                    />
            </div>
            <div className='mt-4 flex flex-col gap-4'>
                {user?.role == USER.ROLE[1] ?
                    <>
                        <div className={`${selectedSection.toLocaleLowerCase() == "gestiondeclientes" ? "bg-gray-800" : ""} w-full flex lex-col items-endf rounded-md`}>
                            <div
                                className='w-full p-2 flex justify-between items-center h-10 cursor-pointer hover:bg-gray-800 rounded-md'
                                onClick={() => router.push('/gestionDeClientes')}
                            >
                                <p>Gestión de clientes</p>
                            </div>
                        </div>
                        {SECTIONS.map((section, index) => {
                            return (
                                <div key={index} className={`${selectedSection.toLocaleLowerCase() == section.label.toLocaleLowerCase() ? "bg-gray-800" : ""} w-full flex  items-end rounded-md`}>
                                    <div
                                        className='w-full p-2 flex justify-between items-center h-10 cursor-pointer hover:bg-gray-800 rounded-md'
                                        onClick={() => handleSection(section)}
                                    >
                                        <li>{section.label}</li>
                                    </div>
                                </div>
                            );
                        })}
                    </> :
                    <div className={`${selectedSection.toLocaleLowerCase() == "dashboard" ? "bg-gray-800" : ""} w-full flex lex-col items-endf rounded-md`}>
                        <div
                            className='w-full p-2 flex justify-between items-center h-10 cursor-pointer hover:bg-gray-800 rounded-md'
                            onClick={() => router.push('/dashboard')}
                        >
                            <p>Dashboard</p>
                        </div>
                    </div>
                }
            </div>
        </div>
    );
};

export default Sidebar;
