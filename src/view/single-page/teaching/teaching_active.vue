<template>
  <div>
    <header-main :message="'教学活动'"></header-main>
    <div class="teaching_student">
      <div id="teachingtop" :style="!openList ?'height: 0.68rem':'height: auto'" class="top">
        <p @click="handleFirst(index,item.majorname,item.officelist[0].officeid,item.officelist[0].name)" :style="firstId == index ? 'color: #277FFF;':'color: #212121;'" v-for="(item, index) in alltype" :key="index">{{item.majorname}}</p>
        <div class="open">
          <div class="flex" v-show="!openList" @click="handleOpenList(1)">
            <p>展开</p>
            <img src="../../../assets/images/downarrow.png" alt="">
          </div>
          <div class="flex" @click="handleOpenList(2)" v-show="openList">
            <p>收起</p>
            <img src="../../../assets/images/uparrow.png" alt="">
          </div>
        </div>
      </div>
      <div class="middle">
        <div v-show="showSecond" class="single">
          <p>{{secondName}}</p>
          <img @click="closeSecond()" src="../../../assets/images/blueclose.png" alt="">
        </div>
        <div v-show="showThird" class="single">
          <p>{{thirdName}}</p>
          <img @click="closeThird()" src="../../../assets/images/blueclose.png" alt="">
        </div>
        <div class="right">
          <p>筛选</p>
          <img @click="selectWindow = true" src="../../../assets/images/todaywork/select.png" alt />
        </div>
      </div>
      <div class="end">
        <div class="end_top">
          <p>{{firstName}}<span v-show="showSecond">-{{secondName}}</span><span v-show="showThird">-{{thirdName}}</span></p>
        </div>
        <div class="end_end">
            <div class="end_th">
                <p>姓名</p>
                <p>职称</p>
                <p>活动数</p>
                <p>好评度</p>
            </div>
            <div v-for="(item, index) in tableData" :key="index" class="end_td">
                <p>{{item.personname}}</p>
                <p>{{item.professionaltitle}}</p>
                <p>{{item.djxyrt}}</p>
                <p>{{item.djxyhpl}}</p>
            </div>
        </div>
      </div>
    </div>
    <div v-show="selectWindow" class="select_main">
      <div @click="hideWindow()" style="height: 100%;width: 1.75rem;" class="select_window_black"></div>
      <div class="select_window">
        <div class="select_window_main">
          <div class="select_window_first">
            <p class="title">{{firstName}}科室：</p>
            <div class="flex">
              <p @click="choice1(index,item2.officename,item2.officeid)" :style="item2.officename.length>6?'line-height: 0.13rem;':''" :class="choice1Id == index ? 'active':'less'" v-for="(item2, index) in typeData" :key="index">
                {{item2.officename}}
              </p>
            </div>
          </div>
          <div class="select_window_third">
            <p class="title">选择时间：</p>
            <div class="flex2">
             <p @click="choice2(index,item3.number)" :class="choice2Id == index ? 'active':'less'" v-for="(item3, index) in typeDate3" :key="index">
               19/{{item3.number}}
             </p>
            </div>
          </div>
        </div>
        <div @click="slectType()" class="select_window_btn">
          <p>确定</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import mainHeader from "../../../components/mainHeader.vue";
