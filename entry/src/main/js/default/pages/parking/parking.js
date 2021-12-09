import router from '@system.router';
import hmsHttp, {baseUrl, userId, userSession, subsiteId} from '../../common/utils.js';

export default {
    data: {
        carparkExplain: '',
        province: '京',
        number: '',
        plateNumber: '',
        plateNumberBinds: []
    },
    onInit() {
        this.getPlateNumbers()
        this.getExplains()
    },
    onInputProvince(e) {
        this.province = e.value
        this.plateNumber = e.value + this.number
    },
    onInputNumber(e) {
        this.number = e.value
        this.plateNumber = this.province + e.value
    },
    async getExplains() {
        const url = `${baseUrl}/CARPARK/front/carparks/subsite/${subsiteId}`
        const params = {
            extraData: {},
            header: {
                userId: userId,
                subsiteId:subsiteId
            }
        }
        try {
            const res = await  hmsHttp(url, params, "GET")
            const resString = JSON.stringify(res.result)
            const resObj = JSON.parse(res.result)
            console.log(resString)
            this.carparkExplain = resObj.carpark_explain
        }
        catch (err) {
            console.info(err)
        }
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
            this.plateNumberBinds = JSON.parse(value.result)

        })).catch(err => {
            console.info("err", err)
        })
    },
    async onSearch() {
        const url = `${baseUrl}/CARPARK/front/carpark_checkouts`
        const params = {
            extraData: {
                car_number: this.plateNumber
            },
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
        }
        catch (err) {
            console.info(err)
        }
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
    onNavigateToMyCars() {
        router.push({
            uri: 'pages/mycars/mycars'
        })
    }
}
