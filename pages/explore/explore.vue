<template>
	<view class="content">
		<up-card title="吃货卡" title-color="#fff" title-size="32" padding="12" margin="0px" border-radius="32rpx" :border="false" :head-border-bottom="false" :foot-border-top="false" box-shadow="0px 0px 16px rgba(0, 0, 0, 0.25)" style="background: linear-gradient(to right bottom, #05a1f4, #29c8ff);">
			<template #body>
				<view>
					<text style="color: #fff; font-size: 22px;">吃货豆</text>
				</view>
				<view>
					<text style="color: #fff; font-size: 34px; font-weight: bold;">{{point}}</text>
				</view>
			</template>
			<template #foot>
				<view>
					<text style="color: #fff; font-size: 14px;">升级超级吃货卡享 5 倍反豆</text>
				</view>
			</template>
		</up-card>
		<up-card title="超级吃货卡" title-color="#cc6600" title-size="18" thumb="/static/icons/crown.png" thumb-width="38rpx" padding="12" margin="0px" border-radius="32rpx" :border="false" :head-border-bottom="false" :foot-border-top="false" box-shadow="0px 0px 16px rgba(0, 0, 0, 0.25)" style="background-color: #fff;">
			<template #body>
				<view style="width: 100%; display: flex; flex-direction: row; justify-content: space-between;">
					<text style="color: #cc6600; font-size: 14px;">每月得20元红包，5倍返吃货豆</text>
					<up-button text="￥0.5 开通" @click="onVipButtonClicked" size="mini" shape="circle" color="#cd8e49" style="width: 80px; margin: 0;"></up-button>
				</view>
			</template>
		</up-card>
		<up-card title="做任务赚吃货豆" @foot-click="onShowTaskClicked" title-color="#000" title-size="16" padding="12" margin="0px" border-radius="32rpx" :border="false" :head-border-bottom="false" :foot-border-top="false" box-shadow="0px 0px 16px rgba(0, 0, 0, 0.25)" style="background-color: #fff;">
			<template #body>
				<view style="display: flex; flex-direction: row; justify-content: space-between; margin-bottom: 20px;">
					<up-image src="/static/icons/cake.png" width="40" height="40"></up-image>
					<view style="display: flex; flex-direction: column;">
						<text style="color: #000;">美食外卖今天下1单 吃货豆+100</text>
						<text style="font-size: 10px;">每单实付满20元，截止5月20日23:59:59</text>
					</view>
					<up-button text="领任务" @click="onTaskButtonClicked" size="mini" shape="circle" color="#ff3300" style="width: 70px; margin: 0;"></up-button>
				</view>
				<hr>
				<view style="display: flex; flex-direction: row; justify-content: space-between; margin-top: 20px;">
					<up-image src="/static/icons/red_envelope.png" width="40" height="40"></up-image>
					<view style="display: flex; flex-direction: column;">
						<text style="color: #000;">吃货红包天天膨胀 吃货豆+100</text>
						<text style="font-size: 10px;">门槛不变金额最高28元</text>
					</view>
					<up-button text="领任务" @click="onTaskButtonClicked" size="mini" shape="circle" color="#ff3300" style="width: 70px; margin: 0;"></up-button>
				</view>
			</template>
			<template #foot>
				<view style="display: flex; justify-content: center;">
					<text style="color: #000;">查看全部20个任务&gt;</text>
				</view>
			</template>
		</up-card>
	</view>
</template>

<script setup>
import {ref} from 'vue'

const point = ref(100)

function onVipButtonClicked() {
	uni.showToast({
		icon:'error',
		title: '该功能未开发'
	})
}

function onTaskButtonClicked() {
	uni.showToast({
		title: '直接送你了'
	})
	point.value+=100
}

function onShowTaskClicked() {
	uni.showToast({
		icon:'error',
		title: '此页面未开发'
	})
}

</script>

<style scoped>
.content{
	height: 100vh;
	padding: 20px;
	display: flex;
	flex-direction: column;
	gap: 16px;
	background: linear-gradient(to bottom, #18b5f8, #18b5f8 15%, #f2f2f2 26%);
}  
</style>
