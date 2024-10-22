const fetchMember = async (member_id) => {
    const config = {
        appName: "survey-management",
        reportName: 'All_Members',
        id: member_id
    }
    try {
        const response = await ZOHO.CREATOR.API.getRecordById(config);
        return response.data;
    } catch (error) {
        console.log(error)
    }
}

export default fetchMember;