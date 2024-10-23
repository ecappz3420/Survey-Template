import Input from '@mui/joy/Input'
import React from 'react'

const Section6 = (params) => {
  return (
    <div className='p-2 flex gap-[20px] items-center'>
        <div className='text-sm w-[200px]'>{params.question}</div>
        <Input required className='w-[300px]'/>
    </div>
  )
}

export default Section6