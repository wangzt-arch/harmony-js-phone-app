import hmsHttp, {baseUrl, userId, subsiteId} from '../../common/utils.js';
import geolocation from '@system.geolocation';

export default {
    data: {
        subsiteLists: [],
        messageNearly: ''
    },
    onInit() {
        this.getSubsiteList(),
        this.getCurrentlocation()
    },
    getCurrentlocation() {
        geolocation.getLocation({
            success: function (data) {
                console.log('success get location data. latitude:' + data.latitude);
            },
            fail: function (data, code) {
                console.log('fail to get location. code:' + code + ', data:' + data);
            },
        });
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
            this.subsiteLists = resObj
            this.messageNearly = resObj[0].subsites[0]
            console.log(resString)
        }
        catch (err) {
            console.info(err)
        }
    }
}