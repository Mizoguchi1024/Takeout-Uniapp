<template>
	<view class="content">
		<up-card @click="onSetAddress" :title="addressStore.defaultAddress.consignee + ' ' + sexMap[addressStore.defaultAddress.sex]" :sub-title=addressStore.defaultAddress.phone :border="false" box-shadow="0px 0px 16px rgba(0, 0, 0, 0.25)">
			<template #body>
				<view style="display: flex; flex-direction: column;">
					<text>{{addressStore.defaultAddress.provinceName + addressStore.defaultAddress.cityName + addressStore.defaultAddress.districtName}}</text>
					<text style="color: #1d1d1f; font-size: 20px;">{{addressStore.defaultAddress.detail}}</text>
				</view>
			</template>
		</up-card>
		<up-card :show-head="false" :border="false" box-shadow="0px 0px 16px rgba(0, 0, 0, 0.25)">
			<template #body>
				<view v-for="(item, index) in shoppingCartStore.shoppingCart" :key="index">
					<view style="display: flex; flex-direction: row; justify-content: space-between;">
						<up-image :src="item.image" width="80px" height="80px"></up-image>
						<view style="display: flex; flex-direction: column; justify-content: space-between; width: 180px;">
							<text style="color: #1d1d1f; font-size: 16px;">{{ item.name }}</text>
							<text style="color: #ff2124;">{{ '￥' + item.amount }}</text>
						</view>
						<view style="display: flex; flex-direction: column; justify-content: flex-end;">
							<view style="display: flex; flex-direction: row; justify-content: center; gap: 6px;">
								<text style="font-size: 18px;">{{'x' + item.number }}</text>
							</view>
						</view>
					</view>
					<hr v-if="index < shoppingCartStore.shoppingCart.length - 1" style=" margin-top: 15px; margin-bottom: 15px;">
				</view>
			</template>
			<template #foot>
				<view style="display: flex; flex-direction: column;">
					<view style="display: flex; flex-direction: row; justify-content: space-between; margin-bottom: 10px;">
						<text style="color: #1d1d1f;">打包费：</text>
						<text style="color: #ff2124;">{{ '￥' + shoppingCartStore.shoppingCart.length }}</text>
					</view>
					<view style="display: flex; flex-direction: row; justify-content: space-between; margin-bottom: 10px;">
						<text style="color: #1d1d1f;">配送费：</text>
						<text style="color: #ff2124;">{{ '￥' + 5 }}</text>
					</view>
					<view style="display: flex; flex-direction: row; justify-content: space-between;">
						<text style="color: #1d1d1f; font-size: 24px; font-weight: bold;">合计：</text>
						<view>
							<text style="color: #ff2124;">￥</text>
							<text style="color: #ff2124; font-size: 24px; font-weight: bold;">{{ shoppingCartStore.total + shoppingCartStore.shoppingCart.length + 5 }}</text>
						</view>
					</view>
				</view>
			</template>
		</up-card>
		<view @click="onSubmit" style="width: 354px; height: 52px; position: fixed; bottom: 50px; left: 50%; transform: translateX(-50%); display: flex; justify-content: center; align-items: center; background-color: #f7a557; border-radius: 16px; box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.25);">
			<text style="color: #fff; font-size: 20px; font-weight: bold;">去支付</text>
		</view>
	</view>
</template>

<script setup>
import {ref, reactive} from 'vue'
import {onLoad, onShow} from '@dcloudio/uni-app'
import { useShoppingCartStore } from '@/store/shoppingCart'
import { useAddressStore } from '@/store/address'
import { useOrderStore } from '@/store/order'

const shoppingCartStore = useShoppingCartStore()
const addressStore = useAddressStore()
const orderStore = useOrderStore()

const sexMap = {
	0:'女士',
	1:'先生'
}

function onSetAddress() {
	uni.navigateTo({
		url:'/pages/address/address'
	})
}

async function onSubmit() {
	await orderStore.submitOrder(addressStore.defaultAddress.id, shoppingCartStore.shoppingCart.length, shoppingCartStore.total + shoppingCartStore.shoppingCart.length + 5)
	uni.navigateTo({
		url:'/pages/pay/pay'
	})
}



onShow(async()=>{
	await addressStore.getDefault()
})
</script>

<style>
.content{
	padding: 15px;
}
</style>
