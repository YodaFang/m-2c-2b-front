import React from 'react'

const Loading = () => {
    return (
        <div className='fixed top-0 left-0 w-full h-full bg-black/40 z-50 flex justify-center items-center'>
            <div className="w-20 h-20 border-4 border-t-4 border-gray-200 border-t-primary rounded-full animate-spin"></div>
        </div>
    )
}

export default Loading