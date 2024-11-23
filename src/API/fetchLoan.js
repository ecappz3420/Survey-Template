const fetchLoan = async (id) => {
    try {
        const config = {
            appName: "loan-management",
            reportName: "All_Loans",
            id: id
        }
        const response = await ZOHO.CREATOR.API.getRecordById(config);
        return response.data;
    } catch (error) {
        console.log(error);
        return null
    }
}
export default fetchLoan;