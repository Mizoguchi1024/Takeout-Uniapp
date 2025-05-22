<template>
	<view class="content">
		<up-empty v-if="shoppingCartStore.shoppingCart.length === 0" mode="car" style="height: 100vh; display: flex; flex-direction: column; justify-content: center;"></up-empty>
		<view v-else>
			<up-card v-for="(item, index) in shoppingCartStore.shoppingCart" :key="index" :show-head="false" :border="false" box-shadow="0px 0px 16px rgba(0, 0, 0, 0.25)">
				<template #body>
					<view style="display: flex; flex-direction: row; justify-content: space-between;">
						<up-image :src="item.image" width="100px" height="100px"></up-image>
						<view style="display: flex; flex-direction: column; justify-content: space-between; width: 120px;">
							<text style="color: #1d1d1f; font-size: 20px;">{{ item.name }}</text>
							<text style="color: red; font-size: 20px;">{{ '￥' + item.amount }}</text>
						</view>
						<view style="display: flex; flex-direction: column; justify-content: flex-end;">
							<view style="display: flex; flex-direction: row; justify-content: center; gap: 6px;">
								<up-icon @click="onSubClicked(item.dishId)" name="minus-circle" color="#f7a557" size="28"></up-icon>
								<text style="font-size: 18px;">{{ item.number }}</text>
								<up-icon @click="onAddClicked(item.dishId)" name="plus-circle-fill" color="#f7a557" size="28"></up-icon>
							</view>
						</view>
					</view>
				</template>
			</up-card>
			<view style="width: 354px; position: fixed; bottom: 50px; left: 50%; transform: translateX(-50%); display: flex; flex-direction: row; justify-content: space-between;">
				<view @click="onSubmitClicked" style="width: 260px; height: 52px; display: flex; justify-content: center; align-items: center; background-color: #f7a557; border-radius: 16px; box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.25);">
					<text style="color: #fff; font-size: 20px; font-weight: bold;">去结算</text>
				</view>
				<view @click="onCleanClicked" style="background-color: #fff; border-radius: 50%; box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.25);">
					<up-icon name="trash" color="#ff2124" size="34" style="margin: 8px;"></up-icon>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
import {ref, reactive} from 'vue'
import {onLoad, onShow} from '@dcloudio/uni-app'
import { useShoppingCartStore } from '@/store/shoppingCart'

const shoppingCartStore = useShoppingCartStore()

async function onSubClicked(dishId) {
	await shoppingCartStore.subShoppingCart(dishId)
	await shoppingCartStore.getShoppingCart()
}

async function onAddClicked(dishId) {
	await shoppingCartStore.addShoppingCart(dishId)
	await shoppingCartStore.getShoppingCart()
}

function onSubmitClicked() {
	uni.navigateTo({
		url:'/pages/submitOrder/submitOrder'
	})
}

async function onCleanClicked() {
	await shoppingCartStore.cleanShoppingCart()
	await shoppingCartStore.getShoppingCart()
}

onShow(async()=>{
	await shoppingCartStore.getShoppingCart()
})

</script>

<style>
.content{
	padding: 15px;
	display: flex;
	flex-direction: column;
	justify-content: start;
	align-items: stretch;
}
</style>