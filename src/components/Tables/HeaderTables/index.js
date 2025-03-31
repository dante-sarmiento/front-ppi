import Image from 'next/image'
import React from 'react'

const HeaderTables = () => {
  return (
    <div className='w-full flex justify-center items-center h-[100px]'>
        <Image
                    src='/img/amautaLogo.png'
                    width={450}
                    height={100}
                    alt='arrow'
                    className="h-full"
                />
    </div>
  )
}

export default HeaderTables