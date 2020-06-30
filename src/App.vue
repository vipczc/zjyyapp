<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import 'mint-ui/lib/style.css'
import Cookies from 'js-cookie'
export default {
  name: 'App',
  mounted() {
    // if (Cookies.get('hos_name')) {
    //   document.title = Cookies.get('hos_name')
    // }
  },
}
</script>

<style lang="less">
.size{
  width: 100%;
  height: 100%;
}
html,body{
  .size;
  // overflow: hidden;
  /deep/ .mint-indicator{
    position: absolute;
    z-index: 99999;
  }
}
#app {
  .size;
  
}
#app {
  font-family: PingFangSC-Regular;
}


</style>
