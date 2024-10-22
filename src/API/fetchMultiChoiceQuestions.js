const fetchMultiChoiceData = async (survey_id) => {
    const config = {
        appName: "survey-management",
        reportName: 'All_Multiselect_Type_Questions',
        criteria: `Survey_Template == ${survey_id}`
    }
    try {
        const response = await ZOHO.CREATOR.API.getAllRecords(config);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}
export default fetchMultiChoiceData