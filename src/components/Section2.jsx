import React, { useState } from 'react'
import Input from '@mui/joy/Input';
import FormControl from '@mui/joy/FormControl'
import FormLabel from '@mui/joy/FormLabel'
import Radio from '@mui/joy/Radio'
import RadioGroup from '@mui/joy/RadioGroup'

const Section2 = (props) => {
    const [value, setValue] = React.useState('');

    const handleChange = (event) => {
        setValue(event.target.value);
    };
    const field_value = props.field_name === "Name" ? props.member_obj.Name :
        props.field_name === "Email" ? props.member_obj.Email :
            props.field_name === "Phone" ? props.member_obj.Phone_Number :
                props.field_name === "DOB" ? props.member_obj.DOB : null;
    return (
        <div className='mb-3'>
            <FormControl className='mb-3' sx={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                <FormLabel sx={{width: '150px' , paddingX: '10px', paddingY: '15px'}}>{props.field_name}</FormLabel>
                <Input className='w-[300px]' value={field_value} disabled />
            </FormControl>
            <FormControl>
                <RadioGroup
                    name="controlled-radio-buttons-group"
                    value={value}
                    onChange={handleChange}
                    size='sm'
                    sx={{ my: 1 }}>
                    <Radio value="Match" label="Match" />
                    <Radio value="Not Match" label="Not Match" />
                    <Radio value="Partially Match" label="Partially Match" />
                </RadioGroup>
            </FormControl>
        </div>
    )
}

export default Section2
