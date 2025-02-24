import React from 'react'; // Importa React
import Modal from '../Modal';

export default function Loader() {
  return (
    <Modal>
      <div className="flex justify-center items-center">
        <div className="relative">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-white"></div>
        </div>
      </div>
    </Modal>
  );
}