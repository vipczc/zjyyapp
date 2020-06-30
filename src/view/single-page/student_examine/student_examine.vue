<template>
  <div>
    <header-main :message="'考核'"></header-main>
    <div class="examine_top">
      <mt-navbar v-model="selected">
        <mt-tab-item id="1">出科考试</mt-tab-item>
        <mt-tab-item id="2">日常考试</mt-tab-item>
        <!-- <mt-tab-item  id="3">结业考试</mt-tab-item> -->
      </mt-navbar>
      <div style="width:100%;height:2rem;display:none">
        <p style="text-align: center; line-height: 2rem; color: #dddddd;">暂无数据</p>
      </div>
      <mt-tab-container class="containter" v-model="selected" swipeable>
        <mt-tab-container-item id="1">
          <div class="examine1">
            <div class="examine1_left" v-for="(item,index) in topSwipeData" :key="index">
              <p class="examine1_left_top">{{item.typename}}考试</p>
              <div class="examine1_left_end">
                <div class="endleft">
                  <p style="color: #277FFF;" class="number">{{item.zrc}}</p>
                  <p class="desc">参加人次</p>
                </div>
                <cycle
                  v-if="showcycle"
                  :cycleName="'得分率'"
                  :cycleValue="(item.dfl2).toFixed(2)"
                  :cyclewidth="cyclewidth"
                ></cycle>
              </div>
            </div>
          </div>
        </mt-tab-container-item>
        <mt-tab-container-item id="2">
          <div class="examine1">
            <div class="examine1_left" v-for="(item,index) in topSwipeData" :key="index">
              <p class="examine1_left_top">{{item.typename}}考试</p>
              <div class="examine1_left_end">
                <div class="endleft">
                  <p style="color: #277FFF;" class="number">{{item.zrc}}</p>
                  <p class="desc">参加人次</p>
                </div>
                <cycle
                  v-if="showcycle"
                  :cycleName="'得分率'"
                  :cycleValue="(item.dfl2).toFixed(2)"
                  :cyclewidth="cyclewidth"
                ></cycle>
              </div>
            </div>
          </div>
        </mt-tab-container-item>
        <!-- <mt-tab-container-item id="3">
          <div class="examine1">
            <div class="examine1_left">
              <p class="examine1_left_top">理论考试</p>
              <div class="examine1_left_end">
                <div class="endleft">
                  <p style="color: #277FFF;" class="number">{{topSwipeData.llrs}}</p>
                  <p class="desc">参加人数</p>
                </div>
                <cycle  v-if="showcycle" :cycleName="'通过率'"  :cycleValue="topSwipeData.lltgl2 == '0'?0:(topSwipeData.lltgl2*100).toFixed(2)" :cyclewidth="cyclewidth"></cycle>
              </div>
            </div>
            <div class="examine1_left">
              <p class="examine1_left_top">技能考试</p>
              <div class="examine1_left_end">
                <div class="endleft">
                  <p style="color: #7ED5BC;" class="number">{{topSwipeData.jnrs}}</p>
                  <p class="desc">参加人数</p>
                </div>
                <cycle  v-if="showcycle" :cycleName="'通过率'"  :cycleValue="topSwipeData.jntgl2 == '0'?0:(topSwipeData.jntgl2*100).toFixed(2)" :cyclewidth="cyclewidth"></cycle>
              </div>
            </div>
          </div>
        </mt-tab-container-item>-->
      </mt-tab-container>
    </div>

    <div class="examine_middle">
      <div style="width:100%;height:4rem;display:none">
        <p style="text-align: center; line-height: 4rem; color: #dddddd;">暂无数据</p>
      </div>
      <div class="examine_middle_top">
        <div class="black_block"></div>
        <div class="tops">
          <p class="title">各基地{{endName}}</p>
          <!-- <img @click="selectWindow = true" src="../../../assets/images/change.png" alt /> -->
        </div>
        <div :style="openList == false ? 'height: 0.68rem;':''" class="top">
          <p
            @click="handleFirst(item.majorsubjectid,item.majorname,item.officelist)"
            :style="firstId == item.majorsubjectid ? 'color: #277FFF;':'color: #212121;'"
            v-for="(item, index) in typeDate1"
            :key="index"
          >{{item.majorname}}</p>
          <div class="open">
            <div class="flex" v-show="!openList" @click="handleOpenList(1)">
              <p>展开</p>
              <img src="../../../assets/images/downarrow.png" alt />
            </div>
            <div class="flex" @click="handleOpenList(2)" v-show="openList">
              <p>收起</p>
              <img src="../../../assets/images/uparrow.png" alt />
            </div>
          </div>
        </div>
        <div class="middle">
          <div v-show="showSecond" class="single">
            <p>{{secondName}}</p>
            <img @click="closeSecond()" src="../../../assets/images/blueclose.png" alt />
          </div>
          <div v-show="showThird" class="single">
            <p>{{thirdName}}</p>
            <img @click="closeThird()" src="../../../assets/images/blueclose.png" alt />
          </div>
          <div class="right">
            <p>筛选</p>
            <img @click="selectWindow = true" src="../../../assets/images/todaywork/select.png" alt />
          </div>
        </div>
        <div
          v-for="(item, index) in singlelistData"
          :key="index"
          v-show="item.zs != 0"
          class="single_block"
        >
          <div class="single_top">
            <p class="single_title">
              {{firstName}}
              <span v-show="showSecond">{{secondName}}</span>
              <span v-show="showThird">{{thirdName}}</span>
              {{endName}}
            </p>
            <p class="single_time">{{item.year}}年{{thirdName}}</p>
          </div>
          <div class="end">
            <div class="end_end">
              <div class="end_th">
                <p>学员姓名</p>
                <p>理论成绩</p>
                <p>技能成绩</p>
              </div>
              <div class="endtable">
                <div v-for="(item, index) in singlelistData2" :key="index" class="end_td">
                  <p>{{item.personname}}</p>
                  <p>{{item.finishtheoryscore}}</p>
                  <p>{{item.finishskillscore}}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- <div class="single_middle">
            <p>参加人数：{{item.zs}}</p>
            <p>通过率：{{item.tgl}}</p>
            <p>
              未通过人数：
              <span @click="openPeopleDetial(item.wtgpersonids)">{{item.wtgrs}} （查看）</span>
            </p>
          </div>
          <div class="examine1">
            <div class="examine1_left">
              <div class="examine1_left_end2">
                <div class="endleft">
                  <p class="number">{{item.llrs}}分</p>
                  <p class="desc">理论考试平均分</p>
                </div>
                <cycle
                  v-if="showcycle"
                  :cycleName="'通过率'"
                  :cycleValue="changeNumber(item.lltgl2)"
                  :cyclewidth="cyclewidth"
                ></cycle>
              </div>
            </div>
            <div class="examine1_left">
              <div class="examine1_left_end2">
                <div class="endleft">
                  <p class="number">{{item.jnrs}}分</p>
                  <p class="desc">技能考试平均分</p>
                </div>
                <cycle
                  v-if="showcycle"
                  :cycleName="'通过率'"
                  :cycleValue="changeNumber(item.jntgl2)"
                  :cyclewidth="cyclewidth"
                ></cycle>
              </div>
            </div>
          </div>-->
        </div>
        <div v-show="isshowdata(singlelistData)" class="single_block">
          <p class="no_data">暂无数据</p>
        </div>
      </div>
    </div>
    <!-- <div v-show="peopledetial" class="single_window">
      <div
        @click="hidePeopleDetial()"
        style=" background: rgba(0, 0, 0, 0.5);"
        class="single_window"
      ></div>
      <div class="single_window_main">
        <div class="window_top">
          <p>
            {{firstName}}
            <span v-show="showSecond">{{secondName}}</span>
            <span v-show="showThird">{{thirdName}}</span>
            {{endName}}未通过人员名单
          </p>
        </div>
        <div class="window_middle">
          <p>姓名</p>
          <p>工号</p>
          <p>未通过项</p>
        </div>
        <div class="window_tab">
          <div v-for="(item, index) in winlistdata" :key="index" class="window_tab_single">
            <p>{{item.personname}}</p>
            <p>{{item.jobnum}}</p>
            <p>{{item.phoneno}}</p>
          </div>
        </div>
      </div>
    </div>-->

    <div v-show="selectWindow" class="select_main">
      <div @click="hideWindow()" style="height: 100%;width: 1.75rem;" class="select_window_black"></div>
      <div class="select_window">
        <div class="select_window_main">
          <div class="select_window_first">
            <p class="title">{{firstName}}科室：</p>
            <div class="flex">
              <p
                @click="choice1(item2.officeid,item2.officename)"
                :style="item2.officename.length > 6 ? 'line-height: 0.14rem;':''"
                :class="choice1Id == item2.officeid ? 'active':'less'"
                v-for="(item2, index) in typeDate2"
                :key="index"
              >{{item2.officename}}</p>
            </div>
          </div>
          <div class="select_window_third">
            <p class="title">选择时间：</p>
            <div class="flex2">
              <p
                @click="choice2(index,item3.number)"
                :class="choice2Id == index ? 'active':'less'"
                v-for="(item3, index) in typeDate3"
                :key="index"
              >20/{{item3.number}}</p>
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
import cycle from "../../../components/mecharts/cycle.vue";
import { Indicator } from "mint-ui";
import {
  queryStudentexamdata,
  queryStudentexamdataOffice,
  queryNotpassstudentdata
} from "../../../api/studentexame";
import moment from "moment";
export default {
  data() {
    return {
      selected: "1",
      cyclewidth: "0.7rem",
      peopledetial: false,
      selectWindow: false,
      sumscore: "",
      openList: false,
      firstName: "内科",
      firstId: 0,
      secondName: "呼吸科",
      endName: "出科考试",
      secondId: 0,
      thirdName: "6月",
      thirdId: 0,
      choice1Name: "",
      choice1Id: 0,
      choice2Name: "6月",
      choice2Id: 0,
      choice2Number: "12",
      choice2Numbers: "12",
      showSecond: true,
      showThird: true,
      singlenumber: 0,
      showcycle: false,
      typeDate1: [
        {
          name: "内科",
          show: true
        },
        {
          name: "外科",
          show: true
        },
        {
          name: "口腔科",
          show: true
        },
        {
          name: "妇产科",
          show: true
        },
        {
          name: "神经内科",
          show: true
        },
        {
          name: "精神科",
          show: true
        },
        {
          name: "急诊科",
          show: true
        },
        {
          name: "病理科",
          show: true
        },

        {
          name: "皮肤性科",
          show: true
        },
        {
          name: "康复医学科",
          show: true
        },
        {
          name: "麻醉科",
          show: false
        },
        {
          name: "眼科",
          show: false
        },
        {
          name: "放射科",
          show: false
        }
      ],
      typeDate2: [],
      typeDate3: [
        {
          number: "12月"
        },
        {
          number: "11月"
        },
        {
          number: "10月"
        },
        {
          number: "9月"
        },
        {
          number: "8月"
        },
        {
          number: "7月"
        },
        {
          number: "6月"
        },
        {
          number: "5月"
        },
        {
          number: "4月"
        },
        {
          number: "3月"
        },
        {
          number: "2月"
        },
        {
          number: "1月"
        }
      ],
      topSwipeData: "",
      singlelistData: [],
      singlelistData2: [],
      winlistdata: [],
      moment: 0
    };
  },
  watch: {
    selected(val) {
      // Indicator.open("加载中...");
      this.moment = moment().month() + 1;
      this.showSecond = true;
      this.showThird = true;
      this.openList = false;
      this.choice2Number = moment().month() + 1;
      this.thirdName = moment().month() + 1 + "月";
      this.choice2Id = 0;
      this.thirdId = 0;
      if (val == 1) {
        this.endName = "出科考试";
      } else if (val == 2) {
        this.endName = "日常考试";
      }
      // else {
      //   this.endName = "结业考试";
      // }
      queryStudentexamdata(val).then(res => {
        // console.log(JSON.parse(res));
        this.topSwipeData = JSON.parse(res).studentexamdata;
        this.singlenumber = parseInt(
          JSON.parse(res).studentexamdata.lltgl2 * 100
        );
        this.showcycle = true;
        this.typeDate1 = JSON.parse(res).majorlist;
        this.firstName = JSON.parse(res).majorlist[0].majorname;
        if (JSON.parse(res).majorlist[0].officelist.length == 0) {
          console.log("暂无数据");
        } else {
          this.typeDate2 = JSON.parse(res).majorlist[0].officelist;
          this.secondName = JSON.parse(
            res
          ).majorlist[0].officelist[0].officename;
          this.choice1Name = JSON.parse(
            res
          ).majorlist[0].officelist[0].officename;
          this.secondId = JSON.parse(res).majorlist[0].officelist[0].officeid;
          this.choice1Id = JSON.parse(res).majorlist[0].officelist[0].officeid;
          this.firstId = JSON.parse(res).majorlist[0].majorsubjectid;
          queryStudentexamdataOffice(
            JSON.parse(res).majorlist[0].officelist[0].officeid,
            val,
            this.choice2Number
          ).then(res => {
            this.singlelistData = JSON.parse(res).officestudentexamdatalist;
            this.singlelistData2 = JSON.parse(res).officefinishtscorelist;
            Indicator.close();
          });
        }
      });
    }
  },
  methods: {
    slectType() {
      this.secondName = this.choice1Name;
      this.thirdName = this.choice2Name;
      this.secondId = this.choice1Id;
      this.thirdId = this.choice2Id;
      this.choice2Numbers = this.choice2Number;
      this.selectWindow = false;
      // console.log(this.secondName,this.thirdName,this.secondId,this.thirdId);

      if (this.secondId == 999 && this.thirdId == 99) {
        queryStudentexamdata(this.selected).then(res => {
          for (let i = 0; i < JSON.parse(res).majorlist.length; i++) {
            if (JSON.parse(res).majorlist[i].majorsubjectid == this.firstId) {
              let ads = [];
              for (
                let p = 0;
                p < JSON.parse(res).majorlist[i].officelist.length;
                p++
              ) {
                ads.push(JSON.parse(res).majorlist[i].officelist[p].officeid);
              }
              queryStudentexamdataOffice(ads, this.selected, " ").then(res => {
                // console.log(JSON.parse(res));
                this.singlelistData = JSON.parse(res).officestudentexamdatalist;
                this.singlelistData2 = JSON.parse(res).officefinishtscorelist;
                console.log(this.singlelistData2);
              });
            }
          }
        });
      } else {
        if (this.secondId == 999) {
          queryStudentexamdata(this.selected).then(res => {
            for (let i = 0; i < JSON.parse(res).majorlist.length; i++) {
              if (JSON.parse(res).majorlist[i].majorsubjectid == this.firstId) {
                let ads = [];
                for (
                  let p = 0;
                  p < JSON.parse(res).majorlist[i].officelist.length;
                  p++
                ) {
                  ads.push(JSON.parse(res).majorlist[i].officelist[p].officeid);
                }
                queryStudentexamdataOffice(
                  ads,
                  this.selected,
                  this.choice2Number
                ).then(res => {
                  // console.log(JSON.parse(res));
                  this.singlelistData = JSON.parse(
                    res
                  ).officestudentexamdatalist;
                });
              }
            }
          });
        } else if (this.thirdId == 99) {
          queryStudentexamdataOffice(this.secondId, this.selected, " ").then(
            res => {
              // console.log(JSON.parse(res));
              this.singlelistData = JSON.parse(res).officestudentexamdatalist;
              this.singlelistData2 = JSON.parse(res).officefinishtscorelist;
            }
          );
        } else {
          queryStudentexamdataOffice(
            this.secondId,
            this.selected,
            this.choice2Number
          ).then(res => {
            // console.log(JSON.parse(res));
            this.singlelistData = JSON.parse(res).officestudentexamdatalist;
            this.singlelistData2 = JSON.parse(res).officefinishtscorelist;
          });
        }
      }
      if (this.secondId != 999) {
        this.showSecond = true;
      }
      if (this.thirdId != 99) {
        this.showThird = true;
      }
      // queryStudentexamdataOffice(this.choice1Id,this.selected).then(res => {
      //   this.singlelistData = JSON.parse(res).officestudentexamdatalist
      // })
      // console.log(this.singlelistData);
    },
    isshowdata(data) {
      // console.log(data);
      let numa = 0;
      for (let k = 0; k < data.length; k++) {
        if (data[k].wtgrs != 0) {
          numa += 1;
        }
      }
      if (numa == 0) {
        return true;
      } else {
        return false;
      }
    },
    // getlength(text){
    //   console.log(text);

    // },
    choice1(id, name) {
      (this.choice1Id = id), (this.choice1Name = name);
    },
    choice2(id, name) {
      (this.choice2Id = id), (this.choice2Name = name);
      if (name.length > 2) {
        this.choice2Number = name.slice(0, 2);
      } else {
        this.choice2Number = "0" + name.slice(0, 1);
      }
    },
    handleOpenList(_index) {
      if (_index == 1) {
        this.openList = true;
        // for (let d = 0; d < this.typeDate1.length; d++) {
        //   this.typeDate1[d].show = true
        // }
      } else {
        this.openList = false;
        // for (let p = 0; p < this.typeDate1.length; p++) {
        //   this.typeDate1[p].show = false
        // }
        // for (let i = 0; i < 10; i++) {
        //   this.typeDate1[i].show = true
        // }
      }
    },
    handleFirst(id, name, data) {
      this.moment = moment().month() + 1;
      this.showSecond = true;
      this.showThird = true;
      this.firstName = name;
      this.firstId = id;
      // console.log(data);
      this.typeDate2 = data;
      if (data[0] == null) {
        console.log("暂无数据")
      } else {
        this.secondName = data[0].officename;
        this.secondId = data[0].officeid;
        this.choice1Id = data[0].officeid;
        this.choice1Name = data[0].officename;
      }

      // this.thirdName = moment().month() + 1 + '月'
      (this.choice2Number =moment().month() + 1),
        (this.thirdName =moment().month() + 1 + '月'),
        (this.choice2Id = 0),
        (this.thirdId = 0);
      queryStudentexamdataOffice(
        data[0].officeid,
        this.selected,
        this.choice2Number
      ).then(res => {
        this.singlelistData = JSON.parse(res).officestudentexamdatalist;
        this.singlelistData2 = JSON.parse(res).officefinishtscorelist;
      });
    },
    hideWindow() {
      this.choice1Id = this.secondId;
      this.choice2Id = this.thirdId;
      this.choice1Name = this.secondName;
      this.choice2Name = this.thirdName;
      this.choice2Number = this.choice2Numbers;
      this.selectWindow = false;
    },
    closeSecond() {
      (this.secondId = 999), (this.choice1Id = 999), (this.showSecond = false);
      // console.log(this.firstId);

      if (this.showThird == false) {
        queryStudentexamdata(this.selected).then(res => {
          for (let i = 0; i < JSON.parse(res).majorlist.length; i++) {
            if (JSON.parse(res).majorlist[i].majorsubjectid == this.firstId) {
              let ads = [];
              for (
                let p = 0;
                p < JSON.parse(res).majorlist[i].officelist.length;
                p++
              ) {
                ads.push(JSON.parse(res).majorlist[i].officelist[p].officeid);
              }
              queryStudentexamdataOffice(ads, this.selected, " ").then(res => {
                // console.log(JSON.parse(res));
                this.singlelistData = JSON.parse(res).officestudentexamdatalist;
                this.singlelistData2 = JSON.parse(res).officefinishtscorelist;
              });
            }
          }
        });
      } else {
        queryStudentexamdata(this.selected).then(res => {
          for (let i = 0; i < JSON.parse(res).majorlist.length; i++) {
            if (JSON.parse(res).majorlist[i].majorsubjectid == this.firstId) {
              let ads = [];
              for (
                let p = 0;
                p < JSON.parse(res).majorlist[i].officelist.length;
                p++
              ) {
                ads.push(JSON.parse(res).majorlist[i].officelist[p].officeid);
              }
              queryStudentexamdataOffice(
                ads,
                this.selected,
                this.choice2Number
              ).then(res => {
                // console.log(JSON.parse(res));
                this.singlelistData = JSON.parse(res).officestudentexamdatalist;
                this.singlelistData2 = JSON.parse(res).officefinishtscorelist;
              });
            }
          }
        });
      }
    },
    closeThird() {
      (this.choice2Id = 99), (this.thirdId = 99), (this.showThird = false);
      if (this.showSecond == false) {
        queryStudentexamdata(this.selected).then(res => {
          for (let i = 0; i < JSON.parse(res).majorlist.length; i++) {
            if (JSON.parse(res).majorlist[i].majorsubjectid == this.firstId) {
              let ads = [];
              for (
                let p = 0;
                p < JSON.parse(res).majorlist[i].officelist.length;
                p++
              ) {
                ads.push(JSON.parse(res).majorlist[i].officelist[p].officeid);
              }
              queryStudentexamdataOffice(ads, this.selected, " ").then(res => {
                // console.log(JSON.parse(res));
                this.singlelistData = JSON.parse(res).officestudentexamdatalist;
                this.singlelistData2 = JSON.parse(res).officefinishtscorelist;
              });
            }
          }
        });
      } else {
        queryStudentexamdataOffice(this.secondId, this.selected, " ").then(
          res => {
            // console.log(JSON.parse(res));
            this.singlelistData = JSON.parse(res).officestudentexamdatalist;
            this.singlelistData2 = JSON.parse(res).officefinishtscorelist;
          }
        );
      }
    },
    openPeopleDetial(id) {
      queryNotpassstudentdata(id).then(res => {
        console.log(JSON.parse(res));
        this.winlistdata = JSON.parse(res).officestudentexamdatalist;
        this.noScroll();
        this.peopledetial = true;
      });
    },
    hidePeopleDetial() {
      this.peopledetial = false;
      this.canScroll();
    },
    changeNumber(number) {
      return parseInt(number) * 100;
    }
  },
  mounted() {
    // this.moment = moment().month() + 1
    queryStudentexamdata(1).then(res => {
      // console.log(JSON.parse(res));
      this.topSwipeData = JSON.parse(res).studentexamdata;
      this.singlenumber = parseInt(
        JSON.parse(res).studentexamdata.lltgl2 * 100
      );
      this.showcycle = true;
      this.typeDate1 = JSON.parse(res).majorlist;
      this.firstName = JSON.parse(res).majorlist[0].majorname;
      if (JSON.parse(res).majorlist[0].officelist.length == 0) {
        console.log("暂无数据");
      } else {
        this.typeDate2 = JSON.parse(res).majorlist[0].officelist;
        this.secondName = JSON.parse(res).majorlist[0].officelist[0].officename;
        this.choice1Name = JSON.parse(
          res
        ).majorlist[0].officelist[0].officename;
        this.secondId = JSON.parse(res).majorlist[0].officelist[0].officeid;
        this.choice1Id = JSON.parse(res).majorlist[0].officelist[0].officeid;
        this.firstId = JSON.parse(res).majorlist[0].majorsubjectid;
        queryStudentexamdataOffice(
          JSON.parse(res).majorlist[0].officelist[0].officeid,
          1,
          this.moment
        ).then(res => {
          // console.log(JSON.parse(res));
          this.singlelistData = JSON.parse(res).officestudentexamdatalist;
          this.singlelistData2 = JSON.parse(res).officefinishtscorelist;
        });
      }
    });
  },
  created() {
    if (moment().date() < 20) {
      if (moment().month() == 0) {
        this.moment = 12;
      } else {
        this.moment = moment().month();
      }
    } else {
      this.moment = moment().month() + 1;
    }
  },
  components: {
    "header-main": mainHeader,
    cycle
  }
};
</script>

