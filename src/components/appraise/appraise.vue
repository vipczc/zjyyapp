<template>
  <div class="arrowimg">
    <div class="right_block">
      <div class="top">
        <img class="left_arrow" :style="this.open == 5?'height:3rem':'height:5rem'" src="../../assets/images/appraise/toparrow.png" alt />
        <div v-for="(item, index) in selectdata.slice(0,irs)" :key="index">
          <div class="right_block_top">
            <p class="title">最佳评价项</p>
            <p class="desc">
              评价平均分：
              <span style="color: #F57C00;">{{topnumber}}</span>
            </p>
          </div>
          <div  v-for="(itemtext,index) in item.itemlist.slice(0,irs)" :key="index"     class="single_block">
            <div class="block"></div>
            <div style="border-right:0.1rem solid #FFF6E2;" class="square"></div>
            <div style="background: #FFF6E2;" class="single_block_right">
              <p class="single_title">{{index + 1}} {{itemtext.itemtitle}}</p>
              <div class="end_desc">
                <!-- <p>{{item.pjf}}分，</p> -->
                <!-- <img src="../../assets/images/appraise/redarrow.png" alt /> -->
                <p>满分{{itemtext.itemff}}分，平均{{itemtext.pjf}}分，{{itemtext.zz}}</p>
                 <!-- <p>{{item.pjf}}分，{{item.zz}}，该项有人{{item.bhgrs}}人评分低于60分</p> -->
              </div>
            </div>
          </div>
          <!-- <div @click="showLinebar('能为住院...教学环境')" class="single_block">
            <div class="block"></div>
            <div style="border-right:0.1rem solid #FFF8EA;" class="square"></div>
            <div style="background: #FFF8EA;" class="single_block_right">
              <p class="single_title">02 能为住院医师创造良好的培训和教学环境</p>
              <div class="end_desc">
                <p>99分，比上个月</p>
                <img src="../../assets/images/appraise/redarrow.png" alt />
                <p>5分，该项有人120人评分低于60分</p>
              </div>
            </div>
          </div>
          <div @click="showLinebar('有较好的...操作技能')" class="single_block">
            <div class="block"></div>
            <div style="border-right:0.1rem solid #FFFBF3;" class="square"></div>
            <div style="background: #FFFBF3;" class="single_block_right">
              <p class="single_title">03 有较好的临床经验和熟练的临床操作技能</p>
              <div class="end_desc">
                <p>98分，比上个月</p>
                <img src="../../assets/images/appraise/redarrow.png" alt />
                <p>2分，该项有人120人评分低于60分</p>
              </div>
            </div>
          </div>
          <div @click="showLinebar('有较好的...操作技能')" v-show="this.open == 1" class="single_block">
            <div class="block"></div>
            <div style="border-right:0.1rem solid #FFFBF3;" class="square"></div>
            <div style="background: #FFFBF3;" class="single_block_right">
              <p class="single_title">04 有较好的临床经验和熟练的临床操作技能</p>
              <div class="end_desc">
                <p>98分，比上个月</p>
                <img src="../../assets/images/appraise/redarrow.png" alt />
                <p>2分，该项有人120人评分低于60分</p>
              </div>
            </div>
          </div>
          <div @click="showLinebar('有较好的...操作技能')" v-show="this.open == 1" class="single_block">
            <div class="block"></div>
            <div style="border-right:0.1rem solid #FFFBF3;" class="square"></div>
            <div style="background: #FFFBF3;" class="single_block_right">
              <p class="single_title">05 有较好的临床经验和熟练的临床操作技能</p>
              <div class="end_desc">
                <p>98分，比上个月</p>
                <img src="../../assets/images/appraise/redarrow.png" alt />
                <p>2分，该项有人120人评分低于60分</p>
              </div>
            </div>
          </div> -->
        </div>
      </div>
      <!-- <div v-show="this.open == 0" @click="openWind()" class="single_button"> 
        <p>展开更多...</p>
      </div>
      <div v-show="this.open == 1" @click="hideWind()" class="single_button">
        <p>收起</p>
      </div> -->
      <div class="end">
        <img class="right_arrow" :style="this.open == 5?'height:3rem':'height:5rem'" src="../../assets/images/appraise/endarrow.png" alt />
        <div  v-for="(item, index) in selectdata" :key="index">
          <div v-for="(itemtext,index) in item.itemlist.slice(ids,10)" :key="index" class="single_block">
            <div class="block2"></div>
            <div style="border-right:0.1rem solid #F8FBFF;" class="square"></div>
            <div style="background: #F8FBFF;" class="single_block_right">
              <p class="single_title">{{index + ids + 1}} {{itemtext.itemtitle}}</p>
              <div class="end_desc2">
                <!-- <p>80分，比上个月</p>
                <img src="../../assets/images/appraise/greenarrow.png" alt /> -->
                 <p>满分{{itemtext.itemff}}分，平均{{itemtext.pjf}}分，{{itemtext.zz}}</p>
              </div>
            </div>
          </div>
          <!-- <div @click="showLinebar('有较强的...医患关系')" v-show="this.open == 1" class="single_block">
            <div class="block2"></div>
            <div style="border-right:0.1rem solid #F8FBFF;" class="square"></div>
            <div style="background: #F8FBFF;" class="single_block_right">
              <p class="single_title">07 有较强的沟通能力，并能与病人及其家属保持健康的医患关系</p>
              <div class="end_desc2">
                <p>80分，比上个月</p>
                <img src="../../assets/images/appraise/greenarrow.png" alt />
                <p>10分，该项有人120人评分低于60分</p>
              </div>
            </div>
          </div>
          <div @click="showLinebar('有较强的...医患关系')" class="single_block">
            <div class="block2"></div>
            <div style="border-right:0.1rem solid #F8FBFF;" class="square"></div>
            <div style="background: #F8FBFF;" class="single_block_right">
              <p class="single_title">08 有较强的沟通能力，并能与病人及其家属保持健康的医患关系</p>
              <div class="end_desc2">
                <p>80分，比上个月</p>
                <img src="../../assets/images/appraise/greenarrow.png" alt />
                <p>10分，该项有人120人评分低于60分</p>
              </div>
            </div>
          </div>
          <div @click="showLinebar('认真督导...工作能力')" class="single_block">
            <div class="block2"></div>
            <div style="border-right:0.1rem solid #EBF5FC;" class="square"></div>
            <div style="background: #EBF5FC;" class="single_block_right">
              <p class="single_title">09 认真督导住院医师临床工作，致力于培养住院医师的独立工作能力</p>
              <div class="end_desc2">
                <p>81分，比上个月</p>
                <img src="../../assets/images/appraise/greenarrow.png" alt />
                <p>5分，该项有人120人评分低于60分</p>
              </div>
            </div>
          </div>
          <div @click="showLinebar('教学查房...条理清楚')" class="single_block">
            <div class="block2"></div>
            <div style="border-right:0.1rem solid #E3F1FC;" class="square"></div>
            <div style="background: #E3F1FC;" class="single_block_right">
              <p class="single_title">10 教学查房和专业讲座准备充分，深入浅出，条理清楚</p>
              <div class="end_desc2">
                <p>80分，比上个月</p>
                <img src="../../assets/images/appraise/greenarrow.png" alt />
                <p>2分，该项有人120人评分低于60分</p>
              </div>
            </div>
          </div> -->
          <p class="end_title">最差评价项</p>
        </div>
      </div>
    </div>
    <div v-show="showBar"  class="line_bar">
      <div style="background: rgba(0,0,0,0.50);" @click.stop="hideLinebar()" class="line_bar"></div>
      <div class="line_bar_win">
        <p>“{{barTitle}}”<br>12个月分数变化情况</p>
        <img @click="hideLinebar()" src="../../assets/images/close.png" alt="">
        <linebar ref="linebars" :linebardata="databar"></linebar>
      </div>
    </div>
  </div>
