<template>
  <div>
    <header-main :message="'今日直通'"></header-main>
    <div class="todaywork">
      <div class="todaywork_top">
        <p class="title">今日工作</p>
        <p @click="handleSelect()" class="select">筛选</p>
        <img @click="handleSelect()" src="../../../assets/images/todaywork/select.png" alt />
      </div>
      <div style="width:100%;height:4rem;display:none">
        <p style="text-align: center; line-height: 4rem; color: #dddddd;">暂无数据</p>
      </div>
      <div v-show="realsecondname == '全部' ? 1:item.state == realsecondname" v-for="(item, index) in tabledata" :key="index" class="today_main">
        <div class="today_main_top">
          <p v-show="item.state == '已完成'" class="type1">已完成</p>
          <p v-show="item.state == '未开始'" class="type2">未开始</p>
          <p v-show="item.state == '进行中'" class="type3">进行中</p>
          <p class="name">{{item.title}}</p>
          <p class="right">{{item.tasktype}}</p>
        </div>
        <div class="today_main_middle">
          <img src="../../../assets/images/todaywork/addres.png" alt />
          <p>{{item.addressname}}</p>
        </div>
        <div class="today_main_end">
          <div class="end_first disalign">
            <img src="../../../assets/images/todaywork/time.png" alt />
            <p>{{item.starttime}}</p>
          </div>
          <div class="end_second disalign">
            <p>参加人数：</p>
            <p>{{item.cjrs}}</p>
          </div>
          <div class="end_third disalign">
            <p>签到率：</p>
            <p style="color: #2187FF;">{{item.qdl}}</p>
          </div>
        </div>
      </div>
    </div>
    <div v-show="selectWindow" class="select_main">
      <div @click="closeWind()" style="height: 100%;width: 1.75rem;" class="select_window_black"></div>
      <div class="select_window">
        <div class="select_window_main">
          <div class="select_window_first">
            <p class="title">工作类型：</p>
            <div class="flex">
              <p :class="firstid == item.ids ? 'active':''" v-for="(item, index) in selecttab" :key="index" @click="selectFirst(item.ids,item.name)">{{item.name}}</p>
            </div>
          </div>
          <div class="select_window_second">
            <p class="title">完成状态：</p>
            <div class="flex">
              <p :class="secoendname == '全部' ? 'active':''" @click="selectSecond('全部')">全部</p>
              <p :class="secoendname == '已完成' ? 'active':''" @click="selectSecond('已完成')">已完成</p>
              <p :class="secoendname == '进行中' ? 'active':''" @click="selectSecond('进行中')">进行中</p>
              <p :class="secoendname == '未开始' ? 'active':''" @click="selectSecond('未开始')">未开始</p>
            </div>
          </div>
          <div class="select_window_third">
            <p class="title">时间排序：</p>
            <div class="flex">
              <p :class="thirdid == 1 ? 'active':''" @click="selectThird(1)">时间正序</p>
              <p :class="thirdid == 2 ? 'active':''" @click="selectThird(2)">时间倒序</p>
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
import { workToday } from "../../../api/main"
export default {
  data() {
    return {
      tabledata: [
        {
          name: "住培大纲“鼻咽部疾病”解读（一）",
          type: 1,
          dress: "1501会议室",
          time: "2019-08-26 08:20",
          people: "27",
          percent: "92.59%"
        },
        {
          name: "呼吸机的临床应用",
          type: 2,
          dress: "浙医二院1号楼9层外科ICU医生办公室",
          time: "2019-08-26 10:00",
          people: "4",
          percent: "100%"
        },
        {
          name: "肺多原发癌的诊治进展",
          type: 3,
          dress: "解放路2号楼4楼胸外科示教室",
          time: "2019-08-26 12:00",
          people: "10",
          percent: "80%"
        }
      ],
      selecttab:[
        {
          ids:0,
          name:"全部"
        },
        {
          ids:1,
          name:"理论培训"
        },
        {
          ids:2,
          name:"技能培训"
        },
        {
          ids:3,
          name:"小讲课"
        },
        {
          ids:4,
          name:"病例讨论"
        },
        {
          ids:5,
          name:"教学查房"
        },
        {
          ids:7,
          name:"入科教育"
        },
        {
          ids:9,
          name:"阅片会"
        },
        {
          ids:10,
          name:"教学会诊"
        },
        {
          ids:11,
          name:"读书报告"
        },
        {
          ids:12,
          name:"岗前培训"
        },
        {
          ids:13,
          name:"会议"
        },
        {
          ids:14,
          name:"师资培训"
        },
        {
          ids:99,
          name:"考试"
        }
      ],
      selectWindow: false,
      realfirstid:0,
      realsecondname:"全部",
      realthirdid:1,
      firstid:0,
      secoendname:"全部",
      thirdid:1,
      thirdname:"全部",
      selectname:"全部"
    };
  },
  methods: {
    slectType() {
      this.canScroll()
      this.selectWindow = false;
      this.realfirstid = this.firstid;
      this.realsecondname = this.secoendname;
      this.realthirdid = this.thirdid;
      this.thirdname = this.selectname;
      if (this.thirdid == 1) {
        workToday("",this.firstid).then(res => {
          this.tabledata = JSON.parse(res).worktodaylist
        })
      }else{
        workToday("desc",this.firstid).then(res => {
          this.tabledata = JSON.parse(res).worktodaylist
        })
      }
    },
    closeWind(){
      this.firstid = this.realfirstid;
      this.secoendname = this.realsecondname;
      this.thirdid = this.realthirdid;
      this.selectWindow = false;
      this.canScroll()
    },
    selectFirst(id,name) {
      this.firstid = id,
      this.selectname = name
    },
    selectSecond(name) {
      this.secoendname = name
    },
    selectThird(id) {
      this.thirdid = id
    },
    handleSelect() {
      this.noScroll()
      this.selectWindow = true
      
    }
  },
  mounted() {
    workToday("","","").then(res => {
     this.tabledata = JSON.parse(res).worktodaylist
    })
  },
  components: {
    "header-main": mainHeader
  }
};
</script>