<style lang="less" scoped>
// 列表开始
.end {
  background: #ffffff;
  margin-top: 0.09rem;
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

  .end_end {
    width: 3.25rem;
    margin: 0 auto;

    .end_th {
      display: flex;
      align-items: center;

      p {
        font-family: PingFangSC-Medium;
        font-size: 0.13rem;
        color: #212121;
        letter-spacing: 0;
        // line-height: 16px;
        border: 1px solid #f0f0f7;
        height: 0.35rem;
        line-height: 0.35rem;
        width: 2rem;
        text-align: center;
      }
    }

    .end_td {
      display: flex;
      align-items: center;

      p {
        font-family: PingFangSC-Regular;
        font-size: 0.13rem;
        color: #212121;
        letter-spacing: 0;
        // line-height: 16px;
        border: 1px solid #f0f0f7;
        height: 0.35rem;
        line-height: 0.35rem;
        width: 1.61rem;
        text-align: center;
      }
    }
  }
}
.endtable {
  overflow: auto;
  // height: 4rem;
}
// 列表结束
.examine_top {
  position: absolute;
  left: 0.1rem;
  right: 0.1rem;
  background: #ffffff;
  box-shadow: 0 0 12px 0 rgba(0, 0, 0, 0.08);
  border-radius: 5px;
  border-radius: 5px;
  overflow: hidden;
  .containter {
    border-top: 1px solid #f0f0f7;
  }
}
.examine1 {
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-bottom: 0.26rem;
  background: #ffffff;
  .examine1_left_top {
    font-family: PingFangSC-Regular;
    font-size: 0.15rem;
    color: #212121;
    letter-spacing: 0;
    text-align: center;
    // line-height: 15px;
    margin-top: 0.14rem;
    margin-bottom: 0.25rem;
  }
}
.examine1_left_end {
  display: flex;
  align-items: center;
  .endleft {
    margin-right: 0.15rem;
    .number {
      font-family: PingFangSC-Medium;
      font-size: 0.3rem;
      // color: #277FFF;
      letter-spacing: 0;
      text-align: center;
      // line-height: 30px;
    }
    .desc {
      font-family: PingFangSC-Regular;
      font-size: 0.13rem;
      color: #212121;
      letter-spacing: 0;
      text-align: center;
      // line-height: 13px;
    }
  }
}
.examine1_left_end2 {
  display: flex;
  align-items: center;
  .endleft {
    margin-right: 0.15rem;
    .number {
      font-family: PingFangSC-Medium;
      font-size: 0.15rem;
      // color: #277FFF;
      letter-spacing: 0;
      text-align: center;
      margin-bottom: 0.1rem;
      // line-height: 30px;
    }
    .desc {
      font-family: PingFangSC-Regular;
      font-size: 0.13rem;
      color: #212121;
      letter-spacing: 0;
      text-align: center;
      // line-height: 13px;
    }
  }
}
.examine_middle {
  position: absolute;
  top: 2.6rem;
  background: #ffffff;
  width: 100%;
  .end_top {
    display: -webkit-flex;
    // justify-content: space-between;
    flex-direction: row;
    flex-wrap: wrap;
    width: 3.55rem;
    height: 0.8rem;
    margin: 0 auto;
    background: #f0f0f7;
    border-radius: 2px;
    border-radius: 2px;
    position: relative;
    p {
      font-family: PingFangSC-Regular;
      font-size: 0.13rem;
      color: #212121;
      letter-spacing: 0;
      // line-height: 13px;
      margin-left: 0.1rem;
      margin-right: 0.1rem;
      line-height: 0.4rem;
    }
  }
  .end_button {
    display: flex;
    align-items: center;
    position: absolute;
    bottom: 0;
    right: 0.12rem;
    p {
      font-family: PingFangSC-Regular;
      font-size: 0.13rem;
      color: #277fff;
      letter-spacing: 0;
      margin: 0;
      // line-height: 13px;
    }
  }
  .examine_middle_top {
    .black_block {
      width: 100%;
      height: 0.1rem;
      background: #f0f0f7;
    }
    .tops {
      display: flex;
      align-items: center;
      margin-top: 0.2rem;
      margin-bottom: 0.1rem;
      img {
        width: 0.16rem;
        height: 0.16rem;
        position: absolute;
        right: 0.2rem;
      }
    }
    .top {
      background: #f0f0f7;
      display: -webkit-flex;
      flex-direction: row;
      flex-wrap: wrap;
      // padding-top: 0.15rem;
      padding-bottom: 0.08rem;
      border-radius: 5px 5px 0px 0px;
      padding-left: 0.05rem;
      width: 3.55rem;
      margin: 0 auto;

      overflow: hidden;
      position: relative;
      background: #f0f0f7;
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
        // margin-left: auto;
        // margin-right: 0.15rem;
        color: #277fff;
        margin-top: 0.15rem;
        position: absolute;
        bottom: 0.1rem;
        right: 0.1rem;
        background: #f0f0f7;
        p {
          margin: 0;
          color: #277fff;
        }
        span {
          font-size: 0.1rem;
          margin-left: 0.05rem;
        }
        img {
          width: 0.1rem;
          height: 0.1rem;
          margin-left: 0.05rem;
        }
        .flex {
          display: flex;
          align-items: center;
        }
      }
    }
    .title {
      font-family: PingFangSC-Regular;
      font-size: 0.15rem;
      color: #212121;
      letter-spacing: 0;
      text-align: center;
      margin-left: auto;
      margin-right: auto;
      // line-height: 15px;
    }
  }
}
.mint-navbar {
  // width: 3.55rem;
  margin: 0 auto;
  background: #fff;
  border-top-left-radius: 0.05rem;
  border-top-right-radius: 0.05rem;
  .mint-tab-item:nth-child(1) {
    // width: 1.1rem;
  }
  .mint-tab-item:nth-child(2) {
    // width: 1.6rem;
  }
  .mint-tab-item:nth-child(3) {
    // width: 1rem;
    overflow: hidden;
  }
}