</template>

<script>
import linebar from "../mecharts/linebar.vue"
import { queryTeachereValuationitem,queryTeachereValuationitemNew } from "../../api/teachercomment"
import { queryStudentevaluationitem,queryStudentevaluationitemNew } from "../../api/studentcomment"
import moment from 'moment';
export default {
  data() {
    return {
      open:0,
      showBar:false,
      barTitle:"",
      selectdata:"",
      irs:5,   //好评
      ids:5,   //差评
      topnumber:0,
      databar:[],
      linebars:"",
      moment:0
    };
  },
  watch: {
    singledata(newVal){
      // console.log(newVal);
      this.selectdata = newVal;
    }
  },
  props:{
    singledata:{}
  },
  methods:{
    // openWind(){
    //   this.open = 0   //展开
    //   this.irs = 5,
    //   this.ids = 5  
    // },
    // hideWind(){      //隐藏
    //   this.open = 0
    //   this.irs = 3,
    //   this.ids = 7
    // },
    showLinebar(title,id1,id2){
      this.barTitle = title.slice(0,3) + "..." + title.slice(title.length - 3, title.length)
      if (this.$route.name == 'comment') {
        queryStudentevaluationitemNew(id1,id2).then(res => {
         
          this.linebars = JSON.parse(res).evaluationitemmonth
          for (let i = 0; i < this.linebars.length; i++) {
              this.databar.push({
                value: this.linebars[i].pjf
              });
            }
          this.$refs.linebars.drawLine()
        })
      }else{
        queryTeachereValuationitemNew(id1,id2).then(res => {
          //  console.log(JSON.parse(res));
          this.linebars = JSON.parse(res).evaluationitemmonth
          for (let i = 0; i < this.linebars.length; i++) {
              this.databar.push({
                value: this.linebars[i].pjf
              });
            }
          this.$refs.linebars.drawLine()
        })
      }
      this.showBar = true
      this.noScroll()
    },
    hideLinebar(){
      this.showBar = false
      this.databar = []
      this.canScroll()
    },
    teacherFunc(){
      
        this.selectdata = this.singledata;
        // console.log(this.selectdata)
      // queryTeachereValuationitem(0,this.moment).then(res => {
      //   // console.log(JSON.p  arse(this.users));
      //   this.selectdata = JSON.parse(res).teacherevaluationitem
      //   // this.selectdatatext = JSON.parse(res).itemtypeconfiglist
      //   this.topnumber = JSON.parse(res).pjpjf
      // })
      // console.log(this.selectdata)


    },
    studentFunc(){
      queryStudentevaluationitem(this.moment).then(res => {
            this.selectdata = this.singledata;
        // console.log(JSON.parse(res));
        // this.selectdata = JSON.parse(res).studentevaluationitem
        // this.topnumber = JSON.parse(res).pjpjf
      })
    }
  },
  mounted(){
    // console.log(this.$route.name);
    if (this.$route.name == 'comment') {
      this.studentFunc()
    }else{
      this.teacherFunc()
    }
  },
  created() {
    if (moment().date() < 20) {
       if (moment().month() == 0) {
          this.moment = 12
       }else{
         this.moment = moment().month()
       }
    }else{
        this.moment = moment().month() + 1
    }
  },
  components: {
    linebar
  }
};
</script>

