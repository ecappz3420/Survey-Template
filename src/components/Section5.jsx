import React from 'react'
import Select from 'react-select'
const Section5 = (props) => {
  const choices = props.choices.map(res => {
    return {
      value: res.display_value,
      label: res.display_value
    }
  })
  return (
    <div className='p-2 flex gap-[20px] items-center'>
      <div className='text-sm w-[200px] mb-3'>{props.question}</div>
      <Select isClearable options={choices} className='w-[300px]' />
    </div>
  )
}

export default Section5
