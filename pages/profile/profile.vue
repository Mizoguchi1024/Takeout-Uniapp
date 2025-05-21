<template>
	<view class="content">
		<up-cell-group title="个人资料设置" style="width: 100%;">
			<up-cell title="头像" isLink>
				<template #value>
					<up-image :src="avatarSrc" width="40" height="40" shape="circle"></up-image>
				</template>
			</up-cell>
			<up-cell title="用户昵称" :value="username" isLink></up-cell>
			<up-cell title="账号" :value="account" isLink></up-cell>
			<up-cell title="收货地址" isLink></up-cell>
		</up-cell-group>
	</view>
</template>

<script setup>
import {ref, reactive} from 'vue'
import {onLoad} from '@dcloudio/uni-app'

const avatarSrc = ref('')
const username = ref('用户名')
const account = ref('账号')
</script>

<style scoped>
.content {
	padding: 15px;
	display: flex;
	flex-direction: column;
	align-items: center;
}
</style>