<style lang="less" scoped>
.arrowimg {
  display: flex;
  align-items: center;
//   margin-top: 0.2rem;
  .right_block {
    .left_arrow {
      width: 0.18rem;
      height: 4rem;
      position: absolute;
      top: 0.2rem;
    }
    .right_arrow{
      width: 0.18rem;
      // height: 5rem;
      position: absolute;
      bottom: 0.2rem;
    }
    .top {
      display: flex;
      align-items: center;
    }
    .end {
      display: flex;
      align-items: center;
    }
    .single_button {
      font-size: 0.1rem;
      margin-bottom: 0.1rem;
      p {
        font-family: PingFangSC-Regular;
        font-size: 12px;
        color: #9397ad;
        letter-spacing: 0;
        // line-height: 14px;
        text-align: center;
      }
    }
    .right_block_top {
      display: flex;
      align-items: center;
      margin-bottom: 0.1rem;
      margin-left: 0.4rem;
      .title {
        font-family: PingFangSC-Regular;
        font-size: 0.13rem;
        color: #f57c00;
        letter-spacing: 0;
        // line-height: 16px;
      }
      .desc {
        font-family: PingFangSC-Regular;
        font-size: 0.13rem;
        color: #474c63;
        letter-spacing: 0;
        margin-left: auto;
      }
    }
    .single_block {
      // width: 3.3rem;
      border-radius: 10px;
      display: flex;
      align-items: flex-start;
      margin-bottom: 0.1rem;
      margin-left: 0.2rem;
      .block {
        background: #ffa42e;
        border: 1px solid #ffffff;
        width: 0.08rem;
        height: 0.08rem;
        border-radius: 50%;
        margin-top: 0.15rem;
        position: absolute;
        left: 0.18rem;
      }
      .block2 {
        background: #239eff;
        border: 1px solid #ffffff;
        width: 0.08rem;
        height: 0.08rem;
        border-radius: 50%;
        margin-top: 0.15rem;
        position: absolute;
        left: 0.18rem;
      }
      .single_block_right {
        border-radius: 10px;
        width: 3rem;
        .single_title{
          margin-left: 0.1rem;
          margin-top: 0.08rem;
          margin-bottom: 0.07rem;
        }
        p {
          font-family: PingFangSC-Regular;
          font-size: 0.13rem;
          color: #212121;
          letter-spacing: 0;
          // line-height: 18px;
          // width: 2.9rem;
          text-align: left;
        }
        .end_desc {
          display: flex;
          align-items: center;
          // width: 3rem;
          border-top: 1px solid rgba(147, 151, 173, 0.4);
          border-top-style: dashed;
          padding-top: 0.05rem;
          margin-bottom: 0.05rem;
          padding-left: 0.1rem;
          // padding-left: 0.31rem;
          // margin-right: 0.16rem;
          p {
            font-family: PingFangSC-Regular;
            font-size: 0.11rem;
            color: #f57c00;
            letter-spacing: 0;
            text-align: left;
          }
          img {
            width: 0.08rem;
            height: 0.1rem;
          }
          // line-height: 18px;
        }
        .end_desc2 {
          display: flex;
          align-items: center;
          // width: 3rem;
          border-top: 1px solid rgba(147, 151, 173, 0.4);
          border-top-style: dashed;
          padding-top: 0.05rem;
          margin-bottom: 0.05rem;
          padding-left: 0.1rem;
          p {
            font-family: PingFangSC-Regular;
            font-size: 0.11rem;
            color: #239eff;
            letter-spacing: 0;
            text-align: left;
          }
          img {
            width: 0.08rem;
            height: 0.1rem;
          }
          // line-height: 18px;
        }
      }
      .square {
        width: 0;
        height: 0;
        border-top: 0.1rem solid transparent;
        border-bottom: 0.1rem solid transparent;
        border-right: 0.1rem solid red;
        margin-top: 0.1rem;
      }
      // p {
      //   font-family: PingFangSC-Regular;
      //   font-size: 0.13rem;
      //   color: #212121;
      //   letter-spacing: 0;
      //   padding-top: 0.08rem;
      //   padding-bottom: 0.08rem;
      //   padding-left: 0.1rem;
      //   padding-right: 0.1rem;
      //   // line-height: 18px;
      // }
      span {
        font-family: PingFangSC-Regular;
        font-size: 0.1rem;
        color: #212121;
        letter-spacing: 0;
        // line-height: 18px;
      }
    }
  }
  .end_title {
    font-family: PingFangSC-Regular;
    font-size: 0.13rem;
    color: #239eff;
    letter-spacing: 0;
    margin-left: 0.4rem;
    // line-height: 16px;
  }
}
.line_bar{
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  // background: rgba(0,0,0,0.50);
  z-index: 9999;
  .line_bar_win{
    width: 3.5rem;
    height: 2.77rem;
    background: #ffffff;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    border-radius: 10px;
    border-radius: 10px;
    z-index: 9999;
    p{
      width: 1.68rem;
      height: 0.4rem;
      font-family: PingFangSC-Medium;
      font-size: 0.15rem;
      color: #212121;
      letter-spacing: 0;
      text-align: center;
      display: block;
      margin: 0 auto;
      margin-top: 0.05rem;
      margin-bottom: 0.1rem;
      // line-height: 20px;
    }
    img{
      position: absolute;
      top: 0.15rem;
      right: 0.15rem;
      width: 0.12rem;
      height: 0.12rem;
    }
  }
}
</style>