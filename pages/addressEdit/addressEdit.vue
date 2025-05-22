<template>
	<view class="content">
		<up-form labelPosition="left" labelWidth="100" :model="form" :rules="rules" style="margin-bottom: 20px;">
			<up-form-item prop="consignee" label="收货人">
				<up-input v-model="form.consignee" placeholder="请输入内容"></up-input>
			</up-form-item>
			<up-form-item prop="sex" label="性别">
				<up-radio-group v-model="form.sex" placement="row">
					<up-radio name="1" label="先生"></up-radio>
					<up-radio name="0" label="女士"></up-radio>
				</up-radio-group>
			</up-form-item>
			<up-form-item prop="phone" label="电话号码">
				<up-input v-model="form.phone" placeholder="请输入内容"></up-input>
			</up-form-item>
			<up-form-item prop="region" label="省市区">
				<up-picker
				:show="showPicker"
				ref="uPickerRef"
				:columns="areaList"
				keyName="areaName"
				@confirm="confirm"
				@change="changeHandler"
				@cancel="showPicker = false"
				></up-picker>
				<up-button @click="showPicker = true" :text="regionText === '' ? '请选择省市区' : regionText"></up-button>
			</up-form-item>
			<up-form-item prop="detail" label="详细地址">
				<up-input v-model="form.detail" placeholder="请输入内容"></up-input>
			</up-form-item>
		</up-form>
		<up-button text="提交" type="primary" @click="onSubmit"></up-button>
	</view>
</template>

<script setup>
import {onLoad} from '@dcloudio/uni-app'
import {reactive, ref, onMounted} from 'vue'
import { useAddressStore } from '@/store/address.js'
import pcaCode from '@/static/pca-code.json'

const addressStore = useAddressStore()

const id = ref('')
const method = ref('')

const form = reactive({
	id: null,
	userId: null,
	consignee: null,
	sex: null,
	phone: null,
	provinceName: null,
	provinceCode: null,
	cityName: null,
	cityCode: null,
	districtName: null,
	districtCode: null,
	detail: null,
	label: null,
	isDefault: null
})

const rules = reactive({
	consignee:{
		type:'string',
		required:true,
		message:'请输入收货人',
		trigger: ['blur', 'change']
	},
	sex:{
		required:true,
		message:'请选择性别',
		trigger: ['blur', 'change']
	},
	phone:{
		type:'string',
		required:true,
		message:'请输入电话号码',
		trigger: ['blur', 'change']
	},
	detail:{
		type:'string',
		required:true,
		message:'请输入详细地址',
		trigger: ['blur', 'change']
	}
})

async function onSubmit(){
	try{
		if(method.value === 'insert'){
			await addressStore.insertAddress(form)
			setTimeout(() => {
			uni.navigateBack()
			}, 1000)
		}else if(method.value === 'update'){
			await addressStore.updateAddress(form)
			setTimeout(() => {
			uni.navigateBack()
			}, 1000)
		}
	}catch(err){
		console.error('提交失败', err)
	}
}

const showPicker = ref(false)
const regionText = ref('')
const areaList = reactive([[], [], []]) // 初始化为 3 级空数组
const uPickerRef = ref(null)

// 格式转换函数
function convertToPickerData(data) {
  return data.map(province => ({
    areaName: province.name,
    adcode: province.code,
    areaVo: province.children?.map(city => ({
      areaName: city.name,
      adcode: city.code,
      areaVo: city.children?.map(district => ({
        areaName: district.name,
        adcode: district.code
      })) || []
    })) || []
  }))
}

// 初始化 picker 数据
onMounted(() => {
  const converted = convertToPickerData(pcaCode)
  areaList[0].push(...converted)
  if (areaList[0].length > 0) {
    const firstProvince = areaList[0][0]
    areaList[1].push(...firstProvince.areaVo)
    if (firstProvince.areaVo.length > 0) {
      areaList[2].push(...firstProvince.areaVo[0].areaVo)
    }
  }
})

// 联动处理
const changeHandler = ({ columnIndex, value }) => {
  if (columnIndex === 0) {
    const cities = value[0].areaVo || []
    const districts = cities[0]?.areaVo || []
    uPickerRef.value.setColumnValues(1, cities)
    uPickerRef.value.setColumnValues(2, districts)
  } else if (columnIndex === 1) {
    const districts = value[1].areaVo || []
    uPickerRef.value.setColumnValues(2, districts)
  }
}

// 选择确认后赋值
const confirm = ({ value }) => {
  const [province, city, district] = value
  regionText.value = `${province.areaName} - ${city.areaName} - ${district.areaName}`
  form.provinceName = province.areaName
  form.provinceCode = province.adcode
  form.cityName = city.areaName
  form.cityCode = city.adcode
  form.districtName = district.areaName
  form.districtCode = district.adcode
  showPicker.value = false
}

onLoad(async(options)=>{
	id.value = decodeURIComponent(options.id || '')
	method.value = options.method || ''

	if(method.value === 'update'){
		await addressStore.getAddress(id.value)
		await Object.assign(form, addressStore.address)
		regionText.value = `${form.provinceName} - ${form.cityName} - ${form.districtName}`
	}
})
</script>

<style>
.content{
	padding: 15px;
}
</style>
