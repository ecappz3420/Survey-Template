const fetchData = async (id) => {
    const config = {
        appName: "survey-management",
        reportName: 'All_Survey_Templates',
        id: id
    }
    try {
        await ZOHO.CREATOR.init();
        const response = await ZOHO.CREATOR.API.getRecordById(config);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}
export default fetchData;