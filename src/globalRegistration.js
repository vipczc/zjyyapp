import Vue from 'vue'
import config from './config'
import LoadingY from './plug/loading/index'
import Message from "./plug/message/index";
import Mint from 'mint-ui';


/**
 * @description 全局注册应用配置
 */
Vue.prototype.$config = config

// 注册loading 插件
Vue.use(LoadingY)
Vue.use(Message)
Vue.use(Mint)

// 调用loading 插件
// let loadingInstance = this.$LoadingY({message: "加载中，请稍后",show: true})
// loadingInstance.close()