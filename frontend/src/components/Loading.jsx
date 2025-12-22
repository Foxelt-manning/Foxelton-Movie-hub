import React from 'react'

const Loading = () => {
  return (<>
    <div className='absolute inset-0 flex items-center justify-center  bg-black/40 rounded-lg z-10'>
        <div className='w-12 h-12 border-4 border-gray-400 border-t-blue-600 rounded-full animate-spin'></div>
         <p>Please wait ...</p>
    </div>
  </>
  )
}

export default Loading