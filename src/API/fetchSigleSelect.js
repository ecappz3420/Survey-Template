const fetchSingleSelect = async (params) => {
    try {
        const response = await ZOHO.CREATOR.API.getAllRecords({
            appName: "loan-management",
            reportName: "All_Select_Type_Questions",
            criteria: `Survey_Template == ${params}`
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export default fetchSingleSelect