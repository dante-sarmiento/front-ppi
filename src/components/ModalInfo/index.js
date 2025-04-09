import Image from 'next/image';
import React from 'react';

// type: 1 => EXITO
// type: 0 => ERROR 

const ModalInfo = ({ type = 0, message = '', closeModal }) => {
  return (
    <div className='w-[30%] h-[400px] bg-gray-900 rounded-lg flex flex-col justify-start items-center p-4'>
      <div className='w-full flex justify-end items-center'>
        <button className='text-gray-200 text-base' onClick={closeModal}>
          Cerrar
        </button>
      </div>
      {type == 0 ? (
        <div className='w-full h-full flex justify-center items-center flex-col gap-4'>
          <div className='w-full flex justify-center items-center'>
            <Image
              src='/img/alert.svg'
              width={30}
              height={30}
              alt='arrow'
              className="w-[90px] h-[90px]"
            />
          </div>
          <p className='text-2xl text-red-500'>Ha ocurrido un error</p>
          <p className='text-lg font-semibold text-center text-white'>{message || ''}</p>
        </div>
      ) : (
        <div className='w-full h-full flex justify-center items-center flex-col gap-4'>
          <div className='w-full flex justify-center items-center'>
            <Image
              src='/img/check-success.svg'
              width={30}
              height={30}
              alt='arrow'
              className="w-[90px] h-[90px]"
            />
          </div>
          <p className='text-2xl text-white'>Exitoso!</p>
          <p className='text-lg font-semibold text-center text-white'>{message || ''}</p>
        </div>
      )}
    </div>
  );
};

export default ModalInfo;
