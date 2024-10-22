import React from 'react'
import Input from '@mui/joy/Input';
import FormControl from '@mui/joy/FormControl'
import FormLabel from '@mui/joy/FormLabel'

const Section1 = (props) => {
   const field_value = props.field_name === "Name" ? props.member_obj.Name:
   props.field_name === "Email" ? props.member_obj.Email:
   props.field_name === "Phone" ? props.member_obj.Phone_Number:
   props.field_name === "DOB" ? props.member_obj.DOB:null;
  return (
    <div className='mb-3'>
      <FormControl sx={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
        <FormLabel sx={{width: '150px', paddingX: '10px', paddingY: '15px'}}>{props.field_name}</FormLabel>
        <Input className='w-[300px]' value={field_value} disabled/>
      </FormControl>
    </div>
  )
}

export default Section1
