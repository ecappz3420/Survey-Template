import React, { useEffect, useState } from 'react'
import fetchData from './API/fetch'
import fetchYesNoQuestions from './API/fetchYesNoQuestion'
import fetchMultiChoiceData from './API/fetchMultiChoiceQuestions'
import Section1 from './components/Section1'
import fetchMember from './API/fetchMember'
import Section2 from './components/Section2'
import Section3 from './components/Section3'
import Section4 from './components/Section4'

const App = () => {
  const [showFields, setShowFields] = useState([]);
  const [fieldsValidate, setFieldsValidate] = useState([]);
  const [yesNoData, setYesNoData] = useState([]);
  const [multiChoiceData, setMultiChoiceData] = useState(null);
  const [memberObj, setMemberObj] = useState(null);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      await ZOHO.CREATOR.init();
      const params = await ZOHO.CREATOR.UTIL.getQueryParams();
      const data = await fetchData(params.survey_id);
      const memberData = await fetchMember(params.member_id);
      setMemberObj(memberData);
      const yes_no_data = await fetchYesNoQuestions(params.survey_id);
      const multi_choice_data = await fetchMultiChoiceData(params.survey_id);
      setMultiChoiceData(multi_choice_data);
      setYesNoData(yes_no_data);
      setShowFields(data.Fields_to_be_Shown);
      setFieldsValidate(data.Fields_to_be_Validated);
      setLoading(false);
    }
    getData();
  }, []);

  return (
    <div className='inter'>
      <div className='text-center text-xl font-bold p-2'>Survey</div>
      {
        loading === false ? (
          <div className='p-2'>
            {/* {Field to be Shown} */}
            <div className='font-semibold mb-3 border-b py-2'>Section 1</div>
            {
              showFields && showFields.map((field, index) => (
                <Section1 key={index} field_name={field.display_value} member_obj={memberObj} />
              ))
            }
            {/* {Field to be validated} */}
            <div className='font-semibold my-3 border-b py-2'>Section 2</div>
            {
              fieldsValidate && fieldsValidate.map((field, index) => (
                <Section2 key={index} field_name={field.display_value} member_obj={memberObj} />
              ))
            }
            {/* {Yes or No Questions} */}
            <div className='font-semibold my-3 border-b py-2'>Section 3</div>
            {
              yesNoData && yesNoData.map((result, index) => (
                <Section3 key={index} question={result.Question} />
              ))
            }
            {/* {Multichoice Questions} */}
            <div className='font-semibold my-3 border-b py-2'>Section 4</div>
            {
              multiChoiceData && multiChoiceData.map((result, index) => (
                <Section4 key={index} choices={result.Choices} question={result.Question} />
              ))
            }
            <div className='text-center p-2'>
              <button className='bg-blue-600 text-white rounded shadow px-3 py-1 transition-all hover:bg-blue-500 hover:transition-all'>Submit</button>
            </div>
          </div>

        ) :
          (
            <div className='text-center'>Loading...</div>
          )
      }



    </div>
  )
}

export default App
