import Vue from 'vue'
import Vuex from 'vuex'
// import env from '_conf/env'

import user from './module/user'
import project from './module/project'
import main from './main'

Vue.use(Vuex)

let env = process.env.NODE_ENV

export default new Vuex.Store({
  strict: env === 'development',
  ...main,
  modules: {
    user,
    project
  }
})
