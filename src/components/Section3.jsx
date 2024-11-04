import React, { useState } from 'react'
import FormControl from '@mui/joy/FormControl'
import Radio from '@mui/joy/Radio'
import RadioGroup from '@mui/joy/RadioGroup'

const Section3 = (props) => {
    const [value , setValue] = useState('');
    const handleChange = (e) => {
        setValue(e.target.value);
        const formData = {
            "data": {
                Question: props.question,
                Response: e.target.value,
                Survey_Response: 0
            }
        }
        props.updateYesNoResponses(props.index, formData);
    }
    return (
        <div className='p-2'>
            <div className='mb-2 text-sm'>{props.question}</div>
            <FormControl>
                <RadioGroup onChange={handleChange} size='sm'>
                    <Radio value='Yes' label='Yes'/>
                    <Radio value='No' label='No'/>
                </RadioGroup>
            </FormControl>
        </div>
    )
}

export default Section3