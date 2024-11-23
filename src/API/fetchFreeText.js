const fetchFreeText = async (id) => {
    try {
        const response = await ZOHO.CREATOR.API.getAllRecords({
            appName: "loan-management",
            reportName: "All_Free_Text_Questions",
            criteria: `Survey_Template == ${id}`
        })
        return response.data
    } catch (error) {
        console.log(error);
    }
}
export default fetchFreeText