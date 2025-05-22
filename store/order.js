import { defineStore } from "pinia"
import {ref, reactive, computed} from "vue";
import {apiOrder, apiOrderSubmit, apiOrderPay} from '@/utils/api/order.js'

export const useOrderStore = defineStore('order', () => {
    const total = ref(0)
	const submitResult = reactive({})
    const orderList = reactive([])


    async function getOrderList(page, pageSize, status){
        try {
            const res = await apiOrder(page, pageSize, status)
            const {total: totalCount, records: orderData} = res
            total.value = totalCount
            orderList.length = 0; // 清空数组内容
            orderList.push(...orderData); // 使用扩展运算符将新数据添加到数组中

        }catch(err){
            console.error('获取订单列表失败', err)
        }
    }
	
	async function submitOrder(addressId, packAmount, amount) {
		try{
			const res = await apiOrderSubmit(addressId, packAmount, amount)
			Object.assign(submitResult, res)
		}catch(err){
			console.error('订单提交失败', err)
		}
	}
	
	async function payOrder() {
		try{
			await apiOrderPay(submitResult.orderNumber)
		}catch(err){
			console.error('订单支付失败', err)
		}
	}
    

    return{total, submitResult, orderList, getOrderList, submitOrder, payOrder}
})