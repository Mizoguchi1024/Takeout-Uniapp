import { defineStore } from "pinia"
import {ref, reactive} from "vue";
import {apiOrder} from '@/utils/api/order.js'

export const useOrderStore = defineStore('order', () => {
    const total = ref(0)
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
    

    return{total, orderList, getOrderList}
})