import { queryMajormanageOffice,queryTeacherTeachingdata1 } from "../../../api/teaching";
export default {
  data() {
    return {
        selectWindow: false,
        openList:false,
        firstName:"内科",
        firstId:0,
        secondName:"呼吸科",
        secondId:0,
        thirdName:"12月",
        thirdId:0,
        choice1Name:"呼吸科",
        choice1Id:0,
        choice2Name:"12月",
        choice2Id:0,
        choice2Number:"12",
        choice2Numbers:"12",
        showSecond:true,
        showThird:true,
        typeDate1:[
          {
            name:"内科",
            show:true
          },
          {
            name:"外科",
            show:true
          },
          {
            name:"口腔科",
            show:true
          },
          {
            name:"妇产科",
            show:true
          },
          {
            name:"神经内科",
            show:true
          },
          {
            name:"精神科",
            show:true
          },
          {
            name:"急诊科",
            show:true
          },
          {
            name:"病理科",
            show:true
          },
          
          {
            name:"皮肤性科",
            show:true
          },
          {
            name:"康复医学科",
            show:true
          },
          {
            name:"麻醉科",
            show:false
          },
          {
            name:"眼科",
            show:false
          },
          {
            name:"放射科",
            show:false
          },
        ],
        typeDate2:[
          {
            title:"呼吸科"
          },
          {
            title:"感染科"
          },
          {
            title:"心内科"
          },
          {
            title:"消化科"
          },
          {
            title:"内分泌科"
          },
          {
            title:"血液科"
          },
          {
            title:"肾内科"
          },
          {
            title:"风湿科"
          },
          {
            title:"重症医学科"
          },
          {
            title:"滨江合ICU"
          },
          {
            title:"脑科重症医学科"
          },
          {
            title:"外科重症医学科"
          },
          {
            title:"肿瘤内科"
          },
          {
            title:"干部保健科"
          }
        ],
        typeDate3:[
          {
            number:"12月"
          },
          {
            number:"11月"
          },
          {
            number:"10月"
          },
          {
            number:"9月"
          },
          {
            number:"8月"
          },
          {
            number:"7月"
          },
          {
            number:"6月"
          },
          {
            number:"5月"
          },
          {
            number:"4月"
          },
          {
            number:"3月"
          },
          {
            number:"2月"
          },
          {
            number:"1月"
          }
        ],
        typeData:"",
        alltype:"",
        tableData:"",
        valueId:0,
        valueIds:0
    };
  },
  methods:{
    slectType() {
      this.secondName = this.choice1Name;
      this.thirdName = this.choice2Name;
      this.secondId = this.choice1Id;
      this.thirdId = this.choice2Id;
      this.selectWindow = false;
      this.choice2Numbers = this.choice2Number;
      this.valueId = this.valueIds
      // console.log(this.choice1Id,this.choice2Id);
      if (this.choice1Id == 99 && this.choice2Id == 99) {
        queryMajormanageOffice(this.firstName).then(res => {
          // console.log(JSON.parse(res));
          var adds = ""
          for (let i = 0; i < JSON.parse(res).majorlist[0].officelist.length; i++) {
            adds += JSON.parse(res).majorlist[0].officelist[i].officeid + ","
          }
          // console.log(adds.slice(0,adds.length-1));
          queryTeacherTeachingdata1(adds.slice(0,adds.length-1)," ").then(res => {
            // console.log(res);
            this.tableData = JSON.parse(res).teachingdatalist
          })
        })
      }else{
        if (this.choice1Id == 99) {
          queryMajormanageOffice(this.firstName).then(res => {
            // console.log(JSON.parse(res));
            var adds = ""
            for (let i = 0; i < JSON.parse(res).majorlist[0].officelist.length; i++) {
              adds += JSON.parse(res).majorlist[0].officelist[i].officeid + ","
            }
            // console.log(adds.slice(0,adds.length-1));
            queryTeacherTeachingdata1(adds.slice(0,adds.length-1),this.choice2Number).then(res => {
              // console.log(res);
              this.tableData = JSON.parse(res).teachingdatalist
            })
          })
        }else if (this.choice2Id == 99) {
          queryTeacherTeachingdata1(this.valueId," ").then(res => {
            this.tableData = JSON.parse(res).teachingdatalist
          })
        }else{
          queryTeacherTeachingdata1(this.valueId,this.choice2Number).then(res => {
            this.tableData = JSON.parse(res).teachingdatalist
          })
        }
      }
      if (this.secondId != 99) {
        this.showSecond = true
      }
      if (this.thirdId != 99) {
        this.showThird = true
      }
    },
    choice1(id,name,ids){
      this.choice1Id = id,
      this.choice1Name = name,
      this.valueIds = ids
      // this.valueIds = ids
    },
    choice2(id,name){
      this.choice2Id = id,
      this.choice2Name = name
      if (name.length > 2) {
        this.choice2Number = name.slice(0,2)
      }else{
        this.choice2Number = "0" + name.slice(0,1)
      }
    },
    handleOpenList(_index){
      if (_index == 1) {
        this.openList = true
      }else{
        this.openList = false
      }
    },
    handleFirst(id,name,ids,secendname){
      this.firstName = name,
      this.firstId = id,
      this.secondName = secendname,
      this.choice1Name = secendname,
      this.valueId = ids,
      this.choice2Number = "12",
      this.thirdName = "12月",
      this.choice2Name = "12月",
      this.secondId = 0,
      this.choice1Id = 0,
      this.choice2Id = 0,
      this.thirdId = 0,
      this.showThird = true,
      this.showSecond = true,
      queryMajormanageOffice(name).then(res => {
        this.typeData = JSON.parse(res).majorlist[0].officelist
        // console.log(JSON.parse(res));
      })
      queryTeacherTeachingdata1(ids,"12").then(res => {
        // console.log(res);
        this.tableData = JSON.parse(res).teachingdatalist
      })
    },
    hideWindow(){
      this.choice1Id = this.secondId;
      this.choice2Id = this.thirdId;
      this.choice1Name = this.secondName
      this.choice2Name = this.thirdName
      this.choice2Number = this.choice2Numbers
      this.valueIds = this.valueId
      // this.valueId = 0
      this.selectWindow = false
    },
    closeSecond(){
      this.secondId = 99,
      this.choice1Id = 99,
      this.showSecond = false
      if (this.showThird == false) {
        queryMajormanageOffice(this.firstName).then(res => {
          // console.log(JSON.parse(res));
          var adds = ""
          for (let i = 0; i < JSON.parse(res).majorlist[0].officelist.length; i++) {
            adds += JSON.parse(res).majorlist[0].officelist[i].officeid + ","
          }
          // console.log(adds.slice(0,adds.length-1));
          queryTeacherTeachingdata1(adds.slice(0,adds.length-1)," ").then(res => {
            // console.log(res);
            this.tableData = JSON.parse(res).teachingdatalist
          })
        })
      }else{
        queryMajormanageOffice(this.firstName).then(res => {
        // console.log(JSON.parse(res));
        var adds = ""
        for (let i = 0; i < JSON.parse(res).majorlist[0].officelist.length; i++) {
          adds += JSON.parse(res).majorlist[0].officelist[i].officeid + ","
        }
        // console.log(adds.slice(0,adds.length-1));
        queryTeacherTeachingdata1(adds.slice(0,adds.length-1),this.choice2Number).then(res => {
          // console.log(res);
          this.tableData = JSON.parse(res).teachingdatalist
        })
      })
      }
      
      // queryTeacherTeachingdata1(this.valueId,this.choice2Number).then(res => {
      //   // console.log(res);
      //   this.tableData = JSON.parse(res).teachingdatalist
      // })
    },
    closeThird(){
      this.choice2Id = 99,
      this.thirdId = 99,
      this.showThird = false
     if (this.showSecond == false) {
       queryMajormanageOffice(this.firstName).then(res => {
        // console.log(JSON.parse(res));
        var adds = ""
        for (let i = 0; i < JSON.parse(res).majorlist[0].officelist.length; i++) {
          adds += JSON.parse(res).majorlist[0].officelist[i].officeid + ","
        }
        // console.log(adds.slice(0,adds.length-1));
        queryTeacherTeachingdata1(adds.slice(0,adds.length-1)," ").then(res => {
          // console.log(res);
          this.tableData = JSON.parse(res).teachingdatalist
        })
      })
     }else{
       queryTeacherTeachingdata1(this.valueId," ").then(res => {
          // console.log(res);
          this.tableData = JSON.parse(res).teachingdatalist
        })
     }
    }
  },
  mounted(){
    queryMajormanageOffice('').then(res => {
      this.alltype = JSON.parse(res).majorlist
      this.firstName = JSON.parse(res).majorlist[0].majorname
      this.secondName = JSON.parse(res).majorlist[0].officelist[0] ? JSON.parse(res).majorlist[0].officelist[0].name : "未知"
      this.choice1Name = JSON.parse(res).majorlist[0].officelist[0].name 
      this.typeData = JSON.parse(res).majorlist[0].officelist
      this.valueId = JSON.parse(res).majorlist[0].officelist[0].officeid
      queryTeacherTeachingdata1(this.valueId,"12").then(res => {
        // console.log(JSON.parse(res));
        this.tableData = JSON.parse(res).teachingdatalist
      })
      // console.log(this.alltype);
    })
  },
  components: {
    "header-main": mainHeader
  }
};
</script>

