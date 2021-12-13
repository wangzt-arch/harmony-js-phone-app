export default {
    data: {
        disabled: true,
        name: '',
        sex: '请选择',
        cardNumber: '',
        sexValue: ["保密", "男", "女"],
        sexSelect: '0',
        birthday: '请选择'
    },
    onInit() {

    },
    onSexBoxShow() {
        this.$element("select-sex").show()
    },
    onSexBoxClose() {
        this.$element("select-sex").close()
    },
    onBirthdayBoxShow() {
        this.$element("select-birthday").show()
    },
    onBirthdayBoxClose() {
        this.$element("select-birthday").close()
    },
    onChangeBirthday(e) {
        this.birthday = e.year + "-" + (e.month + 1) + "-" + e.day
    },
    onChangeSex(e) {
        this.sex = e.newValue
        this.sexSelect = e.newSelected
    },
    async getUserInfo() {

    }
}
