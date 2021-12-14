import router from '@system.router';
import hmsHttp, {baseUrl, userId, userSession, subsiteId} from '../../common/utils.js';

export default {
    data: {
        checkout: false,
        pointCheckout:false,
        plateNumber: 'default',
        carParkName: '',
        entryTime: '',
        totalAmount: '',
        payableAmount: "",
        time: "",
        rulePoint:"",
        ruleAmount:''
    },
    onInit() {
        this.postParkingCheckout()
        console.log(this.plateNumber)
    },
    async postParkingCheckout() {
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
            const{rule_amount,rule_point}=point_discount
            this.ruleAmount=rule_amount
            this.rulePoint=rule_point
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
        const url = `${baseUrl}CARPARK/front/carpark_orders`
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
            const resObj = JSON.parse(res)
            console.log(resString)
        }
        catch (err) {
            console.info(err)
        }
    },
    MillisecondToDate(value) {
        let secondTime = parseInt(value); // 秒
        let minuteTime = 0; // 分
        let hourTime = 0; // 小时
        if (secondTime > 60) { //如果秒数大于60，将秒数转换成整数
            //获取分钟，除以60取整数，得到整数分钟
            minuteTime = parseInt(secondTime / 60);
            //获取秒数，秒数取佘，得到整数秒数
            secondTime = parseInt(secondTime % 60);
            //如果分钟大于60，将分钟转换成小时
            if (minuteTime > 60) {
                //获取小时，获取分钟除以60，得到整数小时
                hourTime = parseInt(minuteTime / 60);
                //获取小时后取佘的分，获取分钟除以60取佘的分
                minuteTime = parseInt(minuteTime % 60);
            }
        }
        let result = "" + parseInt(secondTime) + "秒";

        if (minuteTime > 0) {
            result = "" + parseInt(minuteTime) + "分" + result;
        }
        if (hourTime > 0) {
            result = "" + parseInt(hourTime) + "小时" + result;
        }
        return result;
    },
    onChangePointState(){
        console.log(this.pointCheckout)
        this.pointCheckout=!this.pointCheckout
    }
}
