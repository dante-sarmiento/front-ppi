import Image from "next/image"

export const getPercenChangeIcon = (percent) => {
    if (percent && parseFloat(percent) > 0) {
        return (
            <div className="w-[40px] h-[40px] rounded-full bg-green-400 flex justify-center items-center">
                <Image
                    src='/img/arrowDown.svg'
                    width={20}
                    height={20}
                    alt='arrow'
                    className="rotate-180"
                />
            </div>
        )
    } else if (percent && parseFloat(percent) < 0) {
        return (
            <div className="w-[40px] h-[40px] rounded-full bg-red-700 flex justify-center items-center">
                <Image
                    src='/img/arrowDown.svg'
                    width={20}
                    height={20}
                    alt='arrow'
                    className=""
                />
            </div>
        )
    } else if (percent && parseFloat(percent) == 0) {
        return (
            <div className="w-[40px] h-[40px] rounded-full bg-orange-400 flex justify-center items-center">
                
            </div>
        )
    } else {
        return ""
    }
}