<style lang="less" scoped>
.disalign {
  display: flex;
  align-items: center;
}
.todaywork {
  position: absolute;
  left: 0.1rem;
  right: 0.1rem;
  background: #ffffff;
  box-shadow: 0 0 12px 0 rgba(0, 0, 0, 0.08);
  border-radius: 5px;
  border-radius: 5px;
  .todaywork_top {
    display: flex;
    align-items: center;
    padding-left: 0.1rem;
    padding-right: 0.1rem;
    height: 0.49rem;
    border-bottom: 1px solid #f0f0f7;
    .title {
      font-family: PingFangSC-Regular;
      font-size: 0.15rem;
      color: #212121;
      letter-spacing: 0;
      text-align: center;
      line-height: 0.15rem;
      margin-right: auto;
    }
    .select {
      font-family: PingFangSC-Regular;
      font-size: 0.15rem;
      color: #474c63;
      letter-spacing: 0;
      text-align: right;
      line-height: 0.15rem;
    }
    img {
      width: 0.16rem;
      height: 0.16rem;
      margin-left: 0.05rem;
    }
  }
  .today_main {
    margin-left: 0.1rem;
    margin-right: 0.1rem;
    border-bottom: 1px solid #f0f0f7;
    .today_main_top {
      display: flex;
      align-items: center;
      margin-top: 0.15rem;
      .type1 {
        width: 0.5rem;
        height: 0.18rem;
        text-align: center;
        background: rgba(46, 191, 7, 0.2);
        border-radius: 11.5px;
        border-radius: 11.5px;
        font-family: PingFangSC-Medium;
        font-size: 0.13rem;
        color: #00a874;
        letter-spacing: 0;
        line-height: 0.18rem;
        align-items: center;
        justify-content: center;
        display: flex;
      }
      .type2 {
        width: 0.5rem;
        height: 0.18rem;
        text-align: center;
        background: #f0f0f7;
        border-radius: 11.5px;
        border-radius: 11.5px;
        font-family: PingFangSC-Medium;
        font-size: 0.13rem;
        color: #9397ad;
        letter-spacing: 0;
        line-height: 0.18rem;
        align-items: center;
        justify-content: center;
        display: flex;
      }
      .type3 {
        width: 0.5rem;
        height: 0.18rem;
        text-align: center;
        background: rgba(33, 135, 255, 0.2);
        border-radius: 11.5px;
        border-radius: 11.5px;
        font-family: PingFangSC-Medium;
        font-size: 0.13rem;
        color: #2187ff;
        letter-spacing: 0;
        line-height: 0.18rem;
        align-items: center;
        justify-content: center;
        display: flex;
      }
      .name {
        margin-left: 0.09rem;
        font-family: PingFangSC-Regular;
        font-size: 0.16rem;
        color: #212121;
        letter-spacing: 0;
        line-height: 0.16rem;
            width: 2.3rem;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
        // width: 3rem;
      }
      .right{
        margin-left:  auto;
        font-size: 0.13rem;
        color: #212121;
        width: 0.55rem;
        text-align: right;
      }
    }
    .today_main_middle {
      display: flex;
      align-items: center;
      margin-top: 0.15rem;
      margin-bottom: 0.15rem;
      img {
        width: 0.16rem;
        height: 0.16rem;
        margin-right: 0.05rem;
      }
      p {
        font-family: PingFangSC-Regular;
        font-size: 0.13rem;
        color: #9397ad;
        letter-spacing: 0;
        line-height: 0.13rem;
      }
    }
    .today_main_end {
      display: flex;
      align-items: center;
      padding-bottom: 0.15rem;
      p {
        font-family: PingFangSC-Regular;
        font-size: 0.13rem;
        color: #212121;
        letter-spacing: 0;
        line-height: 0.13rem;
      }
      img {
        width: 0.16rem;
        height: 0.16rem;
        margin-right: 0.05rem;
      }
      .end_second {
        // margin-left: 0.32rem;
        // margin-right: 0.32rem;
        margin: 0 auto;
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
    overflow: auto;
    .select_window_main {
      margin-top: 0.3rem;
      margin-left: 0.15rem;
      margin-right: 0.13rem;
      .title {
        font-family: PingFangSC-Regular;
        font-size: 0.13rem;
        color: #212121;
        letter-spacing: 0;
        line-height: 0.18rem;
        margin-bottom: 0.2rem;
      }
      .flex {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
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
          padding-top: 0.04rem;
          padding-bottom: 0.06rem;
          padding-left: 0.08rem;
          padding-right: 0.08rem;
          // margin-right: 0.1rem;
          margin-bottom: 0.1rem;
        }
        .active {
          background: rgba(33, 135, 255, 0.15);
          color: #2187ff;
        }
      }
      .select_window_first {
        margin-bottom: 0.1rem;
      }
      .select_window_second {
        padding-top: 0.2rem;
        padding-bottom: 0.2rem;
        border-top: 1px solid #f0f0f7;
        border-bottom: 1px solid #f0f0f7;
      }
      .select_window_third {
        margin-top: 0.2rem;
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
          margin-top: 0.3rem;
    margin-bottom: 0.2rem;
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