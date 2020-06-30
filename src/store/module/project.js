import { getToken } from '@/libs/util'
// import { getProductListForMyself } from '@/api/project'


export default {
    state: {
      token: getToken(),
      data:''
    },
    mutations: {
      setProject (state, access) {
        state.data = access
      },
    },
    actions: {
      // 获取用户相关信息
      getProductListForMyself ({ state, commit }) {
        return new Promise((resolve, reject) => {
          getProductListForMyself(getToken()).then(res => {
            var data = res.data
            commit('setProject', data)
            resolve(data)
          }).catch(err => {
            reject(err)
          })
        })
      }
    }
  }