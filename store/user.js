import { defineStore } from "pinia"
import {ref} from "vue";
import {apiLogin, apiLogout, apiProfile, apiEditProfile} from '@/utils/api/user.js'

export const useUserStore = defineStore('user', () => {
    const id = ref(0)
    const openid = ref('')
    const token = ref('')
	const name = ref('')
	const phone = ref('')
	const sex = ref('')
	const idNumber = ref('')
	const avatar = ref('')
	const createTime = ref('')

    async function login(){
        try {
            // 1. 获取微信小程序登录 code
            const loginRes = await new Promise((resolve, reject) => {
                uni.login({
                    provider: 'weixin',
                    success: (res) => {
                        resolve(res)
                    },
                    fail: (err) => {
                        reject(err)
                    }
                })
            })
        
            // 2. 携带 code 向后端请求登录
            const res = await apiLogin({ code: loginRes.code })

            // 3. 存储登录结果
            id.value = res.id
            openid.value = res.openid
            token.value = res.token
        
            console.log('用户id',id.value)
            console.log('用户openid',openid.value)
            console.log('微信自动登录成功')
          } catch (err) {
            console.error('微信登录失败', err)
          }
    }

    async function getProfile(){
        try {
            const res = await apiProfile()
            name.value = res.name
            phone.value = res.phone
            sex.value = res.sex
            idNumber.value = res.idNumber
            avatar.value = res.avatar
            createTime.value = res.createTime
        }catch(err){
            console.error('获取用户信息失败', err)
        }
    }

    async function editProfile(params){
        try {
        	await apiEditProfile(params)
            uni.showToast({
                title: '修改成功',
                icon: 'success'
            })
        }catch(err){
            console.error('修改用户信息失败', err)
        }
    }

    return{id, openid, token, name, phone, sex, idNumber, avatar, createTime, login, getProfile, editProfile}
})