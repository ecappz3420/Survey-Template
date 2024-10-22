const fetchYesNoQuestions = async (survey_id) => {
    const config = {
        appName: 'survey-management',
        reportName: 'Questionaire_Report',
        criteria: `Survey_Template == ${survey_id}`
    }
    try {
        await ZOHO.CREATOR.init();
        const response = await ZOHO.CREATOR.API.getAllRecords(config);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}
export default fetchYesNoQuestions