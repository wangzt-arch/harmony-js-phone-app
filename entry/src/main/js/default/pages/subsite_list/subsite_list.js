import hmsHttp, {baseUrl, userId, userSession, subsiteId} from '../../common/utils.js';

export default {
    data: {
        subsiteLists:[],
        messageNearly:''
    },
    onInit() {
        this.getSubsiteList()
    },
    async getSubsiteList() {
        const url = `${baseUrl}/WEB-API/front/city_subsites/v2`
        const params = {
            extraData: {},
            header: {
                userId: userId,
                subsiteId: subsiteId
            }
        }
        try {
            const res = await  hmsHttp(url, params, "GET")
            const resString = JSON.stringify(res.result)
            const resObj = JSON.parse(res.result)
            this.subsiteLists=resObj
            this.messageNearly=resObj[0].subsites[0]
            console.log(resString)
        }
        catch (err) {
            console.info(err)
        }
    }
}