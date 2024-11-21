const fetchLoanMember = async (id) => {
    try {
        const config = {
            appName: "survey-management",
            reportName: "Loan_Member_Report",
            id: id
        }
        const response = await ZOHO.CREATOR.API.getRecordById(config);
        return response.data;
    } catch (error) {
        console.log("Error Fetching API",error);
        return null;
    }
}
export default fetchLoanMember
