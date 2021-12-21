import router from '@system.router';
import hmsHttp, {baseUrl, userId, userSession, getSubsiteId} from '../../common/utils.js';

export default {
    data: {
        plateNumberBinds: []
    },
    onInit() {
        this.getPlateNumbers()
    },
    async getPlateNumbers() {
        const subsiteId = await getSubsiteId()
        const url = `${baseUrl}/CARPARK/front/car_numbers?id=72002`
        const params = {
            extraData: {
                id: '72002'
            },
            header: {
                userId: userId,
                userSession: userSession,
                subsiteId: subsiteId
            }
        }
        try {
            const res =await hmsHttp(url, params, "GET")
            console.info(JSON.stringify(res.result));
            console.info(JSON.stringify(res));
            this.plateNumberBinds = JSON.parse(res.result)
        }
        catch (err) {
            console.info(err)
        }

    },
    async deletePlateNumberById(id) {
        const subsiteId = await getSubsiteId()
        const url = `${baseUrl}/CARPARK/front/car_numbers/delete_carnumber/${id}`
        const params = {
            extraData: {},
            header: {
                userId: userId,
                subsiteId: subsiteId,
                userSession: userSession
            }
        }
        try {
            const res = await  hmsHttp(url, params, "POST")
            const resString = JSON.stringify(res)
            const resObj = JSON.parse(resString)
            console.log(resString)
            this.getPlateNumbers()
        }
        catch (err) {
            console.info(err)
        }
    },
    onNavigateToAddCars() {
        router.push({
            uri: 'pages/addcars/addcars'
        })
    }
}
