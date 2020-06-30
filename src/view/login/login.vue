<template>
  <div class="login">
    <div class="login_main">
      <div class="topbanner"></div>
      <div class="login_Topbanner">
        <div class="login_center">
          <!-- <div @click="regist = true" class="login_top">
            <p>{{firstData}}</p>
            <img src="../../assets/images/login/select.png" alt />
          </div> -->
          <div class="centerimg">
            <img src="../../assets/images/imag_logo.png" alt />
          </div>
          <div class="toptext">
            <p>您好，欢迎登录</p>
          </div>
          <div class="login_center_top" @click="popupVisible=true">
            <img src="../../assets/images/icon_yiyuan.png" alt />
            <input  type="text" placeholder="选择基地" :value="firstData" disabled />
          </div>
          <div class="login_center_top">
            <img src="../../assets/images/icon_zhanghao.png" alt />
            <input v-model="userid" type="text" placeholder="账号" />
          </div>
          <div class="login_center_end">
            <img src="../../assets/images/icon_mima.png" alt />
            <input v-model="userpwd" type="password" placeholder="密码" />
          </div>
          <div class="login_remeber">
            <!-- <input id="box" class="box" type="checkbox" /> -->
            <!-- <p>记住密码</p> -->
            <!-- <label for="box">{{box}}</label> -->
            <mt-switch :value.sync="box">记住密码</mt-switch>
          </div>
          <div @click="handleLogin()" class="login_btn">
            <p>登录</p>
          </div>
        </div>
        <div v-show="hideshow" class="login_end">
          <!-- <img src="../../assets/images/logo9.png" alt /> -->
          <p>杭州九划网络科技有限公司版权所有</p>
          <p>版本号1.1</p>
        </div>
      </div>
    </div>
    <!-- 旧版登陆 -->
    <!-- <div v-show="regist == true" @click="regist = false" class="registblock">
      <div class="registblock_main"> -->
        <!-- <p style="color:#277FFF;margin-bottom:0.25rem">丽水基地</p>
        <p>浙二基地</p>-->
        <!-- <p
          :style="firstId == index ? 'color: #277FFF;':''"
          @click="selectScl(index,item.name,item.portalurl)"
          v-for="(item, index) in schData"
          :key="index"
        >{{item.name}}</p>
      </div> -->
    <!-- </div> -->
    <!-- 基地选择 -->
    <mt-popup v-model="popupVisible" position="bottom">
      <p class="poptext" @click="getSlotValue(index)">确定</p>
      <mt-picker :slots="slots" @change="onValuesChange"></mt-picker>
    </mt-popup>
  </div>
</template>

<script>
import { login, trainHospital } from "../../api/user";
import sha1 from "../../config/SHA1";
import Cookies from "js-cookie";
import { Actionsheet, Popup, Picker,Switch  } from "mint-ui";
export default {
  data() {
    return {
      regist: false,
      schData: [],
      firstData: "",
      firstId: 0,
      index:"",
      box:false,
      shaPwd: "",
      popupVisible: false,
      userid: "",
      userpwd: "",
      hospitalname:'',
      docmHeight:
        document.documentElement.clientHeight || document.body.clientHeight,
      showHeight:
        document.documentElement.clientHeight || document.body.clientHeight,
      hideshow: true, //显示或者隐藏footer
      slots: [
        {
          flex: 1,
          values: [""],
          className: "slot1",
          textAlign: "center"
        }
      ]
    };
  },
  watch: {
    //监听显示高度
    showHeight: function() {
      if (this.docmHeight > this.showHeight) {
        //隐藏
        this.hideshow = false;
      } else {
        //显示
        this.hideshow = true;
      }
    }
  },
  methods: {
    handleLogin() {
      this.shaPwd = sha1.hex_sha1(this.userpwd);

      login(this.userid, this.shaPwd).then(res => {
        if (JSON.parse(res).code == 1) {
          // console.log(JSON.parse(res));
          // this.$router.push("/home");
          Cookies.set("user_name", JSON.parse(res).persondata.username, {
            expires: 1
          });
          if (Cookies.get("hos_name")) {
            document.title = Cookies.get("hos_name");
          }
          this.$router.push("/home");
        } else {
          alert(JSON.parse(res).msg);
        }
      });
    },
    selectScl(id, name, url) {
      (this.firstData = name), (this.firstId = id);
      Cookies.set("hos_name", name, {
        expires: 1
      });
      Cookies.set("top_url", url, {
        expires: 1
      });
      // console.log(id, name, url)
    },
    onValuesChange(picker, values) {
      this.hospitalname = values[0];
      
    },
    getSlotValue(){
      this.schData.forEach(item => {
        if(item.name == this.hospitalname){
          (this.firstData = item.name), (this.firstId = item.id);
          Cookies.set("hos_name", item.name, {
            expires: 1
          });
          Cookies.set("top_url", item.url, {
            expires: 1
          });
        }
      })
      this.popupVisible =false;
      // console.log(this.schData);
    }
  },
  mounted() {
    (window.onresize = () => {
      return (() => {
        this.showHeight =
          document.documentElement.clientHeight || document.body.clientHeight;
      })();
    }),
      trainHospital().then(res => {
        // console.log(JSON.parse(res));
        this.schData = JSON.parse(res).data;
        for (var c = 0; c < JSON.parse(res).data.length; c++) {
          this.slots[0].values.push(JSON.parse(res).data[c].name);
        }
        this.firstData = JSON.parse(res).data[0].name;
        Cookies.set("hos_name", JSON.parse(res).data[0].name, {
          expires: 1
        });
        Cookies.set("top_url", JSON.parse(res).data[0].portalurl, {
          expires: 1
        });
      });

    // this.hex_sha1("abcd1234")
    // console.log(this.shaPwd);
  },
};
</script>
<style lang="less" scoped>
@import "./login.less";
</style>

