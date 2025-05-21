<template>
	<view class="content">
		<up-form labelPosition="left" labelWidth="100" :model="form" :rules="rules" style="margin-bottom: 20px;">
			<up-form-item prop="avatar" label="头像">
				<up-upload @afterRead="afterRead" :deletable="false" :maxCount="1" :max-size="5*1024*1024"></up-upload>
			</up-form-item>
			<up-form-item prop="name" label="用户名">
				<up-input v-model="form.name" placeholder="请输入内容"></up-input>
			</up-form-item>
			<up-form-item prop="phone" label="电话号码">
				<up-input v-model="form.phone" placeholder="请输入内容"></up-input>
			</up-form-item>
			<up-form-item prop="sex" label="性别">
				<up-radio-group v-model="form.sex" placement="row">
					<up-radio name="1" label="男"></up-radio>
					<up-radio name="0" label="女"></up-radio>
				</up-radio-group>
			</up-form-item>
			<up-form-item prop="idNumber" label="身份证">
				<up-input v-model="form.idNumber" placeholder="请输入内容"></up-input>
			</up-form-item>
		</up-form>
		<up-button type="primary" @click="onSubmit">提交</up-button>
	</view>
</template>

<script setup>
import {ref, reactive} from 'vue'
import {onLoad, onShow} from '@dcloudio/uni-app'
import { useUserStore } from '@/store/user.js'
import { apiUpload } from '@/utils/api/common.js'

const userStore = useUserStore()

const form = reactive({
	name:userStore.name,
	phone:userStore.phone,
	sex:userStore.sex,
	idNumber:userStore.idNumber,
	avatar:userStore.avatar
})

const rules = reactive({
	name:{
		type:'string',
		required:true,
		message:'请输入用户名',
		trigger: ['blur', 'change']
	},
	phone:{
		type:'string',
		required:true,
		message:'请输入电话号码',
		trigger: ['blur', 'change']
	},
	sex:{
		type:'string',
		required:true,
		message:'请输入性别',
		trigger: ['blur', 'change']
	},
	idNumber:{
		type:'string',
		required:true,
		message:'请输入身份证',
		trigger: ['blur', 'change']
	}
})

async function afterRead(file, lists, name){
	try{
		const res = await apiUpload(file.file.url)
		form.avatar = res
		await onSubmit()
	}catch(err){
		console.error('图片上传失败', err)
	}
}

async function onSubmit() {
	try{
		await userStore.editProfile(form)
		setTimeout(() => {
		  uni.navigateBack()
		}, 1000)
	}catch(err){
		console.error('提交失败', err)
	}
	
}

</script>

<style>
.content{
	padding: 15px;
}
</style>
