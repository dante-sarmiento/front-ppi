import { SECTIONS } from '@/constants/sections';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

const Sidebar = () => {
    const [selectedSection, setSelectedSection] = useState('');
    const router = useRouter();

    const handleSection = (data) => {
        setSelectedSection(selectedSection == data.label ? "" : data.label)
        if (data.route) {
            router.push(`/${data.route}`);
        } else if (data.section) {
            // router.push(`/${data.section.route}`)
        }
    };

    return (
        <div className='w-64 bg-gray-900 text-white p-4 h-full'>
            <div className='h-20 w-full flex justify-start items-center'>
                <h2 className='text-3xl font-bold'>PPI market</h2>
            </div>
            <div className='mt-4 flex flex-col gap-3'>
                {SECTIONS.map((section, index) => {
                    return (
                        <div key={index} className={`${selectedSection == section.label ? "bg-gray-800" : ""} w-full flex flex-col items-end rounded-md`}>
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
