import React, { useState } from 'react'
import Input from '@mui/joy/Input';
import FormControl from '@mui/joy/FormControl'
import FormLabel from '@mui/joy/FormLabel'
import Button from '@mui/joy/Button'

const Section2 = (props) => {
    const [choice, setChoice] = useState('');

    const handleChange = (value) => {
        setChoice(value);
        const formData = {
            "data": {
                Field_form: props.field_id,
                Response: value,
                Survey_Response: 0
            }
        }
        props.updateVaidateResponse(props.index, formData);
    };

    const field_value = props.field_name === "Name" ? props.member_obj.Name :
        props.field_name === "Email" ? props.member_obj.Email :
            props.field_name === "Phone" ? props.member_obj.Phone_Number :
                props.field_name === "DOB" ? props.member_obj.DOB : null;
    return (
        <div className='mb-3'>
            <FormControl className='mb-3' sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <FormLabel sx={{ width: '150px', paddingX: '10px', paddingY: '15px' }}>{props.field_name}</FormLabel>
                <Input className='w-[300px]' value={field_value} disabled />
            </FormControl>
            <div className='flex gap-3 text-sm rounded-lg p-1'>
                <Button onClick={()=>handleChange('Match')} color='success' variant={choice === 'Match'? 'solid': 'outlined' }>Match</Button>
                <Button onClick={()=>handleChange('Not Match')} color='danger' variant={choice === 'Not Match'? 'solid': 'outlined' }>Not Match</Button>
                <Button onClick={()=>handleChange('Partially Match')} color='warning' variant={choice === 'Partially Match'? 'solid': 'outlined' }>Partially Match</Button>
            </div>
        </div>
    )
}

export default Section2
