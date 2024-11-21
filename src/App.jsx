import React, { useEffect, useState } from 'react'
import fetchData from './API/fetch'
import fetchYesNoQuestions from './API/fetchYesNoQuestion'
import fetchMultiChoiceData from './API/fetchMultiChoiceQuestions'
import Section1 from './components/Section1'
import fetchMember from './API/fetchMember'
import Section2 from './components/Section2'
import Section3 from './components/Section3'
import Section4 from './components/Section4'
import Section5 from './components/Section5'
import fetchSingleSelect from './API/fetchSigleSelect'
import fetchFreeText from './API/fetchFreeText'
import Section6 from './components/Section6'
import addRecord from './API/AddRecord'
import fetchLoanMember from './API/fetchLoanMember'
import fetchLoan from './API/fetchLoan'

const App = () => {
  const [showFields, setShowFields] = useState([]);
  const [fieldsValidate, setFieldsValidate] = useState([]);
  const [yesNoData, setYesNoData] = useState([]);
  const [multiChoiceData, setMultiChoiceData] = useState(null);
  const [memberObj, setMemberObj] = useState(null);
  const [loading, setLoading] = useState(false);
  const [singleSelectQuestions, setSingleQuestions] = useState([]);
  const [freeQuestions, setFreeQuestions] = useState([]);
  const [surveyID, setSurveyID] = useState(null);
  const [validateResponses, setValidateResposes] = useState([]);
  const [yesNoResponses, setYesNoResponses] = useState([]);
  const [multiChoiceResponses, setMultiChoiceResponses] = useState([]);
  const [singleChoiceResponses, setSingleChoiceResponses] = useState([]);
  const [freeTextResponses, setFreeTextResponses] = useState([]);


  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      await ZOHO.CREATOR.init();
      const params = await ZOHO.CREATOR.UTIL.getQueryParams();
      const loan_member = await fetchLoanMember(params.loan_id);
      setSurveyID(params.survey_id);
      const data = await fetchData(params.survey_id);
      const loanObj = await fetchLoan(loan_member.Loan.ID);
      const memberData = await fetchMember(loan_member.Member.ID);
      const loanAndMemberData = {...loanObj,...memberData};
      setMemberObj(loanAndMemberData);
      const yes_no_data = await fetchYesNoQuestions(params.survey_id);
      const multi_choice_data = await fetchMultiChoiceData(params.survey_id);
      const single_select_questions = await fetchSingleSelect(params.survey_id);
      const free_text_questions = await fetchFreeText(params.survey_id);
      setFreeQuestions(free_text_questions);
      setSingleQuestions(single_select_questions);
      setMultiChoiceData(multi_choice_data);
      setYesNoData(yes_no_data);
      setShowFields(data.Fields_to_be_Shown);
      setFieldsValidate(data.Fields_to_be_Validated);
      setLoading(false);
    }
    getData();
  }, []);

  const updateVaidateResponse = (index, value) => {
    setValidateResposes((prevState) => {
      const updatedData = [...prevState]
      updatedData[index] = value
      return updatedData
    });
    console.log(validateResponses);
  };

  const updateYesNoResponses = (index, value) => {
    setYesNoResponses((prevState) => {
      const updatedData = [...prevState]
      updatedData[index] = value
      return updatedData
    })
  }

  const updateMultiChoiceResponses = (index, value) => {
    setMultiChoiceResponses((prevState) => {
      const updateData = [...prevState]
      updateData[index] = value;
      return updateData
    })
  }

  const updateSingleChoiceResponses = (index, value) => {
    setSingleChoiceResponses((prevState) => {
      const updatedData = [...prevState]
      updatedData[index] = value
      return updatedData
    })
  }

  const updateFreeTextResponses = (index, value) => {
    setFreeTextResponses((prevState) => {
      const updatedData = [...prevState]
      updatedData[index] = value
      return updatedData
    })
  }



  const submitRecord = async () => {
    const formData = {
      "data": {
        Member: memberObj.ID,
        Survey_Template: surveyID
      }
    }
    const config = {
      appName: "survey-management",
      formName: "Survey_Response",
      data: formData
    }
    try {

      const response = await ZOHO.CREATOR.API.addRecord(config);

      const newValidateResponse = validateResponses.map(item => ({
        data: {
          ...item.data,
          Survey_Response: response.data.ID
        }
      }));


      newValidateResponse.map(async item => await addRecord("Validate_Fields_Response", item));

      const newYesNoResponses = yesNoResponses.map(item => ({
        data: {
          ...item.data,
          Survey_Response: response.data.ID
        }
      }))

      newYesNoResponses.map(async item => await addRecord("Yes_or_No_Type_Response", item));

      const newMultiChoiceResponses = multiChoiceResponses.map(item => ({
        data: {
          ...item.data,
          Survey_Response: response.data.ID
        }
      }))

      newMultiChoiceResponses.map(async item => await addRecord("Multichoice_Response", item));
      const newSingleChoiceResposnes = singleChoiceResponses.map(item => ({
        data: {
          ...item.data,
          Survey_Response: response.data.ID
        }
      }))

      newSingleChoiceResposnes.map(async item => await addRecord("Single_Choice_Response", item));
      const newFreeTextResponses = freeTextResponses.map(item => ({
        data: {
          ...item.data,
          Survey_Response: response.data.ID
        }
      }))
      newFreeTextResponses.map(async item => await addRecord("Free_Text_Response", item));

      location.reload();

    } catch (error) {
      console.log(error);
    }




  }

  return (
    <div className='inter'>
      <div className='text-center text-xl text-white font-bold p-2 bg-blue-600'>Survey</div>
      {
        loading === false ? (
          <div className='p-2 bg-slate-50'>
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
                <Section2
                  key={index}
                  index={index}
                  field_name={field.display_value}
                  field_id={field.ID}
                  member_obj={memberObj}
                  updateVaidateResponse={updateVaidateResponse} />
              ))
            }
            {/* {Yes or No Questions} */}
            <div className='font-semibold my-3 border-b py-2'>Section 3</div>
            {
              yesNoData && yesNoData.map((result, index) => (
                <Section3
                  key={index}
                  question={result.Question}
                  index={index}
                  updateYesNoResponses={updateYesNoResponses} />
              ))
            }
            {/* {Multichoice Questions} */}
            <div className='font-semibold my-3 border-b py-2'>Section 4</div>
            {
              multiChoiceData && multiChoiceData.map((result, index) => (
                <Section4
                  key={index}
                  choices={result.Choices}
                  question={result.Question}
                  index={index}
                  updateMultiChoiceResponses={updateMultiChoiceResponses} />
              ))
            }
            {/* {Single Select Questions} */}
            <div className='font-semibold my-3 border-b py-2'>Section 5</div>
            {
              singleSelectQuestions && singleSelectQuestions.map((result, index) => (
                <Section5
                  key={index}
                  choices={result.Choices}
                  question={result.Question}
                  index={index}
                  updateSingleChoiceResponses={updateSingleChoiceResponses} />
              ))
            }
            {/* {Free Text Questions} */}
            <div className='font-semibold my-3 border-b py-2'>Section 6</div>
            {
              freeQuestions && freeQuestions.map((result, index) => (
                <Section6
                  key={index}
                  question={result.Question}
                  index={index}
                  updateFreeTextResponses={updateFreeTextResponses} />
              ))
            }
            <div className='text-center p-2'>
              <button onClick={submitRecord} className='bg-blue-600 text-white rounded shadow px-3 py-1 transition-all hover:bg-blue-500 hover:transition-all'>Submit</button>
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
