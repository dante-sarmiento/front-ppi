import { SECTIONS } from '@/constants/sections';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

const Sidebar = () => {
    const [selectedSection, setSelectedSection] = useState('');
    const router = useRouter();

    const handleSection = (data) => {
        setSelectedSection(selectedSection == data.label ? "" : data.label)
        if (data.route) {
            router.push(`${data.route}`);
        }
    };

    const route = router.pathname


    useEffect(() => {
      if(route || route != "accionesUsa" || route != "fciExterior") {
        setSelectedSection(route.slice(1))
      } else if(route == "accionesUsa" ) {
        setSelectedSection("acciones-usa")
      } else if(route == "fciExterior") {
        setSelectedSection("fci-exterior")
      }
    }, [route])

    return (
        <div className='w-64 bg-gray-900 text-white p-4 h-full'>
            <div className='h-16 w-full flex justify-start items-center'>
                <button className='text-3xl font-bold' onClick={() => router.push("/dashboard")}>PPI market</button>
            </div>
            <div className='mt-4 flex flex-col gap-4'>
                {SECTIONS.map((section, index) => {
                    return (
                        <div key={index} className={`${selectedSection.toLocaleLowerCase() == section.label.toLocaleLowerCase() ? "bg-gray-800" : ""} w-full flex flex-col items-end rounded-md`}>
                            <div
                                className='w-full p-2 flex justify-between items-center h-10 cursor-pointer hover:bg-gray-800 rounded-md'
                                onClick={() => handleSection(section)}
                            >
                                <li>{section.label}</li>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Sidebar;
