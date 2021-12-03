import router from '@system.router';
import hmsHttp from '../../common/utils'

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
        const url = 'https://miao-magic-dev-restapi.co-mall.com/CARPARK/front/carparks/subsite/4'
        const params = {
            extraData: {},
            header: {
                userId: '72002',
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
        const url = 'https://miao-magic-dev-restapi.co-mall.com/CARPARK/front/car_numbers?id=72002'
        const params = {
            extraData: {
                id: '72002'
            },
            header: {
                userId: 72002,
                userSession: "45c6075d01944580ae580a57c5af0fa3",
                subsiteId: '4'
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
        const url = 'https://miao-magic-dev-restapi.co-mall.com/CARPARK/front/carpark_checkouts'
        const params = {
            extraData: {
                car_number: this.plateNumber
            },
            header: {
                userId: '72002',
                subsiteId: 4,
                userSession: "45c6075d01944580ae580a57c5af0fa3"
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
        const url = `https://miao-magic-dev-restapi.co-mall.com/CARPARK/front/car_numbers/delete_carnumber/${id}`
        const params = {
            extraData: {},
            header: {
                userId: '72002',
                subsiteId: "4",
                userSession: "45c6075d01944580ae580a57c5af0fa3"
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
