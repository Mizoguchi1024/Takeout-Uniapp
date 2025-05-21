import { defineStore } from "pinia"
import {ref, reactive} from "vue"
import {apiAddress} from '@/utils/api/address.js'

export const useAddressStore = defineStore('address', () => {
	const addressList = reactive([])
	
	async function getAddressList(){
		try{
			const res = await apiAddress()
			addressList.length = 0
			addressList.push(...res)
		}catch(err){
			console.error('获取地址簿失败', err)
		}
	}
	
	return {addressList, getAddressList}
})