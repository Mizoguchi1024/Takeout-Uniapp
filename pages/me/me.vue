<template>
	<view class="content">
		<view style="width: 100%; display: flex; flex-direction: row; justify-content: space-between; align-items: center;">
			<view @click="onProfileClicked" style="display: flex; flex-direction: row; align-items: center;  gap: 10px;">
				<up-avatar :src="userStore.avatar" size="42" mode="aspectFill"></up-avatar>
				<text style="color: #1d1d1f; font-size: 20px; font-weight: bold;">{{ userStore.name || '默认用户名' }}</text>
			</view>
			<up-icon @click="onChatClicked" name="chat" size="40"></up-icon>
		</view>
		<up-card title="吃货卡" title-color="#fff" title-size="20" :head-style="{'font-weight':'bold', 'transform': 'skewX(-10deg)'}" padding="10" margin="10px" border-radius="32rpx" :border="false" :head-border-bottom="false" :foot-border-top="false" box-shadow="0px 0px 16px rgba(0, 0, 0, 0.25)" style="width: 100%; background: linear-gradient(to right bottom, #05a1f4, #29c8ff 60%, #18f4ff 100%);">
			<template #body>
				<view style="display: flex; flex-direction: column; color: #fff; gap: 10px;">
					<text style="font-weight: bold;">{{'吃货豆：' + point}}</text>
					<text>升级超级吃货卡，下单 5 倍返吃货豆&gt;</text>
				</view>
			</template>
		</up-card>
		<up-card title="常用功能" title-color="#000" title-size="20" padding="12" margin="10px" border-radius="32rpx" :border="false" :head-border-bottom="false" :foot-border-top="false" box-shadow="0px 0px 16px rgba(0, 0, 0, 0.25)" style="width: 100%; background-color: #fff;">
			<template #body>
				<up-grid :border="false" col="4" @click="onCommonFunctionClicked">
					<up-grid-item v-for="(item, index) in commonFunctionList" :key="index" :name="item.title">
						<up-image :src="item.icon" width="42" height="42"></up-image>
						<text>{{item.title}}</text>
					</up-grid-item>
				</up-grid>
			</template>
		</up-card>
		<up-card title="互动玩乐" title-color="#000" title-size="20" padding="12" margin="10px" border-radius="32rpx" :border="false" :head-border-bottom="false" :foot-border-top="false" box-shadow="0px 0px 16px rgba(0, 0, 0, 0.25)" style="width: 100%; background-color: #fff;">
			<template #body>
				<up-grid :border="false" col="4" @click="onGameClicked">
					<up-grid-item v-for="(item, index) in gameList" :key="index">
						<up-image :src="item.icon" width="42" height="42"></up-image>
						<text>{{item.title}}</text>
					</up-grid-item>
				</up-grid>
			</template>
		</up-card>
		<up-card title="更多推荐" title-color="#000" title-size="20" padding="12" margin="10px" border-radius="32rpx" :border="false" :head-border-bottom="false" :foot-border-top="false" box-shadow="0px 0px 16px rgba(0, 0, 0, 0.25)" style="width: 100%; background-color: #fff;">
			<template #body>
				<up-grid :border="false" col="4" @click="onRecommendClicked">
					<up-grid-item v-for="(item, index) in recommendList" :key="index" :name="item.title" style="margin-bottom: 20px;">
						<up-image :src="item.icon" width="42" height="42"></up-image>
						<text>{{item.title}}</text>
					</up-grid-item>
				</up-grid>
			</template>
		</up-card>
	</view>
</template>

<script setup>
import {ref, reactive} from 'vue'
import { useUserStore } from '@/store/user.js'

const userStore = useUserStore()

function onProfileClicked() {
	uni.navigateTo({
	    url: '/pages/profile/profile'
	})
}

function onChatClicked(){
	uni.navigateTo({
	    url: '/pages/message/message'
	})
}

const point = ref(100)

const commonFunctionList = reactive([
	{
		icon:'/static/icons/coupon.png',
		title:'红包卡券'
	},
	{
		icon:'/static/icons/heart.png',
		title:'关注'
	},
	{
		icon:'/static/icons/customer_service.png',
		title:'客服'
	},
	{
		icon:'/static/icons/address.png',
		title:'地址'
	}
])

function onCommonFunctionClicked(name) {
	if(name === '地址'){
		uni.navigateTo({
			url: '/pages/address/address'
		})
	}else{
		uni.showToast({
			icon:'error',
			title:'该页面未开发'
		})
	}
}


const gameList = reactive([
	{
		icon:'/static/icons/red_envelope.png',
		title:'红包提款机'
	},
	{
		icon:'/static/icons/red_envelope.png',
		title:'赚吃货豆'
	},
	{
		icon:'/static/icons/red_envelope.png',
		title:'天天赚现金'
	},
	{
		icon:'/static/icons/red_envelope.png',
		title:'冲吧哈基阳'
	}
])

function onGameClicked() {
	uni.showToast({
		icon:'error',
		title:'该页面未开发'
	})
}

const recommendList = reactive([
	{
		icon:'/static/icons/address.png',
		title:'我的地址'
	},
	{
		icon:'/static/icons/follow.png',
		title:'店铺关注'
	},
	{
		icon:'/static/icons/card.png',
		title:'干饭神卡'
	},
	{
		icon:'/static/icons/run.png',
		title:'邀友跑单'
	},
	{
		icon:'/static/icons/about.png',
		title:'关于我们'
	},
	{
		icon:'/static/icons/collaboration.png',
		title:'商务合作'
	},
	{
		icon:'/static/icons/volunteer.png',
		title:'公益活动'
	},
	{
		icon:'/static/icons/flower.png',
		title:'评价中心'
	},
])

function onRecommendClicked(name) {
	if(name === '我的地址'){
		uni.navigateTo({
			url: '/pages/address/address'
		})
	}else{
		uni.showToast({
			icon:'error',
			title:'该页面未开发'
		})
	}
}

</script>

<style scoped>
.content {
	height: 100vh;
	padding: 18px;
	display: flex;
	flex-direction: column;
	align-items: center;
	background-color: #f2f2f2;
}
</style>
