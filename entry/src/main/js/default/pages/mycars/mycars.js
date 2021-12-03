import router from '@system.router';
import hmsHttp from '../../common/utils.js';
export default {
    data: {
        plateNumberBinds:[]
    },
    onInit(){
      this.getPlateNumbers()
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
            console.info(JSON.stringify(value));
            this.plateNumberBinds = JSON.parse(value.result)
        })).catch(err => {
            console.info("err", err)
        })
    },
    async deletePlateNumberById(id){
        const url = `https://miao-magic-dev-restapi.co-mall.com/CARPARK/front/car_numbers/delete_carnumber/${id}`
        const params = {
            extraData: {
            },
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
    onNavigateToAddCars(){
        router.push({
            uri: 'pages/addcars/addcars'
        })
    }
}
