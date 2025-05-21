import { defineStore } from "pinia"
import {ref} from "vue";
import {apiLogin, apiLogout} from '@/utils/api/user.js'

export const useUserStore = defineStore('user', () => {
    const id = ref(0)
    const openid = ref('')
    const token = ref('')

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
            const { id: userId, openid: userOpenid, token: userToken } = res
            id.value = userId
            openid.value = userOpenid
            token.value = userToken
        
            console.log('用户id',id.value)
            console.log('用户openid',openid.value)
            console.log('微信自动登录成功')
          } catch (err) {
            console.error('微信登录失败', err)
          }
    }

    return{id, openid, token, login}
})