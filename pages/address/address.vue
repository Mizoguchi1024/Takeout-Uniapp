<template>
	<view class="content">
		<up-card v-for="(address, addressIndex) in addressStore.addressList" :key="addressIndex" :title="address.consignee + ' ' + sexMap[address.sex]" :sub-title=address.phone>
			<template #body>
				<view style="display: flex; flex-direction: column;">
					<text>{{address.provinceName + address.cityName + address.districtName + address.detail}}</text>
				</view>
			</template>
			<template #foot>
				<view style="display: flex; flex-direction: row; justify-content: space-between;">
					<up-checkbox :customStyle="{marginBottom: '8px'}" label="默认地址" name="agree" usedAlone v-model:checked="aloneChecked"></up-checkbox>
					<view style="display: flex; flex-direction: row; gap: 10px;">
						<up-button text="修改" type="primary" shape="circle"></up-button>
						<up-button text="删除" type="error" shape="circle"></up-button>
					</view>
				</view>
			</template>
		</up-card>
	</view>
</template>

<script setup>
import {ref, reactive} from 'vue'
import {onLoad} from '@dcloudio/uni-app'
import { useAddressStore } from '@/store/address'

const addressStore = useAddressStore()

const sexMap={
	0:'先生',
	1:'女士'
}


onLoad(async()=>{
	await addressStore.getAddressList()
	console.log('地址', addressStore.addressList)
})

</script>

<style>
.content{
	padding: 15px;
	display: flex;
	flex-direction: column;
	justify-content: start;
}
</style>