/deep/.mint-tab-item-label {
  color: #9397ad;
  font-size: 0.15rem;
  height: 0.45rem;
  line-height: 0.45rem;
  span {
    font-size: 0.12rem;
    color: #9397ad;
    letter-spacing: 0;
    text-align: center;
    line-height: 0.12rem;
    opacity: 0.5;
  }
}
/deep/ .is-selected .mint-tab-item-label {
  font-size: 0.18rem;
  color: #212121;
  span {
    color: #9397ad;
    opacity: 1;
  }
}

.mint-navbar {
  position: relative;
  box-sizing: border-box;
  padding: 0 0.1rem;
}

/deep/ .mint-navbar .mint-tab-item {
  // width: 1.3rem;
  padding: 0;
  // height: 0.48rem;
  background: transparent;
  // margin-bottom: 0.01rem;
  margin-bottom: 0;
  // flex: initial;
}
/deep/ .mint-tab-container {
  overflow: inherit;
}
/deep/ .mint-tab-item-label {
  position: relative;
}
.single_block {
  width: 3.55rem;
  height: 1.73rem;
  margin: 0 auto;
  background: #ffffff;
  box-shadow: 0 0 12px 0 rgba(0, 0, 0, 0.08);
  border-radius: 5px;
  border-radius: 5px;
  margin-top: 0.15rem;
  .no_data {
    line-height: 1.73rem;
    text-align: center;
    color: #dddddd;
  }
  .single_top {
    display: flex;
    align-items: center;
    padding-top: 0.15rem;
    .single_title {
      font-family: PingFangSC-Medium;
      font-size: 0.15rem;
      color: #212121;
      letter-spacing: 0;
      // line-height: 15px;
      border-left: 3px solid #277fff;
      margin-left: 0.1rem;
      padding-left: 0.05rem;
    }
    .single_time {
      font-family: PingFangSC-Regular;
      font-size: 0.13rem;
      color: #9397ad;
      letter-spacing: 0;
      text-align: right;
      margin-left: auto;
      margin-right: 0.15rem;
      // line-height: 13px;
    }
  }
  .single_middle {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0 auto;
    margin-left: 0.1rem;
    margin-top: 0.2rem;
    margin-bottom: 0.25rem;
    p {
      font-family: PingFangSC-Regular;
      font-size: 0.13rem;
      color: #212121;
      letter-spacing: 0;
      // line-height: 13px;
    }
    span {
      color: #277fff;
    }
  }
}
.single_window {
  position: fixed;

  width: 100%;
  height: 100%;
  z-index: 99999;
  top: 0;
  .single_window_main {
    background: #ffffff;
    position: absolute;
    bottom: 0;
    width: 100%;
    border-radius: 10px 10px 0 0;
    border-radius: 10px 10px 0px 0px;
    z-index: 99999;
    height: 3rem;
    overflow: auto;
    .window_top {
      display: flex;
      align-items: center;
      margin-top: 0.17rem;
      margin-bottom: 0.17rem;
      p {
        font-family: PingFangSC-Regular;
        font-size: 0.16rem;
        color: #212121;
        letter-spacing: 0;
        text-align: center;
        margin: 0 auto;
        // line-height: 16px;
      }
    }
    .window_middle {
      display: flex;
      align-items: center;
      width: 3.45rem;
      height: 0.4rem;
      background: #f0f0f7;
      margin: 0 auto;
      justify-content: space-around;
      p {
        font-family: PingFangSC-Regular;
        font-size: 0.16rem;
        color: #212121;
        letter-spacing: 0;
        line-height: 0.4rem;
      }
      // p:nth-child(1) {
      //   padding-left: 0.15rem;
      // }
      // p:nth-child(2) {
      //   padding-left: 0.52rem;
      //   padding-right: 0.93rem;
      // }
    }
    .window_tab {
      .window_tab_single {
        display: flex;
        align-items: center;
        margin: 0 auto;
        margin-top: 0.2rem;
        width: 3.45rem;
        justify-content: space-around;
        p {
          font-family: PingFangSC-Regular;
          font-size: 0.16rem;
          color: #212121;
          letter-spacing: 0;
          line-height: 0.4rem;
        }
        // p:nth-child(1) {
        //   padding-left: 0.15rem;
        // }
        // p:nth-child(2) {
        //    padding-left: 0.52rem;
        //    padding-right: 0.93rem;
        // }
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
    img {
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
</style>