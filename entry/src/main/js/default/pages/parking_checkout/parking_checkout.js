import router from '@system.router';
import hmsHttp, {baseUrl, userId, userSession, getSubsiteId} from '../../common/utils.js';

export default {
    data: {
        checkout: false,
        pointCheckout: false,
        plateNumber: 'default',
        carParkName: '',
        entryTime: '',
        totalAmount: '',
        payableAmount: "",
        time: "",
        rulePoint: "",
        ruleAmount: ''
    },
    onInit() {
        this.postParkingCheckout()
        console.log(this.plateNumber)
    },
    async postParkingCheckout() {
        const subsiteId = await getSubsiteId()
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
            const result = JSON.parse(res.result)
            const {carpark_name,entry_time,parking_time_sec,total_amount,payable_amount,point_discount} = result
            const {rule_amount,rule_point} = point_discount
            this.ruleAmount = rule_amount
            this.rulePoint = rule_point
            this.carParkName = carpark_name
            this.entryTime = entry_time
            this.totalAmount = total_amount
            this.payableAmount = payable_amount
            this.time = this.MillisecondToDate(parking_time_sec)
            console.log(resString)
        }
        catch (err) {
            console.info(err)
        }
    },
    async postCarparkOrders() {
        const subsiteId = await getSubsiteId()
        const url = `${baseUrl}/CARPARK/front/carpark_orders`
        const params = {
            extraData: {
                car_number: this.plateNumber,
                car_number_bind: false,
                payable_amount: this.payableAmount,
                selected_coupon_id: "",
                use_point_discount: false,
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
//            const resObj = JSON.parse(res)
            console.log("????????????")
            console.log(resString)
        }
        catch (err) {
            console.info(err)
        }
    },
    MillisecondToDate(value) {
        let secondTime = parseInt(value); // ???
        let minuteTime = 0; // ???
        let hourTime = 0; // ??????
        if (secondTime > 60) { //??????????????????60???????????????????????????
            //?????????????????????60??????????????????????????????
            minuteTime = parseInt(secondTime / 60);
            //????????????????????????????????????????????????
            secondTime = parseInt(secondTime % 60);
            //??????????????????60???????????????????????????
            if (minuteTime > 60) {
                //?????????????????????????????????60?????????????????????
                hourTime = parseInt(minuteTime / 60);
                //????????????????????????????????????????????????60????????????
                minuteTime = parseInt(minuteTime % 60);
            }
        }
        let result = "" + parseInt(secondTime) + "???";

        if (minuteTime > 0) {
            result = "" + parseInt(minuteTime) + "???" + result;
        }
        if (hourTime > 0) {
            result = "" + parseInt(hourTime) + "??????" + result;
        }
        return result;
    },
    onChangePointState() {
        console.log(this.pointCheckout)
        this.pointCheckout = !this.pointCheckout
    }
}
