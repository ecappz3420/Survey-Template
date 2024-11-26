import React, { useEffect, useState } from 'react';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Button from '@mui/joy/Button';
import Textarea from '@mui/joy/Textarea';

const Section2 = (props) => {
    const [show, setShow] = useState(false);
    const [fieldValue, setFieldValue] = useState({
        Field_form: props.field_id,
        Actual_Value: "",
        Response: "",
        New_Value: "",
        Survey_Response: 0
    });

    useEffect(() => {
        const initiateFunc = () => {
            const field_value = props.member_obj[props.field_name.replaceAll(" ", "_")];
            setFieldValue(curr => ({
                ...curr,
                Actual_Value: field_value
            }));
        };
        initiateFunc();
    }, [props.member_obj, props.field_name]);

    const handleChange = (value) => {
        const updatedFieldValue = {
            ...fieldValue,
            Response: value,
            New_Value: value === 'Match' ? '' : fieldValue.New_Value, // Clear New_Value if Match is selected
        };

        setFieldValue(updatedFieldValue);

        const formData = { data: updatedFieldValue };
        props.updateVaidateResponse(props.index, formData);

        setShow(value === "Not Match" || value === "Partially Match");
    };

    const handleNewValueChange = (event) => {
        const { value } = event.target;

        const updatedFieldValue = {
            ...fieldValue,
            New_Value: value,
        };

        setFieldValue(updatedFieldValue);

        const formData = { data: updatedFieldValue };
        props.updateVaidateResponse(props.index, formData);
    };

    return (
        <div className='mb-5 w-1/2'>
            <FormControl className='mb-3'>
                <FormLabel>{props.field_name}</FormLabel>
                    <Textarea value={fieldValue.Actual_Value} disabled className='w-[250px]'/>
            </FormControl>
            <div className='flex gap-3 text-sm rounded-lg'>
                <Button size='sm' name="Response" onClick={() => handleChange('Match')} color='success' variant={fieldValue.Response === 'Match' ? 'solid' : 'outlined'}>Match</Button>
                <Button size='sm' name="Response" onClick={() => handleChange('Not Match')} color='danger' variant={fieldValue.Response === 'Not Match' ? 'solid' : 'outlined'}>Not Match</Button>
                <Button size='sm' name="Response" onClick={() => handleChange('Partially Match')} color='warning' variant={fieldValue.Response === 'Partially Match' ? 'solid' : 'outlined'}>Partially Match</Button>
            </div>
            {show && (
                <div className='mt-2'>
                    <FormControl sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <FormLabel sx={{ width: '150px', paddingX: '10px', paddingY: '15px' }}>Please enter the new value</FormLabel>
                        <div className='border border-red-400 rounded-lg bg-white'>
                            <input
                                className='w-[300px] outline-none p-2 rounded-lg'
                                name='new'
                                value={fieldValue.New_Value}
                                onChange={handleNewValueChange}
                            />
                        </div>
                    </FormControl>
                </div>
            )}
        </div>
    );
};

export default Section2;
