import React from 'react'

const InfoCard = ({icon,label,value,color}) => {
  return (
    <div className='flex gap-5 bg-white p-6 rounded-2xl shadow-md shadow-gray-500 border border-gray-300'>
        <div className={`w-14 h-14 flex items-center justify-center text-white ${color} rounded-full drop-shadow-2xl`}>
            {icon}
        </div>

    
        <div>
            <h6 className='text-lg text-gray-900 mb-1'>{label}</h6>
            <span className='text-[22px]'>₹{value}</span>
        </div>
    </div>
  )
}

export default InfoCard
