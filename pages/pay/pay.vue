<template>
	<view class="content">
		<view style="display: flex; flex-direction: column; align-items: center; gap: 10px;">
			<text>{{ '订单号：' + orderStore.submitResult.orderNumber }}</text>
			<text style="font-size: 28px;">{{ '总金额：￥' + orderStore.submitResult.orderAmount }}</text>
			<text>{{ '剩余时间：' + minutes + '分' + seconds + '秒' }}</text>
		</view>
		<view @click="onPay" style="width: 354px; height: 52px; position: fixed; bottom: 50px; left: 50%; transform: translateX(-50%); display: flex; justify-content: center; align-items: center; background-color: #f7a557; border-radius: 16px; box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.25);">
			<text style="color: #fff; font-size: 20px; font-weight: bold;">使用魔法支付</text>
		</view>
	</view>
</template>

<script setup>
import { useOrderStore } from '@/store/order'
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

const orderStore = useOrderStore()

async function onPay() {
	await orderStore.payOrder()
	uni.showToast({
		title:'支付成功'
	})
	setTimeout(() => {
		uni.switchTab({
			url: '/pages/index/index'
		})
	}, 1000)
}

const totalSeconds = 15 * 60
const timeLeft = ref(totalSeconds)
let timer = null

const minutes = computed(() => {
  const m = Math.floor(timeLeft.value / 60)
  return m.toString().padStart(2, '0')
})

const seconds = computed(() => {
  const s = timeLeft.value % 60
  return s.toString().padStart(2, '0')
})

onMounted(() => {
  timer = setInterval(() => {
    if (timeLeft.value > 0) {
      timeLeft.value--
    } else {
      clearInterval(timer)
    }
  }, 1000)
})

onBeforeUnmount(() => {
  if (timer) clearInterval(timer)
})
</script>


<style>
.content{
	padding: 15px;
}
</style>
