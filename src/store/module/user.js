// import { login, logout, getUserInfo,loginsms } from '@/api/user'
import { setToken, getToken } from '@/libs/util'

export default {
  state: {
    userName: '',
    userId: '',
    avatorImgPath: '',
    token: getToken(),
    access: '',
    userdata:''
  },
  mutations: {
    setAvator (state, avatorPath) {
      state.avatorImgPath = avatorPath
    },
    setUserId (state, id) {
      state.userId = id
    },
    setUserName (state, name) {
      state.userName = name
    },
    setAccess (state, access) {
      state.access = access
    },
    setToken (state, token) {
      state.token = token
      setToken(token)
    },
    setUserdata (state,userdatas) {
      state.userdata = userdatas
    }
  },
  actions: {
    // 登录
    handleLogin ({ commit }, {userName, password}) {
      userName = userName.trim()
      return new Promise((resolve, reject) => {
        login({
          userName,
          password
        }).then(res => {
          if (res.res_code == 1) {
            const data = res.data
            commit('setToken', data.token)
          }
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    handleLoginsms ({ commit }, {phone, sms}) {
      phone = phone.trim()
      return new Promise((resolve, reject) => {
        loginsms({
          phone,
          sms
        }).then(res => {
          if (res.res_code == 1) {
            const data = res.data
            commit('setToken', data.token)
          }
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    // 退出登录
    handleLogOut ({ state, commit }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('setToken', '')
          commit('setAccess', [])
          resolve()
        }).catch(err => {
          reject(err)
        })
        // 如果你的退出登录无需请求接口，则可以直接使用下面三行代码而无需使用logout调用接口
        // commit('setToken', '')
        // commit('setAccess', [])
        // resolve()
      })
    },
    // 获取用户相关信息
    getUserInfo ({ state, commit }) {
      return new Promise((resolve, reject) => {
        getUserInfo(state.token).then(res => {
          const data = res.data
          if (res.res_code == 1) {
            commit('setAvator', data.avator)
            commit('setUserName', data.user_name)
            commit('setUserId', data.user_id)
            commit('setAccess', data.access)
            resolve(data)
          }else{
            resolve(data)
          }
        }).catch(err => {
          reject(err)
        })
      })
    },
    setUserData({ commit },data){
      commit('setUserdata', data)
    }
  }
}
