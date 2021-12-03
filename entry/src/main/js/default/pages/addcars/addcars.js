import router from '@system.router';
import hmsHttp from '../../common/utils.js';

export default {
    data: {
        province: '京',
        number: '',
        plateNumber: '',
    },
    onInputProvince(e) {
        this.province = e.value
        this.plateNumber = e.value + this.number
    },
    onInputNumber(e) {
        this.number = e.value
        this.plateNumber = this.province + e.value
    },
    async onAddCars() {
        const url = 'https://miao-magic-dev-restapi.co-mall.com/CARPARK/front/car_numbers'
        const params = {
            extraData: {
                car_number: this.plateNumber
            },
            header: {
                userId: '72002',
                userSession: "45c6075d01944580ae580a57c5af0fa3",
                subsiteId: '4'
            }
        }
        try {
            const res = await  hmsHttp(url, params, "GET")
            const resString = JSON.parse(res.result)
            console.log(resString)
            console.log(JSON.stringify(res))
            if (res.responseCode == 200) {
                router.push({
                    uri: 'pages/parking/parking'
                })
            }
        }
        catch (err) {
            console.info(err)
        }
    }
}
