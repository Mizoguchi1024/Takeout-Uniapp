<template>
	<view style="display: flex; flex-direction: column; width: 100vw; height: 100vh;">
		<up-sticky bgColor="#f2f2f2">
			<up-tabs :list="tabList" @click="onTabClicked"></up-tabs>
		</up-sticky>
		<view v-if="orderStore.orderList.length == 0" style="flex: 1; display: flex; justify-content: center;">
			<up-empty mode="order"></up-empty>
		</view>
		<view v-else style="flex: 1; display: flex; flex-direction: column; justify-content: start;">
			<up-card v-for="(order, orderIndex) in orderStore.orderList" :key="orderIndex" :title="order.orderTime" :sub-title=statusMap[order.status] :border="false" box-shadow="0px 0px 16px rgba(0, 0, 0, 0.25)">
				<template #body>
					<view style="display: flex; flex-direction: row;">
						<view style="flex: 1; display: flex; flex-direction: row; gap: 20px;">
							<view v-for="(dish, dishIndex) in order.orderDetailList.slice(0, 2)" :key="dishIndex" style="display: flex; flex-direction: column;">
								<up-image :src="dish.image" width="80" height="80"></up-image>
								<text style="max-width: 80px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">{{dish.name}}</text>
							</view>
						</view>
						<view style="display: flex; flex-direction: column;">
							<text style="color: #000; font-weight: bold;">￥{{order.amount}}</text>
							<text>共 {{order.packAmount}} 种</text>
						</view>
					</view>
				</template>
			</up-card>
		</view>
	</view>
</template>

<script setup>
import {ref, reactive} from 'vue'
import { useOrderStore } from '@/store/order'
import {onLoad, onShow} from '@dcloudio/uni-app'

const orderStore = useOrderStore()

const tabList = reactive([
	{
		name: '全部',
		status: null
	},
	{
		name: '待付款',
		status: 1
	},
	{
		name: '待接单',
		status: 2
	},
	{
		name: '已接单',
		status: 3
	},
	{
		name: '派送中',
		status: 4
	},
	{
		name: '已完成',
		status: 5
	},
	{
		name: '已取消',
		status: 6
	}
])

function onTabClicked(item) {
	if(item.status != null){
		orderStore.getOrderList(1, 10, item.status)
	}else{
		orderStore.getOrderList(1, 10)
	}
}

const statusMap = {
  1: '待付款',
  2: '待接单',
  3: '已接单',
  4: '派送中',
  5: '已完成',
  6: '已取消'
}



onShow(async()=>{
	await orderStore.getOrderList(1, 20)
})
</script>

<style>
	       
</style>
