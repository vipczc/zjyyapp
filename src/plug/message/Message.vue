<template>
    <div v-show="show">
    <transition name="fade">
        <div class="message">
            <!-- <i class="message-icon el-icon-info"></i> -->
            <p class="message-text">{{message}}</p>
            <div class="message_end">
              <div @click="waiting()" class="left">
                <p>等待</p>
              </div>
              <div @click="back()" class="right">
                <p>返回</p>
              </div>
            </div>
        </div>
    </transition>
    </div>
</template>

<script>
import Cookies from 'js-cookie'
export default {
  data() {
    return {
      show: false,
      message: "",
      duration:3000,
    };
  },
  methods:{
    waiting(){
      this.show = false
    },
    back(){
      Cookies.set("hos_name",""),
      Cookies.set("top_url",""),
      Cookies.set("user_name",""),
      window.location.href = "/login"
    }
  }
};
</script>

<style scoped>
.message {
      /* display: flex;
    justify-content: center;
    align-items: center; */
    position: fixed;
    top: 40%;
    left: 40%;
    margin-left: -15vw;
    padding: 1vw;
    width: 50vw;
    font-size: 1vw;
    color: #000;
    background-color: #eef2fb;
    z-index: 99999;
    border: 1px solid #d2d2d2;
    height: 20vw;
    width: 3rem;
    height: 1.65rem;
    background: #ffffff;
    border-radius: 10px;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
}
.message-icon{
  margin-right:.5vw;
}
.message-text{
  /* text-align:center;
  margin-top: 2vw;
  margin-bottom: 4vw; */
      font-family: PingFangSC-Regular;
    font-size: 0.16rem;
    color: #212121;
    letter-spacing: 0;
    text-align: center;
    margin-top: 0.29rem;
    margin-bottom: 0.3rem;
}
.fade-enter-active,
.fade-leave-active {
  transition: 0.3s ease-out;
}
.fade-enter {
  opacity: 0;
  transform: scale(1.2);
}
.fade-leave-to {
  opacity: 0;
  transform: scale(0.8);
}
.message_end{
      display: flex;
    align-items: center;
    justify-content: space-around;
}
.message_end .left{
  width: 1.2rem;
    height: 0.4rem;
    background: #FFFFFF;
    border: 1px solid #277FFF;
    border-radius: 20px;
    margin-right: 0.1rem;
        font-family: PingFangSC-Regular;
    font-size: 0.15rem;
    color: #277FFF;
    letter-spacing: 0;
    text-align: center;
    line-height: 0.4rem;
}
.message_end .right{
      width: 1.2rem;
    height: 0.4rem;
    background: #277FFF;
    border-radius: 20px;
    margin-left: 0.1rem;
    font-family: PingFangSC-Regular;
    font-size: 0.15rem;
    color: #FFFFFF;
    letter-spacing: 0;
    text-align: center;
    line-height: 0.4rem;

}
</style>