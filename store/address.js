import { defineStore } from "pinia"
import {ref, reactive} from "vue"
import {apiAddressList, apiAddressGetById, apiAddressInsert, apiAddressUpdate, apiAddressDelete, apiAddressSetDefault, apiAddressGetDefault} from '@/utils/api/address.js'

export const useAddressStore = defineStore('address', () => {
	const addressList = reactive([])
	const address = reactive({})
	const defaultAddress = reactive({})
	
	async function getAddressList(){
		try{
			const res = await apiAddressList()
			addressList.length = 0
			addressList.push(...res)
		}catch(err){
			console.error('获取地址簿失败', err)
		}
	}

	async function getAddress(id){
		try{
			const res = await apiAddressGetById(id)
			Object.assign(address, res)
		}catch(err){
			console.error('获取地址失败', err)
		}
	}

	async function insertAddress(params){
		try{
			await apiAddressInsert(params)
			uni.showToast({
				title: '添加成功',
			})
		}catch(err){
			console.error('添加地址失败', err)
		}
	}
	
	async function updateAddress(params){
		try{
			await apiAddressUpdate(params)
			uni.showToast({
				title: '修改成功',
			})
		}catch(err){
			console.error('更新地址失败', err)
		}
	}

	async function deleteAddress(id){
		try{
			await apiAddressDelete(id)
			uni.showToast({
				title: '删除成功',
			})
		}catch(err){
			console.error('删除地址失败', err)
		}
	}

	async function setDefault(id){
		try{
			await apiAddressSetDefault(addressList.find(item => item.id === id))
			uni.showToast({
				title: '设置默认地址成功',
			})
		}catch(err){
			console.error('设置默认地址失败', err)
		}
	}
	
	async function getDefault() {
		try{
			const res = await apiAddressGetDefault()
			Object.assign(defaultAddress, res)
		}catch(err){
			console.error('获取默认地址失败', err)
		}
	}

	return {addressList, address, defaultAddress, getAddressList, getAddress, insertAddress, updateAddress, deleteAddress, setDefault, getDefault}
})