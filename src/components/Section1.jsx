import React, { useEffect, useState } from 'react'
import FormControl from '@mui/joy/FormControl'
import FormLabel from '@mui/joy/FormLabel'
import Textarea from '@mui/joy/Textarea';

const Section1 = (props) => {
   const [fieldValue, setFieldValue] = useState("");
   useEffect(()=>{
    const init = ()=>{
      const field_value = props.member_obj[props.field_name.replaceAll(" ", "_")];
      setFieldValue(field_value);
    }
    init();
   },[])
  return (
    <div className='mb-3 w-[33.33%]'>
      <FormControl>
        <FormLabel>{props.field_name}</FormLabel>
        <Textarea value={fieldValue} className='w-[250px]' disabled/>
      </FormControl>
    </div>
  )
}

export default Section1
