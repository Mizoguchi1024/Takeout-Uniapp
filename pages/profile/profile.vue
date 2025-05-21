<template>
	<view class="content">
		<up-cell-group title="个人资料设置" style="width: 100%;">
			<up-cell title="头像" url="pages/profileEdit/profileEdit" isLink>
				<template #value>
					<up-avatar :src="userStore.avatar" size="42" mode="aspectFill"></up-avatar>
				</template>
			</up-cell>
			<up-cell title="用户ID" :value="userStore.id"></up-cell>
			<up-cell title="OPEN ID" :value="userStore.openid"></up-cell>
			<up-cell title="用户名" :value="userStore.name == null ? '未设定' : userStore.name" url="pages/profileEdit/profileEdit" isLink></up-cell>
			<up-cell title="电话号码" :value="userStore.phone == null ? '未设定' : userStore.phone" url="pages/profileEdit/profileEdit" isLink></up-cell>
			<up-cell title="性别" :value="userStore.sex == null ? '未设定' : sexMap[userStore.sex]" url="pages/profileEdit/profileEdit" isLink></up-cell>
			<up-cell title="身份证" :value="userStore.idNumber == null ? '未设定' : userStore.idNumber" url="pages/profileEdit/profileEdit" isLink></up-cell>
			<up-cell title="创建时间" :value="userStore.createTime"></up-cell>
		</up-cell-group>
	</view>
</template>

<script setup>
import {ref, reactive} from 'vue'
import {onLoad, onShow} from '@dcloudio/uni-app'
import { useUserStore } from '@/store/user.js'

const userStore = useUserStore()

const sexMap={
	0:'女',
	1:'男'
}

onShow(async()=>{
	try{
		await userStore.getProfile()
	}catch(err){
		console.error('刷新失败', err)
	}
	
})
</script>

<style scoped>
.content {
	padding: 15px;
	display: flex;
	flex-direction: column;
	align-items: center;
}
</style>
