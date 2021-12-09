import router from '@system.router';
import hmsHttp, {baseUrl, userId, userSession, subsiteId} from '../../common/utils.js';

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
        const url = `${baseUrl}/CARPARK/front/car_numbers`
        const params = {
            extraData: {
                car_number: this.plateNumber
            },
            header: {
                userId:userId,
                userSession: userSession,
                subsiteId: subsiteId
            }
        }
        try {
            const res = await  hmsHttp(url, params, "POST")
            const resString = JSON.parse(res.result)
            console.log(resString)
            console.log(JSON.stringify(res))
            //            if (res.responseCode == 201) {
            router.push({
                uri: 'pages/parking/parking'
            })
            //            }
        }
        catch (err) {
            console.info(err)
        }
    }
}