<style lang="less" scoped>
.teaching_student {
  position: absolute;
  width: 3.55rem;
  // margin: 0 auto;
  border-radius: 5px 5px 0px 0px;
  left: 0;
  right: 0;
  margin: auto;
  .top {
    background: #f0f0f7;
    display: -webkit-flex;
    flex-direction: row;
    flex-wrap: wrap;
    // padding-top: 0.15rem;
    padding-bottom: 0.08rem;
    border-radius: 5px 5px 0px 0px;
    padding-left: 0.05rem;
    
    overflow: hidden;
    position: relative;
    p {
      font-family: PingFangSC-Regular;
      font-size: 0.13rem;
      color: #212121;
      letter-spacing: 0;
      text-align: center;
      margin: 0 0.1rem;
      margin-top: 0.15rem;
      // line-height: 15px;
    }
    .open {
        display: flex;
        align-items: center;
        color: #277fff;
        position: absolute;
        right: 0.05rem;
        bottom: 0.1rem;
      p {
        margin: 0;
        color: #277fff;
      }
      span {
        font-size: 0.1rem;
        margin-left: 0.05rem;
      }
      img{
        width: 0.1rem;
        height: 0.1rem;
        margin-left: 0.05rem;
      }
      .flex{
        display: flex;
        align-items: center;
            width: 0.5rem;
    background: #f0f0f7;
    padding-left: 0.1rem;
      }
    }
  }
  .middle {
    display: flex;
    align-items: center;
    height: 0.45rem;
    background: #ffffff;
    padding-left: 0.15rem;
    padding-right: 0.15rem;
    border-bottom: 1px solid #f0f0f7;
    .single {
      display: flex;
      align-items: center;
      background: rgba(39, 127, 255, 0.15);
      border-radius: 2px;
      border-radius: 2px;
      padding-left: 0.05rem;
      padding-top: 0.04rem;
      padding-bottom: 0.04rem;
      margin-right: 0.1rem;
      p {
        font-family: PingFangSC-Regular;
        font-size: 0.13rem;
        color: #277fff;
        letter-spacing: 0;
        margin-right: 0.05rem;
        // line-height: 18px;
      }
      img{
        width: 0.1rem;
        height: 0.1rem;
        margin-right: 0.05rem;
      }
    }
    .right {
      display: flex;
      align-items: center;
      margin-left: auto;
      p {
        font-family: PingFangSC-Regular;
        font-size: 0.15rem;
        color: #474c63;
        letter-spacing: 0;
        text-align: right;
        // line-height: 15px;
      }
      img {
        width: 0.16rem;
        height: 0.16rem;
        margin-left: 0.05rem;
      }
    }
  }
  .end {
    background: #ffffff;
    padding-top: 0.09rem;
    padding-bottom: 0.1rem;
    .end_top {
      border-left: 3px solid #277fff;
      margin-left: 0.15rem;
      padding-left: 0.05rem;
      margin-bottom: 0.1rem;
      p {
        font-family: PingFangSC-Medium;
        font-size: 0.16rem;
        color: #474c63;
        letter-spacing: 0;
        // line-height: 18px;
      }
    }
    .end_end{
        width: 3.25rem;
        margin: 0 auto;
        .end_th{
            display: flex;
            align-items: center;
            p{
                font-family: PingFangSC-Medium;
                font-size: 0.13rem;
                color: #212121;
                letter-spacing: 0;
                // line-height: 16px;
                border: 1px solid #f0f0f7;
                height: 0.35rem;
                line-height: 0.35rem;
                width: 1rem;
                text-align: center;
            }
        }
        .end_td{
            display: flex;
            align-items: center;
            p{
                font-family: PingFangSC-Regular;
                font-size: 0.13rem;
                color: #212121;
                letter-spacing: 0;
                // line-height: 16px;
                border: 1px solid #f0f0f7;
                height: 0.35rem;
                line-height: 0.35rem;
                width: 1rem;
                text-align: center;
            }
        }
    }
  }
}
.select_main {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  background: rgba(0, 0, 0, 0.5);
  z-index: 9999;
  .select_window {
    width: 2rem;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    background: #ffffff;
    .select_window_main {
      margin-top: 0.15rem;
      margin-left: 0.15rem;
      margin-right: 0.13rem;
      .title {
        font-family: PingFangSC-Regular;
        font-size: 0.13rem;
        color: #212121;
        letter-spacing: 0;
        line-height: 0.18rem;
        margin-bottom: 0.15rem;
      }
      .flex {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        p {
          font-family: PingFangSC-Regular;
          font-size: 0.13rem;
          color: #212121;
          letter-spacing: 0;
          // line-height: 0.18rem;
          height: 0.18rem;
          background: #f0f0f7;
          border-radius: 2px;
          border-radius: 2px;
          // padding-top: 0.04rem;
          // padding-bottom: 0.06rem;
          // padding-left: 0.08rem;
          // padding-right: 0.08rem;
          // margin-right: 0.1rem;
          margin-bottom: 0.1rem;
          width: 0.8rem;
          height: 0.28rem;
          line-height: 0.28rem;
          text-align: center;
        }
        .active {
          background: rgba(33, 135, 255, 0.15);
          color: #2187ff;
        }
      }
      .select_window_first {
        margin-bottom: 0.1rem;
        border-bottom: 1px solid #f0f0f7;
      }
      .select_window_second {
        padding-top: 0.2rem;
        padding-bottom: 0.2rem;
        border-top: 1px solid #f0f0f7;
        border-bottom: 1px solid #f0f0f7;
      }
      .select_window_third {
        margin-top: 0.15rem;
        .flex2 {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-around;
        p {
          font-family: PingFangSC-Regular;
          font-size: 0.13rem;
          color: #212121;
          letter-spacing: 0;
          // line-height: 0.18rem;
          height: 0.18rem;
          background: #f0f0f7;
          border-radius: 2px;
          border-radius: 2px;
          // padding-top: 0.04rem;
          // padding-bottom: 0.06rem;
          // padding-left: 0.08rem;
          // padding-right: 0.08rem;
          // margin-right: 0.1rem;
          margin-bottom: 0.1rem;
          width: 0.5rem;
          height: 0.28rem;
          line-height: 0.28rem;
          text-align: center;
        }
        .active {
          background: rgba(33, 135, 255, 0.15);
          color: #2187ff;
        }
      }
      }
    }
    .select_window_btn {
      width: 1.6rem;
      height: 0.4rem;
      background: #277fff;
      border-radius: 20px;
      border-radius: 20px;
      display: block;
      margin: 0 auto;
      position: absolute;
      bottom: 0.2rem;
      right: 0.2rem;
      left: 0.2rem;
      p {
        font-family: PingFangSC-Regular;
        font-size: 0.16rem;
        color: #ffffff;
        letter-spacing: 0;
        line-height: 0.4rem;
        text-align: center;
      }
    }
  }
}
</style>