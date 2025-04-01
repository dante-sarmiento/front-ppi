import Image from 'next/image'
import React from 'react'

const ButtonNextPrev = ({className = "", handleClick}) => {
    return (
        <button className='w-[50px] h-[50px] rounded-md bg-blue-500 flex justify-center items-center' onClick={handleClick}>
            <Image
                src='/img/arrow-right.svg'
                width={30}
                height={30}
                alt='arrow'
                className={className}
            />
        </button>
    )
}

export default ButtonNextPrev