import Input from '@mui/joy/Input'
import React, { useState } from 'react'

const Section6 = (props) => {

  const [value , setValue] = useState("");
  const handleChange = (e)=> {
    setValue(e.target.value);
    const formData = {
      "data": {
        Question: props.question,
        Response: e.target.value,
        Survey_Response: 0
      }
    }
    props.updateFreeTextResponses(props.index, formData);
  }
  return (
    <div className='p-2 flex gap-[20px] items-center'>
        <div className='text-sm w-[200px]'>{props.question}</div>
        <Input required value={value} onChange={handleChange} className='w-[300px]'/>
    </div>
  )
}

export default Section6