import React, { useEffect, useState } from 'react'
import FormControl from '@mui/joy/FormControl'
import Typography from '@mui/joy/Typography';
import Switch from '@mui/joy/Switch'

const Section3 = (props) => {
    const [value, setValue] = useState(false);
    useEffect(()=>{
        const init = ()=> {
            const formData = {
                "data": {
                    Question: props.question,
                    Response: 'No',
                    Survey_Response: 0
                }
            }
            props.updateYesNoResponses(props.index, formData);
        }
        init();
    },[props.question,props.index])
    const handleChange = (e) => {
        setValue(e.target.checked);
        const formData = {
            "data": {
                Question: props.question,
                Response: e.target.checked ? 'Yes': 'No',
                Survey_Response: 0
            }
        }
        props.updateYesNoResponses(props.index, formData);
    }
    return (
        <div className='p-2'>
            <div className='mb-2 text-sm'>{props.question}</div>
            <FormControl required>
                <div className='flex gap-3 items-center p-2'>
                    <Typography>No</Typography>
                    <Switch checked={value} onChange={handleChange} />
                    <Typography>Yes</Typography>
                </div>
            </FormControl>
        </div>
    )
}

export default Section3