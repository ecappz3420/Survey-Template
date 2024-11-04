import { useState } from 'react'
import Select from 'react-select'

const Section4 = (props) => {

  const [value, setValue] = useState("");
  const choices = props.choices.map(res => {
    return {
      value: res.display_value,
      label: res.display_value
    }
  })
  const handleChange = (e) => {
    setValue(e);
    const values = e.map(res => res.value)
    const responses = props.choices.filter(res => values.includes(res.display_value)).map(res => res.ID);
    const formData = {
      "data": {
        Question: props.question,
        Response: responses,
        Survey_Response: 0
      }
    }
    props.updateMultiChoiceResponses(props.index,formData);
  }
  return (
    <div className='p-2 flex gap-[20px] items-center'>
      <div className='text-sm mb-3 w-[200px]'>{props.question}</div>
      <Select isMulti value={value} onChange={handleChange} options={choices} className='w-[300px]' />
    </div>
  )
}

export default Section4