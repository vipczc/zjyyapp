<template>
  <div class="content">
    <Header-bar :message="'院长直通'"></Header-bar>
    <div class="box" >
      <div class="nav">
        <div class="nav-btn">
          <button :class="selected==0?'active':''" @click="handleClick(0)">未处理</button>
          <button :class="selected==100?'active':''" @click="handleClick(100)">已处理</button>
          <button :class="selected==1?'active':''" @click="handleClick(1)">全部</button>
        </div>
        <div @click="selecttime()" class="time">
          <span>时间</span>
          <img src="@/assets/images/switch.png" alt="">
        </div>
      </div>
      <!-- <p style="text-align: center; line-height: 1.2rem; color: #dddddd;">暂无数据</p> -->
      <div v-for="(item, index) in datalist" :key="index" v-show="item.state == selected || selected == 1" @click="handleClickDetail(item.sheetid,item)" class="item">
        <h4>{{item.sheettitle}}</h4>
        <!-- <p>{{item.proposalcontent}}</p> -->
        <p>{{item.proposalcontent}}</p>
        <div class="item-footer">
          <span v-if="item.state == 0" class="state">未处理</span>
          <span v-else style="background: rgba(46,191,7,0.2);color:#00A874;" class="state">已处理</span>
          <span>{{item.createname}} | {{item.createtime}}</span>
        </div>
      </div>
      <!-- <div v-show="selected==2" @click="handleClickDetail" class="item">
        <h4>关于出科考试前排班问题</h4>
        <p>院长，我们每天从解放路院区到滨江院区去上班很不方便，能否给我们有直达的班车？</p>
        <div class="item-footer">
          <span style="background: rgba(46,191,7,0.2);color:#00A874;" class="state">已处理</span>
          <span>匿名 | 2019/08/07</span>
        </div>
      </div>
      <div v-show="selected==3" @click="handleClickDetail" class="item">
        <h4>关于出科考试前排班问题</h4>
        <p>院长，我们每天从解放路院区到滨江院区去上班很不方便，能否给我们有直达的班车？</p>
        <div class="item-footer">
          <span style="background: rgba(46,191,7,0.2);color:#00A874;" class="state">已处理</span>
          <span>匿名 | 2019/08/07</span>
        </div>
      </div>
      <div v-show="selected==3" @click="handleClickDetail" class="item">
        <h4>关于出科考试前排班问题</h4>
        <p>院长，我们每天从解放路院区到滨江院区去上班很不方便，能否给我们有直达的班车？</p>
        <div class="item-footer">
          <span class="state">未处理</span>
          <span>匿名 | 2019/08/07</span>
        </div>
      </div> -->
    </div>
    <mt-popup
      v-model="popupVisible"
      position="bottom">
      <div class="bom-modal">
        <div class="title">处理详情 <span @click="handleClose"><img src="@/assets/images/close.png" alt=""></span></div>
        <div class="content-detail">
          <div class="detail">
            <h3>{{singledata.sheettitle}}</h3>
            <p class="detail-user">{{singledata.createname}} | &nbsp;{{singledata.createtime}} <span v-show="singledata.state == 100">已通知教学部</span></p>
            <p class="question">{{singledata.proposalcontent}}</p>
          </div>
          <div class="reply">
            <div v-for="(item,index) in news_list" :key="index">
              <div class="user">{{item.personname}}回复：</div>
              <p>{{item.content}}</p>
            </div>
          </div>
          <textarea name="" id="" cols="30" rows="10" placeholder="请填写回复内容…" class="text" v-model="text"></textarea>
        </div>
        <footer class="footer">
          <span @click="handleClickNotice"><img src="@/assets/images/notice.png" alt=""> 通知教学部</span>
          <button @click="handleSubmit">提交回复</button>
        </footer>
        <div class="success-modal" v-if="showSuccess">
          <img src="@/assets/images/success.png" alt="">
          <span>已提交！</span>
        </div>
      </div>
    </mt-popup>
  </div>
</template>

<script>
import HeaderBar from "@/components/mainHeader";
import { queryProposalsheet,queryProposalsheetInfo,insertProposalsheetinfo,updateProposalsheetisinform } from "../../../api/president"
export default {
  components: {
    HeaderBar
  },
  data() {
    return {
      text: '',    // 消息回复
      selected: 1,
      news_list:[],
      popupVisible: false,
      showSuccess: false,
      datalist:[],
      selectid:1,
      singledata:"",
      sheetdata:"",
      showid:0,
    };
  },
  methods: {
    handleClick (id) {
      this.selected = id
    },
    handleClickDetail (id,data) {
      this.popupVisible = true;
      // console.log(data);
      this.showid = id
      this.singledata = data
      queryProposalsheetInfo(id).then(res => {
        // console.log(JSON.parse(res));
        this.news_list = JSON.parse(res).proposalsheetlist
      })
    },
    handleClose () {
      this.popupVisible = false;
    },
    handleSubmit () {
      if (!this.text) return alert('内容不能为空')
      insertProposalsheetinfo(this.showid,this.text).then(res => {
        console.log(JSON.parse(res));
        if (JSON.parse(res).code == 1) {
          this.news_list.push({
            personname: '院长',
            content: this.text
          })
          this.text = ''
          this.showSuccess = true;
          setTimeout(() => {
            this.showSuccess = false;
          }, 1000);
        }else{
          console.log(JSON.parse(res).msg);
        }
      })
    },
    handleClickNotice () {
      updateProposalsheetisinform().then(res => {
        console.log(JSON.parse(res));
        if (JSON.parse(res).code == 1) {
          this.news_list.push({
            personname: '教学部',
            content: '消息收悉，我们尽快落实'
          })
        }else{
            console.log(JSON.parse(res).msg);
        }
      })
    },
    selecttime() {
      if (this.selectid == 1) {
        queryProposalsheet('','desc').then(res => { 
          // console.log(JSON.parse(res));
          this.datalist = JSON.parse(res).proposalsheetlist
        })
        this.selectid = 0 
      }else{
        queryProposalsheet('','').then(res => { 
          // console.log(JSON.parse(res));
          this.datalist = JSON.parse(res).proposalsheetlist
        })
        this.selectid = 1
      }
    }
  },
  mounted(){
    queryProposalsheet('','').then(res => { 
      // console.log(JSON.parse(res));
      this.datalist = JSON.parse(res).proposalsheetlist
    })
  }
};
</script>

<style lang="less" scoped>
@import "./president.less";
</style>