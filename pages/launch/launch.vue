<template>
	<view class="content">
		<up-tag :text="countdownText" @click="onTagClicked" style="position: fixed; top: 10px; right: 10px; z-index: 2000;" shape="circle" color="#000000" bgColor="#f2f2f2" borderColor="#f2f2f2"></up-tag>
		<up-image src="/static/launch.png" width="100vw" height="100vh"></up-image>
	</view>
</template>

<script setup>
import {computed, ref} from 'vue'
import {onLoad, onUnload} from '@dcloudio/uni-app'

const countdown = ref(3)
let timer = null

const countdownText= computed(()=>{
	return '跳过 ' + countdown.value + 'S'
})

function startCountDown() {
	countdown.value = 3
	timer = setInterval(() => {
	    if (countdown.value > 0) {
	      countdown.value--;
	    }
		else {
			clearInterval(timer);
			uni.switchTab({
				url: '/pages/index/index'
			});
	    }
	}, 1000);
}

function onTagClicked() {
	uni.switchTab({
		url: '/pages/index/index'
	});
}

onLoad(()=>{
	startCountDown()
})

onUnload(()=>{
	if (timer) clearInterval(timer)
})
</script>

<style>
	.content {
		padding-inline: 5px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
</style>
