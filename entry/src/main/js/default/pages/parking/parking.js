import router from '@system.router';
import hmsHttp, {baseUrl, userId, userSession, getSubsiteId} from '../../common/utils.js';

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
        const subsiteId = await getSubsiteId()
        const url = `${baseUrl}/CARPARK/front/carparks/subsite/${subsiteId}`
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
            console.log(resString)
            this.carparkExplain = resObj.carpark_explain
        }
        catch (err) {
            console.info(err)
        }
    },
    async getPlateNumbers() {
        const subsiteId = await getSubsiteId()
        const url = `${baseUrl}/CARPARK/front/car_numbers?id=${userId}`
        const params = {
            extraData: {
                id: userId
            },
            header: {
                userId: userId,
                userSession: userSession,
                subsiteId: subsiteId
            }
        }
        try {
            const res = await hmsHttp(url, params, "GET")
            this.plateNumberBinds = JSON.parse(res.result)
        }
        catch (err) {
            console.info(err)
        }
    },
    async onSearch() {
        router.push({
            uri: 'pages/parking_checkout/parking_checkout',
            params: {
                plateNumber: this.plateNumber,
            },
        })
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
