import React from 'react'

const ButtonGroup = ({ data = [], setSelectedButton, selectedButton }) => {
    return (
        <div className='w-full flex justify-start items-center gap-3'>
            {data.map((d, index) => {
                return (
                    <button key={index} className={`${selectedButton.value == d.value && "bg-gray-700 text-white"} text-normal text-base px-2 py-1 rounded-lg border border-gray-800`} onClick={() => setSelectedButton(d)}>
                        {d.label}
                    </button>
                )
            })}
        </div>
    )
}

export default ButtonGroup