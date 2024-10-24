import Select from 'react-select'

const Section4 = (props) => {
  const choices = props.choices.map(res => {
    return {
      value: res.display_value,
      label: res.display_value
    }
  })
  return (
    <div className='p-2 flex gap-[20px] items-center'>
        <div className='text-sm mb-3 w-[200px]'>{props.question}</div>
        <Select isMulti options={choices} className='w-[300px]' />
    </div>
  )
}

export default Section4