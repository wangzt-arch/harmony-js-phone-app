import router from '@system.router';
import hmsHttp, {baseUrl, userId, userSession, subsiteId} from '../../common/utils.js';

export default {
    data: {
        plateNumberBinds: []
    },
    onInit() {
        this.getPlateNumbers()
    },
    getPlateNumbers() {
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

        const res = hmsHttp(url, params, "GET")
        res.then((value => {
            console.info(JSON.stringify(value.result));
            console.info(JSON.stringify(value));
            this.plateNumberBinds = JSON.parse(value.result)
        })).catch(err => {
            console.info("err", err)
        })
    },
    async deletePlateNumberById(id) {
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
