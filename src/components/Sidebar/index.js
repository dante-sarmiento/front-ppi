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
        <div className='w-64 bg-gray-900 text-white p-4'>
            <div className='h-20 w-full flex justify-start items-center'>
                <h2 className='text-3xl font-bold'>PPI market</h2>
            </div>
            <div className='mt-4 flex flex-col gap-4'>
                {SECTIONS.map((section, index) => {
                    return (
                        <div key={index} className={`${selectedSection == section.label ? "bg-gray-800" : ""} w-full flex flex-col items-end rounded-md`}>
                            <div
                                className='w-full p-2 flex justify-between items-center h-10 cursor-pointer hover:bg-gray-800 rounded-md'
                                onClick={() => handleSection(section)}
                            >
                                <p>{section.label}</p>
                                {section.section && (
                                    <Image
                                        src='/img/arrowDown.svg'
                                        width={12}
                                        height={7}
                                        alt='arrow'
                                        className={selectedSection == section.label ? "rotate-180" : ""}
                                    />
                                )}
                            </div>
                            {section.section && selectedSection == section.label && (
                                <div className='w-full flex flex-col  h-auto p-2 rounded-md'>
                                    {section.section.map((sub, index) => {
                                        return (
                                            <div
                                                key={index}
                                                className='w-full p-2 flex justify-between items-center h-10 cursor-pointer rounded-md' onClick={() => handleSection(sub)}>
                                                <li>
                                                    {sub.label}
                                                </li>
                                            </div>
                                        )
                                    })}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Sidebar;
