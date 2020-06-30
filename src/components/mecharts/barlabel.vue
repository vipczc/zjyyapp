<template>
  <div class="barlabel">
    <div class="barlabel_top">
      <div class="barlabel_top_left">
        <p v-for="(item, index) in barleftdata" :key="index">{{item.name}}</p>
      </div>
      <div class="barlabel_top_right">
        <p v-for="(item2, index2) in barrightdata" :key="index2">{{item2.name}}</p>
      </div>
    </div>
    <div class="barlabel_end">
       <p class="title title_left"><span v-if="this.$route.name == 'comment'">分</span><span v-else>人</span><br><span>数</span><br><span>最</span><br><span>高</span></p>
      <div class="barlabel_end_left">
          <div :style="{ 'height': item3.number*barnuber+ 'rem','background' : item3.color }" v-for="(item3, index3) in barleftdata" :key="index3" class="barlabel_end_single">
            <p style="color:rgba(249,149,63,1)" >{{item3.percent}}</p>
          </div>
      </div>
      <div class="barlabel_end_right">
          <div :style="{ 'height': item4.number*barnuber + 'rem','background' : item4.color }"  v-for="(item4, index4) in barrightdata" :key="index4" class="barlabel_end_single">
            <p style="color:rgba(35,158,255,1)" >{{item4.percent}}</p>
          </div>
      </div>
      <p class="title title_right"><span v-if="this.$route.name == 'comment'">分</span><span v-else>人</span><br><span>数</span><br><span>最</span><br><span>低</span></p>
    </div>
  </div>
</template>

<script>
export default {
   props: {
    barleftdata:{
      type: Array,
      required: true
    },
    barrightdata:{
      type: Array,
      required: false
    },
    barnuber:{
      type: Number,
      required: true
    }
  },
  data() {
    return {
      leftdata: [
        {
          name: "麻醉科",
          number: 100,
          percent:"100",
          color:"rgba(249,149,63,1)"
        },
        {
          name: "急诊科",
          number: 98,
          percent:"98",
          color:"rgba(249,149,63,0.70)"
        },
        {
          name: "放射科",
          number: 92,
          percent:"92",
          color:"rgba(249,149,63,0.40)"
        }
      ],
      // rightdata: [
      //   {
      //     name: "中医康复科",
      //     number: 40,
      //     percent:"40",
      //     color:"rgba(35,158,255,0.40)"
      //   },
      //   {
      //     name: "全科医学科",
      //     number: 39,
      //     percent:"39",
      //     color:"rgba(35,158,255,0.70)"
      //   },
      //   {
      //     name: "生殖医学科",
      //     number: 15,
      //     percent:"15",
      //     color:"rgba(35,158,255,1)"
      //   }
      // ]
    };
  },
  mounted(){
    // console.log(this.$route.name);
    
  }
};
</script>

<style lang="less" scoped>
.barlabel {
  width: 2.8rem;
  margin: 0 auto;
  margin-top: 0.1rem;
  .barlabel_top {
    display: flex;
    align-items: center;
    .barlabel_top_left {
      display: flex;
      align-items: flex-start;
      justify-content: space-around;
      width: 1.4rem;
      height: 0.27rem;
      border-right: 1px solid #d7dde4;
      border-bottom: 1px solid #d7dde4;
      p {
        font-family: PingFangSC-Regular;
        font-size: 0.11rem;
        color: #9397ad;
        letter-spacing: 0;
        text-align: center;
        line-height: 0.14rem;
        // line-height: 11px;
      }
    }
    .barlabel_top_right {
      display: flex;
      align-items: flex-end;
      justify-content: space-around;
      width: 1.4rem;
      height: 0.27rem;
      // border-left: 1px solid #d7dde4;
      // border-bottom: 1px solid #d7dde4;
      p {
        font-family: PingFangSC-Regular;
        font-size: 0.11rem;
        color: #9397ad;
        letter-spacing: 0;
        text-align: center;
        line-height: 0.14rem;
        // line-height: 11px;
      }
    }
  }
  .barlabel_end{
    display: flex;
    align-items: flex-start;
    position: relative;
    .title{
      font-family: PingFangSC-Regular;
      font-size: 0.13rem;
      color: #212121;
      letter-spacing: 0;
      text-align: center;
      // line-height: 13px;
      
    }
    .title_left{
      position: absolute;
      left: -0.2rem;
      border-top: 1px solid #dddddd;
      top: -0.01rem;
      text-align: left;
      width: 0.4rem;
    }
    .title_right{
      position: absolute;
      right: -0.2rem;
      border-top: 1px solid #dddddd;
      // top: -0.01rem;
      text-align: right;
      width: 0.4rem;
    }
    .barlabel_end_left{
      display: flex;
      align-items: flex-start;
      justify-content: space-around;
      width: 1.4rem;
      height: 1.17rem;
      // border-top: 1px solid #d7dde4;
      // border-right: 1px solid #d7dde4;
      p{
        font-family: PingFangSC-Regular;
        font-size: 0.13rem;
        // color: #F57C00;
        letter-spacing: 0;
        text-align: center;
        // line-height: 13px;
      }
    }
    .barlabel_end_right{
      display: flex;
      align-items: flex-start;
      justify-content: space-around;
      width: 1.4rem;
      height: 1.17rem;
      border-top: 1px solid #d7dde4;
      border-left: 1px solid #d7dde4;
      p{
        font-family: PingFangSC-Regular;
        font-size: 0.13rem;
        // color: #F57C00;
        letter-spacing: 0;
        text-align: center;
        // line-height: 13px;
      }
    }
  }
}
.barlabel_end_singles{
  display: flex;
  align-items: flex-start;
  justify-content: space-around;
}
.barlabel_end_single{
  width: 0.16rem;
  // background: #333333;
  position: relative;
  p{
    position: absolute;
    bottom: -0.2rem;
    // left:-0.05rem;
  }
}
</style>    