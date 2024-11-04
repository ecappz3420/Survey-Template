const addRecord = async (formName, formData) => {
    const config = {
        appName: "survey-management",
        formName: formName,
        data: formData
    }
    try {
        const response = await ZOHO.CREATOR.API.addRecord(config);
        return response;
    } catch (error) {
        console.log(error);
        throw error
    }
}
export default addRecord