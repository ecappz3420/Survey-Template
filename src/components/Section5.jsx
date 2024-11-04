import React, { useState } from 'react'
import Select from 'react-select'

const Section5 = (props) => {
  const choices = props.choices.map(res => {
    return {
      value: res.display_value,
      label: res.display_value
    }
  })
  const [value, setValue] = useState(null);
  const handleChange = (e)=> {
    setValue(e);
    const response = props.choices.filter(res => res.display_value == e.value)[0].ID;
    const formData = {
      "data": {
        Question: props.question,
        Response: response,
        Survey_Response: 0
      }
    }

    props.updateSingleChoiceResponses(props.index,formData);
  }
  return (
    <div className='p-2 flex gap-[20px] items-center'>
      <div className='text-sm w-[200px] mb-3'>{props.question}</div>
      <Select isClearable options={choices} value={value} onChange={handleChange} className='w-[300px]' />
    </div>
  )
}

export default Section5