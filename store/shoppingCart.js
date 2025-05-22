import { defineStore } from "pinia"
import { ref, reactive, computed } from "vue"
import { apiShoppingCartList, apiShoppingCartAdd, apiShoppingCartClean, apiShoppingCartSub } from '@/utils/api/shoppingCart.js'

export const useShoppingCartStore = defineStore('shoppingCart', () => {
	const shoppingCart = reactive([])
	
	const total = computed(()=>{
		return shoppingCart.reduce((sum, item) => {
		    return sum + item.amount * item.number
		}, 0)
	})
	
	async function getShoppingCart() {
		try{
			const res = await apiShoppingCartList()
			shoppingCart.length = 0
			shoppingCart.push(...res)
		}catch(err){
			console.error('获取购物车列表失败', err)
		}
	}
	
	async function addShoppingCart(dishId) {
		try{
			await apiShoppingCartAdd({dishId})
			uni.showToast({
				title:'添加商品成功'
			})
		}catch(err){
			console.error('添加商品失败', err)
		}
	}
	
	async function cleanShoppingCart() {
		try{
			await apiShoppingCartClean()
			uni.showToast({
				title:'清空购物车成功'
			})
		}catch(err){
			console.error('清空购物车失败', err)
		}
	}
	
	async function subShoppingCart(dishId) {
		try{
			await apiShoppingCartSub({dishId})
			uni.showToast({
				title:'删除商品成功'
			})
		}catch(err){
			console.error('删除商品失败', err)
		}
	}
	
	return { shoppingCart, total, getShoppingCart, addShoppingCart, cleanShoppingCart, subShoppingCart}
})